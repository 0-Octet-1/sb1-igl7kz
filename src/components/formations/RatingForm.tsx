import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { submitRating } from '../../lib/api/ratings';
import { Button } from '../ui/Button';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface RatingFormProps {
  courseId: string;
  onSubmit?: () => void;
}

interface CriteriaRating {
  content: number;
  presentation: number;
  difficulty: number;
  usefulness: number;
}

export default function RatingForm({ courseId, onSubmit }: RatingFormProps) {
  const { user } = useAuth();
  const [criteria, setCriteria] = useState<CriteriaRating>({
    content: 0,
    presentation: 0,
    difficulty: 0,
    usefulness: 0
  });
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRatingChange = (criterion: keyof CriteriaRating, value: number) => {
    setCriteria(prev => ({
      ...prev,
      [criterion]: value
    }));
  };

  const calculateOverallRating = (): number => {
    const values = Object.values(criteria);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  const handleSubmit = async () => {
    if (Object.values(criteria).some(value => value === 0)) {
      toast.error('Veuillez noter tous les critères');
      return;
    }

    setSubmitting(true);
    try {
      await submitRating(user!.id, courseId, {
        rating: calculateOverallRating(),
        criteria,
        feedback
      });
      
      toast.success('Merci pour votre évaluation !');
      onSubmit?.();
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'évaluation');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (criterion: keyof CriteriaRating, value: number) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRatingChange(criterion, star)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          {star <= value ? (
            <StarIconSolid className="h-6 w-6 text-accent" />
          ) : (
            <StarIcon className="h-6 w-6 text-accent" />
          )}
        </button>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Qualité du contenu</label>
          {renderStars('content', criteria.content)}
        </div>

        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Clarté de la présentation</label>
          {renderStars('presentation', criteria.presentation)}
        </div>

        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Niveau de difficulté</label>
          {renderStars('difficulty', criteria.difficulty)}
        </div>

        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Utilité pratique</label>
          {renderStars('usefulness', criteria.usefulness)}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Commentaire (optionnel)
        </label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-1 focus:ring-accent"
          rows={4}
          placeholder="Partagez votre expérience..."
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Note globale: {calculateOverallRating()}/5
        </div>
        <Button
          variant="accent"
          onClick={handleSubmit}
          disabled={submitting || Object.values(criteria).some(v => v === 0)}
        >
          {submitting ? 'Envoi...' : 'Soumettre l\'évaluation'}
        </Button>
      </div>
    </motion.div>
  );
}