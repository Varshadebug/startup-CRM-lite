// Import React to use JSX and the lazy function for code splitting
import React, { lazy } from 'react';
// Import routing components from react-router-dom
import { Routes, Route } from 'react-router-dom';

// Lazy load the components
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Define the AppRoutes component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Define the route for the Dashboard at the root path ('/') */}
      <Route path="/" element={<Dashboard />} />
      
      {/* Define the route for the Lead Management page */}
      <Route path="/leads" element={<Leads />} />
      
      {/* Define the route for the Analytics page */}
      <Route path="/analytics" element={<Analytics />} />
      
      {/* Define a catch-all route using the '*' wildcard */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
