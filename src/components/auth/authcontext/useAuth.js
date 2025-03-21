import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // console.error('useAuth must be used within an AuthProvider');
    return {
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
      login: () => {},
      adminLogin: () => {},
      register: () => {},
      logout: () => {},
    };
  }
  return context;
};

export default UseAuth;
