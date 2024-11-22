import React from 'react';
import { useQuery } from 'react-query';
import { fetchCourses } from '../../../lib/api/courses';
import AdminLayout from '../../../components/admin/AdminLayout';
import CourseTable from '../../../components/admin/courses/CourseTable';
import CourseFilters from '../../../components/admin/courses/CourseFilters';
import { Button } from '../../../components/ui/Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function CourseList() {
  const navigate = useNavigate();
  const { data: courses, isLoading } = useQuery('courses', fetchCourses);
  const [filters, setFilters] = React.useState({
    status: '',
    search: ''
  });

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion des Formations</h1>
          <Button 
            variant="accent" 
            onClick={() => navigate('/admin/courses/new')}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nouvelle Formation
          </Button>
        </div>

        <CourseFilters filters={filters} onFilterChange={setFilters} />
        
        <div className="mt-6">
          <CourseTable courses={courses || []} isLoading={isLoading} />
        </div>
      </div>
    </AdminLayout>
  );
}