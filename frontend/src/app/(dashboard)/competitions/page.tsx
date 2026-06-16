'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Trophy, Users, DollarSign } from 'lucide-react';

const competitions = [
  {
    id: 1,
    name: 'June Trading Challenge 2024',
    status: 'Active',
    prizePool: '$5,000',
    participants: 2341,
    yourRank: 342,
    yourReturn: '12.5%',
    daysLeft: 8,
  },
  {
    id: 2,
    name: 'Tech Sector Battle',
    status: 'Active',
    prizePool: '$2,500',
    participants: 1205,
    yourRank: 87,
    yourReturn: '18.3%',
    daysLeft: 15,
  },
  {
    id: 3,
    name: 'Q3 Championship',
    status: 'Starting Soon',
    prizePool: '$10,000',
    participants: 0,
    yourRank: null,
    yourReturn: null,
    daysLeft: 22,
  },
  {
    id: 4,
    name: 'Dividend Harvest',
    status: 'Completed',
    prizePool: '$3,000',
    participants: 1850,
    yourRank: 450,
    yourReturn: '8.7%',
    daysLeft: 0,
  },
];

export default function CompetitionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Trading Competitions"
        description="Join trading competitions and win prizes"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {competitions.map((comp, idx) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.05 }}
          >
            <Card className="hover:border-neon-blue/50 transition">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-white">{comp.name}</h3>
                      <Badge
                        variant={
                          comp.status === 'Active'
                            ? 'success'
                            : comp.status === 'Starting Soon'
                              ? 'secondary'
                              : 'destructive'
                        }
                      >
                        {comp.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-white/60 uppercase">Prize Pool</p>
                        <p className="text-sm font-semibold text-neon-green mt-1">{comp.prizePool}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 uppercase">Participants</p>
                        <p className="text-sm font-semibold mt-1">{comp.participants.toLocaleString()}</p>
                      </div>
                      {comp.yourRank && (
                        <>
                          <div>
                            <p className="text-xs text-white/60 uppercase">Your Rank</p>
                            <p className="text-sm font-semibold text-neon-blue mt-1">#{comp.yourRank}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/60 uppercase">Your Return</p>
                            <p className="text-sm font-semibold text-neon-green mt-1">{comp.yourReturn}</p>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-3 text-xs text-white/60">
                      {comp.daysLeft > 0
                        ? `${comp.daysLeft} days remaining`
                        : 'Competition ended'}
                    </div>
                  </div>

                  <div className="text-right">
                    <Button
                      variant={comp.status === 'Active' ? 'outline' : 'default'}
                      disabled={comp.status === 'Completed'}
                    >
                      {comp.status === 'Active'
                        ? 'View Details'
                        : comp.status === 'Starting Soon'
                          ? 'Register'
                          : 'View Results'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
