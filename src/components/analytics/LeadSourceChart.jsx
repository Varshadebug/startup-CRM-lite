import React, { useMemo } from 'react';
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

const LeadSourceChart = React.memo(function LeadSourceChart({ data }) {
  // Sort descending
  const sortedData = useMemo(() => [...data].sort((a, b) => b.value - a.value), [data]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-sm flex flex-col justify-between min-h-[300px] transition-colors duration-200">
      <div className="mb-4 md:mb-6">
        <h3 id="leadsource-heading" className="text-sm md:text-base font-medium text-slate-800 dark:text-white break-words whitespace-normal leading-snug">Lead Sources</h3>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 break-words whitespace-normal">Top performing acquisition channels.</p>
      </div>

      <div className="flex-grow w-full h-[250px]" role="figure" aria-labelledby="leadsource-heading">
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
});

export default LeadSourceChart;
