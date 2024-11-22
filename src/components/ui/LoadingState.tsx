import React from 'react';
import { motion } from 'framer-motion';

interface LoadingStateProps {
  type?: 'spinner' | 'dots' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function LoadingState({ 
  type = 'spinner', 
  size = 'md',
  text 
}: LoadingStateProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`bg-accent rounded-full ${sizes[size]}`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <motion.div
            className={`bg-accent/50 rounded-full ${sizes[size]}`}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );

      default:
        return (
          <motion.div
            className={`border-2 border-accent/20 border-t-accent rounded-full ${sizes[size]}`}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {renderLoader()}
      {text && (
        <p className="mt-2 text-sm text-gray-500">{text}</p>
      )}
    </div>
  );
}