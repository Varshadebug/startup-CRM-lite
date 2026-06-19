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

const BarChartCard = React.memo(function BarChartCard({ data }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-sm flex flex-col justify-between min-h-[300px] transition-colors duration-200">
      <div className="mb-4 md:mb-6">
        <h3 id="barchart-heading" className="text-sm md:text-base font-medium text-slate-800 dark:text-white break-words whitespace-normal leading-snug">Monthly Leads Trend</h3>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 break-words whitespace-normal">New leads generated over the last 6 months.</p>
      </div>

      <div className="flex-grow w-full h-[250px]" role="figure" aria-labelledby="barchart-heading">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748B' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748B' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9' }} />
            <Bar 
              dataKey="leads" 
              fill={CHART_COLORS.Primary} 
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

export default BarChartCard;
