import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Spin, Tabs, Card, Row, Col, Typography, Button, Divider, Tag, Space, Alert } from 'antd';
import {
    CalendarOutlined,
    EnvironmentOutlined,
    ShareAltOutlined,
    UserOutlined,
    MailOutlined,
    GlobalOutlined,
    ArrowRightOutlined,
    InfoCircleOutlined,
    TeamOutlined,
    FileTextOutlined,
    SafetyCertificateOutlined,
    ScheduleOutlined,
    TrophyOutlined,
    FieldTimeOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import { Carousel } from 'antd'; // Added for Keynote Speakers
import { conferenceTemplateApi } from '../../services/api'; // Ensure this path is correct based on original file
import { ImageURl } from '../../services/serviceApi'; // Ensure this path is correct
import DOMPurify from 'dompurify';
import Logo from "../../assets/images/elk-logo.png"; // check relative path
import { decryptId } from '../../utils/idEncryption';

const { Title, Text, Paragraph } = Typography;

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div
        {...props}
        className={
            "slick-prev slick-arrow !bg-blue-600 !h-10 !w-10 !flex !items-center !justify-center !rounded-full !left-[-15px] !z-10 hover:!bg-blue-700 custom-slick-arrow-left" +
            (props.className ? " " + props.className : "")
        }
        aria-hidden="true"
        aria-disabled={currentSlide === 0 ? true : false}
        type="button"
    >
        <LeftOutlined />
    </div>
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div
        {...props}
        className={
            "slick-next slick-arrow !bg-blue-600 !h-10 !w-10 !flex !items-center !justify-center !rounded-full !right-[-15px] !z-10 hover:!bg-blue-700 custom-slick-arrow-right" +
            (props.className ? " " + props.className : "")
        }
        aria-hidden="true"
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
        type="button"
    >
        <RightOutlined />
    </div>
);

