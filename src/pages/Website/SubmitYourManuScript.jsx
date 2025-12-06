import React from 'react';
import ManuscriptForm from '../../components/Website/ManuscriptForm';

const SubmitYourManuScript = () => {
    return (
        <div className=" bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* LEFT COLUMN - Form */}
                    <div className="lg:col-span-3">
                        <div className="content-inner form-panel">
                            <h1 className="text-2xl text-[#12b48b] font-normal mb-6 relative inline-block">
                                Submit a Manuscript
                                {/* <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#12b48b] -mb-2"></span> */}
                            </h1>

                            <ManuscriptForm />
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="text-right py-3">
                            <a href="#" className="text-[#204066] text-xs hover:underline">Tweets by @ElkJournals</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SubmitYourManuScript;