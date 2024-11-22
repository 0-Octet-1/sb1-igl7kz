import React from 'react';
import { Button } from '../../ui/Button';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface ContentFiltersProps {
  filters: {
    type?: string;
    status?: string;
    search?: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function ContentFilters({ filters, onFilterChange }: ContentFiltersProps) {
  const handleExport = () => {
    // TODO: Implement export functionality
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filtres</h2>
        <Button variant="outline" onClick={handleExport}>
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Exporter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type de contenu
          </label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
          >
            <option value="">Tous les types</option>
            <option value="article">Article</option>
            <option value="guide">Guide</option>
            <option value="faq">FAQ</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Statut
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
          >
            <option value="">Tous les statuts</option>
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rechercher
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Titre, contenu..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => onFilterChange({ type: '', status: '', search: '' })}
        >
          Réinitialiser
        </Button>
        <Button variant="accent">
          Appliquer
        </Button>
      </div>
    </div>
  );
}