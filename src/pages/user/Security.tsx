import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import UserLayout from '../../components/user/UserLayout';
import { Button } from '../../components/ui/Button';
import { updatePassword } from '../../lib/auth';

const securitySchema = z.object({
  currentPassword: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  newPassword: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

type SecurityFormData = z.infer<typeof securitySchema>;

export default function Security() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema)
  });

  const onSubmit = async (data: SecurityFormData) => {
    try {
      await updatePassword(data.currentPassword, data.newPassword);
      reset();
      // Afficher une notification de succès
    } catch (error) {
      console.error('Error updating password:', error);
      // Afficher une notification d'erreur
    }
  };

  return (
    <UserLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Sécurité</h1>

        <div className="max-w-2xl">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Changer le mot de passe</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  {...register('currentPassword')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                />
                {errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  {...register('newPassword')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                />
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  {...register('confirmPassword')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="accent">
                  Mettre à jour le mot de passe
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Sessions Actives</h2>
            <p className="text-sm text-gray-600 mb-4">
              Liste des appareils connectés à votre compte.
            </p>
            {/* La liste des sessions sera ajoutée ici */}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}