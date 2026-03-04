import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, referrer, userAgent, screenWidth, screenHeight, language } = body;
    
    // Get visitor info from headers
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const country = request.headers.get('x-vercel-ip-country') || 'unknown';
    const city = request.headers.get('x-vercel-ip-city') || 'unknown';
    const region = request.headers.get('x-vercel-ip-country-region') || 'unknown';
    
    // Parse device info
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent || '');
    const isTablet = /iPad|Tablet/i.test(userAgent || '');
    const device = isTablet ? 'tablet' : (isMobile ? 'mobile' : 'desktop');
    
    // Parse browser
    let browser = 'other';
    if (/Chrome/i.test(userAgent) && !/Edg/i.test(userAgent)) browser = 'chrome';
    else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) browser = 'safari';
    else if (/Firefox/i.test(userAgent)) browser = 'firefox';
    else if (/Edg/i.test(userAgent)) browser = 'edge';
    
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const hour = now.getUTCHours();
    
    // Create visitor hash
    const visitorHash = await hashString(ip + userAgent + today);
    
    await Promise.all([
      redis.incr('stats:views:total'),
      redis.incr(`stats:views:${today}`),
      redis.incr(`stats:pages:${page || '/'}`),
      redis.incr(`stats:hours:${today}:${hour}`),
      redis.incr(`stats:countries:${country}`),
      redis.sadd(`stats:unique:${today}`, visitorHash),
      redis.sadd('stats:unique:all', visitorHash),
      redis.incr(`stats:devices:${device}`),
      redis.incr(`stats:browsers:${browser}`),
      language ? redis.incr(`stats:languages:${language.substring(0, 5)}`) : Promise.resolve(),
      referrer && !referrer.includes('reinpadel') 
        ? redis.incr(`stats:referrers:${encodeURIComponent(referrer.substring(0, 100))}`)
        : Promise.resolve(),
      redis.setex(`stats:live:${visitorHash}`, 300, page || '/'),
      redis.lpush('stats:recent', JSON.stringify({
        page, country, city, region, device, browser,
        time: now.toISOString(),
        referrer: referrer?.substring(0, 100) || null
      })),
      redis.ltrim('stats:recent', 0, 99),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Track error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.slice(0, 8).map(b => b.toString(16).padStart(2, '0')).join('');
}
