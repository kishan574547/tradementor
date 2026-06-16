'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { userApi } from '@/lib/api';

const plans = [
  { id: 'FREE', name: 'Free', price: 0, features: ['Delayed quotes', '5 watchlist items', 'Basic charts'] },
  { id: 'PRO', name: 'Pro', price: 29, features: ['Real-time WebSocket', 'AI recommendations', 'All indicators', 'Priority support'] },
  { id: 'ENTERPRISE', name: 'Enterprise', price: 99, features: ['Everything in Pro', 'Admin API access', 'Custom alerts', 'Dedicated support'] },
];

export default function SubscriptionPage() {
  const user = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);

  const upgrade = async (tier: string) => {
    await userApi.updateSubscription(tier);
    if (user && token) setAuth({ ...user, subscription: tier }, token);
  };

  return (
    <div>
      <PageHeader title="Subscription" description={`Current plan: ${user?.subscription ?? 'FREE'}`} />
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={user?.subscription === plan.id ? 'border-neon-blue shadow-neon' : ''}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold gradient-text">${plan.price}<span className="text-sm text-white/40">/mo</span></p>
              <ul className="mt-6 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/60"><Check className="h-4 w-4 text-neon-green" />{f}</li>
                ))}
              </ul>
              <Button
                className="w-full mt-6"
                variant={user?.subscription === plan.id ? 'secondary' : 'default'}
                disabled={user?.subscription === plan.id}
                onClick={() => upgrade(plan.id)}
              >
                {user?.subscription === plan.id ? 'Current Plan' : 'Upgrade'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
