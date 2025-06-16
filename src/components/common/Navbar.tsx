import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-lg font-bold">
                    E-Commerce
                </Link>
                <div className="flex space-x-4">
                    <Link href="/" className="text-gray-300 hover:text-white">
                        Home
                    </Link>
                    <Link href="/cart" className="text-gray-300 hover:text-white">
                        Cart
                    </Link>
                    <Link href="/login" className="text-gray-300 hover:text-white">
                        Login
                    </Link>
                    <Link href="/register" className="text-gray-300 hover:text-white">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;