import React from 'react';
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ModuleProgressProps {
  module: {
    id: string;
    title: string;
    duration: string;
  };
  isCompleted: boolean;
  isLocked: boolean;
  onClick: () => void;
}

export default function ModuleProgress({ module, isCompleted, isLocked, onClick }: ModuleProgressProps) {
  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.02 } : undefined}
      className={`p-4 rounded-lg border ${
        isCompleted ? 'border-success bg-success/5' :
        isLocked ? 'border-gray-200 bg-gray-50 opacity-50' :
        'border-accent bg-accent/5 cursor-pointer'
      }`}
      onClick={!isLocked ? onClick : undefined}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">{module.title}</h4>
          <p className="text-sm text-gray-500">{module.duration}</p>
        </div>
        {isCompleted ? (
          <CheckCircleIcon className="h-6 w-6 text-success" />
        ) : isLocked ? (
          <LockClosedIcon className="h-6 w-6 text-gray-400" />
        ) : null}
      </div>
    </motion.div>
  );
}