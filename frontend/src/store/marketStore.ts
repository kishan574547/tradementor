import { create } from 'zustand';
import type { StockQuote } from '@/lib/api';

interface MarketState {
  quotes: Record<string, StockQuote>;
  setQuotes: (quotes: StockQuote[]) => void;
  updateQuote: (quote: StockQuote) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  quotes: {},
  setQuotes: (quotes) =>
    set((state) => ({
      quotes: {
        ...state.quotes,
        ...Object.fromEntries(quotes.map((q) => [q.symbol, q])),
      },
    })),
  updateQuote: (quote) =>
    set((state) => ({
      quotes: { ...state.quotes, [quote.symbol]: quote },
    })),
}));
