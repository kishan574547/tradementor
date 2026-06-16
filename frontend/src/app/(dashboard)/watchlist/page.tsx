'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { watchlistApi, type Watchlist } from '@/lib/api';
import { formatCurrency, formatPercent } from '@/lib/utils';
import Link from 'next/link';

export default function WatchlistPage() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [symbol, setSymbol] = useState('');

  const load = () => watchlistApi.getAll().then(setWatchlists).catch(() => {});
  useEffect(() => { load(); }, []);

  const addSymbol = async () => {
    const wl = watchlists[0];
    if (!wl || !symbol.trim()) return;
    await watchlistApi.addItem(wl.id, symbol.trim());
    setSymbol('');
    load();
  };

  const wl = watchlists[0];

  return (
    <div>
      <PageHeader title="Watchlist" description="Track your favorite stocks in real-time" />
      <div className="mb-4 flex gap-2">
        <Input placeholder="Add symbol (e.g. AAPL)" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        <Button onClick={addSymbol}>Add</Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {wl?.items?.map((item) => (
              <Link
                key={item.id}
                href={`/stock/${item.symbol}`}
                className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-neon-blue/30 transition-colors"
              >
                <p className="font-bold text-white">{item.symbol}</p>
                {item.quote ? (
                  <>
                    <p className="text-lg font-semibold text-white mt-1">{formatCurrency(item.quote.price)}</p>
                    <p className={item.quote.change >= 0 ? 'stat-positive text-sm' : 'stat-negative text-sm'}>
                      {formatPercent(item.quote.changePercent)}
                    </p>
                  </>
                ) : (
                  <p className="text-white/40 text-sm mt-1">Loading...</p>
                )}
              </Link>
            )) ?? <p className="text-white/40 col-span-full text-center py-8">No symbols in watchlist</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
