"use client"
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { menuData } from "../dishdata";
// import Filters from "../components/filter";
import { useRouter } from "next/navigation";
function MenuPage() {
  // const smallCakes = menuData.smallCakes || [];
  // const largeCakes = menuData.largeCakes || [];
  // const desserts = menuData.desserts || [];
  // const pastries = menuData.pastries || [];
  const [category, setCategory] = useState("All");
  const [calories, setCalories] = useState(1000);
  const [carbs, setCarbs] = useState(100);
  const [fat, setFat] = useState(50);
  const [protein, setProtein] = useState(50);
  const router = useRouter();
  const filteredDishes = menuData
    .filter((cat) => cat.category === category)
    .flatMap((cat) =>
      cat.dishes.filter(
        (dish) =>
          dish.calories <= calories &&
          dish.carbohydrates <= carbs &&
          dish.fat <= fat &&
          dish.protein <= protein
      )
    );
  return (
    <div>
      <Head>
        <title>Restaurant Menu</title>
      </Head>
      <h1 className="text-gray-600  font-semibold mb-4 mx-12 mt-4 text-lg md:text-2xl lg:text-3xl md:mt-24 sm:mt-12">
        Restaurant Menu
      </h1>
      <div className=" p-4 shadow-2xl shadow-violet-500/30 m-8 opacity-100 text-white">
      <h2 className="text-2xl font-bold mb-4">Dietary Menu</h2>

      {/* Category Dropdown */}
      <label className="block text-lg font-medium mb-2">Category</label>
      <select
        className="w-full p-2 border rounded-lg mb-4 text-black"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Select" >Select</option>
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
     
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* <ul className="mt-2 space-y-2"> */}
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish, index) => (
        
                <div
          key={index} 
          onClick={()=> {
            console.log(dish)
            router.push(`/dishes/${dish.id}`)}}
          className=" rounded-xl p-4 shadow-2xl shadow-violet-500/30 m-8 opacity-100 "
        >
          <Link href="/dishes/cakes/small">
            <Image
              src="/testimages.jpg"
              alt="Small sized cakes"
              className="w-full h-36 object-cover mb-2"
              width={400}
              height={400}
            />
            <h2 className="text-xl text-violet-700 font-semibold mb-2">
            {dish.dish_name}
            </h2>
          </Link>
          <p className="text-gray-600">{dish.calories} kcal</p>
          <p className="text-gray-600">{dish.carbs}g carbs</p>
          <p className="text-gray-600">{dish.fat}g fat</p>
          <p className="text-gray-600">{dish.protein}g protein</p>
          <div className="mt-2 flex justify-between items-center"></div>
        </div>
              // <strong>{dish.dish_name}</strong> - {dish.calories} kcal, {dish.carbs}g carbs, {dish.fat}g fat, {dish.protein}g protein
          //  
          ))
        ) : (
          <p className="text-gray-500">No matching dishes found.</p>
        )}
      {/* </ul> */}
    </div>

      {/* <span className="mx-12 text-gray-700">Total menu items 40</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          key={0}
          className="rounded-2xl p-4 shadow-2xl shadow-violet-500/30 m-8 opacity-100"
        >
          <Link href="/dishes/cakes/large">
            <Image
              src="http://res.cloudinary.com/dkv7cimyy/image/upload/v1704207154/Zomato%202.0/dishes/cakes/LargeCakes/3.jpg"
              alt="Large Cakes"
              width={400}
              height={400}
              className="w-full h-36 object-cover mb-2"
            />
            <h2 className="text-xl text-violet-700 font-semibold mb-2">
              Large Cakes
            </h2>
          </Link>
          <p className="text-gray-600">Cakes for bigger parties</p>
          <p className="text-gray-600">$17.99 onwards</p>
          <div className="mt-2 flex justify-between items-center"></div>
        </div>

        

        <div
          key={1}
          className=" rounded-xl p-4 shadow-2xl shadow-violet-500/30 m-8 opacity-100"
        >
          <Link href="/dishes/cakes/small">
            <Image
              src="http://res.cloudinary.com/dkv7cimyy/image/upload/v1704206617/Zomato%202.0/dishes/cakes/SmallCakes/1.jpg"
              alt="Small sized cakes"
              className="w-full h-36 object-cover mb-2"
              width={400}
              height={400}
            />
            <h2 className="text-xl text-violet-700 font-semibold mb-2">
              Small Cakes
            </h2>
          </Link>
          <p className="text-gray-600">Cakes for small gatherings</p>
          <p className="text-gray-600">$3.99 onwards</p>
          <div className="mt-2 flex justify-between items-center"></div>
        </div>

        

        <div
          key={2}
          className=" rounded-xl p-4 shadow-2xl shadow-violet-500/30 m-8 opacity-100"
        >
          <Link href="/dishes/pastries">
            <Image
              src="http://res.cloudinary.com/dkv7cimyy/image/upload/v1704206412/Zomato%202.0/dishes/pastries/6.jpg"
              alt="Pastries"
              className="w-full h-36 object-cover mb-2"
              width={400}
              height={400}
            />
            <h2 className="text-xl text-violet-700 font-semibold mb-2">
              Pastries
            </h2>
          </Link>
          <p className="text-gray-600">Pastries for everyone</p>
          <p className="text-gray-600">$3.99 onwards</p>
          <div className="mt-2 flex justify-between items-center"></div>
        </div>

         //Desserts 

        <div
          key={3}
          className=" rounded-xl p-4 shadow-2xl shadow-violet-500/30 m-8 opacity-100"
        >
          <Link href="/dishes/desserts">
            <Image
              src="http://res.cloudinary.com/dkv7cimyy/image/upload/v1704205907/Zomato%202.0/dishes/desserts/4.jpg"
              alt="Desserts"
              className="w-full h-36 object-cover mb-2"
              width={400}
              height={400}
            />
            <h2 className="text-xl text-violet-700 font-semibold mb-2">
              Desserts
            </h2>
          </Link>
          <p className="text-gray-600">Desserts of all types</p>
          <p className="text-gray-600">$4.99 onwards</p>
          <div className="mt-2 flex justify-between items-center"></div>
        </div>
      </div> */}

      {/* <div className="p-4 bg-white shadow-md rounded-lg">
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
      </button> */}
    {/* </div> */}
    </div>
  );
}

export default MenuPage;
