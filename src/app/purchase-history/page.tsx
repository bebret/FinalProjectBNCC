import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

const PurchaseHistoryPage = () => {
    const { user } = useContext(AuthContext);
    const { purchaseHistory } = useContext(CartContext);

    if (!user) {
        return <div>Please log in to view your purchase history.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Purchase History</h1>
            {purchaseHistory.length === 0 ? (
                <p>No purchase history found.</p>
            ) : (
                <ul>
                    {purchaseHistory.map((purchase, index) => (
                        <li key={index} className="border-b py-2">
                            <h2 className="font-semibold">Order #{purchase.id}</h2>
                            <p>Date: {new Date(purchase.date).toLocaleDateString()}</p>
                            <p>Total: ${purchase.total.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PurchaseHistoryPage;