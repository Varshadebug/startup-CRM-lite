import React from 'react';
import { SearchX, Users } from 'lucide-react';

export default function EmptyState({ totalLeads, onClearFilters }) {
  if (totalLeads === 0) {
    return (
      <div className="col-span-full bg-white border border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-center">
        <div className="bg-blue-50 p-3 rounded-full mb-4">
          <Users className="w-8 h-8 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">No leads yet</h3>
        <p className="text-slate-500 max-w-sm mb-6">
          You don't have any leads in the system yet. Click the "Add Lead" button to create your first one.
        </p>
      </div>
    );
  }

  return (
    <div className="col-span-full bg-white border border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-center">
      <div className="bg-slate-50 p-3 rounded-full mb-4">
        <SearchX className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">No leads found</h3>
      <p className="text-slate-500 max-w-sm mb-6">
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
