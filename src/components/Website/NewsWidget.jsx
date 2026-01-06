import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaNewspaper, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { newsApi } from '../../services/api';
import { encryptId } from '../../utils/idEncryption';
import moment from 'moment';

/**
 * NewsWidget - A reusable sidebar widget that displays the latest news items
 * 
 * @param {number} limit - Number of news items to display (default: 5)
 * @param {boolean} showHeader - Whether to show the "Latest News" header (default: true)
 * 
 * Usage:
 *   <NewsWidget />
 *   <NewsWidget limit={3} />
 *   <NewsWidget limit={10} showHeader={false} />
 */
const NewsWidget = ({ limit = 5, showHeader = true }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLatestNews();
    }, []);

    const fetchLatestNews = async () => {
        try {
            const response = await newsApi.getAll();
            // Sort by news_date descending and take first 'limit' items
            const sortedNews = response.data.data
                .sort((a, b) => new Date(b.news_date) - new Date(a.news_date))
                .slice(0, limit);
            setNews(sortedNews);
        } catch (error) {
            console.error('Failed to fetch news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewsClick = (id) => {
        const encryptedId = encryptId(id);
        navigate(`/news/${encryptedId}`);
    };

    const truncateTitle = (title, maxLength = 45) => {
        if (title.length <= maxLength) return title;
        return title.substring(0, maxLength) + '...';
    };

    if (loading) {
        return (
            <div className="bg-white shadow-sm border border-gray-200">
                {showHeader && (
                    <div className="bg-[#12b48b] text-white p-3 font-bold uppercase flex items-center gap-2">
                        <FaNewspaper /> Latest News
                    </div>
                )}
                <div className="p-4 text-center text-gray-500 text-sm">
                    Loading news...
                </div>
            </div>
        );
    }

    if (news.length === 0) {
        return (
            <div className="bg-white shadow-sm border border-gray-200">
                {showHeader && (
                    <div className="bg-[#12b48b] text-white p-3 font-bold uppercase flex items-center gap-2">
                        <FaNewspaper /> Latest News
                    </div>
                )}
                <div className="p-4 text-center text-gray-500 text-sm">
                    No news available
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-sm border border-gray-200">
            {showHeader && (
                <div className="bg-[#12b48b] text-white p-3 font-bold uppercase flex items-center gap-2">
                    <FaNewspaper /> Latest News
                </div>
            )}
            <div className="divide-y divide-gray-100">
                {news.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleNewsClick(item.id)}
                        className="p-3 hover:bg-gray-50 cursor-pointer transition-colors group"
                    >
                        <h4 className="text-sm font-medium text-[#204066] group-hover:text-[#12b48b] transition-colors leading-tight">
                            {truncateTitle(item.title)}
                        </h4>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                            <FaCalendarAlt className="text-[10px]" />
                            <span>{moment(item.news_date).format('MMM DD, YYYY')}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3 border-t border-gray-200 bg-gray-50">
                <Link
                    to="/news"
                    className="flex items-center justify-center gap-2 text-sm font-medium text-[#12b48b] hover:text-[#0e9673] transition-colors"
                >
                    <FaNewspaper />
                    See All News
                    <FaArrowRight className="text-xs" />
                </Link>
            </div>
        </div>
    );
};

export default NewsWidget;
