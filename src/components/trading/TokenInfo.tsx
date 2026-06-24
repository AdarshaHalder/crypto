'use client';

import type { TrendingToken } from '@/lib/codex';

interface Props {
  token: TrendingToken | null;
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-[#08090E] border border-[#1E2035]">
      <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-sm font-bold text-white">{value}</div>
    </div>
  );
}

function formatLargeNum(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

export default function TokenInfo({ token }: Props) {
  if (!token) return null;
  const isUp = token.priceChange24h >= 0;
  const priceStr = token.price < 0.0001
    ? `$${token.price.toExponential(4)}`
    : `$${token.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`;

  return (
    <div className="flex flex-col gap-4">
      {/* Token header */}
      <div className="flex items-center gap-3">
        {token.imageUrl ? (
          <img src={token.imageUrl} alt={token.symbol} className="w-12 h-12 rounded-full" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4AFF91] to-[#4AFF91] flex items-center justify-center text-black font-black text-lg">
            {token.symbol.slice(0, 2)}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-white">{token.symbol}</h1>
            <span className="text-xs text-gray-500 bg-[#1E2035] px-2 py-0.5 rounded-full">Solana</span>
          </div>
          <div className="text-xs text-gray-500">{token.name}</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-2xl font-black text-white">{priceStr}</div>
          <div className={`text-sm font-semibold ${isUp ? 'text-[#00FF88]' : 'text-[#FF3B5C]'}`}>
            {isUp ? '▲' : '▼'} {Math.abs(token.priceChange24h).toFixed(2)}% (24h)
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Market Cap" value={formatLargeNum(token.marketCap)} />
        <StatCard label="24h Volume" value={formatLargeNum(token.volume24h)} />
        <StatCard label="Liquidity" value={formatLargeNum(token.liquidity)} />
        <StatCard label="24h Change" value={`${isUp ? '+' : ''}${token.priceChange24h.toFixed(2)}%`} />
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <span>Contract:</span>
        <span className="font-mono text-gray-400 truncate max-w-xs">{token.address}</span>
        <button
          onClick={() => navigator.clipboard.writeText(token.address)}
          className="text-[#4AFF91] hover:text-white transition-colors flex-shrink-0"
          title="Copy address"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
