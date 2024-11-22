import React from 'react';

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: number;
  className?: string;
}

export default function ResponsiveGrid({
  children,
  cols = { sm: 1, md: 2, lg: 3 },
  gap = 6,
  className = ''
}: ResponsiveGridProps) {
  const getGridCols = () => {
    return `
      grid
      grid-cols-${cols.sm || 1}
      md:grid-cols-${cols.md || cols.sm || 1}
      lg:grid-cols-${cols.lg || cols.md || cols.sm || 1}
      gap-${gap}
    `;
  };

  return (
    <div className={`${getGridCols()} ${className}`}>
      {children}
    </div>
  );
}