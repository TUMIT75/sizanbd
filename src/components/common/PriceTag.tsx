import React from 'react';
import { formatBDT } from '../../utils/formatters';

interface PriceTagProps {
  price: number;
  regularPrice?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSavings?: boolean;
  className?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  price,
  regularPrice,
  size = 'md',
  showSavings = false,
  className = '',
}) => {
  const hasDiscount = regularPrice && regularPrice > price;
  const savings = hasDiscount ? regularPrice - price : 0;

  const sizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-semibold',
    lg: 'text-lg md:text-xl font-bold',
    xl: 'text-2xl md:text-3xl font-bold tracking-tight',
  };

  return (
    <div className={`flex flex-wrap items-baseline gap-2 ${className}`}>
      <span className={`text-[#111111] ${sizeClasses[size]}`}>
        {formatBDT(price)}
      </span>

      {hasDiscount && (
        <span className="text-xs md:text-sm text-[#737373] line-through font-normal">
          {formatBDT(regularPrice)}
        </span>
      )}

      {showSavings && hasDiscount && (
        <span className="text-xs font-medium text-[#1E5EFF] bg-[#1E5EFF]/10 px-2 py-0.5 rounded-full">
          Save {formatBDT(savings)}
        </span>
      )}
    </div>
  );
};
