import React from 'react';
import { Mail, Phone, Edit2, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * A card component representing a single lead, primarily used on mobile views.
 * 
 * @param {Object} props
 * @param {Object} props.lead - The lead object.
 * @param {Function} props.onEdit - Callback when edit is clicked.
 * @param {Function} props.onDelete - Callback when delete is clicked.
 * @returns {JSX.Element}
 */
export default function LeadCard({ lead, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-3 transition-colors duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-white">{lead.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{lead.company}</p>
        </div>
        <StatusBadge status={lead.status} />
      </div>
      
      <div className="flex flex-col gap-1.5 mt-1">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Mail size={14} className="text-slate-400 dark:text-slate-500" />
          <a href={`mailto:${lead.email}`} className="truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {lead.email}
          </a>
        </div>
        {lead.phone && (
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Phone size={14} className="text-slate-400 dark:text-slate-500" />
            <a href={`tel:${lead.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {lead.phone}
            </a>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 mt-2 pt-3 border-t border-slate-100 dark:border-slate-700">
        <button 
          onClick={() => onEdit(lead)}
          className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
          aria-label="Edit lead"
        >
          <Edit2 size={16} />
        </button>
        <button 
          onClick={() => onDelete(lead.id)}
          className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          aria-label="Delete lead"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
