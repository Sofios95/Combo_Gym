import { useContext } from 'react';
import { AuthContext } from './AuthContextCore';

/**
 * Custom hook to safely access the AuthContext state and methods.
 * Throws an error if used outside of an AuthProvider setup.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};