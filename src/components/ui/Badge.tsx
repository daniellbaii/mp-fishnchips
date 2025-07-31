import React from 'react';
import { cn } from '@/components/lib/utils';

type BadgeVariant = 'accent' | 'success' | 'primary' | 'secondary' | 'gray';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const getVariantClasses = (variant: BadgeVariant) => {
  const baseClasses = 'text-xs px-3 py-1 rounded-full font-medium tracking-wide';
  
  const variants = {
    accent: `${baseClasses} bg-amber-500 text-white shadow-sm`,
    success: `${baseClasses} bg-emerald-500 text-white shadow-sm`,
    primary: `${baseClasses} bg-blue-800 text-white shadow-sm`,
    secondary: `${baseClasses} bg-sky-500 text-white shadow-sm`,
    gray: `${baseClasses} bg-gray-500 text-white shadow-sm`,
  };
  return variants[variant];
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'accent', children, ...props }, ref) => {
    const variantClasses = getVariantClasses(variant);
    
    return (
      <span
        className={cn(variantClasses, className)}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };