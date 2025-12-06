import React, { useState, useEffect } from 'react';
import { FaUnlockAlt, FaCheck, FaCalendarAlt, FaBookOpen, FaUserTie, FaTwitter, FaPrint, FaGlobe } from 'react-icons/fa';
import JournalCover from '../../assets/images/jm-eapjmrm.jpg';
import Img from "../../assets/images/mrm.png";
import Image1 from "../../assets/images/6.png";
import Image2 from "../../assets/images/11.png";
import Image3 from "../../assets/images/12.png";
import Image4 from "../../assets/images/13.png";
import Image5 from "../../assets/images/17.png";
import Image6 from "../../assets/images/14.jpg";
import Image7 from "../../assets/images/15.jpg";


const JournalInner = () => {
    const [activeTab, setActiveTab] = useState('journals');
    const [currentCitation, setCurrentCitation] = useState(Image1);

    const citationImages = [Image1, Image2, Image3, Image4, Image5, Image6, Image7];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * citationImages.length);
            setCurrentCitation(citationImages[randomIndex]);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const journalData = {
        title: "ELK's International Journal of Marketing (EAPJMRM)",
        coverImage: Img,
        stats: {
            volumes: 12,
            issues: 53,
            articles: 294,
            yearRange: "2011 to 2023"
        },
        issn: {
            print: "0976-7193",
            online: "2349-2317"
        },
        impactFactors: [
            { year: 2020, score: "4.87045" },
            { year: 2019, score: "4.285" },
            { year: 2017, score: "3.55" },
            { year: 2019, score: "3.003" }, // Duplicate year in sample, keeping data structure flexible
            { year: 2015, score: "2.059" },
            { year: 2014, score: "2.049" },
            { year: 2013, score: "1.789" },
            { year: 2012, score: "0.803" },
            { year: 2011, score: "0.525" },
        ],
        about: [
            "An International Journal of Marketing that endeavours to spread innovative research ideas across the globe.",
            "ELK Asia Pacific Journal of Marketing and Retail Management - An open access Indian journal of marketing, is a unique initiative from the ELK group. The main objective behind the launch was to bring on-board an international journal of marketing. With the retail industry taking huge strides and developing to an unprecedented scale, there is requirement as well as scope for research in the field.",
            "With the initial focus of making it a prominent Indian journal of marketing, we expanded its reach worldwide by catering to global research. Since inception, it has been successfully disseminating research ideas and prospects. Through this open access marketing journal, we connect with the academic researchers as well as professionals, who conduct studies in the sphere of marketing and retail trade on two levels.",
            "On one hand, we invite contributions from the researchers and ask them to send across their research papers for publication to a journal of marketing management. Thus, we support the efforts of the scholars. On the other hand, highly distinguished professionals have team up with us as part of the editorial team. They ensure to follow a strict Double Blind Peer Review process so as to maintain the standards of our impact factor journal of marketing and retail management. They review every paper and add value with their constructive feedback.",
            "The worth of papers is enhanced with manifolds by getting published in Indian Journal of Marketing, prominently titled as ELK Asia Pacific Journal of Marketing & Retail Management. This open access UGC approved journal in marketing undergoes peer review by most distinguished editors and subject matter experts which s also listed in the Cabell’s Directory. This makes it an international journal of marketing which reaches hundreds of institutions and professional bodies through online open-access publishing mode.",
            "ELK’s open access International Journal of Marketing offers unique benefits for readers, contributors and institutes/ universities. It follows the Double-Blind Refereeing Process for review and acts as an effective medium for promoting marketing education. We encourage both theoretical and empirical research. ELK Group also offers ELK Asia Pacific Journal of Finance and Risk Management.",
            "Our scope in terms of material published under impact factor journal of marketing includes Doctoral Dissertation Abstracts, Research Papers, Book Reviews and Case Studies and industry reports. Our official website seeks to make the process of reaching us simpler by facilitating submission of papers throughout the year online."
        ],
        keyAudiences: [
            "Retail managers",
            "Suppliers and contractors to the retail industry",
            "Consultants",
            "Retail strategists, researchers and students",
            "Libraries supplying practicing managers and researchers"
        ],
        areasCovered: [
            "Marketing", "Retail Trade", "Marketing & Planning", "Entrepreneurship marketing",
            "Policy, Pricing and marketing", "Retail Management", "Marketing theories & philosophies",
            "Benchmarking", "Marketing strategies", "Corporate social responsibility",
            "International marketing strategies", "Relationship Marketing", "Corporate innovation restructuring",
            "Marketing Mix", "Corporate brand management", "Supply Chains", "Distribution Channels"
        ],
        editorialBoard: {
            chiefEditor: {
                title: "Dr.",
                name: "Arvindbhai Brahmbhatt",
                affiliation: "Professor of Marketing, Institute of Management and Chairperson, Doctoral Programme, Nirma University M.Sc. Ph.D, FDP(IIMA-1982), LL.B.",
                profileLink: "view-profile.php"
            },
            members: [
                { title: "Dr.", name: "Anshul Verma", affiliation: "Associate Professor, S. P. Jain Institute of Management & Research, Mumbai Ph. D. (Applied Business Economics, Faculty of Commerce), Ph.D. (Faculty of Management, Dr. B.R. Ambedkar University), M.A.- Economics", profileLink: "view-profile.php" },
                { title: "Prof.", name: "Ashish Gupta", affiliation: "Assistant Professor, Dr. Hari Singh Gour Central University PhD, MBA, UGC-NET (Management)", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Dr. Arup Kumar Baksi", affiliation: "Associate Professor, Dept. of Management/ Business Administration, Aliah University, West Bengal Ph.D., MBA, MSc. LMISTE", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Durgesh Batra", affiliation: "Associate ProfessorPh.D,", profileLink: "view-profile.php" },
                { title: "Dr.", name: "ILA Nakkeeran", affiliation: "Head ,Department of CommercePh.D (COMMERCE)", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Mehraz Boolaky", affiliation: "Honorary Lecturer and Dissertation Advisor, University of Liverpool/Laureate PhD, MBA", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Mohammad Falahat", affiliation: "Assistant Professor, Universiti Tunku Abdul Rahman (UTAR)", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Muhammad Mohiuddin", affiliation: "Asst. professor of International Business, Thompson Rivers UniversityPhD in International Management", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Nimit Gupta", affiliation: "Associate Professor (Marketing), Fortune Institute of International Business Phd, Mphil, NET, AMT, MBA, B.com", profileLink: "view-profile.php" },
                { title: "Prof.", name: "Pawan Kumar Chugan", affiliation: "Professor - General Management, Nirma UniversityPh.D", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Pratap Chandra Mandal", affiliation: "Associate Professor (Marketing), VIT University PhD (Marketing) IIT Kharagpur, MBA (IIT Kharagpur), B.Tech. (Hons) IIT Kharagpur", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Pratyush Tripathi", affiliation: "Principal, VNS Group of Institutions & Professor at Faculty of Management Studies Ph.D. from the Faculty of Commerce and Management, A.P.S. University, Rewa (M.P.), 2. LL.B., M.B.A.", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Saumendra Das", affiliation: "LLM.,MBA., PhD", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Sunayna Khurana", affiliation: "Assistant Professor at Chandigarh Business School of AdministrationDoctorate in Management", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Sunmeet Banerjee", affiliation: "Associate Professor, DR VN BRIMS, Thane PhD", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Venkata SSR Muramalla", affiliation: "ProfessorMBA., MPhil., Ph.D.(Business Management)", profileLink: "view-profile.php" }
            ]
        }
    };

    return (
        <section className="py-12 bg-gray-50 font-roboto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT SIDEBAR */}
                    <div className="w-full lg:w-1/4 space-y-6">
                        {/* Open Access Widget */}
                        <div className="bg-white shadow-sm border border-gray-200">
                            <div className="bg-[#12b48b] text-white p-3 font-bold uppercase flex items-center gap-2">
                                <FaUnlockAlt /> Open Access
                            </div>
                            <div className="p-4 flex justify-center">
                                <img src={journalData.coverImage} alt={journalData.title} className="max-w-full h-auto shadow-md" />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <button className="w-full bg-[#204066] text-white py-3 px-4 uppercase font-bold text-sm tracking-wide text-left flex justify-between items-center hover:bg-[#1a3352] transition-colors shadow-md border-l-4 border-l-[#12b48b] relative overflow-hidden group">
                                <span className="relative z-10">Peer Review Process</span>
                                <span className="relative z-10">→</span>
                            </button>
                            <button className="w-full bg-[#12b48b] text-white py-3 px-4 uppercase font-bold text-sm tracking-wide text-left flex justify-between items-center hover:bg-[#0e9673] transition-colors shadow-md border-l-4 border-l-[#204066] relative overflow-hidden group">
                                <span className="relative z-10">Publication Ethics <br />& Malpractice Statement</span>
                            </button>
                            <button className="w-full bg-[#204066] text-white py-3 px-4 uppercase font-bold text-sm tracking-wide text-left flex justify-between items-center hover:bg-[#1a3352] transition-colors shadow-md border-l-4 border-l-[#12b48b] relative overflow-hidden group">
                                <span className="relative z-10">Contact Editorial Office</span>
                                <FaCheck className="relative z-10" />
                            </button>
                        </div>

                        {/* Twitter Placeholder */}
                        <div className="text-sm text-[#12b48b] font-medium mt-4">
                            Tweets by @ElkJournals
                        </div>
                    </div>


                    {/* CENTER CONTENT */}
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-2xl text-[#12b48b] font-normal mb-6 leading-tight">
                            {journalData.title}
                        </h1>

                        {/* Tabs Navigation */}
                        <div className="flex border-b border-gray-300 mb-6">
                            {['journals', 'areas', 'editorial'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative py-3 px-6 text-sm font-medium transition-colors duration-300 border border-gray-300 border-b-0 mr-1 ${activeTab === tab
                                        ? 'bg-[#204066] text-white after:content-[""] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-t-[8px] after:border-t-[#204066] after:border-x-[8px] after:border-x-transparent'
                                        : 'bg-gray-200 text-[#204066] hover:bg-gray-300'
                                        }`}
                                >
                                    {tab === 'journals' ? 'About Journals' : tab === 'areas' ? 'Areas Covered' : 'Editorial Board'}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white p-6 shadow-sm border border-gray-100 min-h-[500px]">

                            {/* ABOUT JOURNALS TAB */}
                            {activeTab === 'journals' && (
                                <div className="space-y-4 text-gray-700 text-sm leading-relaxed text-justify">
                                    <p className="font-bold text-[#204066] bg-gray-50 p-3 rounded-md border-l-4 border-[#12b48b]">
                                        <span className="text-[#12b48b] text-lg">{journalData.stats.volumes}</span> Volumes,
                                        <span className="text-[#12b48b] text-lg mx-2">{journalData.stats.issues}</span> Issues,
                                        <span className="text-[#12b48b] text-lg">{journalData.stats.articles}</span> Articles available from {journalData.stats.yearRange}.
                                    </p>

                                    {journalData.about.map((para, index) => (
                                        <p key={index} dangerouslySetInnerHTML={{ __html: para }} />
                                    ))}

                                    <div className="mt-6">
                                        <h4 className="font-bold text-[#204066] mb-3 border-b pb-2">Key Audiences:</h4>
                                        <ul className="space-y-2">
                                            {journalData.keyAudiences.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <FaUserTie className="text-[#12b48b] mt-1 shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* AREAS COVERED TAB */}
                            {activeTab === 'areas' && (
                                <div>
                                    <p className="font-bold text-[#204066] mb-4">The subject areas covered under the scope of the journal include:</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {journalData.areasCovered.map((area, idx) => (
                                            <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 border-l-2 border-[#12b48b] hover:bg-gray-100 transition-colors">
                                                <FaBookOpen className="text-gray-400 text-xs" />
                                                <span className="text-sm font-medium text-gray-700">{area}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* EDITORIAL BOARD TAB */}
                            {activeTab === 'editorial' && (
                                <div className="space-y-8">
                                    {/* Chief Editor */}
                                    <div>
                                        <h3 className="bg-[#204066] text-white p-2 font-bold text-sm uppercase mb-0">Chief Editor</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse border border-gray-200 text-sm">
                                                <tbody>
                                                    <tr className="bg-gray-50">
                                                        <td className="border p-3 font-bold text-[#204066] w-[10%]">{journalData.editorialBoard.chiefEditor.title}</td>
                                                        <td className="border p-3 font-bold text-[#12b48b] w-[25%]">{journalData.editorialBoard.chiefEditor.name}</td>
                                                        <td className="border p-3 text-gray-700 w-[45%]">{journalData.editorialBoard.chiefEditor.affiliation}</td>
                                                        <td className="border p-3 text-center w-[20%]">
                                                            <a href={journalData.editorialBoard.chiefEditor.profileLink} className="text-[#204066] hover:text-[#12b48b] underline font-medium text-xs">View Profile</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Members */}
                                    <div>
                                        <h3 className="bg-[#12b48b] text-white p-2 font-bold text-sm uppercase mb-0">Editorial Board Members</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse border border-gray-200 text-sm">
                                                <tbody>
                                                    {journalData.editorialBoard.members.map((member, idx) => (
                                                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                            <td className="border p-3 font-bold text-[#204066] w-[10%]">{member.title}</td>
                                                            <td className="border p-3 font-bold text-gray-800 w-[25%]">{member.name}</td>
                                                            <td className="border p-3 text-gray-600 w-[45%]">{member.affiliation}</td>
                                                            <td className="border p-3 text-center w-[20%]">
                                                                <a href={member.profileLink} className="text-[#204066] hover:text-[#12b48b] underline font-medium text-xs">View Profile</a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>


                    {/* RIGHT SIDEBAR */}
                    <div className="w-full lg:w-1/4 space-y-6">

                        {/* Metrics Widget */}
                        <div className="bg-[#12b48b] text-white p-3 font-bold uppercase text-sm">
                            Journal Metrics
                        </div>
                        <div className="bg-white border border-t-0 p-4 space-y-4 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-dashed border-gray-300 pb-3">
                                <div className="bg-gray-200 p-2 rounded-md text-black"><FaPrint size={24} /></div>
                                <div className="text-[#204066] font-medium">
                                    {journalData.issn.print} (ISSN Print)
                                </div>
                            </div>
                            <div className="flex items-center gap-3 border-b border-dashed border-gray-300 pb-3">
                                <div className="bg-gray-200 p-2 rounded-md text-black"><FaGlobe size={24} /></div>
                                <div className="text-[#204066] font-medium">
                                    {journalData.issn.online} (ISSN Online)
                                </div>
                            </div>
                        </div>

                        {/* Impact Factor Widget */}
                        <div className="bg-[#00cca3] text-white p-3 font-bold uppercase text-sm">
                            JID Impact Factor
                        </div>
                        <div className="bg-white border border-t-0 p-2 space-y-1 shadow-sm max-h-[400px] overflow-y-auto custom-scrollbar">
                            {journalData.impactFactors.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-sm hover:shadow-md transition-shadow">
                                    <FaCalendarAlt className="text-gray-400" />
                                    <div className="font-medium text-gray-700 text-sm">
                                        <span className="font-bold">{item.year}:</span> {item.score}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Submit Manuscript Button */}
                        <a href="#" className="block w-full bg-[#204066] hover:bg-[#1a3352] text-white font-bold py-4 px-4 text-center uppercase tracking-wider transition-colors shadow-lg">
                            Submit Your Manuscript →
                        </a>

                        {/* Index & Citations Widget */}
                        <div className="bg-[#009688] text-white p-3 font-bold uppercase text-sm">
                            Index & Citations
                        </div>
                        <div className="bg-white border border-t-0 p-4 flex justify-center items-center shadow-sm min-h-[120px]">
                            <img
                                src={currentCitation}
                                alt="Index and Citation"
                                className="max-w-full max-h-[80px] object-contain transition-opacity duration-500"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default JournalInner;