import React from 'react';
import { BarChart3, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmptyAnalyticsState() {
  const navigate = useNavigate();
  
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 transition-colors duration-200">
      <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <BarChart3 className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No analytics available yet</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
        Add your first lead to start tracking business performance, viewing conversion rates, and forecasting revenue.
      </p>
      <button 
        onClick={() => navigate('/leads')}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
      >
        <Plus className="w-5 h-5" />
        <span>Add Lead</span>
      </button>
    </div>
  );
}
