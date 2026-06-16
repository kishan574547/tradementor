import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import authRoutes from './routes/auth.js';
import stockRoutes from './routes/stocks.js';
import portfolioRoutes from './routes/portfolio.js';
import watchlistRoutes from './routes/watchlist.js';
import signalsRoutes from './routes/signals.js';
import notificationsRoutes from './routes/notifications.js';
import chatRoutes from './routes/chat.js';
import newsRoutes from './routes/news.js';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/user.js';
import orderRoutes from './routes/orders.js';
import { fetchQuotes } from './services/marketData.js';

const app = express();
const PORT = process.env.PORT ?? 4000;
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:3000';

app.use(helmet());
app.use(
  cors({
    origin: ['https://frontend-lemon-eight-94.vercel.app', 'http://localhost:3000', FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get('/', (_req, res) => {
  res.json({ 
    service: 'TradeMentor API', 
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      stocks: '/api/stocks',
      portfolio: '/api/portfolio',
      watchlist: '/api/watchlist',
      signals: '/api/signals',
      chat: '/api/chat',
      news: '/api/news',
      orders: '/api/orders',
      user: '/api/user',
      admin: '/api/admin',
      websocket: 'ws://localhost:4000/ws'
    },
    documentation: 'API is ready to serve requests'
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'TradeMentor API', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/signals', signalsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/orders', orderRoutes);

const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

const DEFAULT_SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA', 'RELIANCE', 'TCS'];
const subscriptions = new Map<WebSocket, Set<string>>();

wss.on('connection', (ws) => {
  subscriptions.set(ws, new Set(DEFAULT_SYMBOLS));

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.type === 'subscribe' && Array.isArray(msg.symbols)) {
        subscriptions.set(ws, new Set(msg.symbols.map((s: string) => s.toUpperCase())));
      }
    } catch {
      /* ignore */
    }
  });

  ws.on('close', () => subscriptions.delete(ws));
});

setInterval(async () => {
  const allSymbols = new Set<string>();
  subscriptions.forEach((syms) => syms.forEach((s) => allSymbols.add(s)));
  if (!allSymbols.size) return;

  try {
    const quotes = await fetchQuotes([...allSymbols]);
    const payload = JSON.stringify({ type: 'quotes', data: quotes, timestamp: Date.now() });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(payload);
    });
  } catch {
    /* ignore broadcast errors */
  }
}, 3000);

server.listen(PORT, () => {
  console.log(`TradeMentor API running on http://localhost:${PORT}`);
  console.log(`WebSocket available at ws://localhost:${PORT}/ws`);
});
