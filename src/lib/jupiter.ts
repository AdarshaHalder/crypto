const JUPITER_BASE = 'https://api.jup.ag';

export interface JupiterPrice {
  id: string;
  price: string;
  type: string;
}

export async function getTokenPrices(mints: string[]): Promise<Record<string, JupiterPrice>> {
  try {
    const ids = mints.join(',');
    const res = await fetch(`${JUPITER_BASE}/price/v3?ids=${ids}`, {
      next: { revalidate: 10 },
    });
    const data = await res.json();
    return data.data || {};
  } catch {
    return {};
  }
}

export interface JupiterToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
  organicScore?: number;
  marketCap?: number;
  volume24h?: number;
}

export async function searchTokens(query: string, limit = 10): Promise<JupiterToken[]> {
  try {
    const res = await fetch(
      `${JUPITER_BASE}/tokens/v2/search?query=${encodeURIComponent(query)}&limit=${limit}`
    );
    const data = await res.json();
    return (data.tokens || data || []).slice(0, limit);
  } catch {
    return [];
  }
}

export interface SwapQuote {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  priceImpactPct: number;
  routePlan: unknown[];
  slippageBps: number;
  otherAmountThreshold: string;
}

export async function getSwapQuote(
  inputMint: string,
  outputMint: string,
  amount: number,
  slippageBps = 50
): Promise<SwapQuote | null> {
  try {
    const res = await fetch(
      `${JUPITER_BASE}/swap/v2/order?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`,
      { next: { revalidate: 5 } }
    );
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

export const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
export const SOL_MINT = 'So11111111111111111111111111111111111111112';

export function formatAmount(amount: number, decimals: number): number {
  return amount / Math.pow(10, decimals);
}
