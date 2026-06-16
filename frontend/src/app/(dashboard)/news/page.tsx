'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { newsApi, type NewsArticle } from '@/lib/api';

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  useEffect(() => { newsApi.getAll().then(setArticles).catch(() => {}); }, []);

  return (
    <div>
      <PageHeader title="Financial News" description="Latest market news and symbol-specific updates" />
      <div className="space-y-4">
        {articles.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-5">
              <div className="flex flex-wrap gap-2 mb-2">
                {a.symbols.map((s) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-white">{a.title}</h3>
              <p className="text-sm text-white/50 mt-2">{a.summary}</p>
              <p className="text-xs text-white/30 mt-3">{a.source} • {new Date(a.publishedAt).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
