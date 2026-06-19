import React, { useMemo } from 'react';
import { formatDate } from '../../utils/dateHelpers';
import { UserPlus, CheckCircle, Mail, PhoneCall } from 'lucide-react';

export default function RecentActivity({ leads }) {
  // Generate a mock activity timeline based on leads
  // Since we don't have an 'Activity' log, we'll derive it from the newest leads
  const activities = useMemo(() => {
    return [...(leads || [])]
      .sort((a, b) => new Date(b.createdAt || b.dateAdded || new Date()) - new Date(a.createdAt || a.dateAdded || new Date()))
      .slice(0, 5)
      .map(lead => {
        if (!lead) return null;
        let icon = <UserPlus size={16} className="text-blue-500" />;
        let bg = 'bg-blue-50 dark:bg-blue-500/10';
        let action = 'New lead added';

        if (lead.status === 'Won') {
          icon = <CheckCircle size={16} className="text-emerald-500" />;
          bg = 'bg-emerald-50 dark:bg-emerald-500/10';
          action = 'Deal closed won';
        } else if (lead.status === 'Contacted') {
          icon = <Mail size={16} className="text-amber-500" />;
          bg = 'bg-amber-50 dark:bg-amber-500/10';
          action = 'Contacted lead';
        } else if (lead.status === 'Meeting Scheduled') {
          icon = <PhoneCall size={16} className="text-purple-500" />;
          bg = 'bg-purple-50 dark:bg-purple-500/10';
          action = 'Meeting scheduled';
        }

        return {
          id: lead.id || Math.random().toString(),
          action,
          target: lead.name || 'Unknown',
          date: formatDate(lead.createdAt || lead.dateAdded),
          icon,
          bg
        };
      })
      .filter(Boolean);
  }, [leads]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 transition-colors duration-200">
      <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Recent Activity</h2>
      
      {activities.length > 0 ? (
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id + index} className="flex gap-4">
              <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activity.bg}`}>
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {activity.action} <span className="font-semibold">{activity.target}</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No recent activity.</p>
      )}
    </div>
  );
}
