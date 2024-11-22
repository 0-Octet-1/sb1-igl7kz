import React from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from '../../ui/Button';
import { UserManagement } from '../../../types/admin';

interface UserRoleModalProps {
  user: UserManagement | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateRole: (userId: string, role: string) => Promise<void>;
}

export default function UserRoleModal({ user, isOpen, onClose, onUpdateRole }: UserRoleModalProps) {
  const [selectedRole, setSelectedRole] = React.useState(user?.role || 'user');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      await onUpdateRole(user.id, selectedRole);
      onClose();
    } catch (error) {
      console.error('Error updating role:', error);
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
            Modifier le rôle utilisateur
          </Dialog.Title>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rôle
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
                <option value="instructor">Instructeur</option>
              </select>
            </div>

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