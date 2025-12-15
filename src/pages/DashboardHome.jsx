import React from 'react';
import { getRole } from '../utils/secureStorage';

const DashboardHome = () => {
    const user = localStorage.getItem('user');
    const parseUser = JSON.parse(user);
    const role = getRole();
    // Capitalize first letter for display
    const displayRole = role.charAt(0).toUpperCase() + role.slice(1);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">
                Welcome {`${parseUser?.firstName ? parseUser?.firstName : displayRole}`}
            </h1>
        </div>
    );
};

export default DashboardHome;
