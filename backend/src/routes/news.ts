import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

const MOCK_NEWS = [
  {
    title: 'Tech Giants Lead Market Rally Amid AI Optimism',
    summary: 'Major technology stocks surged as investors bet on continued AI adoption across enterprise sectors.',
    source: 'MarketWatch',
    url: '#',
    symbols: ['AAPL', 'MSFT', 'NVDA'],
  },
  {
    title: 'Federal Reserve Signals Cautious Rate Approach',
    summary: 'Markets reacted positively to hints of a measured monetary policy stance in upcoming sessions.',
    source: 'Bloomberg',
    url: '#',
    symbols: ['SPY', 'QQQ'],
  },
  {
    title: 'Indian IT Sector Shows Resilience in Q4 Earnings',
    summary: 'TCS and Infosys reported strong deal wins, boosting sentiment in the Nifty IT index.',
    source: 'Economic Times',
    url: '#',
    symbols: ['TCS', 'INFY', 'RELIANCE'],
  },
  {
    title: 'EV Stocks Volatile as Competition Intensifies',
    summary: 'Tesla shares fluctuated amid new product announcements from global competitors.',
    source: 'Reuters',
    url: '#',
    symbols: ['TSLA'],
  },
  {
    title: 'Energy Sector Gains on Supply Chain Stabilization',
    summary: 'Oil and gas equities climbed as supply concerns eased in global markets.',
    source: 'CNBC',
    url: '#',
    symbols: ['XOM', 'CVX'],
  },
];

router.get('/', async (_req, res) => {
  let articles = await prisma.newsArticle.findMany({
    orderBy: { publishedAt: 'desc' },
    take: 20,
  });

  if (articles.length < 3) {
    for (const n of MOCK_NEWS) {
      await prisma.newsArticle.create({
        data: {
          ...n,
          publishedAt: new Date(Date.now() - Math.random() * 86400000 * 3),
        },
      });
    }
    articles = await prisma.newsArticle.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 20,
    });
  }

  res.json(articles);
});

export default router;
