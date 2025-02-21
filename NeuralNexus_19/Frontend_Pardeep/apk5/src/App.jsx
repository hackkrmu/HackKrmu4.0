import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import './App.css';

const categories = [
  { id: "plants", name: "Plants", description: "Monitor indoor and outdoor plants", icon: "🌱" },
  { id: "crops", name: "Crops", description: "Monitor agricultural crops", icon: "🌾" },
  { id: "both", name: "Both", description: "Monitor all types of plants", icon: "🌱" }
];

const CategorySelection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="container">
      <h1 className="title">Select Category</h1>
      <p className="subtitle">Choose what you want to monitor</p>
      
      <div className="category-list">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${selectedCategory === category.id ? "selected" : ""}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="icon">{category.icon}</span>
            <div>
              <h2 className="category-name">{category.name}</h2>
              <p className="category-description">{category.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button className="continue-button" disabled={!selectedCategory}>Continue</button>
        <button className="back-button">Back</button>
      </div>
    </div>
  );
};

export default CategorySelection;
