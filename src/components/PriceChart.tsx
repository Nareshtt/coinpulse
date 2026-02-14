'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  data: { time: string; value: number }[];
  color?: string;
  height?: number;
}

export default function PriceChart({ data, color = '#00cc6a', height = 300 }: PriceChartProps) {
  const formattedData = data.map((d) => ({
    ...d,
    time: d.time.slice(5),
  }));

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="time" 
            tick={{ fill: '#6b7280', fontSize: 11 }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickLine={false}
          />
          <YAxis 
            domain={['auto', 'auto']}
            tick={{ fill: '#6b7280', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            width={80}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#1e1e2a', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff'
            }}
            labelStyle={{ color: '#9ca3af' }}
            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Price']}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
