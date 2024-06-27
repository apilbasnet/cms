'use client';

import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface IProps {
  data: { name: string; count: number; id: number }[];
}

export function Overview({ data }: IProps) {
  const values = useMemo(() => {
    return data.map((item) => ({
      name: item.name,
      total: item.count,
    }));
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={values}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
