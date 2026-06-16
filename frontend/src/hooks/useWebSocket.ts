'use client';

import { useEffect, useRef } from 'react';
import { useMarketStore } from '@/store/marketStore';
import type { StockQuote } from '@/lib/api';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:4000/ws';

export function useWebSocket(symbols: string[] = []) {
  const wsRef = useRef<WebSocket | null>(null);
  const setQuotes = useMarketStore((s) => s.setQuotes);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      if (symbols.length) {
        ws.send(JSON.stringify({ type: 'subscribe', symbols }));
      }
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'quotes' && Array.isArray(msg.data)) {
          setQuotes(msg.data as StockQuote[]);
        }
      } catch {
        /* ignore */
      }
    };

    ws.onclose = () => {
      setTimeout(() => {
        /* reconnect handled by effect re-run on unmount/remount */
      }, 3000);
    };

    return () => {
      ws.close();
    };
  }, [symbols, setQuotes]);
}
