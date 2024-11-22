import React from 'react';
import { useTranslation } from 'react-i18next';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';

export default function UserHeader() {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm fixed w-full z-10">
      <div className="h-16 flex items-center justify-between px-4">
        <div className="flex items-center">
          <span className="text-xl font-bold text-accent">
            Les Aiglons de Coureau
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <BellIcon className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <UserCircleIcon className="h-8 w-8" />
            <span className="text-sm font-medium">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
}