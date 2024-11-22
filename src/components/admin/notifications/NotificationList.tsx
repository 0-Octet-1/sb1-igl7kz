import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Notification } from '../../../types/notification';
import { Link } from 'react-router-dom';

interface NotificationListProps {
  notifications: Notification[];
}

export default function NotificationList({ notifications }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Aucune notification
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100 max-h-96 overflow-auto">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 hover:bg-gray-50 ${
            !notification.read ? 'bg-blue-50' : ''
          }`}
        >
          <div className="flex items-start">
            <div className="flex-1">
              <p className="font-medium text-sm">{notification.title}</p>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <p className="text-xs text-gray-400 mt-1">
                {format(notification.createdAt, 'dd MMM yyyy HH:mm', { locale: fr })}
              </p>
            </div>
            {notification.link && (
              <Link
                to={notification.link}
                className="text-accent hover:text-accent-hover text-sm"
              >
                Voir
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}