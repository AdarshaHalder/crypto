import { getTrendingTokens } from '@/lib/codex';
import Navbar from '@/components/Navbar';
import TokenBanner from '@/components/TokenBanner';
import TradingLayout from '@/components/trading/TradingLayout';

export const revalidate = 30;

interface Params {
  params: Promise<{ token: string }>;
}

export default async function TokenTradePage({ params }: Params) {
  const { token: tokenAddress } = await params;
  const tokens = await getTrendingTokens(20);
  const token = tokens.find((t) => t.address === tokenAddress) || null;

  return (
    <main className="min-h-screen bg-[#08090E] flex flex-col">
      <Navbar />

      {/* Top scrolling banner */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-[#08090E] border-b border-[#1E2035]">
        <TokenBanner tokens={tokens} />
      </div>

      {/* Trading layout */}
      <div className="pt-28 flex-1">
        <TradingLayout tokens={tokens} initialToken={token} tokenAddress={tokenAddress} />
      </div>

      {/* Bottom scrolling banner */}
      <div className="sticky bottom-0 left-0 right-0 bg-[#08090E] border-t border-[#1E2035] z-40">
        <TokenBanner tokens={tokens} reverse />
      </div>
    </main>
  );
}
