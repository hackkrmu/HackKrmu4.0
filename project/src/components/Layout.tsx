import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UserCircle, LogOut, Briefcase } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', href: '/profile', icon: UserCircle },
  ];

  const handleLogout = async () => {
  try {
    await signOut();
    toast.success('Logged out successfully');
    navigate('/login');
  } catch (error) {
    toast.error('Failed to log out');
    console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          <img src="./src/components/logo-removebg-preview.png" alt="" />
        </div>
        <nav className="mt-6 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
          to={item.href}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            isActive
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <item.icon
                className={`mr-3 h-5 w-5 ${
                  isActive ? 'text-indigo-600' : 'text-gray-400'
                }`}
              />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md w-full"
        onClick={handleLogout}
      >
        <LogOut className="mr-3 h-5 w-5 text-gray-400" />
        Logout
      </button>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
      </div>
    </div>
  );
}