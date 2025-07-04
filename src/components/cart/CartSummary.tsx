import React from 'react';
import { useCart } from '../../context/CartContext';

const CartSummary: React.FC = () => {
    const { items, totalPrice } = useCart();

    return (
        <div className="p-4 border-t border-gray-200">
            <h2 className="text-lg font-semibold">Cart Summary</h2>
            <div className="mt-2">
                <p className="text-sm">Total Items: {items.length}</p>
                <p className="text-lg font-bold">Total Amount: ${totalPrice.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CartSummary;