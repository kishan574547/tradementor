'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, TrendingUp } from 'lucide-react';

const ideas = [
  {
    id: 1,
    author: 'Alex Chen',
    title: 'Bullish on Tech Stocks - Post-AI Boom',
    description: 'I see a strong breakout potential in AAPL and MSFT. The RSI is oversold and price is bouncing from support.',
    sentiment: 'Bullish',
    score: 234,
    symbol: 'AAPL',
    likes: 245,
    comments: 32,
    shares: 18,
  },
  {
    id: 2,
    author: 'Sarah Johnson',
    title: 'Dividend Yield Play - Energy Sector',
    description: 'Oil prices are stabilizing. XLE offers good dividend yield (~3.5%) with growth potential.',
    sentiment: 'Bullish',
    score: 189,
    symbol: 'XLE',
    likes: 156,
    comments: 24,
    shares: 12,
  },
  {
    id: 3,
    author: 'Mike Wilson',
    title: 'Warning: Tech Correction Coming',
    description: 'Bearish divergence on the daily chart. NASDAQ broke below key support. Consider taking profits.',
    sentiment: 'Bearish',
    score: 167,
    symbol: 'QQQ',
    likes: 198,
    comments: 45,
    shares: 28,
  },
];

export default function IdeasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Community Trading Ideas"
        description="Share and discover trading ideas from the community"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Button className="w-full md:w-auto">+ Share Your Idea</Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {ideas.map((idea, idx) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
          >
            <Card className="hover:border-neon-blue/50 transition">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">{idea.title}</h3>
                      <Badge variant={idea.sentiment === 'Bullish' ? 'success' : 'destructive'}>
                        {idea.sentiment}
                      </Badge>
                    </div>
                    <p className="text-xs text-white/60 mb-2">by {idea.author}</p>
                    <p className="text-sm text-white/80 mb-3">{idea.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{idea.symbol}</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <button className="flex items-center gap-1 hover:text-neon-green transition">
                      <Heart className="w-4 h-4" />
                      {idea.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-neon-blue transition">
                      <MessageCircle className="w-4 h-4" />
                      {idea.comments}
                    </button>
                    <button className="flex items-center gap-1 hover:text-neon-blue transition">
                      <Share2 className="w-4 h-4" />
                      {idea.shares}
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-neon-blue font-semibold text-sm">
                    <TrendingUp className="w-4 h-4" />
                    Score: {idea.score}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
