"use client"

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProductContext } from '../../../context/ProductContext';
import { useCart } from '../../../context/CartContext';

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

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { products } = useContext(ProductContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`);
        if (!response.ok) throw new Error('Product not found');
        
        const data = await response.json();
        
        // Add mock data
        const enhancedProduct = {
          ...data,
          rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
          stock: Math.floor(Math.random() * 100) + 1,
          discount: Math.floor(Math.random() * 50),
          reviews: Math.floor(Math.random() * 500) + 1,
          available: Math.random() > 0.1
        };
        
        setProduct(enhancedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0] || '/placeholder-image.jpg'
        });
      }
      alert(`${quantity} ${product.title}(s) added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          ← Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <img
                  src={product.images[selectedImage] || '/placeholder-image.jpg'}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                  }}
                />
              </div>
              
              {/* Image Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedImage(index)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
                <p className="text-blue-600 font-medium">{product.category.name}</p>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="text-lg font-semibold ml-1">{product.rating?.toFixed(1)}</span>
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-green-600">${product.price}</span>
                  {product.discount && product.discount > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-gray-500 line-through">
                        ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                      </span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                        -{product.discount}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.available ? (
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 font-medium">In Stock ({product.stock} units)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              {product.available && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="font-medium text-lg min-w-[40px] text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="mb-8">
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.available}
                  className={`w-full py-3 px-6 rounded-lg font-medium text-lg transition-colors ${
                    product.available 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.available ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;