import axios from 'axios';
import toast from 'react-hot-toast';

// Determine API base URL dynamically:
// 1. Uses VITE_API_URL if configured.
// 2. In production (e.g. deployed on Vercel), if VITE_API_URL is missing or set to localhost,
//    safely falls back to the live Render backend URL.
// 3. In local development, falls back to http://localhost:5000.
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL?.trim();
  
  if (import.meta.env.PROD) {
    // If production build and envUrl is empty or inadvertently pointing to localhost
    if (!envUrl || envUrl.includes('localhost') || envUrl.includes('127.0.0.1')) {
      return 'https://startup-crm-lite-backend-jupf.onrender.com';
    }
    return envUrl.replace(/\/+$/, '');
  }

  // Local development
  return (envUrl || 'http://localhost:5000').replace(/\/+$/, '');
};

const baseURL = getBaseURL();
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
