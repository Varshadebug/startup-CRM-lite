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
    primary: 'text-[#2563EB] bg-blue-50',
    success: 'text-[#22C55E] bg-green-50',
    warning: 'text-[#F59E0B] bg-amber-50',
    danger: 'text-[#EF4444] bg-red-50'
  };

  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-100 dark:border-slate-700 flex flex-col hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-lg ${colorStyles[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-slate-800 dark:text-white">{value}</span>
        <span className={`text-sm font-medium flex items-center ${isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">vs last month</p>
    </div>
  );
}
