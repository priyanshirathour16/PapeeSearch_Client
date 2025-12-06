import React from 'react';
import { Link } from 'react-router-dom';

const servicesData = [
    {
        link: "/computer-Science-and-information-systems",
        issnPrint: "2454-3047",
        issnOnline: "2394-0441",
        title: "ELK's International Journal of Computer Science"
    },
    {
        link: "/manufacturing-science-and-engineering",
        issnPrint: "2454-3020",
        issnOnline: "2394-0425",
        title: "ELK's International Journal of Manufacturing, Industrial and Production Engineering"
    },
    {
        link: "/hr-management-and-organizational-behaviour",
        issnPrint: "2454-3004",
        issnOnline: "2394-0409",
        title: "ELK's International Journal of Human Resource Management"
    },
    {
        link: "/leadership-and-innovation-management",
        issnPrint: "2454-3012",
        issnOnline: "2394-0417",
        title: "ELK's International Journal of Leadership Studies"
    },
    {
        link: "/mechanical-engineering-research",
        issnPrint: "2454-2962",
        issnOnline: "2394-9368",
        title: "ELK's Indian Journal of Mechanical Engineering"
    },
    {
        link: "/applied-thermal-engineering",
        issnPrint: "2454-3039",
        issnOnline: "2394-0433",
        title: "ELK's International Journal of Thermal Sciences"
    },
    {
        link: "/civil-engineering-and-structural-development",
        issnPrint: "2454-2946",
        issnOnline: "2394-9341",
        title: "ELK's International Journal of Civil Engineering"
    },
    {
        link: "/electronics-and-communication-technology",
        issnPrint: "2454-2954",
        issnOnline: "2394-935X",
        title: "ELK's International Journal of Electronics Engineering"
    },
    {
        link: "/library-management-and-information-technology",
        issnPrint: "2454-2989",
        issnOnline: "2394-9384",
        title: "ELK's International Journal of Library and Information Science"
    },
    {
        link: "/social-sciences",
        issnPrint: "2454-2997",
        issnOnline: "2394-9392",
        title: "ELK's International Journal of Social Science"
    },
    {
        link: "/project-management-and-control",
        issnPrint: "2454-2970",
        issnOnline: "2394-9376",
        title: "ELK's International Journal of Project Management"
    }
];

const Services = () => {
    return (
        <section className="bg-white py-6">
            <div className="w-full max-w-[1164px] mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {servicesData.map((service, index) => (
                        <Link
                            to={service.link}
                            key={index}
                            className="bg-[#333] hover:bg-[#333] transition-colors duration-300 p-2 flex items-center group shadow-sm"
                        >
                            <div className="w-1/3 border-r border-gray-500  text-center">
                                <div className="text-xs text-white mb-1">ISSN PRINT</div>
                                <div className="text-xs  text-[#12b48b] font-medium mb-1">{service.issnPrint}</div>
                                <div className="text-xs text-white mb-1">ISSN ONLINE</div>
                                <div className="text-xs text-[#12b48b] font-medium">{service.issnOnline}</div>
                            </div>
                            <div className="w-2/3 pl-4">
                                <h5 className="text-white text-base md:text-sm font-normal leading-snug">
                                    {service.title}
                                </h5>
                            </div>
                        </Link>
                    ))}
                </div>
            </div >
        </section >
    );
};

export default Services;