'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingDown } from 'lucide-react';

const riskData = [
  { day: '1', var95: 5000, var99: 7500, cvar: 8500 },
  { day: '5', var95: 12000, var99: 18000, cvar: 20000 },
  { day: '10', var95: 18500, var99: 27000, cvar: 30000 },
  { day: '20', var95: 28000, var99: 41000, cvar: 45000 },
];

export default function RiskCalculatorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Risk Calculator"
        description="Analyze portfolio risk, Value at Risk (VaR), and risk metrics"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard title="Portfolio Beta" value="1.24" icon={TrendingDown} delay={0} />
        <StatCard title="Value at Risk (95%)" value="$12,450" icon={AlertCircle} delay={0.1} />
        <StatCard title="Conditional VaR" value="$15,680" icon={AlertCircle} delay={0.2} />
        <StatCard title="Sharpe Ratio" value="1.85" icon={TrendingDown} delay={0.3} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Value at Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={riskData}>
                <defs>
                  <linearGradient id="colorVar95" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorVar99" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff9500" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff9500" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #00d4ff' }} />
                <Area type="monotone" dataKey="var95" stackId="1" stroke="#00d4ff" fill="url(#colorVar95)" />
                <Area type="monotone" dataKey="var99" stackId="1" stroke="#ff9500" fill="url(#colorVar99)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-4 md:grid-cols-2"
      >
        <Card>
          <CardHeader>
            <CardTitle>Risk Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Market Risk', value: '45%', color: 'bg-neon-blue' },
                { name: 'Sector Risk', value: '28%', color: 'bg-neon-green' },
                { name: 'Single Stock Risk', value: '18%', color: 'bg-yellow-500' },
                { name: 'Other', value: '9%', color: 'bg-purple-500' },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/80">{item.name}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: item.value }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 text-white/80">
                <span className="text-neon-green">✓</span> Increase diversification in tech sector
              </li>
              <li className="flex gap-2 text-white/80">
                <span className="text-neon-green">✓</span> Consider adding defensive stocks
              </li>
              <li className="flex gap-2 text-white/80">
                <span className="text-neon-green">✓</span> Reduce concentration in AAPL position
              </li>
              <li className="flex gap-2 text-white/80">
                <span className="text-neon-green">✓</span> Add international exposure
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
