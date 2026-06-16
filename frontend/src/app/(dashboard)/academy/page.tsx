'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Lock } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Introduction to Stock Trading',
    description: 'Learn the basics of stock trading, market fundamentals, and risk management.',
    level: 'Beginner',
    lessons: 12,
    progress: 100,
    locked: false,
  },
  {
    id: 2,
    title: 'Technical Analysis Mastery',
    description: 'Master chart patterns, candlesticks, and technical indicators.',
    level: 'Intermediate',
    lessons: 18,
    progress: 65,
    locked: false,
  },
  {
    id: 3,
    title: 'Fundamental Analysis',
    description: 'Deep dive into financial statements and company valuation.',
    level: 'Intermediate',
    lessons: 15,
    progress: 40,
    locked: false,
  },
  {
    id: 4,
    title: 'Options Trading Strategies',
    description: 'Learn covered calls, spreads, and advanced options strategies.',
    level: 'Advanced',
    lessons: 20,
    progress: 0,
    locked: true,
  },
  {
    id: 5,
    title: 'Day Trading Tactics',
    description: 'Intraday trading techniques and scalping strategies.',
    level: 'Advanced',
    lessons: 16,
    progress: 0,
    locked: true,
  },
];

export default function AcademyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Trading Academy"
        description="Learn trading concepts, strategies, and technical analysis"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-neon-blue">3/5</p>
              <p className="text-xs text-white/60 mt-2">Courses Started</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-neon-green">68%</p>
              <p className="text-xs text-white/60 mt-2">Average Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-500">45</p>
              <p className="text-xs text-white/60 mt-2">Hours Learned</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-4">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
            >
              <Card className="hover:border-neon-blue/50 transition">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-white">{course.title}</h3>
                        {course.locked ? (
                          <Lock className="w-4 h-4 text-white/40" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-neon-green" />
                        )}
                      </div>
                      <p className="text-sm text-white/60 mb-3">{course.description}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <Badge variant="secondary">{course.level}</Badge>
                        <span className="text-white/60">{course.lessons} lessons</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-neon-blue">{course.progress}%</p>
                      <Button
                        size="sm"
                        variant={course.progress === 100 ? 'secondary' : 'default'}
                        className="mt-2"
                        disabled={course.locked}
                      >
                        {course.progress === 100 ? 'Review' : 'Continue'}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-white/5 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-neon-blue to-neon-green h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
