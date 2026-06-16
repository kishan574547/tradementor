import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { generateCandles } from '../services/marketData.js';
import { analyzeTechnicals } from '../services/indicators.js';

const router = Router();

const DEFAULT_SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA', 'AMZN', 'META', 'RELIANCE', 'TCS', 'INFY'];

router.get('/', async (_req, res) => {
  const cached = await prisma.tradingSignal.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });
  if (cached.length >= 5) return res.json(cached);

  const signals = await Promise.all(
    DEFAULT_SYMBOLS.map(async (symbol) => {
      const candles = generateCandles(symbol, 200);
      const analysis = analyzeTechnicals(symbol, candles);
      return prisma.tradingSignal.create({
        data: {
          symbol,
          signal: analysis.signal,
          strength: analysis.strength,
          rsi: analysis.rsi,
          macd: analysis.macd,
          ma50: analysis.ma50,
          ma200: analysis.ma200,
          reason: analysis.reasons.join('; '),
        },
      });
    })
  );
  res.json(signals);
});

export default router;
