import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/Button';
import { useQuery, useMutation } from 'react-query';
import { fetchSettings, updateSettings } from '../../lib/api/settings';
import { AdminSettings } from '../../types/admin';

const settingsSchema = z.object({
  maintenanceMode: z.boolean(),
  registrationEnabled: z.boolean(),
  maxUsersPerCourse: z.number().min(1),
  languages: z.array(z.enum(['fr', 'en'])),
  defaultLanguage: z.enum(['fr', 'en']),
  emailNotifications: z.object({
    newUser: z.boolean(),
    newCourse: z.boolean(),
    userProgress: z.boolean()
  }),
  socialLinks: z.object({
    facebook: z.string().url().optional(),
    twitter: z.string().url().optional(),
    youtube: z.string().url().optional(),
    discord: z.string().url().optional()
  })
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function Settings() {
  const { data: settings, isLoading } = useQuery<AdminSettings>('settings', fetchSettings);

  const { register, handleSubmit, formState: { errors } } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings || {
      maintenanceMode: false,
      registrationEnabled: true,
      maxUsersPerCourse: 50,
      languages: ['fr', 'en'],
      defaultLanguage: 'fr',
      emailNotifications: {
        newUser: true,
        newCourse: true,
        userProgress: true
      },
      socialLinks: {}
    }
  });

  const mutation = useMutation(updateSettings, {
    onSuccess: () => {
      // Show success notification
    }
  });

  const onSubmit = (data: SettingsFormData) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Paramètres du Site</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Paramètres Généraux */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Paramètres Généraux</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Mode Maintenance</label>
                  <p className="text-sm text-gray-500">
                    Active le mode maintenance sur le site
                  </p>
                </div>
                <input
                  type="checkbox"
                  {...register('maintenanceMode')}
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Inscriptions</label>
                  <p className="text-sm text-gray-500">
                    Permet aux nouveaux utilisateurs de s'inscrire
                  </p>
                </div>
                <input
                  type="checkbox"
                  {...register('registrationEnabled')}
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                />
              </div>

              <div>
                <label className="block font-medium">
                  Nombre maximum d'utilisateurs par formation
                </label>
                <input
                  type="number"
                  {...register('maxUsersPerCourse', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                />
                {errors.maxUsersPerCourse && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.maxUsersPerCourse.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Paramètres de Langue */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Langues</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Langue par défaut</label>
                <select
                  {...register('defaultLanguage')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Langues disponibles</label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="fr"
                      {...register('languages')}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    <label className="ml-2">Français</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value="en"
                      {...register('languages')}
                      className="rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    <label className="ml-2">English</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Notifications par Email</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-medium">Nouvel utilisateur</label>
                <input
                  type="checkbox"
                  {...register('emailNotifications.newUser')}
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-medium">Nouvelle formation</label>
                <input
                  type="checkbox"
                  {...register('emailNotifications.newCourse')}
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-medium">Progression utilisateur</label>
                <input
                  type="checkbox"
                  {...register('emailNotifications.userProgress')}
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                />
              </div>
            </div>
          </div>

          {/* Réseaux Sociaux */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Réseaux Sociaux</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Facebook</label>
                <input
                  type="url"
                  {...register('socialLinks.facebook')}
                  placeholder="https://facebook.com/..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                />
              </div>

              <div>
                <label className="block font-medium">Twitter</label>
                <input
                  type="url"
                  {...register('socialLinks.twitter')}
                  placeholder="https://twitter.com/..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                />
              </div>

              <div>
                <label className="block font-medium">YouTube</label>
                <input
                  type="url"
                  {...register('socialLinks.youtube')}
                  placeholder="https://youtube.com/..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                />
              </div>

              <div>
                <label className="block font-medium">Discord</label>
                <input
                  type="url"
                  {...register('socialLinks.discord')}
                  placeholder="https://discord.gg/..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                />
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
    </AdminLayout>
  );
}