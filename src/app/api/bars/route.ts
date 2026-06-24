import { NextRequest, NextResponse } from 'next/server';
import { getTokenBars } from '@/lib/codex';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token') || '';
  const resolution = searchParams.get('resolution') || '60';
  const from = parseInt(searchParams.get('from') || '0', 10) || Math.floor(Date.now() / 1000) - 86400;
  const to = parseInt(searchParams.get('to') || '0', 10) || Math.floor(Date.now() / 1000);

  const bars = await getTokenBars(token, resolution, from, to);
  return NextResponse.json(bars, { headers: { 'Cache-Control': 's-maxage=10' } });
}
