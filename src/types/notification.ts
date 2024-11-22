export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
}

export interface NotificationPreferences {
  newUsers: boolean;
  courseUpdates: boolean;
  systemAlerts: boolean;
  emailNotifications: boolean;
}