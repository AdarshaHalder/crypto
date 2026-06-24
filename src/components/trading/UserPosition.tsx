'use client';

import { usePrivy } from '@privy-io/react-auth';
import type { TrendingToken } from '@/lib/codex';

interface Props { token: TrendingToken | null; }

export default function UserPosition({ token }: Props) {
  const { ready, authenticated, login } = usePrivy();
  if (!ready || !token) return null;

  if (!authenticated) {
    return (
      <div className="p-4 rounded-xl border border-[#1E2035] bg-[#08090E] text-center">
        <p className="text-xs text-gray-500 mb-3">Sign in to view your position</p>
        <button onClick={login} className="text-xs text-[#4AFF91] font-semibold hover:text-white transition-colors">Connect →</button>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl border border-[#1E2035] bg-[#08090E]">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Your Position</h3>
      <div className="space-y-2">
        {[{ label: 'Balance', value: `0.00 ${token.symbol}` }, { label: 'Value (USD)', value: '$0.00' }, { label: 'Avg. Buy Price', value: '—' }, { label: 'P&L', value: '—' }].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{label}</span>
            <span className="text-gray-300 font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
