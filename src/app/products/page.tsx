"use client"

import React from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductSearch from '../../components/products/ProductSearch';
import ProductFilters from '../../components/products/ProductFilters';
import ProductSort from '../../components/products/ProductSort';
import ProductList from '../../components/products/ProductList';

export default function ProductsPage() {
  const { filteredProducts, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">All Products</h1>
          <p className="text-gray-600 text-lg">Discover our complete collection of amazing products</p>
        </div>
        
        {/* Search */}
        <ProductSearch />
        
        {/* Filters */}
        <ProductFilters />
        
        {/* Sort */}
        <ProductSort />
        
        {/* Products Grid */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} products
          </p>
        </div>
        
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}