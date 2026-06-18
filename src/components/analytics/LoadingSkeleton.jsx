import React from 'react';

const PulseCard = ({ className = "" }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm animate-pulse transition-colors duration-200 ${className}`}>
    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4" />
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2" />
    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
  </div>
);

const PulseChartCard = ({ className = "" }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm animate-pulse flex flex-col h-full transition-colors duration-200 ${className}`}>
    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2" />
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-8" />
    <div className="flex-grow bg-slate-100 dark:bg-slate-700/50 rounded-xl w-full" />
  </div>
);

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-48 mb-2 animate-pulse" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-64 animate-pulse" />
        </div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-32 animate-pulse" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => <PulseCard key={i} />)}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PulseChartCard className="h-[400px]" />
        <PulseChartCard className="h-[400px]" />
      </div>

      {/* Third Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PulseChartCard className="h-[350px]" />
        <PulseChartCard className="h-[350px]" />
      </div>
    </div>
  );
}
