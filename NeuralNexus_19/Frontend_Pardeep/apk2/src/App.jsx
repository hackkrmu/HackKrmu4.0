import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import './App.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, checked });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input 
          type="text" 
          placeholder="Username or Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            checked={checked} 
            onChange={() => setChecked(!checked)}
          />
          I have read and agree to the <a href="#">privacy policy and terms</a>.
        </label>
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="login-footer">
        <a href="#">Sign up</a>
        <a href="#">Forgot password</a>
      </div>
    </div>
  );
};

export default LoginPage;
