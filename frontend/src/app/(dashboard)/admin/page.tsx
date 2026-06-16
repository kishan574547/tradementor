'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { adminApi, type AdminStats } from '@/lib/api';
import { Users, ShoppingCart, Zap, Bell } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  useEffect(() => { adminApi.stats().then(setStats).catch(() => {}); }, []);

  return (
    <div>
      <PageHeader title="Admin Dashboard" description="Platform overview and management" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={String(stats?.users ?? 0)} icon={Users} />
        <StatCard title="Total Orders" value={String(stats?.orders ?? 0)} icon={ShoppingCart} delay={0.1} />
        <StatCard title="Trading Signals" value={String(stats?.signals ?? 0)} icon={Zap} delay={0.2} />
        <StatCard title="Notifications" value={String(stats?.notifications ?? 0)} icon={Bell} delay={0.3} />
      </div>
    </div>
  );
}
