import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import './App.css';

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <img
          src="./src/assets/AGRINEXUS.png"
          alt="AgriNexus Logo"
          className="logo"
        />
        <h1 className="title">Welcome to AgriNexus</h1>
        <p className="subtitle">
          Empowering Farmers with AI for Smart Agriculture
        </p>
        <button className="login-btn">Log In Now</button>
        <div className="divider">
          <span className="divider-line"></span>
          <span className="divider-text">OR</span>
          <span className="divider-line"></span>
        </div>
        <button className="signup-btn">Sign Up</button>
      </div>
    </div>
  );
}

export default Welcome;
