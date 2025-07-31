'use client';

import { useState } from 'react';
import { MenuItem } from '@/types/menu';
import { useCart } from '@/contexts/CartContext';
import CustomizationModal from './CustomizationModal';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const [showCustomization, setShowCustomization] = useState(false);
  const { addItem } = useCart();

  const handleQuickAdd = () => {
    if (item.customizations && item.customizations.length > 0) {
      setShowCustomization(true);
    } else {
      addItem(item, []);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-card hover:shadow-subtle transition-shadow duration-300 overflow-hidden">
        {/* Item Image Placeholder */}
        <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <div className="text-6xl text-blue-200">🐟</div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
            {item.popular && (
              <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Popular
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary-800">
              ${item.price.toFixed(2)}
            </div>

            <button
              onClick={handleQuickAdd}
              className="add-to-cart-btn flex items-center gap-2"
            >
              <span>+</span>
              Add
            </button>
          </div>

          {item.customizations && item.customizations.length > 0 && (
            <button
              onClick={() => setShowCustomization(true)}
              className="w-full mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              Customize options
            </button>
          )}
        </div>
      </div>

      {showCustomization && (
        <CustomizationModal
          item={item}
          isOpen={showCustomization}
          onClose={() => setShowCustomization(false)}
          onAdd={(customizations) => {
            addItem(item, customizations);
            setShowCustomization(false);
          }}
        />
      )}
    </>
  );
}