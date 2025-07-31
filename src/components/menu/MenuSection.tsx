'use client';

import { useState } from 'react';
import { MenuCategory } from '@/types/menu';
import { menuItems, menuCategories } from '@/data/menu';
import MenuItemCard from './MenuItemCard';

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Menu & Online Ordering</h1>
        <p className="text-xl text-gray-500 mb-8">Fresh seafood, expertly prepared, delivered fast</p>
        
        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-text"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`filter-button ${
            selectedCategory === 'all' ? 'active' : 'inactive'
          }`}
        >
          All Items
        </button>
        {menuCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as MenuCategory)}
            className={`filter-button ${
              selectedCategory === category.id ? 'active' : 'inactive'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Customer Favorites Section */}
      {selectedCategory === 'all' && !searchQuery && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Customer Favorites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems
              .filter(item => item.popular)
              .map(item => (
                <MenuItemCard key={`popular-${item.id}`} item={item} />
              ))
            }
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center mb-8">
        <p className="text-gray-600">
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
          {selectedCategory !== 'all' && (
            <span> in {menuCategories.find(c => c.id === selectedCategory)?.name}</span>
          )}
          {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
        </p>
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl text-gray-300 mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
          <p className="text-gray-500">
            {searchQuery 
              ? `Try adjusting your search term "${searchQuery}"`
              : 'Try selecting a different category'
            }
          </p>
        </div>
      )}

    </div>
  );
}