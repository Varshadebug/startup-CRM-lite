import React from 'react';

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

export default function ActivityHeatmap({ data }) {
  const days = getLast30Days();
  const countsMap = data.reduce((acc, curr) => {
    acc[curr.date] = curr.count;
    return acc;
  }, {});

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col h-full transition-colors duration-200">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Activity Heatmap</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Lead interactions over the last 30 days.</p>
      </div>

      <div className="flex-grow flex items-center justify-center">
        {/* Simple responsive grid for past 30 days */}
        <div className="grid grid-cols-10 gap-2 w-full max-w-sm mx-auto">
          {days.map((date, index) => {
            const count = countsMap[date] || 0;
            return (
              <div 
                key={date}
                title={`${date}: ${count} activities`}
                className={`w-full aspect-square rounded-sm cursor-help hover:ring-2 hover:ring-indigo-300 transition-all ${getIntensityClass(count)}`}
              />
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex items-center justify-end gap-2 text-xs text-slate-500 dark:text-slate-400">
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
}
