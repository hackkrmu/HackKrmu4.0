import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-primary-50 to-white pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2">
          <img
            src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1000&q=80"
            alt="Mother cooking"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-sm font-semibold uppercase tracking-wide text-primary-600">
                Connecting Hearts Through Food
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-gray-900">Homemade Food</span>
                <span className="block text-primary-600">For Every Student</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Experience the warmth of home-cooked meals prepared by caring mothers. 
              We connect students with local home chefs to bring you nutritious, 
              delicious meals that remind you of home.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
              <div className="grid grid-cols-2 gap-4">
                <Link to="/menu" 
                  className="block w-full rounded-md px-4 py-3 font-medium text-white shadow 
                    bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 
                    hover:to-primary-600 text-center transform transition hover:scale-105">
                  Browse Menu
                </Link>
                <Link to="/auth" 
                  className="block w-full rounded-md px-4 py-3 font-medium text-primary-600 
                    shadow-sm ring-2 ring-primary-600 hover:bg-primary-50 text-center 
                    transform transition hover:scale-105">
                  Join Us
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Already serving 1000+ students with love and care
              </p>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <img
                className="w-full rounded-lg"
                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80"
                alt="Home cooked meal"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonial Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-8">
              <blockquote className="text-lg text-gray-600 italic">
                "As a mother, I'm happy to share my cooking with students who miss home food. 
                It's not just about earning, it's about spreading love through food."
                <footer className="mt-4">
                  <p className="text-base font-semibold text-primary-600">Mrs. Sharma</p>
                  <p className="text-sm text-gray-500">Home Chef, serving 20+ students daily</p>
                </footer>
              </blockquote>
            </div>
            <div className="p-8 bg-primary-50">
              <blockquote className="text-lg text-gray-600 italic">
                "The food reminds me of home. It's healthy, delicious, and made with so much care. 
                Thank you HomeMeal Connect!"
                <footer className="mt-4">
                  <p className="text-base font-semibold text-primary-600">Rahul Kumar</p>
                  <p className="text-sm text-gray-500">Engineering Student</p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;