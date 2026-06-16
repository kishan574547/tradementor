import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate, type AuthRequest } from '../middleware/auth.js';
import { fetchQuote } from '../services/marketData.js';

const router = Router();
router.use(authenticate);

router.get('/', async (req: AuthRequest, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  res.json(orders);
});

router.post('/', async (req: AuthRequest, res) => {
  const schema = z.object({
    symbol: z.string(),
    side: z.enum(['BUY', 'SELL']),
    quantity: z.number().positive(),
  });
  try {
    const data = schema.parse(req.body);
    const quote = await fetchQuote(data.symbol);
    const order = await prisma.order.create({
      data: {
        userId: req.userId!,
        symbol: data.symbol.toUpperCase(),
        side: data.side,
        quantity: data.quantity,
        price: quote.price,
        status: 'FILLED',
      },
    });

    await prisma.notification.create({
      data: {
        userId: req.userId!,
        title: `Order ${data.side} Filled`,
        message: `${data.quantity} shares of ${data.symbol.toUpperCase()} at $${quote.price}`,
        type: 'trade',
      },
    });

    res.status(201).json(order);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    res.status(500).json({ error: 'Order failed' });
  }
});

export default router;
