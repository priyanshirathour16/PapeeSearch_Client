import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaLongArrowAltRight, FaUser, FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { authApi, conferenceApi } from '../../services/api';
import NewsWidget from "../../components/Website/NewsWidget";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Verify Email, 2: Reset Password
    const [userData, setUserData] = useState(null);
    const [upcomingConferences, setUpcomingConferences] = useState([]);

    React.useEffect(() => {
        const fetchConferences = async () => {
            try {
                const response = await conferenceApi.getAll();
                if (response.data && response.data.success && Array.isArray(response.data.success)) {
                    const upcoming = response.data.success
                        .filter(c => new Date(c.start_date) > new Date())
                        .slice(0, 5);
                    setUpcomingConferences(upcoming);
                }
            } catch (error) {
                console.error("Failed to fetch conferences", error);
            }
        };
        fetchConferences();
    }, []);

    const validationSchemaStep1 = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
    });

    const validationSchemaStep2 = Yup.object({
        newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: step === 1 ? validationSchemaStep1 : validationSchemaStep2,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                if (step === 1) {
                    const response = await authApi.verifyUser({ email: values.email });
                    if (response.data && response.data.success) {
                        setUserData(response.data);
                        setStep(2);
                        Swal.fire({
                            icon: 'success',
                            title: 'User Verified',
                            text: response.data.message || 'User found! Please enter your new password.',
                            confirmButtonColor: '#12b48b',
                            timer: 2000
                        });
                    }
                } else {
                    const payload = {
                        email: values.email,
                        role: userData.role, // Use the role returned from verification
                        newPassword: values.newPassword
                    };
                    const response = await authApi.resetPassword(payload);
                    if (response.data && response.data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Password Reset',
                            text: 'Your password has been reset successfully. Please login with your new password.',
                            confirmButtonColor: '#12b48b'
                        }).then(() => {
                            navigate('/become-an-editor'); // Or redirect to login page directly if separate
                        });
                    }
                }
            } catch (error) {
                console.error("Error:", error);
                const errorMessage = error.response?.data?.message || (error.response?.data?.error && error.response.data.error.message) || 'An error occurred. Please try again.';
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                    confirmButtonColor: '#12b48b'
                });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="pt-8 bg-white min-h-screen">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* LEFT COLUMN - Main Content */}
                    <div className="lg:col-span-3">
                        <div className="mb-6">
                            <h1 className="text-2xl text-[#12b48b] font-normal mb-2 relative inline-block">
                                ELK's Forgot Password
                                {/* <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-[#12b48b] transform translate-y-1"></span> */}
                            </h1>
                            <p className="text-sm text-gray-600 mt-2">Please enter your email id and send to recover your password.</p>
                        </div>

                        <div className="bg-white border border-gray-200 mt-8 max-w-2xl">
                            <h2 className="bg-[#204066] text-white text-lg font-medium py-3 px-4 text-center uppercase">
                                {step === 1 ? 'RECOVER PASSWORD' : 'RESET PASSWORD'}
                            </h2>
                            <div className="p-6">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="space-y-4">
                                        {/* Email Input - Always visible but readOnly in Step 2 */}
                                        <div className="flex flex-col w-full">
                                            <div className={`flex bg-gray-100 border ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'} rounded overflow-hidden`}>
                                                <div className="w-12 flex items-center justify-center bg-[#444] text-white">
                                                    <FaEnvelope className="text-sm" />
                                                </div>
                                                <input
                                                    type="email"
                                                    placeholder="Email ID"
                                                    {...formik.getFieldProps('email')}
                                                    readOnly={step === 2}
                                                    className={`flex-1 px-3 py-3 bg-white focus:outline-none text-sm text-gray-700 placeholder-gray-500 ${step === 2 ? 'bg-gray-100 text-gray-500' : ''}`}
                                                />
                                            </div>
                                            {formik.errors.email && formik.touched.email && <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>}
                                        </div>

                                        {step === 2 && (
                                            <>
                                                <div className="flex flex-col w-full">
                                                    <div className={`flex bg-gray-100 border ${formik.errors.newPassword && formik.touched.newPassword ? 'border-red-500' : 'border-gray-300'} rounded overflow-hidden`}>
                                                        <div className="w-12 flex items-center justify-center bg-[#444] text-white">
                                                            <FaLock className="text-sm" />
                                                        </div>
                                                        <input
                                                            type="password"
                                                            placeholder="New Password"
                                                            {...formik.getFieldProps('newPassword')}
                                                            className="flex-1 px-3 py-3 bg-white focus:outline-none text-sm text-gray-700 placeholder-gray-500"
                                                        />
                                                    </div>
                                                    {formik.errors.newPassword && formik.touched.newPassword && <div className="text-red-500 text-xs mt-1">{formik.errors.newPassword}</div>}
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <div className={`flex bg-gray-100 border ${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded overflow-hidden`}>
                                                        <div className="w-12 flex items-center justify-center bg-[#444] text-white">
                                                            <FaLock className="text-sm" />
                                                        </div>
                                                        <input
                                                            type="password"
                                                            placeholder="Confirm Password"
                                                            {...formik.getFieldProps('confirmPassword')}
                                                            className="flex-1 px-3 py-3 bg-white focus:outline-none text-sm text-gray-700 placeholder-gray-500"
                                                        />
                                                    </div>
                                                    {formik.errors.confirmPassword && formik.touched.confirmPassword && <div className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</div>}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center mt-6">
                                        <div className="flex gap-4 text-sm text-[#204066]">
                                            <Link to="/login" className="flex items-center gap-1 hover:underline font-medium">
                                                <FaLock className="text-xs" /> Login
                                            </Link>
                                            <span className="text-gray-400">|</span>
                                            <Link to="/become-an-editor" className="flex items-center gap-1 hover:underline font-medium">
                                                <FaPlus className="text-xs" /> Create Account
                                            </Link>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={formik.isSubmitting}
                                            className="bg-[#009e75] text-white px-6 py-2 shadow hover:bg-[#008c68] flex items-center gap-2 font-bold transition-colors disabled:opacity-70 uppercase text-sm"
                                        >
                                            {formik.isSubmitting ? 'PROCESSING...' : (step === 1 ? 'SUBMIT' : 'RESET PASSWORD')} <FaLongArrowAltRight />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <NewsWidget />
                        <div>
                            <h3 className="bg-[#12b48b] text-white font-bold p-3 text-sm uppercase">UPCOMING CONFERENCES</h3>
                            <div className="bg-white border border-gray-200 p-2 min-h-[100px] flex text-gray-500 text-sm">
                                {upcomingConferences.length > 0 ? (
                                    <ul className="space-y-3 mt-2 w-full">
                                        {upcomingConferences.map((conf, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600 border-b border-gray-100 last:border-0 pb-2">
                                                <div className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400">
                                                    {/* Custom calendar icon to match design if needed, or re-use existing icon */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                    </svg>
                                                </div>
                                                <Link to={`/conference/${conf.id}`} className="hover:text-[#12b48b] transition-colors line-clamp-2">
                                                    {conf.name} {/* Using 'name' property instead of name/title if consistent */}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-left w-full p-2">
                                        <p className="text-xs text-gray-500">No upcoming conferences.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
