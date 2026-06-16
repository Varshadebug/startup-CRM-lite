import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <NavLink to="/">Startup CRM</NavLink>
        </div>
        <div className="flex gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "text-blue-400 font-semibold" : "text-gray-300 hover:text-white transition"
            }
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/leads" 
            className={({ isActive }) => 
              isActive ? "text-blue-400 font-semibold" : "text-gray-300 hover:text-white transition"
            }
          >
            Leads
          </NavLink>
          <NavLink 
            to="/analytics" 
            className={({ isActive }) => 
              isActive ? "text-blue-400 font-semibold" : "text-gray-300 hover:text-white transition"
            }
          >
            Analytics
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
