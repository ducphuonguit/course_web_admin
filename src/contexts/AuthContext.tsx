import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserDto, LoginRequest, SignupRequest } from '../types/api';
import { authAPI } from '../api';

interface AuthContextType {
  user: UserDto | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    const response = await authAPI.login(credentials);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  };

  const signup = async (data: SignupRequest) => {
    const response = await authAPI.signup(data);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    signup,
    logout,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'ADMIN',
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
