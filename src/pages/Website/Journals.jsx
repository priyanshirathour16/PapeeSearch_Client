import React from 'react'
import JournalSlider from '../../components/Website/JournalSlider'
import JournalInner from '../../components/Website/JournalInner'
import JournalCover from '../../assets/images/jm-eapjmrm.jpg';
import Img from "../../assets/images/mrm.png";

const Journals = () => {

    const journalData = {
        title: "ELK's International Journal of Marketing (EAPJMRM)",
        coverImage: Img,
        stats: {
            volumes: 12,
            issues: 53,
            articles: 294,
            yearRange: "2011 to 2023"
        },
        issn: {
            print: "0976-7193",
            online: "2349-2317"
        },
        impactFactors: [
            { year: 2020, score: "4.87045" },
            { year: 2019, score: "4.285" },
            { year: 2017, score: "3.55" },
            { year: 2019, score: "3.003" }, // Duplicate year in sample, keeping data structure flexible
            { year: 2015, score: "2.059" },
            { year: 2014, score: "2.049" },
            { year: 2013, score: "1.789" },
            { year: 2012, score: "0.803" },
            { year: 2011, score: "0.525" },
        ],
        about: [
            "An International Journal of Marketing that endeavours to spread innovative research ideas across the globe.",
            "ELK Asia Pacific Journal of Marketing and Retail Management - An open access Indian journal of marketing, is a unique initiative from the ELK group. The main objective behind the launch was to bring on-board an international journal of marketing. With the retail industry taking huge strides and developing to an unprecedented scale, there is requirement as well as scope for research in the field.",
            "With the initial focus of making it a prominent Indian journal of marketing, we expanded its reach worldwide by catering to global research. Since inception, it has been successfully disseminating research ideas and prospects. Through this open access marketing journal, we connect with the academic researchers as well as professionals, who conduct studies in the sphere of marketing and retail trade on two levels.",
            "On one hand, we invite contributions from the researchers and ask them to send across their research papers for publication to a journal of marketing management. Thus, we support the efforts of the scholars. On the other hand, highly distinguished professionals have team up with us as part of the editorial team. They ensure to follow a strict Double Blind Peer Review process so as to maintain the standards of our impact factor journal of marketing and retail management. They review every paper and add value with their constructive feedback.",
            "The worth of papers is enhanced with manifolds by getting published in Indian Journal of Marketing, prominently titled as ELK Asia Pacific Journal of Marketing & Retail Management. This open access UGC approved journal in marketing undergoes peer review by most distinguished editors and subject matter experts which s also listed in the Cabell’s Directory. This makes it an international journal of marketing which reaches hundreds of institutions and professional bodies through online open-access publishing mode.",
            "ELK’s open access International Journal of Marketing offers unique benefits for readers, contributors and institutes/ universities. It follows the Double-Blind Refereeing Process for review and acts as an effective medium for promoting marketing education. We encourage both theoretical and empirical research. ELK Group also offers ELK Asia Pacific Journal of Finance and Risk Management.",
            "Our scope in terms of material published under impact factor journal of marketing includes Doctoral Dissertation Abstracts, Research Papers, Book Reviews and Case Studies and industry reports. Our official website seeks to make the process of reaching us simpler by facilitating submission of papers throughout the year online."
        ],
        keyAudiences: [
            "Retail managers",
            "Suppliers and contractors to the retail industry",
            "Consultants",
            "Retail strategists, researchers and students",
            "Libraries supplying practicing managers and researchers"
        ],
        areasCovered: [
            "Marketing", "Retail Trade", "Marketing & Planning", "Entrepreneurship marketing",
            "Policy, Pricing and marketing", "Retail Management", "Marketing theories & philosophies",
            "Benchmarking", "Marketing strategies", "Corporate social responsibility",
            "International marketing strategies", "Relationship Marketing", "Corporate innovation restructuring",
            "Marketing Mix", "Corporate brand management", "Supply Chains", "Distribution Channels"
        ],
        editorialBoard: {
            chiefEditor: {
                title: "Dr.",
                name: "Arvindbhai Brahmbhatt",
                affiliation: "Professor of Marketing, Institute of Management and Chairperson, Doctoral Programme, Nirma University M.Sc. Ph.D, FDP(IIMA-1982), LL.B.",
                profileLink: "view-profile.php"
            },
            members: [
                { title: "Dr.", name: "Anshul Verma", affiliation: "Associate Professor, S. P. Jain Institute of Management & Research, Mumbai Ph. D. (Applied Business Economics, Faculty of Commerce), Ph.D. (Faculty of Management, Dr. B.R. Ambedkar University), M.A.- Economics", profileLink: "view-profile.php" },
                { title: "Prof.", name: "Ashish Gupta", affiliation: "Assistant Professor, Dr. Hari Singh Gour Central University PhD, MBA, UGC-NET (Management)", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Dr. Arup Kumar Baksi", affiliation: "Associate Professor, Dept. of Management/ Business Administration, Aliah University, West Bengal Ph.D., MBA, MSc. LMISTE", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Durgesh Batra", affiliation: "Associate ProfessorPh.D,", profileLink: "view-profile.php" },
                { title: "Dr.", name: "ILA Nakkeeran", affiliation: "Head ,Department of CommercePh.D (COMMERCE)", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Mehraz Boolaky", affiliation: "Honorary Lecturer and Dissertation Advisor, University of Liverpool/Laureate PhD, MBA", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Mohammad Falahat", affiliation: "Assistant Professor, Universiti Tunku Abdul Rahman (UTAR)", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Muhammad Mohiuddin", affiliation: "Asst. professor of International Business, Thompson Rivers UniversityPhD in International Management", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Nimit Gupta", affiliation: "Associate Professor (Marketing), Fortune Institute of International Business Phd, Mphil, NET, AMT, MBA, B.com", profileLink: "view-profile.php" },
                { title: "Prof.", name: "Pawan Kumar Chugan", affiliation: "Professor - General Management, Nirma UniversityPh.D", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Pratap Chandra Mandal", affiliation: "Associate Professor (Marketing), VIT University PhD (Marketing) IIT Kharagpur, MBA (IIT Kharagpur), B.Tech. (Hons) IIT Kharagpur", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Pratyush Tripathi", affiliation: "Principal, VNS Group of Institutions & Professor at Faculty of Management Studies Ph.D. from the Faculty of Commerce and Management, A.P.S. University, Rewa (M.P.), 2. LL.B., M.B.A.", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Saumendra Das", affiliation: "LLM.,MBA., PhD", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Sunayna Khurana", affiliation: "Assistant Professor at Chandigarh Business School of AdministrationDoctorate in Management", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Sunmeet Banerjee", affiliation: "Associate Professor, DR VN BRIMS, Thane PhD", profileLink: "view-profile.php" },
                { title: "Dr.", name: "Venkata SSR Muramalla", affiliation: "ProfessorMBA., MPhil., Ph.D.(Business Management)", profileLink: "view-profile.php" }
            ]
        }
    };
    return (
        <>
            <JournalSlider />
            <JournalInner journalData={journalData} />
        </>
    )
}

export default Journals