import { getTrendingTokens } from '@/lib/codex';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TokenBanner from '@/components/TokenBanner';
import FeatureSection from '@/components/FeatureSection';
import Link from 'next/link';

export const revalidate = 30;

export default async function HomePage() {
  const tokens = await getTrendingTokens(20);

  return (
    <main className="min-h-screen bg-[#08090E]">
      <Navbar />

      {/* Top token banner */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-[#08090E] border-b border-[#1E2035]">
        <TokenBanner tokens={tokens} />
      </div>

      {/* Hero section — offset by navbar (64px) + banner (~48px) */}
      <div className="pt-28">
        <HeroSection />
      </div>

      {/* Features */}
      <FeatureSection />

      {/* How it works */}
      <section className="py-24 px-4 bg-[#0D0E1A] border-y border-[#1E2035]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            From zero to <span className="gradient-text">Chad</span> in 30 seconds
          </h2>
          <p className="text-gray-400 text-lg mb-16">No seed phrases. No complexity. Just trade.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Sign In', desc: 'Connect with your Apple or Google account. We create a secure embedded Solana wallet automatically.' },
              { step: '02', title: 'Deposit', desc: 'Fund your wallet with SOL or USDC via card, Apple Pay, or transfer from another wallet.' },
              { step: '03', title: 'Trade', desc: 'Swap any Solana token instantly. Track your positions in real-time with live charts.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative p-8 rounded-2xl border border-[#1E2035] bg-[#08090E]">
                <div className="text-6xl font-black text-[#1E2035] mb-4">{step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending tokens preview */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-white">
            Trending on <span className="gradient-text">Solana</span>
          </h2>
          <Link href="/trade" className="text-sm text-[#00D4FF] hover:text-white transition-colors font-semibold">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {tokens.slice(0, 8).map((token) => (
            <Link
              key={token.address}
              href={`/trade/${token.address}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-[#1E2035] bg-[#0D0E1A] hover:border-[#00D4FF44] hover:bg-[#00D4FF05] transition-all group"
            >
              {token.imageUrl ? (
                <img src={token.imageUrl} alt={token.symbol} className="w-10 h-10 rounded-full flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#FFB700] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                  {token.symbol.slice(0, 2)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm group-hover:text-[#00D4FF] transition-colors">{token.symbol}</span>
                  <span className={`text-xs font-semibold ${token.priceChange24h >= 0 ? 'text-[#00FF88]' : 'text-[#FF3B5C]'}`}>
                    {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-gray-500 text-xs truncate">{token.name}</span>
                  <span className="text-gray-300 text-xs ml-2">
                    ${token.price < 0.001 ? token.price.toExponential(2) : token.price.toFixed(token.price < 1 ? 4 : 2)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Ready to <span className="gradient-text">trade?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Join 400K+ traders already using ChadWallet to dominate Solana.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://apps.apple.com/us/app/chadwallet/id6757367474"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on iOS
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-xl border border-[#1E2035] bg-[#0D0E1A] text-white font-bold hover:border-[#00D4FF44] hover:bg-[#00D4FF08] transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.65.19.96.08l12.45-7.19-2.78-2.78-10.63 9.89zM20.65 9.19L17.5 7.34l-3.12 3.12 3.12 3.12 3.18-1.85c.91-.52.91-1.82-.03-2.54zM1.08.29C.79.52.62.89.62 1.33v21.38c0 .44.17.81.46 1.04l.09.06 11.98-11.98v-.28L1.17.23l-.09.06zM12.9 7.94L1.08.29l10.63 9.88 2.82-2.82-.99-.99-.64.58z" />
              </svg>
              Get it on Android
            </a>
          </div>
        </div>
      </section>

      {/* Bottom token banner */}
      <div className="sticky bottom-0 left-0 right-0 bg-[#08090E] border-t border-[#1E2035] z-40">
        <TokenBanner tokens={tokens} reverse />
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1E2035] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#00D4FF] to-[#FFB700] flex items-center justify-center font-black text-black text-xs">C</div>
            <span>© 2025 ChadWallet</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="https://apps.apple.com/us/app/chadwallet/id6757367474" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">iOS App</a>
            <a href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Android App</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
