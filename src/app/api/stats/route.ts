import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const PASSCODE = process.env.ADMIN_PASSCODE || 'vamos-reinpadel';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${PASSCODE}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const yesterday = new Date(now.getTime() - 86400000).toISOString().split('T')[0];
    
    const last7Days = Array.from({ length: 7 }, (_, i) => 
      new Date(now.getTime() - i * 86400000).toISOString().split('T')[0]
    );

    const [
      totalViews, totalUnique, todayViews, todayUnique,
      yesterdayViews, yesterdayUnique, recentVisits, ...dailyStats
    ] = await Promise.all([
      redis.get('stats:views:total'),
      redis.scard('stats:unique:all'),
      redis.get(`stats:views:${today}`),
      redis.scard(`stats:unique:${today}`),
      redis.get(`stats:views:${yesterday}`),
      redis.scard(`stats:unique:${yesterday}`),
      redis.lrange('stats:recent', 0, 19),
      ...last7Days.flatMap(date => [
        redis.get(`stats:views:${date}`),
        redis.scard(`stats:unique:${date}`)
      ])
    ]);

    const getStats = async (prefix: string, keyProp: string) => {
      const keys = await redis.keys(`${prefix}*`);
      const stats = await Promise.all(
        (keys || []).slice(0, 10).map(async (key: string) => ({
          [keyProp]: key.replace(prefix, ''),
          views: (await redis.get(key)) || 0
        }))
      );
      return stats.sort((a, b) => (b.views as number) - (a.views as number));
    };

    // Get hourly breakdown
    const hourlyData = await Promise.all(
      Array.from({ length: 24 }, (_, h) => redis.get(`stats:hourly:${h}`))
    );
    
    // Get weekday breakdown
    const weekdayData = await Promise.all(
      Array.from({ length: 7 }, (_, d) => redis.get(`stats:weekday:${d}`))
    );
    
    // Get new vs returning
    const [newVisitors, returningVisitors] = await Promise.all([
      redis.get('stats:new'),
      redis.get('stats:returning'),
    ]);

    const [pageStats, countryStats, referrerStats, deviceStats, browserStats, langStats, liveKeys, liveData] = await Promise.all([
      getStats('stats:pages:', 'page'),
      getStats('stats:countries:', 'country'),
      getStats('stats:referrers:', 'referrer').then(s => s.map(r => ({ ...r, referrer: decodeURIComponent(r.referrer as string) }))),
      getStats('stats:devices:', 'device'),
      getStats('stats:browsers:', 'browser'),
      getStats('stats:languages:', 'language'),
      redis.keys('stats:live:*'),
      redis.keys('stats:live:*').then(keys => 
        Promise.all((keys || []).slice(0, 20).map(k => redis.get(k)))
      ),
    ]);

    const dailyData = last7Days.map((date, i) => ({
      date,
      views: (dailyStats[i * 2] as number) || 0,
      unique: (dailyStats[i * 2 + 1] as number) || 0
    })).reverse();

    const recent = (recentVisits || []).map((v: unknown) => {
      try { return typeof v === 'string' ? JSON.parse(v) : v; } catch { return null; }
    }).filter(Boolean);

    // Parse live visitor locations
    const liveLocations = (liveData || []).map((d: unknown) => {
      try { return typeof d === 'string' ? JSON.parse(d) : d; } catch { return null; }
    }).filter(Boolean);

    return NextResponse.json({
      overview: {
        totalViews: totalViews || 0,
        totalUnique: totalUnique || 0,
        todayViews: todayViews || 0,
        todayUnique: todayUnique || 0,
        yesterdayViews: yesterdayViews || 0,
        yesterdayUnique: yesterdayUnique || 0,
        liveVisitors: (liveKeys || []).length,
        newVisitors: newVisitors || 0,
        returningVisitors: returningVisitors || 0,
      },
      daily: dailyData,
      hourly: hourlyData.map((v, h) => ({ hour: h, views: (v as number) || 0 })),
      weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => ({ 
        day, views: (weekdayData[i] as number) || 0 
      })),
      pages: pageStats,
      countries: countryStats,
      referrers: referrerStats,
      devices: deviceStats,
      browsers: browserStats,
      languages: langStats,
      recent,
      liveLocations,
      generatedAt: now.toISOString()
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
