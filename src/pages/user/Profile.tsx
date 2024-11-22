import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import UserLayout from '../../components/user/UserLayout';
import { Button } from '../../components/ui/Button';
import { updateUserProfile } from '../../lib/api/user';
import { useQueryClient } from 'react-query';

const profileSchema = z.object({
  displayName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  bio: z.string().max(500, 'La bio ne doit pas dépasser 500 caractères'),
  preferences: z.object({
    language: z.enum(['fr', 'en']),
    notifications: z.boolean(),
    emailUpdates: z.boolean()
  })
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Profile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      bio: user?.bio || '',
      preferences: {
        language: user?.preferences?.language || 'fr',
        notifications: user?.preferences?.notifications || true,
        emailUpdates: user?.preferences?.emailUpdates || true
      }
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateUserProfile(user!.id, data);
      queryClient.invalidateQueries('userProfile');
      // Afficher une notification de succès
    } catch (error) {
      console.error('Error updating profile:', error);
      // Afficher une notification d'erreur
    }
  };

  return (
    <UserLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>

        <div className="max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Informations Personnelles</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom d'affichage
                  </label>
                  <input
                    type="text"
                    {...register('displayName')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                  />
                  {errors.displayName && (
                    <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    {...register('bio')}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                  />
                  {errors.bio && (
                    <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Préférences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Langue
                  </label>
                  <select
                    {...register('preferences.language')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('preferences.notifications')}
                    className="rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Activer les notifications
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('preferences.emailUpdates')}
                    className="rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Recevoir les mises à jour par email
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="accent">
                Enregistrer les modifications
              </Button>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}