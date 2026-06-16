'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { userApi, type User } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const storeUser = useAuthStore((s) => s.user);
  const [user, setUser] = useState<User | null>(storeUser);
  useEffect(() => { userApi.me().then(setUser).catch(() => {}); }, []);

  return (
    <div>
      <PageHeader title="Profile" description="Your account information" />
      <Card className="max-w-lg">
        <CardContent className="p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue to-neon-green text-3xl font-bold text-navy-950">
            {user?.name?.charAt(0) ?? 'U'}
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white">{user?.name}</h2>
          <p className="text-white/50">{user?.email}</p>
          <div className="mt-4 flex gap-2">
            <Badge>{user?.role}</Badge>
            <Badge variant="success">{user?.subscription}</Badge>
          </div>
          <p className="mt-4 text-sm text-white/40">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</p>
        </CardContent>
      </Card>
    </div>
  );
}
