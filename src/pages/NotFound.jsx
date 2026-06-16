// Import React to define our component
import React from 'react';
// Import the Link component from react-router-dom
import { Link } from 'react-router-dom';

// Define the NotFound functional component
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Go Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
