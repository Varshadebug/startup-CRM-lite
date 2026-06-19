import React, { useMemo } from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/dateHelpers';

export default function UpcomingFollowUps({ leads }) {
  const followUps = useMemo(() => {
    // Show leads that are in 'Contacted' or 'Meeting Scheduled' state
    return (leads || [])
      .filter(lead => lead?.status === 'Contacted' || lead?.status === 'Meeting Scheduled')
      .slice(0, 4);
  }, [leads]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Upcoming Follow-ups</h2>
        <div className="bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 p-2 rounded-lg">
          <Calendar size={20} />
        </div>
      </div>

      {followUps.length > 0 ? (
        <div className="space-y-4">
          {followUps.map(lead => (
            <div key={lead.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-shadow">
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{lead.name}</span>
                <span className="text-xs text-slate-500">{lead.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={`mailto:${lead.email}`} 
                  className="p-2 text-slate-400 hover:text-blue-600 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg shadow-sm transition-colors"
                  aria-label={`Email ${lead.name}`}
                >
                  <Mail size={16} />
                </a>
                {lead.phone && (
                  <a 
                    href={`tel:${lead.phone}`} 
                    className="p-2 text-slate-400 hover:text-green-600 bg-white dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg shadow-sm transition-colors"
                    aria-label={`Call ${lead.name}`}
                  >
                    <Phone size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-slate-500 dark:text-slate-400">No pending follow-ups!</p>
        </div>
      )}
    </div>
  );
}
