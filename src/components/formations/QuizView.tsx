import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion, submitQuizAnswers } from '../../lib/api/quiz';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

interface QuizViewProps {
  moduleId: string;
  questions: QuizQuestion[];
  onComplete: (passed: boolean) => void;
}

export default function QuizView({ moduleId, questions, onComplete }: QuizViewProps) {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await submitQuizAnswers(user!.id, moduleId, answers);
      toast.success(result.passed ? 'Quiz réussi !' : 'Quiz échoué');
      onComplete(result.passed);
    } catch (error) {
      toast.error('Erreur lors de la soumission du quiz');
    } finally {
      setSubmitting(false);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Progression */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Question {currentQuestion + 1}/{questions.length}</h3>
        <div className="h-2 w-32 bg-surface rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question courante */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-surface p-6 rounded-lg"
      >
        <p className="text-lg mb-4">{question.question}</p>
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`w-full p-4 text-left rounded-lg border transition-colors ${
                answers[question.id] === option
                  ? 'border-accent bg-accent/10'
                  : 'border-border hover:border-accent/50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(prev => prev - 1)}
          disabled={currentQuestion === 0}
        >
          Question précédente
        </Button>

        {currentQuestion === questions.length - 1 ? (
          <Button
            variant="accent"
            onClick={handleSubmit}
            disabled={submitting || Object.keys(answers).length !== questions.length}
          >
            {submitting ? 'Envoi...' : 'Terminer le quiz'}
          </Button>
        ) : (
          <Button
            variant="accent"
            onClick={() => setCurrentQuestion(prev => prev + 1)}
            disabled={!answers[question.id]}
          >
            Question suivante
          </Button>
        )}
      </div>
    </div>
  );
}