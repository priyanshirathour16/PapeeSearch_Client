import React, { useState } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-md h-16 flex items-center justify-end px-6 relative z-10">
            <div className="relative">
                <button
                    className="flex items-center space-x-2 focus:outline-none hover:text-blue-600 transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <span className="font-medium text-gray-700">Admin</span>
                    <FaUserCircle className="text-3xl text-gray-600" />
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <FaSignOutAlt className="mr-2" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
