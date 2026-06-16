import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate, type AuthRequest } from '../middleware/auth.js';
import { fetchQuotes } from '../services/marketData.js';

const router = Router();
router.use(authenticate);

router.get('/', async (req: AuthRequest, res) => {
  const watchlists = await prisma.watchlist.findMany({
    where: { userId: req.userId },
    include: { items: true },
  });
  const symbols = [...new Set(watchlists.flatMap((w) => w.items.map((i) => i.symbol)))];
  const quotes = symbols.length ? await fetchQuotes(symbols) : [];
  const quoteMap = Object.fromEntries(quotes.map((q) => [q.symbol, q]));

  res.json(
    watchlists.map((w) => ({
      ...w,
      items: w.items.map((i) => ({ ...i, quote: quoteMap[i.symbol] ?? null })),
    }))
  );
});

router.post('/:id/items', async (req: AuthRequest, res) => {
  const schema = z.object({ symbol: z.string().min(1) });
  try {
    const { symbol } = schema.parse(req.body);
    const watchlist = await prisma.watchlist.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });
    if (!watchlist) return res.status(404).json({ error: 'Watchlist not found' });

    const item = await prisma.watchlistItem.create({
      data: { watchlistId: watchlist.id, symbol: symbol.toUpperCase() },
    });
    res.status(201).json(item);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    res.status(500).json({ error: 'Failed to add symbol' });
  }
});

router.delete('/:id/items/:symbol', async (req: AuthRequest, res) => {
  const watchlist = await prisma.watchlist.findFirst({
    where: { id: req.params.id, userId: req.userId },
  });
  if (!watchlist) return res.status(404).json({ error: 'Watchlist not found' });

  await prisma.watchlistItem.deleteMany({
    where: { watchlistId: watchlist.id, symbol: req.params.symbol.toUpperCase() },
  });
  res.json({ success: true });
});

export default router;
