import React, { useState } from 'react';
import { CookingPot, ShoppingBag, Star, Settings } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const tabs = [
    { id: 'orders', name: 'Orders', icon: ShoppingBag },
    { id: 'menu', name: 'My Menu', icon: CookingPot },
    { id: 'reviews', name: 'Reviews', icon: Star },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              + Add New Item
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Total Orders', value: '156', change: '+12%' },
              { name: 'Active Menu Items', value: '8', change: '+2' },
              { name: 'Average Rating', value: '4.8', change: '+0.2' },
              { name: 'Revenue', value: '₹12,450', change: '+18%' },
            ].map((stat) => (
              <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
                  <dd className="mt-2 text-sm text-green-600">{stat.change} from last month</dd>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        ${activeTab === tab.id
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }
                        flex items-center px-1 py-4 border-b-2 font-medium text-sm
                      `}
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="mt-8">
              {activeTab === 'orders' && (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {[
                      { id: 1, customer: 'John Doe', items: 'Thali', status: 'Preparing', time: '10:30 AM' },
                      { id: 2, customer: 'Jane Smith', items: 'Biryani', status: 'Delivered', time: '11:00 AM' },
                    ].map((order) => (
                      <li key={order.id}>
                        <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                          <div className="flex items-center">
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                              <p className="text-sm text-gray-500">{order.items}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className={`px-2 py-1 text-sm rounded-full ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                            <span className="ml-4 text-sm text-gray-500">{order.time}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;