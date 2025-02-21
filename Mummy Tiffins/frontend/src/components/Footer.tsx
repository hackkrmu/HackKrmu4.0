import { CookingPot } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <CookingPot className="h-8 w-8 text-primary-500" />
            <span className="ml-2 text-xl font-bold text-white">Mummy's Tiffin</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white">About</a>
            <a href="#" className="text-gray-300 hover:text-white">Contact</a>
            <a href="#" className="text-gray-300 hover:text-white">Terms</a>
            <a href="#" className="text-gray-300 hover:text-white">Privacy</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">&copy; 2024 Mummy's Tiffin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer