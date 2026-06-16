import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('Admin@123456', 12);
  const userPassword = await bcrypt.hash('User@123456', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@tradementor.com' },
    update: {},
    create: {
      email: 'admin@tradementor.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      subscription: 'ENTERPRISE',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'demo@tradementor.com' },
    update: {},
    create: {
      email: 'demo@tradementor.com',
      password: userPassword,
      name: 'Demo Trader',
      role: 'USER',
      subscription: 'PRO',
    },
  });

  for (const u of [admin, user]) {
    const existingWatchlist = await prisma.watchlist.findFirst({ where: { userId: u.id } });
    if (!existingWatchlist) {
      const wl = await prisma.watchlist.create({
        data: { userId: u.id, name: 'Default Watchlist' },
      });
      for (const symbol of ['AAPL', 'GOOGL', 'TSLA', 'NVDA', 'RELIANCE']) {
        await prisma.watchlistItem.create({ data: { watchlistId: wl.id, symbol } });
      }
    }

    const existingPortfolio = await prisma.portfolio.findFirst({ where: { userId: u.id } });
    if (!existingPortfolio) {
      const pf = await prisma.portfolio.create({
        data: { userId: u.id, name: 'Main Portfolio' },
      });
      await prisma.holding.createMany({
        data: [
          { portfolioId: pf.id, symbol: 'AAPL', quantity: 50, avgPrice: 165 },
          { portfolioId: pf.id, symbol: 'MSFT', quantity: 30, avgPrice: 350 },
          { portfolioId: pf.id, symbol: 'NVDA', quantity: 15, avgPrice: 720 },
        ],
      });
    }

    await prisma.notification.createMany({
      data: [
        {
          userId: u.id,
          title: 'Welcome to TradeMentor',
          message: 'Your AI-powered trading assistant is ready.',
          type: 'info',
        },
        {
          userId: u.id,
          title: 'BUY Signal: NVDA',
          message: 'RSI oversold with MACD bullish crossover detected.',
          type: 'signal',
        },
      ],
      skipDuplicates: true,
    });
  }

  console.log('Seed completed.');
  console.log('Admin: admin@tradementor.com / Admin@123456');
  console.log('Demo:  demo@tradementor.com / User@123456');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
