import React from 'react';
import { CourseManagement } from '../../../types/admin';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { EllipsisVerticalIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../../ui/Button';

interface CourseTableProps {
  courses: CourseManagement[];
  isLoading: boolean;
}

export default function CourseTable({ courses, isLoading }: CourseTableProps) {
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Formation
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Créé par
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dernière modification
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{course.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  course.status === 'published' ? 'bg-green-100 text-green-800' :
                  course.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {course.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {course.createdBy}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(course.lastModified, 'dd MMM yyyy HH:mm', { locale: fr })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="sm">
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}