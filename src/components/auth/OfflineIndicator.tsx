import React from 'react';
import { SignalSlashIcon } from '@heroicons/react/24/outline';

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-warning/90 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
      <SignalSlashIcon className="h-5 w-5" />
      <span>Mode hors ligne</span>
    </div>
  );
}