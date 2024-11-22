import React, { useState } from 'react';
import { useQuery } from 'react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import UserTable from '../../components/admin/users/UserTable';
import UserFilters from '../../components/admin/users/UserFilters';
import { Button } from '../../components/ui/Button';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { fetchUsers } from '../../lib/api/users';
import { UserManagement } from '../../types/admin';

export default function Users() {
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    search: ''
  });

  const { data: users, isLoading } = useQuery<UserManagement[]>(
    ['users', filters],
    () => fetchUsers(filters)
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
          <Button variant="accent">
            <UserPlusIcon className="h-5 w-5 mr-2" />
            Nouvel Utilisateur
          </Button>
        </div>

        <UserFilters filters={filters} onFilterChange={setFilters} />
        
        <div className="mt-6">
          <UserTable users={users || []} isLoading={isLoading} />
        </div>
      </div>
    </AdminLayout>
  );
}