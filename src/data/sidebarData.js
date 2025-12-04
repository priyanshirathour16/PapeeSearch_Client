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
            }
        ]
    }
];
