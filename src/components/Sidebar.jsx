import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart2 } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="bg-slate-800 text-white w-64 min-h-screen p-4 flex flex-col shadow-lg">
      <div className="text-2xl font-bold mb-8 mt-2 px-2">
        <NavLink to="/">Startup CRM</NavLink>
      </div>
      
      <nav className="flex flex-col gap-2">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive 
                ? "bg-blue-600 text-white font-semibold" 
                : "text-gray-300 hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/leads" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive 
                ? "bg-blue-600 text-white font-semibold" 
                : "text-gray-300 hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <Users size={20} />
          Leads
        </NavLink>
        
        <NavLink 
          to="/analytics" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive 
                ? "bg-blue-600 text-white font-semibold" 
                : "text-gray-300 hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <BarChart2 size={20} />
          Analytics
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
