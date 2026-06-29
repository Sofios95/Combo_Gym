import { createContext } from 'react';

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  tokens: number;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  refreshTokens: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
