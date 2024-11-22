import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  change: string;
  onClick?: () => void;
}

export default function StatsCard({ title, value, icon: Icon, change, onClick }: StatsCardProps) {
  const isPositive = change.startsWith('+');

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-8 w-8 text-accent" />
        <span className={`text-sm font-medium flex items-center ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          {change}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
}