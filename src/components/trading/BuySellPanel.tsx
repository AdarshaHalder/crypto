'use client';

import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import type { TrendingToken } from '@/lib/codex';

interface Props { token: TrendingToken | null; }
const QUICK_AMOUNTS = [0.1, 0.25, 0.5, 1];

export default function BuySellPanel({ token }: Props) {
  const { ready, authenticated, login } = usePrivy();
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!token) return <div className="flex items-center justify-center h-full text-gray-600 text-sm">Select a token to trade</div>;

  const estimatedOut = amount
    ? tab === 'buy' ? (parseFloat(amount) * 178) / token.price : parseFloat(amount) * token.price
    : 0;

  async function handleSwap() {
    if (!authenticated) { login(); return; }
    if (!amount || parseFloat(amount) <= 0) return;
    setLoading(true); setTxStatus('idle');
    try { await new Promise((r) => setTimeout(r, 1500)); setTxStatus('success'); setAmount(''); }
    catch { setTxStatus('error'); }
    finally { setLoading(false); }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex rounded-xl border border-[#1E2035] overflow-hidden">
        {(['buy', 'sell'] as const).map((t) => (
          <button key={t} onClick={() => { setTab(t); setAmount(''); setTxStatus('idle'); }}
            className={`flex-1 py-2.5 text-sm font-bold transition-all ${tab === t ? (t === 'buy' ? 'bg-[#00FF88] text-black' : 'bg-[#FF3B5C] text-white') : 'text-gray-500 hover:text-white'}`}>
            {t === 'buy' ? 'Buy' : 'Sell'}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-[#1E2035] bg-[#08090E]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">{tab === 'buy' ? 'Pay (SOL)' : `Sell (${token.symbol})`}</span>
          <span className="text-xs text-gray-600">Balance: 0.00</span>
        </div>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="0.00" value={amount} onChange={(e) => { setAmount(e.target.value); setTxStatus('idle'); }}
            className="flex-1 bg-transparent text-2xl font-bold text-white outline-none placeholder-gray-700" />
          <span className="text-sm font-semibold text-gray-400 bg-[#1E2035] px-2 py-1 rounded-lg">{tab === 'buy' ? 'SOL' : token.symbol}</span>
        </div>
        <div className="flex gap-1.5 mt-3">
          {QUICK_AMOUNTS.map((q) => (
            <button key={q} onClick={() => setAmount(q.toString())}
              className="flex-1 py-1 rounded-lg bg-[#1E2035] hover:bg-[#4AFF9122] text-gray-400 hover:text-[#4AFF91] text-xs font-semibold transition-all">
              {q} SOL
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl border border-[#1E2035] bg-[#08090E]">
        <span className="text-xs text-gray-500">{tab === 'buy' ? `Receive (${token.symbol})` : 'Receive (SOL)'}</span>
        <div className="text-2xl font-bold text-gray-400 mt-1">
          {estimatedOut > 0 ? (estimatedOut < 0.001 ? estimatedOut.toExponential(2) : estimatedOut.toLocaleString('en-US', { maximumFractionDigits: 4 })) : '0.00'}
        </div>
        <div className="text-xs text-gray-600 mt-1">1 {token.symbol} = ${token.price.toFixed(6)}</div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-600">Slippage</span>
        <div className="flex gap-1">
          {[0.5, 1, 2, 5].map((s) => (
            <button key={s} onClick={() => setSlippage(s)}
              className={`px-2 py-1 rounded-md text-xs transition-all ${slippage === s ? 'bg-[#4AFF91] text-black font-bold' : 'bg-[#1E2035] text-gray-400 hover:text-white'}`}>
              {s}%
            </button>
          ))}
        </div>
      </div>

      {ready && (
        authenticated ? (
          <button onClick={handleSwap} disabled={loading || !amount}
            className={`w-full py-4 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed ${tab === 'buy' ? 'bg-[#00FF88] text-black hover:bg-[#00EE77]' : 'bg-[#FF3B5C] text-white hover:bg-[#EE2A4B]'}`}>
            {loading ? 'Swapping…' : `${tab === 'buy' ? 'Buy' : 'Sell'} ${token.symbol}`}
          </button>
        ) : (
          <button onClick={login} className="w-full py-4 rounded-xl font-bold text-sm bg-[#4AFF91] text-black hover:bg-[#22DD66] transition-all">
            Sign in to Trade
          </button>
        )
      )}

      {txStatus === 'success' && <div className="p-3 rounded-xl bg-[#00FF8815] border border-[#00FF8833] text-[#00FF88] text-xs text-center font-semibold">Swap successful!</div>}
      {txStatus === 'error' && <div className="p-3 rounded-xl bg-[#FF3B5C15] border border-[#FF3B5C33] text-[#FF3B5C] text-xs text-center font-semibold">Swap failed. Try again.</div>}

      <div className="space-y-2 pt-2 border-t border-[#1E2035]">
        {[{ label: 'Price Impact', value: '< 0.1%' }, { label: 'Route', value: 'Jupiter' }, { label: 'Network Fee', value: '~0.000005 SOL' }].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between text-xs">
            <span className="text-gray-600">{label}</span><span className="text-gray-400">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
