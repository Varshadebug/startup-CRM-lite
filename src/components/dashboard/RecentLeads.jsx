import React, { useMemo } from 'react';
import { formatDate } from '../../utils/dateHelpers';
import StatusBadge from '../leads/StatusBadge';

export default function RecentLeads({ leads }) {
  const displayLeads = useMemo(() => {
    return [...(leads || [])]
      .filter(Boolean)
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || a.dateAdded || new Date());
        const dateB = new Date(b.createdAt || b.dateAdded || new Date());
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [leads]);

  const getInitials = (name) => {
    const safeName = name || 'Unknown';
    return safeName
      .split(' ')
      .map(n => n?.[0] || '')
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getRandomColor = (name) => {
    const safeName = name || 'Unknown';
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-purple-100 text-purple-700',
      'bg-emerald-100 text-emerald-700',
      'bg-amber-100 text-amber-700',
      'bg-rose-100 text-rose-700',
      'bg-indigo-100 text-indigo-700'
    ];
    let hash = 0;
    for (let i = 0; i < safeName.length; i++) {
      hash = safeName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors duration-200 flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <h2 id="recent-leads-heading" className="text-lg font-bold text-slate-800 dark:text-white">Recent Leads</h2>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse" aria-labelledby="recent-leads-heading">
          <thead className="bg-slate-50/50 dark:bg-slate-800/50 sticky top-0 z-10 backdrop-blur-sm">
            <tr className="border-b border-slate-200 dark:border-slate-700 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              <th scope="col" className="px-6 py-4">Lead</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4 text-right">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {displayLeads.length > 0 ? (
              displayLeads.map((lead) => (
                <tr key={lead.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/30 even:bg-slate-50/30 dark:even:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${getRandomColor(lead.name)}`}>
                        {getInitials(lead.name)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{lead.name}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{lead.company}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400 text-right font-medium">
                    {formatDate(lead.createdAt || lead.dateAdded)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-slate-500">
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
