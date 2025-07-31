'use client';

import React, { createContext, useContext, useState } from 'react';
import { CartItem, MenuItem, SelectedCustomization } from '@/types/menu';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalAmount: number;
  addItem: (menuItem: MenuItem, customizations: SelectedCustomization[]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateItemPrice(menuItem: MenuItem, customizations: SelectedCustomization[]): number {
  const basePrice = menuItem.price;
  const customizationPrice = customizations.reduce((sum, custom) => sum + custom.priceModifier, 0);
  return basePrice + customizationPrice;
}

function generateCartItemId(menuItem: MenuItem, customizations: SelectedCustomization[]): string {
  const customizationIds = customizations.map(c => `${c.customizationId}:${c.optionId}`).sort().join(',');
  return `${menuItem.id}-${customizationIds}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const addItem = (menuItem: MenuItem, customizations: SelectedCustomization[]) => {
    const itemId = generateCartItemId(menuItem, customizations);
    const itemPrice = calculateItemPrice(menuItem, customizations);
    
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === itemId);
      
      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        return prevItems.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * itemPrice }
            : item
        );
      } else {
        // New item
        const newItem: CartItem = {
          id: itemId,
          menuItem,
          quantity: 1,
          customizations,
          totalPrice: itemPrice
        };
        return [...prevItems, newItem];
      }
    });
    
    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prevItems => prevItems.map(item => {
      if (item.id === itemId) {
        const unitPrice = calculateItemPrice(item.menuItem, item.customizations);
        return {
          ...item,
          quantity,
          totalPrice: quantity * unitPrice
        };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
    setIsOpen(false);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const contextValue: CartContextType = {
    items,
    isOpen,
    totalItems,
    totalAmount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}