import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link, useNavigate, Navigate } from 'react-router-dom';
import api from '../utils/api';

const LoginPage = ({ user, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/user/login', { email, password });
      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.token);
        api.defaults.headers['authorization'] = 'Bearer ' + response.data.token;
        setUser(response.data.user);
        setError('');
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };
  if (user) {
    return <Navigate to='/' />;
  }
  return (
    <div>
      {error && (
        <div className='red-error' style={{ textAlign: 'center' }}>
          {error}
        </div>
      )}
      <div className='display-center'>
        <Form className='login-box' onSubmit={handleLogin}>
          <h1>로그인</h1>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className='button-box'>
            <Button type='submit' className='button-primary'>
              Login
            </Button>
            <span>
              계정이 없다면? <Link to='/register'>회원가입 하기</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
