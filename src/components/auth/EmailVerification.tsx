import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { sendVerificationEmail } from '../../lib/auth';
import { Button } from '../ui/Button';

export default function EmailVerification() {
  const { user } = useAuth();
  const [sending, setSending] = React.useState(false);

  const handleResend = async () => {
    setSending(true);
    try {
      await sendVerificationEmail();
    } catch (error) {
      console.error('Error sending verification email:', error);
    } finally {
      setSending(false);
    }
  };

  if (!user || user.emailVerified) return null;

  return (
    <div className="bg-warning/10 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-warning">
            Email non vérifié
          </h3>
          <p className="text-sm text-warning/80">
            Veuillez vérifier votre email pour accéder à toutes les fonctionnalités
          </p>
        </div>
        <Button
          variant="warning"
          onClick={handleResend}
          disabled={sending}
        >
          {sending ? 'Envoi...' : 'Renvoyer'}
        </Button>
      </div>
    </div>
  );
}