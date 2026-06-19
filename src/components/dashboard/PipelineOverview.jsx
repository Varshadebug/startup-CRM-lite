import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function PipelineOverview({ leads }) {
  const statusCounts = useMemo(() => {
    return (leads || []).reduce((acc, lead) => {
      if (!lead || !lead.status) return acc;
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});
  }, [leads]);

  const total = leads?.length || 1; 

  const funnelStages = [
    { id: 'New', label: 'New Leads', color: 'bg-blue-500' },
    { id: 'Contacted', label: 'Contacted', color: 'bg-amber-500' },
    { id: 'Qualified', label: 'Qualified', color: 'bg-purple-500' },
    { id: 'Proposal', label: 'Proposal Sent', color: 'bg-indigo-500' },
    { id: 'Won', label: 'Closed Won', color: 'bg-emerald-500' }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Sales Funnel</h2>
          <p className="text-sm text-slate-500 mt-1">Lead progression through the pipeline</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        {funnelStages.map((stage, index) => {
          const count = statusCounts[stage.id] || 0;
          const percentage = ((count / total) * 100).toFixed(1);
          
          // Calculate width for the funnel effect (shrinks slightly as it goes down)
          const baseWidth = 100 - (index * 8); 

          return (
            <div key={stage.id} className="relative flex items-center justify-center w-full group">
              {/* Funnel Bar */}
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: `${baseWidth}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`h-14 ${stage.color} rounded-xl shadow-sm flex items-center justify-between px-6 transition-transform hover:scale-[1.02] cursor-default`}
              >
                <span className="text-white font-semibold text-sm md:text-base drop-shadow-sm">{stage.label}</span>
                <div className="flex items-center gap-4 text-white">
                  <span className="font-bold text-lg drop-shadow-sm">{count}</span>
                  <span className="text-sm opacity-90 hidden sm:inline-block w-12 text-right">{percentage}%</span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
