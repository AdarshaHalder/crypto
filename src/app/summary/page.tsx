import Image from 'next/image';

export const metadata = {
  title: 'ChadWallet — Project Summary | Adarsha Halder',
  description: 'Founding Engineer screen build summary for ChadWallet',
};

const TIMELINE = [
  { time: '~1.5h', task: 'Project scaffold + landing page', detail: 'Next.js 15 App Router, Tailwind v4, rotating token banners, hero section, features' },
  { time: '~2h', task: 'Full trading UI', detail: '3-column layout — trending list / price chart + token info + holders + live trades / buy-sell panel + position' },
  { time: '~1.5h', task: 'Auth (Privy)', detail: 'Google + Apple sign-in, embedded Solana wallet, SSR crash debug, Google OAuth custom credentials setup' },
  { time: '~1h', task: 'Real data layer', detail: 'DexScreener API integration for live token prices, 24h changes, market caps, trade feeds' },
  { time: '~1h', task: 'Brand & design polish', detail: 'Real logo, app screenshots showcase, green color system matching actual ChadWallet app' },
  { time: '~1h', task: 'Deployment & production fixes', detail: 'Vercel deploy, Privy Production upgrade, Google OAuth redirect URI fix' },
];

const ISSUES = [
  {
    issue: 'Privy SSR crash on Vercel',
    detail: 'Privy initializes during Next.js static prerender even with "use client" — throws invalid App ID error at build time.',
    fix: 'Created ClientProviders.tsx as a "use client" wrapper that uses dynamic(() => import("./Providers"), { ssr: false }), preventing Privy from running server-side.',
  },
  {
    issue: 'Privy Dev mode blocks Google login',
    detail: '"disallowed_login_method" error on the live site — Privy restricts social logins to Development mode.',
    fix: 'Upgraded Privy app to Production. Then hit Google OAuth redirect_uri_mismatch — fixed by adding custom Google OAuth credentials (Client ID + Secret) in Privy dashboard with https://auth.privy.io/api/v1/oauth/callback as the authorized redirect URI.',
  },
  {
    issue: 'Codex.io requires payment',
    detail: 'Codex signup page requires credit card or 1 USDC deposit — no actual free tier for token data.',
    fix: 'Replaced with DexScreener API (free, no API key, no signup). Curated 15 Solana seed tokens; OHLCV bars are seeded from real price data for chart rendering.',
  },
  {
    issue: 'TradingView charting library is gated',
    detail: 'TradingView\'s charting library requires a paid commercial license or formal partnership approval.',
    fix: 'Used Recharts (MIT license) with AreaChart + gradient fills. Architecture keeps the chart component swappable — dropping in TradingView or Birdeye charts is a 1-file change.',
  },
  {
    issue: 'Recharts formatter TypeScript error',
    detail: 'formatter={(v: number) => ...} had incompatible return types in strict TS mode.',
    fix: 'Cast via formatter={(v) => [`$${Number(v).toFixed(6)}`, "Price"]} — explicitly typed as tuple.',
  },
];

const IMPROVEMENTS = [
  { title: 'Real OHLCV charts', desc: 'Integrate Birdeye or Defined.fi for real candlestick data. Or unlock Codex with a key — the lib/codex.ts abstraction makes this a 10-line swap.' },
  { title: 'Live Jupiter swaps', desc: 'Jupiter quote API is already wired in the architecture. Next step: connect usePrivy() embedded wallet to sign and submit the swap transaction on-chain.' },
  { title: 'Alchemy RPC for real balances', desc: 'Use Alchemy\'s Solana RPC to fetch actual SOL + SPL token balances for the authenticated user\'s embedded wallet.' },
  { title: 'Apple Sign-In', desc: 'Enabled in Privy but needs Apple Developer account ($99/yr) to configure the OAuth service ID and callback URL.' },
  { title: 'WebSocket real-time feed', desc: 'Replace the 5s polling on live trades with a WebSocket connection (Helius or DexScreener streams) for true real-time trade feeds.' },
  { title: 'Token search', desc: 'Search bar that queries DexScreener /search endpoint — lets users find any Solana token, not just the trending 20.' },
  { title: 'Tweet-to-launch memecoin', desc: 'The ChadWallet app shows "launch a memecoin from a tweet" — integrate Pump.fun or Moonshot API to bring this to web.' },
  { title: 'Portfolio view', desc: 'Aggregate all token positions from the user\'s wallet, show P&L, cost basis, and unrealized gains.' },
];

