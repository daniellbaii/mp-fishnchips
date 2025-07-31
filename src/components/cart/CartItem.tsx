'use client';

import { CartItem as CartItemType } from '@/types/menu';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      {/* Item Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-800">{item.menuItem.name}</h3>
        <button
          onClick={() => removeItem(item.id)}
          className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors duration-200"
        >
          Remove
        </button>
      </div>

      {/* Customizations */}
      {item.customizations.length > 0 && (
        <div className="mb-3">
          {item.customizations.map(customization => (
            <div key={`${customization.customizationId}-${customization.optionId}`} className="text-sm text-gray-600">
              • {customization.name}
              {customization.priceModifier !== 0 && (
                <span className="text-gray-500">
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
            className="w-8 h-8 bg-white hover:bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-600 transition-colors duration-200"
          >
            -
          </button>
          <span className="font-semibold text-gray-800 min-w-[2rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 bg-white hover:bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-600 transition-colors duration-200"
          >
            +
          </button>
        </div>

        <div className="text-right">
          <div className="font-semibold text-gray-800">
            ${item.totalPrice.toFixed(2)}
          </div>
          {item.quantity > 1 && (
            <div className="text-xs text-gray-500">
              ${(item.totalPrice / item.quantity).toFixed(2)} each
            </div>
          )}
        </div>
      </div>
    </div>
  );
}