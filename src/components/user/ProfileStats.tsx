import React from 'react';
import { AcademicCapIcon, ClockIcon, TrophyIcon } from '@heroicons/react/24/outline';

interface ProfileStatsProps {
  stats: {
    coursesCompleted: number;
    totalHours: number;
    achievements: number;
  };
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <AcademicCapIcon className="h-8 w-8 text-accent" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Formations Complétées</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.coursesCompleted}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <ClockIcon className="h-8 w-8 text-accent" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Heures d'Apprentissage</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalHours}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <TrophyIcon className="h-8 w-8 text-accent" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Réalisations</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.achievements}</p>
          </div>
        </div>
      </div>
    </div>
  );
}