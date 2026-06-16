'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

const reports = [
  { title: 'Monthly Portfolio Report', date: 'May 2026', type: 'PDF' },
  { title: 'Tax Summary Q1 2026', date: 'Apr 2026', type: 'PDF' },
  { title: 'Trading Activity Log', date: 'May 2026', type: 'CSV' },
  { title: 'Risk Assessment Report', date: 'May 2026', type: 'PDF' },
];

export default function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" description="Download portfolio and trading reports" />
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.title}>
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-neon-blue" />
                <div>
                  <p className="font-semibold text-white">{r.title}</p>
                  <p className="text-sm text-white/40">{r.date} • {r.type}</p>
                </div>
              </div>
              <Button variant="outline" size="sm"><Download className="h-4 w-4" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
