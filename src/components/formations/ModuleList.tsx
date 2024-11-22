import React from 'react';
import { Module } from '../../types/course';
import ModuleProgress from './ModuleProgress';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from 'react-query';
import { getCourseProgress } from '../../lib/api/progress';

interface ModuleListProps {
  modules: Module[];
  courseId: string;
}

export default function ModuleList({ modules, courseId }: ModuleListProps) {
  const { user } = useAuth();
  const { data: progress } = useQuery(
    ['courseProgress', courseId],
    () => getCourseProgress(user!.id, courseId),
    { enabled: !!user }
  );

  const getModuleStatus = (moduleId: string, index: number) => {
    if (!user || !progress) {
      return { isCompleted: false, isLocked: false };
    }

    const moduleProgress = progress.modules.find(m => m.moduleId === moduleId);
    const previousModuleCompleted = index === 0 || 
      progress.modules.find(m => m.moduleId === modules[index - 1].id)?.completed;

    return {
      isCompleted: !!moduleProgress?.completed,
      isLocked: !previousModuleCompleted
    };
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Modules</h2>
      
      <div className="space-y-4">
        {modules.map((module, index) => {
          const { isCompleted, isLocked } = getModuleStatus(module.id, index);
          
          return (
            <ModuleProgress
              key={module.id}
              module={module}
              isCompleted={isCompleted}
              isLocked={isLocked}
              onClick={() => {/* Navigation vers le module */}}
            />
          );
        })}
      </div>
    </div>
  );
}