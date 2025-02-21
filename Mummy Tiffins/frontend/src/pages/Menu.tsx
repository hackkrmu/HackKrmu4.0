import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  type: 'veg' | 'non-veg';
  image: string;
  rating: number;
  cook: string;
  ingredients?: string[];
}

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [priceRange, setPriceRange] = useState<number>(200);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Homestyle Thali",
      description: "Complete meal with dal, rice, 3 rotis, 2 sabzi, raita, and pickle",
      price: 120,
      type: "veg",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80",
      rating: 4.5,
      cook: "Mrs. Sharma",
      ingredients: ["Rice", "Dal", "Seasonal Vegetables", "Wheat Flour", "Curd"]
    },
    {
      id: 2,
      name: "Butter Chicken with Naan",
      description: "Creamy butter chicken with 2 butter naan",
      price: 160,
      type: "non-veg",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      cook: "Mrs. Khan",
      ingredients: ["Chicken", "Cream", "Butter", "Spices", "Wheat Flour"]
    },
    {
      id: 3,
      name: "South Indian Platter",
      description: "4 idlis, 1 masala dosa, sambar, and coconut chutney",
      price: 100,
      type: "veg",
      image: "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=300&q=80",
      rating: 4.6,
      cook: "Mrs. Iyer",
      ingredients: ["Rice", "Urad Dal", "Coconut", "Lentils", "Spices"]
    },
    {
      id: 4,
      name: "Rajma Chawal",
      description: "Punjabi style rajma with jeera rice and salad",
      price: 90,
      type: "veg",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=300&q=80",
      rating: 4.7,
      cook: "Mrs. Kaur",
      ingredients: ["Kidney Beans", "Rice", "Onions", "Tomatoes", "Spices"]
    },
    {
      id: 5,
      name: "Fish Curry Meal",
      description: "Bengali style fish curry with rice and aloo bhaja",
      price: 150,
      type: "non-veg",
      image: "https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      cook: "Mrs. Sen",
      ingredients: ["Fish", "Rice", "Mustard Oil", "Potatoes", "Spices"]
    },
    {
      id: 6,
      name: "Gujarati Thali",
      description: "Dal, kadhi, 3 sabzi, rotis, rice, and khichdi",
      price: 130,
      type: "veg",
      image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?auto=format&fit=crop&w=300&q=80",
      rating: 4.7,
      cook: "Mrs. Patel",
      ingredients: ["Rice", "Dal", "Vegetables", "Buttermilk", "Wheat Flour"]
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesPrice = item.price <= priceRange;
    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900">Today's Menu</h1>
        
        {/* Search and Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search meals..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <select
              className="border rounded-lg px-4 py-2"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'veg' | 'non-veg')}
            >
              <option value="all">All</option>
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
            </select>
            
            <div className="flex items-center gap-2">
              <span>Max ₹{priceRange}</span>
              <input
                type="range"
                min="50"
                max="200"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-32"
              />
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">by {item.cook}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    item.type === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Ingredients: {item.ingredients?.join(', ')}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">₹{item.price}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{item.rating}</span>
                  </div>
                </div>
                <button className="mt-4 w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu