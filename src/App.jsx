import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import AppRoutes from './routes';

function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  return (
    <Router>
      {/* Container is flex to put Sidebar and Main Content side-by-side */}
      <div className="mx-auto max-w-[1440px] w-full flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden transition-colors duration-200 pb-16 md:pb-0 relative shadow-2xl shadow-slate-200/20 dark:shadow-none border-x border-transparent xl:border-slate-200 dark:xl:border-slate-800">
        
        <Sidebar isMobileOpen={isMobileSidebarOpen} closeSidebar={() => setIsMobileSidebarOpen(false)} />
        
        {/* Main content takes up remaining width and is scrollable */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            <Suspense fallback={
            <div className="flex justify-center items-center h-full">
              <p className="text-slate-500 dark:text-slate-400 text-lg">Loading...</p>
            </div>
          }>
            <div className="max-w-7xl mx-auto">
              <AppRoutes />
            </div>
          </Suspense>
          </main>
        </div>
        
        <BottomNav />

      </div>
    </Router>
  );
}

export default App;
