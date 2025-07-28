import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [secPassword, setSecPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(password !== secPassword) {   
            //에러 : 패스워드가 일치하지 않습니다 다시 입력해주세요
            throw new Error('패스워드가 일치하지 않습니다. 다시 입력해주세요!')
          }
          const response = await api.post('/user', {name, email, password});
          if(response.status == 200) {
            navigate('/login')
          }else {
            throw new Error(response.data.error);
          }
          console.log('rrr', response);
      }catch(error) {
        setError(error.message);
      }
    
    //api호출
  }
  return (
    <div className='display-center'>
      {error && <div className='red-error'>{error}</div>}
      <Form className='login-box' onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className='mb-3' controlId='formName'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='string' placeholder='Name' onChange={(event) => setName(event.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' onChange={(event)=> setEmail(event.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' onChange={(event)=> setPassword(event.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type='password' placeholder='re-enter the password' onChange={(event)=> setSecPassword(event.target.value)} />
        </Form.Group>

        <div className='button-box'>
          <Button className='button-primary' type='submit'>
            회원가입
          </Button>
          <span>
            이미 계정이 있다면? <Link to='/login'>로그인 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
