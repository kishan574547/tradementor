'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DollarSign, TrendingUp } from 'lucide-react';

const dividendData = [
  { symbol: 'AAPL', company: 'Apple', yield: 0.43, amount: 234, exDate: '2024-08-09', payDate: '2024-08-15' },
  { symbol: 'JNJ', company: 'Johnson & Johnson', yield: 2.85, amount: 1250, exDate: '2024-08-16', payDate: '2024-09-06' },
  { symbol: 'KO', company: 'Coca-Cola', yield: 3.06, amount: 680, exDate: '2024-08-23', payDate: '2024-09-13' },
  { symbol: 'PG', company: 'Procter & Gamble', yield: 2.49, amount: 560, exDate: '2024-08-30', payDate: '2024-09-20' },
];

const incomeData = [
  { month: 'Jan', income: 1500 },
  { month: 'Feb', income: 1800 },
  { month: 'Mar', income: 2100 },
  { month: 'Apr', income: 1900 },
  { month: 'May', income: 2400 },
  { month: 'Jun', income: 2800 },
];

const chartData = [
  { name: 'AAPL', value: 234 },
  { name: 'JNJ', value: 1250 },
  { name: 'KO', value: 680 },
  { name: 'PG', value: 560 },
];

const COLORS = ['#00d4ff', '#00ff88', '#a855f7', '#ff9500'];

export default function DividendTrackerPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dividend Tracker"
        description="Track dividend income and upcoming payouts"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard title="Annual Income" value="$12,450" icon={DollarSign} delay={0} />
        <StatCard title="Monthly Average" value="$1,038" icon={DollarSign} delay={0.1} />
        <StatCard title="Upcoming (30 days)" value="$3,280" icon={TrendingUp} delay={0.2} />
        <StatCard title="Portfolio Yield" value="2.34%" icon={TrendingUp} delay={0.3} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Dividend Income Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #00d4ff' }} />
                <Line type="monotone" dataKey="income" stroke="#00d4ff" strokeWidth={2} dot={{ fill: '#00d4ff' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card>
          <CardHeader>
            <CardTitle>Income Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Dividends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dividendData.map((div, idx) => (
                <motion.div
                  key={div.symbol}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/10"
                >
                  <div>
                    <p className="font-semibold">{div.symbol}</p>
                    <p className="text-xs text-white/60">Ex: {div.exDate}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="success">${div.amount}</Badge>
                    <p className="text-xs text-white/60 mt-1">{div.yield}%</p>
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
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Dividend History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/60 text-xs uppercase border-b border-white/10">
                    <th className="text-left py-3 px-2">Symbol</th>
                    <th className="text-left py-3 px-2">Ex-Date</th>
                    <th className="text-left py-3 px-2">Pay Date</th>
                    <th className="text-right py-3 px-2">Amount</th>
                    <th className="text-right py-3 px-2">Yield %</th>
                  </tr>
                </thead>
                <tbody>
                  {dividendData.map((div) => (
                    <tr key={div.symbol} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-2 font-semibold neon-text-blue">{div.symbol}</td>
                      <td className="py-3 px-2">{div.exDate}</td>
                      <td className="py-3 px-2">{div.payDate}</td>
                      <td className="py-3 px-2 text-right stat-positive">${div.amount}</td>
                      <td className="py-3 px-2 text-right">{div.yield}%</td>
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
