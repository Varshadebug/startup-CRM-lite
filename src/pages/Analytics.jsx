import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import AnalyticsFilters from '../components/analytics/AnalyticsFilters';
import StatsCards from '../components/analytics/StatsCards';
import PieChartCard from '../components/analytics/PieChartCard';
import FunnelChartCard from '../components/analytics/FunnelChartCard';
import BarChartCard from '../components/analytics/BarChartCard';
import LineChartCard from '../components/analytics/LineChartCard';
import RevenueChartCard from '../components/analytics/RevenueChartCard';
import LeadSourceChart from '../components/analytics/LeadSourceChart';
import SalesVelocityCard from '../components/analytics/SalesVelocityCard';
import ForecastCard from '../components/analytics/ForecastCard';
import ActivityHeatmap from '../components/analytics/ActivityHeatmap';
import TopPerformersCard from '../components/analytics/TopPerformersCard';
import EmptyAnalyticsState from '../components/analytics/EmptyAnalyticsState';
import LoadingSkeleton from '../components/analytics/LoadingSkeleton';

export default function Analytics() {
  const { dateRange, setDateRange, metrics, hasData } = useAnalytics();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network loading for UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <EmptyAnalyticsState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Analytics Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Track sales performance and growth trends.</p>
          </div>
          
          <AnalyticsFilters dateRange={dateRange} setDateRange={setDateRange} />
        </div>

        {/* KPIs */}
        <StatsCards metrics={metrics} />

        {/* Main Grid: 1 col on mobile, 2 cols on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PieChartCard data={metrics.statusDistribution} totalLeads={metrics.totalLeads} />
          <FunnelChartCard data={metrics.funnelData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BarChartCard data={metrics.monthlyLeads} />
          <LineChartCard data={metrics.conversionByMonth} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevenueChartCard data={metrics.revenueByMonth} />
          <LeadSourceChart data={metrics.leadSourceStats} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActivityHeatmap data={metrics.activityHeatmap} />
          <TopPerformersCard data={metrics.topPerformers} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          <ForecastCard forecast={metrics.forecastRevenue} />
          <SalesVelocityCard velocity={metrics.salesVelocity} />
        </div>

      </div>
    </div>
  );
}
