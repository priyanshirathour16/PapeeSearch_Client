import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FaChevronCircleRight,
    FaLongArrowAltRight,
    FaChevronDown,
    FaBars,
    FaTimes,
    FaChartLine,
    FaMoneyBillWave,
    FaUsers,
    FaSitemap,
    FaLaptopCode,
    FaLightbulb,
    FaBuilding,
    FaCogs,
    FaThermometerHalf,
    FaMicrochip,
    FaBook,
    FaProjectDiagram,
    FaIndustry
} from "react-icons/fa";
import Logo from "../../assets/images/elk-logo.png";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const timeoutRef = useRef(null);

    const toggleDropdown = (dropdownName) => {
        // If clicking the same one, toggle it. If different, switch.
        // If clicking "null" (which shouldn't happen via click usually, but logic holds), close.
        if (activeDropdown === dropdownName) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(dropdownName);
        }
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 200); // 200ms delay to allow bridging the gap
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const journalData = [
        {
            title: "Marketing and Retail Management",
            issn: "2349-2317",
            impactFactor: "3.99",
            link: "/journal-of-marketing",
            icon: <FaChartLine />
        },
        {
            title: "Finance and Risk Management",
            issn: "2349-2325",
            impactFactor: "3.456",
            link: "/journal-of-finance",
            icon: <FaMoneyBillWave />
        },
        {
            title: "Electronics and Communication Technology",
            issn: "2394-935X",
            impactFactor: "2.002",
            link: "/electronics-and-communication-technology",
            icon: <FaMicrochip />
        },
        {
            title: "Social Sciences",
            issn: "2394-9392",
            impactFactor: "2.546",
            link: "/social-sciences",
            icon: <FaUsers />
        },
        {
            title: "Civil Engineering and Structural Development",
            issn: "2394-9341",
            impactFactor: "2.399",
            link: "/civil-engineering-and-structural-development",
            icon: <FaBuilding />
        },
        {
            title: "Library Management and Information Technology",
            issn: "2394-9384",
            impactFactor: "1.039",
            link: "/library-management-and-information-technology",
            icon: <FaBook />
        },
        {
            title: "HR Management and Organizational Behaviour",
            issn: "2394-0409",
            impactFactor: "2.096",
            link: "/hr-management-and-organizational-behaviour",
            icon: <FaSitemap />
        },
        {
            title: "Mechanical Engineering Research",
            issn: "2394-9368",
            impactFactor: "2.586",
            link: "/mechanical-engineering-research",
            icon: <FaCogs />
        },
        {
            title: "Project Management and Control",
            issn: "2394-9376",
            impactFactor: "1.156",
            link: "/project-management-and-control",
            icon: <FaProjectDiagram />
        },
        {
            title: "Computer Science and Information Systems",
            issn: "2394-0409",
            impactFactor: "2.026",
            link: "/computer-science-and-information-systems",
            icon: <FaLaptopCode />
        },
        {
            title: "Applied Thermal Engineering",
            issn: "2394-0433",
            impactFactor: "1.098",
            link: "/applied-thermal-engineering",
            icon: <FaThermometerHalf />
        },
        {
            title: "Manufacturing Science and Engineering",
            issn: "2394-0425",
            impactFactor: "1.219",
            link: "/manufacturing-science-and-engineering",
            icon: <FaIndustry />
        },
        {
            title: "Leadership and Innovation Management",
            issn: "2394-0417",
            impactFactor: "1.789",
            link: "/leadership-and-innovation-management",
            icon: <FaLightbulb />
        }
    ];

    return (
        <header className="bg-[#2c4a6e] shadow-md z-50">
            <div className="w-full px-[15px] mx-auto min-h-full sm:w-[750px] md:w-[970px] lg:w-[1170px] relative">
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
                                        className="bg-teal-500 hover:bg-teal-600 hover:text-white text-white px-4 py-1 rounded flex items-center gap-1 transition-colors"
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
                            <li className="group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <button
                                    onClick={() => toggleDropdown("about")}
                                    className={`font-medium flex items-center gap-1 uppercase text-sm focus:outline-none focus:ring-0 shadow-none hover:shadow-none bg-transparent ${activeDropdown === "about" ? "text-[#45cbb2]" : "text-white"}`}
                                >
                                    ABOUT ELK <FaChevronDown className="text-xs" />
                                </button>
                                {/* Full-width dropdown container */}
                                <div style={{ marginTop: "30px" }}
                                    className={`absolute left-0 top-full w-full bg-white shadow-lg transition-all duration-200 z-50 max-h-[80vh] overflow-y-auto ${activeDropdown === "about" ? "opacity-100 visible" : "opacity-0 invisible"}`}
                                >
                                    {/* Content */}
                                    <div className="flex">
                                        {/* Main Content Area (2/3 width) */}
                                        <div className="w-2/3 p-8 grid grid-cols-2 gap-8">
                                            {/* Publishing Policies Section */}
                                            <div>
                                                <h3 className="font-bold text-[#1e3a5f] mb-4 uppercase text-sm tracking-wide">PUBLISHING POLICIES</h3>
                                                <div className="space-y-2">
                                                    <Link to="/open-access-and-licencing" className="block bg-[#e0e0e0] hover:bg-[#2c4a6e] hover:text-white px-4 py-3 transition-colors text-sm text-[#1e3a5f]">
                                                        Open Access & Licencing
                                                    </Link>
                                                    <Link to="/ethical-guidelines" className="block bg-[#e0e0e0] hover:bg-[#2c4a6e] hover:text-white px-4 py-3 transition-colors text-sm text-[#1e3a5f]">
                                                        Ethical Guidelines
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Impact Factor Score Section */}
                                            <div>
                                                <h3 className="font-bold text-[#1e3a5f] mb-4 uppercase text-sm tracking-wide">IMPACT FACTOR SCORE</h3>
                                                <div className="space-y-2">
                                                    <Link to="/impact-factor" className="block bg-[#e0e0e0] hover:bg-[#2c4a6e] hover:text-white px-4 py-3 transition-colors text-sm text-[#1e3a5f]">
                                                        Impact Factor
                                                    </Link>
                                                    <Link to="/journal-indexing" className="block bg-[#e0e0e0] hover:bg-[#2c4a6e] hover:text-white px-4 py-3 transition-colors text-sm text-[#1e3a5f]">
                                                        Journal Indexing
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Green Panel (1/3 width) */}
                                        <div className="w-1/3 bg-[#45cbb2] p-8 flex flex-col justify-center space-y-4">
                                            <Link to="/meet-our-team" className="block bg-[#1e3a5f] hover:bg-[#152943] text-white px-4 py-3 transition-colors shadow-md group/btn">
                                                <div className="flex items-center justify-between uppercase text-sm font-medium">
                                                    <span>MEET OUR TEAM</span>
                                                    <FaLongArrowAltRight className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                                                </div>
                                            </Link>
                                            <Link to="/why-publish-with-us" className="block bg-[#1e3a5f] hover:bg-[#152943] text-white px-4 py-3 transition-colors shadow-md group/btn">
                                                <div className="flex items-center justify-between uppercase text-sm font-medium">
                                                    <span>WHY PUBLISH WITH US?</span>
                                                    <FaLongArrowAltRight className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            {/* Journals Dropdown */}
                            <li className="group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <button
                                    onClick={() => toggleDropdown("journals")}
                                    className={`font-medium flex items-center gap-1 uppercase text-sm focus:outline-none focus:ring-0 shadow-none hover:shadow-none bg-transparent ${activeDropdown === "journals" ? "text-gray-200" : "text-white"}`}
                                >
                                    JOURNALS WE PUBLISH <FaChevronDown className="text-xs" />
                                </button>
                                {/* Full-width dropdown */}
                                <div style={{ marginTop: "30px" }}
                                    className={`absolute left-0 top-full w-full bg-white shadow-lg transition-all duration-200 p-8 z-50 max-h-[80vh] overflow-y-auto ${activeDropdown === "journals" ? "opacity-100 visible" : "opacity-0 invisible"}`}
                                >
                                    <div className="grid grid-cols-3 gap-6">
                                        {journalData.map((journal, index) => (
                                            <div key={index} className="bg-[#e0e0e0] p-4 rounded shadow-sm hover:shadow-md transition-all group/journal hover:bg-[#2c4a6e]">
                                                <Link to={journal.link} className="block">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-xl text-gray-700 mt-1 group-hover/journal:text-white transition-colors">{journal.icon}</span>
                                                        <div>
                                                            <strong className="text-[#204066] text-sm block mb-1 group-hover/journal:text-white transition-colors">{journal.title}</strong>
                                                            <div className="text-xs text-gray-600 group-hover/journal:text-gray-200 transition-colors">ISSN No: {journal.issn}</div>
                                                            <div className="text-xs text-gray-600 group-hover/journal:text-gray-200 transition-colors">JD Impact factor: {journal.impactFactor}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </li>

                            {/* Authors Area Dropdown */}
                            <li className="group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <button
                                    onClick={() => toggleDropdown("authors")}
                                    className={`font-medium flex items-center gap-1 uppercase text-sm focus:outline-none focus:ring-0 shadow-none hover:shadow-none bg-transparent ${activeDropdown === "authors" ? "text-gray-200" : "text-white"}`}
                                >
                                    AUTHORS AREA <FaChevronDown className="text-xs" />
                                </button>
                                {/* Full-width dropdown */}
                                <div style={{ marginTop: "30px" }}
                                    className={`absolute left-0 top-full w-full bg-white shadow-lg transition-all duration-200 p-8 z-50 max-h-[80vh] overflow-y-auto ${activeDropdown === "authors" ? "opacity-100 visible" : "opacity-0 invisible"}`}
                                >
                                    <div className="grid grid-cols-3 gap-4">
                                        {/* Row 1 */}
                                        <a href="/browse-journals" className="block bg-gray-200 hover:bg-[#2c4a6e] px-6 py-4 rounded transition-colors text-center group/author">
                                            <span className="text-gray-800 text-sm font-medium group-hover/author:text-white transition-colors">Browse Journals</span>
                                        </a>
                                        <a href="/authors-guidelines" className="block bg-gray-200 hover:bg-[#2c4a6e] px-6 py-4 rounded transition-colors text-center group/author">
                                            <span className="text-gray-800 text-sm font-medium group-hover/author:text-white transition-colors">Author's Guidelines</span>
                                        </a>
                                        <a href="/resources" className="block bg-gray-200 hover:bg-[#2c4a6e] px-6 py-4 rounded transition-colors text-center group/author">
                                            <span className="text-gray-800 text-sm font-medium group-hover/author:text-white transition-colors">Resources</span>
                                        </a>

                                        {/* Row 2 */}
                                        <a href="/view-call-for-papers" className="block bg-gray-200 hover:bg-[#2c4a6e] px-6 py-4 rounded transition-colors text-center group/author">
                                            <span className="text-gray-800 text-sm font-medium group-hover/author:text-white transition-colors">View Call for Papers</span>
                                        </a>
                                        <a href="/article-processing-charges" className="block bg-gray-200 hover:bg-[#2c4a6e] px-6 py-4 rounded transition-colors text-center group/author">
                                            <span className="text-gray-800 text-sm font-medium group-hover/author:text-white transition-colors">Article Processing Charges</span>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul >
                    </div >
                </nav >

                {/* Mobile Menu */}
                {
                    mobileMenuOpen && (
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
                    )
                }
            </div >
        </header >
    );
};

export default Header;
