import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface FeedbackProps {
  type: 'success' | 'error';
  message: string;
  visible: boolean;
  onClose?: () => void;
}

export default function Feedback({ type, message, visible, onClose }: FeedbackProps) {
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon
  };

  const colors = {
    success: 'bg-success/10 text-success',
    error: 'bg-danger/10 text-danger'
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 flex items-center p-4 rounded-lg shadow-lg ${colors[type]}`}
        >
          <Icon className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">{message}</span>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-4 hover:opacity-75 transition-opacity"
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}