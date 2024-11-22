import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../ui/Button';
import { Content } from '../../../types/content';
import MDEditor from '@uiw/react-md-editor';

const contentSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  type: z.enum(['article', 'guide', 'faq']),
  content: z.string().min(10, 'Le contenu doit contenir au moins 10 caractères'),
  excerpt: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  tags: z.array(z.string()),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional()
  }),
  metadata: z.object({
    readTime: z.number().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    category: z.string().optional()
  })
});

type ContentFormData = z.infer<typeof contentSchema>;

interface ContentEditorProps {
  initialData?: Content;
  onSubmit: (data: ContentFormData) => Promise<void>;
}

export default function ContentEditor({ initialData, onSubmit }: ContentEditorProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: initialData || {
      type: 'article',
      status: 'draft',
      tags: [],
      seo: {},
      metadata: {}
    }
  });

  const content = watch('content');

  return (
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                {...register('type')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              >
                <option value="article">Article</option>
                <option value="guide">Guide</option>
                <option value="faq">FAQ</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Statut
              </label>
              <select
                {...register('status')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Extrait
            </label>
            <textarea
              {...register('excerpt')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Contenu</h2>
        <MDEditor
          value={content}
          onChange={(value) => setValue('content', value || '')}
          height={400}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">SEO et Métadonnées</h2>
        
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Titre SEO
            </label>
            <input
              type="text"
              {...register('seo.title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description SEO
            </label>
            <textarea
              {...register('seo.description')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Niveau de difficulté
            </label>
            <select
              {...register('metadata.difficulty')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
            >
              <option value="beginner">Débutant</option>
              <option value="intermediate">Intermédiaire</option>
              <option value="advanced">Avancé</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline">
          Aperçu
        </Button>
        <Button type="submit" variant="accent">
          Enregistrer
        </Button>
      </div>
    </form>
  );
}