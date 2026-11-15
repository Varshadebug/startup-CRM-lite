import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('crm-token'));
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage on mount and restore session if possible
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('crm-token');
      if (storedToken) {
        try {
          const res = await authService.getProfile();
          if (res.success) {
            setUser(res.user);
          }
        } catch (error) {
          console.error("Failed to restore session", error);
          authService.logout(); // removes invalid token
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Login user, save token to local storage and update context state
   */
  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res.success) {
      localStorage.setItem('crm-token', res.token);
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  /**
   * Register user, save token to local storage and update context state
   */
  const register = async (name, email, password) => {
    const res = await authService.register(name, email, password);
    if (res.success) {
      localStorage.setItem('crm-token', res.token);
      setToken(res.token);
      setUser(res.user);
    }
    return res;
  };

  /**
   * Logout user, clear local storage and reset state, redirect to /login
   */
  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    window.location.href = '/login';
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to consume AuthContext
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };
