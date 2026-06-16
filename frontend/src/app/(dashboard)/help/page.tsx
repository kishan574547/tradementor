'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';

const faqs = [
  { q: 'How do I add stocks to my watchlist?', a: 'Go to Watchlist page, enter a symbol, and click Add.' },
  { q: 'How does AI recommendation work?', a: 'Our engine combines RSI, MACD, moving averages with OpenAI analysis for actionable insights.' },
  { q: 'Are the stock prices real-time?', a: 'Yes, via WebSocket when API keys are configured. Otherwise demo data with realistic fluctuations is used.' },
  { q: 'How do I upgrade my subscription?', a: 'Visit the Subscription page and select your preferred plan.' },
];

export default function HelpPage() {
  return (
    <div>
      <PageHeader title="Help Center" description="FAQs and support resources" />
      <div className="space-y-4 max-w-3xl">
        {faqs.map((faq) => (
          <Card key={faq.q}>
            <CardContent className="p-5">
              <p className="font-semibold text-white">{faq.q}</p>
              <p className="text-sm text-white/50 mt-2">{faq.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
