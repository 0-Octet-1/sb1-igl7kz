import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useQuery } from 'react-query';
import { fetchNotifications } from '../../../lib/api/notifications';
import NotificationList from './NotificationList';
import { Button } from '../../ui/Button';

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: notifications } = useQuery('adminNotifications', fetchNotifications);

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <NotificationList notifications={notifications || []} />
        </div>
      )}
    </div>
  );
}