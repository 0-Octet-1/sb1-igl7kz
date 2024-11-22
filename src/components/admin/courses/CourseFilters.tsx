import React from 'react';
import { Button } from '../../ui/Button';

interface CourseFiltersProps {
  filters: {
    status: string;
    search: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function CourseFilters({ filters, onFilterChange }: CourseFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Rechercher
          </label>
          <input
            type="text"
            id="search"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
            placeholder="Titre de la formation..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Statut
          </label>
          <select
            id="status"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          >
            <option value="">Tous les statuts</option>
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => onFilterChange({ status: '', search: '' })}
        >
          Réinitialiser
        </Button>
        <Button variant="accent">
          Appliquer les filtres
        </Button>
      </div>
    </div>
  );
}