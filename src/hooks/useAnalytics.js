import { useState, useMemo } from 'react';
import { useLeads } from '../context/LeadContext';
import {
  getStatusDistribution,
  getMonthlyLeads,
  getConversionByMonth,
  getRevenueByMonth,
  getPipelineValue,
  getWonRevenue,
  getAverageSalesCycle,
  getLostRate,
  getLeadSourceStats,
  getFunnelData,
  getSalesVelocity,
  getForecastRevenue,
  getTopPerformers,
  getActivityHeatmapData
} from '../utils/analyticsHelpers';

export function useAnalytics() {
  const { leads } = useLeads();
  const [dateRange, setDateRange] = useState('last30days'); // last7days, last30days, last90days, thisYear, allTime

  const filteredLeads = useMemo(() => {
    if (dateRange === 'allTime') return leads;
    
    const now = new Date();
    let startDate = new Date();
    
    switch (dateRange) {
      case 'last7days':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'last30days':
        startDate.setDate(now.getDate() - 30);
        break;
      case 'last90days':
        startDate.setDate(now.getDate() - 90);
        break;
      case 'thisYear':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        return leads;
    }

    return leads.filter(lead => {
      if (!lead.createdAt) return false;
      const createdAt = new Date(lead.createdAt);
      return createdAt >= startDate && createdAt <= now;
    });
  }, [leads, dateRange]);

  // Memoize all complex calculations based on the filtered leads
  const metrics = useMemo(() => ({
    totalLeads: filteredLeads.length,
    conversionRate: filteredLeads.length === 0 ? 0 : Math.round((filteredLeads.filter(l => l.status === 'Won').length / filteredLeads.length) * 100),
    pipelineValue: getPipelineValue(filteredLeads),
    wonRevenue: getWonRevenue(filteredLeads),
    averageSalesCycle: getAverageSalesCycle(filteredLeads),
    lostRate: getLostRate(filteredLeads),
    salesVelocity: getSalesVelocity(filteredLeads),
    forecastRevenue: getForecastRevenue(filteredLeads),
    
    // Chart data
    statusDistribution: getStatusDistribution(filteredLeads),
    monthlyLeads: getMonthlyLeads(filteredLeads), // Note: these might use all leads or filtered depending on logic
    conversionByMonth: getConversionByMonth(filteredLeads),
    revenueByMonth: getRevenueByMonth(filteredLeads),
    leadSourceStats: getLeadSourceStats(filteredLeads),
    funnelData: getFunnelData(filteredLeads),
    topPerformers: getTopPerformers(filteredLeads),
    activityHeatmap: getActivityHeatmapData(filteredLeads)
  }), [filteredLeads]);

  return {
    dateRange,
    setDateRange,
    metrics,
    hasData: leads.length > 0
  };
}
