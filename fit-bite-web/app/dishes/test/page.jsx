"use client";

import { useState } from "react";
import { menuData } from "@/app/dishdata";
// const menuData = [
//   {
//     category: "Weight Gain",
//     dishes: [
//       { name: "Peanut Butter Oatmeal", calories: 450, carbs: 55, fat: 18, protein: 15 },
//       { name: "Avocado Chicken Sandwich", calories: 600, carbs: 50, fat: 25, protein: 30 },
//     ],
//   },
//   {
//     category: "Weight Loss",
//     dishes: [
//       { name: "Grilled Chicken Salad", calories: 250, carbs: 15, fat: 8, protein: 30 },
//       { name: "Quinoa & Veggies", calories: 300, carbs: 40, fat: 10, protein: 20 },
//     ],
//   },
// ];

export default function MenuFilter() {
  const [category, setCategory] = useState("All");
  const [calories, setCalories] = useState(1000);
  const [carbs, setCarbs] = useState(100);
  const [fat, setFat] = useState(50);
  const [protein, setProtein] = useState(50);

  const filteredDishes = menuData
    .filter((cat) => category === "All" || cat.category === category)
    .flatMap((cat) =>
      cat.dishes.filter(
        (dish) =>
          dish.calories <= calories &&
          dish.carbohydrates <= carbs &&
          dish.fat <= fat &&
          dish.protein <= protein
      )
    );
console.log({menuData})
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Dietary Menu</h2>

      {/* Category Dropdown */}
      <label className="block text-lg font-medium mb-2">Category</label>
      <select
        className="w-full p-2 border rounded-lg mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All</option>
        {menuData.map((cat) => (
          <option key={cat.category} value={cat.category}>
            {cat.category}
          </option>
        ))}
      </select>

      {/* Sliders */}
      {[
        { label: "Max Calories", value: calories, setter: setCalories, max: 1000 },
        { label: "Max Carbs", value: carbs, setter: setCarbs, max: 100 },
        { label: "Max Fat", value: fat, setter: setFat, max: 50 },
        { label: "Max Protein", value: protein, setter: setProtein, max: 50 },
      ].map(({ label, value, setter, max }) => (
        <div key={label} className="mb-4">
          <label className="block font-medium">{label}: {value}</label>
          <input
            type="range"
            min="0"
            max={max}
            value={value}
            onChange={(e) => setter(Number(e.target.value))}
            className="w-full"
          />
        </div>
      ))}

      {/* Filtered Dishes */}
      <h3 className="text-xl font-semibold mt-6">Dishes</h3>
      <ul className="mt-2 space-y-2">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish, index) => (
            <li key={index} className="p-3 border rounded-lg shadow-sm">
              <strong>{dish.dish_name}</strong> - {dish.calories} kcal, {dish.carbs}g carbs, {dish.fat}g fat, {dish.protein}g protein
            </li>
          ))
        ) : (
          <p className="text-gray-500">No matching dishes found.</p>
        )}
      </ul>
    </div>
  );
}
