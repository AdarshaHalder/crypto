'use client';

import { useEffect, useRef, useState } from 'react';
import type { TokenEvent } from '@/lib/codex';

interface Props {
  tokenAddress: string;
}

function formatTime(ts: number): string {
  const d = new Date(ts * 1000);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatAmount(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toFixed(0);
}

export default function LiveTrades({ tokenAddress }: Props) {
  const [events, setEvents] = useState<TokenEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    let mounted = true;

    async function loadEvents() {
      try {
        const res = await fetch(`/api/events?token=${tokenAddress}`);
        const data: TokenEvent[] = await res.json();
        if (mounted) {
          setEvents(data);
          setLoading(false);
        }
      } catch {
        if (mounted) setLoading(false);
      }
    }

    loadEvents();
    const interval = window.setInterval(loadEvents, 8000);
    return () => { mounted = false; window.clearInterval(interval); };
  }, [tokenAddress]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Trades</h3>
        <span className="flex items-center gap-1 text-[10px] text-[#00FF88]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
          Live
        </span>
      </div>

      {loading ? (
        <div className="text-gray-600 text-sm">Loading trades…</div>
      ) : (
        <div ref={listRef} className="space-y-1 max-h-48 overflow-y-auto">
          <div className="grid grid-cols-4 gap-2 text-[10px] text-gray-600 mb-2 px-1">
            <span>Type</span><span>Amount</span><span>Price</span><span>Time</span>
          </div>
          {events.map((e, i) => (
            <div
              key={`${e.txHash}-${i}`}
              className={`grid grid-cols-4 gap-2 text-xs px-1 py-1 rounded ${e.type === 'buy' ? 'bg-[#00FF8808]' : 'bg-[#FF3B5C08]'}`}
            >
              <span className={`font-semibold ${e.type === 'buy' ? 'text-[#00FF88]' : 'text-[#FF3B5C]'}`}>
                {e.type === 'buy' ? 'BUY' : 'SELL'}
              </span>
              <span className="text-gray-300">{formatAmount(e.amount)}</span>
              <span className="text-gray-400">${e.priceUSD.toFixed(4)}</span>
              <span className="text-gray-600 text-[10px]">{formatTime(e.timestamp)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
