import axios from 'axios';

// Δημιουργούμε το instance του axios
const api = axios.create({
  // Χρησιμοποιεί τη μεταβλητή από το Vercel ή το τοπικό σου localhost
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` 
    : 'http://localhost:5000/api',
});

// REQUEST INTERCEPTOR: Προσθήκη του Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR: Διαχείριση σφαλμάτων
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // window.location.href = '/login'; // Ενεργοποίησέ το αν θες αυτόματο logout
    }
    return Promise.reject(error);
  }
);

export default api;