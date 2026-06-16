import React from 'react';

/**
 * @typedef {Object} Lead
 * @property {string} id - The lead ID.
 * @property {string} name - The lead name.
 * @property {string} company - The lead's company.
 * @property {string} status - The current status of the lead.
 * @property {string} dateAdded - The date the lead was added.
 */

/**
 * Displays a horizontal bar chart summarizing the distribution of leads across different statuses.
 * 
 * @param {Object} props - The component props.
 * @param {Lead[]} props.leads - The array of lead objects to analyze.
 * @returns {JSX.Element} The rendered PipelineOverview component.
 */
export default function PipelineOverview({ leads }) {
  // Aggregate counts per status
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const total = leads.length || 1; // Prevent division by zero

  const statusConfig = {
    New: { color: 'bg-[#2563EB]', label: 'New' },
    Contacted: { color: 'bg-[#F59E0B]', label: 'Contacted' },
    Qualified: { color: 'bg-purple-500', label: 'Qualified' },
    Proposal: { color: 'bg-indigo-500', label: 'Proposal' },
    Won: { color: 'bg-[#22C55E]', label: 'Won' },
    Lost: { color: 'bg-[#EF4444]', label: 'Lost' }
  };

  // Ensure consistent order
  const orderedStatuses = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-800 mb-6">Pipeline Overview</h2>
      
      {/* Horizontal Bar */}
      <div className="w-full h-6 rounded-full flex overflow-hidden mb-6 bg-slate-100">
        {orderedStatuses.map(status => {
          const count = statusCounts[status] || 0;
          if (count === 0) return null;
          const percentage = (count / total) * 100;
          
          return (
            <div 
              key={status}
              className={`h-full ${statusConfig[status]?.color || 'bg-slate-400'}`}
              style={{ width: `${percentage}%` }}
              title={`${status}: ${count} (${percentage.toFixed(1)}%)`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {orderedStatuses.map(status => {
          const count = statusCounts[status] || 0;
          if (count === 0) return null;
          
          return (
            <div key={status} className="flex items-center gap-2 text-sm">
              <span className={`w-3 h-3 rounded-full ${statusConfig[status]?.color || 'bg-slate-400'}`} />
              <span className="text-slate-600">{status}</span>
              <span className="font-medium text-slate-800 ml-auto">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
