'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, TrendingUp, AlertTriangle, Target } from 'lucide-react';

const insights = [
  { icon: TrendingUp, title: 'Tech Sector Momentum', desc: 'NVDA and MSFT showing strong MACD bullish crossovers. Consider accumulation on dips.', type: 'bullish' },
  { icon: AlertTriangle, title: 'Volatility Alert', desc: 'TSLA RSI approaching overbought territory. Reduce position size or set trailing stops.', type: 'warning' },
  { icon: Target, title: 'Portfolio Rebalance', desc: 'Tech allocation at 68% — above recommended 50%. Consider diversifying into RELIANCE and TCS.', type: 'neutral' },
  { icon: Sparkles, title: 'AI Market Outlook', desc: 'Overall market sentiment neutral-to-bullish. Favor quality large-caps with strong fundamentals.', type: 'bullish' },
];

export default function AIInsightsPage() {
  return (
    <div>
      <PageHeader title="AI Insights" description="Automated market intelligence and portfolio suggestions" />
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((ins) => (
          <Card key={ins.title}>
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className={`rounded-lg p-3 ${ins.type === 'bullish' ? 'bg-neon-green/10' : ins.type === 'warning' ? 'bg-yellow-500/10' : 'bg-neon-blue/10'}`}>
                  <ins.icon className={`h-6 w-6 ${ins.type === 'bullish' ? 'text-neon-green' : ins.type === 'warning' ? 'text-yellow-400' : 'text-neon-blue'}`} />
                </div>
                <div>
                  <p className="font-semibold text-white">{ins.title}</p>
                  <p className="text-sm text-white/50 mt-1">{ins.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
