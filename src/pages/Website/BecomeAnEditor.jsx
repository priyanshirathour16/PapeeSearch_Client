import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUniversity, FaBuilding, FaListOl, FaTh, FaFileImage, FaFileAlt, FaKeyboard, FaPencilAlt, FaCheckSquare, FaPlus, FaLongArrowAltRight, FaCity, FaTrash, FaLock, FaGlobe, FaCloudUploadAlt } from "react-icons/fa";
import { MdSchool, MdLocationOn } from "react-icons/md";
import { countries, specializations, journalOptions } from '../../data/signUpData';
import Footer from '../../components/Website/Footer';

// Reusable Components matching ManuscriptForm style
const IconInput = ({ icon: Icon, ...props }) => (
    <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
        <div className="w-14 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300 p-3">
            <Icon className="text-sm" />
        </div>
        <input
            {...props}
            className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700 placeholder-gray-500"
        />
    </div>
);

const SelectInput = ({ icon: Icon, options, ...props }) => (
    <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
        <div className="w-14 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300 p-3">
            <Icon className="text-sm" />
        </div>
        <select
            {...props}
            className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700 placeholder-gray-500"
        >
            {props.children}
        </select>
    </div>
);

const FormSection = ({ title, children }) => (
    <fieldset className="mb-8 border border-gray-300 px-6 pb-6  rounded">
        <legend className="px-2 text-[#12b48b] font-medium text-lg">
            {title}
        </legend>
        {children}
    </fieldset>
);

