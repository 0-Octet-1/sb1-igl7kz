import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export default function Tooltip({ 
  content, 
  children, 
  position = 'top',
  delay = 200 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  let timer: NodeJS.Timeout;

  const positions = {
    top: '-translate-y-full -translate-x-1/2 left-1/2 bottom-[calc(100%+5px)]',
    bottom: 'translate-y-2 -translate-x-1/2 left-1/2 top-full',
    left: '-translate-x-full -translate-y-1/2 top-1/2 right-[calc(100%+5px)]',
    right: 'translate-x-2 -translate-y-1/2 top-1/2 left-full'
  };

  const handleMouseEnter = () => {
    timer = setTimeout(() => setIsVisible(true), delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setIsVisible(false);
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={`absolute z-50 ${positions[position]}`}
          >
            <div className="bg-surface-hover text-primary px-2 py-1 rounded text-sm shadow-lg whitespace-nowrap">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}