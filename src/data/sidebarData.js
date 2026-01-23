import { FaBook, FaEye, FaNewspaper, FaFileAlt, FaEnvelope } from 'react-icons/fa';

export const sidebarData = [
    {
        title: 'Manage Journals',
        icon: FaBook, // Storing component reference directly
        path: '#',
        access: ["admin"],
        subNav: [
            {
                title: 'View Journals',
                path: '/dashboard/view-journal',
                icon: FaEye,
                access: ["admin"]
            },
            {
                title: 'View Journal Issues',
                path: '/dashboard/journal-issues',
                icon: FaNewspaper,
                access: ["admin"]
            },
            {
                title: 'Journal Categories',
                path: '/dashboard/journal-categories',
                icon: FaBook,
                access: ["admin"]
            },

        ]
    },
    {
        title: 'Manage User',
        icon: FaBook, // Using FaBook temporarily, can change if needed or import FaUsers
        path: '#',
        access: ["admin"],
        subNav: [
            {
                title: 'Author',
                path: '/dashboard/manage-user/author', // Updated path to match typically admin routes, adjusting to dashboard/admin-authors
                icon: FaEye,
                access: ["admin"]
            },
            {
                title: 'Editor',
                path: '/dashboard/manage-user/editor',
                icon: FaEye,
                access: ["admin"]
            }
        ]
    },
    {
        title: 'Submitted Manuscript',
        icon: FaFileAlt,
        path: '/dashboard/manuscripts',
        access: ["admin"]
    },
    {
        title: 'View Submitted Publication',
        icon: FaNewspaper,
        path: '/dashboard/view-submitter-publications',
        access: ["admin"]
    },
    // {
    //     title: 'Manage News',
    //     icon: FaNewspaper,
    //     path: '/dashboard/manage-news',
    //     access: ["admin"]
    // },
    {
        title: 'Conference',
        icon: FaBook,
        path: '#',
        access: ["admin"],
        subNav: [
            {
                title: 'Add Conference',
                path: '/dashboard/add-conference',
                icon: FaFileAlt,
                access: ["admin"]
            },
            {
                title: 'Conference Template',
                path: '/dashboard/conference-templates',
                icon: FaFileAlt,
                access: ["admin"]
            },
            {
                title: 'Registrations',
                path: '/dashboard/conference-registrations',
                icon: FaBook,
                access: ["admin"]
            }
        ]
    },
    {
        title: 'Contact Us Inquiries',
        icon: FaEnvelope,
        path: '/dashboard/contact-us',
        access: ["admin"]
    },

    {
        title: 'Submit Manuscript',
        icon: FaEnvelope,
        path: '/dashboard/submit-manuscript',
        access: ["author"]
    }
];
