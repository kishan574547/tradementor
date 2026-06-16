'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', users: 120, revenue: 2400 },
  { month: 'Feb', users: 180, revenue: 3600 },
  { month: 'Mar', users: 250, revenue: 5200 },
  { month: 'Apr', users: 310, revenue: 6800 },
  { month: 'May', users: 420, revenue: 9100 },
];

export default function AdminAnalyticsPage() {
  return (
    <div>
      <PageHeader title="Admin Analytics" description="Platform growth and revenue metrics" />
      <Card>
        <CardHeader><CardTitle>Monthly Growth</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis dataKey="month" stroke="#ffffff60" />
              <YAxis stroke="#ffffff60" />
              <Tooltip contentStyle={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.1)' }} />
              <Bar dataKey="users" fill="#00d4ff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="#00ff88" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
