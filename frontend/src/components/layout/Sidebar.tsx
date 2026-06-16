'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  Star,
  BarChart3,
  Bot,
  Sparkles,
  Activity,
  LineChart,
  Gauge,
  Shield,
  MessageSquare,
  Bell,
  Newspaper,
  Settings,
  CreditCard,
  Users,
  FileText,
  HelpCircle,
  Search,
  ShoppingCart,
  PieChart,
  Target,
  Zap,
  ChevronLeft,
  ChevronRight,
  Calculator,
  BookOpen,
  Trophy,
  Share2,
  Code,
  Gift,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/markets', label: 'Markets', icon: TrendingUp },
      { href: '/screener', label: 'Stock Screener', icon: Search },
    ],
  },
  {
    label: 'Trading Tools',
    items: [
      { href: '/portfolio', label: 'Portfolio', icon: Wallet },
      { href: '/watchlist', label: 'Watchlist', icon: Star },
      { href: '/orders', label: 'Orders', icon: ShoppingCart },
      { href: '/positions', label: 'Positions', icon: Target },
      { href: '/advanced-screener', label: 'Advanced Screener', icon: Search },
      { href: '/backtester', label: 'Backtester', icon: BarChart3 },
      { href: '/options-calculator', label: 'Options Calculator', icon: Calculator },
      { href: '/risk-calculator', label: 'Risk Calculator', icon: Shield },
      { href: '/dividend-tracker', label: 'Dividend Tracker', icon: TrendingUp },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { href: '/analytics', label: 'Market Analytics', icon: BarChart3 },
      { href: '/signals', label: 'Trading Signals', icon: Zap },
      { href: '/rsi', label: 'RSI Analysis', icon: Activity },
      { href: '/macd', label: 'MACD Analysis', icon: LineChart },
      { href: '/moving-averages', label: 'Moving Averages', icon: Gauge },
      { href: '/risk', label: 'Risk Analysis', icon: Shield },
    ],
  },
  {
    label: 'AI Assistant',
    items: [
      { href: '/ai-assistant', label: 'AI Chatbot', icon: MessageSquare },
      { href: '/ai-recommendations', label: 'AI Recommendations', icon: Sparkles },
      { href: '/ai-insights', label: 'AI Insights', icon: Bot },
    ],
  },
  {
    label: 'Learning',
    items: [
      { href: '/academy', label: 'Trading Academy', icon: BookOpen },
      { href: '/indicators-guide', label: 'Indicators Guide', icon: LineChart },
      { href: '/glossary', label: 'Glossary', icon: FileText },
      { href: '/tutorials', label: 'Video Tutorials', icon: Sparkles },
    ],
  },
  {
    label: 'Community',
    items: [
      { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
      { href: '/ideas', label: 'Trading Ideas', icon: Share2 },
      { href: '/following', label: 'Following', icon: Users },
      { href: '/competitions', label: 'Competitions', icon: Zap },
    ],
  },
  {
    label: 'Insights',
    items: [
      { href: '/news', label: 'Financial News', icon: Newspaper },
      { href: '/notifications', label: 'Notifications', icon: Bell },
      { href: '/reports', label: 'Reports', icon: FileText },
      { href: '/heatmap', label: 'Market Heatmap', icon: PieChart },
    ],
  },
  {
    label: 'Account',
    items: [
      { href: '/billing', label: 'Billing', icon: CreditCard },
      { href: '/api-keys', label: 'API Keys', icon: Code },
      { href: '/integrations', label: 'Integrations', icon: Zap },
      { href: '/referrals', label: 'Referral Program', icon: Gift },
      { href: '/subscription', label: 'Subscription', icon: CreditCard },
      { href: '/settings', label: 'Settings', icon: Settings },
      { href: '/profile', label: 'Profile', icon: Users },
      { href: '/help', label: 'Help Center', icon: HelpCircle },
    ],
  },
  {
    label: 'Admin',
    items: [
      { href: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
      { href: '/admin/users', label: 'User Management', icon: Users },
      { href: '/admin/analytics', label: 'Admin Analytics', icon: BarChart3 },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/10 bg-navy-950/95 backdrop-blur-xl"
    >
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-green">
          <TrendingUp className="h-5 w-5 text-navy-950" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-display text-sm font-bold gradient-text">TradeMentor</p>
            <p className="text-[10px] text-white/40">AI Trading Platform</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/30">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all',
                        active
                          ? 'bg-neon-blue/15 text-neon-blue border border-neon-blue/20'
                          : 'text-white/60 hover:bg-white/5 hover:text-white'
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="m-2 flex items-center justify-center rounded-lg border border-white/10 py-2 text-white/50 hover:bg-white/5"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </motion.aside>
  );
}
