const CODEX_ENDPOINT = 'https://graph.codex.io/graphql';
const SOLANA_NETWORK_ID = 1399811149;

async function codexQuery<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const apiKey = process.env.NEXT_PUBLIC_CODEX_API_KEY || '';
  const res = await fetch(CODEX_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 30 },
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}

export interface TrendingToken {
  address: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  imageUrl?: string;
}

export async function getTrendingTokens(limit = 20): Promise<TrendingToken[]> {
  const query = `
    query FilterTokens($limit: Int!) {
      filterTokens(
        filters: { network: [${SOLANA_NETWORK_ID}], liquidity: { gt: 10000 }, volume24: { gt: 1000 } }
        rankings: [{ attribute: volume24, direction: DESC }]
        limit: $limit
      ) {
        results {
          token {
            address
            name
            symbol
            info { imageSmallUrl }
          }
          priceUSD
          change24
          volume24
          marketCap
          liquidity
        }
      }
    }
  `;

  try {
    const data = await codexQuery<{
      filterTokens: {
        results: Array<{
          token: { address: string; name: string; symbol: string; info?: { imageSmallUrl?: string } };
          priceUSD: string;
          change24: number;
          volume24: number;
          marketCap: number;
          liquidity: number;
        }>;
      };
    }>(query, { limit });

    return data.filterTokens.results.map((r) => ({
      address: r.token.address,
      name: r.token.name,
      symbol: r.token.symbol,
      price: parseFloat(r.priceUSD) || 0,
      priceChange24h: r.change24 || 0,
      volume24h: r.volume24 || 0,
      marketCap: r.marketCap || 0,
      liquidity: r.liquidity || 0,
      imageUrl: r.token.info?.imageSmallUrl,
    }));
  } catch {
    return getMockTrendingTokens();
  }
}

export interface TokenBar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export async function getTokenBars(
  tokenAddress: string,
  resolution: string = '60',
  from: number = Math.floor(Date.now() / 1000) - 86400,
  to: number = Math.floor(Date.now() / 1000)
): Promise<TokenBar[]> {
  const query = `
    query GetBars($symbol: String!, $from: Int!, $to: Int!, $resolution: String!) {
      getBars(
        symbol: $symbol
        from: $from
        to: $to
        resolution: $resolution
        currencyCode: "USD"
      ) {
        t
        o
        h
        l
        c
        v
      }
    }
  `;
  try {
    const symbol = `${tokenAddress}:${SOLANA_NETWORK_ID}`;
    const data = await codexQuery<{
      getBars: { t: number[]; o: number[]; h: number[]; l: number[]; c: number[]; v: number[] };
    }>(query, { symbol, from, to, resolution });

    const bars = data.getBars;
    return bars.t.map((t, i) => ({
      time: t,
      open: bars.o[i],
      high: bars.h[i],
      low: bars.l[i],
      close: bars.c[i],
      volume: bars.v[i],
    }));
  } catch {
    return getMockBars();
  }
}

export interface TokenHolder {
  address: string;
  balance: number;
  percentOwned: number;
}

export async function getTokenHolders(tokenAddress: string, limit = 10): Promise<TokenHolder[]> {
  const query = `
    query GetHolders($tokenAddress: String!, $networkId: Int!, $limit: Int!) {
      holders(
        tokenId: "${tokenAddress}:${SOLANA_NETWORK_ID}"
        first: $limit
        orderBy: balance
      ) {
        items {
          ownerAddress
          balance
          percentOwned
        }
      }
    }
  `;
  try {
    const data = await codexQuery<{
      holders: { items: Array<{ ownerAddress: string; balance: number; percentOwned: number }> };
    }>(query, { tokenAddress, networkId: SOLANA_NETWORK_ID, limit });

    return data.holders.items.map((h) => ({
      address: h.ownerAddress,
      balance: h.balance,
      percentOwned: h.percentOwned,
    }));
  } catch {
    return getMockHolders();
  }
}

export interface TokenEvent {
  timestamp: number;
  type: 'buy' | 'sell';
  amount: number;
  priceUSD: number;
  walletAddress: string;
  txHash: string;
}

export async function getTokenEvents(pairAddress: string, limit = 20): Promise<TokenEvent[]> {
  const query = `
    query GetTokenEvents($pairAddress: String!, $networkId: Int!, $limit: Int!) {
      getTokenEvents(
        query: { pairAddress: $pairAddress, networkId: $networkId, limit: $limit }
      ) {
        items {
          timestamp
          eventType
          amount0
          priceUsd
          maker
          transactionHash
        }
      }
    }
  `;
  try {
    const data = await codexQuery<{
      getTokenEvents: {
        items: Array<{
          timestamp: number;
          eventType: string;
          amount0: number;
          priceUsd: number;
          maker: string;
          transactionHash: string;
        }>;
      };
    }>(query, { pairAddress, networkId: SOLANA_NETWORK_ID, limit });

    return data.getTokenEvents.items.map((e) => ({
      timestamp: e.timestamp,
      type: e.eventType === 'Buy' ? 'buy' : 'sell',
      amount: e.amount0,
      priceUSD: e.priceUsd,
      walletAddress: e.maker,
      txHash: e.transactionHash,
    }));
  } catch {
    return getMockEvents();
  }
}

