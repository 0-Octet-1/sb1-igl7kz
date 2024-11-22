import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { enableMFA } from '../../lib/security/mfa';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';

export default function MFASetup() {
  const { user } = useAuth();
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showCodes, setShowCodes] = useState(false);

  const handleEnableMFA = async () => {
    try {
      const codes = await enableMFA(user!.id);
      setBackupCodes(codes);
      setShowCodes(true);
      toast.success('MFA activé avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'activation du MFA');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        Authentification à Deux Facteurs
      </h2>

      {!user?.security?.mfa?.enabled ? (
        <div>
          <p className="text-gray-600 mb-4">
            Activez l'authentification à deux facteurs pour renforcer la sécurité de votre compte.
          </p>
          <Button
            variant="accent"
            onClick={handleEnableMFA}
          >
            Activer le MFA
          </Button>
        </div>
      ) : showCodes ? (
        <div>
          <p className="text-gray-600 mb-4">
            Conservez ces codes de secours dans un endroit sûr. Ils vous permettront de récupérer l'accès à votre compte.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-2">
              {backupCodes.map((code, index) => (
                <div key={index} className="font-mono text-sm">
                  {code}
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowCodes(false)}
          >
            J'ai sauvegardé mes codes
          </Button>
        </div>
      ) : (
        <p className="text-green-600">
          MFA activé
        </p>
      )}
    </div>
  );
}