import React from 'react';
import { Progress } from '../../ui/Progress';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '../../ui/Button';

interface PopularCourse {
  id: string;
  title: string;
  enrollments: number;
  completionRate: number;
  averageRating: number;
}

interface PopularCoursesTableProps {
  courses: PopularCourse[];
}

export default function PopularCoursesTable({ courses }: PopularCoursesTableProps) {
  const handleExport = () => {
    // TODO: Implement export functionality
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Formations Populaires</h3>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Formation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inscrits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Taux de Complétion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Note Moyenne
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {course.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.enrollments}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full max-w-xs">
                    <Progress value={course.completionRate} />
                    <span className="text-sm text-gray-500">
                      {course.completionRate}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.averageRating.toFixed(1)} / 5
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}