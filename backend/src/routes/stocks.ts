import { Router } from 'express';
import { fetchQuote, fetchQuotes, generateCandles, searchSymbols } from '../services/marketData.js';
import { analyzeTechnicals } from '../services/indicators.js';
import { getAIRecommendation } from '../services/aiService.js';
import { authenticate, type AuthRequest } from '../middleware/auth.js';

const router = Router();

router.get('/search', async (req, res) => {
  const q = (req.query.q as string) ?? '';
  const results = await searchSymbols(q);
  res.json(results);
});

router.get('/quote/:symbol', async (req, res) => {
  const quote = await fetchQuote(req.params.symbol);
  res.json(quote);
});

router.get('/quotes', async (req, res) => {
  const symbols = ((req.query.symbols as string) ?? '').split(',').filter(Boolean);
  if (!symbols.length) return res.status(400).json({ error: 'symbols required' });
  const quotes = await fetchQuotes(symbols);
  res.json(quotes);
});

router.get('/candles/:symbol', async (req, res) => {
  const days = parseInt((req.query.days as string) ?? '90', 10);
  const candles = generateCandles(req.params.symbol, days);
  res.json(candles);
});

router.get('/analysis/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const candles = generateCandles(symbol, 200);
  const analysis = analyzeTechnicals(symbol, candles);
  res.json(analysis);
});

router.get('/recommendation/:symbol', authenticate, async (req: AuthRequest, res) => {
  const symbol = req.params.symbol;
  const quote = await fetchQuote(symbol);
  const candles = generateCandles(symbol, 200);
  const analysis = analyzeTechnicals(symbol, candles);
  const recommendation = await getAIRecommendation(quote, analysis);
  res.json({ quote, analysis, recommendation });
});

export default router;
