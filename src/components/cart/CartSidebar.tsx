'use client';

import { useCart } from '@/contexts/CartContext';
import { CloseIcon } from '@/components/ui/icons';
import CartItem from './CartItem';
import Link from 'next/link';

export default function CartSidebar() {
  const { isOpen, closeCart, items, totalAmount, totalItems, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Your Order ({totalItems} item{totalItems !== 1 ? 's' : ''})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="text-6xl text-gray-300 mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
              <button
                onClick={closeCart}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service Fee</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-800 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link 
                href="/checkout" 
                onClick={closeCart}
                className="w-full bg-accent-500 hover:bg-accent-600 text-white py-3 rounded-lg font-semibold text-center block transition-colors duration-200"
              >
                Proceed to Checkout
              </Link>
              
              <button
                onClick={clearCart}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>

            {/* Pickup Info */}
            <div className="text-xs text-gray-500 text-center">
              <p>🕒 Ready for pickup in 15 minutes</p>
              <p>📍 Mount Pleasant Fish & Chips</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}