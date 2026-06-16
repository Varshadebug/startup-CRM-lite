import React from 'react';
import { Plus, Users, Download } from 'lucide-react';

/**
 * A component providing quick action buttons for common tasks.
 * 
 * @returns {JSX.Element} The rendered QuickActions component.
 */
export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-800 mb-6">Quick Actions</h2>
      <div className="flex flex-col gap-3">
        <button className="flex items-center gap-3 w-full bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
          <Plus size={18} />
          <span>Add New Lead</span>
        </button>
        <button className="flex items-center gap-3 w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg font-medium transition-colors">
          <Users size={18} className="text-[#2563EB]" />
          <span>View All Leads</span>
        </button>
        <button className="flex items-center gap-3 w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg font-medium transition-colors">
          <Download size={18} className="text-slate-500" />
          <span>Export Data</span>
        </button>
      </div>
    </div>
  );
}
