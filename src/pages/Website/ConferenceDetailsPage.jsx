import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Spin, Tabs, Card, Row, Col, Typography, Button, Table, Alert } from 'antd';
import { HomeOutlined, DownloadOutlined, EnvironmentOutlined, TeamOutlined, ScheduleOutlined, InfoCircleOutlined, FileTextOutlined, PhoneOutlined } from '@ant-design/icons';
import { conferenceTemplateApi } from '../../services/api'; // Adjust path if needed
import { ImageURl } from '../../services/serviceApi'; // Adjust path if needed
import DOMPurify from 'dompurify';
import moment from 'moment';
import logo from "../../assets/images/elk-logo.png"; // Assuming standard logo path

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ConferenceDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [conferenceData, setConferenceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await conferenceTemplateApi.getById(id);
                if (response.data && response.data.success) {
                    const data = response.data.success;

                    // Helper to safely parse JSON or return original if array
                    const safeJsonParse = (field) => {
                        if (Array.isArray(field)) return field;
                        if (typeof field === 'string') {
                            try {
                                const parsed = JSON.parse(field);
                                if (Array.isArray(parsed)) return parsed;
                            } catch (e) {
                                // If not valid JSON, return empty array for safety
                                console.warn('Failed to parse JSON field:', e);
                            }
                        }
                        return [];
                    };

                    // Helper for string arrays (comma separated or JSON)
                    const safeStringArrayParse = (field) => {
                        if (Array.isArray(field)) return field;
                        if (typeof field === 'string') {
                            try {
                                const parsed = JSON.parse(field);
                                if (Array.isArray(parsed)) return parsed;
                            } catch (e) {
                                // Not JSON, try comma separation
                                return field.split(',').map(item => item.trim()).filter(item => item);
                            }
                        }
                        return [];
                    };

                    // Apply safe parsing to specific fields suspected to be JSON strings
                    data.steering_committee = safeJsonParse(data.steering_committee);
                    data.review_board = safeJsonParse(data.review_board);
                    data.keynote_speakers = safeJsonParse(data.keynote_speakers);
                    data.key_benefits = safeStringArrayParse(data.key_benefits);

                    setConferenceData(data);
                } else {
                    setError('Failed to load conference details.');
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred while fetching details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetails();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    if (!conferenceData) return null;

    // Destructure data for easier access
    const {
        conference,
        venue, // object {name, map_link}
        description,
        conference_objectives,
        organizer_image,
        organizer_logo,
        important_dates,
        call_for_papers,
        organizing_committee,
        steering_committee,
        review_board,
        keynote_speakers,
        organisers,
        guidelines,
        themes,
        key_benefits
    } = conferenceData;

    // Helper to safely render HTML
    const createMarkup = (html) => {
        return { __html: DOMPurify.sanitize(html) };
    };

    // Prepare Important Dates for Table
    const dateColumns = [
        { title: 'Event', dataIndex: 'event', key: 'event', render: text => <span className="font-semibold text-gray-700">{text}</span> },
        { title: 'Date', dataIndex: 'date', key: 'date', render: text => <span className="text-red-600 font-bold">{text}</span> },
    ];

    const dateData = [];
    if (important_dates) {
        const formatDateRange = (item) => {
            if (!item) return 'TBA';
            const start = item.startDate ? item.startDate : '';
            const end = item.lastDate ? item.lastDate : '';
            if (start && end) return `${start} - ${end}`;
            return end || start || 'TBA';
        };

        if (important_dates.abstract_submission) {
            dateData.push({ key: '1', event: 'Abstract Submission Deadline', date: formatDateRange(important_dates.abstract_submission) });
        }
        if (important_dates.full_paper_submission) {
            dateData.push({ key: '2', event: 'Full Paper Submission Deadline', date: formatDateRange(important_dates.full_paper_submission) });
        }
        if (important_dates.registration) {
            dateData.push({ key: '3', event: 'Registration Deadline', date: formatDateRange(important_dates.registration) });
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            {/* Custom Header */}
            <div className="bg-[#2c4a6e] text-white py-4 px-4 shadow-md">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Left: ELK Logo (Home Link) */}
                    <Link to="/" className="flex-shrink-0 hover:opacity-90 transition-opacity">
                        <img src={`${ImageURl}${organizer_logo}`} alt="ELK Education" className="h-12 md:h-16 bg-white rounded p-1" />
                    </Link>

                    {/* Center: Title & Venue */}
                    <div className="text-center flex-grow">
                        <h1 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide mb-1">
                            {conference?.name}
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-[#45cbb2] font-medium text-sm md:text-base">
                            <EnvironmentOutlined />
                            <span>{venue?.name || conference?.organized_by}</span>
                        </div>
                    </div>

                    {/* Right: Organizer Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img src={logo} alt="Logo" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="container mx-auto px-4 py-8 flex-grow">

                <Tabs defaultActiveKey="home" type="card" className="custom-tabs" size="large">

                    {/* HOME / OVERVIEW TAB */}
                    <TabPane tab={<span><HomeOutlined /> Overview</span>} key="home">
                        <div className="bg-white p-6 rounded-b shadow-sm">
                            {/* Top Row: 3 Columns */}
                            <Row gutter={[24, 24]} className="mb-8">
                                {/* Col 1: Conference Details / Objectives */}
                                <Col xs={24} lg={8}>
                                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 border-b-2 border-[#45cbb2] inline-block pb-1">
                                        About Conference
                                    </h3>
                                    <div className="prose prose-sm max-w-none text-gray-600">
                                        {conference_objectives ? (
                                            <div dangerouslySetInnerHTML={createMarkup(conference_objectives)} />
                                        ) : (
                                            <p>Join us for the {conference?.name}, a premier gathering of professionals and scholars.</p>
                                        )}
                                    </div>
                                </Col>

                                {/* Col 2: Organizer Image */}
                                <Col xs={24} md={12} lg={8} className="flex flex-col items-center">
                                    {organizer_image ? (
                                        <div className="w-full h-full min-h-[200px] bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                                            <img
                                                src={`${ImageURl}${organizer_image}`}
                                                alt="Organizer Banner"
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
                                            No Organizer Image
                                        </div>
                                    )}
                                </Col>

                                {/* Col 3: Important Dates */}
                                <Col xs={24} md={12} lg={8}>
                                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 border-b-2 border-[#45cbb2] inline-block pb-1">
                                        Important Dates
                                    </h3>
                                    <div className="space-y-3">
                                        {dateData?.length > 0 && dateData.map((item) => (
                                            <div key={item.key} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                                                <div className="flex-shrink-0 bg-blue-50 text-[#1e3a5f] p-3 rounded-lg">
                                                    <ScheduleOutlined className="text-xl" />
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-gray-800 text-sm mb-1">{item.event}</h4>
                                                    <div className="text-[#e63946] font-bold text-xs md:text-sm bg-red-50 inline-block px-2 py-1 rounded border border-red-100">
                                                        {item.date}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>

                            <hr className="border-gray-100 my-8" />

                            {/* Row 2: Full Description */}
                            {description && (
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">Detailed Description</h3>
                                    <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-[#1e3a5f]">
                                        <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={createMarkup(description)} />
                                    </div>
                                </div>
                            )}

                            {/* Row 3: Key Benefits / Themes */}
                            {themes && (
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">Conference Themes</h3>
                                    <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={createMarkup(themes)} />
                                </div>
                            )}

                            {/* Key Benefits List */}
                            {key_benefits && key_benefits.length > 0 && typeof key_benefits !== 'string' && (
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">Key Benefits</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {key_benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                                                <div className="mt-1 text-[#45cbb2] font-bold">•</div>
                                                <div className="text-gray-700">{benefit}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}


                            {/* Organizers Section for Home Tab */}
                            {organisers && (
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">Organizers</h3>
                                    <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={createMarkup(organisers)} />
                                </div>
                            )}

                        </div>
                    </TabPane>

                    {/* CALL FOR PAPERS TAB */}
                    {call_for_papers && (
                        <TabPane tab={<span><FileTextOutlined /> Call for Papers</span>} key="cfp">
                            <div className="bg-white p-8 rounded-b shadow-sm min-h-[400px]">
                                <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Call for Papers</h2>
                                <div className="prose max-w-none" dangerouslySetInnerHTML={createMarkup(call_for_papers)} />
                                {guidelines && (
                                    <div className="mt-8 pt-8 border-t border-gray-200">
                                        <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">Submission Guidelines</h3>
                                        <div className="prose max-w-none" dangerouslySetInnerHTML={createMarkup(guidelines)} />
                                    </div>
                                )}
                            </div>
                        </TabPane>
                    )}

                    {/* COMMITTEE TAB */}
                    {(organizing_committee || steering_committee || review_board) && (
                        <TabPane tab={<span><TeamOutlined /> Committee</span>} key="committee">
                            <div className="bg-white p-8 rounded-b shadow-sm">
                                {organizing_committee && (
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 bg-gray-100 p-2 border-l-4 border-blue-500">Organizing Committee</h3>
                                        <div className="prose max-w-none" dangerouslySetInnerHTML={createMarkup(organizing_committee)} />
                                    </div>
                                )}

                                {/* Steering Committee List */}
                                {steering_committee && steering_committee.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 bg-gray-100 p-2 border-l-4 border-blue-500">Steering Committee</h3>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {steering_committee.map((member, idx) => (
                                                <Card key={idx} size="small" className="hover:shadow-md transition-shadow">
                                                    <span className="font-medium text-gray-800">{member.name}</span>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Review Board List */}
                                {review_board && review_board.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 bg-gray-100 p-2 border-l-4 border-blue-500">Review Board</h3>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {review_board.map((member, idx) => (
                                                <Card key={idx} size="small" className="hover:shadow-md transition-shadow">
                                                    <span className="font-medium text-gray-800">{member.name}</span>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabPane>
                    )}

                    {/* KEYNOTE SPEAKERS TAB */}
                    {keynote_speakers && keynote_speakers.length > 0 && (
                        <TabPane tab={<span><TeamOutlined /> Keynote Speakers</span>} key="speakers">
                            <div className="bg-white p-8 rounded-b shadow-sm">
                                <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Keynote Speakers</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {keynote_speakers.map((speaker, index) => (
                                        <div key={index} className="flex flex-col sm:flex-row gap-6 bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow border border-gray-100">
                                            <div className="flex-shrink-0 mx-auto sm:mx-0">
                                                {speaker.image ? (
                                                    <img src={`${ImageURl}${speaker.image}`} alt={speaker.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm" />
                                                ) : (
                                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-400">
                                                        {speaker.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-center sm:text-left">
                                                <h3 className="text-xl font-bold text-[#1e3a5f]">{speaker.name}</h3>
                                                <p className="text-[#45cbb2] font-medium mb-2">{speaker.designation}</p>
                                                <p className="text-gray-600 text-sm italic">{speaker.about}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabPane>
                    )}

                    {/* VENUE TAB */}
                    {venue && (
                        <TabPane tab={<span><EnvironmentOutlined /> Venue</span>} key="venue">
                            <div className="bg-white p-8 rounded-b shadow-sm">
                                <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Conference Venue</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{venue.name}</h3>
                                        <p className="text-gray-600 mb-6">
                                            Join us at this prestigious location for an immersive experience.
                                        </p>
                                        {/* Venue Image if available */}
                                        {conferenceData.venue_image && (
                                            <div className="rounded-lg overflow-hidden shadow-md mb-6">
                                                <img src={`${ImageURl}${conferenceData.venue_image}`} alt={venue.name} className="w-full h-64 object-cover" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="h-96 bg-gray-100 rounded-lg overflow-hidden shadow-inner border border-gray-200">
                                        {/* Google Map Embed */}
                                        {venue.map_link && (
                                            <iframe
                                                title="Venue Map"
                                                width="100%"
                                                height="100%"
                                                frameBorder="0"
                                                style={{ border: 0 }}
                                                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(venue.map_link)}`} // Note: USER needs to handle API Key or use simple embed if link is embeddable
                                            // Fallback to simple iframe if map_link is a directly embeddable URL, usually it is not.
                                            // For now, let's assume we might need to just render a link or handle it safely.
                                            // If it's a regular link, we can't embed it directly without manipulation.
                                            // Simple fallback:
                                            ></iframe>
                                        ) || (
                                                <div className="flex items-center justify-center h-full text-gray-500">
                                                    Map Unavailable
                                                </div>
                                            )}
                                        {/* Note: Google Maps Embed usually requires an API key or a specific embed URL structure. 
                                             If the user provides a standard share link, it might be refused to connect in iframe.
                                             Let's try to just use a link for now if simple embed fails, but for visual I'll put a placeholder or just the link.
                                          */}
                                    </div>
                                </div>
                                {venue.map_link && (
                                    <div className="mt-4 text-center">
                                        <Button type="primary" icon={<EnvironmentOutlined />} href={venue.map_link} target="_blank" size="large">
                                            View on Google Maps
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </TabPane>
                    )}

                </Tabs>
            </div>

            {/* Footer Area (Simple) */}
            <div className="bg-gray-800 text-gray-400 py-6 text-center text-sm">
                &copy; {new Date().getFullYear()} {conference?.name || 'ELK Education'}. All Rights Reserved.
            </div>
        </div>
    );
};

export default ConferenceDetailsPage;
