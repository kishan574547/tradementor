'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { stocksApi, type TechnicalAnalysis } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

const SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA', 'RELIANCE'];

export default function MovingAveragesPage() {
  const [data, setData] = useState<TechnicalAnalysis[]>([]);
  useEffect(() => {
    Promise.all(SYMBOLS.map((s) => stocksApi.analysis(s))).then(setData).catch(() => {});
  }, []);

  return (
    <div>
      <PageHeader title="Moving Averages" description="MA20, MA50, and MA200 trend analysis" />
      <div className="grid gap-4 md:grid-cols-2">
        {data.map((d) => (
          <Card key={d.symbol}>
            <CardContent className="p-5">
              <p className="font-bold text-white text-lg mb-4">{d.symbol}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-xs text-white/40">MA20</p>
                  <p className="text-white font-semibold mt-1">{formatCurrency(d.ma20)}</p>
                </div>
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-xs text-white/40">MA50</p>
                  <p className="text-neon-blue font-semibold mt-1">{formatCurrency(d.ma50)}</p>
                </div>
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-xs text-white/40">MA200</p>
                  <p className="text-neon-green font-semibold mt-1">{formatCurrency(d.ma200)}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-white/40">
                {d.ma50 > d.ma200 ? 'Golden cross territory (MA50 > MA200)' : 'Death cross territory (MA50 < MA200)'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
