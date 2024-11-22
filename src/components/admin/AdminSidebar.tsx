import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  DocumentTextIcon,
  CogIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Tableau de bord', href: '/admin', icon: HomeIcon },
  { name: 'Utilisateurs', href: '/admin/users', icon: UsersIcon },
  { name: 'Formations', href: '/admin/courses', icon: BookOpenIcon },
  { name: 'Contenu', href: '/admin/content', icon: DocumentTextIcon },
  { name: 'Statistiques', href: '/admin/stats', icon: ChartBarIcon },
  { name: 'Paramètres', href: '/admin/settings', icon: CogIcon },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 w-64 h-screen bg-white shadow-sm pt-16">
      <nav className="mt-6">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'text-accent bg-accent/10'
                  : 'text-gray-600 hover:text-accent hover:bg-accent/5'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}