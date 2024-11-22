import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { exportProgress } from '../../lib/api/progress';
import { Button } from '../ui/Button';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

export default function ProgressExport() {
  const { user } = useAuth();
  const [exporting, setExporting] = React.useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const csvData = await exportProgress(user!.id);
      
      // Créer et télécharger le fichier CSV
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `progress_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Export réussi !');
    } catch (error) {
      toast.error('Erreur lors de l\'export');
    } finally {
      setExporting(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleExport}
      disabled={exporting}
    >
      <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
      {exporting ? 'Export...' : 'Exporter mes progrès'}
    </Button>
  );
}