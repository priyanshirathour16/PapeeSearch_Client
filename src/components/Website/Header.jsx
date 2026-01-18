import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { journalCategoryApi } from "../../services/api";
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
        }, 200);
    };

    const handleLinkClick = () => {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const [headerJournals, setHeaderJournals] = useState([]);

    useEffect(() => {
        const fetchHeaderJournals = async () => {
            try {
                const response = await journalCategoryApi.getWithJournals();
                if (response.data && Array.isArray(response.data)) {
                    const journals = [];
                    response.data.forEach(cat => {
                        if (cat.journals && Array.isArray(cat.journals)) {
                            cat.journals.forEach(journal => {
                                const route = cat.route || journal.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                journals.push({
                                    title: cat.title, // Use category title as per request
                                    issn: journal.print_issn || journal.e_issn || 'N/A',
                                    impactFactor: "N/A", // Not provided in API
                                    link: `/journals/${route}`, // Use category route
                                    icon: <FaBook />
                                });
                            });
                        }
                    });
                    setHeaderJournals(journals);
                }
            } catch (error) {
                console.error("Failed to fetch header journals", error);
            }
        };
        fetchHeaderJournals();
    }, []);

    const menuItems = [
        {
            id: "home",
            label: "HOME",
            link: "/",
            type: "link"
        },
        {
            id: "about",
            label: "ABOUT ELK",
            type: "dropdown",
            layout: "about",
            data: {
                main: [
                    {
                        title: "PUBLISHING POLICIES",
                        links: [
                            { label: "Open Access & Licencing", to: "/open-access-and-licencing" },
                            { label: "Ethical Guidelines", to: "/ethical-guidelines" }
                        ]
                    },
                    {
                        title: "IMPACT FACTOR SCORE",
                        links: [
                            { label: "Impact Factor", to: "/impact-factor" },
                            { label: "Journal Indexing", to: "/journal-indexing" }
                        ]
                    }
                ],
                side: [
                    { label: "MEET OUR TEAM", to: "/meet-our-team" },
                    { label: "WHY PUBLISH WITH US?", to: "/why-publish-with-us" }
                ]
            }
        },
        {
            id: "journals",
            label: "JOURNALS WE PUBLISH",
            type: "dropdown",
            layout: "journals",
            data: headerJournals
        },
        {
            id: "authors",
            label: "AUTHORS AREA",
            type: "dropdown",
            layout: "simple",
            data: [
                { label: "Browse Journals", to: "/browse-journals" },
                { label: "Author's Guidelines", to: "/authors-guidelines" },
                { label: "Resources", to: "/resources" },
                { label: "View Call for Papers", to: "/view-call-for-papers" },
                { label: "Article Processing Charges", to: "/article-processing-charges" }
            ]
        },
        {
            id: "conference",
            label: "CONFERENCE SOLUTIONS",
            type: "dropdown",
            layout: "conference",
            data: {
                links: [
                    { label: "Upcoming Conferences", to: "/upcoming-conferences" },
                    { label: "Browse Special Issues", to: "/browse-special-issues" },
                    { label: "Previous Conferences", to: "/previous-conferences" }
                ],
                cta: {
                    label: "REQUEST PROPOSAL",
                    to: "/request-proposal"
                }
            }
        },
        {
            id: "editor",
            label: "Become An Editor",
            link: "/become-an-editor",
            type: "link",
            mobileOnly: true // Rendered separately on desktop top bar
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
                                <li>
                                    <Link
                                        to="/login"
                                        className="bg-[#204066] hover:bg-[#1a3453] border border-white/20 hover:text-white text-white px-6 py-1 rounded flex items-center gap-1 transition-colors uppercase font-medium"
                                    >
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Main Navigation */}
                        <ul className="flex space-x-6">
                            {menuItems.filter(item => !item.mobileOnly).map((item) => (
                                <li key={item.id} className={item.type === 'dropdown' ? 'group mt-[3px]' : ''}
                                    onMouseEnter={item.type === 'dropdown' ? handleMouseEnter : undefined}
                                    onMouseLeave={item.type === 'dropdown' ? handleMouseLeave : undefined}
                                >
                                    {item.type === 'link' ? (
                                        <Link to={item.link} className="text-white hover:text-gray-200 font-medium uppercase text-sm">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => toggleDropdown(item.id)}
                                                className={`font-medium flex items-center gap-1 uppercase text-sm focus:outline-none focus:ring-0 shadow-none hover:shadow-none bg-transparent ${activeDropdown === item.id ? (item.id === "about" ? "text-[#45cbb2]" : "text-gray-200") : "text-white"}`}
                                            >
                                                {item.label} <FaChevronDown className="text-xs" />
                                            </button>

                                            {/* Dropdown Content */}
                                            <div style={{ marginTop: "30px" }}
                                                className={`absolute left-0 top-full w-full bg-white shadow-lg transition-all duration-200 z-50 max-h-[80vh] overflow-y-auto ${activeDropdown === item.id ? "opacity-100 visible" : "opacity-0 invisible"}`}
                                            >
                                                {/* LAYOUT: ABOUT */}
                                                {item.layout === 'about' && (
                                                    <div className="flex">
                                                        <div className="w-2/3 p-8 grid grid-cols-2 gap-8">
                                                            {item.data.main.map((section, idx) => (
                                                                <div key={idx}>
                                                                    <h3 className="font-bold text-[#1e3a5f] mb-4 uppercase text-sm tracking-wide">{section.title}</h3>
                                                                    <div className="space-y-2">
                                                                        {section.links.map((link, lIdx) => (
                                                                            <Link key={lIdx} to={link.to} onClick={handleLinkClick} className="block bg-[#e0e0e0] hover:bg-[#2c4a6e] hover:text-white px-4 py-3 transition-colors text-sm text-[#1e3a5f]">
                                                                                {link.label}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="w-1/3 bg-[#45cbb2] p-8 flex flex-col justify-center space-y-4">
                                                            {item.data.side.map((link, idx) => (
                                                                <Link key={idx} to={link.to} onClick={handleLinkClick} className="block bg-[#1e3a5f] hover:bg-[#152943] text-white px-4 py-3 transition-colors shadow-md group/btn">
                                                                    <div className="flex items-center justify-between uppercase text-sm font-medium">
                                                                        <span>{link.label}</span>
                                                                        <FaLongArrowAltRight className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* LAYOUT: JOURNALS */}
                                                {item.layout === 'journals' && (
                                                    <div className="p-8">
                                                        <div className="grid grid-cols-3 gap-6">
                                                            {item.data.map((journal, index) => (
                                                                <div key={index} className="bg-[#e0e0e0] p-4 rounded shadow-sm hover:shadow-md transition-all group/journal hover:bg-[#2c4a6e]">
                                                                    <Link to={journal.link} onClick={handleLinkClick} className="block">
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
                                                )}

                                                {/* LAYOUT: SIMPLE (Authors Area) */}
                                                {item.layout === 'simple' && (
                                                    <div className="p-8">
                                                        <div className="grid grid-cols-3 gap-4">
                                                            {item.data.map((link, idx) => (
                                                                <Link key={idx} to={link.to} onClick={handleLinkClick} className="block bg-gray-200 hover:bg-[#2c4a6e] px-6 py-4 rounded transition-colors text-center group/author">
                                                                    <span className="text-gray-800 text-sm font-medium group-hover/author:text-white transition-colors">{link.label}</span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* LAYOUT: CONFERENCE (New) */}
                                                {item.layout === 'conference' && (
                                                    <div className="flex w-full">
                                                        {/* Left Side: Content */}
                                                        <div className="w-2/3 p-8 bg-white">
                                                            <h3 className="font-bold text-[#1e3a5f] mb-4 uppercase text-sm tracking-wide">CONFERENCES</h3>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                {item.data.links.map((link, idx) => (
                                                                    <Link key={idx} to={link.to} onClick={handleLinkClick} className="block bg-[#e0e0e0] hover:bg-[#2c4a6e] hover:text-white px-4 py-4 transition-colors text-sm text-[#1e3a5f] text-center font-medium">
                                                                        {link.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {/* Right Side: CTA */}
                                                        <div className="w-1/3 bg-[#45cbb2] p-8 flex flex-col justify-center items-center">
                                                            <Link to={item.data.cta.to} onClick={handleLinkClick} className="w-full bg-[#1e3a5f] hover:bg-[#152943] text-white px-6 py-4 transition-colors shadow-md group/btn flex items-center justify-between uppercase text-sm font-bold tracking-wider">
                                                                {item.data.cta.label}
                                                                <FaLongArrowAltRight className="text-xl group-hover/btn:translate-x-1 transition-transform" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-[#2c4a6e] border-t border-gray-600 pb-4">
                        <ul className="space-y-2 mt-4">
                            {menuItems.map((item) => (
                                <li key={item.id}>
                                    {item.type === 'link' ? (
                                        <Link to={item.link} onClick={handleLinkClick} className="block px-4 py-2 text-white hover:bg-[#3a5a8e]">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => toggleDropdown(item.id)}
                                                className="w-full text-left px-4 py-2 text-white hover:bg-[#3a5a8e] flex items-center justify-between"
                                            >
                                                {item.label}
                                                <FaChevronDown className={`text-xs transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                                            </button>

                                            {activeDropdown === item.id && (
                                                <div className="bg-[#3a5a8e] px-6 py-2 space-y-2 max-h-64 overflow-y-auto">
                                                    {/* MOBILE LAYOUT: ABOUT */}
                                                    {item.layout === 'about' && (
                                                        <>
                                                            {item.data.side.map((link, idx) => (
                                                                <Link key={`side-${idx}`} to={link.to} onClick={handleLinkClick} className="block py-1 text-gray-200 hover:text-white">{link.label}</Link>
                                                            ))}
                                                            {item.data.main.map((section, idx) => (
                                                                <React.Fragment key={`main-${idx}`}>
                                                                    {section.links.map((link, lIdx) => (
                                                                        <Link key={lIdx} to={link.to} onClick={handleLinkClick} className="block py-1 text-gray-200 hover:text-white">{link.label}</Link>
                                                                    ))}
                                                                </React.Fragment>
                                                            ))}
                                                        </>
                                                    )}
                                                    {/* MOBILE LAYOUT: JOURNALS */}
                                                    {item.layout === 'journals' && (
                                                        item.data.map((journal, idx) => (
                                                            <Link key={idx} to={journal.link} onClick={handleLinkClick} className="block py-1 text-gray-200 hover:text-white text-sm">
                                                                {journal.title}
                                                            </Link>
                                                        ))
                                                    )}
                                                    {/* MOBILE LAYOUT: SIMPLE */}
                                                    {item.layout === 'simple' && (
                                                        item.data.map((link, idx) => (
                                                            <Link key={idx} to={link.to} onClick={handleLinkClick} className="block py-1 text-gray-200 hover:text-white">
                                                                {link.label}
                                                            </Link>
                                                        ))
                                                    )}
                                                    {/* MOBILE LAYOUT: CONFERENCE */}
                                                    {item.layout === 'conference' && (
                                                        <div className="space-y-2">
                                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-2">Conferences</div>
                                                            {item.data.links.map((link, idx) => (
                                                                <Link key={idx} to={link.to} onClick={handleLinkClick} className="block py-1 text-gray-200 hover:text-white pl-2 border-l-2 border-transparent hover:border-[#45cbb2] transition-colors">
                                                                    {link.label}
                                                                </Link>
                                                            ))}
                                                            <div className="pt-2">
                                                                <Link to={item.data.cta.to} onClick={handleLinkClick} className="block bg-[#45cbb2] text-[#1e3a5f] py-2 px-4 text-center font-bold uppercase text-sm hover:bg-[#34a892] transition-colors">
                                                                    {item.data.cta.label}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
