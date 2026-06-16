import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate, type AuthRequest } from '../middleware/auth.js';
import { chatWithAI } from '../services/aiService.js';

const router = Router();
router.use(authenticate);

router.get('/history', async (req: AuthRequest, res) => {
  const messages = await prisma.chatMessage.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: 'asc' },
    take: 50,
  });
  res.json(messages);
});

router.post('/', async (req: AuthRequest, res) => {
  const schema = z.object({ message: z.string().min(1).max(2000) });
  try {
    const { message } = schema.parse(req.body);
    await prisma.chatMessage.create({
      data: { userId: req.userId!, role: 'user', content: message },
    });

    const history = await prisma.chatMessage.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'asc' },
      take: 20,
    });

    const reply = await chatWithAI(
      history.map((m) => ({ role: m.role, content: m.content }))
    );

    const assistantMsg = await prisma.chatMessage.create({
      data: { userId: req.userId!, role: 'assistant', content: reply },
    });

    res.json({ reply: assistantMsg });
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    res.status(500).json({ error: 'Chat failed' });
  }
});

export default router;
