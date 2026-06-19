import React, { useMemo } from 'react';
import { formatDate } from '../../utils/dateHelpers';

/**
 * @typedef {Object} Lead
 * @property {string} id - The lead ID.
 * @property {string} name - The lead name.
 * @property {string} company - The lead's company.
 * @property {string} status - The current status of the lead.
 * @property {string} [dateAdded] - Legacy date added.
 * @property {string} [createdAt] - Modern creation date.
 */

/**
 * Displays a table of the most recently added leads.
 * 
 * @param {Object} props - The component props.
 * @param {Lead[]} props.leads - The array of leads.
 * @returns {JSX.Element} The rendered RecentLeads component.
 */
const RecentLeads = React.memo(function RecentLeads({ leads }) {
  // Memoize the sorting and slicing so it only recalculates if leads array changes
  const displayLeads = useMemo(() => {
    return [...leads]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || a.dateAdded || new Date());
        const dateB = new Date(b.createdAt || b.dateAdded || new Date());
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [leads]);

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
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors duration-200">
      <h2 id="recent-leads-heading" className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Recent Leads</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" aria-labelledby="recent-leads-heading">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
              <th scope="col" className="pb-3 font-medium">Name</th>
              <th scope="col" className="pb-3 font-medium">Company</th>
              <th scope="col" className="pb-3 font-medium">Status</th>
              <th scope="col" className="pb-3 font-medium text-right">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {displayLeads.length > 0 ? (
              displayLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-4 text-sm font-medium text-slate-800 dark:text-slate-200">{lead.name}</td>
                  <td className="py-4 text-sm text-slate-600 dark:text-slate-400">{lead.company}</td>
                  <td className="py-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeStyles(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-slate-500 dark:text-slate-400 text-right whitespace-nowrap">
                    {formatDate(lead.createdAt || lead.dateAdded)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  No recent leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default RecentLeads;
