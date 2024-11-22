import React from 'react';
import { useQuery } from 'react-query';
import { fetchUserNotifications } from '../../lib/api/user';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function UserNotifications() {
  const { user } = useAuth();
  const { data: notifications } = useQuery(
    ['userNotifications', user?.id],
    () => fetchUserNotifications(user!.id)
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Notifications</h2>
      </div>
      <div className="divide-y">
        {notifications?.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 ${!notification.read ? 'bg-accent/5' : ''}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
              <span className="text-xs text-gray-500">
                {format(notification.createdAt, 'dd MMM yyyy HH:mm', { locale: fr })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}