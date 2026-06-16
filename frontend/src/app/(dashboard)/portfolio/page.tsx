'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { portfolioApi, type Portfolio } from '@/lib/api';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { Wallet, TrendingUp, PieChart } from 'lucide-react';
import Link from 'next/link';

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  useEffect(() => {
    portfolioApi.getAll().then(setPortfolios).catch(() => {});
  }, []);

  const p = portfolios[0];

  return (
    <div>
      <PageHeader title="Portfolio" description="Track holdings, P&L, and allocation" />
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <StatCard title="Total Value" value={formatCurrency(p?.totalValue ?? 0)} icon={Wallet} />
        <StatCard title="Total P&L" value={formatCurrency(p?.totalPnl ?? 0)} change={formatPercent(p?.totalPnlPercent ?? 0)} positive={(p?.totalPnl ?? 0) >= 0} icon={TrendingUp} />
        <StatCard title="Holdings" value={String(p?.holdings?.length ?? 0)} icon={PieChart} />
      </div>
      <Card>
        <CardHeader><CardTitle>Holdings</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-left">
                <th className="pb-3">Symbol</th>
                <th className="pb-3 text-right">Qty</th>
                <th className="pb-3 text-right">Avg Price</th>
                <th className="pb-3 text-right">Current</th>
                <th className="pb-3 text-right">P&L</th>
              </tr>
            </thead>
            <tbody>
              {p?.holdings?.map((h) => (
                <tr key={h.id} className="border-b border-white/5">
                  <td className="py-3">
                    <Link href={`/stock/${h.symbol}`} className="text-neon-blue font-semibold">{h.symbol}</Link>
                  </td>
                  <td className="py-3 text-right text-white">{h.quantity}</td>
                  <td className="py-3 text-right text-white/70">{formatCurrency(h.avgPrice)}</td>
                  <td className="py-3 text-right text-white">{formatCurrency(h.currentPrice ?? h.avgPrice)}</td>
                  <td className={`py-3 text-right ${(h.pnl ?? 0) >= 0 ? 'stat-positive' : 'stat-negative'}`}>
                    {formatCurrency(h.pnl ?? 0)} ({formatPercent(h.pnlPercent ?? 0)})
                  </td>
                </tr>
              )) ?? <tr><td colSpan={5} className="py-8 text-center text-white/40">No holdings yet</td></tr>}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
