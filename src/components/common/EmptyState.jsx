import React from 'react';
import { SearchX, Users } from 'lucide-react';

export default function EmptyState({ totalLeads, onClearFilters }) {
  if (totalLeads === 0) {
    return (
      <div className="col-span-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-12 flex flex-col items-center justify-center text-center transition-colors">
        <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-full mb-4">
          <Users className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">No leads yet</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
          You don't have any leads in the system yet. Click the "Add Lead" button to create your first one.
        </p>
      </div>
    );
  }

  return (
    <div className="col-span-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-12 flex flex-col items-center justify-center text-center transition-colors">
      <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-full mb-4">
        <SearchX className="w-8 h-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">No leads found</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        No leads match your current search and filter criteria.
      </p>
      <button
        onClick={onClearFilters}
        className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}
