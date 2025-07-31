'use client';

import { useCart } from '@/contexts/CartContext';

export default function CartButton() {
  const { totalItems, totalAmount, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 w-full justify-center md:w-auto md:justify-start"
    >
      <span>🛒</span>
      <span className="hidden sm:inline">Cart</span>
      
      {totalItems > 0 && (
        <>
          {/* Badge */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
          
          {/* Price (hidden on mobile) */}
          <span className="hidden md:inline text-sm">
            ${totalAmount.toFixed(2)}
          </span>
        </>
      )}
    </button>
  );
}