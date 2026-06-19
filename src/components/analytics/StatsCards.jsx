import React from 'react';
import { Users, Activity, DollarSign, Target, Clock, AlertTriangle } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

const StatCard = React.memo(({ title, value, icon: Icon, colorClass, trendText, isNegativeTrend }) => (
  <div className="bg-white dark:bg-slate-800/90 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between min-h-[140px] border border-slate-100 dark:border-slate-700/50 relative overflow-hidden group backdrop-blur-sm">
    {/* Glassmorphism subtle gradient background */}
    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-gradient-to-br from-slate-100 to-transparent dark:from-slate-700/30 dark:to-transparent opacity-50 blur-3xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

    {/* Top Row: [Icon] [Title] */}
    <div className="flex items-center gap-3 relative z-10">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${colorClass}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>
    </div>
    
    {/* Middle: [Main Value] */}
    <div className="relative z-10 mt-2">
      <span className="text-4xl font-bold text-slate-900 dark:text-white leading-none tracking-tight">
        {value}
      </span>
    </div>

    {/* Bottom: [Trend] */}
    <div className="relative z-10 mt-1">
      {trendText && (
        <span className={`text-sm font-semibold ${isNegativeTrend ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
          {trendText}
        </span>
      )}
    </div>
  </div>
));

const StatsCards = React.memo(function StatsCards({ metrics }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
      <StatCard 
        title="Total Leads" 
        value={metrics.totalLeads} 
        icon={Users} 
        colorClass="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" 
        trendText="+12% this month"
      />
      <StatCard 
        title="Conversion Rate" 
        value={`${metrics.conversionRate}%`} 
        icon={Activity} 
        colorClass="bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400" 
        trendText="+2.4% vs last month"
      />
      <StatCard 
        title="Pipeline Value" 
        value={formatCurrency(metrics.pipelineValue)} 
        icon={Target} 
        colorClass="bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400" 
        trendText="+8% this quarter"
      />
      <StatCard 
        title="Won Revenue" 
        value={formatCurrency(metrics.wonRevenue)} 
        icon={DollarSign} 
        colorClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" 
        trendText="+15% this month"
      />
      <StatCard 
        title="Avg Sales Cycle" 
        value={`${metrics.averageSalesCycle} Days`} 
        icon={Clock} 
        colorClass="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" 
        trendText="-2 days faster"
      />
      <StatCard 
        title="Lost Rate" 
        value={`${metrics.lostRate}%`} 
        icon={AlertTriangle} 
        colorClass="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400" 
        trendText="-1.5% vs last month"
      />
    </div>
  );
});

export default StatsCards;
