import React from 'react';

const FILTERS = ['All', 'New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

export default function FilterBar({ activeFilter, onFilterChange, leads }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {FILTERS.map(filter => {
        const count = filter === 'All' 
          ? leads.length 
          : leads.filter(l => l.status === filter).length;
          
        const isActive = activeFilter === filter;
        
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`whitespace-nowrap px-4 py-2 min-h-[44px] flex items-center rounded-full text-sm font-medium transition-colors ${
              isActive 
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {filter} <span className={`ml-1 ${isActive ? 'text-blue-100 dark:text-blue-200' : 'text-slate-400 dark:text-slate-500'}`}>({count})</span>
          </button>
        );
      })}
    </div>
  );
}
