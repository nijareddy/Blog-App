// Login.js
import React, { useState } from 'react';
import Cookies from 'js-cookie'
import {useNavigate,Navigate} from 'react-router-dom'
 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg,setMsg]=useState('')

const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://blog-app-api-mu.vercel.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        Cookies.set('jwt_token',data.jwtToken,{expires:30})
        
       
        setPassword('')
        setUsername('')
        navigate('/')
      } else {
        setMsg(data);
        <Navigate to ='/register'/>
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className='register'>
      <h2 className='heading'>Login</h2>
      <form onSubmit={handleSubmit} className='form-cont'>
        <label className='' htmlFor='username'>
          Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            id="username"
             className='user-input'
          />
        
        <label htmlFor='password'>
          Password
          </label>
          <input
          placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
            id="password"
            className='user-input'
          />
      
        <button type="submit" className='register-btn'>Login</button>
      </form>
    </div>
  );
};

export default Login;
