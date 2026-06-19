import React, { useMemo } from 'react';
import { FunnelChart, Funnel, LabelList, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { CHART_COLORS } from '../../constants/analyticsColors';

const FUNNEL_COLORS = [
  '#3B82F6', // New
  '#60A5FA', // Contacted
  '#93C5FD', // Meeting
  '#C1D4E3', // Proposal
  '#10B981'  // Won (Green)
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white text-xs rounded-lg p-2 shadow-xl border border-slate-700">
        <p className="font-semibold">{data.name}</p>
        <p>{data.value} Leads</p>
        {data.conversionRate !== undefined && (
          <p className="text-emerald-400 mt-1">Conv: {data.conversionRate}%</p>
        )}
        {data.dropOffRate !== undefined && (
          <p className="text-rose-400">Drop: {data.dropOffRate}%</p>
        )}
      </div>
    );
  }
  return null;
};

const FunnelChartCard = React.memo(function FunnelChartCard({ data }) {
  // Enrich data with conversion/drop-off rates relative to previous step
  const enrichedData = useMemo(() => {
    return data.map((item, index) => {
      const prevValue = index === 0 ? item.value : data[index - 1].value;
      const conversionRate = prevValue > 0 ? Math.round((item.value / prevValue) * 100) : 0;
      const dropOffRate = 100 - conversionRate;
      
      return {
        ...item,
        conversionRate: index === 0 ? 100 : conversionRate,
        dropOffRate: index === 0 ? 0 : dropOffRate,
        fill: FUNNEL_COLORS[index] || CHART_COLORS.Primary
      };
    });
  }, [data]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-sm flex flex-col justify-between min-h-[300px] transition-colors duration-200">
      <div className="mb-4 md:mb-6 flex justify-between items-start">
        <div>
          <h3 id="funnelchart-heading" className="text-sm md:text-base font-medium text-slate-800 dark:text-white break-words whitespace-normal leading-snug">Sales Funnel</h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 break-words whitespace-normal">Lead progression through the pipeline.</p>
        </div>
      </div>

      <div className="flex-grow w-full h-[300px]" role="figure" aria-labelledby="funnelchart-heading">
        {enrichedData.every(d => d.value === 0) ? (
          <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
            Not enough data for funnel.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <FunnelChart>
              <Tooltip content={<CustomTooltip />} />
              <Funnel
                dataKey="value"
                data={enrichedData}
                isAnimationActive
              >
                <LabelList 
                  position="right" 
                  fill="#64748B" 
                  stroke="none" 
                  dataKey="name" 
                />
                <LabelList 
                  position="center" 
                  fill="#ffffff" 
                  stroke="none" 
                  dataKey="value" 
                  className="font-medium text-sm"
                />
                {enrichedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
});

export default FunnelChartCard;
