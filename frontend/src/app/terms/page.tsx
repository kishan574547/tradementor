import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-fintech px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-neon-blue hover:underline text-sm">← Back to Home</Link>
        <h1 className="mt-6 font-display text-3xl font-bold text-white">Terms of Service</h1>
        <div className="mt-8 space-y-4 text-white/60 text-sm leading-relaxed">
          <p>TradeMentor provides stock monitoring and AI-assisted trading information for educational purposes only. This is not financial advice.</p>
          <p>Users are responsible for their own investment decisions. Past performance does not guarantee future results.</p>
          <p>By using TradeMentor, you agree to our data processing practices and acceptable use policies.</p>
        </div>
      </div>
    </div>
  );
}