const BecomeAnEditor = () => {
    const [activeTab, setActiveTab] = useState('author');
    const [captcha, setCaptcha] = useState(Math.floor(1000 + Math.random() * 9000));

    return (
        <div className="py-8 bg-white min-h-screen">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* LEFT COLUMN - Main Content */}
                    <div className="lg:col-span-3">
                        <div className="mb-6">
                            <h1 className="text-2xl text-[#12b48b] font-normal mb-2 uppercase">ELK’s Sign Up</h1>
                            <p className="text-sm text-gray-600">Just spend a minute in filling the details below to create your account with us.</p>
                            <h2 className="text-xl text-[#12b48b] font-normal mt-6 mb-4 uppercase">SIGN UP</h2>
                        </div>

                        {/* Tabs */}
                        <div className="flex mb-6">
                            <button
                                onClick={() => setActiveTab('author')}
                                className={`flex-1 py-3 text-center text-lg font-medium relative ${activeTab === 'author'
                                    ? 'bg-[#12b48b] text-white'
                                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                    }`}
                            >
                                Author
                                {activeTab === 'author' && (
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-[#12b48b] border-r-[10px] border-r-transparent"></div>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('editor')}
                                className={`flex-1 py-3 text-center text-lg font-medium relative ${activeTab === 'editor'
                                    ? 'bg-[#12b48b] text-white'
                                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                    }`}
                            >
                                Editor
                                {activeTab === 'editor' && (
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-[#12b48b] border-r-[10px] border-r-transparent"></div>
                                )}
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-8">
                            {activeTab === 'author' ? (
                                <div>
                                    <div className="text-sm text-gray-600 mb-6 space-y-2">
                                        <p>In order to submit your manuscript online, kindly register as an author using the form given below. Once registered, you can submit the manuscript online through your author’s panel. Your Author Account will help you to:</p>
                                        <ul className="list-none space-y-1">
                                            <li className="flex items-center gap-2"><FaCheckSquare className="text-gray-500 text-xs" /> Conveniently complete 1-step Online manuscript submission</li>
                                            <li className="flex items-center gap-2"><FaCheckSquare className="text-gray-500 text-xs" /> 'Save as draft' option to save the entered manuscript details and submit later</li>
                                            <li className="flex items-center gap-2"><FaCheckSquare className="text-gray-500 text-xs" /> Easily track the status of manuscript publication process</li>
                                        </ul>
                                        <p>Please fill in the asked details below. In case of any doubts or inconvenience, you can drop an email at <a href="mailto:support@elkjournals.com" className="text-blue-600 hover:underline">support@elkjournals.com</a>.</p>
                                    </div>

                                    <form className="space-y-6">
                                        <FormSection title="Personal Details:">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <IconInput icon={FaUser} type="text" placeholder="First Name *" />
                                                <IconInput icon={FaUser} type="text" placeholder="Last Name *" />
                                                <IconInput icon={FaEnvelope} type="email" placeholder="Email ID *" />
                                                <IconInput icon={FaEnvelope} type="email" placeholder="Confirm Email ID *" />
                                                <IconInput icon={FaLock} type="password" placeholder="Password *" />
                                                <IconInput icon={FaLock} type="password" placeholder="Confirm Password *" />
                                            </div>
                                        </FormSection>

                                        <FormSection title="Contact Details:">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-gray-100 border border-gray-300 rounded overflow-hidden flex">
                                                    <div className="w-14 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                                                        <FaMapMarkerAlt className="text-sm" />
                                                    </div>
                                                    <textarea placeholder="Address *" className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700 h-10 resize-none pt-2"></textarea>
                                                </div>
                                                <IconInput icon={MdLocationOn} type="text" placeholder="City *" />
                                                <IconInput icon={FaMapMarkerAlt} type="text" placeholder="State *" />
                                                <IconInput icon={FaMapMarkerAlt} type="text" placeholder="Near Land Mark *" />
                                                <IconInput icon={FaMapMarkerAlt} type="text" placeholder="Pincode *" />
                                                <SelectInput icon={FaGlobe} placeholder="Select Country">
                                                    <option value="">Please Select</option>
                                                    {countries.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                                                </SelectInput>
                                                <IconInput icon={FaPhone} type="text" placeholder="ISD" readOnly className="w-1/3" />
                                                {/* Note: The design had split ISD/Phone, simplistic merging here or keeping separate */}
                                                <IconInput icon={FaPhone} type="text" placeholder="Contact Number" />
                                                <IconInput icon={FaPhone} type="text" placeholder="Alternative Contact Number" />
                                            </div>
                                        </FormSection>

                                        <FormSection title="Educational Details:">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <IconInput icon={MdSchool} type="text" placeholder="Educational Qualification *" />
                                                <SelectInput icon={FaListOl}>
                                                    <option value="">Please Select Area of Specialisation</option>
                                                    {specializations.map((s, i) => <option key={i} value={s}>{s}</option>)}
                                                </SelectInput>
                                                <div className="md:col-span-2">
                                                    <IconInput icon={FaUniversity} type="text" placeholder="Institute/ University *" />
                                                </div>
                                            </div>
                                        </FormSection>

                                        <FormSection title="Your organization, role and field of interest:">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <IconInput icon={FaUser} type="text" placeholder="Job Title" />
                                                <IconInput icon={FaBuilding} type="text" placeholder="Organization Name *" />
                                                <div className="md:col-span-2">
                                                    <SelectInput icon={FaListOl}>
                                                        <option value="">Select your organization type</option>
                                                        <option value="Corporate">Corporate</option>
                                                        <option value="University">University</option>
                                                        <option value="Institute">Institute</option>
                                                        <option value="other">Other</option>
                                                    </SelectInput>
                                                </div>
                                            </div>
                                        </FormSection>

                                        <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4].map((_, i) => (
                                                        <input key={i} type="text" maxLength="1" className="w-10 h-10 border border-gray-400 text-center text-lg focus:outline-none focus:border-[#12b48b]" />
                                                    ))}
                                                </div>
                                                <div className="bg-[#567a9a] text-white px-4 py-2 font-bold text-lg tracking-widest">
                                                    {captcha}
                                                </div>
                                            </div>
                                            <p className="text-[#e85a4f] text-sm font-medium">(*) represents mandatory fields</p>
                                        </div>
                                        <div className="mb-6">
                                            <span className="text-[10px] uppercase text-gray-500 tracking-wider">Enter Code As Seen</span>
                                        </div>

                                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                                            <div className="flex gap-4 text-sm text-gray-600">
                                                <a href="#" className="flex items-center gap-1 hover:text-[#12b48b]"><FaUser className="text-gray-400" /> Find My Account</a>
                                                <span>|</span>
                                                <a href="#" className="flex items-center gap-1 hover:text-[#12b48b]"><FaLock className="text-gray-400" /> Login</a>
                                            </div>
                                            <button type="submit" className="bg-[#12b48b] text-white px-10 py-2 rounded-full shadow hover:bg-[#0e9f7a] flex items-center gap-2 font-bold transition-colors">
                                                SUBMIT <FaLongArrowAltRight />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-sm text-gray-600 mb-6">Your public profile at ELK Asia Pacific Journals will speak for your contributions to the research community. So, be our valuable resource and solicit your achievements on our editorial board.<br /><br />Just spend a minute in filling the details below to create your account with us.</p>

                                    <form className="space-y-6">
                                        <FormSection title="Personal Details:">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <SelectInput icon={FaFileAlt}>
                                                    <option value="">Select Journal</option>
                                                    {journalOptions.map((group, i) => (
                                                        <optgroup key={i} label={group.label}>
                                                            {group.options.map((opt, j) => (
                                                                <option key={j} value={opt.value}>{opt.label}</option>
                                                            ))}
                                                        </optgroup>
                                                    ))}
                                                </SelectInput>
                                                <SelectInput icon={FaUser}>
                                                    <option value="Dr.">Dr</option>
                                                    <option value="Prof.">Prof</option>
                                                    <option value="Er.">Er</option>
                                                </SelectInput>
                                                <IconInput icon={FaUser} type="text" placeholder="First Name *" />
                                                <IconInput icon={FaUser} type="text" placeholder="Last Name *" />
                                                <IconInput icon={FaEnvelope} type="email" placeholder="Email ID *" />
                                                <IconInput icon={FaEnvelope} type="email" placeholder="Confirm Email ID *" />
                                                <IconInput icon={FaLock} type="password" placeholder="Password *" />
                                                <IconInput icon={FaLock} type="password" placeholder="Confirm Password *" />
                                            </div>
                                        </FormSection>

                                        <FormSection title="Educational Details:">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <IconInput icon={MdSchool} type="text" placeholder="Educational Qualification *" />
                                                <SelectInput icon={FaListOl}>
                                                    <option value="">Please Select</option>
                                                    {specializations.map((s, i) => <option key={i} value={s}>{s}</option>)}
                                                </SelectInput>
                                                <div className="md:col-span-2">
                                                    <IconInput icon={FaUniversity} type="text" placeholder="Institute/ University *" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                                                        <div className="w-14 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                                                            <FaCloudUploadAlt className="text-sm" />
                                                        </div>
                                                        <div className="flex-1 px-3 py-2 bg-gray-100 flex items-center justify-between">
                                                            <input type="file" className="text-sm text-gray-600 w-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-xs text-red-600 font-bold mt-2">Note : Click upload to attach your file. Adobe Pdf (or) Word Document Format Only</p>
                                        </FormSection>


                                        <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4].map((_, i) => (
                                                        <input key={i} type="text" maxLength="1" className="w-10 h-10 border border-gray-400 text-center text-lg focus:outline-none focus:border-[#12b48b]" />
                                                    ))}
                                                </div>
                                                <div className="bg-[#567a9a] text-white px-4 py-2 font-bold text-lg tracking-widest">
                                                    {captcha}
                                                </div>
                                            </div>
                                            <div className="flex-1 text-right">
                                                <p className="text-[#e85a4f] text-sm font-medium">(*) represents mandatory fields</p>
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <span className="text-[10px] uppercase text-gray-500 tracking-wider">Enter Code As Seen</span>
                                        </div>

                                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                                            <div className="flex gap-4 text-sm text-gray-600">
                                                <a href="#" className="flex items-center gap-1 hover:text-[#12b48b]"><FaUser className="text-gray-400" /> Find My Account</a>
                                                <span>|</span>
                                                <a href="#" className="flex items-center gap-1 hover:text-[#12b48b]"><FaLock className="text-gray-400" /> Login</a>
                                            </div>
                                            <button type="submit" className="bg-[#12b48b] text-white px-10 py-2 rounded-full shadow hover:bg-[#0e9f7a] flex items-center gap-2 font-bold transition-colors">
                                                SUBMIT <FaLongArrowAltRight />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="text-right">
                            <a href="#" className="text-[#204066] text-xs hover:underline">Tweets by @ElkJournals</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BecomeAnEditor