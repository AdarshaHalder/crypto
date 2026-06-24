'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { TokenBar } from '@/lib/codex';

const INTERVALS = [
  { label: '1H', resolution: '5', seconds: 3600 },
  { label: '4H', resolution: '15', seconds: 4 * 3600 },
  { label: '1D', resolution: '60', seconds: 86400 },
  { label: '1W', resolution: '240', seconds: 7 * 86400 },
  { label: '1M', resolution: 'D', seconds: 30 * 86400 },
];

interface Props {
  tokenAddress: string;
  symbol: string;
}

export default function PriceChart({ tokenAddress, symbol }: Props) {
  const [bars, setBars] = useState<TokenBar[]>([]);
  const [interval, setInterval] = useState(INTERVALS[2]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    async function load() {
      try {
        const to = Math.floor(Date.now() / 1000);
        const from = to - interval.seconds;
        const res = await fetch(
          `/api/bars?token=${tokenAddress}&resolution=${interval.resolution}&from=${from}&to=${to}`
        );
        const data: TokenBar[] = await res.json();
        if (!cancelled) {
          setBars(data);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [tokenAddress, interval]);

  const isUp = bars.length >= 2 && bars[bars.length - 1].close >= bars[0].open;
  const color = isUp ? '#00FF88' : '#FF3B5C';

  const formatted = bars.map((b) => ({
    time: new Date(b.time * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    price: b.close,
    open: b.open,
    high: b.high,
    low: b.low,
    volume: b.volume,
  }));

  return (
    <div className="flex flex-col h-full">
      {/* Interval selector */}
      <div className="flex items-center gap-1 mb-4">
        {INTERVALS.map((iv) => (
          <button
            key={iv.label}
            onClick={() => setInterval(iv)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              interval.label === iv.label
                ? 'bg-[#00D4FF] text-black'
                : 'text-gray-500 hover:text-white hover:bg-[#1E2035]'
            }`}
          >
            {iv.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[220px]">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-600 text-sm">
            Loading chart…
          </div>
        ) : formatted.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-600 text-sm">
            No chart data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formatted} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`chartGrad-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2035" vertical={false} />
              <XAxis
                dataKey="time"
                tick={{ fill: '#6B7280', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: '#6B7280', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={60}
                tickFormatter={(v) => `$${v < 0.001 ? v.toExponential(1) : v.toFixed(2)}`}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{ background: '#0D0E1A', border: '1px solid #1E2035', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#6B7280' }}
                itemStyle={{ color: '#fff' }}
                formatter={(v) => [`$${Number(v).toFixed(6)}`, 'Price']}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={color}
                strokeWidth={2}
                fill={`url(#chartGrad-${symbol})`}
                dot={false}
                activeDot={{ r: 4, fill: color, stroke: '#08090E', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
