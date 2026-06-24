'use client';

import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';

export default function HeroSection() {
  const { ready, authenticated, login } = usePrivy();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(0,212,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.08) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#4AFF91] opacity-[0.04] blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#4AFF91] opacity-[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4AFF9133] bg-[#4AFF9108] text-[#4AFF91] text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
          Now live on Solana
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
          <span className="text-white">Trade Like</span><br />
          <span className="gradient-text">a Chad.</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The fastest Solana trading wallet. Real-time charts, instant swaps, live token feeds — zero complexity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          {ready && (
            authenticated ? (
              <Link href="/trade" className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#4AFF91] text-black font-bold text-lg hover:bg-[#22DD66] transition-all glow-blue">
                Start Trading →
              </Link>
            ) : (
              <button onClick={login} className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#4AFF91] text-black font-bold text-lg hover:bg-[#22DD66] transition-all glow-blue">
                Sign in with Google / Apple
              </button>
            )
          )}
          <div className="flex items-center gap-3">
            <a href="https://apps.apple.com/us/app/chadwallet/id6757367474" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-4 rounded-xl border border-[#1E2035] hover:border-[#4AFF9144] bg-[#0D0E1A] hover:bg-[#4AFF9108] transition-all">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              <span className="text-sm font-semibold text-white">App Store</span>
            </a>
            <a href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-4 rounded-xl border border-[#1E2035] hover:border-[#4AFF9144] bg-[#0D0E1A] hover:bg-[#4AFF9108] transition-all">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.65.19.96.08l12.45-7.19-2.78-2.78-10.63 9.89zM20.65 9.19L17.5 7.34l-3.12 3.12 3.12 3.12 3.18-1.85c.91-.52.91-1.82-.03-2.54zM1.08.29C.79.52.62.89.62 1.33v21.38c0 .44.17.81.46 1.04l.09.06 11.98-11.98v-.28L1.17.23l-.09.06zM12.9 7.94L1.08.29l10.63 9.88 2.82-2.82-.99-.99-.64.58z"/></svg>
              <span className="text-sm font-semibold text-white">Google Play</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[{ label: '24h Volume', value: '$2.8B+' }, { label: 'Active Traders', value: '400K+' }, { label: 'Avg Swap Time', value: '0.4s' }].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black gradient-text">{value}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#4AFF9144] to-transparent" />
      </div>
    </section>
  );
}
