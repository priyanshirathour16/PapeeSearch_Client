import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUniversity, FaBuilding, FaListOl, FaTh, FaFileImage, FaFile, FaKeyboard, FaPencilAlt, FaCheckSquare, FaPlus, FaLongArrowAltRight, FaCity, FaTrash, FaCloudUploadAlt } from "react-icons/fa";
import { MdSchool, MdLocationOn } from "react-icons/md";

const journalOptions = [
    {
        label: "Management Journals",
        options: [
            { value: "EAPJMRM", label: "ELK's International Journal of Marketing" },
            { value: "EAPJFRM", label: "ELK's International Journal of Finance" },
        ]
    },
    {
        label: "Computer and Information Technology",
        options: [
            { value: "EAPJCSIS", label: "ELK's International Journal of Computer Science" },
        ]
    },
    {
        label: "Production Engineering",
        options: [
            { value: "EAPJMSE", label: "ELK's International Journal of Manufacturing, Industrial and Production Engineering" },
        ]
    },
    {
        label: "Human Resource Manangement",
        options: [
            { value: "EAPJHRMOB", label: "ELK's International Journal of Human Resource Management" },
        ]
    },
    {
        label: "Leadership and Innovation",
        options: [
            { value: "EAPJLIM", label: "ELK's International Journal of Leadership Studies" },
        ]
    },
    {
        label: "Mechanical Engineering",
        options: [
            { value: "EAPJMER", label: "ELK's Indian Journal of Mechanical Engineering" },
        ]
    },
    {
        label: "Thermal Engineering",
        options: [
            { value: "EAPJATE", label: "ELK's International Journal of Thermal Sciences" },
        ]
    },
    {
        label: "Civil Engineering",
        options: [
            { value: "EAPJCESD", label: "ELK's International Journal of Civil Engineering" },
        ]
    },
    {
        label: "Electronics and Communication",
        options: [
            { value: "EAPJECT", label: "ELK's International Journal of Electronics Engineering" },
        ]
    },
    {
        label: "Library and Information Science",
        options: [
            { value: "EAPJLMIT", label: "ELK's International Journal of Library and Information Science" },
        ]
    },
    {
        label: "Social Science",
        options: [
            { value: "EAPJSS", label: "ELK's International Journal of Social Science" },
        ]
    },
    {
        label: "Project Management",
        options: [
            { value: "EAPJPMC", label: "ELK's International Journal of Project Management" },
        ]
    }
];

const countries = [
    "Select Country", "United Kingdom", "United States", "India", "Australia", "Canada", "Germany", "France", "other"
];

const IconInput = ({ icon: Icon, ...props }) => (
    <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
        <div className="w-10 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
            <Icon className="text-sm" />
        </div>
        <input
            {...props}
            className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700 placeholder-gray-500"
        />
    </div>
);

