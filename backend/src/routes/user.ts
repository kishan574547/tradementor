import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate, type AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

router.get('/me', async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      subscription: true,
      avatar: true,
      createdAt: true,
    },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.patch('/subscription', async (req: AuthRequest, res) => {
  const schema = z.object({
    subscription: z.enum(['FREE', 'PRO', 'ENTERPRISE']),
  });
  try {
    const { subscription } = schema.parse(req.body);
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { subscription },
      select: { id: true, subscription: true },
    });
    res.json(user);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    res.status(500).json({ error: 'Update failed' });
  }
});

export default router;
