import React, { useState } from 'react';
import { useQuery } from 'react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import AuditFilters from '../../components/admin/audit/AuditFilters';
import AuditTable from '../../components/admin/audit/AuditTable';
import AuditStats from '../../components/admin/audit/AuditStats';
import { fetchAuditLogs, fetchAuditStats } from '../../lib/api/audit';
import { AuditFilter } from '../../types/audit';
import { Button } from '../../components/ui/Button';
import { DownloadIcon } from '@heroicons/react/24/outline';

export default function Audit() {
  const [filters, setFilters] = useState<AuditFilter>({});

  const { data: logs, isLoading } = useQuery(
    ['auditLogs', filters],
    () => fetchAuditLogs(filters)
  );

  const { data: stats } = useQuery('auditStats', fetchAuditStats);

  const handleExport = async () => {
    // Logique d'export à implémenter
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Journal d'Audit</h1>
          <Button variant="outline" onClick={handleExport}>
            <DownloadIcon className="h-5 w-5 mr-2" />
            Exporter
          </Button>
        </div>

        <AuditStats stats={stats} className="mb-6" />
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <AuditFilters filters={filters} onFilterChange={setFilters} />
          </div>
          
          <AuditTable logs={logs || []} isLoading={isLoading} />
        </div>
      </div>
    </AdminLayout>
  );
}