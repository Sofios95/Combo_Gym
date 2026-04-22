import axios from 'axios';

// Δημιουργούμε ένα "instance" του axios με δυναμικό URL
const api = axios.create({
  // Αν υπάρχει η μεταβλητή VITE_API_URL (στο Vercel), τη χρησιμοποιούμε.
  // Αλλιώς, πάμε στο localhost για τοπικό development.
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api` 
    : 'http://localhost:5000/api',
});

// REQUEST INTERCEPTOR: Εκτελείται ΠΡΙΝ φύγει κάθε αίτημα
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Προσθέτουμε το JWT Token αυτόματα σε κάθε call
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR: Εκτελείται ΜΟΛΙΣ έρθει η απάντηση
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Αν το backend στείλει 401 (Unauthorized), σημαίνει το token δεν ισχύει
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); // Καθαρίζουμε το ληγμένο token
      // Προαιρετικά: window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;