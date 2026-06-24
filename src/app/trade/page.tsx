import { getTrendingTokens } from '@/lib/codex';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export const revalidate = 30;

function formatNum(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toFixed(2)}`;
}

export default async function TradePage() {
  const tokens = await getTrendingTokens(50);

  return (
    <main className="min-h-screen bg-[#08090E]">
      <Navbar />
      <div className="pt-16 max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">
              Trending <span className="gradient-text">Tokens</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Top Solana tokens by 24h volume</p>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-[#1E2035] bg-[#0D0E1A] overflow-hidden">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-[#1E2035] text-xs text-gray-600 uppercase tracking-widest">
            <span>Token</span>
            <span className="text-right">Price</span>
            <span className="text-right">24h %</span>
            <span className="text-right">Volume</span>
            <span className="text-right">Mkt Cap</span>
            <span />
          </div>
          {tokens.map((token, i) => {
            const isUp = token.priceChange24h >= 0;
            return (
              <Link
                key={token.address}
                href={`/trade/${token.address}`}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3.5 border-b border-[#1E2035] last:border-0 hover:bg-[#00D4FF05] transition-all group items-center"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-700 w-5">{i + 1}</span>
                  {token.imageUrl ? (
                    <img src={token.imageUrl} alt={token.symbol} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#FFB700] flex items-center justify-center text-black font-bold text-xs">
                      {token.symbol.slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-[#00D4FF] transition-colors">{token.symbol}</div>
                    <div className="text-xs text-gray-600 truncate max-w-[120px]">{token.name}</div>
                  </div>
                </div>
                <div className="text-right text-sm font-semibold text-white">
                  ${token.price < 0.0001 ? token.price.toExponential(2) : token.price < 1 ? token.price.toFixed(5) : token.price.toFixed(2)}
                </div>
                <div className={`text-right text-sm font-semibold ${isUp ? 'text-[#00FF88]' : 'text-[#FF3B5C]'}`}>
                  {isUp ? '+' : ''}{token.priceChange24h.toFixed(2)}%
                </div>
                <div className="text-right text-sm text-gray-400">{formatNum(token.volume24h)}</div>
                <div className="text-right text-sm text-gray-400">{formatNum(token.marketCap)}</div>
                <div>
                  <span className="px-3 py-1 rounded-lg bg-[#00D4FF15] text-[#00D4FF] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Trade →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
