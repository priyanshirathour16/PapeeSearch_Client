import React, { useState } from 'react';
import { FaUserCircle, FaSignOutAlt, FaKey, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authApi } from '../services/api';
import { getRole } from '../utils/secureStorage';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

    // Password Reset States
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const parseUser = user ? JSON.parse(user) : null;

    const handleLogout = () => {
        const role = getRole();
        localStorage.clear();
        if (role === 'author' || role === 'editor') {
            navigate('/login');
        } else {
            navigate('/admin/login');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setErrors({});
        setGeneralError("");

        const newErrors = {};
        if (!currentPassword) newErrors.currentPassword = "Current password is required";
        if (!newPassword) {
            newErrors.newPassword = "New password is required";
        } else if (newPassword.length < 6) {
            newErrors.newPassword = "New password must be at least 6 characters";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            await authApi.changePassword({ currentPassword, newPassword });

            setIsResetPasswordOpen(false);
            setCurrentPassword("");
            setNewPassword("");

            Swal.fire({
                title: "Success!",
                text: "Password changed successfully",
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "bg-[#12b48b] text-white px-6 py-2 rounded",
                }
            });
        } catch (error) {
            console.error(error);
            setGeneralError(error.response?.data?.message || "Failed to change password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <header className="bg-white shadow-md h-16 flex items-center justify-end px-6 relative z-10">
            <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
            >
                <button
                    className="flex items-center space-x-2 focus:outline-none hover:text-blue-600 transition-colors py-2 bg-transparent border-none shadow-none hover:bg-transparent hover:shadow-none"
                >
                    <span className="font-medium text-gray-700">{`${parseUser?.firstName ? parseUser?.firstName : "Admin"}`}</span>
                    <FaUserCircle className="text-3xl text-gray-600" />
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 top-full">
                        <button
                            onClick={() => setIsResetPasswordOpen(true)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <FaKey className="mr-2" />
                            Reset Password
                        </button>
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

            {/* Reset Password Modal */}
            {isResetPasswordOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl p-8 w-[400px] shadow-2xl transform transition-all scale-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Change Password</h2>

                        <form onSubmit={handleChangePassword} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Current Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => {
                                        setCurrentPassword(e.target.value);
                                        if (errors.currentPassword) setErrors({ ...errors, currentPassword: '' });
                                    }}
                                    className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#12b48b]/50 transition-all ${errors.currentPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                    placeholder="Enter current password"
                                />
                                {errors.currentPassword && <p className="text-red-500 text-xs mt-1 font-medium">{errors.currentPassword}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    New Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        if (errors.newPassword) setErrors({ ...errors, newPassword: '' });
                                    }}
                                    className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#12b48b]/50 transition-all ${errors.newPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                    placeholder="Min 6 characters"
                                />
                                {errors.newPassword && <p className="text-red-500 text-xs mt-1 font-medium">{errors.newPassword}</p>}
                            </div>

                            {generalError && (
                                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 font-medium">
                                    {generalError}
                                </div>
                            )}

                            <div className="flex gap-3 justify-end mt-8 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsResetPasswordOpen(false);
                                        setErrors({});
                                        setGeneralError("");
                                        setCurrentPassword("");
                                        setNewPassword("");
                                    }}
                                    className="px-5 py-2.5 bg-red-500 text-white font-medium hover:bg-red-600 rounded-lg transition-colors shadow-sm"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-[#12b48b] text-white font-medium rounded-lg hover:bg-[#0e9470] flex items-center gap-2 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading && <FaSpinner className="animate-spin" />}
                                    Change Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
