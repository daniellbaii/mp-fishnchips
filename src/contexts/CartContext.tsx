'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, MenuItem, SelectedCustomization } from '@/types/menu';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalAmount: number;
}

interface CartContextType extends CartState {
  addItem: (menuItem: MenuItem, customizations: SelectedCustomization[]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { menuItem: MenuItem; customizations: SelectedCustomization[] } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: { items: CartItem[] } };

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

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { menuItem, customizations } = action.payload;
      const itemId = generateCartItemId(menuItem, customizations);
      const itemPrice = calculateItemPrice(menuItem, customizations);
      
      const existingItemIndex = state.items.findIndex(item => item.id === itemId);
      
      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        newItems = state.items.map((item, index) => 
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
        newItems = [...state.items, newItem];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newItems.reduce((sum, item) => sum + item.totalPrice, 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
        isOpen: true
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.itemId);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newItems.reduce((sum, item) => sum + item.totalPrice, 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalAmount
      };
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { itemId } });
      }

      const newItems = state.items.map(item => {
        if (item.id === itemId) {
          const unitPrice = calculateItemPrice(item.menuItem, item.customizations);
          return {
            ...item,
            quantity,
            totalPrice: quantity * unitPrice
          };
        }
        return item;
      });

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newItems.reduce((sum, item) => sum + item.totalPrice, 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalAmount
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalAmount: 0,
        isOpen: false
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      };

    case 'LOAD_CART': {
      const items = action.payload.items;
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

      return {
        ...state,
        items,
        totalItems,
        totalAmount
      };
    }

    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  totalItems: 0,
  totalAmount: 0
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('mp-fishnchips-cart');
        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          dispatch({ type: 'LOAD_CART', payload: { items: cartData.items || [] } });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mp-fishnchips-cart', JSON.stringify({
          items: state.items,
          totalItems: state.totalItems,
          totalAmount: state.totalAmount
        }));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [state.items, state.totalItems, state.totalAmount]);

  const contextValue: CartContextType = {
    ...state,
    addItem: (menuItem: MenuItem, customizations: SelectedCustomization[]) =>
      dispatch({ type: 'ADD_ITEM', payload: { menuItem, customizations } }),
    removeItem: (itemId: string) =>
      dispatch({ type: 'REMOVE_ITEM', payload: { itemId } }),
    updateQuantity: (itemId: string, quantity: number) =>
      dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
    openCart: () => dispatch({ type: 'OPEN_CART' }),
    closeCart: () => dispatch({ type: 'CLOSE_CART' })
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