'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { portfolioApi, type Portfolio } from '@/lib/api';
import { formatCurrency, formatPercent } from '@/lib/utils';
import Link from 'next/link';

export default function PositionsPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  useEffect(() => { portfolioApi.getAll().then(setPortfolios).catch(() => {}); }, []);

  const holdings = portfolios[0]?.holdings ?? [];

  return (
    <div>
      <PageHeader title="Open Positions" description="Active positions with real-time P&L" />
      <div className="grid gap-4">
        {holdings.map((h) => (
          <Card key={h.id}>
            <CardContent className="p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <Link href={`/stock/${h.symbol}`} className="text-xl font-bold text-neon-blue">{h.symbol}</Link>
                <p className="text-sm text-white/40 mt-1">{h.quantity} shares @ {formatCurrency(h.avgPrice)}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-white">{formatCurrency(h.value ?? 0)}</p>
                <p className={(h.pnl ?? 0) >= 0 ? 'stat-positive' : 'stat-negative'}>
                  {formatCurrency(h.pnl ?? 0)} ({formatPercent(h.pnlPercent ?? 0)})
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
