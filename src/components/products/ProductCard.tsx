import React from 'react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      <p className="text-gray-700 mt-1">${product.price}</p>
      <Button onClick={handleAddToCart} className="mt-4 w-full">
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;