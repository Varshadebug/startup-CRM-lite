import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(undefined);

/**
 * ThemeProvider component that wraps the app and manages theme state.
 * 
 * @param {{ children: React.ReactNode }} props 
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('crm_theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('crm_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('crm_theme', 'light');
    }
  }, [isDarkMode]);

  /**
   * Toggles the current theme between light and dark mode.
   */
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const value = {
    isDarkMode,
    toggleTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Custom hook to use the ThemeContext.
 * @returns {{
 *   isDarkMode: boolean,
 *   toggleTheme: () => void
 * }}
 * @throws {Error} If used outside of ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeContext };
