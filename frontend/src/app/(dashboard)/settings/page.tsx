'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

export default function SettingsPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div>
      <PageHeader title="Settings" description="Manage your account and preferences" />
      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><label className="text-sm text-white/40">Name</label><Input defaultValue={user?.name} readOnly /></div>
            <div><label className="text-sm text-white/40">Email</label><Input defaultValue={user?.email} readOnly /></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-white/60">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-neon-blue" /> Price alerts</label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-neon-blue" /> Trading signals</label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-neon-blue" /> AI recommendations</label>
          </CardContent>
        </Card>
        <Button variant="destructive" onClick={handleLogout}>Sign Out</Button>
      </div>
    </div>
  );
}
