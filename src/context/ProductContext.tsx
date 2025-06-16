"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  // Additional fields for filtering/sorting
  rating?: number;
  stock?: number;
  discount?: number;
  reviews?: number;
  available?: boolean;
}

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  priceRange: { min: number; max: number };
  sortBy: string;
  minRating: number;
  availabilityFilter: string; // 'all', 'available', 'unavailable'
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setPriceRange: (range: { min: number; max: number }) => void;
  setSortBy: (sort: string) => void;
  setMinRating: (rating: number) => void;
  setAvailabilityFilter: (filter: string) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  // Fetch products with mock additional data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();

        // Add mock data for rating, stock, discount, reviews, availability
        const enhancedProducts = data.map((product: any) => ({
          ...product,
          rating: Math.round((Math.random() * 4 + 1) * 10) / 10, // 1.0 - 5.0
          stock: Math.floor(Math.random() * 100) + 1, // 1-100
          discount: Math.floor(Math.random() * 50), // 0-50%
          reviews: Math.floor(Math.random() * 500) + 1, // 1-500
          available: Math.random() > 0.1, // 90% available
        }));

        setProducts(enhancedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category.name.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter((product) => (product.rating || 0) >= minRating);
    }

    // Filter by availability
    if (availabilityFilter !== "all") {
      filtered = filtered.filter((product) => {
        if (availabilityFilter === "available") return product.available;
        if (availabilityFilter === "unavailable") return !product.available;
        return true;
      });
    }

    // Sort products
    if (sortBy) {
      switch (sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "discount":
          filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
          break;
        case "stock":
          filtered.sort((a, b) => (b.stock || 0) - (a.stock || 0));
          break;
        case "reviews":
          filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
          break;
        case "name":
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy, minRating, availabilityFilter]);

  const value: ProductContextType = {
    products,
    filteredProducts,
    categories,
    loading,
    error,
    searchTerm,
    selectedCategory,
    priceRange,
    sortBy,
    minRating,
    availabilityFilter,
    setSearchTerm,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
    setMinRating,
    setAvailabilityFilter,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export { ProductContext };