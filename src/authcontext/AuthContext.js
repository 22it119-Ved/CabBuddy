import React, { createContext, useState, useEffect } from 'react';
import { 
  loadUser, 
  loginUser, 
  loginAdmin, 
  registerUser, 
  getUserProfile, 
  getAdminProfile,
  logout as logoutService
} from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on initial render
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        loadUser();
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        
        if (token) {
          // If we have a token, try to get the user profile
          if (userRole === 'admin') {
            const response = await getAdminProfile();
            if (response.success) {
              setUser(response.admin);
              setIsAuthenticated(true);
            }
          } else {
            const response = await getUserProfile();
            if (response.success) {
              setUser(response.user);
              setIsAuthenticated(true);
            }
          }
        }
      } catch (err) {
        console.error('Error loading user:', err);
        setError(err.message || 'Failed to authenticate');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await registerUser(userData);
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.user);
      }
      return response;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await loginUser(email, password);
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.user);
      }
      return response;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login admin
  const adminLogin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await loginAdmin(email, password);
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.admin);
      }
      return response;
    } catch (err) {
      setError(err.message || 'Admin login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    logoutService();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        register,
        login,
        adminLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};