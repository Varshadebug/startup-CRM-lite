import axios from 'axios';
import toast from 'react-hot-toast';

// Create an Axios instance with base URL from environment variables
// Use .trim() to ensure no trailing spaces or carriage returns break the URL
const baseURL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').trim().replace(/\/$/, '');
const api = axios.create({
  baseURL,
});

// Request interceptor: attach token automatically if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('crm-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor: handle 401 and network errors globally
api.interceptors.response.use(
  (response) => {
    console.log('[API SUCCESS] URL:', response.config.url, 'Status:', response.status);
    return response;
  },
  (error) => {
    console.error('[API ERROR] Full error object:', error);
    console.error('[API ERROR] Message:', error.message);
    console.error('[API ERROR] Code:', error.code);
    console.error('[API ERROR] Config:', error.config);
    
    // Check if network error
    if (!error.response) {
      console.error('[API ERROR] No response received. This means the server is down, CORS failed, or network is disconnected.');
      toast.error('Cannot connect to server. Check your connection.');
    } else {
      console.error('[API ERROR] Response Status:', error.response.status);
      console.error('[API ERROR] Response Data:', error.response.data);
      if (error.response.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('crm-token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
