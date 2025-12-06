import React from 'react';

const BrowseOfJournals = () => {
    const journals = [
        { id: 1, name: "ELK's International Journal of Computer Science", printISSN: "2454-3047", onlineISSN: "2394-0441", freq: "Two Issue Per Year", link: "#" },
        { id: 2, name: "ELK's International Journal of Manufacturing, Industrial and Production Engineering", printISSN: "2454-3020", onlineISSN: "2394-0425", freq: "One Issue Per Year", link: "#" },
        { id: 3, name: "ELK's International Journal of Human Resource Management", printISSN: "2454-3004", onlineISSN: "2394-0409", freq: "Two Issue Per Year", link: "#" },
        { id: 4, name: "ELK's International Journal of Leadership Studies", printISSN: "2454-3012", onlineISSN: "2394-0417", freq: "One Issue Per Year", link: "#" },
        { id: 5, name: "ELK's Indian Journal of Mechanical Engineering", printISSN: "2454-2962", onlineISSN: "2394-9368", freq: "Two Issue Per Year", link: "#" },
        { id: 6, name: "ELK's International Journal of Thermal Sciences", printISSN: "2454-3039", onlineISSN: "2394-0433", freq: "One Issue Per Year", link: "#" },
        { id: 7, name: "ELK's International Journal of Civil Engineering", printISSN: "2454-2946", onlineISSN: "2394-9341", freq: "One Issue Per Year", link: "#" },
        { id: 8, name: "ELK's International Journal of Electronics Engineering", printISSN: "2454-2954", onlineISSN: "2394-935X", freq: "One Issue Per Year", link: "#" },
        { id: 9, name: "ELK's International Journal of Library and Information Science", printISSN: "2454-2989", onlineISSN: "2394-9384", freq: "One Issue Per Year", link: "#" },
        { id: 10, name: "ELK's International Journal of Social Science", printISSN: "2454-2997", onlineISSN: "2394-9392", freq: "Four Issue Per Year", link: "#" },
        { id: 11, name: "ELK's International Journal of Project Management", printISSN: "2454-2970", onlineISSN: "2394-9376", freq: "One Issue Per Year", link: "#" },
    ];

    return (
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
                                    {journals.map((journal, idx) => (
                                        <tr key={idx} className={`${idx % 2 === 0 ? 'bg-[#f5f5f5]' : 'bg-white'} border-b border-gray-200`}>
                                            <td className="p-3 text-sm text-[#555] border-r border-gray-200">{journal.id}</td>
                                            <td className="p-3 text-sm text-[#555] border-r border-gray-200">
                                                <a href={journal.link} className="text-[#204066] hover:text-[#12b48b] hover:underline transition-colors">
                                                    {journal.name}
                                                </a>
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

                <div className="w-full lg:w-1/4 mt-8 lg:mt-0 text-right">
                    <a href="https://x.com/ElkJournals" target="_blank" rel="noopener noreferrer" className="text-[#204066] text-[11px] hover:underline">Tweets by @ElkJournals</a>
                </div>

            </div>
        </div>
    );
};

export default BrowseOfJournals;