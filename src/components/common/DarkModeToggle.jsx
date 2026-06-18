import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
        isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      aria-label="Toggle Dark Mode"
      title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <Sun
          className={`absolute inset-0 w-5 h-5 transition-transform duration-300 ease-in-out ${
            isDarkMode ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 w-5 h-5 transition-transform duration-300 ease-in-out ${
            isDarkMode ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
