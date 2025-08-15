import axios from 'axios';

// Create axios instance with base URL from env or fallback to '/api'
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: attach token if present in localStorage
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token'); // use same key your Auth code stores
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore localStorage errors in server-side or test environments
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: optional global handling (e.g. logout on 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: if token expired -> remove it and optionally redirect to login
    if (error.response && error.response.status === 401) {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem("user")
        
      } catch (e) {}
      
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;