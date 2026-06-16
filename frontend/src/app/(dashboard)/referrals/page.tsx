'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Copy, Gift, Users, TrendingUp } from 'lucide-react';

export default function ReferralsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Referral Program"
        description="Earn rewards by referring friends to TradeMentor"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard title="Total Earned" value="$850" icon={Gift} delay={0} />
        <StatCard title="Friends Referred" value="12" icon={Users} delay={0.1} />
        <StatCard title="Successful Conversions" value="8" icon={TrendingUp} delay={0.2} />
        <StatCard title="Pending Rewards" value="$125" icon={Gift} delay={0.3} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                readOnly
                value="https://tradementor.app/ref/abc123def456"
                className="bg-white/5"
              />
              <Button variant="outline" className="flex items-center gap-2">
                <Copy className="w-4 h-4" /> Copy
              </Button>
            </div>
            <p className="text-sm text-white/60 mt-3">
              Share this link with friends. You&apos;ll earn 20% of their subscription fees for the first year!
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: 'Share Your Link',
                  description: 'Copy and share your unique referral link with friends',
                },
                {
                  step: 2,
                  title: 'They Sign Up',
                  description: 'Friends create an account using your referral link',
                },
                {
                  step: 3,
                  title: 'They Subscribe',
                  description: 'They upgrade to a paid plan (Free tier doesn\'t count)',
                },
                {
                  step: 4,
                  title: 'You Earn',
                  description: 'You get 20% of their subscription for 12 months',
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + item.step * 0.05 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-neon-blue/20 border border-neon-blue flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-neon-blue">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-white/60">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Referral History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/60 text-xs uppercase border-b border-white/10">
                    <th className="text-left py-3 px-2">Referral</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-right py-3 px-2">Joined</th>
                    <th className="text-right py-3 px-2">Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'John Doe', status: 'Active', date: '2024-05-15', earned: 59.98 },
                    { name: 'Jane Smith', status: 'Active', date: '2024-04-20', earned: 59.98 },
                    { name: 'Mike Johnson', status: 'Active', date: '2024-06-01', earned: 29.99 },
                    { name: 'Sarah Williams', status: 'Trial', date: '2024-06-25', earned: 0 },
                  ].map((ref, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-2">{ref.name}</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 text-xs rounded bg-neon-green/20 text-neon-green">
                          {ref.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">{ref.date}</td>
                      <td className="py-3 px-2 text-right font-semibold text-neon-green">
                        ${ref.earned}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
