'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';
import { useMarketStore } from '@/store/marketStore';
import { formatCurrency, formatPercent } from '@/lib/utils';

const TICKER_SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA'];

export function Header() {
  const user = useAuthStore((s) => s.user);
  const quotes = useMarketStore((s) => s.quotes);
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-navy-950/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between gap-4 px-6">
        <div className="hidden flex-1 overflow-hidden lg:flex">
          <div className="flex animate-marquee gap-8 whitespace-nowrap">
            {TICKER_SYMBOLS.map((sym) => {
              const q = quotes[sym];
              return (
                <div key={sym} className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-white">{sym}</span>
                  {q ? (
                    <>
                      <span className="text-white/70">{formatCurrency(q.price)}</span>
                      <span className={q.change >= 0 ? 'stat-positive' : 'stat-negative'}>
                        {formatPercent(q.changePercent)}
                      </span>
                    </>
                  ) : (
                    <span className="text-white/30">—</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <form
          className="relative w-full max-w-xs"
          onSubmit={(e) => {
            e.preventDefault();
            if (search.trim()) window.location.href = `/stock/${search.trim().toUpperCase()}`;
          }}
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input
            placeholder="Search stocks..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="flex items-center gap-3">
          <Link
            href="/notifications"
            className="relative rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-neon-green" />
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5"
          >
            <User className="h-4 w-4 text-neon-blue" />
            <span className="hidden text-sm text-white sm:inline">{user?.name ?? 'User'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
