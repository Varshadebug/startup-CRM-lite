import React, { useMemo } from 'react';

// Generate last 30 days for the heatmap
const getLast30Days = () => {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
};

// Map count to an intensity class
const getIntensityClass = (count) => {
  if (count === 0) return 'bg-slate-100 dark:bg-slate-700/50';
  if (count <= 2) return 'bg-indigo-200';
  if (count <= 5) return 'bg-indigo-400';
  if (count <= 10) return 'bg-indigo-600';
  return 'bg-indigo-800';
};

const ActivityHeatmap = React.memo(function ActivityHeatmap({ data }) {
  const days = useMemo(() => getLast30Days(), []);
  
  const countsMap = useMemo(() => {
    return data.reduce((acc, curr) => {
      acc[curr.date] = curr.count;
      return acc;
    }, {});
  }, [data]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-sm flex flex-col justify-between min-h-[300px] transition-colors duration-200">
      <div className="mb-4 md:mb-6">
        <h3 id="heatmap-heading" className="text-sm md:text-base font-medium text-slate-800 dark:text-white break-words whitespace-normal leading-snug">Activity Heatmap</h3>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 break-words whitespace-normal">Lead interactions over the last 30 days.</p>
      </div>

      <div className="flex-grow flex items-center justify-center">
        {/* Simple responsive grid for past 30 days */}
        <div 
          className="grid grid-cols-10 gap-2 w-full max-w-sm mx-auto" 
          role="grid" 
          aria-labelledby="heatmap-heading"
        >
          {days.map((date) => {
            const count = countsMap[date] || 0;
            return (
              <div 
                key={date}
                title={`${date}: ${count} activities`}
                aria-label={`${count} activities on ${date}`}
                role="gridcell"
                className={`w-full aspect-square rounded-sm cursor-help hover:ring-2 hover:ring-indigo-300 transition-all ${getIntensityClass(count)}`}
              />
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex items-center justify-end gap-2 text-xs text-slate-500 dark:text-slate-400" aria-hidden="true">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-700/50" />
        <div className="w-3 h-3 rounded-sm bg-indigo-200" />
        <div className="w-3 h-3 rounded-sm bg-indigo-400" />
        <div className="w-3 h-3 rounded-sm bg-indigo-600" />
        <div className="w-3 h-3 rounded-sm bg-indigo-800" />
        <span>More</span>
      </div>
    </div>
  );
});

export default ActivityHeatmap;
