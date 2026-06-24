'use client';

import { useState } from 'react';
import type { TrendingToken } from '@/lib/codex';
import TrendingList from './TrendingList';
import TokenInfo from './TokenInfo';
import PriceChart from './PriceChart';
import HoldersList from './HoldersList';
import LiveTrades from './LiveTrades';
import BuySellPanel from './BuySellPanel';
import UserPosition from './UserPosition';

interface Props {
  tokens: TrendingToken[];
  initialToken: TrendingToken | null;
  tokenAddress: string;
}

export default function TradingLayout({ tokens: _tokens, initialToken, tokenAddress }: Props) {
  const [token] = useState<TrendingToken | null>(initialToken);

  return (
    <div className="flex h-[calc(100vh-112px)] overflow-hidden">
      {/* Left: Trending list */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 border-r border-[#1E2035] bg-[#0D0E1A] flex-shrink-0 overflow-hidden">
        <TrendingList />
      </aside>

      {/* Middle: Token detail */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-[#1E2035]">
          <TokenInfo token={token} />
        </div>

        {/* Chart */}
        <div className="p-4 border-b border-[#1E2035] h-72 flex-shrink-0">
          {token ? (
            <PriceChart tokenAddress={tokenAddress} symbol={token.symbol} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600 text-sm">
              Loading chart…
            </div>
          )}
        </div>

        {/* Holders + Live trades */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <HoldersList tokenAddress={tokenAddress} />
          <LiveTrades tokenAddress={tokenAddress} />
        </div>
      </div>

      {/* Right: Buy/sell + position */}
      <aside className="hidden md:flex flex-col w-72 xl:w-80 border-l border-[#1E2035] bg-[#0D0E1A] flex-shrink-0">
        <div className="p-4 flex-1 overflow-y-auto">
          <BuySellPanel token={token} />
        </div>
        <div className="p-4 border-t border-[#1E2035]">
          <UserPosition token={token} />
        </div>
      </aside>
    </div>
  );
}
