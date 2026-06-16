'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: LucideIcon;
  delay?: number;
}

export function StatCard({ title, value, change, positive, icon: Icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="hover:border-neon-blue/30 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">{title}</p>
              <p className="mt-2 text-2xl font-bold text-white">{value}</p>
              {change && (
                <p className={cn('mt-1 text-sm', positive ? 'stat-positive' : 'stat-negative')}>
                  {change}
                </p>
              )}
            </div>
            <div className="rounded-lg bg-neon-blue/10 p-2.5">
              <Icon className="h-5 w-5 text-neon-blue" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
