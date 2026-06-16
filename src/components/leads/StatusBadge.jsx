import React from 'react';

/**
 * A badge component that displays the status of a lead with appropriate colors.
 * 
 * @param {Object} props
 * @param {string} props.status - The status text to display.
 * @returns {JSX.Element}
 */
export default function StatusBadge({ status }) {
  const getBadgeStyles = (statusText) => {
    switch (statusText) {
      case 'New': return 'bg-slate-100 text-slate-700';
      case 'Contacted': return 'bg-blue-100 text-blue-700';
      case 'Meeting Scheduled': return 'bg-purple-100 text-purple-700';
      case 'Proposal Sent': return 'bg-amber-100 text-amber-700';
      case 'Won': return 'bg-green-100 text-green-700';
      case 'Lost': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getBadgeStyles(status)}`}>
      {status}
    </span>
  );
}
