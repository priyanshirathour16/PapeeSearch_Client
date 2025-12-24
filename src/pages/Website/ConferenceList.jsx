import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { conferenceTemplateApi, conferenceApi } from "../../services/api";
import { Spin } from "antd";
import moment from "moment";
import { encryptId } from "../../utils/crypto";

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
        <div className="py-8 bg-white min-h-screen font-sans">
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
                <div className="space-y-6">
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
                                    to={`/conference/${item?.conference_id}`}
                                    key={item.id}
                                    className="block bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group overflow-hidden flex flex-col md:flex-row min-h-[100px]"
                                >
                                    {/* Left Date Box */}
                                    <div className="bg-[#5c6e91] text-white flex flex-col justify-center items-center text-center w-full md:w-56 flex-shrink-0 group-hover:bg-[#4a5a75] transition-colors relative p-3 ">
                                        <div className="text-xs font-bold mb-1 opacity-90">{dateStr}</div>
                                        <div className="text-xl font-bold tracking-wider uppercase border-t border-white/30 pt-1 mt-1">{label}</div>
                                    </div>

                                    {/* Right Content */}
                                    <div className="p-4 flex-grow flex flex-col justify-center bg-gray-50 hover:bg-gray-100">
                                        {/* <div className="mb-2">
                                            <span className="inline-block bg-gray-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                                {acronym}
                                            </span>
                                        </div> */}
                                        <h2 className="text-lg font-bold text-[#202020] mb-1 leading-tight group-hover:text-[#45cbb2] transition-colors font-sans hover:text-black capitalize">
                                            {name}
                                        </h2>
                                        <div className="text-sm text-[#0097a7] font-medium">
                                            {venueName}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="text-center py-12 bg-white rounded shadow-sm">
                            <p className="text-gray-500 text-lg">No {type} conferences found at this time.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConferenceList;
