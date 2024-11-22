import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { extendSession } from '../../lib/auth';
import { toast } from 'react-hot-toast';

const WARNING_TIME = 5 * 60 * 1000; // 5 minutes avant expiration

export default function SessionTimeout() {
  const { user } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!user?.sessionExpires) return;

    const sessionExpires = new Date(user.sessionExpires).getTime();
    const warningTime = sessionExpires - WARNING_TIME;

    const checkSession = () => {
      const now = Date.now();
      if (now >= warningTime && now < sessionExpires) {
        setShowWarning(true);
        setTimeLeft(Math.round((sessionExpires - now) / 1000));
      }
    };

    const timer = setInterval(checkSession, 1000);
    return () => clearInterval(timer);
  }, [user]);

  const handleExtendSession = async () => {
    try {
      await extendSession(user!.id);
      setShowWarning(false);
      toast.success('Session prolongée');
    } catch (error) {
      toast.error('Erreur lors de la prolongation de la session');
    }
  };

  if (!showWarning) return null;

  return (
    <Dialog
      open={showWarning}
      onClose={() => {}}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6">
          <Dialog.Title className="text-lg font-medium mb-4">
            Session sur le point d'expirer
          </Dialog.Title>

          <p className="mb-4">
            Votre session expirera dans {timeLeft} secondes. Souhaitez-vous la prolonger ?
          </p>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowWarning(false)}
            >
              Ignorer
            </Button>
            <Button
              variant="accent"
              onClick={handleExtendSession}
            >
              Prolonger la session
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}