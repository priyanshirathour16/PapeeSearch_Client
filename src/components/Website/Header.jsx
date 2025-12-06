import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronCircleRight, FaLongArrowAltRight, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/images/elk-logo.png";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };

    return (
        <header className="bg-[#2c4a6e] shadow-md sticky top-0 z-50">
            <div className="w-full px-[15px] mx-auto min-h-full sm:w-[750px] md:w-[970px] lg:w-[1170px]">
                <nav className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img src={Logo} alt="Logo" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-white hover:text-gray-200 focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                        {/* Top Menu */}
                        <div className="flex justify-end mb-2">
                            <ul className="flex space-x-4 text-sm">
                                <li>
                                    <Link
                                        to="/become-an-editor"
                                        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1 rounded flex items-center gap-1 transition-colors"
                                    >
                                        Become An Editor <FaChevronCircleRight className="text-xs" />
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Main Navigation */}
                        <ul className="flex space-x-6">
                            <li>
                                <Link to="/" className="text-white hover:text-gray-200 font-medium uppercase text-sm">
                                    HOME
                                </Link>
                            </li>

                            {/* About ELK Dropdown */}
                            <li className="relative group">
                                <button className="text-white hover:text-gray-200 font-medium flex items-center gap-1 uppercase text-sm">
                                    ABOUT ELK <FaChevronDown className="text-xs" />
                                </button>
                                {/* Full-width dropdown */}
                                <div className="fixed left-1/2 -translate-x-1/2 top-[70px] w-screen max-w-[1170px] bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-8 z-50">
                                    <div className="grid grid-cols-3 gap-6">
                                        {/* Publishing Policies Section */}
                                        <div>
                                            <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">PUBLISHING POLICIES</h3>
                                            <div className="space-y-2">
                                                <Link to="/open-access-and-licencing" className="block bg-gray-200 hover:bg-gray-300 px-4 py-3 rounded transition-colors">
                                                    <span className="text-gray-800 text-sm">Open Access & Licencing</span>
                                                </Link>
                                                <Link to="/ethical-guidelines" className="block bg-gray-200 hover:bg-gray-300 px-4 py-3 rounded transition-colors">
                                                    <span className="text-gray-800 text-sm">Ethical Guidelines</span>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Impact Factor Score Section */}
                                        <div>
                                            <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">IMPACT FACTOR SCORE</h3>
                                            <div className="space-y-2">
                                                <Link to="/impact-factor" className="block bg-gray-200 hover:bg-gray-300 px-4 py-3 rounded transition-colors">
                                                    <span className="text-gray-800 text-sm">Impact Factor</span>
                                                </Link>
                                                <Link to="/journal-indexing" className="block bg-gray-200 hover:bg-gray-300 px-4 py-3 rounded transition-colors">
                                                    <span className="text-gray-800 text-sm">Journal Indexing</span>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Action Buttons Section */}
                                        <div>
                                            <div className="bg-teal-500 p-6 rounded mb-4">
                                                <Link to="/meet-our-team" className="flex items-center justify-between text-white hover:text-gray-100">
                                                    <span className="font-semibold uppercase text-sm">MEET OUR TEAM</span>
                                                    <FaLongArrowAltRight className="text-xl" />
                                                </Link>
                                            </div>
                                            <div className="bg-[#2c4a6e] p-6 rounded">
                                                <Link to="/why-publish-with-us" className="flex items-center justify-between text-white hover:text-gray-100">
                                                    <span className="font-semibold uppercase text-sm">WHY PUBLISH WITH US?</span>
                                                    <FaLongArrowAltRight className="text-xl" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            {/* Journals Dropdown */}
                            <li className="relative group">
                                <button className="text-white hover:text-gray-200 font-medium flex items-center gap-1 uppercase text-sm">
                                    JOURNALS WE PUBLISH <FaChevronDown className="text-xs" />
                                </button>
                                {/* Full-width dropdown */}
                                <div className="fixed left-1/2 -translate-x-1/2 top-[70px] w-screen max-w-[1170px] bg-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-8 z-50">
                                    <div className="grid grid-cols-3 gap-6">
                                        {/* Column 1 */}
                                        <div className="space-y-4">
                                            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                                                <a href="/journal-of-marketing" className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl">📊</span>
                                                        <div>
                                                            <strong className="text-gray-800 text-sm">Marketing and Retail Management</strong><br />
                                                            <span className="text-xs text-gray-600">ISSN No: 2349-2317</span><br />
                                                            <span className="text-xs text-blue-600">JD Impact factor: 3.99</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                                                <a href="/journal-of-finance" className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl">💰</span>
                                                        <div>
                                                            <strong className="text-gray-800 text-sm">Finance and Risk Management</strong><br />
                                                            <span className="text-xs text-gray-600">ISSN No: 2349-2325</span><br />
                                                            <span className="text-xs text-blue-600">JD Impact factor: 3.456</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                                                <a href="/social-sciences" className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl">👥</span>
                                                        <div>
                                                            <strong className="text-gray-800 text-sm">Social Sciences</strong><br />
                                                            <span className="text-xs text-gray-600">ISSN No: 2394-9392</span><br />
                                                            <span className="text-xs text-blue-600">JD Impact factor: 2.546</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                                                <a href="/hr-management-and-organizational-behaviour" className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl">🧩</span>
                                                        <div>
                                                            <strong className="text-gray-800 text-sm">HR Management and Organizational Behaviour</strong><br />
                                                            <span className="text-xs text-gray-600">ISSN No: 2394-0409</span><br />
                                                            <span className="text-xs text-blue-600">JD Impact factor: 2.096</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                                                <a href="/computer-science-and-information-systems" className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl">💻</span>
                                                        <div>
                                                            <strong className="text-gray-800 text-sm">Computer Science and Information Systems</strong><br />
                                                            <span className="text-xs text-gray-600">ISSN No: 2394-0409</span><br />
                                                            <span className="text-xs text-blue-600">JD Impact factor: 2.026</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        {/* Column 2 */}
                                        <div className="space-y-4">
                                            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                                                <a href="/leadership-and-innovation-management" className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl">👥</span>
                                                        <div>
                                                            <strong className="text-gray-800 text-sm">Leadership and Innovation Management</strong><br />
                                                            <span className="text-xs text-gray-600">ISSN No: 2394-0417</span><br />
                                                            <span className="text-xs text-blue-600">JD Impact factor: 1.789</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                                                <a href="/civil-engineering-and-structural-development" className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl">🏢</span>
                                                        <div>
                                                            <strong className="text-gray-800 text-sm">Civil Engineering and Structural Development</strong><br />
                                                            <span className="text-xs text-gray-600">ISSN No: 2394-9341</span><br />
                                                            <span className="text-xs text-blue-600">JD Impact factor: 2.399</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                                                <a href="/mechanical-engineering-research" className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl">⚙️</span>
                                                        <div>
                                                            <strong className="text-gray-800 text-sm">Mechanical Engineering Research</strong><br />
                                                            <span className="text-xs text-gray-600">ISSN No: 2394-9368</span><br />
                                                            <span className="text-xs text-blue-600">JD Impact factor: 2.586</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                                                <a href="/applied-thermal-engineering" className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl">🌡️</span>
                                                        <div>
                                                            <strong className="text-gray-800 text-sm">Applied Thermal Engineering</strong><br />
                                                            <span className="text-xs text-gray-600">ISSN No: 2394-0433</span><br />
                                                            <span className="text-xs text-blue-600">JD Impact factor: 1.098</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                        {/* Column 3 */}
                                        <div className="space-y-4">
                                            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                                                <a href="/electronics-and-communication-technology" className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl">🔌</span>
                                                        <div>
                                                            <strong className="text-gray-800 text-sm">Electronics and Communication Technology</strong><br />
                                                            <span className="text-xs text-gray-600">ISSN No: 2394-935X</span><br />
                                                            <span className="text-xs text-blue-600">JD Impact factor: 2.002</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                                                <a href="/library-management-and-information-technology" className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl">📚</span>
                                                        <div>
                                                            <strong className="text-gray-800 text-sm">Library Management and Information Technology</strong><br />
                                                            <span className="text-xs text-gray-600">ISSN No: 2394-9384</span><br />
                                                            <span className="text-xs text-blue-600">JD Impact factor: 1.039</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                                                <a href="/project-management-and-control" className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl">📁</span>
                                                        <div>
                                                            <strong className="text-gray-800 text-sm">Project Management and Control</strong><br />
                                                            <span className="text-xs text-gray-600">ISSN No: 2394-9376</span><br />
                                                            <span className="text-xs text-blue-600">JD Impact factor: 1.156</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                                                <a href="/manufacturing-science-and-engineering" className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-2xl">🏭</span>
                                                        <div>
                                                            <strong className="text-gray-800 text-sm">Manufacturing Science and Engineering</strong><br />
                                                            <span className="text-xs text-gray-600">ISSN No: 2394-0425</span><br />
                                                            <span className="text-xs text-blue-600">JD Impact factor: 1.219</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            {/* Authors Area Dropdown */}
                            <li className="relative group">
                                <button className="text-white hover:text-gray-200 font-medium flex items-center gap-1 uppercase text-sm">
                                    AUTHORS AREA <FaChevronDown className="text-xs" />
                                </button>
                                {/* Full-width dropdown */}
                                <div className="fixed left-1/2 -translate-x-1/2 top-[70px] w-screen max-w-[1170px] bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-8 z-50">
                                    <div className="grid grid-cols-3 gap-4">
                                        {/* Row 1 */}
                                        <a href="/browse-journals" className="block bg-gray-200 hover:bg-gray-300 px-6 py-4 rounded transition-colors text-center">
                                            <span className="text-gray-800 text-sm font-medium">Browse Journals</span>
                                        </a>
                                        <a href="/authors-guidelines" className="block bg-gray-200 hover:bg-gray-300 px-6 py-4 rounded transition-colors text-center">
                                            <span className="text-gray-800 text-sm font-medium">Author's Guidelines</span>
                                        </a>
                                        <a href="/resources" className="block bg-gray-200 hover:bg-gray-300 px-6 py-4 rounded transition-colors text-center">
                                            <span className="text-gray-800 text-sm font-medium">Resources</span>
                                        </a>

                                        {/* Row 2 */}
                                        <a href="/view-call-for-papers" className="block bg-gray-200 hover:bg-gray-300 px-6 py-4 rounded transition-colors text-center">
                                            <span className="text-gray-800 text-sm font-medium">View Call for Papers</span>
                                        </a>
                                        <a href="/article-processing-charges" className="block bg-gray-200 hover:bg-gray-300 px-6 py-4 rounded transition-colors text-center">
                                            <span className="text-gray-800 text-sm font-medium">Article Processing Charges</span>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-[#2c4a6e] border-t border-gray-600 pb-4">
                        <ul className="space-y-2 mt-4">
                            <li>
                                <a href="/" className="block px-4 py-2 text-white hover:bg-[#3a5a8e]">
                                    HOME
                                </a>
                            </li>

                            {/* Mobile About ELK */}
                            <li>
                                <button
                                    onClick={() => toggleDropdown('about')}
                                    className="w-full text-left px-4 py-2 text-white hover:bg-[#3a5a8e] flex items-center justify-between"
                                >
                                    ABOUT ELK
                                    <FaChevronDown className={`text-xs transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                                </button>
                                {activeDropdown === 'about' && (
                                    <div className="bg-[#3a5a8e] px-6 py-2 space-y-2">
                                        <a href="/meet-our-team" className="block py-1 text-gray-200 hover:text-white">
                                            Meet our team
                                        </a>
                                        <a href="/why-publish-with-us" className="block py-1 text-gray-200 hover:text-white">
                                            Why publish with us?
                                        </a>
                                        <a href="/open-access-and-licencing" className="block py-1 text-gray-200 hover:text-white">
                                            Open Access &amp; Licencing
                                        </a>
                                        <a href="/ethical-guidelines" className="block py-1 text-gray-200 hover:text-white">
                                            Ethical Guidelines
                                        </a>
                                        <a href="/impact-factor" className="block py-1 text-gray-200 hover:text-white">
                                            Impact Factor
                                        </a>
                                        <a href="/journal-indexing" className="block py-1 text-gray-200 hover:text-white">
                                            Journal Indexing
                                        </a>
                                    </div>
                                )}
                            </li>

                            {/* Mobile Journals */}
                            <li>
                                <button
                                    onClick={() => toggleDropdown('journals')}
                                    className="w-full text-left px-4 py-2 text-white hover:bg-[#3a5a8e] flex items-center justify-between"
                                >
                                    JOURNALS WE PUBLISH
                                    <FaChevronDown className={`text-xs transition-transform ${activeDropdown === 'journals' ? 'rotate-180' : ''}`} />
                                </button>
                                {activeDropdown === 'journals' && (
                                    <div className="bg-[#3a5a8e] px-6 py-2 space-y-2 max-h-64 overflow-y-auto">
                                        <a href="/journal-of-marketing" className="block py-1 text-gray-200 hover:text-white text-sm">
                                            Marketing and Retail Management
                                        </a>
                                        <a href="/journal-of-finance" className="block py-1 text-gray-200 hover:text-white text-sm">
                                            Finance and Risk Management
                                        </a>
                                        <a href="/social-sciences" className="block py-1 text-gray-200 hover:text-white text-sm">
                                            Social Sciences
                                        </a>
                                        <a href="/hr-management-and-organizational-behaviour" className="block py-1 text-gray-200 hover:text-white text-sm">
                                            HR Management and Organizational Behaviour
                                        </a>
                                        <a href="/computer-science-and-information-systems" className="block py-1 text-gray-200 hover:text-white text-sm">
                                            Computer Science and Information Systems
                                        </a>
                                        <a href="/leadership-and-innovation-management" className="block py-1 text-gray-200 hover:text-white text-sm">
                                            Leadership and Innovation Management
                                        </a>
                                        <a href="/civil-engineering-and-structural-development" className="block py-1 text-gray-200 hover:text-white text-sm">
                                            Civil Engineering and Structural Development
                                        </a>
                                        <a href="/mechanical-engineering-research" className="block py-1 text-gray-200 hover:text-white text-sm">
                                            Mechanical Engineering Research
                                        </a>
                                        <a href="/applied-thermal-engineering" className="block py-1 text-gray-200 hover:text-white text-sm">
                                            Applied Thermal Engineering
                                        </a>
                                        <a href="/electronics-and-communication-technology" className="block py-1 text-gray-200 hover:text-white text-sm">
                                            Electronics and Communication Technology
                                        </a>
                                        <a href="/library-management-and-information-technology" className="block py-1 text-gray-200 hover:text-white text-sm">
                                            Library Management and Information Technology
                                        </a>
                                        <a href="/project-management-and-control" className="block py-1 text-gray-200 hover:text-white text-sm">
                                            Project Management and Control
                                        </a>
                                        <a href="/manufacturing-science-and-engineering" className="block py-1 text-gray-200 hover:text-white text-sm">
                                            Manufacturing Science and Engineering
                                        </a>
                                    </div>
                                )}
                            </li>

                            {/* Mobile Authors Area */}
                            <li>
                                <button
                                    onClick={() => toggleDropdown('authors')}
                                    className="w-full text-left px-4 py-2 text-white hover:bg-[#3a5a8e] flex items-center justify-between"
                                >
                                    AUTHORS AREA
                                    <FaChevronDown className={`text-xs transition-transform ${activeDropdown === 'authors' ? 'rotate-180' : ''}`} />
                                </button>
                                {activeDropdown === 'authors' && (
                                    <div className="bg-[#3a5a8e] px-6 py-2 space-y-2">
                                        <a href="/browse-journals" className="block py-1 text-gray-200 hover:text-white">
                                            Browse Journals
                                        </a>
                                        <a href="/view-call-for-papers" className="block py-1 text-gray-200 hover:text-white">
                                            View Call for Papers
                                        </a>
                                        <a href="/authors-guidelines" className="block py-1 text-gray-200 hover:text-white">
                                            Author's Guidelines
                                        </a>
                                        <a href="/article-processing-charges" className="block py-1 text-gray-200 hover:text-white">
                                            Article Processing Charges
                                        </a>
                                        <a href="/resources" className="block py-1 text-gray-200 hover:text-white">
                                            Resources
                                        </a>
                                    </div>
                                )}
                            </li>

                            <li>
                                <a href="/become-an-editor" className="block px-4 py-2 text-white hover:bg-[#3a5a8e]">
                                    Become An Editor
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
