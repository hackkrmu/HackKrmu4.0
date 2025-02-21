import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, AlertCircle } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  type: 'veg' | 'non-veg';
  image: string;
  ingredients: string[];
  availableQuantity: number;
}

const MothersDashboard = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: 1,
      name: "Homestyle Thali",
      description: "Complete meal with dal, rice, 3 rotis, 2 sabzi, raita, and pickle",
      price: 120,
      type: "veg",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80",
      ingredients: ["Rice", "Dal", "Seasonal Vegetables", "Wheat Flour", "Curd"],
      availableQuantity: 10
    }
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItem, setNewItem] = useState<Partial<FoodItem>>({
    type: 'veg',
    ingredients: []
  });

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.description) {
      setFoodItems([...foodItems, {
        id: Date.now(),
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
        type: newItem.type as 'veg' | 'non-veg',
        image: newItem.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80',
        ingredients: newItem.ingredients || [],
        availableQuantity: newItem.availableQuantity || 0
      }]);
      setIsAddingNew(false);
      setNewItem({ type: 'veg', ingredients: [] });
    }
  };

  const handleDeleteItem = (id: number) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Food Items</h1>
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
          >
            <PlusCircle className="h-5 w-5" />
            Add New Item
          </button>
        </div>

        {isAddingNew && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Food Item</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  value={newItem.price || ''}
                  onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newItem.description || ''}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'veg' | 'non-veg' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">Non-Vegetarian</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Available Quantity</label>
                <input
                  type="number"
                  value={newItem.availableQuantity || ''}
                  onChange={(e) => setNewItem({ ...newItem, availableQuantity: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={newItem.image || ''}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Add Item
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6">
          {foodItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 flex items-start gap-6">
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <span className={`inline-block px-2 py-1 rounded text-sm ${
                        item.type === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:text-primary-500">
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 text-gray-600 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                  <div className="mt-4 flex items-center gap-6">
                    <span className="text-lg font-bold">₹{item.price}</span>
                    <span className="text-sm text-gray-500">
                      Available: {item.availableQuantity} tiffins
                    </span>
                  </div>
                  {item.availableQuantity < 5 && (
                    <div className="mt-4 flex items-center gap-2 text-amber-600">
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-sm">Low quantity alert</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MothersDashboard