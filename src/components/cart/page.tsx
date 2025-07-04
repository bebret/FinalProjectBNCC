"use client"

import React from 'react';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  try {
    const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Add some products to get started!</p>
                <a 
                  href="/" 
                  className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white">
              {/* Cart Items - render langsung tanpa CartItem component */}
              <div className="space-y-4 mb-8">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-green-600 font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="font-medium text-gray-800 min-w-[20px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={clearCart}
                    className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('CartPage error:', error);
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Cart Error</h1>
          <p className="text-gray-600 mb-4">Something went wrong loading your cart.</p>
          <a 
            href="/" 
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }
};

export default CartPage;