'use client';

import { useState } from 'react';
import { MenuCategory } from '@/types/menu';
import { menuItems, menuCategories } from '@/data/menu';
import { Input } from '@/components/ui';
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
      <div className="text-center mb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light text-blue-800 mb-3 tracking-tight">Menu</h1>
          <p className="text-lg text-gray-600 mb-12 font-light">Fresh seafood, expertly prepared</p>
          
          {/* Search */}
          <div className="max-w-sm mx-auto">
            <Input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-none bg-blue-50/30"
            />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-16">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-5 py-2.5 rounded-lg font-normal text-sm transition-all duration-200 cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-blue-800 text-white'
              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
          }`}
        >
          All Items
        </button>
        {menuCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as MenuCategory)}
            className={`px-5 py-2.5 rounded-lg font-normal text-sm transition-all duration-200 cursor-pointer ${
              selectedCategory === category.id
                ? 'bg-blue-800 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Customer Favorites Section */}
      {selectedCategory === 'all' && !searchQuery && (
        <div className="mb-20">
          <h2 className="text-2xl font-light text-blue-800 text-center mb-12 tracking-tight">Popular Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <div className="text-center mb-10">
        <p className="text-sm text-gray-500 font-light">
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
          {selectedCategory !== 'all' && (
            <span> in {menuCategories.find(c => c.id === selectedCategory)?.name}</span>
          )}
          {searchQuery && <span> matching "{searchQuery}"</span>}
        </p>
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="max-w-sm mx-auto">
            <h3 className="text-lg font-light text-gray-700 mb-2">No items found</h3>
            <p className="text-sm text-gray-500">
              {searchQuery 
                ? `Try adjusting your search term`
                : 'Try selecting a different category'
              }
            </p>
          </div>
        </div>
      )}

    </div>
  );
}