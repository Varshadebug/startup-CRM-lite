import React from 'react';
import { NavLink } from 'react-router-dom';
import DarkModeToggle from './common/DarkModeToggle';
import { Menu } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Navigation"
          >
            <Menu size={24} />
          </button>
          <div className="text-xl font-bold md:hidden">
            <NavLink to="/">Startup CRM</NavLink>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 mr-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
              }
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/leads" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
              }
            >
              Leads
            </NavLink>
            <NavLink 
              to="/analytics" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
              }
            >
              Analytics
            </NavLink>
          </div>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
