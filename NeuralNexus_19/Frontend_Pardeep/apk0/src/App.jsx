import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import './App.css';

const LanguageSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  return (
    <div className="language-container">
      <h1 className="title">Select Your Language</h1>
      <p className="subtitle">Choose your preferred language</p>

      <div className="language-list">
        <div
          className={`language-option ${selectedLanguage === "English" ? "selected" : ""}`}
          onClick={() => setSelectedLanguage("English")}
        >
          English {selectedLanguage === "English" && <span>✔</span>}
        </div>

        <div
          className={`language-option ${selectedLanguage === "Hindi" ? "selected" : ""}`}
          onClick={() => setSelectedLanguage("Hindi")}
        >
          हिन्दी {selectedLanguage === "Hindi" && <span>✔</span>}
        </div>
      </div>

      {selectedLanguage && (
        <div className="confirmation-box">
          ✅ {selectedLanguage} Selected
        </div>
      )}

      <button className="continue-button" disabled={!selectedLanguage}>
        Continue in {selectedLanguage || "Selected Language"} →
      </button>
    </div>
  );
};

export default LanguageSelection;
