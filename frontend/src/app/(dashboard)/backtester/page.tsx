'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Play, RotateCcw } from 'lucide-react';

const performanceData = [
  { month: 'Jan', buy: 3200, hold: 2800, sell: 1400 },
  { month: 'Feb', buy: 3500, hold: 2900, sell: 1200 },
  { month: 'Mar', buy: 4200, hold: 3100, sell: 1800 },
  { month: 'Apr', buy: 5100, hold: 3400, sell: 2100 },
  { month: 'May', buy: 5800, hold: 3600, sell: 2200 },
  { month: 'Jun', buy: 6200, hold: 3800, sell: 2400 },
];

export default function BacktesterPage() {
  const [strategy, setStrategy] = useState('moving-average');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Strategy Backtester"
        description="Test trading strategies on historical data to validate performance"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard title="Total Return" value="145.8%" icon={TrendingUp} delay={0} />
        <StatCard title="Win Rate" value="68.5%" icon={TrendingUp} delay={0.1} />
        <StatCard title="Sharpe Ratio" value="2.34" icon={TrendingUp} delay={0.2} />
        <StatCard title="Max Drawdown" value="-12.3%" icon={TrendingUp} delay={0.3} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Strategy Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-white/60 uppercase">Strategy</label>
                <select
                  className="w-full mt-2 bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                >
                  <option value="moving-average">Moving Average</option>
                  <option value="rsi">RSI</option>
                  <option value="macd">MACD</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-white/60 uppercase">Start Date</label>
                <Input type="date" className="mt-2" />
              </div>
              <div>
                <label className="text-xs text-white/60 uppercase">End Date</label>
                <Input type="date" className="mt-2" />
              </div>
              <div className="flex items-end gap-2">
                <Button className="flex-1 flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" /> Run Backtest
                </Button>
              </div>
            </div>
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
            <CardTitle>Performance Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #00d4ff' }} />
                <Line type="monotone" dataKey="buy" stroke="#00d4ff" strokeWidth={2} />
                <Line type="monotone" dataKey="hold" stroke="#00ff88" strokeWidth={2} />
                <Line type="monotone" dataKey="sell" stroke="#ff4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
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
            <CardTitle>Trade Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/60 text-xs uppercase border-b border-white/10">
                    <th className="text-left py-3 px-2">Date</th>
                    <th className="text-left py-3 px-2">Type</th>
                    <th className="text-right py-3 px-2">Price</th>
                    <th className="text-right py-3 px-2">Qty</th>
                    <th className="text-right py-3 px-2">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: '2024-06-15', type: 'BUY', price: 152.30, qty: 100, pnl: 1230 },
                    { date: '2024-06-18', type: 'SELL', price: 155.50, qty: 100, pnl: 320 },
                    { date: '2024-06-20', type: 'BUY', price: 154.20, qty: 50, qty2: 100, pnl: 890 },
                  ].map((trade, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-2">{trade.date}</td>
                      <td className="py-3 px-2">{trade.type}</td>
                      <td className="py-3 px-2 text-right">${trade.price}</td>
                      <td className="py-3 px-2 text-right">{trade.qty}</td>
                      <td className="py-3 px-2 text-right stat-positive">+${trade.pnl}</td>
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
