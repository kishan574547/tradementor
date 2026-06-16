'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { StockTable } from '@/components/shared/StockTable';
import { stocksApi, type StockQuote } from '@/lib/api';

export default function ScreenerPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StockQuote[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    try {
      const found = await stocksApi.search(query);
      const quotes = await stocksApi.quotes(found.map((f) => f.symbol));
      setResults(quotes);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Stock Screener" description="Search and filter stocks across markets" />
      <div className="mb-4 flex gap-2">
        <Input placeholder="Search by symbol or name..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button onClick={search} disabled={loading}>{loading ? 'Searching...' : 'Search'}</Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          {results.length > 0 ? <StockTable quotes={results} /> : <p className="text-center text-white/40 py-8">Search for stocks to screen</p>}
        </CardContent>
      </Card>
    </div>
  );
}
