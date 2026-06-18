import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

export default function SalesVelocityCard({ velocity }) {
  // Mock previous period trend for UI purposes
  const trendPercent = 14.2; 
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col h-full justify-between hover:shadow-md transition-shadow relative overflow-hidden duration-200">
      {/* Decorative background element */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full opacity-50 pointer-events-none" />
      
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-amber-100 text-amber-600 rounded-lg">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white">Sales Velocity</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Revenue generation speed</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {formatCurrency(velocity)}
            </h2>
            <span className="text-slate-500 dark:text-slate-400 font-medium">/ day</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-md">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{trendPercent}%</span>
          </div>
          <span className="text-slate-500 dark:text-slate-400">vs previous period</span>
        </div>
      </div>
    </div>
  );
}
