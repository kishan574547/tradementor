'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { TradingChart } from '@/components/charts/TradingChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { stocksApi, ordersApi, type StockQuote, type Candle, type TechnicalAnalysis } from '@/lib/api';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { SignalBadge } from '@/components/shared/StockTable';

export default function StockDetailPage() {
  const params = useParams();
  const symbol = (params.symbol as string).toUpperCase();
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [analysis, setAnalysis] = useState<TechnicalAnalysis | null>(null);

  useEffect(() => {
    stocksApi.quote(symbol).then(setQuote).catch(() => {});
    stocksApi.candles(symbol, 90).then(setCandles).catch(() => {});
    stocksApi.analysis(symbol).then(setAnalysis).catch(() => {});
  }, [symbol]);

  const placeOrder = async (side: 'BUY' | 'SELL') => {
    await ordersApi.create({ symbol, side, quantity: 1 });
    alert(`${side} order placed for 1 share of ${symbol}`);
  };

  return (
    <div>
      <PageHeader
        title={symbol}
        description={quote?.name}
        action={
          <div className="flex gap-2">
            <Button variant="success" onClick={() => placeOrder('BUY')}>Buy</Button>
            <Button variant="destructive" onClick={() => placeOrder('SELL')}>Sell</Button>
          </div>
        }
      />

      {quote && (
        <div className="mb-6 flex flex-wrap items-end gap-4">
          <span className="text-4xl font-bold text-white">{formatCurrency(quote.price)}</span>
          <span className={quote.change >= 0 ? 'stat-positive text-xl' : 'stat-negative text-xl'}>
            {formatPercent(quote.changePercent)}
          </span>
          {analysis && <SignalBadge signal={analysis.signal} />}
        </div>
      )}

      <Card className="mb-6">
        <CardContent className="pt-6">
          {candles.length > 0 ? <TradingChart data={candles} height={450} /> : <div className="h-[450px] animate-pulse bg-white/5 rounded-xl" />}
        </CardContent>
      </Card>

      {analysis && (
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'RSI', value: analysis.rsi.toFixed(1) },
            { label: 'MACD', value: analysis.macd.toFixed(4) },
            { label: 'MA50', value: formatCurrency(analysis.ma50) },
            { label: 'MA200', value: formatCurrency(analysis.ma200) },
          ].map((m) => (
            <Card key={m.label}>
              <CardHeader><CardTitle className="text-sm text-white/50">{m.label}</CardTitle></CardHeader>
              <CardContent><p className="text-2xl font-bold text-white">{m.value}</p></CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
