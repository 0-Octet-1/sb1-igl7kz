import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({ 
  className = '', 
  variant = 'text',
  animation = 'pulse'
}: SkeletonProps) {
  const baseClasses = 'bg-surface-hover';
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: ''
  };
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  return (
    <div 
      className={`
        ${baseClasses} 
        ${animationClasses[animation]} 
        ${variantClasses[variant]} 
        ${className}
      `}
    />
  );
}