import React from 'react';
import { AcademicCapIcon, ClockIcon, TrophyIcon } from '@heroicons/react/24/outline';

interface UserStatsProps {
  stats?: {
    totalCourses: number;
    totalHours: number;
    achievements: number;
  };
  isLoading?: boolean;
}

export default function UserStats({ stats, isLoading = false }: UserStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white shadow rounded-lg p-6 animate-pulse">
            <div className="h-8 w-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 w-12 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const defaultStats = {
    totalCourses: 0,
    totalHours: 0,
    achievements: 0
  };

  const currentStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <AcademicCapIcon className="h-8 w-8 text-accent" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Formations suivies</p>
            <p className="text-2xl font-semibold">{currentStats.totalCourses}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <ClockIcon className="h-8 w-8 text-accent" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Heures de formation</p>
            <p className="text-2xl font-semibold">{currentStats.totalHours}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center">
          <TrophyIcon className="h-8 w-8 text-accent" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Réalisations</p>
            <p className="text-2xl font-semibold">{currentStats.achievements}</p>
          </div>
        </div>
      </div>
    </div>
  );
}