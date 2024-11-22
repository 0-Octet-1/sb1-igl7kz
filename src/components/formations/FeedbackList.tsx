import React from 'react';
import { useQuery } from 'react-query';
import { getFeedback, Feedback } from '../../lib/api/feedback';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';

interface FeedbackListProps {
  courseId: string;
  moduleId?: string;
}

export default function FeedbackList({ courseId, moduleId }: FeedbackListProps) {
  const { data: feedback, isLoading } = useQuery(
    ['feedback', courseId, moduleId],
    () => getFeedback(courseId, { moduleId })
  );

  if (isLoading) return <div>Chargement...</div>;

  const typeLabels = {
    question: 'Question',
    suggestion: 'Suggestion',
    issue: 'Problème'
  };

  const typeColors = {
    question: 'bg-blue-100 text-blue-800',
    suggestion: 'bg-green-100 text-green-800',
    issue: 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-4">
      {feedback?.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${typeColors[item.type]}`}>
                {typeLabels[item.type]}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                {format(new Date(item.createdAt), 'dd MMMM yyyy HH:mm', { locale: fr })}
              </span>
            </div>
            <span className={`text-sm ${
              item.status === 'resolved' ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {item.status === 'resolved' ? 'Résolu' : 'En attente'}
            </span>
          </div>

          <p className="text-gray-700">{item.comment}</p>

          {item.replies && item.replies.length > 0 && (
            <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-2">
              {item.replies.map(reply => (
                <div key={reply.id} className="text-sm">
                  <p className="text-gray-600">{reply.comment}</p>
                  <span className="text-xs text-gray-500">
                    {format(new Date(reply.createdAt), 'dd MMMM yyyy HH:mm', { locale: fr })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}