const ConferenceDetailsPage = () => {
    const { encryptedId } = useParams();
    const navigate = useNavigate();
    const [conferenceData, setConferenceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const id = decryptId(encryptedId);

    useEffect(() => {
        const fetchDetails = async () => {
            // Mock Data structure logic removed as per request to use real API flow, but keeping the fetch logic.
            if (!id) {
                setError('Invalid conference URL');
                setLoading(false);
                return;
            }
            try {
                const response = await conferenceTemplateApi.getById(id);
                if (response.data && response.data.success) {
                    setConferenceData(response.data.success);
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
        fetchDetails();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    if (!conferenceData) return null;

    const {
        conference,
        description,
        organizing_committee,
        important_dates,
        key_benefits,
        who_should_join,
        organizer_logo,
        partner_image,
        conference_objectives,
        program_schedule,
        themes,
        keynote_speakers,
        venue,
        venue_image,
        past_conferences,
        organisers,
        steering_committee,
        review_board,
        call_for_papers,
        guidelines
    } = conferenceData;

    // Helper to safely parse JSON strings from the API response
    const parseJSON = (data, fallback = null) => {
        try {
            if (typeof data === 'object' && data !== null) return data;
            return typeof data === 'string' ? JSON.parse(data) : data;
        } catch (e) {
            console.error("JSON Parse Error", e);
            return fallback;
        }
    };

    const parsedImportantDates = parseJSON(important_dates, {});
    const parsedKeyBenefits = parseJSON(key_benefits, []);
    const parsedVenue = parseJSON(venue, {});
    const parsedKeynoteSpeakers = parseJSON(keynote_speakers, []);

    // Note: User asked to render "all these details", so I should try to render steering/review if they have content. 
    const parsedSteeringCommittee = parseJSON(steering_committee, []);
    const parsedReviewBoard = parseJSON(review_board, []);


    const createMarkup = (html) => ({ __html: DOMPurify.sanitize(html) });
    const formattedDate = conference?.start_date ? new Date(conference.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date TBA';

    // Helper component for content sections
    const ContentSection = ({ title, content, icon }) => {
        if (!content || content === 'null' || content === 'undefined') return null;
        return (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8" id={title.toLowerCase().replace(/\s/g, '-')}>
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    {icon && <div className="text-blue-600 text-2xl">{icon}</div>}
                    <h3 className="text-xl font-bold text-gray-800 m-0">{title}</h3>
                </div>
                <div className="text-gray-600 leading-relaxed ql-editor">
                    <div dangerouslySetInnerHTML={createMarkup(content)} />
                </div>
            </div>
        );
    };

    const importantDateKeys = Object.keys(parsedImportantDates);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* 1. Header Section */}
            <header className="bg-gradient-to-r from-[#0b1c2e] to-[#204066] shadow-lg sticky top-0 z-50 border-b border-white/5 backdrop-blur-sm bg-opacity-95">
                <div className="container mx-auto px-4 h-auto lg:h-20 py-3 lg:py-0 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">
                    <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
                        {organizer_logo ? (
                            <img src={`${ImageURl}${organizer_logo}`} alt="Conference Logo" className="h-10 md:h-12 object-contain bg-white rounded px-2 py-1 shadow-sm group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                            <span className="text-xl font-bold text-white tracking-wide">{conference?.name}</span>
                        )}
                    </Link>

                    {/* Basic Nav showing organized by */}
                    <nav className="hidden lg:flex flex-nowrap justify-center items-center gap-1 text-white">
                        <span className="font-semibold">{conference?.organized_by}</span>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link to="/">
                            <img src={Logo} alt="ELK Logo" className="h-8" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* 2. Hero Section */}
            <div className="relative bg-[#0b1c2e] text-white py-12 lg:py-20 overflow-hidden">
                {/* Dynamic Background or Fallback */}
                <div className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: venue_image ? `url(${ImageURl}${venue_image})` : `url('https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c2e] via-[#0b1c2e]/90 to-transparent" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                        <div className="lg:w-3/4">
                            <div className="flex items-center gap-2 text-orange-400 text-sm mb-4">
                                <Link to="/" className="hover:underline">Home</Link>
                                <span>&gt;</span>
                                <span className="truncate max-w-md">{conference?.name}</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6">
                                {conference?.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-8">
                                <div className="flex items-center gap-2">
                                    <CalendarOutlined className="text-lg" />
                                    <span className="font-medium text-white">{formattedDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <EnvironmentOutlined className="text-lg" />
                                    <span className="font-medium text-white">{parsedVenue?.name || conference?.city || 'Venue TBA'}</span>
                                </div>
                            </div>
                            <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-500 border-none px-8 h-12 text-lg font-semibold rounded-md flex items-center gap-2">
                                Register Now <ArrowRightOutlined />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Main Content Layout */}








            <div className="container mx-auto px-4 py-12">
                <Row gutter={[32, 32]}>
                    <Col xs={24} lg={16}>
                        {/* Description */}
                        <ContentSection title="About the Conference" content={description} icon={<InfoCircleOutlined />} />

                        {/* Objectives */}
                        <ContentSection title="Objectives" content={conference_objectives} icon={<GlobalOutlined />} />

                        {/* Themes */}
                        <ContentSection title="Conference Themes" content={themes} icon={<FileTextOutlined />} />

                        {/* Call For Papers */}
                        <ContentSection title="Call for Papers" content={call_for_papers} icon={<ShareAltOutlined />} />

                        {/* Guidelines */}
                        <ContentSection title="Submission Guidelines" content={guidelines} icon={<SafetyCertificateOutlined />} />

                        {/* Target Audience */}
                        <ContentSection title="Who Should Join" content={who_should_join} icon={<UserOutlined />} />



                        {/* Committee Tabs */}
                        <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-8 overflow-hidden">
                            <Tabs defaultActiveKey="organizing" className="px-6 pt-4" items={[
                                {
                                    key: 'organizing',
                                    label: (
                                        <span className="flex items-center gap-2 py-2 px-1 text-base font-medium">
                                            <TeamOutlined className="text-lg" /> Organizing Committee
                                        </span>
                                    ),
                                    children: (
                                        <div className="p-8 bg-gray-50/50 min-h-[200px]">
                                            {organizing_committee ? (
                                                <div className="organizing-committee-content">
                                                    <div
                                                        dangerouslySetInnerHTML={createMarkup(organizing_committee)}
                                                        className="text-gray-600 leading-relaxed 
                                                        [&>p]:bg-white [&>p]:p-4 [&>p]:rounded-lg [&>p]:border-l-4 [&>p]:border-blue-600 [&>p]:shadow-sm [&>p]:mb-3 
                                                        [&>p]:transition-all [&>p]:hover:shadow-md [&>p]:hover:translate-x-1
                                                        [&>ul]:list-none [&>ul]:p-0 
                                                        [&>ul>li]:bg-white [&>ul>li]:p-4 [&>ul>li]:rounded-lg [&>ul>li]:border-l-4 [&>ul>li]:border-blue-600 [&>ul>li]:shadow-sm [&>ul>li]:mb-3
                                                        [&>ul>li]:transition-all [&>ul>li]:hover:shadow-md [&>ul>li]:hover:translate-x-1
                                                        [&_strong]:text-blue-900 [&_strong]:font-bold [&_strong]:mr-2
                                                        [&_b]:text-blue-900 [&_b]:font-bold [&_b]:mr-2"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                                                    <div className="bg-gray-100 p-4 rounded-full mb-3">
                                                        <TeamOutlined className="text-2xl" />
                                                    </div>
                                                    <p>No Record Available</p>
                                                </div>
                                            )}
                                        </div>
                                    )
                                },
                                {
                                    key: 'steering',
                                    label: <span className="flex items-center gap-2 font-semibold"><TeamOutlined /> Steering Committee</span>,
                                    children: (
                                        <div className="pb-6 pt-2">
                                            {parsedSteeringCommittee.length > 0 ? (
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    {parsedSteeringCommittee.map((item, i) => {
                                                        const name = typeof item === 'object' ? (item.name || JSON.stringify(item)) : item;
                                                        const subtext = typeof item === 'object' && item.affiliation ? item.affiliation : null;

                                                        return (
                                                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100">
                                                                <div className="mt-1 bg-blue-100 text-blue-600 rounded-full p-1.5 shadow-sm">
                                                                    <UserOutlined />
                                                                </div>
                                                                <div>
                                                                    <div className="font-semibold text-gray-800">{name}</div>
                                                                    {subtext && <div className="text-xs text-gray-500">{subtext}</div>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="text-gray-500 italic text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">No Record Available</div>
                                            )}
                                        </div>
                                    )
                                },
                                {
                                    key: 'review',
                                    label: <span className="flex items-center gap-2 font-semibold"><TeamOutlined /> Review Board</span>,
                                    children: (
                                        <div className="pb-6 pt-2">
                                            {parsedReviewBoard.length > 0 ? (
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    {parsedReviewBoard.map((item, i) => {
                                                        const name = typeof item === 'object' ? (item.name || JSON.stringify(item)) : item;
                                                        const subtext = typeof item === 'object' && item.affiliation ? item.affiliation : null;

                                                        return (
                                                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100">
                                                                <div className="mt-1 bg-blue-100 text-blue-600 rounded-full p-1.5 shadow-sm">
                                                                    <UserOutlined />
                                                                </div>
                                                                <div>
                                                                    <div className="font-semibold text-gray-800">{name}</div>
                                                                    {subtext && <div className="text-xs text-gray-500">{subtext}</div>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="text-gray-500 italic text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">No Record Available</div>
                                            )}
                                        </div>
                                    )
                                }
                            ]} />
                        </div>

                        {/* Program Schedule */}
                        {program_schedule && (
                            <ContentSection title="Program Schedule" content={program_schedule} icon={<ScheduleOutlined />} />
                        )}

                    </Col>

                    {/* RIGHT COLUMN */}
                    <Col xs={24} lg={8}>
                        {/* Important Dates Card */}
                        {importantDateKeys.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-8 overflow-hidden">
                                <div className="bg-white p-6">
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                            <CalendarOutlined className="text-xl" />
                                        </div>
                                        <h3 className="text-gray-800 font-bold m-0 text-xl">Important Dates</h3>
                                    </div>

                                    <div className="space-y-6">
                                        {importantDateKeys.map((key, idx) => {
                                            const dateObj = parsedImportantDates[key];
                                            const title = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                            if (!dateObj) return null;

                                            // Logic to calculate status and progress
                                            const startDate = new Date(dateObj.startDate);
                                            const endDate = new Date(dateObj.lastDate);
                                            const today = new Date();
                                            let status = 'UPCOMING';
                                            let progress = 0;
                                            let statusColor = 'bg-blue-100 text-blue-600';
                                            let dotColor = 'bg-blue-500';

                                            if (today < startDate) {
                                                status = 'UPCOMING';
                                                progress = 0;
                                                statusColor = 'bg-gray-200 text-gray-500'; // Darker gray for visibility
                                                dotColor = 'bg-blue-500';
                                            } else if (today >= startDate && today <= endDate) {
                                                status = 'IN PROGRESS';
                                                const totalDuration = endDate - startDate;
                                                const elapsed = today - startDate;
                                                progress = Math.min((elapsed / totalDuration) * 100, 100);
                                                statusColor = 'bg-blue-100 text-blue-600';
                                                dotColor = 'bg-blue-600';
                                            } else {
                                                status = 'CLOSED';
                                                progress = 100;
                                                statusColor = 'bg-gray-100 text-gray-400';
                                                dotColor = 'bg-gray-400';
                                            }

                                            // Handle invalid dates
                                            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                                                progress = 0;
                                                status = 'TBA';
                                                statusColor = 'bg-gray-100 text-gray-400';
                                                dotColor = 'bg-gray-300';
                                            }

                                            return (
                                                <div key={idx} className="relative">
                                                    {/* Header Row: Dot, Title & Status */}
                                                    <div className="flex items-center justify-between mb-3 px-1">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`h-3 w-3 rounded-full border-2 border-white ring-1 ring-offset-0 ${dotColor.replace('bg-', 'ring-')}`}>
                                                                <div className={`h-full w-full rounded-full ${dotColor}`}></div>
                                                            </div>
                                                            <h4 className="font-bold text-gray-800 text-[15px] m-0">{title}</h4>
                                                        </div>
                                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${statusColor}`}>
                                                            {status}
                                                        </span>
                                                    </div>

                                                    {/* Details Card */}
                                                    <div className="bg-[#F8F9FC] rounded-xl p-3 border border-gray-100/50">
                                                        <div className="space-y-2">
                                                            {/* Start Date Row */}
                                                            <div className="flex items-center justify-between text-sm">
                                                                <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-wider">
                                                                    <CalendarOutlined className="text-gray-400" /> START DATE
                                                                </div>
                                                                <div className="font-bold text-gray-600/90 text-xs font-sans">
                                                                    {dateObj.startDate || 'TBA'}
                                                                </div>
                                                            </div>

                                                            {/* Deadline Row */}
                                                            <div className="flex items-center justify-between text-sm">
                                                                <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-wider">
                                                                    <FieldTimeOutlined /> DEADLINE
                                                                </div>
                                                                <div className="font-bold text-red-500 text-xs font-sans">
                                                                    {dateObj.lastDate || 'TBA'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Organizers Section from HTML or generic */}
                        {(organisers || organizer_logo) && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 p-6 mt-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Organized By</h3>
                                {organizer_logo && (
                                    <div className="mb-4 flex justify-center">
                                        <img src={`${ImageURl}${organizer_logo}`} alt="Organizer Logo" className="max-h-24 object-contain" />
                                    </div>
                                )}
                                {organisers && (
                                    <div dangerouslySetInnerHTML={createMarkup(organisers)} className="text-gray-600 text-sm" />
                                )}
                            </div>
                        )}

                        {/* Venue / Location Section - Updated */}
                        {parsedVenue && (parsedVenue.name || typeof venue === 'string') && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Venue Location</h3>
                                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative shadow-inner">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        src={`https://maps.google.com/maps?q=${encodeURIComponent(parsedVenue.name || venue)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                        allowFullScreen
                                        title="Venue Map"
                                    ></iframe>
                                </div>
                                <p className="mt-3 text-center font-medium text-gray-700 flex items-center justify-center gap-2">
                                    <EnvironmentOutlined className="text-red-500" /> {parsedVenue.name || venue}
                                </p>
                            </div>
                        )}

                    </Col>
                </Row>
            </div>

            {/* Key Benefits - Full Width with Background */}
            {parsedKeyBenefits && parsedKeyBenefits.length > 0 && (
                <div className="w-full bg-blue-50 py-12">
                    <div className="container mx-auto px-4">
                        <div className="mb-0">
                            <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
                                <TrophyOutlined className="text-blue-600" /> Key Benefits
                            </h3>
                            <div className="grid md:grid-cols-2 gap-5">
                                {parsedKeyBenefits.map((benefit, idx) => (
                                    <div key={idx} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 border-l-[5px] border-l-blue-600 flex  justify-start gap-4 transition-all hover:shadow-md hover:-translate-y-0.5 duration-300 h-full">
                                        <div className="text-yellow-500 text-2xl flex-shrink-0 flex ">
                                            <TrophyOutlined />
                                        </div>
                                        <span className="text-[#0b1c2e] font-bold text-[15px] leading-snug text-left">
                                            {typeof benefit === 'string' ? benefit : JSON.stringify(benefit)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 py-12">
                {/* Keynote Speakers - Full Width */}
                {parsedKeynoteSpeakers && parsedKeynoteSpeakers.length > 0 && (
                    <div className="mb-14 relative group">
                        <h3 className="text-xl font-bold text-gray-800 mb-8 text-center">
                            Keynote Speakers
                        </h3>

                        <div className="px-4 md:px-12">
                            <Carousel
                                arrows={true}
                                prevArrow={<SlickArrowLeft />}
                                nextArrow={<SlickArrowRight />}
                                slidesToShow={3}
                                slidesToScroll={1}
                                dots={false}
                                responsive={[
                                    { breakpoint: 1024, settings: { slidesToShow: 2 } },
                                    { breakpoint: 640, settings: { slidesToShow: 1 } }
                                ]}
                                className="pb-8 -mx-4"
                            >
                                {parsedKeynoteSpeakers.map((speaker, idx) => (
                                    <div key={idx} className="px-4 h-full">
                                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-[320px] flex flex-col relative mx-2">
                                            {/* Header */}
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-blue-100 flex-shrink-0">
                                                    {speaker.image ? (
                                                        <img src={`${ImageURl}${speaker.image}`} alt={speaker.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full bg-blue-50 flex items-center justify-center text-blue-300">
                                                            <UserOutlined className="text-2xl" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800 text-lg leading-tight">{speaker.name}</h4>
                                                    <p className="text-blue-600 text-sm font-medium m-0 line-clamp-2">{speaker.designation}</p>
                                                </div>
                                            </div>

                                            <Divider className="my-3" />

                                            {/* Content */}
                                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                                <div className="flex gap-3">
                                                    <div className="flex-shrink-0 mt-1">
                                                        <span className="text-4xl text-blue-200 leading-none font-serif">“</span>
                                                    </div>
                                                    <p className="text-gray-600 text-[13px] leading-relaxed italic">
                                                        {speaker.about}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                )}
            </div>







        </div >
    );
};

export default ConferenceDetailsPage;