import React, { useState, useEffect } from "react";
import { FaLongArrowAltRight, FaUserSecret, FaPhone } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdMap, MdPinDrop, MdSchool, MdAttachFile } from "react-icons/md";
import { BiUser } from "react-icons/bi";

const ScholarshipForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        institute: "",
        file: null,
        captchaInput: ""
    });

    const [captcha, setCaptcha] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Generate random 4-digit captcha
        setCaptcha(Math.floor(1000 + Math.random() * 9000).toString());
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = "First Name is required";
        if (!formData.lastName) newErrors.lastName = "Last Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.zip) newErrors.zip = "Zipcode is required";
        if (!formData.phone) newErrors.phone = "Phone No is required";
        // Simple captcha check
        if (formData.captchaInput !== captcha) newErrors.captcha = "Invalid Captcha";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert("Form submitted successfully!");
            // Proceed with submission logic (API call)
        }
    };

    return (
        <form className="common-form" onSubmit={handleSubmit}>
            <h2 className="title-heading text-xl font-bold mb-6 text-gray-800 border-b pb-2">Scholarships</h2>

            {/* Personal Details */}
            <fieldset className="mb-6 border border-gray-200 p-4 rounded bg-gray-50">
                <legend className="text-right px-2 text-sm text-gray-600 font-semibold">Personal Details:</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group relative">
                        <span className="absolute left-3 top-3 text-gray-400"><BiUser /></span>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name *"
                            className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <span className="text-xs text-red-500 block mt-1">{errors.firstName}</span>}
                    </div>

                    <div className="form-group relative">
                        <span className="absolute left-3 top-3 text-gray-400"><BiUser /></span>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name *"
                            className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <span className="text-xs text-red-500 block mt-1">{errors.lastName}</span>}
                    </div>

                    <div className="form-group relative">
                        <span className="absolute left-3 top-3 text-gray-400"><FaUserSecret /></span>
                        <input
                            type="text"
                            name="gender"
                            placeholder="Gender *"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            value={formData.gender}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group relative">
                        <span className="absolute left-3 top-3 text-gray-400"><MdEmail /></span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email ID *"
                            className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="text-xs text-red-500 block mt-1">{errors.email}</span>}
                    </div>
                </div>
            </fieldset>

            {/* Contact Details */}
            <fieldset className="mb-6 border border-gray-200 p-4 rounded bg-gray-50">
                <legend className="text-right px-2 text-sm text-gray-600 font-semibold">Contact Details:</legend>
                <div className="space-y-4">
                    <div className="form-group relative">
                        <span className="absolute left-3 top-3 text-gray-400"><MdLocationOn /></span>
                        <textarea
                            name="address"
                            placeholder="Address *"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 h-24"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group relative">
                            <span className="absolute left-3 top-3 text-gray-400"><MdLocationOn /></span>
                            <input
                                type="text"
                                name="city"
                                placeholder="City *"
                                className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.city}
                                onChange={handleChange}
                            />
                            {errors.city && <span className="text-xs text-red-500 block mt-1">{errors.city}</span>}
                        </div>

                        <div className="form-group relative">
                            <span className="absolute left-3 top-3 text-gray-400"><MdMap /></span>
                            <input
                                type="text"
                                name="state"
                                placeholder="State *"
                                className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.state}
                                onChange={handleChange}
                            />
                            {errors.state && <span className="text-xs text-red-500 block mt-1">{errors.state}</span>}
                        </div>

                        <div className="form-group relative">
                            <span className="absolute left-3 top-3 text-gray-400"><MdPinDrop /></span>
                            <input
                                type="text"
                                name="zip"
                                placeholder="Zipcode *"
                                className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.zip}
                                onChange={handleChange}
                            />
                            {errors.zip && <span className="text-xs text-red-500 block mt-1">{errors.zip}</span>}
                        </div>

                        <div className="form-group relative">
                            <span className="absolute left-3 top-3 text-gray-400"><FaPhone /></span>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone No *"
                                className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <span className="text-xs text-red-500 block mt-1">{errors.phone}</span>}
                        </div>
                    </div>
                </div>
            </fieldset>

            {/* Organization & Documentation */}
            <fieldset className="mb-6 border border-gray-200 p-4 rounded bg-gray-50">
                <legend className="text-right px-2 text-sm text-gray-600 font-semibold">Organization & Documentation Details:</legend>
                <div className="space-y-4">
                    <div className="form-group relative">
                        <span className="absolute left-3 top-3 text-gray-400"><MdSchool /></span>
                        <input
                            type="text"
                            name="institute"
                            placeholder="Institute/ University *"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 relative z-10 bg-transparent"
                            value={formData.institute}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group relative">
                        <span className="absolute left-3 top-3 text-gray-400 z-0"><MdAttachFile /></span>
                        <input
                            type="file"
                            name="file"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </fieldset>

            {/* Captcha & Submit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-1">
                            <input
                                type="text"
                                name="captchaInput"
                                maxLength="4"
                                className="w-24 px-2 py-2 border border-gray-300 rounded text-center tracking-widest"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="bg-[#4A6983] text-white px-4 py-2 rounded font-bold tracking-widest select-none">
                            {captcha}
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">Enter Code As Seen</p>
                    {errors.captcha && <p className="text-xs text-red-500">{errors.captcha}</p>}
                </div>

                <div className="text-right">
                    <p className="text-xs text-red-500 mb-2">(*) represents mandatory fields</p>
                    <button
                        type="submit"
                        className="bg-[#204066] hover:bg-[#1a3352] text-white px-6 py-2 rounded flex items-center gap-2 ml-auto transition-colors"
                    >
                        Submit <FaLongArrowAltRight />
                    </button>
                </div>
            </div>

        </form>
    );
};

export default ScholarshipForm;