// Mock data fallbacks for demo / missing API key
function getMockTrendingTokens(): TrendingToken[] {
  return [
    { address: 'So11111111111111111111111111111111111111112', name: 'Wrapped SOL', symbol: 'SOL', price: 178.42, priceChange24h: 3.21, volume24h: 2_800_000_000, marketCap: 84_000_000_000, liquidity: 450_000_000 },
    { address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', name: 'USD Coin', symbol: 'USDC', price: 1.0, priceChange24h: 0.01, volume24h: 1_200_000_000, marketCap: 45_000_000_000, liquidity: 800_000_000 },
    { address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', name: 'Bonk', symbol: 'BONK', price: 0.0000248, priceChange24h: -5.3, volume24h: 340_000_000, marketCap: 1_600_000_000, liquidity: 45_000_000 },
    { address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', name: 'Jupiter', symbol: 'JUP', price: 0.82, priceChange24h: 7.4, volume24h: 120_000_000, marketCap: 1_100_000_000, liquidity: 35_000_000 },
    { address: 'WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk', name: 'Wen', symbol: 'WEN', price: 0.000135, priceChange24h: 12.8, volume24h: 89_000_000, marketCap: 135_000_000, liquidity: 8_000_000 },
    { address: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr', name: 'POPCAT', symbol: 'POPCAT', price: 0.48, priceChange24h: -2.1, volume24h: 76_000_000, marketCap: 480_000_000, liquidity: 22_000_000 },
    { address: 'MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5', name: 'cat in a dogs world', symbol: 'MEW', price: 0.0089, priceChange24h: 18.5, volume24h: 65_000_000, marketCap: 890_000_000, liquidity: 18_000_000 },
    { address: 'HZ1JovNiVvGqfehhSnZXGMoNHobKy1n9oKH6kEHKNez', name: 'Pyth Network', symbol: 'PYTH', price: 0.31, priceChange24h: -1.8, volume24h: 58_000_000, marketCap: 460_000_000, liquidity: 15_000_000 },
    { address: '85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ', name: 'W', symbol: 'W', price: 0.19, priceChange24h: 4.2, volume24h: 44_000_000, marketCap: 370_000_000, liquidity: 12_000_000 },
    { address: 'TNSRxcUxoT9xBG3de7V1N5No1bAka1yP7W3sm9THCze', name: 'Tensor', symbol: 'TNSR', price: 0.58, priceChange24h: 9.1, volume24h: 38_000_000, marketCap: 580_000_000, liquidity: 9_000_000 },
  ];
}

function getMockBars(): TokenBar[] {
  const bars: TokenBar[] = [];
  let price = 178;
  const now = Math.floor(Date.now() / 1000);
  for (let i = 23; i >= 0; i--) {
    const change = (Math.random() - 0.48) * 5;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 2;
    const low = Math.min(open, close) - Math.random() * 2;
    bars.push({ time: now - i * 3600, open, high, low, close, volume: Math.random() * 100000 });
    price = close;
  }
  return bars;
}

function getMockHolders(): TokenHolder[] {
  return [
    { address: '7Xj...K9mP', balance: 12_500_000, percentOwned: 12.5 },
    { address: 'Bq2...nRtY', balance: 8_300_000, percentOwned: 8.3 },
    { address: 'Hs8...vWqL', balance: 6_700_000, percentOwned: 6.7 },
    { address: 'Kp4...mNxZ', balance: 4_200_000, percentOwned: 4.2 },
    { address: 'Lz6...dFgT', balance: 3_100_000, percentOwned: 3.1 },
  ];
}

function getMockEvents(): TokenEvent[] {
  const events: TokenEvent[] = [];
  const wallets = ['3xKm...p9Q', '7tNr...w2M', 'Bq8z...K3L', 'Hs4y...vRt'];
  for (let i = 0; i < 15; i++) {
    events.push({
      timestamp: Date.now() / 1000 - i * 45,
      type: Math.random() > 0.5 ? 'buy' : 'sell',
      amount: Math.random() * 50000 + 1000,
      priceUSD: 178 + (Math.random() - 0.5) * 5,
      walletAddress: wallets[Math.floor(Math.random() * wallets.length)],
      txHash: 'mock' + i,
    });
  }
  return events;
}
