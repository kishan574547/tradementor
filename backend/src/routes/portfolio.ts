import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate, type AuthRequest } from '../middleware/auth.js';
import { fetchQuotes } from '../services/marketData.js';

const router = Router();
router.use(authenticate);

router.get('/', async (req: AuthRequest, res) => {
  const portfolios = await prisma.portfolio.findMany({
    where: { userId: req.userId },
    include: { holdings: true },
  });
  const symbols = [...new Set(portfolios.flatMap((p) => p.holdings.map((h) => h.symbol)))];
  const quotes = symbols.length ? await fetchQuotes(symbols) : [];
  const quoteMap = Object.fromEntries(quotes.map((q) => [q.symbol, q]));

  const enriched = portfolios.map((p) => {
    let totalValue = 0;
    let totalCost = 0;
    const holdings = p.holdings.map((h) => {
      const quote = quoteMap[h.symbol];
      const currentPrice = quote?.price ?? h.avgPrice;
      const value = h.quantity * currentPrice;
      const cost = h.quantity * h.avgPrice;
      totalValue += value;
      totalCost += cost;
      return {
        ...h,
        currentPrice,
        value: Number(value.toFixed(2)),
        pnl: Number((value - cost).toFixed(2)),
        pnlPercent: cost ? Number((((value - cost) / cost) * 100).toFixed(2)) : 0,
      };
    });
    return {
      ...p,
      holdings,
      totalValue: Number(totalValue.toFixed(2)),
      totalCost: Number(totalCost.toFixed(2)),
      totalPnl: Number((totalValue - totalCost).toFixed(2)),
      totalPnlPercent: totalCost
        ? Number((((totalValue - totalCost) / totalCost) * 100).toFixed(2))
        : 0,
    };
  });

  res.json(enriched);
});

router.post('/holdings', async (req: AuthRequest, res) => {
  const schema = z.object({
    portfolioId: z.string(),
    symbol: z.string(),
    quantity: z.number().positive(),
    avgPrice: z.number().positive(),
  });
  try {
    const data = schema.parse(req.body);
    const portfolio = await prisma.portfolio.findFirst({
      where: { id: data.portfolioId, userId: req.userId },
    });
    if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });

    const existing = await prisma.holding.findFirst({
      where: { portfolioId: data.portfolioId, symbol: data.symbol.toUpperCase() },
    });

    const holding = existing
      ? await prisma.holding.update({
          where: { id: existing.id },
          data: { quantity: data.quantity, avgPrice: data.avgPrice },
        })
      : await prisma.holding.create({
          data: {
            portfolioId: data.portfolioId,
            symbol: data.symbol.toUpperCase(),
            quantity: data.quantity,
            avgPrice: data.avgPrice,
          },
        });

    res.status(201).json(holding);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    res.status(500).json({ error: 'Failed to add holding' });
  }
});

export default router;
