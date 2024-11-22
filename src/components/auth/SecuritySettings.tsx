import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getLoginHistory, manageDevices, revokeAllSessions } from '../../lib/auth';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';

export default function SecuritySettings() {
  const { user } = useAuth();
  const [loginHistory, setLoginHistory] = React.useState([]);
  const [devices, setDevices] = React.useState([]);

  React.useEffect(() => {
    if (user) {
      loadSecurityData();
    }
  }, [user]);

  const loadSecurityData = async () => {
    const history = await getLoginHistory(user.id);
    setLoginHistory(history);
    // Charger les appareils de confiance
    const userDoc = await getDoc(doc(db, 'users', user.id));
    setDevices(userDoc.data()?.security?.trustedDevices || []);
  };

  const handleRevokeDevice = async (deviceId: string) => {
    try {
      await manageDevices(user.id, deviceId, 'remove');
      toast.success('Appareil révoqué');
      loadSecurityData();
    } catch (error) {
      toast.error('Erreur lors de la révocation');
    }
  };

  const handleRevokeAllSessions = async () => {
    try {
      await revokeAllSessions(user.id);
      toast.success('Toutes les sessions ont été révoquées');
    } catch (error) {
      toast.error('Erreur lors de la révocation des sessions');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Appareils de Confiance</h2>
        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{device.name}</p>
                <p className="text-sm text-gray-500">
                  Dernière connexion: {new Date(device.lastUsed).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="danger"
                onClick={() => handleRevokeDevice(device.id)}
              >
                Révoquer
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Historique des Connexions</h2>
        <div className="space-y-4">
          {loginHistory.map((login) => (
            <div key={login.id} className="flex justify-between">
              <div>
                <p className="text-sm">{login.ipAddress}</p>
                <p className="text-xs text-gray-500">
                  {new Date(login.timestamp).toLocaleString()}
                </p>
              </div>
              <span className={`text-sm ${login.successful ? 'text-success' : 'text-danger'}`}>
                {login.successful ? 'Réussi' : 'Échoué'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Actions de Sécurité</h2>
        <Button
          variant="danger"
          onClick={handleRevokeAllSessions}
        >
          Révoquer toutes les sessions
        </Button>
      </div>
    </div>
  );
}