// Helper to safely get date or fallback
const safeDate = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
};

// Helper to get past N months labels (e.g., "Jan", "Feb")
const getLast6MonthsLabels = () => {
  const labels = [];
  const d = new Date();
  for (let i = 5; i >= 0; i--) {
    const month = new Date(d.getFullYear(), d.getMonth() - i, 1);
    labels.push(month.toLocaleString('default', { month: 'short' }));
  }
  return labels;
};

export const getStatusDistribution = (leads) => {
  const counts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getMonthlyLeads = (leads) => {
  const labels = getLast6MonthsLabels();
  const d = new Date();
  const sixMonthsAgo = new Date(d.getFullYear(), d.getMonth() - 5, 1);
  
  const data = labels.map(label => ({ name: label, leads: 0 }));
  
  leads.forEach(lead => {
    const createdAt = safeDate(lead.createdAt);
    if (createdAt && createdAt >= sixMonthsAgo) {
      const monthLabel = createdAt.toLocaleString('default', { month: 'short' });
      const index = data.findIndex(item => item.name === monthLabel);
      if (index !== -1) {
        data[index].leads++;
      }
    }
  });
  
  return data;
};

export const getConversionByMonth = (leads) => {
  const labels = getLast6MonthsLabels();
  const d = new Date();
  const sixMonthsAgo = new Date(d.getFullYear(), d.getMonth() - 5, 1);
  
  const data = labels.map(label => ({ name: label, total: 0, won: 0 }));
  
  leads.forEach(lead => {
    const createdAt = safeDate(lead.createdAt);
    if (createdAt && createdAt >= sixMonthsAgo) {
      const monthLabel = createdAt.toLocaleString('default', { month: 'short' });
      const index = data.findIndex(item => item.name === monthLabel);
      if (index !== -1) {
        data[index].total++;
        if (lead.status === 'Won') {
          data[index].won++;
        }
      }
    }
  });
  
  return data.map(item => ({
    name: item.name,
    rate: item.total === 0 ? 0 : Math.round((item.won / item.total) * 100)
  }));
};

export const getRevenueByMonth = (leads) => {
  const labels = getLast6MonthsLabels();
  const d = new Date();
  const sixMonthsAgo = new Date(d.getFullYear(), d.getMonth() - 5, 1);
  
  const data = labels.map(label => ({ name: label, revenue: 0 }));
  
  leads.forEach(lead => {
    if (lead.status === 'Won') {
      const wonAt = safeDate(lead.wonAt) || safeDate(lead.createdAt); // Fallback if wonAt is missing
      if (wonAt && wonAt >= sixMonthsAgo) {
        const monthLabel = wonAt.toLocaleString('default', { month: 'short' });
        const index = data.findIndex(item => item.name === monthLabel);
        if (index !== -1) {
          data[index].revenue += (Number(lead.value) || 0);
        }
      }
    }
  });
  
  return data;
};

export const getPipelineValue = (leads) => {
  return leads
    .filter(lead => lead.status !== 'Won' && lead.status !== 'Lost')
    .reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);
};

export const getWonRevenue = (leads) => {
  return leads
    .filter(lead => lead.status === 'Won')
    .reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);
};

export const getAverageSalesCycle = (leads) => {
  const wonLeads = leads.filter(lead => lead.status === 'Won' && lead.wonAt && lead.createdAt);
  if (wonLeads.length === 0) return 0;
  
  const totalDays = wonLeads.reduce((sum, lead) => {
    const start = new Date(lead.createdAt);
    const end = new Date(lead.wonAt);
    const diffTime = Math.abs(end - start);
    return sum + Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  }, 0);
  
  return Math.round(totalDays / wonLeads.length);
};

export const getLostRate = (leads) => {
  if (leads.length === 0) return 0;
  const lostLeads = leads.filter(lead => lead.status === 'Lost').length;
  return Math.round((lostLeads / leads.length) * 100);
};

export const getLeadSourceStats = (leads) => {
  const counts = leads.reduce((acc, lead) => {
    const source = lead.source || 'Unknown';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getFunnelData = (leads) => {
  // Approximate funnel drops based on current status.
  // Assuming progression: New -> Contacted -> Meeting Scheduled -> Proposal Sent -> Won
  let newCount = leads.length; // All leads start as New
  let contactedCount = 0;
  let meetingCount = 0;
  let proposalCount = 0;
  let wonCount = 0;
  
  leads.forEach(lead => {
    const s = lead.status;
    if (s === 'Contacted' || s === 'Meeting Scheduled' || s === 'Proposal Sent' || s === 'Won') {
      contactedCount++;
    }
    if (s === 'Meeting Scheduled' || s === 'Proposal Sent' || s === 'Won') {
      meetingCount++;
    }
    if (s === 'Proposal Sent' || s === 'Won') {
      proposalCount++;
    }
    if (s === 'Won') {
      wonCount++;
    }
  });
  
  return [
    { name: 'New', value: newCount },
    { name: 'Contacted', value: contactedCount },
    { name: 'Meeting', value: meetingCount },
    { name: 'Proposal', value: proposalCount },
    { name: 'Won', value: wonCount }
  ];
};

export const getSalesVelocity = (leads) => {
  const opportunities = leads.length;
  if (opportunities === 0) return 0;
  
  const wonLeads = leads.filter(lead => lead.status === 'Won');
  const winRate = wonLeads.length / opportunities;
  
  const totalWonValue = getWonRevenue(leads);
  const avgDealSize = wonLeads.length > 0 ? totalWonValue / wonLeads.length : 0;
  
  const avgSalesCycle = getAverageSalesCycle(leads) || 30; // fallback to 30 days to avoid Infinity
  
  // (Opportunities * Win Rate * Avg Deal Size) / Avg Sales Cycle Length
  const velocity = (opportunities * winRate * avgDealSize) / avgSalesCycle;
  return Math.round(velocity);
};

export const getForecastRevenue = (leads) => {
  const revByMonth = getRevenueByMonth(leads);
  // Avg of past 6 months
  const totalRev = revByMonth.reduce((sum, item) => sum + item.revenue, 0);
  return Math.round(totalRev / Math.max(1, revByMonth.filter(m => m.revenue > 0).length)); // Average of active months
};

export const getTopPerformers = (leads) => {
  const reps = leads.reduce((acc, lead) => {
    if (lead.status === 'Won') {
      const owner = lead.owner || 'Unassigned';
      acc[owner] = (acc[owner] || 0) + (Number(lead.value) || 0);
    }
    return acc;
  }, {});
  
  return Object.entries(reps)
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5); // top 5
};

export const getActivityHeatmapData = (leads) => {
  // Generate a mock or derived heatmap of activity counts by date string (YYYY-MM-DD)
  const activityCounts = {};
  
  leads.forEach(lead => {
    const dates = [
      safeDate(lead.createdAt), 
      safeDate(lead.contactedAt), 
      safeDate(lead.meetingAt)
    ].filter(Boolean);
    
    dates.forEach(d => {
      const dateStr = d.toISOString().split('T')[0];
      activityCounts[dateStr] = (activityCounts[dateStr] || 0) + 1;
    });
  });
  
  return Object.entries(activityCounts).map(([date, count]) => ({ date, count }));
};
