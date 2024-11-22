import React from 'react';
import { useQuery } from 'react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import StatsOverview from '../../components/admin/stats/StatsOverview';
import UserActivityChart from '../../components/admin/stats/UserActivityChart';
import CourseProgressChart from '../../components/admin/stats/CourseProgressChart';
import PopularCoursesTable from '../../components/admin/stats/PopularCoursesTable';
import { fetchStats } from '../../lib/api/stats';

export default function Stats() {
  const { data: stats, isLoading } = useQuery('stats', fetchStats);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Statistiques et Analyses</h1>

        <StatsOverview stats={stats?.overview} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Activité Utilisateurs</h2>
            <UserActivityChart data={stats?.userActivity} />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Progression des Formations</h2>
            <CourseProgressChart data={stats?.courseProgress} />
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Formations Populaires</h2>
            <PopularCoursesTable courses={stats?.popularCourses} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}