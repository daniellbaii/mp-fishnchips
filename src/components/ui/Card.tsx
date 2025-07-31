import React from 'react';
import { cn } from '@/components/lib/utils';

type CardVariant = 'default' | 'hover' | 'interactive';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const getVariantClasses = (variant: CardVariant) => {
  const baseClasses = 'bg-white rounded-xl transition-all duration-300';
  const baseCardShadow = 'shadow-lg';
  
  const variants = {
    default: `${baseClasses} ${baseCardShadow}`,
    hover: `${baseClasses} ${baseCardShadow} hover:shadow-xl cursor-pointer`,
    interactive: `${baseClasses} ${baseCardShadow} hover:shadow-xl cursor-pointer`,
  };
  return variants[variant];
};

const getPaddingClasses = (padding: CardProps['padding']) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  return paddings[padding || 'md'];
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const variantClasses = getVariantClasses(variant);
    const paddingClasses = getPaddingClasses(padding);
    
    return (
      <div
        className={cn(variantClasses, paddingClasses, className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };