import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { conferenceTemplateApi, conferenceApi } from "../../services/api";
import { Spin } from "antd";
import moment from "moment";
import { generateConferenceUrl } from "../../utils/idEncryption";

const ConferenceList = ({ type }) => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await conferenceTemplateApi.getAll();
                let data = [];
                // Check if response.data.success is an array or single object (just in case)
                if (response.data && response.data.success) {
                    if (Array.isArray(response.data.success)) {
                        data = response.data.success;
                    } else {
                        data = [response.data.success];
                    }
                }

                const today = moment().startOf('day');

                const filtered = data.filter(item => {
                    // Use conference.start_date as the primary source of truth
                    const startDateStr = item.conference?.start_date;
                    if (!startDateStr) return false;

                    const startDate = moment(startDateStr);
                    // "if the conference.start_date is not date ot next date meas it is previos"
                    // Upcoming: Today onwards
                    // Previous: Before today

                    const isUpcoming = startDate.isSameOrAfter(today);
                    return type === 'upcoming' ? isUpcoming : !isUpcoming;
                });

                // Sort
                filtered.sort((a, b) => {
                    const dateA = moment(a.conference?.start_date || 0);
                    const dateB = moment(b.conference?.start_date || 0);
                    // Upcoming: Ascending (soonest first)
                    // Previous: Descending (most recent first)
                    return type === 'upcoming' ? dateA - dateB : dateB - dateA;
                });

                setTemplates(filtered);

            } catch (error) {
                console.error("Failed to fetch conferences", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);

    // Parse helper just in case some fields are JSON strings or objects
    const parseField = (field) => {
        if (!field) return null;
        if (typeof field === 'string') {
            try {
                return JSON.parse(field);
            } catch (e) {
                return null; // or return field if it's just a string title? regex check?
            }
        }
        return field;
    };

    const getDateDisplay = (item) => {
        const startDateStr = item.conference?.start_date;
        if (!startDateStr) return { dateStr: 'Date TBA', label: type === 'upcoming' ? "UPCOMING" : "PREVIOUS" };

        const start = moment(startDateStr);
        // Try to find end date from important_dates if available
        let end = null;

        // Handling important_dates which might be where end date is, or just use start date
        // User didn't specify End Date source in the JSON snippet, 'important_dates' had 'registration', etc.
        // We'll stick to start_date or range IF we can find it.
        // For now, let's format start_date. If there is a 'conference_dates' or similar, we use it.

        // Based on user image "27 MAR 2026 - 28 MAR 2026"
        // Let's rely on Start Date from conference object.
        const dateStr = start.format("DD MMM YYYY").toUpperCase();

        return {
            dateStr: dateStr,
            label: type === 'upcoming' ? "UPCOMING" : "PREVIOUS"
        };
    };

    const getVenueName = (item) => {
        // user JSON shows venue as an object
        // "venue": { "name": "...", "map_link": "..." }
        const venue = parseField(item.venue);
        return venue?.name || item.conference?.organized_by || "Venue To Be Announced";
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <Spin size="large" tip="Loading Conferences..." />
            </div>
        );
    }

    return (
        <div className="py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen font-sans">
            <div className="container mx-auto px-4">
                {/* Header */}
                {/* <div className="mb-10 ">
                    <h1 className="text-3xl font-bold text-[#1e3a5f] uppercase tracking-wide">
                        {type === 'upcoming' ? 'Upcoming Conferences' : 'Previous Conferences'}
                    </h1>
                    
                </div> */}

                <div className="mb-8">
                    <h1 className="text-2xl text-[#12b48b] font-normal relative inline-block">
                        {type === 'upcoming' ? 'Upcoming Conferences' : 'Previous Conferences'}
                    </h1>
                </div>

                {/* List */}
                <div className="grid grid-cols-1 gap-6">
                    {templates.length > 0 ? (
                        templates.map((item) => {
                            const { dateStr, label } = getDateDisplay(item);
                            const venueName = item?.conference?.organized_by;

                            // Acronym - check if fields exist, else generate
                            // User example has "conference": { "name": "...", "organized_by": "..." }
                            // Let's try to make a badge from the name if no acronym field
                            const name = item.conference?.name || "Conference";
                            const acronym = name.split(/\s+/).map(w => w[0]).join('').substring(0, 8).toUpperCase() + '-' + moment(item.conference?.start_date).year();

                            return (
                                <Link
                                    to={generateConferenceUrl(name, item?.conference_id)}
                                    key={item.id}
                                    className="block bg-white shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col md:flex-row min-h-[120px] rounded-xl border border-gray-200 hover:border-[#12b48b]/50 transform hover:scale-105"
                                >
                                    {/* Left Date Box */}
                                    <div className="bg-gradient-to-br from-[#5c6e91] to-[#3d4f6f] text-white flex flex-col justify-center items-center text-center w-full md:w-64 flex-shrink-0 group-hover:from-[#12b48b] group-hover:to-[#0e9673] transition-all duration-300 relative p-6 rounded-xl md:rounded-none">
                                        <div className="text-sm font-bold mb-2 opacity-90 tracking-wide">{dateStr}</div>
                                        <div className="text-2xl font-bold tracking-widest uppercase border-t border-white/30 pt-2 mt-2">{label}</div>
                                    </div>

                                    {/* Right Content */}
                                    <div className="p-6 flex-grow flex flex-col justify-center bg-gradient-to-r from-white to-gray-50 group-hover:from-gray-50 group-hover:to-white transition-colors duration-300">
                                        <h2 className="text-xl font-bold text-[#202020] mb-2 leading-tight group-hover:text-[#12b48b] transition-colors font-sans capitalize">
                                            {name}
                                        </h2>
                                        <div className="flex items-center gap-2 text-sm text-[#0097a7] font-medium">
                                            <span className="text-lg">📍</span>
                                            {venueName}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 px-6 bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-xl border-2 border-gray-200 hover:shadow-2xl transition-all duration-300">
                            <div className="flex justify-center mb-6">
                                <div className="text-6xl mb-4 animate-bounce">📭</div>
                            </div>
                            <h2 className="text-2xl font-bold text-[#204066] mb-3 text-center">No {type} Conferences Available</h2>
                            <p className="text-gray-600 text-lg max-w-md mx-auto mb-2 text-center">
                                We don't have any {type} conferences listed at the moment.
                            </p>
                            <p className="text-[#12b48b] font-semibold mb-8 text-center">
                                ⏰ Check back later for exciting updates!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link 
                                    to="/" 
                                    className="inline-block bg-gradient-to-r from-[#12b48b] to-[#0e9673] hover:from-[#0e9673] hover:to-[#0a7857] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    ← Back to Home
                                </Link>
                                <a 
                                    href="mailto:info@elkjournals.com"
                                    className="inline-block bg-gradient-to-r from-[#204066] to-[#1a3352] hover:from-[#1a3352] hover:to-[#12304a] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    📧 Notify Me
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConferenceList;
