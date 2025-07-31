export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image?: string;
  popular?: boolean;
  customizations?: MenuCustomization[];
}

export interface MenuCustomization {
  id: string;
  name: string;
  type: 'select' | 'checkbox' | 'radio';
  required: boolean;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  priceModifier: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations: SelectedCustomization[];
  totalPrice: number;
}

export interface SelectedCustomization {
  customizationId: string;
  optionId: string;
  name: string;
  priceModifier: number;
}

export type MenuCategory = 
  | 'fish'
  | 'chips' 
  | 'combos'
  | 'sides'
  | 'drinks'
  | 'desserts';

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  pickupTime?: Date;
  paymentMethod: 'cash' | 'card';
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  notes?: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed' 
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';