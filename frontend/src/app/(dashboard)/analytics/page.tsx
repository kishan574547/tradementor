'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { stocksApi, type TechnicalAnalysis } from '@/lib/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA'];

export default function AnalyticsPage() {
  const [data, setData] = useState<TechnicalAnalysis[]>([]);
  useEffect(() => {
    Promise.all(SYMBOLS.map((s) => stocksApi.analysis(s))).then(setData).catch(() => {});
  }, []);

  const chartData = data.map((d) => ({
    symbol: d.symbol,
    rsi: d.rsi,
    strength: d.strength,
    signal: d.signal,
  }));

  return (
    <div>
      <PageHeader title="Market Analytics" description="Cross-market technical analysis overview" />
      <Card className="mb-6">
        <CardHeader><CardTitle>RSI Comparison</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="symbol" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" domain={[0, 100]} />
              <Tooltip contentStyle={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.1)' }} />
              <Bar dataKey="rsi" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.rsi > 70 ? '#ef4444' : entry.rsi < 30 ? '#00ff88' : '#00d4ff'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((d) => (
          <Card key={d.symbol}>
            <CardContent className="p-5">
              <p className="font-bold text-white text-lg">{d.symbol}</p>
              <p className="text-neon-blue mt-1">{d.signal} — {d.strength}% strength</p>
              <p className="text-xs text-white/40 mt-2">{d.reasons.join(' • ')}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
