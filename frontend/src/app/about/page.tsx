import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-fintech px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Link href="/" className="text-neon-blue hover:underline text-sm">← Back to Home</Link>
        <h1 className="mt-6 font-display text-4xl font-bold gradient-text">TradeMentor</h1>
        <p className="mt-4 text-white/60">
          A Real-Time Stock Monitoring and Rule-Based Trading Assistance System built with
          Next.js, Express, PostgreSQL, and AI-powered analytics.
        </p>
      </div>
    </div>
  );
}
