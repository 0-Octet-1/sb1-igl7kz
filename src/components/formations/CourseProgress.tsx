import React from 'react';
import { Progress } from '../ui/Progress';
import { useQuery } from 'react-query';
import { getCourseProgress } from '../../lib/api/progress';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

interface CourseProgressProps {
  courseId: string;
}

export default function CourseProgress({ courseId }: CourseProgressProps) {
  const { user } = useAuth();
  const { data: progress } = useQuery(
    ['courseProgress', courseId],
    () => getCourseProgress(user!.id, courseId)
  );

  const percentage = progress ? Math.round((progress.completedModules.length / progress.totalModules) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Progression</h3>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-accent font-mono"
        >
          {percentage}%
        </motion.span>
      </div>

      <Progress value={percentage} />

      {progress?.completed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-success/10 text-success p-4 rounded-lg"
        >
          <p className="font-medium">Formation terminée !</p>
          <p className="text-sm">
            Terminé le {new Date(progress.completedAt).toLocaleDateString()}
          </p>
        </motion.div>
      )}
    </div>
  );
}