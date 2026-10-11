import React from 'react';
import { ProductStatus, StockStatus, ProductCondition } from '../../types';

interface BadgeProps {
  type: 'status' | 'stock' | 'condition' | 'discount';
  value: ProductStatus | StockStatus | ProductCondition | string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, value, className = '' }) => {
  if (type === 'status') {
    const isOfficial = value === 'Official';
    return (
      <span
        className={`inline-flex items-center text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-sm border ${
          isOfficial
            ? 'bg-blue-50 text-[#1E5EFF] border-[#1E5EFF]/20'
            : 'bg-neutral-50 text-neutral-600 border-neutral-200'
        } ${className}`}
      >
        {isOfficial ? 'Official' : 'Global / Unofficial'}
      </span>
    );
  }

  if (type === 'condition') {
    return (
      <span
        className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-sm border ${
          value === 'Pre-owned'
            ? 'bg-amber-50 text-amber-800 border-amber-200'
            : 'bg-neutral-50 text-neutral-700 border-neutral-200'
        } ${className}`}
      >
        {value}
      </span>
    );
  }

  if (type === 'stock') {
    const isInStock = value === 'In stock';
    return (
      <span
        className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-sm ${
          isInStock
            ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
            : 'text-amber-700 bg-amber-50 border border-amber-200'
        } ${className}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            isInStock ? 'bg-emerald-500' : 'bg-amber-500'
          }`}
        />
        {value}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center text-[11px] font-medium bg-[#1E5EFF] text-white px-2 py-0.5 rounded-sm ${className}`}
    >
      {value}
    </span>
  );
};
