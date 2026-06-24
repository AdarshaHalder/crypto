'use client';

import { useRouter } from 'next/navigation';
import type { TrendingToken } from '@/lib/codex';

function formatPrice(price: number): string {
  if (price < 0.0001) return price.toExponential(2);
  if (price < 1) return price.toFixed(6);
  if (price < 100) return price.toFixed(4);
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function TokenChip({ token, onClick }: { token: TrendingToken; onClick: () => void }) {
  const isUp = token.priceChange24h >= 0;
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1E2035] bg-[#0D0E1A] hover:border-[#4AFF9144] hover:bg-[#4AFF9108] transition-all duration-200 cursor-pointer whitespace-nowrap group"
    >
      {token.imageUrl ? (
        <img src={token.imageUrl} alt={token.symbol} className="w-5 h-5 rounded-full" />
      ) : (
        <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#4AFF91] to-[#4AFF91] flex items-center justify-center text-[8px] font-bold text-black">
          {token.symbol.slice(0, 2)}
        </span>
      )}
      <span className="font-semibold text-sm text-white group-hover:text-[#4AFF91] transition-colors">
        {token.symbol}
      </span>
      <span className="text-sm text-gray-400">${formatPrice(token.price)}</span>
      <span className={`text-xs font-semibold ${isUp ? 'text-[#00FF88]' : 'text-[#FF3B5C]'}`}>
        {isUp ? '+' : ''}{token.priceChange24h.toFixed(2)}%
      </span>
    </button>
  );
}

interface TokenBannerProps {
  tokens: TrendingToken[];
  reverse?: boolean;
}

export default function TokenBanner({ tokens, reverse = false }: TokenBannerProps) {
  const router = useRouter();
  const doubled = [...tokens, ...tokens];

  return (
    <div className="w-full overflow-hidden py-2">
      <div className={`flex gap-2 w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {doubled.map((token, i) => (
          <TokenChip
            key={`${token.address}-${i}`}
            token={token}
            onClick={() => router.push(`/trade/${token.address}`)}
          />
        ))}
      </div>
    </div>
  );
}
