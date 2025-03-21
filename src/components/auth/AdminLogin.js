import React, { useState, useContext } from 'react';
import { Form, Input, Button, Card, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '../../authcontext/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const { Title } = Typography;

const AdminLogin = () => {
  const [form] = Form.useForm();
  const { adminLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { email, password } = values;
      const response = await adminLogin(email, password);
      
      if (response.success) {
        message.success('Login successful!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      message.error(error.message || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Title level={2} className="auth-title">Admin Login</Title>
        <Divider />
        
        <Form
          form={form}
          name="adminLogin"
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
              Login as Admin
            </Button>
          </Form.Item>
          
          <div className="auth-links">
            <p><Link to="/login">Back to User Login</Link></p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;