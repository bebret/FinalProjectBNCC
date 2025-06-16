"use client";

import React from 'react';
import { useProducts } from '../../context/ProductContext';

const ProductSort = () => {
  const { sortBy, setSortBy } = useProducts();

  return (
    <div className="flex items-center gap-4 mb-6">
      <label className="text-sm font-medium text-gray-700">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Default</option>
        <option value="rating">Highest Rating</option>
        <option value="discount">Biggest Discount</option>
        <option value="price-high">Price: High to Low</option>
        <option value="price-low">Price: Low to High</option>
        <option value="stock">Highest Stock</option>
        <option value="reviews">Most Reviews</option>
        <option value="name">Name A-Z</option>
      </select>
    </div>
  );
};

export default ProductSort;