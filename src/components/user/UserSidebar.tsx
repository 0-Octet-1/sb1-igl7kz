import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  HomeIcon,
  AcademicCapIcon,
  BookmarkIcon,
  CogIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'courses', href: '/courses', icon: AcademicCapIcon },
  { name: 'bookmarks', href: '/bookmarks', icon: BookmarkIcon },
  { name: 'messages', href: '/messages', icon: ChatBubbleLeftIcon },
  { name: 'settings', href: '/settings', icon: CogIcon },
];

export default function UserSidebar() {
  const { t } = useTranslation();

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
            {t(`nav.${item.name}`)}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}