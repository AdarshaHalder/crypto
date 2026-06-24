import Image from 'next/image';

const FEATURES = [
  {
    img: '/search.png',
    headline: 'Access tokens before anyone else',
    sub: 'Get the alpha early before it\'s in the spotlight.',
  },
  {
    img: '/buy-sell.png',
    headline: 'Buy & sell trending tokens',
    sub: 'Real-time charts, instant swaps, live trade feed.',
  },
  {
    img: '/token.png',
    headline: 'Fast trading in seconds',
    sub: 'Buy trending tokens 24 hours a day, 7 days a week.',
  },
  {
    img: '/deposit.png',
    headline: 'Secure deposits & instant withdrawals',
    sub: 'You own your crypto. It is safe and untouchable.',
  },
];

export default function AppShowcase() {
  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#4AFF91] text-sm font-semibold uppercase tracking-widest mb-3">The App</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Everything you need<br />
            <span className="gradient-text">to trade on Solana</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ img, headline, sub }) => (
            <div
              key={img}
              className="group rounded-2xl border border-[#1E2035] bg-[#0D0E1A] overflow-hidden hover:border-[#4AFF9144] transition-all duration-300"
            >
              <div className="relative w-full">
                <Image
                  src={img}
                  alt={headline}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <h3 className="text-white font-bold text-base mb-1 leading-snug">{headline}</h3>
                <p className="text-gray-500 text-sm">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Download CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://apps.apple.com/us/app/chadwallet/id6757367474"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-all"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download on App Store
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-xl border border-[#4AFF91] text-[#4AFF91] font-bold text-sm hover:bg-[#4AFF9115] transition-all"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.65.19.96.08l12.45-7.19-2.78-2.78-10.63 9.89zM20.65 9.19L17.5 7.34l-3.12 3.12 3.12 3.12 3.18-1.85c.91-.52.91-1.82-.03-2.54zM1.08.29C.79.52.62.89.62 1.33v21.38c0 .44.17.81.46 1.04l.09.06 11.98-11.98v-.28L1.17.23l-.09.06zM12.9 7.94L1.08.29l10.63 9.88 2.82-2.82-.99-.99-.64.58z"/>
            </svg>
            Get it on Google Play
          </a>
        </div>
      </div>
    </section>
  );
}
