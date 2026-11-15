import api from './api';

export const authService = {
  /**
   * Register a new user
   * POST /api/auth/register
   */
  register: async (name, email, password) => {
    const response = await api.post('/api/auth/register', { name, email, password });
    return response.data; // unwraps axios response
  },

  /**
   * Login an existing user
   * POST /api/auth/login
   */
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data; // unwraps axios response
  },

  /**
   * Logout user (stateless, just clears token locally)
   */
  logout: () => {
    localStorage.removeItem('crm-token');
  },

  /**
   * Get current user profile
   * GET /api/auth/profile
   */
  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data; // unwraps axios response
  },

  /**
   * Update user profile
   * PUT /api/auth/profile
   */
  updateProfile: async (data) => {
    const response = await api.put('/api/auth/profile', data);
    return response.data; // unwraps axios response
  }
};
