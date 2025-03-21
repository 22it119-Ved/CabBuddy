import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../authcontext/AuthContext';
import { Spin } from 'antd';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);
  const location = useLocation();
  
  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  // If not authenticated, redirect to login with current location as state
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user role matches required role
  if (role && user.role !== role) {
    // Redirect based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  // If authenticated and role matches or no role required, render the children
  return children;
};

export default ProtectedRoute;