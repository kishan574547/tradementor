'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuthStore } from '@/store/authStore';
import { useWebSocket } from '@/hooks/useWebSocket';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  useWebSocket(['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA', 'RELIANCE', 'TCS']);

  useEffect(() => {
    if (!isAuthenticated()) router.push('/login');
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-fintech">
      <Sidebar />
      <div className="pl-[260px] transition-all max-lg:pl-[72px]">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
