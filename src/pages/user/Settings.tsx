import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import UserLayout from '../../components/user/UserLayout';
import { Button } from '../../components/ui/Button';
import { toast } from 'react-hot-toast';

const settingsSchema = z.object({
  profile: z.object({
    displayName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    bio: z.string().max(500, 'La bio ne doit pas dépasser 500 caractères'),
    photoURL: z.string().url().optional()
  }),
  preferences: z.object({
    language: z.enum(['fr', 'en']),
    notifications: z.object({
      email: z.boolean(),
      browser: z.boolean(),
      mobile: z.boolean()
    }),
    privacy: z.object({
      showProfile: z.boolean(),
      showProgress: z.boolean()
    })
  })
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function Settings() {
  const { user } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      profile: {
        displayName: user?.displayName || '',
        bio: user?.bio || '',
        photoURL: user?.photoURL
      },
      preferences: {
        language: user?.preferences?.language || 'fr',
        notifications: {
          email: true,
          browser: true,
          mobile: false
        },
        privacy: {
          showProfile: true,
          showProgress: true
        }
      }
    }
  });

  const onSubmit = async (data: SettingsFormData) => {
    try {
      // TODO: Implémenter la mise à jour des paramètres
      console.log(data);
      toast.success('Paramètres mis à jour');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  return (
    <UserLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Paramètres</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profil */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Profil</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom d'affichage
                </label>
                <input
                  type="text"
                  {...register('profile.displayName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                />
                {errors.profile?.displayName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.profile.displayName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  {...register('profile.bio')}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                />
                {errors.profile?.bio && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.profile.bio.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Préférences */}
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

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Notifications
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('preferences.notifications.email')}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Notifications par email
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('preferences.notifications.browser')}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Notifications navigateur
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Confidentialité
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('preferences.privacy.showProfile')}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Profil public
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('preferences.privacy.showProgress')}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Afficher ma progression
                    </label>
                  </div>
                </div>
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
    </UserLayout>
  );
}