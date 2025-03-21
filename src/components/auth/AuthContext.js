import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUserRole && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Error parsing stored user:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
      }
    }
    
    setLoading(false);
  }, []);

  // Login function 
  const login = async (email, password) => {
    try {
      // Temporarily using mock data until API is connected
      const mockUser = { 
        _id: '1', 
        name: 'Test User', 
        email, 
        phone: '9876543210',
        role: 'user' 
      };
      const mockToken = 'mock-token-1234567890';
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true, user: mockUser, token: mockToken };
    } catch (err) {
      setError('Login failed');
      throw new Error('Login failed');
    }
  };

  // Admin login
  const adminLogin = async (email, password) => {
    try {
      // Temporarily using mock data until API is connected
      const mockAdmin = { 
        _id: '1', 
        name: 'Admin User', 
        email, 
        role: 'admin' 
      };
      const mockToken = 'mock-admin-token-1234567890';
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('user', JSON.stringify(mockAdmin));
      
      setUser(mockAdmin);
      setIsAuthenticated(true);
      return { success: true, admin: mockAdmin, token: mockToken };
    } catch (err) {
      setError('Admin login failed');
      throw new Error('Admin login failed');
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      // Temporarily using mock data until API is connected
      const mockUser = { 
        _id: '1', 
        name: userData.name, 
        email: userData.email,
        phone: userData.phone,
        role: 'user' 
      };
      const mockToken = 'mock-token-1234567890';
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true, user: mockUser, token: mockToken };
    } catch (err) {
      setError('Registration failed');
      throw new Error('Registration failed');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUser(null);
    setIsAuthenticated(false);
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