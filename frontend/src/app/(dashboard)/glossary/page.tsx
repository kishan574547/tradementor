'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const glossaryTerms = [
  {
    term: 'Ask Price',
    definition: 'The price at which a seller is willing to sell a security. It is also called the offer price.',
    category: 'Basics',
  },
  {
    term: 'Bid Price',
    definition: 'The price at which a buyer is willing to buy a security.',
    category: 'Basics',
  },
  {
    term: 'Spread',
    definition: 'The difference between the bid price and ask price of a security.',
    category: 'Basics',
  },
  {
    term: 'Bear Market',
    definition: 'A market in which stock prices are falling and investor sentiment is negative.',
    category: 'Market',
  },
  {
    term: 'Bull Market',
    definition: 'A market in which stock prices are rising and investor sentiment is positive.',
    category: 'Market',
  },
  {
    term: 'Dividend',
    definition: 'A payment made by a corporation to its shareholders, usually in cash or additional shares.',
    category: 'Income',
  },
  {
    term: 'Volatility',
    definition: 'The degree of variation in a stock price. Higher volatility means larger price swings.',
    category: 'Risk',
  },
  {
    term: 'Market Capitalization',
    definition: "The total market value of a company's outstanding shares (Price × Shares Outstanding).",
    category: 'Valuation',
  },
];

export default function GlossaryPage() {
  const [search, setSearch] = useState('');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filtered = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(glossaryTerms.map((t) => t.category)));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Glossary"
        description="Searchable financial terms and concepts"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded px-3 py-2">
              <Search className="w-5 h-5 text-white/40" />
              <Input
                placeholder="Search terms..."
                className="bg-transparent border-0 focus:ring-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-white/60">
              No terms found. Try a different search.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.term}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
              >
                <Card
                  className="cursor-pointer hover:border-neon-blue/50 transition"
                  onClick={() => setExpandedTerm(expandedTerm === item.term ? null : item.term)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-neon-blue">{item.term}</h3>
                          <span className="text-xs px-2 py-1 bg-white/10 rounded text-white/60">
                            {item.category}
                          </span>
                        </div>
                        {expandedTerm === item.term && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 text-sm text-white/80 leading-relaxed"
                          >
                            {item.definition}
                          </motion.p>
                        )}
                        {expandedTerm !== item.term && (
                          <p className="mt-2 text-sm text-white/60 line-clamp-1">{item.definition}</p>
                        )}
                      </div>
                      <div className="ml-4 text-white/40">
                        {expandedTerm === item.term ? '▼' : '▶'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Browse by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="px-3 py-1 text-sm bg-white/10 hover:bg-neon-blue/20 border border-white/10 rounded transition"
                >
                  {cat}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
