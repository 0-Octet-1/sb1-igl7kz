import React from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import { Button } from '../../ui/Button';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface ModuleEditorProps {
  control: Control<any>;
}

export default function ModuleEditor({ control }: ModuleEditorProps) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'modules'
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  const addModule = () => {
    append({
      title: '',
      duration: '',
      content: '',
      order: fields.length
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="modules">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {fields.map((field, index) => (
                <Draggable
                  key={field.id}
                  draggableId={field.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border rounded-lg p-4 bg-gray-50"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Titre du module
                          </label>
                          <input
                            type="text"
                            {...control.register(`modules.${index}.title`)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Contenu
                        </label>
                        <textarea
                          {...control.register(`modules.${index}.content`)}
                          rows={4}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
                        />
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => remove(index)}
                        >
                          <TrashIcon className="h-5 w-5 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}