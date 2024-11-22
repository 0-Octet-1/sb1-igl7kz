import React from 'react';
import { useProgressiveImage } from '../../lib/optimizations/imageLoader';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  width,
  height 
}: OptimizedImageProps) {
  const { currentSrc, isLoading } = useProgressiveImage(src);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0.5 : 1 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'blur-sm' : 'blur-0'
        }`}
        loading="lazy"
        width={width}
        height={height}
      />
    </motion.div>
  );
}