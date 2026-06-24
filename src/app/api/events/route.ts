import { NextRequest, NextResponse } from 'next/server';
import { getTokenEvents } from '@/lib/codex';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token') || '';
  const events = await getTokenEvents(token);
  return NextResponse.json(events, { headers: { 'Cache-Control': 's-maxage=5' } });
}
