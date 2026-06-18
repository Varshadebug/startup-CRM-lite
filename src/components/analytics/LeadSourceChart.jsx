import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '../../constants/analyticsColors';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs rounded-lg p-2 shadow-xl border border-slate-700">
        <p className="font-semibold mb-1">{label}</p>
        <p>{payload[0].value} Leads</p>
      </div>
    );
  }
  return null;
};

export default function LeadSourceChart({ data }) {
  // Sort descending
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col h-full transition-colors duration-200">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Lead Sources</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Top performing acquisition channels.</p>
      </div>

      <div className="flex-grow w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart 
            layout="vertical" 
            data={sortedData} 
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
            <XAxis 
              type="number" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748B' }} 
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9' }} />
            <Bar 
              dataKey="value" 
              fill={CHART_COLORS.Purple} 
              radius={[0, 4, 4, 0]}
              barSize={20}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
