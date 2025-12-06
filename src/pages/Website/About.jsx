import React from "react";
import { FaEdit } from "react-icons/fa";

const team = [
    {
        id: "maker",
        name: "Mr. R. S. Maker",
        title: "Chief Mentor",
        description:
            "A post graduate from XLRI- 1974 batch, Mr. Maker has about 35 years of experience in the field of HR, Industrial Relations, Consulting and Education. From 2002 – 2006 he was the Director of ITM- Kharghar. Under his leadership, ITM saw 100% placements for the first time and the ranking of the institute rose on All India Basis.",
    },
    {
        id: "vidya",
        name: "Dr. (Mrs.) Vidya Vijay Naik",
        title: "Advisor",
        description:
            "B.Sc., M.A, M.Ed, PGDBM, PhD Research expert and Associate dean for NMIMS. A professor par excellence, she advises EECPL on various academic and research related issues. She has academic experience of over 35 years and is active member of various academic committees and board of studies.",
    },
    {
        id: "atiksh",
        name: "Mr. Atiksh",
        title: "Executive Director",
        description:
            "An engineer and management post graduate with hands on experience in financial services industry. An expert for quality in processes and carries with him multi-level industry relations. Atiksh has been instrumental in framing up of systems and processes at EECPL.",
    },
    {
        id: "preeti",
        name: "Mrs. Preeti Dhanda",
        title: "IT head",
        description:
            "B.Sc., MCA, MBA. She has served as independent consultant to B-Schools for E-learning. Preeti has been the key force behind our expertise in development of E-learning systems and IT systems.",
    },
    {
        id: "shilpi",
        name: "Mrs. Shilpi Verma",
        title: "Finance Head",
        description:
            "Postgraduate in Management with specialization in Finance from University of Technology, Sydney. She manages the financial aspects of the organization and the associated economic matters.",
    },
];

export default function About() {
    return (
        <div className="py-8 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* LEFT COLUMN - content area */}
                    <div className="lg:col-span-3">
                        <div className="mb-8">
                            <h1 className="text-2xl text-[#12b48b] font-normal mb-2 relative inline-block">
                                ELK Asia Pacific Journals
                                {/* <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#12b48b] -mb-2"></span> */}
                            </h1>
                        </div>

                        <div className="text-sm text-gray-600 leading-relaxed space-y-4 mb-8 text-justify">
                            <p>
                                ELK Asia Pacific Journals, as international Open Access and Google
                                Scholar indexed journals, is a unit of Elk Education Consultants
                                Pvt. Ltd (EECPL), India's first education BPO. With its gamut of
                                offerings for the educational institutions and professional
                                scholars, the company aims to be amongst the most value added
                                companies for research support. The team, in its attempt to bring
                                open access journals for the academia, shares the vision of making
                                EECPL the preferred choice of every Institute/University for
                                various services. With a blend of expertise and experience, and
                                consistency of services, they are poised to deliver excellent
                                services to our clients.
                            </p>
                            <p>
                                The management team at EECPL is as below:
                            </p>
                        </div>

                        {/* Team list */}
                        <div className="space-y-6">
                            {team.map((member) => (
                                <div key={member.id} className="flex gap-2">
                                    <div className="mt-3  text-[#204066]">
                                        <FaEdit className="text-sm  border-[#204066] p-[1px] rounded-sm" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-[#666] mb-2">
                                            {member.name}
                                            {member.title && (
                                                <span className="font-normal text-gray-600">, {member.title}:</span>
                                            )}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed text-justify">
                                            {member.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
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
    );
}