export default function SummaryPage() {
  return (
    <main className="min-h-screen bg-[#08090E] text-white">
      {/* Header */}
      <div className="border-b border-[#1E2035] bg-[#0D0E1A]">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="ChadWallet" width={40} height={40} className="rounded-xl" />
            <div>
              <div className="font-black text-lg">ChadWallet — Project Summary</div>
              <div className="text-gray-500 text-sm">Founding Engineer Screen · Adarsha Halder</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://chadwallet-two.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#4AFF91] text-black font-bold text-sm hover:bg-[#22DD66] transition-all"
            >
              Live Preview →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">

        {/* Quick stats */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Time', value: '~8 hours' },
              { label: 'AI Tool', value: 'Claude Code' },
              { label: 'Stack', value: 'Next.js 15 + Privy' },
              { label: 'Status', value: 'Live on Vercel' },
            ].map(({ label, value }) => (
              <div key={label} className="p-5 rounded-2xl border border-[#1E2035] bg-[#0D0E1A] text-center">
                <div className="text-xl font-black text-[#4AFF91]">{value}</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Design & Repo */}
        <section>
          <h2 className="text-2xl font-black mb-6">1. Design &amp; Repo</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <a
              href="https://chadwallet-two.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-[#1E2035] bg-[#0D0E1A] hover:border-[#4AFF9144] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#4AFF9115] flex items-center justify-center text-[#4AFF91] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </div>
              <div>
                <div className="font-bold text-white group-hover:text-[#4AFF91] transition-colors">Live Preview</div>
                <div className="text-gray-500 text-sm">chadwallet-two.vercel.app</div>
              </div>
            </a>
            <a
              href="https://github.com/AdarshaHalder/crypto"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl border border-[#1E2035] bg-[#0D0E1A] hover:border-[#4AFF9144] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#4AFF9115] flex items-center justify-center text-[#4AFF91] flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </div>
              <div>
                <div className="font-bold text-white group-hover:text-[#4AFF91] transition-colors">GitHub Repo</div>
                <div className="text-gray-500 text-sm">github.com/AdarshaHalder/crypto</div>
              </div>
            </a>
          </div>

          <div className="p-6 rounded-2xl border border-[#1E2035] bg-[#0D0E1A] space-y-4">
            <h3 className="font-bold text-gray-300">Architecture</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                ['Framework', 'Next.js 15 App Router + TypeScript'],
                ['Styling', 'Tailwind CSS v4 with custom ChadWallet design tokens'],
                ['Auth', 'Privy (Google + Apple, embedded Solana wallet)'],
                ['Token Data', 'DexScreener API (real-time prices, 24h change, volume)'],
                ['Charts', 'Recharts AreaChart with seeded price data'],
                ['Hosting', 'Vercel (SSR + ISR 30s revalidation)'],
                ['State', 'React Query (30s stale time, background refetch)'],
                ['Swaps', 'Jupiter routing (quote engine wired, signing pending)'],
              ].map(([key, val]) => (
                <div key={key} className="flex gap-2">
                  <span className="text-gray-500 min-w-[100px]">{key}</span>
                  <span className="text-gray-200">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Tools & Timeline */}
        <section>
          <h2 className="text-2xl font-black mb-2">2. AI Tools &amp; Time Breakdown</h2>
          <p className="text-gray-500 mb-6">
            100% of the code was written using <span className="text-white font-semibold">Claude Code</span> (claude-sonnet-4-6) — Anthropic&apos;s agentic CLI. No other AI tools were used. Claude handled architecture decisions, component scaffolding, debugging, and deployment config.
          </p>
          <div className="space-y-3">
            {TIMELINE.map(({ time, task, detail }) => (
              <div key={task} className="flex gap-4 p-4 rounded-xl border border-[#1E2035] bg-[#0D0E1A]">
                <div className="text-[#4AFF91] font-mono font-bold text-sm min-w-[50px] pt-0.5">{time}</div>
                <div>
                  <div className="font-semibold text-white text-sm">{task}</div>
                  <div className="text-gray-500 text-sm mt-0.5">{detail}</div>
                </div>
              </div>
            ))}
            <div className="flex gap-4 p-4 rounded-xl border border-[#4AFF9133] bg-[#4AFF9108]">
              <div className="text-[#4AFF91] font-mono font-bold text-sm min-w-[50px] pt-0.5">~8h</div>
              <div className="font-bold text-[#4AFF91] text-sm pt-0.5">Total</div>
            </div>
          </div>
        </section>

        {/* Issues */}
        <section>
          <h2 className="text-2xl font-black mb-6">3. Issues &amp; How They Were Fixed</h2>
          <div className="space-y-4">
            {ISSUES.map(({ issue, detail, fix }) => (
              <div key={issue} className="p-5 rounded-2xl border border-[#1E2035] bg-[#0D0E1A]">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full bg-[#FF3B5C22] border border-[#FF3B5C44] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B5C]" />
                  </div>
                  <div className="font-bold text-white">{issue}</div>
                </div>
                <p className="text-gray-500 text-sm mb-3 pl-8">{detail}</p>
                <div className="flex items-start gap-3 pl-8">
                  <div className="w-5 h-5 rounded-full bg-[#4AFF9122] border border-[#4AFF9144] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4AFF91]" />
                  </div>
                  <p className="text-gray-300 text-sm">{fix}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Improvements */}
        <section>
          <h2 className="text-2xl font-black mb-6">4. How This Can Be Improved</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {IMPROVEMENTS.map(({ title, desc }, i) => (
              <div key={title} className="p-5 rounded-2xl border border-[#1E2035] bg-[#0D0E1A]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#4AFF91] font-mono text-xs">0{i + 1}</span>
                  <span className="font-bold text-white text-sm">{title}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#1E2035] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div>Built by Adarsha Halder · <a href="mailto:adarshahalder02@gmail.com" className="hover:text-gray-300 transition-colors">adarshahalder02@gmail.com</a></div>
          <a
            href="https://chadwallet-two.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4AFF91] hover:text-white transition-colors font-semibold"
          >
            chadwallet-two.vercel.app →
          </a>
        </footer>
      </div>
    </main>
  );
}
