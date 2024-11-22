import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import StatsCard from '../../components/admin/StatsCard';
import { UserIcon, BookOpenIcon, DocumentTextIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { 
      title: 'Utilisateurs Total', 
      value: '245', 
      icon: UserIcon,
      change: '+12%',
      onClick: () => navigate('/admin/users')
    },
    { 
      title: 'Formations Actives', 
      value: '12', 
      icon: BookOpenIcon,
      change: '+2',
      onClick: () => navigate('/admin/courses')
    },
    { 
      title: 'Articles Blog', 
      value: '48', 
      icon: DocumentTextIcon,
      change: '+5',
      onClick: () => navigate('/admin/blog')
    },
    { 
      title: 'Élèves Actifs', 
      value: '156', 
      icon: UserGroupIcon,
      change: '+8%',
      onClick: () => navigate('/admin/students')
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Tableau de Bord</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Activité Récente</h2>
            {/* Activity list will be added here */}
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Tâches en Attente</h2>
            {/* Tasks list will be added here */}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}