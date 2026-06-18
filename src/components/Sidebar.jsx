import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart2 } from 'lucide-react';
import DarkModeToggle from './common/DarkModeToggle';

const Sidebar = ({ isMobileOpen, closeSidebar }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-lg border-r border-slate-200 dark:border-slate-700 transition-all duration-300 md:relative md:flex ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 w-20 lg:w-64'}`}>
        <div className="text-2xl font-bold mb-8 mt-2 px-4 h-12 flex items-center justify-center lg:justify-start">
          <NavLink to="/" onClick={closeSidebar}>
            <span className={`block lg:hidden ${isMobileOpen ? 'hidden' : 'block'}`}>S</span>
            <span className={`hidden lg:block ${isMobileOpen ? '!block' : ''}`}>Startup CRM</span>
          </NavLink>
        </div>
      
      <nav className="flex flex-col gap-2 px-2">
        <NavLink 
          to="/" 
          onClick={closeSidebar}
          className={({ isActive }) => 
            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors min-h-[44px] ${
              isActive 
                ? "bg-blue-600 dark:bg-blue-600 text-white font-semibold" 
                : "text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={24} className="min-w-[24px]" />
          <span className={`hidden lg:block ${isMobileOpen ? '!block' : ''}`}>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/leads" 
          onClick={closeSidebar}
          className={({ isActive }) => 
            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors min-h-[44px] ${
              isActive 
                ? "bg-blue-600 dark:bg-blue-600 text-white font-semibold" 
                : "text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
            }`
          }
        >
          <Users size={24} className="min-w-[24px]" />
          <span className={`hidden lg:block ${isMobileOpen ? '!block' : ''}`}>Leads</span>
        </NavLink>
        
        <NavLink 
          to="/analytics" 
          onClick={closeSidebar}
          className={({ isActive }) => 
            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors min-h-[44px] ${
              isActive 
                ? "bg-blue-600 dark:bg-blue-600 text-white font-semibold" 
                : "text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
            }`
          }
        >
          <BarChart2 size={24} className="min-w-[24px]" />
          <span className={`hidden lg:block ${isMobileOpen ? '!block' : ''}`}>Analytics</span>
        </NavLink>
      </nav>

      <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-center lg:justify-between flex-col lg:flex-row gap-4">
        <span className={`text-sm font-medium text-slate-600 dark:text-slate-300 hidden lg:block ${isMobileOpen ? '!block' : ''}`}>Theme</span>
        <DarkModeToggle />
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
