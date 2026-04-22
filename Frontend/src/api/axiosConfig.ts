import axios from 'axios';

// Δημιουργούμε ένα "instance" του axios με τις δικές μας ρυθμίσεις
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Η διεύθυνση του Backend σου στο Docker
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