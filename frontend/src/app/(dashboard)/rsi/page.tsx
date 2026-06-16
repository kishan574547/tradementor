'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { stocksApi, type TechnicalAnalysis } from '@/lib/api';

const SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA', 'RELIANCE', 'TCS'];

export default function RSIPage() {
  const [data, setData] = useState<TechnicalAnalysis[]>([]);
  useEffect(() => {
    Promise.all(SYMBOLS.map((s) => stocksApi.analysis(s))).then(setData).catch(() => {});
  }, []);

  return (
    <div>
      <PageHeader title="RSI Analysis" description="Relative Strength Index — oversold (&lt;30) and overbought (&gt;70) zones" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((d) => {
          const status = d.rsi < 30 ? 'Oversold' : d.rsi > 70 ? 'Overbought' : 'Neutral';
          const color = d.rsi < 30 ? 'text-neon-green' : d.rsi > 70 ? 'text-red-400' : 'text-neon-blue';
          return (
            <Card key={d.symbol}>
              <CardContent className="p-5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-lg">{d.symbol}</span>
                  <span className={`text-2xl font-bold ${color}`}>{d.rsi.toFixed(1)}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-neon-green via-neon-blue to-red-400" style={{ width: `${d.rsi}%` }} />
                </div>
                <p className={`mt-2 text-sm ${color}`}>{status}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
