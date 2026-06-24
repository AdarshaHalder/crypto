# ChadWallet — Solana Trading Web App

> Founding Engineer screen build · [Live Preview](https://chadwallet-two.vercel.app) · [One-pager](https://chadwallet-two.vercel.app/summary)

A fomo.family-style Solana trading web app built with Next.js 15, Privy auth, and real-time DexScreener data.

---

## Features

- **Landing page** — rotating live token banners (top + bottom), hero, app showcase with real screenshots, trending tokens grid
- **Trading page** — 3-column layout: trending token list / price chart + token info + holders + live trades / buy-sell panel + user position
- **Auth** — Sign in with Google or Apple via Privy; embedded Solana wallet created automatically on login
- **Real data** — Live token prices, 24h change, volume, and trade feeds from DexScreener API
- **Mobile app links** — iOS App Store + Google Play deep links throughout

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | Privy (Google + Apple, embedded Solana wallet) |
| Token data | DexScreener API |
| Charts | Recharts |
| State | React Query |
| Hosting | Vercel (SSR + ISR 30s revalidation) |

## Getting Started

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page (SSR)
│   ├── trade/[token]/        # Token trading page
│   ├── summary/              # Project one-pager
│   └── api/                  # bars, events, holders, trending
├── components/
│   ├── trading/              # TradingLayout, PriceChart, BuySellPanel, etc.
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── TokenBanner.tsx       # Animated marquee banner
│   └── AppShowcase.tsx       # App screenshots section
└── lib/
    └── codex.ts              # DexScreener data layer
```

## Links

- **Live:** https://chadwallet-two.vercel.app
- **One-pager:** https://chadwallet-two.vercel.app/summary
- **iOS App:** https://apps.apple.com/us/app/chadwallet/id6757367474
- **Android App:** https://play.google.com/store/apps/details?id=xyz.chadwallet.www
