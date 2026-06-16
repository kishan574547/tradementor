'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Filter, Download, Save } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  pe: number;
  marketCap: string;
  dividend: number;
  change: number;
}

const mockStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 182.5, pe: 28.5, marketCap: '2.8T', dividend: 0.92, change: 2.3 },
  { symbol: 'MSFT', name: 'Microsoft', price: 378.2, pe: 32.1, marketCap: '2.8T', dividend: 0.68, change: 1.8 },
  { symbol: 'GOOGL', name: 'Alphabet', price: 140.3, pe: 22.4, marketCap: '1.4T', dividend: 0, change: -0.5 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.8, pe: 65.2, marketCap: '765B', dividend: 0, change: 3.2 },
  { symbol: 'AMZN', name: 'Amazon', price: 171.5, pe: 45.3, marketCap: '1.7T', dividend: 0, change: 1.1 },
];

export default function AdvancedScreenerPage() {
  const [filters, setFilters] = useState({
    peMin: 0,
    peMax: 100,
    divMin: 0,
    marketCapMin: 0,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Advanced Stock Screener"
        description="Filter stocks by multiple criteria to find your next investment opportunity"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-neon-blue" />
              Filter Criteria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-xs text-white/60 uppercase">P/E Ratio</label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    className="flex-1"
                    value={filters.peMin}
                    onChange={(e) => setFilters({ ...filters, peMin: Number(e.target.value) })}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    className="flex-1"
                    value={filters.peMax}
                    onChange={(e) => setFilters({ ...filters, peMax: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/60 uppercase">Dividend Yield %</label>
                <Input
                  type="number"
                  placeholder="Minimum"
                  className="mt-2"
                  value={filters.divMin}
                  onChange={(e) => setFilters({ ...filters, divMin: Number(e.target.value) })}
                />
              </div>

              <div>
                <label className="text-xs text-white/60 uppercase">Market Cap ($B)</label>
                <Input
                  type="number"
                  placeholder="Minimum"
                  className="mt-2"
                  value={filters.marketCapMin}
                  onChange={(e) => setFilters({ ...filters, marketCapMin: Number(e.target.value) })}
                />
              </div>

              <div className="flex items-end gap-2">
                <Button className="flex-1">Apply Filters</Button>
                <Button variant="outline" className="px-3">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
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
            <CardTitle>Results ({mockStocks.length} stocks)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/60 text-xs uppercase border-b border-white/10">
                    <th className="text-left py-3 px-2">Symbol</th>
                    <th className="text-left py-3 px-2">Company</th>
                    <th className="text-right py-3 px-2">Price</th>
                    <th className="text-right py-3 px-2">P/E Ratio</th>
                    <th className="text-right py-3 px-2">Market Cap</th>
                    <th className="text-right py-3 px-2">Dividend %</th>
                    <th className="text-right py-3 px-2">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStocks.map((stock, idx) => (
                    <motion.tr
                      key={stock.symbol}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-3 px-2">
                        <span className="font-semibold neon-text-blue">{stock.symbol}</span>
                      </td>
                      <td className="py-3 px-2">{stock.name}</td>
                      <td className="py-3 px-2 text-right">${stock.price.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right">{stock.pe.toFixed(1)}</td>
                      <td className="py-3 px-2 text-right">{stock.marketCap}</td>
                      <td className="py-3 px-2 text-right">{stock.dividend.toFixed(2)}%</td>
                      <td className="py-3 px-2 text-right">
                        <span className={stock.change > 0 ? 'stat-positive' : 'stat-negative'}>
                          {stock.change > 0 ? '+' : ''}{stock.change}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2"
      >
        <Button variant="outline" className="flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Filter
        </Button>
        <Button variant="outline">Export CSV</Button>
      </motion.div>
    </div>
  );
}
