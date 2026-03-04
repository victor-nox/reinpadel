'use client';
// Admin Dashboard v1.1

import { useState, useEffect, useCallback } from 'react';

interface Stats {
  overview: {
    totalViews: number;
    totalUnique: number;
    todayViews: number;
    todayUnique: number;
    yesterdayViews: number;
    yesterdayUnique: number;
    liveVisitors: number;
    newVisitors: number;
    returningVisitors: number;
  };
  daily: { date: string; views: number; unique: number }[];
  hourly: { hour: number; views: number }[];
  weekday: { day: string; views: number }[];
  pages: { page: string; views: number }[];
  countries: { country: string; views: number }[];
  referrers: { referrer: string; views: number }[];
  devices: { device: string; views: number }[];
  browsers: { browser: string; views: number }[];
  languages: { language: string; views: number }[];
  recent: { page: string; country: string; city: string; device: string; browser: string; time: string; referrer?: string }[];
  liveLocations: { page: string; country: string; city: string }[];
  generatedAt: string;
}

const COLORS = ['#E85D4C', '#D4A84B', '#4ABDB5', '#8B5CF6', '#22C55E', '#EC4899', '#F59E0B', '#64748B'];
const FLAGS: Record<string, string> = {
  'FR': '🇫🇷', 'DE': '🇩🇪', 'CH': '🇨🇭', 'US': '🇺🇸', 'GB': '🇬🇧', 'ES': '🇪🇸', 
  'IT': '🇮🇹', 'BE': '🇧🇪', 'NL': '🇳🇱', 'AT': '🇦🇹', 'PT': '🇵🇹', 'CA': '🇨🇦',
  'LU': '🇱🇺', 'MC': '🇲🇨', 'PL': '🇵🇱', 'CZ': '🇨🇿', 'SE': '🇸🇪', 'NO': '🇳🇴',
};

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'traffic' | 'audience' | 'live'>('overview');

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/stats', { headers: { Authorization: `Bearer ${passcode}` } });
      if (res.ok) {
        setStats(await res.json());
        setIsLoggedIn(true);
        setError('');
        setLastRefresh(new Date());
      } else {
        setError('Passcode incorrect');
      }
    } catch { setError('Connection error'); }
  }, [passcode]);

  useEffect(() => {
    if (!autoRefresh || !isLoggedIn) return;
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, [autoRefresh, isLoggedIn, fetchStats]);

  const fmt = (n: number) => {
    if (!n) return '0';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  const getFlag = (c: string) => FLAGS[c] || '🌍';
  
  const getTrend = (today: number, yesterday: number) => {
    if (!yesterday) return { text: '✨ NEW', color: 'text-blue-400', up: true };
    const diff = ((today - yesterday) / yesterday) * 100;
    if (diff > 0) return { text: `↑ ${diff.toFixed(0)}%`, color: 'text-green-400', up: true };
    if (diff < 0) return { text: `↓ ${Math.abs(diff).toFixed(0)}%`, color: 'text-red-400', up: false };
    return { text: '→ 0%', color: 'text-gray-400', up: true };
  };

  const getPieData = <T extends { views: number }>(data: T[]) => {
    const total = data.reduce((s, d) => s + d.views, 0) || 1;
    return data.map((d, i) => ({ ...d, percent: (d.views / total) * 100, color: COLORS[i % COLORS.length] }));
  };

  const getMaxHour = () => {
    if (!stats?.hourly) return null;
    const max = Math.max(...stats.hourly.map(h => h.views));
    const hour = stats.hourly.find(h => h.views === max);
    return hour ? `${hour.hour}:00` : null;
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#F5E6C8] flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="text-8xl mb-6 animate-bounce">🫘</div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#E85D4C] to-[#D4A84B] mb-2">
            REIN PADEL TOUR
          </h1>
          <p className="text-sm opacity-50 mb-8 tracking-widest">ANALYTICS COMMAND CENTER</p>
          <form onSubmit={(e) => { e.preventDefault(); fetchStats(); }} className="space-y-4">
            <input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)}
              placeholder="ENTER PASSCODE" autoComplete="off"
              className="w-full bg-black border-2 border-[#E85D4C]/30 focus:border-[#E85D4C] text-center p-5 text-xl tracking-[0.3em] outline-none transition-all placeholder:tracking-widest" />
            <button className="w-full bg-gradient-to-r from-[#E85D4C] to-[#D4A84B] text-black p-4 font-black text-lg tracking-wider hover:opacity-90 transition-opacity">
              ACCESS DASHBOARD →
            </button>
            {error && <p className="text-red-500 animate-pulse">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  const trend = getTrend(stats?.overview.todayViews || 0, stats?.overview.yesterdayViews || 0);
  const newVsReturning = getPieData([
    { label: 'New', views: stats?.overview.newVisitors || 0 },
    { label: 'Returning', views: stats?.overview.returningVisitors || 0 }
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5E6C8]">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#E85D4C] to-[#D4A84B] p-1">
        <div className="bg-[#0a0a0a] px-4 py-3 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-4">
            <span className="text-2xl">🫘</span>
            <div>
              <h1 className="font-black text-lg tracking-wider">REIN PADEL TOUR</h1>
              <p className="text-[10px] opacity-40 tracking-widest">ANALYTICS COMMAND CENTER</p>
            </div>
          </div>
          
          {/* Live Badge */}
          {(stats?.overview.liveVisitors || 0) > 0 && (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-400 font-bold">{stats?.overview.liveVisitors} LIVE</span>
            </div>
          )}
          
          <div className="flex gap-2">
            <button onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 text-xs font-bold tracking-wider transition-all ${autoRefresh ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'border border-white/20 text-white/50 hover:text-white hover:border-white/40'}`}>
              {autoRefresh ? '● LIVE' : '○ AUTO'}
            </button>
            <button onClick={fetchStats} className="px-4 py-2 border border-[#E85D4C] text-[#E85D4C] text-xs font-bold tracking-wider hover:bg-[#E85D4C] hover:text-black transition-all">
              ↻ REFRESH
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/10 px-4">
        <div className="flex gap-6 max-w-7xl mx-auto">
          {(['overview', 'traffic', 'audience', 'live'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-bold tracking-wider border-b-2 transition-all ${activeTab === tab ? 'border-[#E85D4C] text-[#E85D4C]' : 'border-transparent text-white/40 hover:text-white/70'}`}>
              {tab === 'overview' && '📊 '}{tab === 'traffic' && '📈 '}{tab === 'audience' && '👥 '}{tab === 'live' && '⚡ '}
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#E85D4C]/20 to-transparent border border-[#E85D4C]/30 p-6 relative overflow-hidden">
                <div className="text-xs text-[#E85D4C] font-bold mb-1">TODAY</div>
                <div className="text-5xl font-black text-[#E85D4C]">{fmt(stats?.overview.todayViews || 0)}</div>
                <div className="text-sm text-white/50 mt-1">page views</div>
                <div className={`text-lg font-bold mt-2 ${trend.color}`}>{trend.text}</div>
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-10">👁️</div>
              </div>
              <div className="bg-gradient-to-br from-[#D4A84B]/20 to-transparent border border-[#D4A84B]/30 p-6 relative overflow-hidden">
                <div className="text-xs text-[#D4A84B] font-bold mb-1">TODAY</div>
                <div className="text-5xl font-black text-[#D4A84B]">{fmt(stats?.overview.todayUnique || 0)}</div>
                <div className="text-sm text-white/50 mt-1">unique visitors</div>
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-10">👤</div>
              </div>
              <div className="bg-gradient-to-br from-[#4ABDB5]/20 to-transparent border border-[#4ABDB5]/30 p-6 relative overflow-hidden">
                <div className="text-xs text-[#4ABDB5] font-bold mb-1">ALL TIME</div>
                <div className="text-5xl font-black text-[#4ABDB5]">{fmt(stats?.overview.totalViews || 0)}</div>
                <div className="text-sm text-white/50 mt-1">total views</div>
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-10">📊</div>
              </div>
              <div className="bg-gradient-to-br from-[#8B5CF6]/20 to-transparent border border-[#8B5CF6]/30 p-6 relative overflow-hidden">
                <div className="text-xs text-[#8B5CF6] font-bold mb-1">ALL TIME</div>
                <div className="text-5xl font-black text-[#8B5CF6]">{fmt(stats?.overview.totalUnique || 0)}</div>
                <div className="text-sm text-white/50 mt-1">total unique</div>
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-10">🌍</div>
              </div>
            </div>

            {/* 7-Day Chart */}
            <div className="bg-black/50 border border-white/10 p-6 mb-6">
              <h2 className="text-sm font-bold text-[#D4A84B] mb-4 tracking-wider">📈 LAST 7 DAYS</h2>
              <div className="flex items-end gap-3 h-48">
                {stats?.daily.map((d, i) => {
                  const max = Math.max(...(stats?.daily.map(x => x.views) || [1]));
                  const isToday = i === stats.daily.length - 1;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-sm font-bold text-[#E85D4C]">{d.views}</div>
                      <div className="text-[10px] text-[#D4A84B]">{d.unique}u</div>
                      <div className="flex gap-1 items-end h-28 w-full justify-center">
                        <div className={`w-6 rounded-t transition-all ${isToday ? 'bg-gradient-to-t from-[#E85D4C] to-[#D4A84B]' : 'bg-[#E85D4C]/50'}`}
                          style={{ height: `${Math.max((d.views / max) * 100, 5)}%` }} />
                      </div>
                      <div className={`text-xs ${isToday ? 'text-[#E85D4C] font-black' : 'text-white/30'}`}>
                        {isToday ? 'TODAY' : d.date.slice(5)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-black/50 border border-white/10 p-4 text-center">
                <div className="text-2xl font-black text-[#E85D4C]">{getMaxHour() || '-'}</div>
                <div className="text-xs text-white/40 mt-1">PEAK HOUR</div>
              </div>
              <div className="bg-black/50 border border-white/10 p-4 text-center">
                <div className="text-2xl font-black text-[#D4A84B]">{stats?.pages?.[0]?.page || '/'}</div>
                <div className="text-xs text-white/40 mt-1">TOP PAGE</div>
              </div>
              <div className="bg-black/50 border border-white/10 p-4 text-center">
                <div className="text-2xl font-black text-[#4ABDB5]">{getFlag(stats?.countries?.[0]?.country || '')} {stats?.countries?.[0]?.country || '-'}</div>
                <div className="text-xs text-white/40 mt-1">TOP COUNTRY</div>
              </div>
              <div className="bg-black/50 border border-white/10 p-4 text-center">
                <div className="text-2xl font-black text-[#8B5CF6] capitalize">{stats?.devices?.[0]?.device || '-'}</div>
                <div className="text-xs text-white/40 mt-1">TOP DEVICE</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-black/50 border border-white/10 p-4">
              <h2 className="text-sm font-bold text-[#D4A84B] mb-3 tracking-wider">⏱️ RECENT ACTIVITY</h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {(stats?.recent || []).slice(0, 10).map((v, i) => (
                  <div key={i} className="flex justify-between items-center py-2 px-3 bg-white/5 rounded hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-[#E85D4C] font-mono">{v.page}</span>
                      <span className="text-[#D4A84B] text-sm">{getFlag(v.country)} {v.city !== 'unknown' ? v.city : v.country}</span>
                      <span className="text-white/30 text-xs">{v.device} · {v.browser}</span>
                    </div>
                    <span className="text-white/20 text-xs">{new Date(v.time).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TRAFFIC TAB */}
        {activeTab === 'traffic' && (
          <>
            {/* Hourly Heatmap */}
            <div className="bg-black/50 border border-white/10 p-6 mb-6">
              <h2 className="text-sm font-bold text-[#D4A84B] mb-4 tracking-wider">🕐 HOURLY BREAKDOWN (UTC)</h2>
              <div className="grid grid-cols-12 gap-1">
                {stats?.hourly.map((h, i) => {
                  const max = Math.max(...(stats?.hourly.map(x => x.views) || [1]));
                  const intensity = h.views / max;
                  return (
                    <div key={i} className="text-center">
                      <div className="w-full aspect-square rounded flex items-center justify-center text-xs font-bold"
                        style={{ background: `rgba(232, 93, 76, ${Math.max(intensity, 0.1)})` }}>
                        {h.views > 0 ? h.views : ''}
                      </div>
                      <div className="text-[10px] text-white/30 mt-1">{h.hour}h</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekday Chart */}
            <div className="bg-black/50 border border-white/10 p-6 mb-6">
              <h2 className="text-sm font-bold text-[#D4A84B] mb-4 tracking-wider">📅 BY WEEKDAY</h2>
              <div className="flex items-end gap-4 h-40">
                {stats?.weekday.map((d, i) => {
                  const max = Math.max(...(stats?.weekday.map(x => x.views) || [1]));
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-sm font-bold text-[#E85D4C]">{d.views}</div>
                      <div className="w-full bg-[#E85D4C]/70 rounded-t" style={{ height: `${Math.max((d.views / max) * 100, 5)}%` }} />
                      <div className="text-xs text-white/50">{d.day}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/50 border border-white/10 p-4">
                <h2 className="text-sm font-bold text-[#D4A84B] mb-3">📄 PAGES</h2>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {(stats?.pages || []).map((p, i) => (
                    <div key={i} className="flex justify-between py-2 px-3 bg-white/5 rounded text-sm">
                      <span className="text-white/70 truncate max-w-[70%]">{p.page}</span>
                      <span className="text-[#E85D4C] font-bold">{p.views}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-black/50 border border-white/10 p-4">
                <h2 className="text-sm font-bold text-[#D4A84B] mb-3">🔗 REFERRERS</h2>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {(stats?.referrers || []).length > 0 ? stats?.referrers.map((r, i) => (
                    <div key={i} className="flex justify-between py-2 px-3 bg-white/5 rounded text-sm">
                      <span className="text-white/70 truncate max-w-[70%]">{r.referrer || 'Direct'}</span>
                      <span className="text-[#E85D4C] font-bold">{r.views}</span>
                    </div>
                  )) : <div className="text-white/30 text-center py-4">Mostly direct traffic</div>}
                </div>
              </div>
            </div>
          </>
        )}

        {/* AUDIENCE TAB */}
        {activeTab === 'audience' && (
          <>
            {/* New vs Returning */}
            <div className="bg-black/50 border border-white/10 p-6 mb-6">
              <h2 className="text-sm font-bold text-[#D4A84B] mb-4 tracking-wider">👤 NEW VS RETURNING</h2>
              <div className="flex items-center gap-8">
                <div className="flex h-6 flex-1 rounded overflow-hidden">
                  {newVsReturning.map((d, i) => (
                    <div key={i} style={{ width: `${d.percent}%`, background: d.color }} className="transition-all" />
                  ))}
                </div>
                <div className="flex gap-6">
                  {newVsReturning.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded" style={{ background: d.color }}></span>
                      <span>{(d as unknown as { label: string }).label}: {d.views} ({d.percent.toFixed(0)}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Devices & Browsers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-black/50 border border-white/10 p-6">
                <h2 className="text-sm font-bold text-[#D4A84B] mb-4">📱 DEVICES</h2>
                <div className="space-y-3">
                  {getPieData(stats?.devices || []).map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-20 text-sm capitalize">{(d as unknown as { device: string }).device}</div>
                      <div className="flex-1 h-6 bg-white/10 rounded overflow-hidden">
                        <div className="h-full rounded" style={{ width: `${d.percent}%`, background: d.color }} />
                      </div>
                      <div className="w-16 text-right text-sm">{d.views} ({d.percent.toFixed(0)}%)</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-black/50 border border-white/10 p-6">
                <h2 className="text-sm font-bold text-[#D4A84B] mb-4">🌐 BROWSERS</h2>
                <div className="space-y-3">
                  {getPieData(stats?.browsers || []).map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-20 text-sm capitalize">{(d as unknown as { browser: string }).browser}</div>
                      <div className="flex-1 h-6 bg-white/10 rounded overflow-hidden">
                        <div className="h-full rounded" style={{ width: `${d.percent}%`, background: d.color }} />
                      </div>
                      <div className="w-16 text-right text-sm">{d.views} ({d.percent.toFixed(0)}%)</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Countries & Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/50 border border-white/10 p-4">
                <h2 className="text-sm font-bold text-[#D4A84B] mb-3">🌍 COUNTRIES</h2>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {(stats?.countries || []).map((c, i) => (
                    <div key={i} className="flex justify-between py-2 px-3 bg-white/5 rounded text-sm">
                      <span>{getFlag(c.country)} {c.country}</span>
                      <span className="text-[#E85D4C] font-bold">{c.views}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-black/50 border border-white/10 p-4">
                <h2 className="text-sm font-bold text-[#D4A84B] mb-3">🗣️ LANGUAGES</h2>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {(stats?.languages || []).map((l, i) => (
                    <div key={i} className="flex justify-between py-2 px-3 bg-white/5 rounded text-sm">
                      <span className="uppercase">{l.language}</span>
                      <span className="text-[#E85D4C] font-bold">{l.views}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* LIVE TAB */}
        {activeTab === 'live' && (
          <>
            <div className="text-center py-8">
              <div className="text-6xl mb-4">{(stats?.overview.liveVisitors || 0) > 0 ? '🟢' : '⚫'}</div>
              <div className="text-6xl font-black text-[#E85D4C]">{stats?.overview.liveVisitors || 0}</div>
              <div className="text-xl text-white/50 mt-2">visitors online right now</div>
            </div>

            {(stats?.liveLocations || []).length > 0 && (
              <div className="bg-black/50 border border-white/10 p-6 mb-6">
                <h2 className="text-sm font-bold text-[#D4A84B] mb-4">📍 LIVE LOCATIONS</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {stats?.liveLocations.map((loc, i) => (
                    <div key={i} className="bg-green-500/10 border border-green-500/30 p-3 rounded flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-sm">{getFlag(loc.country)} {loc.city !== 'unknown' ? loc.city : loc.country}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-black/50 border border-white/10 p-4">
              <h2 className="text-sm font-bold text-[#D4A84B] mb-3">⚡ LIVE FEED</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {(stats?.recent || []).map((v, i) => (
                  <div key={i} className="flex justify-between items-center py-3 px-4 bg-white/5 rounded hover:bg-white/10 transition-colors animate-fade-in">
                    <div className="flex items-center gap-4">
                      <span className="w-2 h-2 bg-[#E85D4C] rounded-full"></span>
                      <span className="text-[#E85D4C] font-mono">{v.page}</span>
                      <span className="text-[#D4A84B]">{getFlag(v.country)} {v.city !== 'unknown' ? v.city : v.country}</span>
                      <span className="text-white/30 text-sm">{v.device} · {v.browser}</span>
                    </div>
                    <span className="text-white/20">{new Date(v.time).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-white/10 flex flex-wrap justify-between items-center text-xs text-white/30">
          <span>🫘 Rein Padel Tour 2026 · 6-15 Mars · 9 Villes</span>
          <span>Last update: {lastRefresh?.toLocaleTimeString() || '-'} {autoRefresh && '· Auto-refresh ON'}</span>
        </footer>
      </div>
    </div>
  );
}
