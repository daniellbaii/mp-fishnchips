import { MenuItem, MenuCustomization } from '@/types/menu';

// Customization options
const fishTypeCustomization: MenuCustomization = {
  id: 'fish-type',
  name: 'Choose your fish',
  type: 'radio',
  required: true,
  options: [
    { id: 'barramundi', name: 'Barramundi', priceModifier: 0 },
    { id: 'snapper', name: 'Snapper', priceModifier: 2 },
    { id: 'flathead', name: 'Flathead', priceModifier: 1 },
    { id: 'whiting', name: 'King George Whiting', priceModifier: 3 }
  ]
};

const portionSizeCustomization: MenuCustomization = {
  id: 'portion-size',
  name: 'Portion size',
  type: 'radio',
  required: true,
  options: [
    { id: 'regular', name: 'Regular', priceModifier: 0 },
    { id: 'large', name: 'Large', priceModifier: 3 }
  ]
};

const chipsTypeCustomization: MenuCustomization = {
  id: 'chips-type',
  name: 'Chips type',
  type: 'radio',
  required: true,
  options: [
    { id: 'regular', name: 'Regular Cut', priceModifier: 0 },
    { id: 'chunky', name: 'Chunky Cut', priceModifier: 1 },
    { id: 'wedges', name: 'Potato Wedges', priceModifier: 2 }
  ]
};

const extrasCustomization: MenuCustomization = {
  id: 'extras',
  name: 'Add extras',
  type: 'checkbox',
  required: false,
  options: [
    { id: 'lemon', name: 'Lemon wedge', priceModifier: 0 },
    { id: 'tartare', name: 'Tartare sauce', priceModifier: 1 },
    { id: 'vinegar', name: 'Malt vinegar', priceModifier: 0 },
    { id: 'gravy', name: 'Gravy', priceModifier: 2 }
  ]
};

export const menuItems: MenuItem[] = [
  // Fish
  {
    id: 'fish-single',
    name: 'Fresh Fish',
    description: 'Daily fresh catch, beer battered and fried to golden perfection',
    price: 12,
    category: 'fish',
    popular: true,
    customizations: [fishTypeCustomization, extrasCustomization]
  },
  {
    id: 'fish-grilled',
    name: 'Grilled Fish',
    description: 'Healthy option - fresh fish grilled with herbs and lemon',
    price: 14,
    category: 'fish',
    customizations: [fishTypeCustomization, extrasCustomization]
  },

  // Chips
  {
    id: 'chips-regular',
    name: 'Chips',
    description: 'Golden, crispy chips made fresh daily from premium potatoes',
    price: 8,
    category: 'chips',
    customizations: [chipsTypeCustomization, portionSizeCustomization]
  },
  {
    id: 'chips-loaded',
    name: 'Loaded Chips',
    description: 'Chips topped with cheese, bacon bits, and sour cream',
    price: 12,
    category: 'chips',
    customizations: [chipsTypeCustomization]
  },

  // Combos
  {
    id: 'classic-combo',
    name: 'Classic Fish & Chips',
    description: 'One piece of fresh fish with a serving of our famous chips',
    price: 18,
    category: 'combos',
    popular: true,
    customizations: [fishTypeCustomization, chipsTypeCustomization, extrasCustomization]
  },
  {
    id: 'family-pack',
    name: 'Family Pack',
    description: '4 pieces of fish, large chips, coleslaw, and bread rolls',
    price: 45,
    category: 'combos',
    customizations: [fishTypeCustomization, extrasCustomization]
  },
  {
    id: 'fishermans-basket',
    name: "Fisherman's Basket",
    description: '2 pieces fish, prawns, calamari rings, chips, and salad',
    price: 28,
    category: 'combos',
    customizations: [fishTypeCustomization, chipsTypeCustomization, extrasCustomization]
  },

  // Sides
  {
    id: 'coleslaw',
    name: 'Coleslaw',
    description: 'Fresh, creamy coleslaw made daily',
    price: 4,
    category: 'sides'
  },
  {
    id: 'potato-scallops',
    name: 'Potato Scallops',
    description: 'Sliced potato in crispy batter (4 pieces)',
    price: 6,
    category: 'sides'
  },
  {
    id: 'dim-sims',
    name: 'Dim Sims',
    description: 'Traditional steamed or fried dim sims (4 pieces)',
    price: 8,
    category: 'sides'
  },
  {
    id: 'prawns',
    name: 'Crumbed Prawns',
    description: 'Fresh prawns in golden crumb (6 pieces)',
    price: 12,
    category: 'sides'
  },

  // Drinks
  {
    id: 'soft-drink',
    name: 'Soft Drinks',
    description: 'Coke, Sprite, Fanta - 375ml cans',
    price: 3,
    category: 'drinks'
  },
  {
    id: 'water',
    name: 'Water',
    description: 'Premium spring water - 600ml',
    price: 2,
    category: 'drinks'
  },
  {
    id: 'juice',
    name: 'Fresh Juice',
    description: 'Orange or apple juice - 350ml',
    price: 4,
    category: 'drinks'
  }
];

export const menuCategories = [
  { id: 'fish', name: 'Fresh Fish', description: 'Daily catch, prepared to perfection' },
  { id: 'chips', name: 'Chips', description: 'Golden and crispy, made fresh daily' },
  { id: 'combos', name: 'Combos', description: 'Complete meals for great value' },
  { id: 'sides', name: 'Sides', description: 'Perfect accompaniments to your meal' },
  { id: 'drinks', name: 'Drinks', description: 'Refresh yourself with our beverage selection' }
] as const;