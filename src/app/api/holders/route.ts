import { NextRequest, NextResponse } from 'next/server';
import { getTokenHolders } from '@/lib/codex';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token') || '';
  const holders = await getTokenHolders(token);
  return NextResponse.json(holders, { headers: { 'Cache-Control': 's-maxage=60' } });
}
