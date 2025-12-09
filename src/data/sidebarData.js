import { FaBook, FaEye, FaNewspaper } from 'react-icons/fa';

export const sidebarData = [
    {
        title: 'Manage Journals',
        icon: FaBook, // Storing component reference directly
        path: '#',
        subNav: [
            {
                title: 'View Journals',
                path: '/dashboard/view-journal',
                icon: FaEye,
            },
            {
                title: 'View Journal Issues',
                path: '/dashboard/journal-issues',
                icon: FaNewspaper,
            },
            {
                title: 'Journal Categories',
                path: '/dashboard/journal-categories',
                icon: FaBook,
            }
        ]
    },
    {
        title: 'Manage User',
        icon: FaBook, // Using FaBook temporarily, can change if needed or import FaUsers
        path: '#',
        subNav: [
            {
                title: 'Author',
                path: '/dashboard/manage-user/author', // Updated path to match typically admin routes, adjusting to dashboard/admin-authors
                icon: FaEye,
            },
            {
                title: 'Editor',
                path: '/dashboard/manage-user/editor',
                icon: FaEye,
            }
        ]
    }
];
