"use client"
import { useState } from "react";



const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    minCalories: "",
    maxCalories: "",
    minCarbs: "",
    maxCarbs: "",
    minFat: "",
    maxFat: "",
    minProtein: "",
    maxProtein: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-2">Filters</h2>
      <div className="grid grid-cols-2 gap-4">
        {["Calories", "Carbs", "Fat", "Protein"].map((nutrient) => (
          <div key={nutrient}>
            <label className="block text-sm font-medium">{nutrient} (Min)</label>
            <input
              type="number"
              name={`min${nutrient}`}
              value={filters[`min${nutrient}` ]}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
            />
            <label className="block text-sm font-medium mt-2">{nutrient} (Max)</label>
            <input
              type="number"
              name={`max${nutrient}`}
              value={filters[`max${nutrient}` ]}
              onChange={handleChange}
              className="border rounded-md p-2 w-full"
            />
          </div>
        ))}
      </div>
      <button
        onClick={applyFilters}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