const ManuscriptForm = () => {
    const emptyAuthor = {
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        phone: "",
        country: "",
        institution: "",
        department: "",
        state: "",
        city: "",
        address: "",
        isCorrespondingAuthor: false
    };

    const [formData, setFormData] = useState({
        // Personal Info
        name: "",
        email: "",
        confirmEmail: "",
        phone: "",

        // General Info
        journal: "",
        paperTitle: "",
        wordCount: "",
        pageCount: "",
        tableCount: "",
        figureCount: "",

        // Dynamic Authors Array
        authors: [{ ...emptyAuthor, isCorrespondingAuthor: true }],

        // Reviewers
        revFirstName: "",
        revLastName: "",
        revEmail: "",
        revPhone: "",
        revInstitution: "",

        // Content
        keywords: "",
        abstract: "",

        // Files
        manuscriptFile: null,
        coverLetterFile: null,

        // Captcha
        captcha1: "",
        captcha2: "",
        captcha3: "",
        captcha4: ""
    });

    const [captchaVal, setCaptchaVal] = useState("");

    useEffect(() => {
        setCaptchaVal(Math.floor(1000 + Math.random() * 9000).toString());
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
        }));
    };

    const handleAuthorChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const newAuthors = [...formData.authors];
        newAuthors[index] = {
            ...newAuthors[index],
            [name]: type === 'checkbox' ? checked : value
        };
        setFormData(prev => ({ ...prev, authors: newAuthors }));
    };

    const addAuthor = () => {
        setFormData(prev => ({
            ...prev,
            authors: [...prev.authors, { ...emptyAuthor }]
        }));
    };

    const removeAuthor = (index) => {
        const newAuthors = formData.authors.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, authors: newAuthors }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted! (Check console for data)");
        console.log(formData);
    };

    const FormSection = ({ legend, children, className = "" }) => (
        <div className={`relative border border-gray-300 mt-8 p-6 pt-8 ${className}`}>
            <span className="absolute -top-3 right-4 bg-white px-2 text-[#204066] text-sm font-normal">
                {legend}
            </span>
            {children}
        </div>
    );

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>

            {/* 1. PERSONAL INFORMATION */}
            <FormSection legend="Personal Information:">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <IconInput icon={FaUser} type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} />
                    <IconInput icon={FaEnvelope} type="email" name="email" placeholder="Email ID *" value={formData.email} onChange={handleChange} />
                    <IconInput icon={FaEnvelope} type="email" name="confirmEmail" placeholder="Confirm E-mail Id *" value={formData.confirmEmail} onChange={handleChange} />
                    <IconInput icon={FaPhone} type="text" name="phone" placeholder="Contact No *" value={formData.phone} onChange={handleChange} />
                </div>
            </FormSection>

            {/* 2. GENERAL INFORMATION */}
            <FormSection legend="General Information:">
                <div className="space-y-4">
                    <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                        <div className="w-10 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                            <FaUser className="text-sm" />
                        </div>
                        <select
                            name="journal"
                            value={formData.journal}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700"
                        >
                            <option value="">Select Journal *</option>
                            {journalOptions.map((group, idx) => (
                                <optgroup key={idx} label={group.label}>
                                    {group.options.map((opt, optIdx) => (
                                        <option key={optIdx} value={opt.value}>{opt.label}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>

                    <IconInput icon={FaPencilAlt} type="text" name="paperTitle" placeholder="Manuscript Title*" value={formData.paperTitle} onChange={handleChange} />

                    <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                        <IconInput icon={FaFile} type="text" name="wordCount" placeholder="No of Words *" value={formData.wordCount} onChange={handleChange} />
                        <IconInput icon={FaListOl} type="text" name="pageCount" placeholder="No of Pages *" value={formData.pageCount} onChange={handleChange} />
                        <IconInput icon={FaTh} type="text" name="tableCount" placeholder="No of Tables" value={formData.tableCount} onChange={handleChange} />
                        <IconInput icon={FaFileImage} type="text" name="figureCount" placeholder="No of Figures" value={formData.figureCount} onChange={handleChange} />
                    </div>
                </div>
            </FormSection>

            {/* AUTHORS SECTION */}
            {formData.authors.map((author, index) => (
                <div key={index}>
                    <div className="mt-8">
                        <div className="bg-[#204066] text-white py-2 px-4 rounded-sm inline-block font-bold text-sm tracking-wide">
                            {index === 0 ? "Primary Author" : "Author Information"}
                        </div>
                    </div>

                    <FormSection legend="Author(s) Information:">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <IconInput icon={FaUser} type="text" name="firstName" placeholder="First Name *" value={author.firstName} onChange={(e) => handleAuthorChange(index, e)} />
                            <IconInput icon={FaUser} type="text" name="lastName" placeholder="Last Name *" value={author.lastName} onChange={(e) => handleAuthorChange(index, e)} />

                            <IconInput icon={FaEnvelope} type="email" name="email" placeholder="Email ID *" value={author.email} onChange={(e) => handleAuthorChange(index, e)} />
                            <IconInput icon={FaEnvelope} type="email" name="confirmEmail" placeholder="Confirm E-mail Id *" value={author.confirmEmail} onChange={(e) => handleAuthorChange(index, e)} />

                            <IconInput icon={FaPhone} type="text" name="phone" placeholder="Contact No *" value={author.phone} onChange={(e) => handleAuthorChange(index, e)} />

                            <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                                <div className="w-10 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                                    <MdLocationOn className="text-sm" />
                                </div>
                                <select
                                    name="country"
                                    value={author.country}
                                    onChange={(e) => handleAuthorChange(index, e)}
                                    className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700"
                                >
                                    {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <IconInput icon={MdSchool} type="text" name="institution" placeholder="Institution *" value={author.institution} onChange={(e) => handleAuthorChange(index, e)} />
                            <IconInput icon={FaBuilding} type="text" name="department" placeholder="Department *" value={author.department} onChange={(e) => handleAuthorChange(index, e)} />

                            <IconInput icon={FaUniversity} type="text" name="state" placeholder="State/Province *" value={author.state} onChange={(e) => handleAuthorChange(index, e)} />
                            <IconInput icon={FaCity} type="text" name="city" placeholder="City *" value={author.city} onChange={(e) => handleAuthorChange(index, e)} />

                            <div className="md:col-span-2">
                                <IconInput icon={FaMapMarkerAlt} type="text" name="address" placeholder="Address *" value={author.address} onChange={(e) => handleAuthorChange(index, e)} />
                            </div>

                            <div className="md:col-span-2 flex items-center gap-2 mt-2">
                                <input type="checkbox" name="isCorrespondingAuthor" checked={author.isCorrespondingAuthor} onChange={(e) => handleAuthorChange(index, e)} className="h-4 w-4 text-blue-600" />
                                <span className="text-xs text-[#204066]">This person is the formal Corresponding Author as denoted on the title page of the manuscript</span>
                            </div>
                        </div>
                    </FormSection>

                    {/* Remove Button for added authors */}
                    {index > 0 && (
                        <div className="mt-2">
                            <button type="button" onClick={() => removeAuthor(index)} className="bg-[#d9534f] hover:bg-[#c9302c] text-white text-xs font-bold py-2 px-4 rounded shadow-sm flex items-center gap-2">
                                <FaTrash /> Remove
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {/* ADD MORE AUTHORS BUTTON */}
            <div className="mt-4">
                <button type="button" onClick={addAuthor} className="bg-[#6dbd63] hover:bg-[#5da554] text-white text-xs font-bold py-2 px-4 rounded shadow-sm flex items-center gap-2">
                    <FaPlus /> Add More Authors
                </button>
            </div>

            {/* 5. REVIEWERS */}
            <FormSection legend="Reviewers:">
                {/* ... (Reviewer fields same as before) */}
                <p className="text-xs text-gray-500 mb-4 px-1">
                    Suggest a reviewer belonging to the similar research background...
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <IconInput icon={FaUser} type="text" name="revFirstName" placeholder="First name *" value={formData.revFirstName} onChange={handleChange} />
                    <IconInput icon={FaUser} type="text" name="revLastName" placeholder="Last Name *" value={formData.revLastName} onChange={handleChange} />
                    <IconInput icon={FaEnvelope} type="email" name="revEmail" placeholder="Email *" value={formData.revEmail} onChange={handleChange} />
                    <IconInput icon={FaPhone} type="text" name="revPhone" placeholder="Contact Number *" value={formData.revPhone} onChange={handleChange} />
                    <div className="md:col-span-1">
                        <IconInput icon={MdSchool} type="text" name="revInstitution" placeholder="Institution *" value={formData.revInstitution} onChange={handleChange} />
                    </div>
                </div>
            </FormSection>

            {/* ... (Content and Files sections keep unchanged logic but need full render) */}
            <FormSection legend="Content:">
                <p className="text-xs text-gray-500 mb-4 px-1">
                    Note: Please narrow down your Research Area...
                </p>
                <div className="space-y-4">
                    <IconInput icon={FaKeyboard} type="text" name="keywords" placeholder="Keywords *" value={formData.keywords} onChange={handleChange} />
                    <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                        <div className="w-10 flex items-start pt-3 justify-center bg-gray-200 text-gray-500 border-r border-gray-300 h-32">
                            <FaFile className="text-sm" />
                        </div>
                        <textarea name="abstract" placeholder="Abstract *" value={formData.abstract} onChange={handleChange} className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700 h-32 resize-none"></textarea>
                    </div>
                </div>
            </FormSection>

            <FormSection legend="Files Upload:">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Upload Manuscript*</label>
                        <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                            <div className="w-14 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                                <FaCloudUploadAlt className="text-sm" />
                            </div>
                            <input type="file" name="manuscriptFile" className="flex-1 px-3 py-1 bg-gray-100 text-sm text-gray-600" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Cover Letter For Manuscript</label>
                        <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                            <div className="w-14 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                                <FaFile className="text-sm" />
                            </div>
                            <input type="file" name="coverLetterFile" className="flex-1 px-3 py-1 bg-gray-100 text-sm text-gray-600" />
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <label className="text-xs text-gray-600 mb-1 block">Upload your signature*</label>

                        <div className="mb-1">
                            <p className="text-xs text-blue-600 cursor-pointer flex items-center gap-1"><FaPencilAlt /> Draw Here</p>
                        </div>

                        <div className="border border-gray-400 h-24 bg-white relative">
                            {/* Placeholder for canvas */}
                            <input type="hidden" />
                        </div>

                        <div className="mt-1">
                            <div className="text-xs text-blue-600 cursor-pointer flex items-center gap-1">
                                <FaPencilAlt /> Clear Signature
                            </div>
                        </div>
                    </div>
                </div>
            </FormSection>

            {/* CAPTCHA & SUBMIT (Unchanged) */}
            <div className="flex justify-between items-end mt-8">
                <div className="flex gap-2 items-center">
                    <input type="text" maxLength="1" className="w-10 h-10 border border-black text-center text-lg" onChange={(e) => setFormData({ ...formData, captcha1: e.target.value })} />
                    <input type="text" maxLength="1" className="w-10 h-10 border border-black text-center text-lg" onChange={(e) => setFormData({ ...formData, captcha2: e.target.value })} />
                    <input type="text" maxLength="1" className="w-10 h-10 border border-black text-center text-lg" onChange={(e) => setFormData({ ...formData, captcha3: e.target.value })} />
                    <input type="text" maxLength="1" className="w-10 h-10 border border-black text-center text-lg" onChange={(e) => setFormData({ ...formData, captcha4: e.target.value })} />
                    <div className="bg-[#4A6983] text-white px-3 py-2 text-sm font-bold min-w-[60px] text-center">{captchaVal}</div>
                    <div className="text-[10px] text-gray-600">Enter Code As Seen</div>
                </div>
                <button type="submit" className="bg-[#00a65a] hover:bg-[#008d4c] text-white font-bold py-2 px-6 rounded shadow flex items-center gap-2">
                    SUBMIT <FaLongArrowAltRight />
                </button>
            </div>

        </form>
    );
};

export default ManuscriptForm;
