import React from 'react';

/**
 * A card component that displays a key metric with an icon and percentage change.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the statistic.
 * @param {string|number} props.value - The main metric value to display.
 * @param {React.ElementType} props.icon - The Lucide React icon component to render.
 * @param {number} props.change - The percentage change compared to the previous period.
 * @param {'primary'|'success'|'warning'|'danger'} [props.color='primary'] - The color theme for the card icon and styling.
 * @returns {JSX.Element} The rendered StatsCard component.
 */
export default function StatsCard({ title, value, icon: Icon, change, color = 'primary' }) {
  const colorStyles = {
    primary: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400',
    success: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400',
    warning: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400',
    danger: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400'
  };

  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 md:p-6 flex flex-col justify-between min-h-[140px] border border-slate-100 dark:border-slate-700/50 relative overflow-hidden group backdrop-blur-sm">
      {/* Glassmorphism subtle gradient background */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-gradient-to-br from-slate-100 to-transparent dark:from-slate-700/30 dark:to-transparent opacity-50 blur-3xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

      <div className="flex items-center gap-3 relative z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${colorStyles[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-tight break-words whitespace-normal">
            {title}
          </p>
        </div>
      </div>
      
      <div className="mt-4 relative z-10 flex flex-col justify-end">
        <span className="text-4xl font-bold text-slate-900 dark:text-white leading-none">
          {value}
        </span>
        <span className={`text-sm font-medium mt-3 block ${isPositive ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
          {isPositive ? '+' : ''}{change}% vs last month
        </span>
      </div>
    </div>
  );
}
