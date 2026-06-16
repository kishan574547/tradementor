import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-fintech px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-neon-blue hover:underline text-sm">← Back to Home</Link>
        <h1 className="mt-6 font-display text-3xl font-bold text-white">Privacy Policy</h1>
        <div className="mt-8 space-y-4 text-white/60 text-sm leading-relaxed">
          <p>We collect account information (email, name) and usage data to provide our services.</p>
          <p>Market data is fetched from third-party APIs. We do not sell personal information to third parties.</p>
          <p>JWT tokens are stored locally for authentication. You may request data deletion by contacting support.</p>
        </div>
      </div>
    </div>
  );
}
