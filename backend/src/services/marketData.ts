import axios from 'axios';

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  marketCap?: number;
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const MOCK_STOCKS: Record<string, Partial<StockQuote>> = {
  AAPL: { name: 'Apple Inc.', price: 178.52 },
  GOOGL: { name: 'Alphabet Inc.', price: 141.8 },
  MSFT: { name: 'Microsoft Corp.', price: 378.91 },
  AMZN: { name: 'Amazon.com Inc.', price: 178.25 },
  TSLA: { name: 'Tesla Inc.', price: 248.5 },
  NVDA: { name: 'NVIDIA Corp.', price: 875.28 },
  META: { name: 'Meta Platforms', price: 505.75 },
  RELIANCE: { name: 'Reliance Industries', price: 2945.5 },
  TCS: { name: 'Tata Consultancy', price: 4125.3 },
  INFY: { name: 'Infosys Ltd', price: 1856.75 },
};

function jitter(base: number, pct = 0.02): number {
  return base * (1 + (Math.random() - 0.5) * pct * 2);
}

export function generateMockQuote(symbol: string): StockQuote {
  const upper = symbol.toUpperCase();
  const base = MOCK_STOCKS[upper] ?? { name: `${upper} Corp.`, price: 100 + Math.random() * 200 };
  const price = jitter(base.price ?? 100);
  const change = (Math.random() - 0.48) * price * 0.03;
  const previousClose = price - change;
  return {
    symbol: upper,
    name: base.name ?? upper,
    price: Number(price.toFixed(2)),
    change: Number(change.toFixed(2)),
    changePercent: Number(((change / previousClose) * 100).toFixed(2)),
    volume: Math.floor(Math.random() * 50_000_000),
    high: Number((price * 1.02).toFixed(2)),
    low: Number((price * 0.98).toFixed(2)),
    open: Number((previousClose * 1.001).toFixed(2)),
    previousClose: Number(previousClose.toFixed(2)),
    marketCap: Math.floor(price * 1_000_000_000),
  };
}

export async function fetchQuote(symbol: string): Promise<StockQuote> {
  const upper = symbol.toUpperCase();

  if (process.env.FINNHUB_API_KEY) {
    try {
      const { data } = await axios.get('https://finnhub.io/api/v1/quote', {
        params: { symbol: upper, token: process.env.FINNHUB_API_KEY },
        timeout: 5000,
      });
      if (data?.c) {
        const change = data.c - data.pc;
        return {
          symbol: upper,
          name: MOCK_STOCKS[upper]?.name ?? upper,
          price: data.c,
          change: Number(change.toFixed(2)),
          changePercent: Number(((change / data.pc) * 100).toFixed(2)),
          volume: 0,
          high: data.h,
          low: data.l,
          open: data.o,
          previousClose: data.pc,
        };
      }
    } catch {
      /* fallback */
    }
  }

  if (process.env.ALPHA_VANTAGE_API_KEY) {
    try {
      const { data } = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: upper,
          apikey: process.env.ALPHA_VANTAGE_API_KEY,
        },
        timeout: 8000,
      });
      const q = data?.['Global Quote'];
      if (q?.['05. price']) {
        const price = parseFloat(q['05. price']);
        const change = parseFloat(q['09. change']);
        const prev = parseFloat(q['08. previous close']);
        return {
          symbol: upper,
          name: MOCK_STOCKS[upper]?.name ?? upper,
          price,
          change,
          changePercent: prev ? Number(((change / prev) * 100).toFixed(2)) : 0,
          volume: parseInt(q['06. volume'] ?? '0', 10),
          high: parseFloat(q['03. high']),
          low: parseFloat(q['04. low']),
          open: parseFloat(q['02. open']),
          previousClose: prev,
        };
      }
    } catch {
      /* fallback */
    }
  }

  return generateMockQuote(upper);
}

export async function fetchQuotes(symbols: string[]): Promise<StockQuote[]> {
  return Promise.all(symbols.map((s) => fetchQuote(s)));
}

export function generateCandles(symbol: string, days = 90): Candle[] {
  const candles: Candle[] = [];
  let price = MOCK_STOCKS[symbol.toUpperCase()]?.price ?? 150;
  const now = Date.now();
  for (let i = days; i >= 0; i--) {
    const open = price;
    const close = jitter(price, 0.03);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    candles.push({
      time: now - i * 86400000,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Math.floor(Math.random() * 10_000_000),
    });
    price = close;
  }
  return candles;
}

export async function searchSymbols(query: string): Promise<{ symbol: string; name: string }[]> {
  const all = Object.entries(MOCK_STOCKS).map(([symbol, data]) => ({
    symbol,
    name: data.name ?? symbol,
  }));
  const q = query.toLowerCase();
  return all.filter((s) => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q));
}
