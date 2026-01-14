import React, { useEffect, useState } from 'react';
import { journalCategoryApi } from '../../services/api';
import { Link } from 'react-router-dom';
import NewsWidget from "../../components/Website/NewsWidget";
import SEO from '../../components/SEO';

const numberToWords = (num) => {
    const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
    return words[num] || num;
};

const BrowseOfJournals = () => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const response = await journalCategoryApi.getWithJournalsAndIssues();
                const data = Array.isArray(response.data) ? response.data : response;

                const flattenedJournals = [];
                const currentYear = new Date().getFullYear();

                if (Array.isArray(data)) {
                    data.forEach(category => {
                        if (category.journals && category.journals.length > 0) {
                            category.journals.forEach(journal => {
                                const issuesThisYear = journal.issues?.filter(issue => parseInt(issue.year) === currentYear).length || 0;
                                const freqText = `${numberToWords(issuesThisYear)} Issue${issuesThisYear !== 1 ? 's' : ''} Per Year`;

                                flattenedJournals.push({
                                    id: journal.id,
                                    name: journal.title,
                                    printISSN: journal.print_issn,
                                    onlineISSN: journal.e_issn,
                                    freq: freqText,
                                    link: `/journals/${category.route}`
                                });
                            });
                        }
                    });
                }
                setJournals(flattenedJournals);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching journals:", err);
                setError("Failed to load journals.");
                setLoading(false);
            }
        };

        fetchJournals();
    }, []);

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    return (
        <><SEO
            title="Our list of Journals - ELK Asia Pacific Journal"
            description="With our wide list of journals, we attempt to provide quality research information on various research areas such as Marketing, Finance, Engineering and Social Sciences"
            
            />
        <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-3/4">
                    <div className="content-inner form-panel">
                        <h1 className="text-2xl text-[#12b48b] font-normal mb-2 relative inline-block">
                            List of Journals
                            {/* <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#12b48b] transform translate-y-1"></span> */}
                        </h1>

                        <div className="overflow-x-auto mt-7">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#757575] text-white">
                                        <th className="p-3 text-sm font-bold border-r border-[#888] w-[60px]">S.No</th>
                                        <th className="p-3 text-sm font-bold border-r border-[#888]">Name of the Journal</th>
                                        <th className="p-3 text-sm font-bold border-r border-[#888] w-[110px]">Print ISSN</th>
                                        <th className="p-3 text-sm font-bold border-r border-[#888] w-[110px]">Online ISSN</th>
                                        <th className="p-3 text-sm font-bold w-[120px]">Frequency/ Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {journals?.length > 0 && journals.map((journal, idx) => (
                                        <tr key={idx} className={`${idx % 2 === 0 ? 'bg-[#f5f5f5]' : 'bg-white'} border-b border-gray-200`}>
                                            <td className="p-3 text-sm text-[#555] border-r border-gray-200">{idx + 1}</td>
                                            <td className="p-3 text-sm text-[#555] border-r border-gray-200">
                                                <Link to={journal.link} className="text-[#204066] hover:text-[#12b48b] hover:underline transition-colors">
                                                    {journal.name}
                                                </Link>
                                            </td>
                                            <td className="p-3 text-sm text-[#555] border-r border-gray-200">{journal.printISSN}</td>
                                            <td className="p-3 text-sm text-[#555] border-r border-gray-200">{journal.onlineISSN}</td>
                                            <td className="p-3 text-sm text-[#555]">{journal.freq}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <div className="w-full lg:w-1/4 mt-8 lg:mt-0">
                    <NewsWidget />
                </div>

            </div>
        </div>
        </>
    );
};

export default BrowseOfJournals;