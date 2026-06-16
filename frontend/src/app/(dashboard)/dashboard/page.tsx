'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Zap, Bot } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { StockTable } from '@/components/shared/StockTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TradingChart } from '@/components/charts/TradingChart';
import { portfolioApi, signalsApi, stocksApi } from '@/lib/api';
import type { Portfolio, TradingSignal, StockQuote, Candle } from '@/lib/api';
import { formatCurrency, formatPercent } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignalBadge } from '@/components/shared/StockTable';

export default function DashboardPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [quotes, setQuotes] = useState<StockQuote[]>([]);
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    portfolioApi.getAll().then(setPortfolios).catch(() => {});
    signalsApi.getAll().then((s) => setSignals(s.slice(0, 5))).catch(() => {});
    stocksApi.quotes(['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA']).then(setQuotes).catch(() => {});
    stocksApi.candles('AAPL', 60).then(setCandles).catch(() => {});
  }, []);

  const portfolio = portfolios[0];
  const totalValue = portfolio?.totalValue ?? 0;
  const totalPnl = portfolio?.totalPnl ?? 0;
  const totalPnlPct = portfolio?.totalPnlPercent ?? 0;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Your real-time trading command center"
        action={
          <Link href="/ai-assistant">
            <Button variant="outline" className="gap-2">
              <Bot className="h-4 w-4" /> Ask AI
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Portfolio Value" value={formatCurrency(totalValue)} change={formatPercent(totalPnlPct)} positive={totalPnl >= 0} icon={Wallet} />
        <StatCard title="Today's P&L" value={formatCurrency(totalPnl)} positive={totalPnl >= 0} icon={TrendingUp} delay={0.1} />
        <StatCard title="Active Signals" value={String(signals.length)} icon={Zap} delay={0.2} />
        <StatCard title="AI Confidence" value="87%" change="High accuracy" positive icon={Bot} delay={0.3} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AAPL — Candlestick Chart</CardTitle>
          </CardHeader>
          <CardContent>
            {candles.length > 0 ? <TradingChart data={candles} /> : <div className="h-[400px] animate-pulse rounded-xl bg-white/5" />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {signals.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3">
                <div>
                  <p className="font-semibold text-white">{s.symbol}</p>
                  <p className="text-xs text-white/40 line-clamp-1">{s.reason}</p>
                </div>
                <SignalBadge signal={s.signal} />
              </div>
            ))}
            <Link href="/signals">
              <Button variant="ghost" className="w-full">View All Signals</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <StockTable quotes={quotes} />
        </CardContent>
      </Card>
    </div>
  );
}
