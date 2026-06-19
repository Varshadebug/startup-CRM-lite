import React, { useMemo } from 'react';
import { Users, DollarSign, Activity, Target, TrendingUp, CreditCard } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import LeadSourceChart from '../components/dashboard/LeadSourceChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import UpcomingFollowUps from '../components/dashboard/UpcomingFollowUps';
import { useLeads } from '../context/LeadContext';

export default function Dashboard() {
  const { leads } = useLeads();

  // Mock calculations for new cards (In a real app, these would come from an analytics context)
  const conversionRate = useMemo(() => {
    if (!leads || leads.length === 0) return 0;
    const won = leads.filter(l => l?.status === 'Won').length;
    return ((won / leads.length) * 100).toFixed(1);
  }, [leads]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 transition-colors duration-200 p-6 md:p-8 lg:p-10">
      <div className="max-w-[1800px] 2xl:max-w-full mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-base">Welcome back! Here's your business at a glance.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <StatsCard
            title="Total Leads"
            value={leads?.length || 0}
            icon={Users}
            change={12.5}
            color="primary"
          />
          <StatsCard
            title="Revenue Pipeline"
            value="$42,500"
            icon={DollarSign}
            change={8.2}
            color="success"
          />
          <StatsCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            icon={Activity}
            change={2.1}
            color="success"
          />
          <StatsCard
            title="Lost Deals"
            value={(leads || []).filter(l => l?.status === 'Lost').length}
            icon={Target}
            change={-5.4}
            color="danger"
          />
          <StatsCard
            title="Revenue Generated"
            value="$18,200"
            icon={CreditCard}
            change={15.3}
            color="primary"
          />
          <StatsCard
            title="Monthly Growth"
            value="24.5%"
            icon={TrendingUp}
            change={4.2}
            color="success"
          />
        </div>

        {/* Main Layout Grid - 12 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column - Spans 8 */}
          <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <PipelineOverview leads={leads} />
              <LeadSourceChart leads={leads} />
            </div>
            <RecentLeads leads={leads} />
          </div>

          {/* Right Column - Spans 4 */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
            <QuickActions />
            <UpcomingFollowUps leads={leads} />
            <RecentActivity leads={leads} />
          </div>

        </div>

      </div>
    </div>
  );
}
