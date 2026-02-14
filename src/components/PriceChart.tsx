'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface PriceChartProps {
  data: { time: string; value: number }[];
  color?: string;
  height?: number;
  showGrid?: boolean;
}

export default function PriceChart({ 
  data, 
  color = '#22c55e', 
  height = 300,
  showGrid = true 
}: PriceChartProps) {
  const formattedData = data.map((d) => ({
    ...d,
    time: d.time.slice(5),
  }));

  const gradientId = `areaGradient-${color.replace('#', '')}`;

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="50%" stopColor={color} stopOpacity={0.15} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255,255,255,0.05)" 
              vertical={false}
            />
          )}
          <XAxis 
            dataKey="time" 
            tick={{ fill: '#6b7280', fontSize: 11 }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            tickLine={false}
            dy={10}
          />
          <YAxis 
            domain={['auto', 'auto']}
            tick={{ fill: '#6b7280', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            tickLine={false}
            tickFormatter={(value) => `$${value >= 1000 ? (value/1000).toFixed(1) + 'k' : value.toFixed(0)}`}
            width={70}
            dx={10}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#0d1117', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              color: '#fff'
            }}
            labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
            formatter={(value) => [`$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Price']}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ 
              r: 5, 
              fill: color,
              stroke: '#0d1117',
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
