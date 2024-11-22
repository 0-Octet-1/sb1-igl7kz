import React, { useState } from 'react';
import { useQuery } from 'react-query';
import AdminLayout from '../../../components/admin/AdminLayout';
import ContentTable from '../../../components/admin/content/ContentTable';
import ContentFilters from '../../../components/admin/content/ContentFilters';
import { Button } from '../../../components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { fetchContent } from '../../../lib/api/content';
import { Content, ContentFilter } from '../../../types/content';
import { useNavigate } from 'react-router-dom';

export default function ContentList() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ContentFilter>({});

  const { data: content, isLoading } = useQuery<Content[]>(
    ['content', filters],
    () => fetchContent(filters)
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion du Contenu</h1>
          <Button 
            variant="accent" 
            onClick={() => navigate('/admin/content/new')}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nouveau Contenu
          </Button>
        </div>

        <ContentFilters filters={filters} onFilterChange={setFilters} />
        
        <div className="mt-6">
          <ContentTable content={content || []} isLoading={isLoading} />
        </div>
      </div>
    </AdminLayout>
  );
}