import React from 'react';
import { cn } from '@/components/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({ 
  quantity, 
  onChange, 
  min = 1, 
  max = 99, 
  className 
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    const newQuantity = Math.max(min, quantity - 1);
    onChange(newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(max, quantity + 1);
    onChange(newQuantity);
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="quantity-btn disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        type="button"
      >
        -
      </button>
      <span className="font-semibold text-gray-800 min-w-[2rem] text-center">
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="quantity-btn disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        type="button"
      >
        +
      </button>
    </div>
  );
}