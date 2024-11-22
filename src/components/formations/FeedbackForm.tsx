import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { submitFeedback } from '../../lib/api/feedback';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

interface FeedbackFormProps {
  courseId: string;
  moduleId?: string;
  onSubmit?: () => void;
}

export default function FeedbackForm({ courseId, moduleId, onSubmit }: FeedbackFormProps) {
  const { user } = useAuth();
  const [type, setType] = useState<'question' | 'suggestion' | 'issue'>('question');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Veuillez entrer un commentaire');
      return;
    }

    setSubmitting(true);
    try {
      await submitFeedback({
        userId: user!.id,
        courseId,
        moduleId,
        type,
        comment
      });
      
      toast.success('Feedback envoyé avec succès !');
      setComment('');
      onSubmit?.();
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du feedback');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-2">Type de feedback</label>
        <div className="flex space-x-4">
          {[
            { value: 'question', label: 'Question' },
            { value: 'suggestion', label: 'Suggestion' },
            { value: 'issue', label: 'Problème' }
          ].map(option => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                value={option.value}
                checked={type === option.value}
                onChange={(e) => setType(e.target.value as typeof type)}
                className="form-radio h-4 w-4 text-accent"
              />
              <span className="ml-2 text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Votre message</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-1 focus:ring-accent"
          rows={4}
          placeholder="Décrivez votre question, suggestion ou problème..."
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="accent"
          disabled={submitting || !comment.trim()}
        >
          {submitting ? 'Envoi...' : 'Envoyer le feedback'}
        </Button>
      </div>
    </motion.form>
  );
}