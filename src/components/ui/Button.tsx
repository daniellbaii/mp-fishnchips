import React from 'react';
import { cn } from '@/components/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

const getVariantClasses = (variant: ButtonVariant) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4';
  const variants = {
    primary: `${baseClasses} bg-blue-800 hover:bg-blue-700 text-white focus:ring-blue-200`,
    secondary: `${baseClasses} bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-200`,
    accent: `${baseClasses} bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-200`,
    ghost: `${baseClasses} bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-gray-200`,
  };
  return variants[variant];
};

const getSizeClasses = (size: ButtonSize) => {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  return sizes[size];
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    children, 
    loading = false, 
    disabled, 
    ...props 
  }, ref) => {
    const variantClasses = getVariantClasses(variant);
    const sizeClasses = getSizeClasses(size);
    const widthClasses = fullWidth ? 'w-full' : '';
    
    return (
      <button
        className={cn(variantClasses, sizeClasses, widthClasses, className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Loading...
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };