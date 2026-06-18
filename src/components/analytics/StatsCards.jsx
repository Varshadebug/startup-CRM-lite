import React from 'react';
import { Users, Activity, DollarSign, Target, Clock, AlertTriangle } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4 duration-200">
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
    </div>
  </div>
);

export default function StatsCards({ metrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <StatCard 
        title="Total Leads" 
        value={metrics.totalLeads} 
        icon={Users} 
        colorClass="bg-blue-50 text-blue-600" 
      />
      <StatCard 
        title="Conversion Rate" 
        value={`${metrics.conversionRate}%`} 
        icon={Activity} 
        colorClass="bg-green-50 text-green-600" 
      />
      <StatCard 
        title="Pipeline Value" 
        value={formatCurrency(metrics.pipelineValue)} 
        icon={Target} 
        colorClass="bg-purple-50 text-purple-600" 
      />
      <StatCard 
        title="Won Revenue" 
        value={formatCurrency(metrics.wonRevenue)} 
        icon={DollarSign} 
        colorClass="bg-emerald-50 text-emerald-600" 
      />
      <StatCard 
        title="Avg Sales Cycle" 
        value={`${metrics.averageSalesCycle} Days`} 
        icon={Clock} 
        colorClass="bg-amber-50 text-amber-600" 
      />
      <StatCard 
        title="Lost Rate" 
        value={`${metrics.lostRate}%`} 
        icon={AlertTriangle} 
        colorClass="bg-red-50 text-red-600" 
      />
    </div>
  );
}
