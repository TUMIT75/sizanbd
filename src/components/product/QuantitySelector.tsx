import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  min?: number;
  max?: number;
  onChange: (quantity: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  min = 1,
  max = 10,
  onChange,
  size = 'md',
}) => {
  const handleDecrement = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  const sizeStyles = {
    sm: 'h-8 text-xs',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base',
  };

  const btnWidth = {
    sm: 'w-8',
    md: 'w-10',
    lg: 'w-12',
  };

  return (
    <div
      className={`inline-flex items-center border border-[#E5E5E5] rounded-lg bg-white overflow-hidden ${sizeStyles[size]}`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={`${btnWidth[size]} h-full flex items-center justify-center text-[#737373] hover:text-[#111111] hover:bg-[#FAFAF8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer`}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="w-10 text-center font-semibold text-[#111111] select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={`${btnWidth[size]} h-full flex items-center justify-center text-[#737373] hover:text-[#111111] hover:bg-[#FAFAF8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer`}
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
