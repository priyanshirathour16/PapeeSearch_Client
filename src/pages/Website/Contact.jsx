import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaLongArrowAltRight } from 'react-icons/fa';

// Reusable Components matching other forms
const IconInput = ({ icon: Icon, ...props }) => (
    <div className="flex bg-[#f1f1f1] border border-[#e5e5e5] rounded-sm overflow-hidden mb-3 h-10">
        <div className="w-10 flex items-center justify-center bg-[#e0e0e0] text-[#666] border-r border-[#ccc]">
            <Icon className="text-sm" />
        </div>
        <input
            {...props}
            className="flex-1 px-3 py-2 bg-[#f1f1f1] focus:bg-white focus:outline-none text-[13px] text-gray-700 placeholder-gray-500"
        />
    </div>
);

const SelectInput = ({ icon: Icon, options, ...props }) => (
    <div className="flex bg-[#f1f1f1] border border-[#e5e5e5] rounded-sm overflow-hidden mb-3 h-10">
        <div className="w-10 flex items-center justify-center bg-[#e0e0e0] text-[#666] border-r border-[#ccc]">
            <Icon className="text-sm" />
        </div>
        <select
            {...props}
            className="flex-1 px-3 py-2 bg-[#f1f1f1] focus:bg-white focus:outline-none text-[13px] text-gray-700 placeholder-gray-500 appearance-none"
        >
            {props.children}
        </select>
    </div>
);

const Contact = () => {
    const [captchaCode, setCaptchaCode] = useState('');

    useEffect(() => {
        // Generate random 4 digit code
        setCaptchaCode(Math.floor(1000 + Math.random() * 9000).toString());
    }, []);

    return (
        <div className="py-8 bg-white min-h-screen font-sans">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl text-[#12b48b] font-normal relative inline-block">
                                ELK's <span className="text-[#12b48b]">Contact Us</span>
                                {/* <span className="absolute bottom-[-5px] left-0 w-12 h-1 bg-[#12b48b]"></span> */}
                            </h1>
                        </div>

                        {/* Form Section */}
                        <div className="w-full mx-4">
                            {/* Form Header with Green Left Border */}
                            <div className="bg-[#204066] py-1 px-4 mb-6 border-l-[5px] border-[#12b48b]">
                                <h2 className="text-white text-[16px] font-normal uppercase tracking-wide">GENERAL ENQUIRY</h2>
                            </div>

                            <form className="space-y-1">
                                <IconInput icon={FaUser} type="text" placeholder="Full Name *" />
                                <IconInput icon={FaEnvelope} type="email" placeholder="Email ID *" />
                                <IconInput icon={FaPhone} type="text" placeholder="Phone No *" />
                                <IconInput icon={FaMapMarkerAlt} type="text" placeholder="City *" />

                                <SelectInput icon={FaBuilding}>
                                    <option value="">Choose Department</option>
                                    <option value="Publications">Publications</option>
                                    <option value="Editorial">Editorial</option>
                                    <option value="Conference">Conference</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Others">Others</option>
                                </SelectInput>

                                <div className="mb-4">
                                    <div className="bg-[#f1f1f1] border border-[#e5e5e5] rounded-sm p-3">
                                        <textarea
                                            rows="5"
                                            className="w-full bg-transparent focus:outline-none text-[13px] text-gray-700 placeholder-gray-500 resize-y"
                                            placeholder="Message*"
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Captcha Section */}
                                <div className="flex flex-col md:flex-row justify-between items-start mt-6 gap-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <input
                                                        key={i}
                                                        type="text"
                                                        maxLength="1"
                                                        className="w-10 h-10 border border-gray-400 text-center text-lg focus:outline-none focus:border-black"
                                                    />
                                                ))}
                                            </div>
                                            <div className="bg-[#48637c] text-white h-10 flex items-center px-4 text-lg font-medium tracking-widest min-w-[70px] justify-center shadow-sm">
                                                {captchaCode}
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-gray-500 mt-1">Enter Code As Seen</span>
                                    </div>

                                    <div className="text-center md:text-right flex flex-col items-end">
                                        <p className="text-[#c45500] text-[12px] mb-8">(*) represents mandatory fields</p>

                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center px-6 py-2 bg-[#12b48b] text-white text-sm font-bold rounded-full hover:bg-[#0e9f7a] transition-colors uppercase gap-2"
                                        >
                                            SUBMIT
                                            <FaLongArrowAltRight className="text-sm" />
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <a href="https://x.com/ElkJournals" target="_blank" rel="noopener noreferrer" className="text-[#204066] text-[11px] hover:underline">Tweets by @ElkJournals</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;