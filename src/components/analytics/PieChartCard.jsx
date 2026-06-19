import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { STATUS_COLORS } from '../../constants/analyticsColors';

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white text-xs rounded-lg p-2 shadow-xl border border-slate-700">
        <p className="font-semibold mb-1">{data.name}</p>
        <p>{data.value} Leads</p>
        <p className="text-slate-400">{data.percent}%</p>
      </div>
    );
  }
  return null;
};

const PieChartCard = React.memo(function PieChartCard({ data, totalLeads }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // Calculate percentages for legend
  const dataWithPercents = data.map(item => ({
    ...item,
    percent: totalLeads > 0 ? Math.round((item.value / totalLeads) * 100) : 0
  }));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-sm flex flex-col justify-between min-h-[300px] transition-colors duration-200">
      <div className="mb-4 md:mb-6">
        <h3 id="piechart-heading" className="text-sm md:text-base font-medium text-slate-800 dark:text-white break-words whitespace-normal leading-snug">Lead Status Distribution</h3>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 break-words whitespace-normal">Current status of all selected leads.</p>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row items-center justify-between" role="figure" aria-labelledby="piechart-heading">
        {/* Chart */}
        <div className="w-full lg:w-1/2 h-[250px] relative">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={dataWithPercents}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {dataWithPercents.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#94A3B8'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" aria-hidden="true">
            <span className="text-2xl font-bold text-slate-800 dark:text-white">{totalLeads}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Total Leads</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:pl-6">
          <ul className="space-y-3" aria-label="Chart Legend">
            {dataWithPercents.map((entry, index) => (
              <li key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: STATUS_COLORS[entry.name] || '#94A3B8' }} 
                  />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{entry.name}</span>
                </div>
                <div className="text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300 mr-2">{entry.value}</span>
                  ({entry.percent}%)
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default PieChartCard;
