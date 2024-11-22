import React from 'react';
import { Button } from '../../ui/Button';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface StatsExportProps {
  onExport: () => void;
  isLoading?: boolean;
}

export default function StatsExport({ onExport, isLoading = false }: StatsExportProps) {
  return (
    <Button
      variant="outline"
      onClick={onExport}
      disabled={isLoading}
    >
      <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
      {isLoading ? 'Export...' : 'Exporter les statistiques'}
    </Button>
  );
}