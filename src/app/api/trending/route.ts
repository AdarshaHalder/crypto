import { NextResponse } from 'next/server';
import { getTrendingTokens } from '@/lib/codex';

export const revalidate = 30;

export async function GET() {
  const tokens = await getTrendingTokens(30);
  return NextResponse.json(tokens);
}
