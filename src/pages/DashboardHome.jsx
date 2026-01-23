import React, { useState, useEffect } from 'react';
import { getRole } from '../utils/secureStorage';
import { conferenceTemplateApi } from '../services/api';
import { Link } from 'react-router-dom';
import { generateConferenceUrl } from '../utils/idEncryption';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import moment from 'moment';
import { Spin } from 'antd';

const DashboardHome = () => {
    const user = localStorage.getItem('user');
    const parseUser = JSON.parse(user);
    const role = getRole();
    const displayRole = role.charAt(0).toUpperCase() + role.slice(1);

    const [conferences, setConferences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConferences = async () => {
            try {
                const response = await conferenceTemplateApi.getAll();
                let data = [];
                if (response.data && response.data.success) {
                    if (Array.isArray(response.data.success)) {
                        data = response.data.success;
                    } else {
                        data = [response.data.success];
                    }
                }
                // Sort by date descending (newest first)
                const allConferences = data.sort((a, b) => {
                    return moment(b.conference?.start_date) - moment(a.conference?.start_date);
                });
                setConferences(allConferences);
            } catch (error) {
                console.error('Failed to fetch conferences:', error);
            } finally {
                setLoading(false);
            }
        };

        if (role === 'author') {
            fetchConferences();
        } else {
            setLoading(false);
        }
    }, [role]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Welcome {`${parseUser?.firstName ? parseUser?.firstName : displayRole}`}
            </h1>

            {role === 'author' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-[#204066] mb-4 flex items-center gap-2">
                        <FaCalendarAlt /> All Conferences
                    </h2>

                    {loading ? (
                        <div className="flex justify-center p-8">
                            <Spin />
                        </div>
                    ) : conferences.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {conferences.map((item) => {
                                const name = item.conference?.name;
                                const date = moment(item.conference?.start_date).format('MMM DD, YYYY');
                                let venueName = item.conference?.organized_by;
                                try {
                                    const venueObj = JSON.parse(item.venue);
                                    if (venueObj?.name) venueName = venueObj.name;
                                } catch (e) { }

                                return (
                                    <div key={item.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all hover:border-[#12b48b] group flex flex-col h-full">
                                        <div className="mb-4 flex-grow">
                                            <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-[#12b48b] transition-colors">
                                                {name}
                                            </h3>
                                            <div className="space-y-2 text-sm text-gray-500">
                                                <div className="flex items-center gap-2">
                                                    <FaCalendarAlt className="text-[#12b48b]" />
                                                    <span>{date}</span>
                                                </div>
                                                {venueName && (
                                                    <div className="flex items-center gap-2">
                                                        <FaMapMarkerAlt className="text-[#12b48b]" />
                                                        <span>{venueName}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-gray-100">
                                            <Link
                                                to={generateConferenceUrl(name, item.conference_id)}
                                                className="flex items-center justify-center gap-2 w-full py-2 bg-gray-50 hover:bg-[#12b48b] text-gray-600 hover:text-white rounded-lg transition-colors font-medium"
                                            >
                                                View Details <FaArrowRight size={12} />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                            No upcoming conferences available at the moment.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DashboardHome;
