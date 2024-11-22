import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '../../ui/Button';

interface StatsOverviewProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    completionRate: number;
    averageProgress: number;
    userGrowth: number;
    courseCompletions: number;
  };
  onExport?: () => void;
}

export default function StatsOverview({ stats, onExport }: StatsOverviewProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Vue d'ensemble</h2>
        {onExport && (
          <Button variant="outline" onClick={onExport}>
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Exporter
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Utilisateurs Actifs</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stats.activeUsers}</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <ArrowUpIcon className="h-4 w-4 flex-shrink-0" />
              <span>{stats.userGrowth}%</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Taux de Complétion</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stats.completionRate}%</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <ArrowUpIcon className="h-4 w-4 flex-shrink-0" />
              <span>+2.1%</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Progression Moyenne</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stats.averageProgress}%</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              <ArrowUpIcon className="h-4 w-4 flex-shrink-0" />
              <span>+5.4%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}