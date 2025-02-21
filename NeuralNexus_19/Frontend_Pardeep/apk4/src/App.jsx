import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import './App.css';

function Permissions() {
  const [cameraAccess, setCameraAccess] = useState(false);
  const [locationAccess, setLocationAccess] = useState(false);

  const handleSubmit = () => {
    alert(`Camera Access: ${cameraAccess}\nLocation Access: ${locationAccess}`);
  };

  return (
    <div className="permissions-container">
      <h1 className="permissions-title">Allows Permissions</h1>
      <div className="permissions-image">
        <img
          src="./src/assets/IMG.png"
          alt="Permissions Illustration"
        />
      </div>
      <div className="permission-card">
        <div className="permission-item">
          <span className="permission-icon"><img src="./src/assets/cam.png" alt="camera" /></span>
          <div className="permission-text">
            <h2>Camera Access</h2>
            <p>For scanning QR codes and taking photos</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={cameraAccess}
              onChange={() => setCameraAccess(!cameraAccess)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="permission-item">
          <span className="permission-icon"><img src="./src/assets/loc.png" alt="location" /></span>
          <div className="permission-text">
            <h2>Location Access</h2>
            <p>For personalized local experiences</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={locationAccess}
              onChange={() => setLocationAccess(!locationAccess)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Permissions;
