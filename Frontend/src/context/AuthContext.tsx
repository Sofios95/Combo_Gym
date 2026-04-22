import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';
import { jwtDecode } from 'jwt-decode'; // Χρειάζεται εγκατάσταση

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  tokens: number;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  refreshTokens: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshTokens = async () => {
    try {
      const res = await api.get('/tokens/balance');
      setTokens(res.data.tokens);
    } catch (error) {
      console.error("Σφάλμα κατά την ανανέωση των tokens:", error);
    }
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decoded: any = jwtDecode(token);
    setUser({ id: decoded.userId, email: decoded.email, role: decoded.role });
    refreshTokens();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setTokens(0);
    window.location.href = '/login';
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          // Ελέγχουμε αν το token έχει λήξει
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            logout();
          } else {
            setUser({ id: decoded.userId, email: decoded.email, role: decoded.role });
            await refreshTokens();
          }
        } catch (err) {
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, tokens, loading, login, logout, refreshTokens }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};