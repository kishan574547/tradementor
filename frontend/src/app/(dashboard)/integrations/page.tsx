'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, Settings } from 'lucide-react';

const integrations = [
  {
    name: 'TradingView',
    description: 'Sync chart alerts to your TradeMentor dashboard',
    icon: '📊',
    status: 'Connected',
    connected: true,
  },
  {
    name: 'Discord',
    description: 'Get trading notifications in Discord',
    icon: '🎮',
    status: 'Not Connected',
    connected: false,
  },
  {
    name: 'Telegram',
    description: 'Receive alerts via Telegram bot',
    icon: '✈️',
    status: 'Connected',
    connected: true,
  },
  {
    name: 'Slack',
    description: 'Integrate trading signals with Slack',
    icon: '💼',
    status: 'Not Connected',
    connected: false,
  },
  {
    name: 'Email Notifications',
    description: 'Configure email alerts and reports',
    icon: '📧',
    status: 'Connected',
    connected: true,
  },
  {
    name: 'Zapier',
    description: 'Connect with 1000+ apps via Zapier',
    icon: '⚡',
    status: 'Not Connected',
    connected: false,
  },
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        description="Connect third-party services for enhanced functionality"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {integrations.map((integration, idx) => (
          <motion.div
            key={integration.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + idx * 0.05 }}
          >
            <Card className="flex flex-col h-full hover:border-neon-blue/50 transition">
              <CardContent className="pt-6 flex-1">
                <div className="text-4xl mb-3">{integration.icon}</div>
                <h3 className="font-semibold text-white mb-2">{integration.name}</h3>
                <p className="text-sm text-white/60 mb-4">{integration.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  {integration.connected ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-neon-green" />
                      <span className="text-sm text-neon-green">Connected</span>
                    </>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Not Connected
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  {integration.connected ? (
                    <>
                      <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center gap-1">
                        <Settings className="w-3 h-3" /> Settings
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="w-full flex items-center justify-center gap-1">
                      <Zap className="w-3 h-3" /> Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
