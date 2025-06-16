import React from 'react';

interface CardProps {
    title: string;
    image: string;
    description: string;
    price: number;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, image, description, price, onClick }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" onClick={onClick}>
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-gray-700">{description}</p>
                <p className="text-xl font-bold mt-2">${price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Card;