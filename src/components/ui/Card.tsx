import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = true, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : undefined}
      className={`bg-surface p-6 rounded-lg border border-border
        ${hover ? 'hover:border-accent hover:shadow-highlight transition-all duration-200' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}