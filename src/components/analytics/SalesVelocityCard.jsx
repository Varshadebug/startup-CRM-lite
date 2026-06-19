import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

const SalesVelocityCard = React.memo(function SalesVelocityCard({ velocity }) {
  // Mock previous period trend for UI purposes
  const trendPercent = 14.2; 
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 shadow-sm flex flex-col justify-between min-h-[160px] hover:shadow-md transition-all relative overflow-hidden duration-200">
      {/* Decorative background element */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full opacity-50 pointer-events-none" />
      
      <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
        <div className="flex-1">
          <h3 className="text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 break-words whitespace-normal leading-snug">
            Sales Velocity
          </h3>
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 mt-1 break-words whitespace-normal">
            Revenue generation speed
          </p>
        </div>
        <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl shrink-0">
          <Zap className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-auto relative z-10">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-slate-900 dark:text-white leading-tight break-words whitespace-normal">
            {formatCurrency(velocity)}
          </h2>
          <span className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">/ day</span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-md text-sm">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{trendPercent}%</span>
            </div>
            <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 break-words">
              vs previous period
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SalesVelocityCard;
