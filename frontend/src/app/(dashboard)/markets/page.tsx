'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StockTable } from '@/components/shared/StockTable';
import { Card, CardContent } from '@/components/ui/card';
import { stocksApi, type StockQuote } from '@/lib/api';

const SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NVDA', 'META', 'RELIANCE', 'TCS', 'INFY'];

export default function MarketsPage() {
  const [quotes, setQuotes] = useState<StockQuote[]>([]);
  useEffect(() => {
    stocksApi.quotes(SYMBOLS).then(setQuotes).catch(() => {});
  }, []);

  return (
    <div>
      <PageHeader title="Markets" description="Live market data across global equities" />
      <Card>
        <CardContent className="pt-6">
          <StockTable quotes={quotes} />
        </CardContent>
      </Card>
    </div>
  );
}
