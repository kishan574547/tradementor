'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, TrendingUp } from 'lucide-react';

const indicators = [
  {
    name: 'Moving Average',
    shortName: 'MA',
    description: 'Smooths price data to identify trends by averaging prices over a period.',
    formula: 'SMA = (P1 + P2 + ... + Pn) / n',
    category: 'Trend',
    bullish: 'Price above MA',
    bearish: 'Price below MA',
    image: 'chart',
  },
  {
    name: 'Relative Strength Index',
    shortName: 'RSI',
    description: 'Measures momentum by comparing magnitude of recent gains vs losses (0-100).',
    formula: 'RSI = 100 - (100 / (1 + RS))',
    category: 'Momentum',
    bullish: 'RSI > 70 (overbought)',
    bearish: 'RSI < 30 (oversold)',
    image: 'momentum',
  },
  {
    name: 'MACD',
    shortName: 'MACD',
    description: 'Trend-following momentum indicator showing relationship between EMAs.',
    formula: 'MACD = EMA12 - EMA26',
    category: 'Momentum',
    bullish: 'MACD crosses above signal',
    bearish: 'MACD crosses below signal',
    image: 'divergence',
  },
  {
    name: 'Bollinger Bands',
    shortName: 'BB',
    description: 'Volatility bands placed above/below a moving average.',
    formula: 'BB = MA ± (k × StdDev)',
    category: 'Volatility',
    bullish: 'Price bounces from lower band',
    bearish: 'Price bounces from upper band',
    image: 'bands',
  },
];

const maData = [
  { day: 1, price: 150, ma20: 148, ma50: 147 },
  { day: 2, price: 152, ma20: 149, ma50: 147.5 },
  { day: 3, price: 151, ma20: 150, ma50: 148 },
  { day: 4, price: 154, ma20: 151.5, ma50: 148.5 },
  { day: 5, price: 156, ma20: 152.5, ma50: 149 },
];

export default function IndicatorsGuidePage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('MA');

  const filtered = indicators.filter((ind) =>
    ind.name.toLowerCase().includes(search.toLowerCase()) ||
    ind.shortName.toLowerCase().includes(search.toLowerCase())
  );

  const selectedInd = indicators.find((ind) => ind.shortName === selected);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Technical Indicators Guide"
        description="Learn detailed guides for each technical indicator"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-neon-blue" />
              Search Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search by name or abbreviation..."
              className="max-w-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4 md:grid-cols-2"
      >
        <Card>
          <CardHeader>
            <CardTitle>Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filtered.map((ind) => (
                <motion.button
                  key={ind.shortName}
                  onClick={() => setSelected(ind.shortName)}
                  className={`w-full text-left p-3 rounded border transition ${
                    selected === ind.shortName
                      ? 'bg-neon-blue/20 border-neon-blue'
                      : 'border-white/10 hover:bg-white/5'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{ind.shortName}</p>
                      <p className="text-xs text-white/60">{ind.name}</p>
                    </div>
                    <Badge variant="secondary">{ind.category}</Badge>
                  </div>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedInd && (
          <motion.div
            key={selectedInd.shortName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{selectedInd.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-white/60 uppercase mb-1">Description</p>
                  <p className="text-sm text-white/80">{selectedInd.description}</p>
                </div>

                <div>
                  <p className="text-xs text-white/60 uppercase mb-1">Formula</p>
                  <div className="bg-white/5 border border-white/10 rounded p-2 font-mono text-xs">
                    {selectedInd.formula}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                    <p className="text-xs text-white/60 uppercase mb-1">Bullish Signal</p>
                    <p className="text-xs text-neon-green">{selectedInd.bullish}</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-2">
                    <p className="text-xs text-white/60 uppercase mb-1">Bearish Signal</p>
                    <p className="text-xs text-red-400">{selectedInd.bearish}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Example Chart: Moving Average</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={maData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #00d4ff' }} />
                <Line type="monotone" dataKey="price" stroke="#ff9500" strokeWidth={2} name="Price" />
                <Line type="monotone" dataKey="ma20" stroke="#00d4ff" strokeWidth={2} name="MA20" />
                <Line type="monotone" dataKey="ma50" stroke="#00ff88" strokeWidth={2} name="MA50" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
