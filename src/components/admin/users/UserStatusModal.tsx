import React from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from '../../ui/Button';
import { UserManagement } from '../../../types/admin';

interface UserStatusModalProps {
  user: UserManagement | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (userId: string, status: string, reason?: string) => Promise<void>;
}

export default function UserStatusModal({ user, isOpen, onClose, onUpdateStatus }: UserStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = React.useState(user?.status || 'active');
  const [reason, setReason] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      await onUpdateStatus(user.id, selectedStatus, reason);
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6">
          <Dialog.Title className="text-lg font-medium mb-4">
            Modifier le statut utilisateur
          </Dialog.Title>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              >
                <option value="active">Actif</option>
                <option value="suspended">Suspendu</option>
                <option value="banned">Banni</option>
              </select>
            </div>

            {(selectedStatus === 'suspended' || selectedStatus === 'banned') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Raison
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                />
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="accent"
                disabled={isLoading}
              >
                {isLoading ? 'Mise à jour...' : 'Confirmer'}
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}