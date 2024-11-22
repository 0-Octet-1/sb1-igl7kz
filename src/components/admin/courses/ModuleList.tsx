import React from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import { Button } from '../../ui/Button';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import SectionList from './SectionList';

interface ModuleListProps {
  control: Control<any>;
}

export default function ModuleList({ control }: ModuleListProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'modules'
  });

  const addModule = () => {
    append({
      title: '',
      duration: '',
      sections: []
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Modules</h2>
        <Button type="button" variant="outline" onClick={addModule}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un module
        </Button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Titre du module
                  </label>
                  <input
                    type="text"
                    {...control.register(`modules.${index}.title`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Durée
                  </label>
                  <input
                    type="text"
                    {...control.register(`modules.${index}.duration`)}
                    placeholder="ex: 30 minutes"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => remove(index)}
                className="ml-4"
              >
                <TrashIcon className="h-5 w-5 text-red-500" />
              </Button>
            </div>

            <SectionList
              control={control}
              moduleIndex={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}