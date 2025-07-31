'use client';

import { useState } from 'react';
import { MenuItem } from '@/types/menu';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui';
import CustomizationModal from './CustomizationModal';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const [showCustomization, setShowCustomization] = useState(false);
  const { addItem } = useCart();

  const handleCardClick = () => {
    if (item.customizations && item.customizations.length > 0) {
      setShowCustomization(true);
    } else {
      addItem(item, []);
    }
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 overflow-hidden group border border-blue-100"
      >
        {/* Item Image Section */}
        <div className="relative h-40 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 overflow-hidden">
          {item.popular && (
            <div className="absolute top-3 right-3">
              <Badge variant="accent">
                Popular
              </Badge>
            </div>
          )}
          {/* Minimal pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/30 to-sky-100/40"></div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-blue-800 leading-tight mb-2">
              {item.name}
            </h3>
            <p className="text-gray-600 text-sm font-light leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>

          {/* Customization indicator */}
          {item.customizations && item.customizations.length > 0 && (
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
              <span className="text-xs text-amber-600 font-light uppercase tracking-wide">
                Customizable
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-medium text-blue-800">
              ${item.price.toFixed(2)}
            </div>
          </div>
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