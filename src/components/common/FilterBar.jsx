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
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isActive 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {filter} <span className={`ml-1 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>({count})</span>
          </button>
        );
      })}
    </div>
  );
}
