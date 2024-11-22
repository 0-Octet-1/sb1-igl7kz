import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Content } from '../../../types/content';
import { EyeIcon, PencilIcon, TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

interface ContentTableProps {
  content: Content[];
  isLoading: boolean;
}

export default function ContentTable({ content, isLoading }: ContentTableProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Titre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Auteur
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
          {content.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                <div className="text-sm text-gray-500">{item.excerpt}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  item.status === 'published' ? 'bg-green-100 text-green-800' :
                  item.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.author}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(item.updatedAt, 'dd MMM yyyy HH:mm', { locale: fr })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(`/preview/${item.slug}`, '_blank')}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/admin/content/edit/${item.id}`)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ArrowDownTrayIcon className="h-4 w-4" />
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