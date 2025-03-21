import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

// Set auth token for authorized requests
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Load token from storage on refresh
export const loadUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }
};

// User registration
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role);
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

// User login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL + 'login', { email, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role);
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

// Admin login
export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(API_URL + 'admin/login', { email, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.admin.role);
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await axios.get(API_URL + 'profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

// Get admin profile
export const getAdminProfile = async () => {
  try {
    const response = await axios.get(API_URL + 'admin/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server error' };
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  setAuthToken(null);
};