import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { submitQuizAnswer } from '../../lib/api/quiz';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

interface QuizProps {
  courseId: string;
  quizId: string;
  questions: {
    id: string;
    question: string;
    options: string[];
  }[];
  onComplete: (passed: boolean) => void;
}

export default function Quiz({ courseId, quizId, questions, onComplete }: QuizProps) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await submitQuizAnswer(user!.id, courseId, quizId, answers);
      setResult(result);
      onComplete(result.passed);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-lg ${
          result.passed ? 'bg-success/10' : 'bg-warning/10'
        }`}
      >
        <h3 className="text-xl font-semibold mb-4">
          {result.passed ? 'Quiz réussi !' : 'Quiz échoué'}
        </h3>
        <p className="text-lg mb-2">Score: {result.percentage}%</p>
        <p className="text-sm text-gray-600 mb-4">
          {result.score} réponses correctes sur {questions.length}
        </p>
        {!result.passed && (
          <Button variant="accent" onClick={() => setResult(null)}>
            Réessayer
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((q, index) => (
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-surface p-6 rounded-lg"
        >
          <h4 className="font-medium mb-4">{q.question}</h4>
          <div className="space-y-2">
            {q.options.map((option) => (
              <label
                key={option}
                className={`block p-3 rounded-lg border cursor-pointer transition-colors ${
                  answers[q.id] === option
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <input
                  type="radio"
                  name={q.id}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={(e) => 
                    setAnswers({ ...answers, [q.id]: e.target.value })
                  }
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </motion.div>
      ))}

      <Button
        variant="accent"
        onClick={handleSubmit}
        disabled={submitting || Object.keys(answers).length !== questions.length}
        className="w-full"
      >
        {submitting ? 'Envoi...' : 'Valider les réponses'}
      </Button>
    </div>
  );
}