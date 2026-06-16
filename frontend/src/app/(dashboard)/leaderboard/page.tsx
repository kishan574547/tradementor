'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Users } from 'lucide-react';

const topTraders = [
  { rank: 1, name: 'Alex Chen', returns: '234.5%', followers: 2840, badge: '🏆' },
  { rank: 2, name: 'Sarah Johnson', returns: '198.3%', followers: 2120, badge: '🥈' },
  { rank: 3, name: 'Mike Wilson', returns: '187.2%', followers: 1980, badge: '🥉' },
  { rank: 4, name: 'Emma Davis', returns: '165.8%', followers: 1560, badge: '' },
  { rank: 5, name: 'John Smith', returns: '152.3%', followers: 1240, badge: '' },
  { rank: 6, name: 'Lisa Anderson', returns: '148.7%', followers: 980, badge: '' },
  { rank: 7, name: 'David Park', returns: '142.1%', followers: 850, badge: '' },
  { rank: 8, name: 'Jennifer Lee', returns: '138.5%', followers: 720, badge: '' },
  { rank: 9, name: 'Robert Brown', returns: '135.2%', followers: 650, badge: '' },
  { rank: 10, name: 'Maria Garcia', returns: '128.9%', followers: 540, badge: '' },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Top Traders Leaderboard"
        description="See the best-performing traders and their followers"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card>
          <CardContent className="pt-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">#5,234</p>
            <p className="text-xs text-white/60 mt-1">Your Rank</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="w-8 h-8 text-neon-green mx-auto mb-2" />
            <p className="text-2xl font-bold">45.3%</p>
            <p className="text-xs text-white/60 mt-1">Your Return</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="w-8 h-8 text-neon-blue mx-auto mb-2" />
            <p className="text-2xl font-bold">124</p>
            <p className="text-xs text-white/60 mt-1">Your Followers</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Traders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topTraders.map((trader, idx) => (
                <motion.div
                  key={trader.rank}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.03 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold w-6 text-neon-blue">#{trader.rank}</span>
                    <span className="text-lg">{trader.badge}</span>
                    <div>
                      <p className="font-semibold text-white">{trader.name}</p>
                      <p className="text-xs text-white/60">{trader.followers.toLocaleString()} followers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neon-green">+{trader.returns}</p>
                    <Button size="sm" variant="outline" className="mt-1">
                      Follow
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
