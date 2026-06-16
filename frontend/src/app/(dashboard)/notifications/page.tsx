'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { notificationsApi, type Notification } from '@/lib/api';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const load = () => notificationsApi.getAll().then(setNotifications).catch(() => {});
  useEffect(() => { load(); }, []);

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Alerts, signals, and trade confirmations"
        action={<Button variant="outline" onClick={() => notificationsApi.markAllRead().then(load)}>Mark all read</Button>}
      />
      <div className="space-y-3">
        {notifications.map((n) => (
          <Card key={n.id} className={!n.read ? 'border-neon-blue/30' : ''}>
            <CardContent className="p-4 flex justify-between items-start">
              <div>
                <p className="font-semibold text-white">{n.title}</p>
                <p className="text-sm text-white/50 mt-1">{n.message}</p>
                <p className="text-xs text-white/30 mt-2">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              {!n.read && (
                <Button size="sm" variant="ghost" onClick={() => notificationsApi.markRead(n.id).then(load)}>
                  Mark read
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
