import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileHeader() {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="h-20 w-20 rounded-full"
            src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`}
            alt={user?.displayName}
          />
        </div>
        <div className="ml-6">
          <h2 className="text-2xl font-bold text-gray-900">{user?.displayName}</h2>
          <p className="text-sm text-gray-500">Membre depuis {user?.createdAt.toLocaleDateString()}</p>
          {user?.bio && (
            <p className="mt-2 text-gray-600">{user.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}