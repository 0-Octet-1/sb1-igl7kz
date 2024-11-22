import React from 'react';
import { useQuery } from 'react-query';
import UserLayout from '../../components/user/UserLayout';
import UserStats from '../../components/user/UserStats';
import CourseList from '../../components/user/CourseList';
import NextLesson from '../../components/user/NextLesson';
import { fetchUserDashboard } from '../../lib/api/user';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery(
    ['userDashboard', user?.id],
    () => fetchUserDashboard(user!.id),
    {
      enabled: !!user?.id,
      onError: () => {
        toast.error('Erreur lors du chargement du tableau de bord');
      }
    }
  );

  return (
    <UserLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Mon Tableau de Bord</h1>

        <UserStats stats={data?.stats} isLoading={isLoading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <CourseList courses={data?.courses || []} isLoading={isLoading} />
          </div>

          <div className="space-y-6">
            {data?.nextLesson && (
              <NextLesson lesson={data.nextLesson} />
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}