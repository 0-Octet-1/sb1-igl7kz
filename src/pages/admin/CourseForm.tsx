import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/Button';
import ModuleList from '../../components/admin/courses/ModuleList';
import { useNavigate } from 'react-router-dom';

const courseSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  duration: z.string().min(1, 'La durée est requise'),
  level: z.enum(['Débutant', 'Intermédiaire', 'Avancé']),
  thumbnail: z.string().optional(),
  modules: z.array(z.object({
    title: z.string(),
    duration: z.string(),
    sections: z.array(z.object({
      title: z.string(),
      type: z.enum(['video', 'quiz', 'practice']),
      content: z.string()
    }))
  }))
});

type CourseFormData = z.infer<typeof courseSchema>;

export default function CourseForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, control } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      modules: []
    }
  });

  const onSubmit = async (data: CourseFormData) => {
    try {
      // TODO: Implement course creation/update
      console.log(data);
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Nouvelle Formation</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Informations Générales</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input
                  type="text"
                  {...register('title')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Durée
                  </label>
                  <input
                    type="text"
                    {...register('duration')}
                    placeholder="ex: 2 heures"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                  />
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Niveau
                  </label>
                  <select
                    {...register('level')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                  >
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                  </select>
                  {errors.level && (
                    <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <ModuleList control={control} />

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/courses')}
            >
              Annuler
            </Button>
            <Button type="submit" variant="accent">
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}