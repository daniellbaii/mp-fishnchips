'use client';

import { CartItem as CartItemType } from '@/types/menu';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-300 shadow-sm">
      {/* Item Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{item.menuItem.name}</h3>
        <button
          onClick={() => removeItem(item.id)}
          className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors duration-200 cursor-pointer"
        >
          Remove
        </button>
      </div>

      {/* Customizations */}
      {item.customizations.length > 0 && (
        <div className="mb-3">
          {item.customizations.map(customization => (
            <div key={`${customization.customizationId}-${customization.optionId}`} className="text-sm text-gray-700">
              • {customization.name}
              {customization.priceModifier !== 0 && (
                <span className="text-gray-600">
                  {' '}({customization.priceModifier > 0 ? '+' : ''}${customization.priceModifier.toFixed(2)})
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Quantity and Price */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 bg-white hover:bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            -
          </button>
          <span className="font-semibold text-gray-800 min-w-[2rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 bg-white hover:bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-600 transition-colors duration-200 cursor-pointer"
          >
            +
          </button>
        </div>

        <div className="text-right">
          <div className="font-semibold text-gray-900">
            ${item.totalPrice.toFixed(2)}
          </div>
          {item.quantity > 1 && (
            <div className="text-xs text-gray-600">
              ${(item.totalPrice / item.quantity).toFixed(2)} each
            </div>
          )}
        </div>
      </div>
    </div>
  );
}