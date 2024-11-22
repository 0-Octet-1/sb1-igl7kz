import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { rateCourse } from '../../lib/api/ratings';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface CourseRatingProps {
  courseId: string;
}

export default function CourseRating({ courseId }: CourseRatingProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error('Veuillez sélectionner une note');
      return;
    }

    setSubmitting(true);
    try {
      await rateCourse(user!.id, courseId, rating, feedback);
      toast.success('Merci pour votre évaluation !');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de l\'évaluation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => setRating(value)}
            className="focus:outline-none"
          >
            {value <= rating ? (
              <StarIconSolid className="h-8 w-8 text-accent" />
            ) : (
              <StarIcon className="h-8 w-8 text-accent" />
            )}
          </button>
        ))}
      </div>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Votre avis sur la formation (optionnel)"
        className="w-full p-3 rounded-lg border border-border focus:border-accent focus:ring-1 focus:ring-accent"
        rows={4}
      />

      <Button
        variant="accent"
        onClick={handleSubmit}
        disabled={submitting || !rating}
      >
        {submitting ? 'Envoi...' : 'Envoyer l\'évaluation'}
      </Button>
    </div>
  );
}