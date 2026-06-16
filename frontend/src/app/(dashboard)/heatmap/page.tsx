'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { stocksApi, type StockQuote } from '@/lib/api';

const SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NVDA', 'META', 'RELIANCE', 'TCS', 'INFY'];

export default function HeatmapPage() {
  const [quotes, setQuotes] = useState<StockQuote[]>([]);
  useEffect(() => { stocksApi.quotes(SYMBOLS).then(setQuotes).catch(() => {}); }, []);

  return (
    <div>
      <PageHeader title="Market Heatmap" description="Visual performance map across watchlist" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {quotes.map((q) => {
          const intensity = Math.min(Math.abs(q.changePercent) / 5, 1);
          const isPositive = q.change >= 0;
          return (
            <div
              key={q.symbol}
              className="aspect-square rounded-xl flex flex-col items-center justify-center p-4 border border-white/10 transition-transform hover:scale-105"
              style={{
                background: isPositive
                  ? `rgba(0, 255, 136, ${0.1 + intensity * 0.4})`
                  : `rgba(239, 68, 68, ${0.1 + intensity * 0.4})`,
              }}
            >
              <span className="font-bold text-white text-lg">{q.symbol}</span>
              <span className={`text-sm font-semibold mt-1 ${isPositive ? 'text-neon-green' : 'text-red-400'}`}>
                {q.changePercent >= 0 ? '+' : ''}{q.changePercent.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
