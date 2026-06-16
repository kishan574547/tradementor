'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { signalsApi, type TradingSignal } from '@/lib/api';
import { SignalBadge } from '@/components/shared/StockTable';
import Link from 'next/link';

export default function SignalsPage() {
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  useEffect(() => { signalsApi.getAll().then(setSignals).catch(() => {}); }, []);

  return (
    <div>
      <PageHeader title="Trading Signals" description="Rule-based BUY/SELL/HOLD signals with technical indicators" />
      <div className="grid gap-4 md:grid-cols-2">
        {signals.map((s) => (
          <Card key={s.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <Link href={`/stock/${s.symbol}`} className="text-xl font-bold text-neon-blue">{s.symbol}</Link>
                  <p className="mt-2 text-sm text-white/50">{s.reason}</p>
                  <div className="mt-3 flex gap-4 text-xs text-white/40">
                    {s.rsi != null && <span>RSI: {s.rsi.toFixed(1)}</span>}
                    {s.macd != null && <span>MACD: {s.macd.toFixed(4)}</span>}
                    <span>Strength: {s.strength}%</span>
                  </div>
                </div>
                <SignalBadge signal={s.signal} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
