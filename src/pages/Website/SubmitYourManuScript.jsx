import React, { useEffect, useState } from 'react';
import ManuscriptFormSteps from '../../components/Website/ManuscriptFormSteps';
import { journalCategoryApi } from '../../services/api';
import { message } from 'antd';

const SubmitYourManuScript = () => {
    const [fetchedJournalOptions, setFetchedJournalOptions] = useState([]);

    useEffect(() => {
        const fetchJournalOptions = async () => {
            try {
                const response = await journalCategoryApi.getWithJournals();
                if (response.data && Array.isArray(response.data)) {
                    const options = response.data
                        .filter(cat => cat.journals && cat.journals.length > 0)
                        .map(cat => ({
                            label: cat.title,
                            options: cat.journals.map(journal => ({
                                value: journal.id,
                                label: journal.title
                            }))
                        }));
                    setFetchedJournalOptions(options);
                }
            } catch (error) {
                console.error("Failed to fetch journal options", error);
                message.error("Failed to load journal options");
            }
        };
        fetchJournalOptions();
    }, []);

    return (
        <div className="bg-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* LEFT COLUMN - Form */}
                    <div className="lg:col-span-3">
                        <div className="content-inner form-panel">
                            <h1 className="text-2xl text-[#12b48b] font-normal mb-6 relative inline-block">
                                Submit a Manuscript
                            </h1>

                            <ManuscriptFormSteps fetchedJournalOptions={fetchedJournalOptions} />
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="text-right py-3">
                            <a href="https://x.com/ElkJournals" target="_blank" rel="noopener noreferrer" className="text-[#204066] text-xs hover:underline">Tweets by @ElkJournals</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SubmitYourManuScript;
