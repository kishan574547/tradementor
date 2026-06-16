import type { Candle } from './marketData.js';

export interface TechnicalAnalysis {
  symbol: string;
  rsi: number;
  macd: number;
  macdSignal: number;
  macdHistogram: number;
  ma20: number;
  ma50: number;
  ma200: number;
  signal: 'BUY' | 'SELL' | 'HOLD';
  strength: number;
  reasons: string[];
}

function calculateRSI(closes: number[], period = 14): number {
  if (closes.length < period + 1) return 50;
  let gains = 0;
  let losses = 0;
  for (let i = closes.length - period; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) gains += diff;
    else losses -= diff;
  }
  const avgGain = gains / period;
  const avgLoss = losses / period;
  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return Number((100 - 100 / (1 + rs)).toFixed(2));
}

function calculateEMA(data: number[], period: number): number[] {
  const k = 2 / (period + 1);
  const ema: number[] = [data[0]];
  for (let i = 1; i < data.length; i++) {
    ema.push(data[i] * k + ema[i - 1] * (1 - k));
  }
  return ema;
}

function calculateSMA(data: number[], period: number): number {
  if (data.length < period) return data[data.length - 1] ?? 0;
  const slice = data.slice(-period);
  return Number((slice.reduce((a, b) => a + b, 0) / period).toFixed(2));
}

export function analyzeTechnicals(symbol: string, candles: Candle[]): TechnicalAnalysis {
  const closes = candles.map((c) => c.close);
  const rsi = calculateRSI(closes);
  const ema12 = calculateEMA(closes, 12);
  const ema26 = calculateEMA(closes, 26);
  const macdLine = ema12[ema12.length - 1] - ema26[ema26.length - 1];
  const macdHistory = ema12.slice(-26).map((_, i) => ema12[i + ema12.length - 26] - ema26[i + ema26.length - 26]);
  const macdSignalArr = calculateEMA(macdHistory.length ? macdHistory : [macdLine], 9);
  const macdSignal = macdSignalArr[macdSignalArr.length - 1];
  const macdHistogram = macdLine - macdSignal;
  const ma20 = calculateSMA(closes, 20);
  const ma50 = calculateSMA(closes, 50);
  const ma200 = calculateSMA(closes, Math.min(200, closes.length));
  const currentPrice = closes[closes.length - 1];

  const reasons: string[] = [];
  let buyScore = 0;
  let sellScore = 0;

  if (rsi < 30) {
    buyScore += 2;
    reasons.push(`RSI oversold at ${rsi}`);
  } else if (rsi > 70) {
    sellScore += 2;
    reasons.push(`RSI overbought at ${rsi}`);
  }

  if (macdHistogram > 0 && macdLine > macdSignal) {
    buyScore += 2;
    reasons.push('MACD bullish crossover');
  } else if (macdHistogram < 0 && macdLine < macdSignal) {
    sellScore += 2;
    reasons.push('MACD bearish crossover');
  }

  if (currentPrice > ma50 && ma50 > ma200) {
    buyScore += 1;
    reasons.push('Golden trend: price above MA50 and MA200');
  } else if (currentPrice < ma50 && ma50 < ma200) {
    sellScore += 1;
    reasons.push('Death cross trend detected');
  }

  if (currentPrice > ma20) buyScore += 0.5;
  else sellScore += 0.5;

  let signal: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
  const total = buyScore + sellScore || 1;
  const strength = Number((Math.abs(buyScore - sellScore) / total * 100).toFixed(0));

  if (buyScore > sellScore + 1) signal = 'BUY';
  else if (sellScore > buyScore + 1) signal = 'SELL';

  if (reasons.length === 0) reasons.push('Neutral market conditions');

  return {
    symbol,
    rsi,
    macd: Number(macdLine.toFixed(4)),
    macdSignal: Number(macdSignal.toFixed(4)),
    macdHistogram: Number(macdHistogram.toFixed(4)),
    ma20,
    ma50,
    ma200,
    signal,
    strength,
    reasons,
  };
}
