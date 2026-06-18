import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart2 } from 'lucide-react';

const BottomNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 transition-colors duration-200 pb-safe">
      <nav className="flex justify-around items-center h-16">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-full h-full min-h-[44px] min-w-[44px] transition-colors ${
              isActive 
                ? "text-blue-600 dark:text-blue-400" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={24} />
        </NavLink>
        <NavLink 
          to="/leads" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-full h-full min-h-[44px] min-w-[44px] transition-colors ${
              isActive 
                ? "text-blue-600 dark:text-blue-400" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`
          }
        >
          <Users size={24} />
        </NavLink>
        <NavLink 
          to="/analytics" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-full h-full min-h-[44px] min-w-[44px] transition-colors ${
              isActive 
                ? "text-blue-600 dark:text-blue-400" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`
          }
        >
          <BarChart2 size={24} />
        </NavLink>
      </nav>
    </div>
  );
};

export default BottomNav;
