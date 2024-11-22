import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updateModuleProgress } from '../../lib/api/progress';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

interface ModuleCompletionProps {
  courseId: string;
  moduleId: string;
  onComplete: () => void;
}

export default function ModuleCompletion({ courseId, moduleId, onComplete }: ModuleCompletionProps) {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  // Tracker le temps passé
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleComplete = async () => {
    setSubmitting(true);
    try {
      await updateModuleProgress(user!.id, courseId, moduleId, {
        completed: true,
        timeSpent,
        lastAccessed: new Date()
      });
      
      toast.success('Module terminé !');
      onComplete();
    } catch (error) {
      toast.error('Erreur lors de la validation du module');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface p-6 rounded-lg"
    >
      <h3 className="text-lg font-semibold mb-4">Validation du module</h3>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Temps passé: {Math.floor(timeSpent / 60)} minutes
        </p>

        <Button
          variant="accent"
          onClick={handleComplete}
          disabled={submitting}
          className="w-full"
        >
          {submitting ? 'Validation...' : 'Marquer comme terminé'}
        </Button>
      </div>
    </motion.div>
  );
}