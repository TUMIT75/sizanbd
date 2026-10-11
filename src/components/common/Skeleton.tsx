import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect',
}) => {
  const variantStyles = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded-sm h-4 w-full',
  };

  return (
    <div
      className={`animate-pulse bg-[#EFEFEF] ${variantStyles[variant]} ${className}`}
    />
  );
};
