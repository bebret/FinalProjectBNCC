"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PurchaseItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Purchase {
  id: string;
  date: string;
  items: PurchaseItem[];
  total: number;
  status: 'completed' | 'processing' | 'shipped';
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

const PurchaseHistoryPage = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Get purchase history from localStorage
    const purchaseHistory = localStorage.getItem('purchaseHistory');
    if (purchaseHistory) {
      setPurchases(JSON.parse(purchaseHistory));
    } else {
      // Generate some sample purchase history for demo
      const samplePurchases: Purchase[] = [
        {
          id: 'ORD-001',
          date: '2025-01-01',
          items: [
            {
              id: 1,
              title: 'iPhone 15 Pro',
              price: 999.99,
              quantity: 1,
              image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
            },
            {
              id: 2,
              title: 'AirPods Pro',
              price: 249.99,
              quantity: 1,
              image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'
            }
          ],
          total: 1249.98,
          status: 'completed'
        },
        {
          id: 'ORD-002',
          date: '2025-01-15',
          items: [
            {
              id: 3,
              title: 'MacBook Air M2',
              price: 1199.99,
              quantity: 1,
              image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'
            }
          ],
          total: 1199.99,
          status: 'shipped'
        }
      ];
      setPurchases(samplePurchases);
      localStorage.setItem('purchaseHistory', JSON.stringify(samplePurchases));
    }

    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-6">
                <svg className="mx-auto w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6M8 11H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Login Required</h2>
              <p className="text-gray-600 mb-6">You need to log in to view your purchase history.</p>
              <div className="space-x-4">
                <button
                  onClick={() => router.push('/login')}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push('/register')}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Purchase History</h1>
          
          {purchases.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-6">
                <svg className="mx-auto w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6M8 11H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">No Purchase History</h2>
              <p className="text-gray-600 mb-6">You haven't made any purchases yet.</p>
              <button
                onClick={() => router.push('/products')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-medium"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {purchases.map((purchase) => (
                <div key={purchase.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Order #{purchase.id}
                        </h3>
                        <p className="text-gray-600">
                          {new Date(purchase.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(purchase.status)}`}>
                          {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                        </span>
                        <p className="text-lg font-bold text-green-600 mt-1">
                          ${purchase.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-800 mb-3">Items:</h4>
                      <div className="space-y-3">
                        {purchase.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-800">{item.title}</h5>
                              <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-800">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <div className="space-x-4">
                          <button className="text-blue-500 hover:text-blue-600 font-medium">
                            View Details
                          </button>
                          {purchase.status === 'completed' && (
                            <button className="text-green-500 hover:text-green-600 font-medium">
                              Download Invoice
                            </button>
                          )}
                          {purchase.status === 'shipped' && (
                            <button className="text-purple-500 hover:text-purple-600 font-medium">
                              Track Package
                            </button>
                          )}
                        </div>
                        <div>
                          <button
                            onClick={() => router.push('/products')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-medium"
                          >
                            Buy Again
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryPage;