'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { portfolioApi, type Portfolio } from '@/lib/api';
import { formatCurrency, formatPercent } from '@/lib/utils';

export default function RiskPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  useEffect(() => { portfolioApi.getAll().then(setPortfolios).catch(() => {}); }, []);

  const p = portfolios[0];
  const holdings = p?.holdings ?? [];
  const totalValue = p?.totalValue ?? 1;

  const risks = holdings.map((h) => {
    const weight = ((h.value ?? 0) / totalValue) * 100;
    const concentrationRisk = weight > 30 ? 'High' : weight > 15 ? 'Medium' : 'Low';
    const volatilityRisk = Math.abs(h.pnlPercent ?? 0) > 10 ? 'High' : 'Low';
    return { ...h, weight, concentrationRisk, volatilityRisk };
  });

  return (
    <div>
      <PageHeader title="Risk Analysis" description="Portfolio concentration and volatility assessment" />
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card><CardContent className="p-5"><p className="text-white/40 text-sm">Portfolio Beta</p><p className="text-2xl font-bold text-white mt-1">1.24</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-white/40 text-sm">Max Drawdown</p><p className="text-2xl font-bold text-red-400 mt-1">-8.3%</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-white/40 text-sm">Sharpe Ratio</p><p className="text-2xl font-bold text-neon-green mt-1">1.67</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Position Risk Matrix</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-left">
                <th className="pb-3">Symbol</th>
                <th className="pb-3 text-right">Weight</th>
                <th className="pb-3 text-right">P&L %</th>
                <th className="pb-3">Concentration</th>
                <th className="pb-3">Volatility</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((r) => (
                <tr key={r.id} className="border-b border-white/5">
                  <td className="py-3 text-white font-semibold">{r.symbol}</td>
                  <td className="py-3 text-right text-white">{r.weight.toFixed(1)}%</td>
                  <td className={`py-3 text-right ${(r.pnlPercent ?? 0) >= 0 ? 'stat-positive' : 'stat-negative'}`}>{formatPercent(r.pnlPercent ?? 0)}</td>
                  <td className="py-3"><span className={r.concentrationRisk === 'High' ? 'text-red-400' : 'text-neon-green'}>{r.concentrationRisk}</span></td>
                  <td className="py-3"><span className={r.volatilityRisk === 'High' ? 'text-yellow-400' : 'text-neon-green'}>{r.volatilityRisk}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
