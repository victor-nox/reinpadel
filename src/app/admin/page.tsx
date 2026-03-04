'use client';

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
  };
  daily: { date: string; views: number; unique: number }[];
  pages: { page: string; views: number }[];
  countries: { country: string; views: number }[];
  referrers: { referrer: string; views: number }[];
  devices: { device: string; views: number }[];
  browsers: { browser: string; views: number }[];
  languages: { language: string; views: number }[];
  recent: { page: string; country: string; city: string; device: string; browser: string; time: string; referrer?: string }[];
  generatedAt: string;
}

const COLORS = ['#E85D4C', '#D4A84B', '#4ABDB5', '#8B5CF6', '#22C55E', '#64748B'];
const COUNTRY_FLAGS: Record<string, string> = {
  'FR': '🇫🇷', 'DE': '🇩🇪', 'CH': '🇨🇭', 'US': '🇺🇸', 'GB': '🇬🇧', 
  'ES': '🇪🇸', 'IT': '🇮🇹', 'BE': '🇧🇪', 'NL': '🇳🇱', 'AT': '🇦🇹',
  'PT': '🇵🇹', 'CA': '🇨🇦', 'AU': '🇦🇺', 'JP': '🇯🇵', 'CN': '🇨🇳',
};

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/stats', {
        headers: { Authorization: `Bearer ${passcode}` }
      });
      if (res.ok) {
        setStats(await res.json());
        setIsLoggedIn(true);
        setError('');
        setLastRefresh(new Date());
      } else {
        setError('Passcode incorrect');
      }
    } catch {
      setError('Connection error');
    }
  }, [passcode]);

  useEffect(() => {
    if (!autoRefresh || !isLoggedIn) return;
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, [autoRefresh, isLoggedIn, fetchStats]);

  const fmt = (n: number) => {
    if (!n) return '0';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  const getFlag = (country: string) => COUNTRY_FLAGS[country] || '🌍';
  
  const getTrend = (today: number, yesterday: number) => {
    if (!yesterday) return { text: 'NEW', color: 'text-blue-400' };
    const diff = ((today - yesterday) / yesterday) * 100;
    if (diff > 0) return { text: `↑${diff.toFixed(0)}%`, color: 'text-green-500' };
    if (diff < 0) return { text: `↓${Math.abs(diff).toFixed(0)}%`, color: 'text-red-500' };
    return { text: '→', color: 'text-gray-500' };
  };

  const getPieData = (data: { views: number }[]) => {
    const total = data.reduce((s, d) => s + d.views, 0) || 1;
    return data.map((d, i) => ({
      ...d,
      percent: (d.views / total) * 100,
      color: COLORS[i % COLORS.length]
    }));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a1a2e] text-[#F5E6C8] flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="text-6xl mb-4">🫘</div>
          <h1 className="text-3xl font-bold text-[#E85D4C] mb-2">REIN PADEL TOUR</h1>
          <p className="text-sm opacity-50 mb-8">Analytics Dashboard</p>
          <form onSubmit={(e) => { e.preventDefault(); fetchStats(); }} className="space-y-4">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="PASSCODE"
              className="w-full bg-[#080808] border-2 border-[#E85D4C]/50 focus:border-[#E85D4C] text-center p-4 text-lg tracking-widest outline-none transition-colors"
            />
            <button className="w-full bg-[#E85D4C] text-[#0d0d0d] p-4 font-bold tracking-wider hover:bg-[#D4A84B] transition-colors">
              ACCÉDER
            </button>
            {error && <p className="text-red-500 text-sm animate-pulse">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  const trend = getTrend(stats?.overview.todayViews || 0, stats?.overview.yesterdayViews || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a1a2e] text-[#F5E6C8] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-[#E85D4C]/20">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🫘</span>
            <div>
              <h1 className="text-xl font-bold text-[#E85D4C]">REIN PADEL TOUR</h1>
              <p className="text-xs opacity-50">Analytics Dashboard</p>
            </div>
            {(stats?.overview.liveVisitors || 0) > 0 && (
              <span className="text-sm px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/50 rounded-full animate-pulse">
                ● {stats?.overview.liveVisitors} online
              </span>
            )}
          </div>
          <div className="flex gap-2 mt-3 md:mt-0">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 text-xs tracking-wider transition-all ${
                autoRefresh 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                  : 'border border-[#E85D4C]/50 text-[#E85D4C]/70 hover:border-[#E85D4C]'
              }`}
            >
              {autoRefresh ? '● LIVE 15s' : '○ AUTO'}
            </button>
            <button 
              onClick={fetchStats} 
              className="px-4 py-2 border border-[#E85D4C] text-[#E85D4C] text-xs tracking-wider hover:bg-[#E85D4C] hover:text-black transition-all"
            >
              ↻ REFRESH
            </button>
          </div>
        </header>

        {/* Big Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#080808]/80 backdrop-blur border border-[#E85D4C]/30 p-6 text-center relative overflow-hidden">
            <div className="absolute top-2 right-2 text-xs opacity-30">TODAY</div>
            <div className="text-5xl font-bold text-[#E85D4C]">{fmt(stats?.overview.todayViews || 0)}</div>
            <div className="text-xs text-[#D4A84B] mt-2 uppercase tracking-wider">Views</div>
            <div className={`text-sm mt-1 ${trend.color}`}>{trend.text}</div>
          </div>
          <div className="bg-[#080808]/80 backdrop-blur border border-[#D4A84B]/30 p-6 text-center">
            <div className="absolute top-2 right-2 text-xs opacity-30">TODAY</div>
            <div className="text-5xl font-bold text-[#D4A84B]">{fmt(stats?.overview.todayUnique || 0)}</div>
            <div className="text-xs text-[#D4A84B] mt-2 uppercase tracking-wider">Unique</div>
          </div>
          <div className="bg-[#080808]/80 backdrop-blur border border-[#4ABDB5]/30 p-6 text-center">
            <div className="text-5xl font-bold text-[#4ABDB5]">{fmt(stats?.overview.totalViews || 0)}</div>
            <div className="text-xs text-[#D4A84B] mt-2 uppercase tracking-wider">Total Views</div>
          </div>
          <div className="bg-[#080808]/80 backdrop-blur border border-[#8B5CF6]/30 p-6 text-center">
            <div className="text-5xl font-bold text-[#8B5CF6]">{fmt(stats?.overview.totalUnique || 0)}</div>
            <div className="text-xs text-[#D4A84B] mt-2 uppercase tracking-wider">Total Unique</div>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-6">
          <h2 className="text-sm text-[#D4A84B] mb-3 uppercase tracking-wider flex items-center gap-2">
            <span>📊</span> Last 7 Days
          </h2>
          <div className="bg-[#080808]/80 backdrop-blur border border-[#E85D4C]/20 p-6">
            <div className="flex items-end gap-3 h-52">
              {stats?.daily.map((d, i) => {
                const max = Math.max(...(stats?.daily.map(x => x.views) || [1]));
                const isToday = i === stats.daily.length - 1;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs text-[#E85D4C] font-bold">{d.views}</div>
                    <div className="text-[10px] text-[#D4A84B] opacity-70">{d.unique} uniq</div>
                    <div className="flex gap-1 items-end h-32 w-full justify-center">
                      <div 
                        className={`w-5 transition-all duration-500 ${isToday ? 'bg-[#E85D4C]' : 'bg-[#E85D4C]/60'}`}
                        style={{ height: `${Math.max((d.views / max) * 100, 3)}%` }} 
                      />
                      <div 
                        className="w-5 bg-[#D4A84B]/50 transition-all duration-500" 
                        style={{ height: `${Math.max((d.unique / max) * 100, 3)}%` }} 
                      />
                    </div>
                    <div className={`text-xs ${isToday ? 'text-[#E85D4C] font-bold' : 'opacity-50'}`}>
                      {isToday ? 'TODAY' : d.date.slice(5)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center gap-6 mt-4 text-xs">
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[#E85D4C]"></span> Views</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[#D4A84B]/50"></span> Unique</span>
            </div>
          </div>
        </div>

        {/* Pie Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Devices */}
          <div className="bg-[#080808]/80 backdrop-blur border border-[#E85D4C]/20 p-4">
            <h2 className="text-sm text-[#D4A84B] mb-3 uppercase tracking-wider flex items-center gap-2">
              <span>📱</span> Devices
            </h2>
            <div className="flex h-4 rounded overflow-hidden mb-3">
              {getPieData(stats?.devices || []).map((d, i) => (
                <div key={i} style={{ width: `${d.percent}%`, background: d.color }} className="transition-all duration-500" />
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {getPieData(stats?.devices || []).map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded" style={{ background: d.color }}></span>
                  <span className="capitalize">{(d as unknown as { device: string }).device}</span>
                  <span className="opacity-50">({d.percent.toFixed(0)}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Browsers */}
          <div className="bg-[#080808]/80 backdrop-blur border border-[#E85D4C]/20 p-4">
            <h2 className="text-sm text-[#D4A84B] mb-3 uppercase tracking-wider flex items-center gap-2">
              <span>🌐</span> Browsers
            </h2>
            <div className="flex h-4 rounded overflow-hidden mb-3">
              {getPieData(stats?.browsers || []).map((d, i) => (
                <div key={i} style={{ width: `${d.percent}%`, background: d.color }} className="transition-all duration-500" />
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {getPieData(stats?.browsers || []).map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded" style={{ background: d.color }}></span>
                  <span className="capitalize">{(d as unknown as { browser: string }).browser}</span>
                  <span className="opacity-50">({d.percent.toFixed(0)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Pages */}
          <div>
            <h2 className="text-sm text-[#D4A84B] mb-2 uppercase tracking-wider flex items-center gap-2">
              <span>📄</span> Pages
            </h2>
            <div className="bg-[#080808]/80 backdrop-blur border border-[#E85D4C]/20 max-h-52 overflow-y-auto">
              {(stats?.pages || []).slice(0, 10).map((item, j) => (
                <div key={j} className="flex justify-between px-3 py-2 border-b border-[#E85D4C]/10 text-sm hover:bg-[#E85D4C]/5">
                  <span className="opacity-70 truncate max-w-[70%]">{item.page}</span>
                  <span className="text-[#E85D4C] font-bold">{item.views}</span>
                </div>
              ))}
              {(!stats?.pages || stats.pages.length === 0) && <div className="p-3 opacity-50 text-center">No data</div>}
            </div>
          </div>

          {/* Countries */}
          <div>
            <h2 className="text-sm text-[#D4A84B] mb-2 uppercase tracking-wider flex items-center gap-2">
              <span>🌍</span> Countries
            </h2>
            <div className="bg-[#080808]/80 backdrop-blur border border-[#E85D4C]/20 max-h-52 overflow-y-auto">
              {(stats?.countries || []).slice(0, 10).map((item, j) => (
                <div key={j} className="flex justify-between px-3 py-2 border-b border-[#E85D4C]/10 text-sm hover:bg-[#E85D4C]/5">
                  <span className="opacity-70">
                    {getFlag(item.country)} {item.country}
                  </span>
                  <span className="text-[#E85D4C] font-bold">{item.views}</span>
                </div>
              ))}
              {(!stats?.countries || stats.countries.length === 0) && <div className="p-3 opacity-50 text-center">No data</div>}
            </div>
          </div>

          {/* Referrers */}
          <div>
            <h2 className="text-sm text-[#D4A84B] mb-2 uppercase tracking-wider flex items-center gap-2">
              <span>🔗</span> Referrers
            </h2>
            <div className="bg-[#080808]/80 backdrop-blur border border-[#E85D4C]/20 max-h-52 overflow-y-auto">
              {(stats?.referrers || []).slice(0, 10).map((item, j) => (
                <div key={j} className="flex justify-between px-3 py-2 border-b border-[#E85D4C]/10 text-sm hover:bg-[#E85D4C]/5">
                  <span className="opacity-70 truncate max-w-[70%]">{item.referrer || 'Direct'}</span>
                  <span className="text-[#E85D4C] font-bold">{item.views}</span>
                </div>
              ))}
              {(!stats?.referrers || stats.referrers.length === 0) && <div className="p-3 opacity-50 text-center">Direct traffic</div>}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-sm text-[#D4A84B] mb-2 uppercase tracking-wider flex items-center gap-2">
              <span>🗣️</span> Languages
            </h2>
            <div className="bg-[#080808]/80 backdrop-blur border border-[#E85D4C]/20 max-h-52 overflow-y-auto">
              {(stats?.languages || []).slice(0, 10).map((item, j) => (
                <div key={j} className="flex justify-between px-3 py-2 border-b border-[#E85D4C]/10 text-sm hover:bg-[#E85D4C]/5">
                  <span className="opacity-70 uppercase">{item.language}</span>
                  <span className="text-[#E85D4C] font-bold">{item.views}</span>
                </div>
              ))}
              {(!stats?.languages || stats.languages.length === 0) && <div className="p-3 opacity-50 text-center">No data</div>}
            </div>
          </div>
        </div>

        {/* Recent Visits */}
        <div className="mb-6">
          <h2 className="text-sm text-[#D4A84B] mb-2 uppercase tracking-wider flex items-center gap-2">
            <span>⏱️</span> Recent Visits
          </h2>
          <div className="bg-[#080808]/80 backdrop-blur border border-[#E85D4C]/20 max-h-80 overflow-y-auto">
            {(stats?.recent || []).map((v, i) => (
              <div key={i} className="flex justify-between items-center px-4 py-3 border-b border-[#E85D4C]/10 hover:bg-[#E85D4C]/5 transition-colors">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[#E85D4C] font-medium">{v.page || '/'}</span>
                  <span className="text-[#D4A84B] text-sm">
                    {getFlag(v.country)} {v.city !== 'unknown' ? `${v.city}, ` : ''}{v.country}
                  </span>
                  <span className="text-[#8B5CF6] text-xs opacity-70 capitalize">{v.device} · {v.browser}</span>
                  {v.referrer && <span className="text-xs opacity-40">via {v.referrer.substring(0, 30)}</span>}
                </div>
                <span className="text-xs opacity-40 whitespace-nowrap">{new Date(v.time).toLocaleTimeString()}</span>
              </div>
            ))}
            {(!stats?.recent || stats.recent.length === 0) && (
              <div className="p-6 text-center opacity-50">No visits yet</div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-wrap justify-between items-center pt-4 border-t border-[#E85D4C]/10 text-xs opacity-40">
          <span>🫘 Rein Padel Tour 2026 · Analytics</span>
          <span>
            Last refresh: {lastRefresh?.toLocaleTimeString() || '-'}
            {autoRefresh && ' · Auto-refresh ON'}
          </span>
        </footer>
      </div>
    </div>
  );
}
