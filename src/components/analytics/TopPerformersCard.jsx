import React from 'react';
import { Award } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

export default function TopPerformersCard({ data }) {
  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col h-full transition-colors duration-200">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Top Performers</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Sales reps ranked by won revenue.</p>
        </div>
        <div className="flex-grow flex items-center justify-center text-slate-400 text-sm">
          No won deals yet.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col h-full transition-colors duration-200">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Top Performers</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Sales reps ranked by won revenue.</p>
      </div>

      <div className="flex-grow overflow-y-auto pr-2">
        <ul className="space-y-4">
          {data.map((rep, index) => (
            <li key={rep.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                  ${index === 0 ? 'bg-amber-100 text-amber-600' : 
                    index === 1 ? 'bg-slate-200 text-slate-600' : 
                    index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}
                >
                  {index === 0 ? <Award className="w-4 h-4" /> : index + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{rep.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(rep.revenue)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
