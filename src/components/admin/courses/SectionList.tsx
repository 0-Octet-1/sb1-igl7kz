import React from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import { Button } from '../../ui/Button';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface SectionListProps {
  control: Control<any>;
  moduleIndex: number;
}

export default function SectionList({ control, moduleIndex }: SectionListProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.sections`
  });

  const addSection = () => {
    append({
      title: '',
      type: 'video',
      content: ''
    });
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Sections</h3>
        <Button type="button" variant="outline" size="sm" onClick={addSection}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Ajouter une section
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, sectionIndex) => (
          <div key={field.id} className="border rounded p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input
                  type="text"
                  {...control.register(`modules.${moduleIndex}.sections.${sectionIndex}.title`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  {...control.register(`modules.${moduleIndex}.sections.${sectionIndex}.type`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                >
                  <option value="video">Vidéo</option>
                  <option value="quiz">Quiz</option>
                  <option value="practice">Exercice pratique</option>
                </select>
              </div>

              <div className="flex items-end justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(sectionIndex)}
                >
                  <TrashIcon className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Contenu
              </label>
              <textarea
                {...control.register(`modules.${moduleIndex}.sections.${sectionIndex}.content`)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}