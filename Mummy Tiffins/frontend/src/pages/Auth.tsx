import React, { useState } from 'react';
import { CookingPot, User, GraduationCap } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'mother' | 'dayscholar' | 'hostelite'>('hostelite');

  return (
    <div className="min-h-screen pt-16 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!isLogin && (
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700">I am a:</label>
              <div className="mt-2 grid grid-cols-3 gap-3">
                <button
                  onClick={() => setUserType('mother')}
                  className={`flex flex-col items-center justify-center p-3 border rounded-lg ${
                    userType === 'mother' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                  }`}
                >
                  <CookingPot className="h-6 w-6 text-orange-500" />
                  <span className="mt-2 text-sm">Mother</span>
                </button>
                <button
                  onClick={() => setUserType('dayscholar')}
                  className={`flex flex-col items-center justify-center p-3 border rounded-lg ${
                    userType === 'dayscholar' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                  }`}
                >
                  <User className="h-6 w-6 text-orange-500" />
                  <span className="mt-2 text-sm">Day Scholar</span>
                </button>
                <button
                  onClick={() => setUserType('hostelite')}
                  className={`flex flex-col items-center justify-center p-3 border rounded-lg ${
                    userType === 'hostelite' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                  }`}
                >
                  <GraduationCap className="h-6 w-6 text-orange-500" />
                  <span className="mt-2 text-sm">Hostelite</span>
                </button>
              </div>
            </div>
          )}

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-orange-600 hover:text-orange-500"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;