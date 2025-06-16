"use client"

import React from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  rating?: number;
  stock?: number;
  discount?: number;
  reviews?: number;
  available?: boolean;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] || '/placeholder-image.jpg'
    });
    
    alert(`${product.title} added to cart!`);
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id} className="border rounded-lg shadow-md overflow-hidden bg-white">
          <Link href={`/product/${product.id}`}>
            <div className="relative cursor-pointer">
              <img
                src={product.images[0] || '/placeholder-image.jpg'}
                alt={product.title}
                className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                }}
              />
              {/* Badges */}
              {product.discount && product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                  -{product.discount}%
                </div>
              )}
              {!product.available && (
                <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded text-sm">
                  Out of Stock
                </div>
              )}
            </div>
          </Link>
          
          <div className="p-4">
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
                {product.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm mb-2">
              {product.category.name}
            </p>
            
            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-600 ml-1">
                  {product.rating?.toFixed(1)} ({product.reviews} reviews)
                </span>
              </div>
            </div>
            
            {/* Stock Info */}
            <p className="text-sm text-gray-500 mb-3">
              Stock: {product.stock} units
            </p>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xl font-bold text-green-600">
                  ${product.price}
                </span>
                {product.discount && product.discount > 0 && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                  </span>
                )}
              </div>
              <button 
                onClick={() => handleAddToCart(product)}
                disabled={!product.available}
                className={`px-4 py-2 rounded transition-colors ${
                  product.available 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.available ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;