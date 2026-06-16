'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp } from 'lucide-react';

export default function OptionsCalculatorPage() {
  const [params, setParams] = useState({
    spotPrice: 150,
    strikePrice: 155,
    rate: 5,
    timeToExpiry: 30,
    volatility: 20,
  });

  const callPrice = 3.45;
  const putPrice = 2.15;
  const delta = 0.65;
  const gamma = 0.025;
  const vega = 0.45;
  const theta = -0.08;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Options Calculator"
        description="Calculate option prices and Greeks (Delta, Gamma, Vega, Theta)"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-neon-blue" />
              Option Parameters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="text-xs text-white/60 uppercase">Spot Price ($)</label>
                <Input
                  type="number"
                  className="mt-2"
                  value={params.spotPrice}
                  onChange={(e) => setParams({ ...params, spotPrice: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-xs text-white/60 uppercase">Strike Price ($)</label>
                <Input
                  type="number"
                  className="mt-2"
                  value={params.strikePrice}
                  onChange={(e) => setParams({ ...params, strikePrice: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-xs text-white/60 uppercase">Interest Rate (%)</label>
                <Input
                  type="number"
                  className="mt-2"
                  value={params.rate}
                  onChange={(e) => setParams({ ...params, rate: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-xs text-white/60 uppercase">Time to Expiry (Days)</label>
                <Input
                  type="number"
                  className="mt-2"
                  value={params.timeToExpiry}
                  onChange={(e) => setParams({ ...params, timeToExpiry: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-xs text-white/60 uppercase">Volatility (%)</label>
                <Input
                  type="number"
                  className="mt-2"
                  value={params.volatility}
                  onChange={(e) => setParams({ ...params, volatility: Number(e.target.value) })}
                />
              </div>
            </div>
            <Button className="mt-4 w-full">Calculate</Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4 md:grid-cols-2"
      >
        <StatCard title="Call Price" value={`$${callPrice.toFixed(2)}`} icon={TrendingUp} delay={0} />
        <StatCard title="Put Price" value={`$${putPrice.toFixed(2)}`} icon={TrendingUp} delay={0.1} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Greeks Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-white/60 uppercase mb-2">Delta</p>
                <p className="text-2xl font-bold neon-text-blue">{delta.toFixed(2)}</p>
                <p className="text-xs text-white/40 mt-2">Rate of change vs stock price</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-white/60 uppercase mb-2">Gamma</p>
                <p className="text-2xl font-bold neon-text-green">{gamma.toFixed(3)}</p>
                <p className="text-xs text-white/40 mt-2">Delta acceleration</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-white/60 uppercase mb-2">Vega</p>
                <p className="text-2xl font-bold text-yellow-500">{vega.toFixed(2)}</p>
                <p className="text-xs text-white/40 mt-2">Sensitivity to volatility</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-white/60 uppercase mb-2">Theta</p>
                <p className="text-2xl font-bold text-red-500">{theta.toFixed(2)}</p>
                <p className="text-xs text-white/40 mt-2">Time decay per day</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
