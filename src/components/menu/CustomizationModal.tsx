'use client';

import { useState, useEffect } from 'react';
import { MenuItem, SelectedCustomization, MenuCustomization } from '@/types/menu';
import { CloseIcon } from '@/components/ui/icons';

interface CustomizationModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (customizations: SelectedCustomization[]) => void;
}

export default function CustomizationModal({ item, isOpen, onClose, onAdd }: CustomizationModalProps) {
  const [selectedCustomizations, setSelectedCustomizations] = useState<SelectedCustomization[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      // Initialize with required customizations
      const initialSelections: SelectedCustomization[] = [];
      item.customizations?.forEach(customization => {
        if (customization.required && customization.options.length > 0) {
          const firstOption = customization.options[0];
          initialSelections.push({
            customizationId: customization.id,
            optionId: firstOption.id,
            name: firstOption.name,
            priceModifier: firstOption.priceModifier
          });
        }
      });
      setSelectedCustomizations(initialSelections);
      setQuantity(1);
    }
  }, [isOpen, item]);

  const handleCustomizationChange = (customization: MenuCustomization, optionId: string) => {
    const option = customization.options.find(opt => opt.id === optionId);
    if (!option) return;

    setSelectedCustomizations(prev => {
      const newSelections = [...prev];
      const existingIndex = newSelections.findIndex(sel => sel.customizationId === customization.id);

      const newSelection: SelectedCustomization = {
        customizationId: customization.id,
        optionId: option.id,
        name: option.name,
        priceModifier: option.priceModifier
      };

      if (customization.type === 'checkbox') {
        if (existingIndex >= 0) {
          // Remove if already selected (checkbox toggle)
          newSelections.splice(existingIndex, 1);
        } else {
          // Add new selection
          newSelections.push(newSelection);
        }
      } else {
        // Radio/select - replace existing
        if (existingIndex >= 0) {
          newSelections[existingIndex] = newSelection;
        } else {
          newSelections.push(newSelection);
        }
      }

      return newSelections;
    });
  };

  const calculateTotalPrice = () => {
    const basePrice = item.price;
    const customizationPrice = selectedCustomizations.reduce((sum, custom) => sum + custom.priceModifier, 0);
    return (basePrice + customizationPrice) * quantity;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAdd(selectedCustomizations);
    }
  };

  const isCustomizationSelected = (customizationId: string, optionId: string) => {
    return selectedCustomizations.some(
      sel => sel.customizationId === customizationId && sel.optionId === optionId
    );
  };

  const canAddToCart = () => {
    return item.customizations?.every(customization => {
      if (customization.required) {
        return selectedCustomizations.some(sel => sel.customizationId === customization.id);
      }
      return true;
    }) ?? true;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">{item.description}</p>

          {/* Customizations */}
          {item.customizations?.map(customization => (
            <div key={customization.id} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {customization.name}
                {customization.required && <span className="text-red-500 ml-1">*</span>}
              </h3>

              <div className="space-y-2">
                {customization.options.map(option => (
                  <label
                    key={option.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <input
                        type={customization.type === 'checkbox' ? 'checkbox' : 'radio'}
                        name={customization.id}
                        checked={isCustomizationSelected(customization.id, option.id)}
                        onChange={() => handleCustomizationChange(customization, option.id)}
                        className="mr-3 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{option.name}</span>
                    </div>
                    {option.priceModifier !== 0 && (
                      <span className="text-sm font-medium text-gray-600">
                        {option.priceModifier > 0 ? '+' : ''}${option.priceModifier.toFixed(2)}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-semibold transition-colors duration-200"
              >
                -
              </button>
              <span className="text-xl font-semibold min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-semibold transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-primary-800">
              ${calculateTotalPrice().toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart()}
            className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
          >
            Add {quantity} to Cart
          </button>
        </div>
      </div>
    </div>
  );
}