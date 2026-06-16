'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Bot,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: TrendingUp, title: 'Real-Time Monitoring', desc: 'Live stock quotes via WebSocket with sub-second updates' },
  { icon: Bot, title: 'AI Trading Assistant', desc: 'GPT-powered buy/sell recommendations and chat support' },
  { icon: BarChart3, title: 'Advanced Analytics', desc: 'RSI, MACD, moving averages, and trading signals' },
  { icon: Shield, title: 'Risk Management', desc: 'Portfolio risk analysis and position sizing guidance' },
  { icon: Zap, title: 'Trading Signals', desc: 'Rule-based signal engine with confidence scoring' },
];

const plans = ['FREE', 'PRO', 'ENTERPRISE'];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-fintech">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-navy-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-green">
              <TrendingUp className="h-5 w-5 text-navy-950" />
            </div>
            <span className="font-display text-xl font-bold gradient-text">TradeMentor</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden px-6 pb-24 pt-32">
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="mb-4 inline-block rounded-full border border-neon-blue/30 bg-neon-blue/10 px-4 py-1 text-xs font-medium text-neon-blue">
              Enterprise AI Fintech Platform
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Real-Time Stock Monitoring &{' '}
              <span className="gradient-text">AI Trading Assistance</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
              TradeMentor delivers Upstox-grade professional trading dashboards with
              candlestick charts, portfolio management, AI recommendations, and rule-based signals.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Start Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-16 max-w-5xl rounded-2xl border border-white/10 bg-card-glass p-2 shadow-neon backdrop-blur-xl"
          >
            <div className="aspect-video rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 p-8">
              <div className="grid h-full grid-cols-3 gap-4">
                {['Portfolio $124,580', 'Signals 12 Active', 'AI Score 87%'].map((stat) => (
                  <div
                    key={stat}
                    className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-white/80"
                  >
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-display text-3xl font-bold text-white">Platform Features</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <f.icon className="mb-4 h-8 w-8 text-neon-blue" />
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-white/50">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-display text-3xl font-bold text-white">Subscription Plans</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {plans.map((plan, i) => (
              <div
                key={plan}
                className={`glass-card p-8 ${i === 1 ? 'border-neon-blue/50 shadow-neon' : ''}`}
              >
                <h3 className="text-xl font-bold text-white">{plan}</h3>
                <p className="mt-4 text-3xl font-bold gradient-text">
                  {plan === 'FREE' ? '$0' : plan === 'PRO' ? '$29' : '$99'}
                  <span className="text-sm text-white/40">/mo</span>
                </p>
                <ul className="mt-6 space-y-3 text-sm text-white/60">
                  {['Real-time quotes', 'AI recommendations', 'Trading signals'].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neon-green" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/40">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/about" className="hover:text-white">About</Link>
        </div>
        © 2026 TradeMentor. All rights reserved.
      </footer>
    </div>
  );
}
