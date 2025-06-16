export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface Product {
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

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}