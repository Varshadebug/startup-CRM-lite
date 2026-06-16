import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      {/* Container is flex to put Sidebar and Main Content side-by-side */}
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        
        <Sidebar />
        
        {/* Main content takes up remaining width and is scrollable */}
        <main className="flex-1 overflow-y-auto p-8">
          <Suspense fallback={
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500 text-lg">Loading...</p>
            </div>
          }>
            <div className="max-w-7xl mx-auto">
              <AppRoutes />
            </div>
          </Suspense>
        </main>

      </div>
    </Router>
  );
}

export default App;
