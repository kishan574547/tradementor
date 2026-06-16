'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Play, Clock, Users } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: 'Understanding Stock Valuation',
    category: 'Fundamentals',
    duration: '12:45',
    views: 5240,
    thumbnail: '📊',
  },
  {
    id: 2,
    title: 'Technical Analysis Basics',
    category: 'Technical',
    duration: '18:30',
    views: 8120,
    thumbnail: '📈',
  },
  {
    id: 3,
    title: 'Portfolio Diversification Strategy',
    category: 'Strategy',
    duration: '15:20',
    views: 3890,
    thumbnail: '💼',
  },
  {
    id: 4,
    title: 'Risk Management 101',
    category: 'Risk',
    duration: '22:10',
    views: 4560,
    thumbnail: '⚠️',
  },
  {
    id: 5,
    title: 'Day Trading Techniques',
    category: 'Trading',
    duration: '25:45',
    views: 6780,
    thumbnail: '⚡',
  },
  {
    id: 6,
    title: 'Options Trading Explained',
    category: 'Options',
    duration: '19:15',
    views: 7230,
    thumbnail: '📉',
  },
];

export default function TutorialsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Video Tutorials"
        description="Learn trading concepts from expert tutorials"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {videos.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + idx * 0.05 }}
          >
            <Card className="overflow-hidden hover:border-neon-blue/50 transition cursor-pointer h-full">
              <div className="aspect-video bg-gradient-to-br from-neon-blue/20 to-neon-green/20 flex items-center justify-center relative group">
                <span className="text-6xl">{video.thumbnail}</span>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="w-12 h-12 bg-neon-blue rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 fill-white" />
                  </div>
                </div>
              </div>

              <CardContent className="pt-4">
                <h3 className="font-semibold text-sm mb-2">{video.title}</h3>
                <Badge variant="secondary" className="mb-3">
                  {video.category}
                </Badge>

                <div className="flex items-center gap-3 text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {video.views.toLocaleString()} views
                  </div>
                </div>

                <Button className="w-full mt-4">Watch Video</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
