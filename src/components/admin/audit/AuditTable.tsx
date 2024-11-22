import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AuditLog } from '../../../types/audit';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '../../ui/Button';

interface AuditTableProps {
  logs: AuditLog[];
  isLoading: boolean;
  onExport?: () => void;
}

export default function AuditTable({ logs, isLoading, onExport }: AuditTableProps) {
  if (isLoading) {
    return <div className="p-4">Chargement...</div>;
  }

  return (
    <div>
      {onExport && (
        <div className="p-4 flex justify-end">
          <Button variant="outline" onClick={onExport}>
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Exporter les logs
          </Button>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Détails
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(log.timestamp, 'dd/MM/yyyy HH:mm:ss', { locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {log.userId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    log.action === 'create' ? 'bg-green-100 text-green-800' :
                    log.action === 'update' ? 'bg-blue-100 text-blue-800' :
                    log.action === 'delete' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.entityType}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.ipAddress}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}