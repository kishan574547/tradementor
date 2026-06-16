'use client';

import Link from 'next/link';
import type { StockQuote } from '@/lib/api';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface StockTableProps {
  quotes: StockQuote[];
}

export function StockTable({ quotes }: StockTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-white/40">
            <th className="pb-3 font-medium">Symbol</th>
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium text-right">Price</th>
            <th className="pb-3 font-medium text-right">Change</th>
            <th className="pb-3 font-medium text-right">Volume</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr
              key={q.symbol}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="py-3">
                <Link href={`/stock/${q.symbol}`} className="font-semibold text-neon-blue hover:underline">
                  {q.symbol}
                </Link>
              </td>
              <td className="py-3 text-white/70">{q.name}</td>
              <td className="py-3 text-right font-medium text-white">{formatCurrency(q.price)}</td>
              <td className={`py-3 text-right ${q.change >= 0 ? 'stat-positive' : 'stat-negative'}`}>
                {formatPercent(q.changePercent)}
              </td>
              <td className="py-3 text-right text-white/50">
                {(q.volume / 1_000_000).toFixed(2)}M
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SignalBadge({ signal }: { signal: string }) {
  const variant =
    signal === 'BUY' ? 'success' : signal === 'SELL' ? 'destructive' : 'warning';
  return <Badge variant={variant}>{signal}</Badge>;
}
