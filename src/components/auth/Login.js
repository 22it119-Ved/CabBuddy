import React, { useState, useContext } from 'react';
import { Form, Input, Button, Card, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '../../authcontext/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css'; // We'll create this next

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { email, password } = values;
      const response = await login(email, password);
      
      if (response.success) {
        message.success('Login successful!');
        
        // Redirect based on role
        if (response.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }
    } catch (error) {
      message.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Title level={2} className="auth-title">Login to CabBuddy</Title>
        <Divider />
        
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          className="auth-form"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Password" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              block 
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
          
          <div className="auth-links">
            <p>Don't have an account? <Link to="/register">Register now</Link></p>
            <p><Link to="/admin/login">Login as Admin</Link></p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;