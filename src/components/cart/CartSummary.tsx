import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartSummary: React.FC = () => {
    const { cartItems } = useContext(CartContext);

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="p-4 border-t border-gray-200">
            <h2 className="text-lg font-semibold">Cart Summary</h2>
            <div className="mt-2">
                <p className="text-sm">Total Items: {cartItems.length}</p>
                <p className="text-lg font-bold">Total Amount: ${totalAmount.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CartSummary;