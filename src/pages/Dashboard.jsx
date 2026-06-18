import React from 'react';
import { Users, DollarSign, Activity, Target } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { useLeads } from '../context/LeadContext';


/**
 * The main Dashboard page displaying key metrics, pipeline overview, recent leads, and quick actions.
 * 
 * @returns {JSX.Element} The rendered Dashboard page.
 */
export default function Dashboard() {
  const { leads } = useLeads();

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-500 mt-1 text-sm">Welcome back! Here's what's happening today.</p>
          </div>
        </div>

        {/* Stats Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Leads"
            value="1,284"
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
            value="18.4%"
            icon={Activity}
            change={-2.1}
            color="warning"
          />
          <StatsCard
            title="Lost Deals"
            value="24"
            icon={Target}
            change={5.4}
            color="danger"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (takes up 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <PipelineOverview leads={leads} />
            <RecentLeads leads={leads} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <QuickActions />
          </div>
        </div>

      </div>
    </div>
  );
}
