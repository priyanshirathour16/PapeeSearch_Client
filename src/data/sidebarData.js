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
        icon: FaBook,
        path: '/dashboard/manage-users',
        access: ["admin"]
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
            // {
            //     title: 'Registrations',
            //     path: '/dashboard/conference-registrations',
            //     icon: FaBook,
            //     access: ["admin"]
            // },
            // {
            //     title: 'Abstract Submissions',
            //     path: '/dashboard/conference/abstract-management',
            //     icon: FaFileAlt,
            //     access: ["admin"]
            // }
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
    },
    {
        title: 'Full Paper Submission',
        icon: FaFileAlt,
        path: '/dashboard/conference/full-paper-submission',
        access: ["author"]
    },
    {
        title: 'Review Abstractions',
        icon: FaFileAlt,
        path: '/dashboard/editor/review-abstracts',
        access: ["editor"]
    }
];
