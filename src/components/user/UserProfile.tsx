import React from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import { fetchUserProfile } from '../../lib/api/user';
import UserStats from './UserStats';
import CourseProgress from './CourseProgress';
import Achievements from './Achievements';

export default function UserProfile() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useQuery(
    ['userProfile', user?.id],
    () => fetchUserProfile(user!.id)
  );

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* En-tête du profil */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <img
            src={profile?.photoURL || `https://ui-avatars.com/api/?name=${profile?.displayName}`}
            alt={profile?.displayName}
            className="h-20 w-20 rounded-full"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-bold">{profile?.displayName}</h2>
            <p className="text-gray-600">{profile?.bio}</p>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <UserStats stats={profile?.stats} />

      {/* Progression des cours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CourseProgress courses={profile?.courses} />
        <Achievements achievements={profile?.achievements} />
      </div>
    </div>
  );
}