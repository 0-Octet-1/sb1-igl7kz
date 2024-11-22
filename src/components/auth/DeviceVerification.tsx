import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { verifyBackupCode, addVerifiedDevice } from '../../lib/security/mfa';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';

export default function DeviceVerification() {
  const { user } = useAuth();
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerification = async () => {
    if (!code) {
      toast.error('Veuillez entrer un code');
      return;
    }

    setIsVerifying(true);
    try {
      const isValid = await verifyBackupCode(user!.id, code);
      if (isValid) {
        await addVerifiedDevice(user!.id);
        toast.success('Appareil vérifié avec succès');
      } else {
        toast.error('Code invalide');
      }
    } catch (error) {
      toast.error('Erreur lors de la vérification');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        Vérification de l'Appareil
      </h2>

      <p className="text-gray-600 mb-4">
        Entrez un code de secours pour vérifier cet appareil.
      </p>

      <div className="space-y-4">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Code de secours"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
        />

        <Button
          variant="accent"
          onClick={handleVerification}
          disabled={isVerifying}
          className="w-full"
        >
          {isVerifying ? 'Vérification...' : 'Vérifier l\'appareil'}
        </Button>
      </div>
    </div>
  );
}