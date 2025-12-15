import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarData } from '../data/sidebarData';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { getRole } from '../utils/secureStorage';

const Sidebar = () => {
    const [openSubMenu, setOpenSubMenu] = useState({});
    const location = useLocation();
    const role = getRole();

    const toggleSubMenu = (index) => {
        setOpenSubMenu((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // Filter sidebar items based on role
    const filteredSidebarData = sidebarData.filter(item => {
        return item?.access?.includes(role);
    });

    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col transition-all duration-300">
            <div className="p-4 text-2xl font-bold border-b border-gray-700 flex items-center justify-center capitalize">
                {role} Panel
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
                <ul>
                    {filteredSidebarData.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        const hasSubNav = item.subNav && item.subNav.length > 0;
                        const isOpen = openSubMenu[index];

                        const commonClasses = `flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-700 border-l-4 border-blue-500' : 'text-white'}`;
                        const content = (
                            <>
                                <div className="flex items-center space-x-3">
                                    {item.icon && <item.icon className="text-xl" />}
                                    <span className="font-medium">{item.title}</span>
                                </div>
                                {hasSubNav && (
                                    <div>
                                        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                )}
                            </>
                        );

                        return (
                            <li key={index} className="mb-1">
                                {hasSubNav ? (
                                    <div
                                        className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-700 border-l-4 border-blue-500' : ''}`}
                                        onClick={() => toggleSubMenu(index)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            {item.icon && <item.icon className="text-xl" />}
                                            <span className="font-medium">{item.title}</span>
                                        </div>
                                        <div>
                                            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-900  text-blue-400 dark:text-sky-400' : 'text-white'}`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            {item.icon && <item.icon className="text-xl" />}
                                            <span className="font-medium">{item.title}</span>
                                        </div>
                                    </Link>
                                )}
                                {hasSubNav && isOpen && (
                                    <ul className="bg-gray-900">
                                        {item.subNav.map((subItem, subIndex) => {
                                            const isSubActive = location.pathname === subItem.path;
                                            return (
                                                <li key={subIndex}>
                                                    <Link
                                                        to={subItem.path}
                                                        className={`flex items-center space-x-3 px-8 py-2 hover:bg-gray-800 transition-colors ${isSubActive ? 'text-blue-400' : 'text-gray-300'}`}
                                                    >
                                                        {subItem.icon && <subItem.icon />}
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div >
    );
};

export default Sidebar;
