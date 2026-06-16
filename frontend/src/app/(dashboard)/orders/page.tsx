'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ordersApi, type Order } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => { ordersApi.getAll().then(setOrders).catch(() => {}); }, []);

  return (
    <div>
      <PageHeader title="Orders" description="Your order history and execution status" />
      <Card>
        <CardContent className="pt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-left">
                <th className="pb-3">Symbol</th>
                <th className="pb-3">Side</th>
                <th className="pb-3 text-right">Qty</th>
                <th className="pb-3 text-right">Price</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-white/5">
                  <td className="py-3 font-semibold text-white">{o.symbol}</td>
                  <td className="py-3"><Badge variant={o.side === 'BUY' ? 'success' : 'destructive'}>{o.side}</Badge></td>
                  <td className="py-3 text-right text-white">{o.quantity}</td>
                  <td className="py-3 text-right text-white">{o.price ? formatCurrency(o.price) : '—'}</td>
                  <td className="py-3"><Badge variant="secondary">{o.status}</Badge></td>
                  <td className="py-3 text-white/40">{new Date(o.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={6} className="py-8 text-center text-white/40">No orders yet. Place orders from stock detail pages.</td></tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
