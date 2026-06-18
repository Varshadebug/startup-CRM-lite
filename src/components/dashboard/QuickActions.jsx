import React from 'react';
import { Plus, Users, Download } from 'lucide-react';

/**
 * A component providing quick action buttons for common tasks.
 * 
 * @returns {JSX.Element} The rendered QuickActions component.
 */
export default function QuickActions() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-100 dark:border-slate-700 transition-colors duration-200">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Quick Actions</h2>
      <div className="flex flex-col gap-3">
        <button className="flex items-center gap-3 w-full bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
          <Plus size={18} />
          <span>Add New Lead</span>
        </button>
        <button className="flex items-center gap-3 w-full bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-lg font-medium transition-colors">
          <Users size={18} className="text-[#2563EB]" />
          <span>View All Leads</span>
        </button>
        <button className="flex items-center gap-3 w-full bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-lg font-medium transition-colors">
          <Download size={18} className="text-slate-500" />
          <span>Export Data</span>
        </button>
      </div>
    </div>
  );
}
