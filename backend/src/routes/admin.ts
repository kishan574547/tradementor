import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authenticate, requireAdmin, type AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authenticate, requireAdmin);

router.get('/stats', async (_req, res) => {
  const [users, orders, signals, notifications] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.tradingSignal.count(),
    prisma.notification.count(),
  ]);
  res.json({ users, orders, signals, notifications });
});

router.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      subscription: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(users);
});

export default router;
