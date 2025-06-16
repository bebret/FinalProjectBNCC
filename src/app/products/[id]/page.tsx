"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert('Added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-500 hover:text-blue-600"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-96 bg-gray-50 rounded-lg">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-4"
              />
            </div>

            <div className="space-y-6">
              <div>
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">★</span>
                  <span>{product.rating.rate}</span>
                  <span className="text-gray-500">({product.rating.count} reviews)</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 font-medium"
                >
                  Add to Cart
                </button>
                
                <button
                  onClick={() => router.push('/cart')}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 font-medium"
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
