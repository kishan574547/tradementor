'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { stocksApi, type TechnicalAnalysis } from '@/lib/api';

const SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA'];

export default function MACDPage() {
  const [data, setData] = useState<TechnicalAnalysis[]>([]);
  useEffect(() => {
    Promise.all(SYMBOLS.map((s) => stocksApi.analysis(s))).then(setData).catch(() => {});
  }, []);

  return (
    <div>
      <PageHeader title="MACD Analysis" description="Moving Average Convergence Divergence signals" />
      <div className="space-y-4">
        {data.map((d) => (
          <Card key={d.symbol}>
            <CardContent className="p-5 flex flex-wrap items-center justify-between gap-4">
              <span className="font-bold text-white text-lg">{d.symbol}</span>
              <div className="flex gap-8 text-sm">
                <div><span className="text-white/40">MACD</span><p className="text-white font-mono">{d.macd.toFixed(4)}</p></div>
                <div><span className="text-white/40">Signal</span><p className="text-white font-mono">{d.macdSignal.toFixed(4)}</p></div>
                <div><span className="text-white/40">Histogram</span><p className={d.macdHistogram >= 0 ? 'text-neon-green font-mono' : 'text-red-400 font-mono'}>{d.macdHistogram.toFixed(4)}</p></div>
              </div>
              <span className={d.macdHistogram >= 0 ? 'text-neon-green' : 'text-red-400'}>
                {d.macdHistogram >= 0 ? 'Bullish' : 'Bearish'}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
