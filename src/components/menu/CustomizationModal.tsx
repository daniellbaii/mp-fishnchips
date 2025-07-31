'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MenuItem, SelectedCustomization, MenuCustomization } from '@/types/menu';
import { CloseIcon } from '@/components/ui/icons';
import { Button, QuantitySelector } from '@/components/ui';

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

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  const modalContent = (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-lg max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden border border-blue-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
        >
          <CloseIcon className="w-4 h-4 text-gray-500" />
        </button>

        {/* Header Section */}
        <div className="px-6 pt-8 pb-6 flex-shrink-0 border-b border-gray-100">
          <h2 className="text-2xl font-medium text-blue-800 mb-3 tracking-tight">{item.name}</h2>
          <p className="text-gray-600 text-sm font-light leading-relaxed">{item.description}</p>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Customizations */}
          {item.customizations?.map(customization => (
            <div key={customization.id} className="border-b border-gray-50 last:border-b-0">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-blue-800">
                    {customization.name}
                    {customization.required && <span className="text-amber-500 ml-1">*</span>}
                  </h3>
                  <span className="text-xs text-gray-400 font-light uppercase tracking-wide">
                    {customization.type === 'checkbox' ? 'Multiple' : 'Choose one'}
                  </span>
                </div>

                <div className="space-y-1">
                  {customization.options.map(option => (
                    <label
                      key={option.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50/50 cursor-pointer transition-colors duration-200 group"
                    >
                      <div className="flex items-center flex-1">
                        <span className="text-gray-800 font-light">{option.name}</span>
                        {option.priceModifier !== 0 && (
                          <span className="text-sm text-amber-600 ml-2 font-medium">
                            ({option.priceModifier > 0 ? '+' : ''}${option.priceModifier.toFixed(2)})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                          isCustomizationSelected(customization.id, option.id)
                            ? 'bg-blue-800 border-blue-800'
                            : 'border-gray-300 group-hover:border-blue-400'
                        }`}>
                          {isCustomizationSelected(customization.id, option.id) && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <input
                          type={customization.type === 'checkbox' ? 'checkbox' : 'radio'}
                          name={customization.id}
                          checked={isCustomizationSelected(customization.id, option.id)}
                          onChange={() => handleCustomizationChange(customization, option.id)}
                          className="sr-only"
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-6 border-t border-gray-100 flex-shrink-0 bg-gray-50/30">
          {/* Quantity and Total */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 font-light">Quantity</span>
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
                min={1}
              />
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 font-light mb-1">Total</div>
              <div className="text-2xl font-medium text-blue-800">
                ${calculateTotalPrice().toFixed(2)}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="ghost"
              className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={!canAddToCart()}
              variant="primary"
              className="flex-2 bg-blue-800 hover:bg-blue-700 disabled:bg-gray-300"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      </div>
    </>
  );

  // Render using portal to body to bypass layout containers
  return typeof window !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
}