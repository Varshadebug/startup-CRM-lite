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
 * Displays a table of the most recently added leads.
 * 
 * @param {Object} props - The component props.
 * @param {Lead[]} props.leads - The array of leads.
 * @returns {JSX.Element} The rendered RecentLeads component.
 */
export default function RecentLeads({ leads }) {
  // Get last 5 leads (assuming they are sorted, or we sort them, but let's just slice the latest)
  // For safety, let's sort by date added descending and take top 5
  const sortedLeads = [...leads].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  const displayLeads = sortedLeads.slice(0, 5);

  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-[#2563EB]';
      case 'Contacted': return 'bg-amber-100 text-[#F59E0B]';
      case 'Qualified': return 'bg-purple-100 text-purple-700';
      case 'Proposal': return 'bg-indigo-100 text-indigo-700';
      case 'Won': return 'bg-green-100 text-[#22C55E]';
      case 'Lost': return 'bg-red-100 text-[#EF4444]';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 overflow-hidden">
      <h2 className="text-lg font-semibold text-slate-800 mb-6">Recent Leads</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Company</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {displayLeads.length > 0 ? (
              displayLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-4 text-sm font-medium text-slate-800">{lead.name}</td>
                  <td className="py-4 text-sm text-slate-600">{lead.company}</td>
                  <td className="py-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeStyles(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-slate-500 text-right">
                    {new Date(lead.dateAdded).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-sm text-slate-500">
                  No recent leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
