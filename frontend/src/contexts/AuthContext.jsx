import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decode = jwtDecode(token);
      const tokenExpiration = decode.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        refresh_token();
      } else {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const refresh_token = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    try {
      const response = await api.post('/accounts/token/refresh/', { refresh: refresh_token });
      console.log('Response after refresh token', response);
      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('Refresh token response', refresh_token);
      console.error("Failed to refresh token", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, refresh_token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};