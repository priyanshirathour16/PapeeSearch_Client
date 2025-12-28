import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUnlockAlt, FaCheck, FaCalendarAlt, FaBookOpen, FaUserTie, FaTwitter, FaPrint, FaGlobe, FaEnvelope } from 'react-icons/fa';

import Image1 from "../../assets/images/6.png";
import Image2 from "../../assets/images/11.png";
import Image3 from "../../assets/images/12.png";
import Image4 from "../../assets/images/13.png";
import Image5 from "../../assets/images/17.png";
import Image6 from "../../assets/images/14.jpg";
import Image7 from "../../assets/images/15.jpg";
import { ImageURl } from '../../services/serviceApi';


const JournalInner = ({ journalData }) => {
    const [activeTab, setActiveTab] = useState('journals');
    const [currentCitation, setCurrentCitation] = useState(Image1);
    const navigate = useNavigate();

    const citationImages = [Image1, Image2, Image3, Image4, Image5, Image6, Image7];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * citationImages.length);
            setCurrentCitation(citationImages[randomIndex]);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, []);



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
                                <img src={`${ImageURl}${journalData.coverImage}`} alt={journalData.title} className="max-w-full h-auto shadow-md" />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <button className="w-full bg-[#204066] text-white py-3 px-4 uppercase font-bold text-sm tracking-wide text-left flex justify-between items-center hover:bg-[#1a3352] transition-colors shadow-md border-l-4 border-l-[#12b48b] relative overflow-hidden group">
                                <span className="relative z-10">Peer Review Process</span>
                                <span className="relative z-10">→</span>
                            </button>
                            <button onClick={() => navigate('/publication-ethics-and-malpractice-statement')} className="w-full bg-[#12b48b] text-white py-3 px-4 uppercase font-bold text-sm tracking-wide text-left flex justify-between items-center hover:bg-[#0e9673] transition-colors shadow-md border-l-4 border-l-[#204066] relative overflow-hidden group">
                                <span className="relative z-10">Publication Ethics <br />& Malpractice Statement</span>
                            </button>
                            <button className="w-full bg-gradient-to-r from-[#0d2a4f] to-[#1a3a63] text-white py-3 px-4 uppercase font-bold text-sm tracking-wide text-center hover:from-[#112233] hover:to-[#1a3352] transition-colors shadow-md relative overflow-hidden group">
                                <Link to="mailto:info@elkjournals.com" className="flex items-center justify-center gap-2">
                                    <span className="relative z-10 text-white">Contact Editorial Office</span>
                                    <FaEnvelope className="relative z-10 text-white text-lg" />
                                </Link>
                            </button>
                        </div>

                        {/* Twitter Placeholder */}
                        <div className="text-sm text-[#12b48b] font-medium mt-4">
                            <a href="https://x.com/ElkJournals" target="_blank" rel="noopener noreferrer" className="hover:underline">Tweets by @ElkJournals</a>
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

                                    {Array.isArray(journalData.about) && journalData.about.map((para, index) => (
                                        <p key={index} dangerouslySetInnerHTML={{ __html: para }} />
                                    ))}

                                    <div className="mt-6">
                                        <h4 className="font-bold text-[#204066] mb-3 border-b pb-2">Key Audiences:</h4>
                                        <ul className="space-y-2">
                                            {Array.isArray(journalData.keyAudiences) && journalData.keyAudiences.map((item, idx) => (
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
                                        {Array.isArray(journalData.areasCovered) && journalData.areasCovered.map((area, idx) => (
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
                                    {journalData?.editorialBoard?.chiefEditor?.title && <div>
                                        <h3 className="bg-[#204066] text-white p-2 font-bold text-sm uppercase mb-0">Chief Editor</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse border border-gray-200 text-sm">
                                                <tbody>
                                                    <tr className="bg-gray-50">
                                                        <td className="border p-3 font-bold text-[#204066] w-[10%]">{journalData?.editorialBoard?.chiefEditor?.title}</td>
                                                        <td className="border p-3 font-bold text-[#12b48b] w-[25%]">{journalData?.editorialBoard?.chiefEditor?.name}</td>
                                                        <td className="border p-3 text-gray-700 w-[45%]">{journalData?.editorialBoard?.chiefEditor?.affiliation}</td>
                                                        <td className="border p-3 text-center w-[20%]">
                                                            <a href={journalData?.editorialBoard?.chiefEditor?.profileLink} className="text-[#204066] hover:text-[#12b48b] underline font-medium text-xs">View Profile</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>}

                                    {/* Members */}
                                    <div>
                                        <h3 className="bg-[#12b48b] text-white p-2 font-bold text-sm uppercase mb-0">Editorial Board Members</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse border border-gray-200 text-sm">
                                                <tbody>
                                                    {Array.isArray(journalData?.editorialBoard?.members) && journalData.editorialBoard.members.map((member, idx) => (
                                                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                            <td className="border p-3 font-bold text-[#204066] w-[10%]">{member?.title}</td>
                                                            <td className="border p-3 font-bold text-gray-800 w-[25%]">{member?.name}</td>
                                                            <td className="border p-3 text-gray-600 w-[45%]">{member?.affiliation}</td>
                                                            <td className="border p-3 text-center w-[20%]">
                                                                <a href={member?.profileLink} className="text-[#204066] hover:text-[#12b48b] underline font-medium text-xs">View Profile</a>
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
                        {journalData?.impactFactors?.length > 0 && <>   <div className="bg-[#00cca3] text-white p-3 font-bold uppercase text-sm">
                            JID Impact Factor
                        </div>
                            <div className="bg-white border border-t-0 p-2 space-y-1 shadow-sm max-h-[400px] overflow-y-auto custom-scrollbar">
                                {journalData?.impactFactors?.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-sm hover:shadow-md transition-shadow">
                                        <FaCalendarAlt className="text-gray-400" />
                                        <div className="font-medium text-gray-700 text-sm">
                                            <span className="font-bold">{item.year}:</span> {item.score}
                                        </div>
                                    </div>
                                ))}
                            </div>  </>}

                        {/* Submit Manuscript Button */}
                        <Link to="/submit-manuscript" className="block w-full bg-[#204066] hover:bg-[#1a3352] text-white font-bold py-4 px-4 text-center uppercase tracking-wider transition-colors shadow-lg">
                            Submit Your Manuscript →
                        </Link>

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