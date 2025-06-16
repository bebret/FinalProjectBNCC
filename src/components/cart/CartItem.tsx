import React from 'react';
import { CartItemProps } from '../../types/cart';

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
                <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center">
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                <button onClick={() => onRemove(item.id)} className="ml-4 text-red-500">Remove</button>
            </div>
        </div>
    );
};

export default CartItem;