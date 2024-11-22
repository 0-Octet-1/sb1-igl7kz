import React from 'react';
import { AuditStats as AuditStatsType } from '../../../types/audit';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface AuditStatsProps {
  stats?: AuditStatsType;
  className?: string;
}

export default function AuditStats({ stats, className = '' }: AuditStatsProps) {
  if (!stats) return null;

  const actionChartData = {
    labels: Object.keys(stats.actionsByType),
    datasets: [
      {
        data: Object.values(stats.actionsByType),
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Actions par Type</h3>
        <div className="h-64">
          <Pie data={actionChartData} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Statistiques Générales</h3>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Total des actions</dt>
            <dd className="text-3xl font-semibold">{stats.totalActions}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Utilisateurs actifs</dt>
            <dd className="text-3xl font-semibold">
              {Object.keys(stats.actionsByUser).length}
            </dd>
          </div>
        </dl>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Activité Récente</h3>
        <div className="space-y-4">
          {stats.recentActivity.map((log) => (
            <div key={log.id} className="flex items-center space-x-3">
              <div className="flex-1">
                <p className="text-sm font-medium">{log.action}</p>
                <p className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}