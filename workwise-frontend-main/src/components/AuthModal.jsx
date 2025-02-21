import React, { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";

export function AuthModal({ isOpen, onClose  }) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Request Demo for Meeting
          </h2>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
         
              <InputField id="name" type="text" icon={User} label="Full Name" placeholder="John Doe" />
         
            <InputField id="email" type="email" icon={Mail} label="Email Address" placeholder="you@example.com" />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Request Demo
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

const InputField = ({ id, type, icon: Icon, label, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <Icon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        type={type}
        id={id}
        className="pl-10 w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 py-2"
        placeholder={placeholder}
      />
    </div>
  </div>
);