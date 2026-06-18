import React from 'react';
import { Calendar } from 'lucide-react';

const DATE_RANGES = [
  { value: 'last7days', label: 'Last 7 Days' },
  { value: 'last30days', label: 'Last 30 Days' },
  { value: 'last90days', label: 'Last 90 Days' },
  { value: 'thisYear', label: 'This Year' },
  { value: 'allTime', label: 'All Time' }
];

export default function AnalyticsFilters({ dateRange, setDateRange }) {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 shadow-sm transition-colors duration-200">
      <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400 ml-2" />
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="bg-transparent dark:bg-slate-800 border-none text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-0 cursor-pointer pr-8 py-1 outline-none"
      >
        {DATE_RANGES.map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
}
