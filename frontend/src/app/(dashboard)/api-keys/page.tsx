'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Copy, Trash2, Plus, Eye, EyeOff } from 'lucide-react';

const apiKeys = [
  {
    id: 1,
    name: 'Production API Key',
    key: 'pk_live_51234567890abcdefghijk',
    created: '2024-01-15',
    lastUsed: '2024-06-28',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Testing API Key',
    key: 'pk_test_98765432109zyxwvutsrq',
    created: '2024-03-20',
    lastUsed: '2024-06-25',
    status: 'Active',
  },
];

export default function APIKeysPage() {
  const [showKey, setShowKey] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (key: string, id: number) => {
    navigator.clipboard.writeText(key);
    setCopied(id.toString());
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="API Keys"
        description="Generate and manage API keys for integrations"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2"
      >
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Generate New Key
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        {apiKeys.map((apiKey, idx) => (
          <motion.div
            key={apiKey.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
          >
            <Card className="hover:border-neon-blue/50 transition">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">{apiKey.name}</h3>
                      <Badge variant="success">{apiKey.status}</Badge>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded p-3 font-mono text-xs mb-3 flex items-center justify-between">
                      <span>
                        {showKey === apiKey.id
                          ? apiKey.key
                          : apiKey.key.substring(0, 7) + '•'.repeat(apiKey.key.length - 14) + apiKey.key.substring(-7)}
                      </span>
                      <button onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}>
                        {showKey === apiKey.id ? (
                          <EyeOff className="w-4 h-4 text-white/60 hover:text-white" />
                        ) : (
                          <Eye className="w-4 h-4 text-white/60 hover:text-white" />
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs text-white/60">
                      <div>
                        <p className="uppercase opacity-60">Created</p>
                        <p className="mt-1">{apiKey.created}</p>
                      </div>
                      <div>
                        <p className="uppercase opacity-60">Last Used</p>
                        <p className="mt-1">{apiKey.lastUsed}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                      className="p-2 hover:bg-white/10 rounded transition"
                    >
                      <Copy
                        className={`w-4 h-4 ${
                          copied === apiKey.id.toString() ? 'text-neon-green' : 'text-white/60'
                        }`}
                      />
                    </button>
                    <button className="p-2 hover:bg-red-500/10 rounded transition text-white/60 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>API Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/80 mb-4">
              Get started with the TradeMentor API. Access real-time data, manage portfolios, and build custom integrations.
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                View Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                API Reference
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Code Examples
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
