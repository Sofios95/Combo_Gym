import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContextCore';
import type { User } from './AuthContextCore';

interface JwtPayload {
  exp: number;
  userId: string;
  email: string;
  role: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetches the subscriber's token balance from the backend
  const refreshTokens = async () => {
    try {
      const res = await api.get('/tokens/balance');
      setTokens(res.data.tokens);
    } catch (error) {
      console.error("Error refreshing token balance:", error);
    }
  };

  // Handles post-login state and token assignment
  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decoded: JwtPayload = jwtDecode(token);
    setUser({ id: decoded.userId, email: decoded.email, role: decoded.role });
    refreshTokens();
  };

  // Clears storage and session states
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setTokens(0);
    // REMOVED window.location.href to let React Router handle routing seamlessly
  };

  // Auth checking loop on app load / refresh
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded: JwtPayload = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          // If the token has expired, log the user out
          if (decoded.exp < currentTime) {
            logout();
          } else {
            setUser({ id: decoded.userId, email: decoded.email, role: decoded.role });
            await refreshTokens();
          }
        } catch {
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