import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`animate-spin rounded-full border-2 border-accent/20 border-t-accent ${sizeClasses[size]}`}
      >
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-2 border-accent animate-pulse"></div>
      </div>
    </div>
  );
}