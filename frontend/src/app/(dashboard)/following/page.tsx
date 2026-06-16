'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { UserPlus, TrendingUp, Activity } from 'lucide-react';

const following = [
  {
    id: 1,
    name: 'Alex Chen',
    status: 'Online',
    returns: '234.5%',
    followers: 2840,
    trades: 45,
    lastTrade: '2 hours ago',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    status: 'Offline',
    returns: '198.3%',
    followers: 2120,
    trades: 38,
    lastTrade: '5 hours ago',
  },
  {
    id: 3,
    name: 'Mike Wilson',
    status: 'Online',
    returns: '187.2%',
    followers: 1980,
    trades: 52,
    lastTrade: '30 mins ago',
  },
  {
    id: 4,
    name: 'Emma Davis',
    status: 'Online',
    returns: '165.8%',
    followers: 1560,
    trades: 28,
    lastTrade: '1 hour ago',
  },
];

export default function FollowingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Following"
        description="Follow traders and get notifications of their trades"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card>
          <CardContent className="pt-6 text-center">
            <UserPlus className="w-8 h-8 text-neon-blue mx-auto mb-2" />
            <p className="text-2xl font-bold">4</p>
            <p className="text-xs text-white/60 mt-1">Traders Following</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Activity className="w-8 h-8 text-neon-green mx-auto mb-2" />
            <p className="text-2xl font-bold">163</p>
            <p className="text-xs text-white/60 mt-1">Total Their Trades</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">196%</p>
            <p className="text-xs text-white/60 mt-1">Avg Return</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        {following.map((trader, idx) => (
          <motion.div
            key={trader.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
          >
            <Card className="hover:border-neon-blue/50 transition">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-neon-green"></div>
                      <h3 className="font-semibold text-white">{trader.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {trader.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-white/60">
                      <div>
                        <p className="text-xs uppercase opacity-60">Return</p>
                        <p className="text-neon-green font-semibold">{trader.returns}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase opacity-60">Followers</p>
                        <p className="font-semibold">{trader.followers.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase opacity-60">Trades</p>
                        <p className="font-semibold">{trader.trades}</p>
                      </div>
                    </div>
                    <p className="text-xs text-white/40 mt-2">Last trade: {trader.lastTrade}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Unfollow
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
