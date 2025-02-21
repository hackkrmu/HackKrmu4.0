import React from 'react';
import { Link } from 'react-router-dom';
import { CookingPot } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <CookingPot className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-lg font-bold text-gray-800">Mummy's tiffin</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-800 px-3 py-2">Home</Link>
            <Link to="/menu" className="text-gray-600 hover:text-gray-800 px-3 py-2">Menu</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-800 px-3 py-2">Dashboard</Link>
            <Link to="/auth" className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar