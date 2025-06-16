import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            {user ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    {/* Add more user information as needed */}
                </div>
            ) : (
                <p className="text-red-500">No user information available. Please log in.</p>
            )}
        </div>
    );
};

export default ProfilePage;