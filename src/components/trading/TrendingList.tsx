'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { TrendingToken } from '@/lib/codex';

function formatNum(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

export default function TrendingList() {
  const [tokens, setTokens] = useState<TrendingToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const params = useParams();
  const activeAddress = params?.token as string | undefined;

  useEffect(() => {
    fetch('/api/trending')
      .then((r) => r.json())
      .then((data) => { setTokens(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = tokens.filter(
    (t) =>
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-3 border-b border-[#1E2035]">
        <h2 className="text-sm font-bold text-white mb-2">Trending Tokens</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#08090E] border border-[#1E2035] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D4FF44] transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32 text-gray-600 text-sm">Loading…</div>
        ) : (
          <div className="divide-y divide-[#1E2035]">
            {filtered.map((token) => {
              const isActive = token.address === activeAddress;
              const isUp = token.priceChange24h >= 0;
              return (
                <button
                  key={token.address}
                  onClick={() => router.push(`/trade/${token.address}`)}
                  className={`w-full flex items-center gap-2 px-3 py-3 hover:bg-[#00D4FF08] transition-all text-left ${isActive ? 'bg-[#00D4FF08] border-l-2 border-[#00D4FF]' : ''}`}
                >
                  {token.imageUrl ? (
                    <img src={token.imageUrl} alt={token.symbol} className="w-8 h-8 rounded-full flex-shrink-0" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#FFB700] flex items-center justify-center text-black font-bold text-xs flex-shrink-0">
                      {token.symbol.slice(0, 2)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-xs">{token.symbol}</span>
                      <span className={`text-xs font-semibold ${isUp ? 'text-[#00FF88]' : 'text-[#FF3B5C]'}`}>
                        {isUp ? '+' : ''}{token.priceChange24h.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-gray-600 text-[10px] truncate">{formatNum(token.volume24h)} vol</span>
                      <span className="text-gray-400 text-[10px]">
                        ${token.price < 0.0001 ? token.price.toExponential(2) : token.price < 1 ? token.price.toFixed(5) : token.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
