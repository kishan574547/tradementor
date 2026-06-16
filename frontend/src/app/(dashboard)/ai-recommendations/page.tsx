'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { stocksApi } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { SignalBadge } from '@/components/shared/StockTable';
import Link from 'next/link';

const SYMBOLS = ['AAPL', 'NVDA', 'TSLA', 'MSFT', 'GOOGL'];

export default function AIRecommendationsPage() {
  const [recs, setRecs] = useState<Awaited<ReturnType<typeof stocksApi.recommendation>>[]>([]);
  useEffect(() => {
    Promise.all(SYMBOLS.map((s) => stocksApi.recommendation(s).catch(() => null)))
      .then((r) => setRecs(r.filter(Boolean) as NonNullable<typeof r[0]>[]))
      .catch(() => {});
  }, []);

  return (
    <div>
      <PageHeader title="AI Recommendations" description="GPT-powered buy/sell analysis with confidence scores" />
      <div className="grid gap-4 md:grid-cols-2">
        {recs.map((r) => (
          <Card key={r.quote.symbol}>
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <Link href={`/stock/${r.quote.symbol}`} className="text-xl font-bold text-neon-blue">{r.quote.symbol}</Link>
                <SignalBadge signal={r.recommendation.action} />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{formatCurrency(r.quote.price)}</p>
              <p className="text-sm text-white/60 mt-3">{r.recommendation.summary}</p>
              <div className="mt-4 flex gap-4 text-xs">
                <span className="text-neon-green">Support: {formatCurrency(r.recommendation.targets.support)}</span>
                <span className="text-red-400">Resistance: {formatCurrency(r.recommendation.targets.resistance)}</span>
              </div>
              <p className="mt-2 text-xs text-neon-blue">Confidence: {r.recommendation.confidence}%</p>
              <ul className="mt-3 space-y-1">
                {r.recommendation.risks.map((risk, i) => (
                  <li key={i} className="text-xs text-white/40">⚠ {risk}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
