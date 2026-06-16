'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Download, ArrowUpRight, CreditCard } from 'lucide-react';

const invoices = [
  {
    id: 'INV-2024-001',
    date: '2024-06-01',
    amount: 29.99,
    status: 'Paid',
    plan: 'PRO',
  },
  {
    id: 'INV-2024-002',
    date: '2024-05-01',
    amount: 29.99,
    status: 'Paid',
    plan: 'PRO',
  },
  {
    id: 'INV-2024-003',
    date: '2024-04-01',
    amount: 29.99,
    status: 'Paid',
    plan: 'PRO',
  },
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: ['10 watchlist items', 'Basic charts', 'Email support'],
    current: false,
  },
  {
    name: 'Pro',
    price: '$29.99/mo',
    features: ['Unlimited watchlists', 'Advanced charts', 'Priority support', 'API access'],
    current: true,
  },
  {
    name: 'Enterprise',
    price: '$99.99/mo',
    features: [
      'Everything in Pro',
      'Unlimited API calls',
      'Dedicated support',
      'Custom integrations',
    ],
    current: false,
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing & Invoices"
        description="Manage subscription and download invoices"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">You are currently on the</p>
                <p className="text-3xl font-bold text-neon-blue mt-1">PRO Plan</p>
                <p className="text-sm text-white/60 mt-2">$29.99 / month, renews on July 1st</p>
              </div>
              <div className="text-right">
                <Button>Upgrade to Enterprise</Button>
                <Button variant="outline" className="mt-2 block w-full">
                  Cancel Plan
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
            <CardTitle>Usage This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { feature: 'API Calls', used: 45230, limit: 1000000 },
                { feature: 'Storage', used: 2.3, limit: 50 },
                { feature: 'Collaborators', used: 2, limit: 5 },
              ].map((item) => (
                <div key={item.feature}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/80">{item.feature}</span>
                    <span className="text-white/60">
                      {item.used} / {item.limit}
                    </span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-neon-blue to-neon-green h-2 rounded-full"
                      style={{ width: `${(item.used / item.limit) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
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
            <CardTitle>Invoice History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/60 text-xs uppercase border-b border-white/10">
                    <th className="text-left py-3 px-2">Invoice ID</th>
                    <th className="text-left py-3 px-2">Date</th>
                    <th className="text-left py-3 px-2">Plan</th>
                    <th className="text-right py-3 px-2">Amount</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-right py-3 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-2">{invoice.id}</td>
                      <td className="py-3 px-2">{invoice.date}</td>
                      <td className="py-3 px-2">
                        <Badge variant="secondary">{invoice.plan}</Badge>
                      </td>
                      <td className="py-3 px-2 text-right">${invoice.amount}</td>
                      <td className="py-3 px-2">
                        <Badge variant="success">{invoice.status}</Badge>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button className="flex items-center gap-1 text-neon-blue hover:text-neon-green transition">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
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
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Compare Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  className={`p-4 rounded border ${
                    plan.current ? 'bg-neon-blue/10 border-neon-blue' : 'bg-white/5 border-white/10'
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                  <p className="text-2xl font-bold text-neon-blue mb-4">{plan.price}</p>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <span className="text-neon-green">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.current ? 'secondary' : 'default'} className="w-full">
                    {plan.current ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
