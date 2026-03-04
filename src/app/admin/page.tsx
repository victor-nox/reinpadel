'use client';

import { useState, useEffect } from 'react';

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
  recent: { page: string; country: string; city: string; device: string; browser: string; time: string }[];
  generatedAt: string;
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats', {
        headers: { Authorization: `Bearer ${passcode}` }
      });
      if (res.ok) {
        setStats(await res.json());
        setIsLoggedIn(true);
        setError('');
      } else {
        setError('Passcode incorrect');
      }
    } catch {
      setError('Connection error');
    }
  };

  useEffect(() => {
    if (!autoRefresh || !isLoggedIn) return;
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, isLoggedIn, passcode]);

  const fmt = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-[#F5E6C8] flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#E85D4C] mb-8">🫘 REIN PADEL ADMIN</h1>
          <form onSubmit={(e) => { e.preventDefault(); fetchStats(); }} className="space-y-4 max-w-xs mx-auto">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="PASSCODE"
              className="w-full bg-[#080808] border border-[#E85D4C] text-center p-4 text-lg tracking-widest"
            />
            <button className="w-full bg-[#E85D4C] text-[#0d0d0d] p-4 font-bold tracking-wider hover:bg-[#D4A84B]">
              ACCÉDER
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#F5E6C8] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center mb-8 pb-4 border-b border-[#E85D4C]/20">
          <h1 className="text-2xl font-bold text-[#E85D4C] flex items-center gap-3">
            🫘 REIN PADEL STATS
            <span className="text-sm px-3 py-1 bg-green-500 text-black rounded animate-pulse">
              ● {stats?.overview.liveVisitors || 0} LIVE
            </span>
          </h1>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 border text-xs tracking-wider ${autoRefresh ? 'bg-[#E85D4C] text-black border-[#E85D4C]' : 'border-[#E85D4C] text-[#E85D4C]'}`}
            >
              AUTO {autoRefresh ? '●' : '○'}
            </button>
            <button onClick={fetchStats} className="px-4 py-2 border border-[#E85D4C] text-[#E85D4C] text-xs tracking-wider hover:bg-[#E85D4C] hover:text-black">
              ↻ REFRESH
            </button>
          </div>
        </header>

        {/* Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Live Now', value: stats?.overview.liveVisitors, color: 'text-green-500' },
            { label: 'Today Views', value: stats?.overview.todayViews, color: 'text-[#D4A84B]' },
            { label: 'Today Unique', value: stats?.overview.todayUnique, color: 'text-[#D4A84B]' },
            { label: 'Yesterday', value: stats?.overview.yesterdayViews },
            { label: 'Total Views', value: stats?.overview.totalViews },
            { label: 'Total Unique', value: stats?.overview.totalUnique },
          ].map((s, i) => (
            <div key={i} className="bg-[#080808] border border-[#E85D4C]/20 p-4 text-center">
              <div className={`text-3xl font-bold ${s.color || 'text-[#E85D4C]'}`}>{fmt(s.value || 0)}</div>
              <div className="text-xs text-[#D4A84B] mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mb-8">
          <h2 className="text-sm text-[#D4A84B] mb-2 uppercase tracking-wider">Last 7 Days</h2>
          <div className="bg-[#080808] border border-[#E85D4C]/20 p-4 flex items-end gap-2 h-48">
            {stats?.daily.map((d, i) => {
              const max = Math.max(...(stats?.daily.map(x => x.views) || [1]));
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-[10px] text-[#E85D4C]">{d.views}/{d.unique}</div>
                  <div className="flex gap-0.5 items-end h-28">
                    <div className="w-3 bg-[#E85D4C]" style={{ height: `${Math.max((d.views / max) * 100, 2)}%` }} />
                    <div className="w-3 bg-[#D4A84B] opacity-70" style={{ height: `${Math.max((d.unique / max) * 100, 2)}%` }} />
                  </div>
                  <div className="text-[10px] opacity-50">{d.date.slice(5)}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'Pages', data: stats?.pages, key: 'page' },
            { title: 'Countries', data: stats?.countries, key: 'country' },
            { title: 'Devices', data: stats?.devices, key: 'device' },
            { title: 'Browsers', data: stats?.browsers, key: 'browser' },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-sm text-[#D4A84B] mb-2 uppercase tracking-wider">{section.title}</h2>
              <div className="bg-[#080808] border border-[#E85D4C]/20 max-h-48 overflow-y-auto">
                {(section.data || []).slice(0, 10).map((item: Record<string, unknown>, j: number) => (
                  <div key={j} className="flex justify-between px-3 py-2 border-b border-[#E85D4C]/10 text-sm">
                    <span className="opacity-70 truncate max-w-[70%]">{String(item[section.key])}</span>
                    <span className="text-[#E85D4C] font-bold">{String(item.views)}</span>
                  </div>
                ))}
                {(!section.data || section.data.length === 0) && <div className="p-3 opacity-50">No data</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Recent */}
        <div>
          <h2 className="text-sm text-[#D4A84B] mb-2 uppercase tracking-wider">Recent Visits</h2>
          <div className="bg-[#080808] border border-[#E85D4C]/20 max-h-64 overflow-y-auto">
            {(stats?.recent || []).map((v, i) => (
              <div key={i} className="flex justify-between px-3 py-2 border-b border-[#E85D4C]/10 text-sm">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[#E85D4C]">{v.page || '/'}</span>
                  <span className="text-[#D4A84B]">{v.city !== 'unknown' ? `${v.city}, ` : ''}{v.country}</span>
                  <span className="opacity-50">{v.device} · {v.browser}</span>
                </div>
                <span className="opacity-40 text-xs">{new Date(v.time).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[#E85D4C]/10 text-center text-xs opacity-30">
          Last updated: {stats?.generatedAt ? new Date(stats.generatedAt).toLocaleString() : '-'}
        </div>
      </div>
    </div>
  );
}
