'use client';

import { useEffect, useState } from 'react';
import type { TokenHolder } from '@/lib/codex';

interface Props {
  tokenAddress: string;
}

function shortenAddress(addr: string): string {
  if (addr.length <= 12) return addr;
  return `${addr.slice(0, 5)}…${addr.slice(-4)}`;
}

export default function HoldersList({ tokenAddress }: Props) {
  const [holders, setHolders] = useState<TokenHolder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/holders?token=${tokenAddress}`)
      .then((r) => r.json())
      .then((data) => { setHolders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [tokenAddress]);

  return (
    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Top Holders</h3>
      {loading ? (
        <div className="text-gray-600 text-sm">Loading holders…</div>
      ) : (
        <div className="space-y-2">
          {holders.slice(0, 8).map((h, i) => (
            <div key={h.address + i} className="flex items-center gap-3">
              <span className="text-gray-600 text-xs w-4">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400 font-mono">{shortenAddress(h.address)}</span>
                  <span className="text-xs text-white font-semibold">{h.percentOwned.toFixed(2)}%</span>
                </div>
                <div className="h-1 rounded-full bg-[#1E2035] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#4AFF91] to-[#4AFF91]"
                    style={{ width: `${Math.min(h.percentOwned * 4, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
