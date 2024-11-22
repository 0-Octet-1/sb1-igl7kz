import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

export default function AdminHeader() {
  return (
    <header className="bg-white shadow-sm fixed w-full z-10">
      <div className="h-16 flex items-center justify-between px-4">
        <div className="flex items-center">
          <span className="text-xl font-bold text-accent">
            Administration - Les Aiglons de Coureau
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <BellIcon className="h-6 w-6 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2">
            <img
              src="/admin-avatar.jpg"
              alt="Admin"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}