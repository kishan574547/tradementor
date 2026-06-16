const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };
  if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new ApiError(res.status, err.error ?? 'Request failed');
  }

  return res.json();
}

export const authApi = {
  login: (email: string, password: string) =>
    api<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (email: string, password: string, name: string) =>
    api<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),
};

export const stocksApi = {
  search: (q: string) => api<{ symbol: string; name: string }[]>(`/stocks/search?q=${q}`),
  quote: (symbol: string) => api<StockQuote>(`/stocks/quote/${symbol}`),
  quotes: (symbols: string[]) =>
    api<StockQuote[]>(`/stocks/quotes?symbols=${symbols.join(',')}`),
  candles: (symbol: string, days = 90) =>
    api<Candle[]>(`/stocks/candles/${symbol}?days=${days}`),
  analysis: (symbol: string) => api<TechnicalAnalysis>(`/stocks/analysis/${symbol}`),
  recommendation: (symbol: string) =>
    api<{ quote: StockQuote; analysis: TechnicalAnalysis; recommendation: AIRecommendation }>(
      `/stocks/recommendation/${symbol}`
    ),
};

export const portfolioApi = {
  getAll: () => api<Portfolio[]>(`/portfolio`),
};

export const watchlistApi = {
  getAll: () => api<Watchlist[]>(`/watchlist`),
  addItem: (id: string, symbol: string) =>
    api(`/watchlist/${id}/items`, { method: 'POST', body: JSON.stringify({ symbol }) }),
};

export const signalsApi = {
  getAll: () => api<TradingSignal[]>(`/signals`),
};

export const notificationsApi = {
  getAll: () => api<Notification[]>(`/notifications`),
  markRead: (id: string) => api(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllRead: () => api(`/notifications/read-all`, { method: 'PATCH' }),
};

export const chatApi = {
  history: () => api<ChatMessage[]>(`/chat/history`),
  send: (message: string) => api<{ reply: ChatMessage }>(`/chat`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  }),
};

export const newsApi = {
  getAll: () => api<NewsArticle[]>(`/news`),
};

export const ordersApi = {
  getAll: () => api<Order[]>(`/orders`),
  create: (data: { symbol: string; side: 'BUY' | 'SELL'; quantity: number }) =>
    api<Order>(`/orders`, { method: 'POST', body: JSON.stringify(data) }),
};

export const userApi = {
  me: () => api<User>(`/user/me`),
  updateSubscription: (subscription: string) =>
    api(`/user/subscription`, {
      method: 'PATCH',
      body: JSON.stringify({ subscription }),
    }),
};

export const adminApi = {
  stats: () => api<AdminStats>(`/admin/stats`),
  users: () => api<User[]>(`/admin/users`),
};

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  subscription: string;
  avatar?: string;
  createdAt?: string;
}

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
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

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

export interface AIRecommendation {
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  summary: string;
  risks: string[];
  targets: { support: number; resistance: number };
}

export interface Portfolio {
  id: string;
  name: string;
  holdings: Holding[];
  totalValue: number;
  totalCost: number;
  totalPnl: number;
  totalPnlPercent: number;
}

export interface Holding {
  id: string;
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice?: number;
  value?: number;
  pnl?: number;
  pnlPercent?: number;
}

export interface Watchlist {
  id: string;
  name: string;
  items: { id: string; symbol: string; quote?: StockQuote | null }[];
}

export interface TradingSignal {
  id: string;
  symbol: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
  strength: number;
  rsi?: number;
  macd?: number;
  reason: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  type: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  symbols: string[];
  publishedAt: string;
}

export interface Order {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  price?: number;
  status: string;
  createdAt: string;
}

export interface AdminStats {
  users: number;
  orders: number;
  signals: number;
  notifications: number;
}
