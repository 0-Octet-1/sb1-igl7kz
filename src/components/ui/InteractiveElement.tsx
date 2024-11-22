import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveElementProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'card' | 'link';
}

export default function InteractiveElement({
  children,
  onClick,
  disabled,
  className = '',
  type = 'button'
}: InteractiveElementProps) {
  const baseStyles = {
    button: 'px-4 py-2 rounded-lg',
    card: 'p-6 rounded-lg shadow-sm',
    link: 'inline-flex items-center'
  };

  return (
    <motion.div
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={disabled ? undefined : onClick}
      className={`
        ${baseStyles[type]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}