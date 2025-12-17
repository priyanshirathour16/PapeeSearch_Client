import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUniversity, FaBuilding, FaFile, FaKeyboard, FaPencilAlt, FaCheckSquare, FaPlus, FaLongArrowAltRight, FaCity, FaTrash, FaCloudUploadAlt, FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import { MdSchool, MdLocationOn } from "react-icons/md";
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { otpApi, manuscriptApi } from '../../services/api';
import { message } from "antd";
import { numberToWords } from '../../utils/numberToWords';

const countries = [
    "Select Country", "United Kingdom", "United States", "India", "Australia", "Canada", "Germany", "France", "other"
];

const manuscriptTypes = [
    "Research paper",
    "Case study",
    "Book review",
    "Review paper",
    "Perspective",
    "Report",
    "Invited article"
];

const IconInput = ({ icon: Icon, ...props }) => (
    <div className="flex flex-col">
        <div className={`flex bg-gray-100 border border-gray-300 rounded overflow-hidden ${props.className}`}>
            <div className="w-10 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                <Icon className="text-sm" />
            </div>
            <Field
                {...props}
                className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700 placeholder-gray-500"
            />
        </div>
        <ErrorMessage name={props.name} component="div" className="text-red-500 text-xs mt-1" />
    </div>
);

const FormSection = ({ legend, children, className = "" }) => (
    <div className={`relative border border-gray-300 mt-6 p-6 pt-8 ${className}`}>
        <span className="absolute -top-3 right-4 bg-white px-2 text-[#204066] text-sm font-normal">
            {legend}
        </span>
        {children}
    </div>
);

const ManuscriptFormSteps = ({ fetchedJournalOptions, isDashboard }) => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otp, setOtp] = useState("");
    const [personalDetails, setPersonalDetails] = useState(null);
    const [keywords, setKeywords] = useState([]);
    const [keywordInput, setKeywordInput] = useState("");
    const [wordCountText, setWordCountText] = useState("");
    const [abstractWordCount, setAbstractWordCount] = useState(0);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const userStr = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            if (isDashboard && userStr && token) {
                try {
                    const user = JSON.parse(userStr);
                    const name = user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim();
                    const email = user.email || '';
                    const phone = user.phone || user.contactNumber || '';

                    setPersonalDetails({ name, email, phone });
                    setOtpVerified(true);
                    setOtpSent(true);
                    setCurrentStep(2);
                    setIsLoggedIn(true);
                } catch (e) {
                    console.error("Error parsing user data", e);
                }
            }
        };
        checkLoginStatus();
    }, []);

    const totalSteps = 8;

    const getStepValidationSchema = (step) => {
        switch (step) {
            case 1:
                return Yup.object().shape({
                    name: Yup.string().required('Name is required'),
                    email: Yup.string().email('Invalid email').required('Email is required'),
                    phone: Yup.string()
                        .matches(/^[0-9]+$/, "Must be only digits")
                        .min(10, 'Must be at least 10 digits')
                        .required('Phone is required'),
                });
            case 2:
                return Yup.object().shape({
                    journalId: Yup.string().required('Journal selection is required'),
                    manuscriptType: Yup.string().required('Manuscript type is required'),
                    paperTitle: Yup.string().required('Manuscript title is required'),
                    abstract: Yup.string().required('Abstract is required'),
                    wordCount: Yup.number().required('Word count is required').positive('Must be positive'),
                });
            case 3:
                return Yup.object().shape({
                    primaryAuthor: Yup.object().shape({
                        firstName: Yup.string().required('First name is required'),
                        lastName: Yup.string().required('Last name is required'),
                        email: Yup.string().email('Invalid email').required('Email is required'),
                        confirmEmail: Yup.string()
                            .oneOf([Yup.ref('email'), null], 'Emails must match')
                            .required('Confirm email is required'),
                        phone: Yup.string().matches(/^[0-9]+$/, "Must be only digits").required('Phone is required'),
                        country: Yup.string().required('Country is required').notOneOf(['Select Country'], 'Please select a country'),
                        institution: Yup.string().required('Institution is required'),
                        department: Yup.string().required('Department is required'),
                        state: Yup.string().required('State is required'),
                        city: Yup.string().required('City is required'),
                        address: Yup.string().required('Address is required'),
                    })
                });
            case 4:
                return Yup.object().shape({
                    authors: Yup.array().of(
                        Yup.object().shape({
                            firstName: Yup.string().required('First name is required'),
                            lastName: Yup.string().required('Last name is required'),
                            email: Yup.string().email('Invalid email').required('Email is required'),
                            confirmEmail: Yup.string()
                                .oneOf([Yup.ref('email'), null], 'Emails must match')
                                .required('Confirm email is required'),
                            phone: Yup.string().matches(/^[0-9]+$/, "Must be only digits").required('Phone is required'),
                            country: Yup.string().required('Country is required').notOneOf(['Select Country'], 'Please select a country'),
                            institution: Yup.string().required('Institution is required'),
                            designation: Yup.string().required('Designation is required'),
                            department: Yup.string().required('Department is required'),
                            state: Yup.string().required('State is required'),
                            city: Yup.string().required('City is required'),
                            address: Yup.string().required('Address is required'),
                        })
                    )
                });
            case 5:
                return Yup.object().shape({
                    checklist: Yup.object().shape({
                        isSoleSubmission: Yup.boolean().oneOf([true], 'You must confirm this'),
                        isNotPublished: Yup.boolean().oneOf([true], 'You must confirm this'),
                        isOriginalWork: Yup.boolean().oneOf([true], 'You must confirm this'),
                        hasDeclaredConflicts: Yup.boolean().oneOf([true], 'You must confirm this'),
                        hasAcknowledgedSupport: Yup.boolean().oneOf([true], 'You must confirm this'),
                        hasAcknowledgedFunding: Yup.boolean().oneOf([true], 'You must confirm this'),
                        followsGuidelines: Yup.boolean().oneOf([true], 'You must confirm this'),
                    })
                });
            case 6:
                return Yup.object().shape({
                    manuscriptFile: Yup.mixed().required('Manuscript file is required'),
                });
            case 7:
                return Yup.object().shape({
                    reviewerFirstName: Yup.string().required('First name is required'),
                    reviewerLastName: Yup.string().required('Last name is required'),
                    reviewerEmail: Yup.string().email('Invalid email').required('Email is required'),
                    reviewerPhone: Yup.string().matches(/^[0-9]+$/, "Must be only digits").required('Phone is required'),
                    reviewerCountry: Yup.string().required('Country is required').notOneOf(['Select Country'], 'Please select a country'),
                    reviewerInstitution: Yup.string().required('Institution is required'),
                    reviewerDesignation: Yup.string().required('Designation is required'),
                    reviewerSpecialisation: Yup.string().required('Specialisation is required'),
                    reviewerDepartment: Yup.string().required('Department is required'),
                    reviewerState: Yup.string().required('State is required'),
                    reviewerCity: Yup.string().required('City is required'),
                    reviewerAddress: Yup.string().required('Address is required'),
                });
            default:
                return Yup.object().shape({});
        }
    };

    const initialValues = {
        // Step 1: Personal Details
        name: personalDetails?.name || "",
        email: personalDetails?.email || "",
        phone: personalDetails?.phone || "",

        // Step 2: Manuscript Information
        journalId: "",
        manuscriptType: "",
        paperTitle: "",
        abstract: "",
        wordCount: "",

        // Step 3: Primary Author
        primaryAuthor: {
            firstName: "",
            lastName: "",
            email: "",
            confirmEmail: "",
            phone: "",
            country: "",
            institution: "",
            department: "",
            designation: "",
            state: "",
            city: "",
            address: "",
            isCorrespondingAuthor: true
        },

        // Step 4: Additional Authors
        authors: [],

        // Step 5: Submission Checklist
        checklist: {
            isSoleSubmission: false,
            isNotPublished: false,
            isOriginalWork: false,
            hasDeclaredConflicts: false,
            hasAcknowledgedSupport: false,
            hasAcknowledgedFunding: false,
            followsGuidelines: false,
        },

        // Step 6: File Uploads
        manuscriptFile: null,
        coverLetter: null,

        // Step 7: Suggested Reviewer
        reviewerFirstName: "",
        reviewerLastName: "",
        reviewerEmail: "",
        reviewerPhone: "",
        reviewerCountry: "",
        reviewerInstitution: "",
        reviewerDesignation: "",
        reviewerSpecialisation: "",
        reviewerDepartment: "",
        reviewerState: "",
        reviewerCity: "",
        reviewerAddress: "",
    };

    const [currentOtp, setCurrentOtp] = useState(
        ""
    )
    const handleSendOTP = async (values) => {
        try {
            const response = await otpApi.send({
                name: values.name,
                email: values.email,
                phone: values.phone
            });
            // console.log(response?.data?.otp);
            setCurrentOtp(response?.data?.otp);
            setOtpSent(true);
            setPersonalDetails({ name: values.name, email: values.email, phone: values.phone });
            message.success("OTP sent successfully to your email!");
        } catch (error) {
            console.error(error);
            message.error(error.response?.data?.message || "Failed to send OTP");
        }
    };

    const handleVerifyOTP = async (email) => {
        if (!otp || otp.length !== 6) {
            message.error("Please enter a valid 6-digit OTP");
            return;
        }

        try {
            const response = await otpApi.verify({ email, otp });
            setOtpVerified(true);
            message.success("Email verified successfully!");
        } catch (error) {
            console.error(error);
            message.error(error.response?.data?.message || "Invalid or expired OTP");
        }
    };

    const handleAddKeyword = () => {
        if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
            setKeywords([...keywords, keywordInput.trim()]);
            setKeywordInput("");
        }
    };

    const handleRemoveKeyword = (index) => {
        setKeywords(keywords.filter((_, i) => i !== index));
    };

    const countWords = (text) => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    const handleAbstractChange = (e, setFieldValue) => {
        const text = e.target.value;
        const words = countWords(text);

        if (words <= 200) {
            setFieldValue('abstract', text);
            setAbstractWordCount(words);
        } else {
            message.warning("Abstract cannot exceed 200 words");
        }
    };

    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();

            // Personal details
            formData.append('name', personalDetails.name);
            formData.append('email', personalDetails.email);
            formData.append('phone', personalDetails.phone);

            // Manuscript information
            formData.append('journalId', values.journalId);
            formData.append('manuscriptType', values.manuscriptType);
            formData.append('paperTitle', values.paperTitle);
            formData.append('abstract', values.abstract);
            formData.append('wordCount', values.wordCount);
            formData.append('keywords', JSON.stringify(keywords));

            // Authors (combine primary and additional)
            const allAuthors = [values.primaryAuthor, ...values.authors];
            formData.append('authors', JSON.stringify(allAuthors));

            // Checklist
            formData.append('checklist', JSON.stringify(values.checklist));

            // Files
            if (values.manuscriptFile) formData.append('manuscriptFile', values.manuscriptFile);
            if (values.coverLetter) formData.append('coverLetter', values.coverLetter);

            // Reviewer
            formData.append('reviewerFirstName', values.reviewerFirstName);
            formData.append('reviewerLastName', values.reviewerLastName);
            formData.append('reviewerEmail', values.reviewerEmail);
            formData.append('reviewerPhone', values.reviewerPhone);
            formData.append('reviewerCountry', values.reviewerCountry);
            formData.append('reviewerInstitution', values.reviewerInstitution);
            formData.append('reviewerDesignation', values.reviewerDesignation);
            formData.append('reviewerSpecialisation', values.reviewerSpecialisation);
            formData.append('reviewerDepartment', values.reviewerDepartment);
            formData.append('reviewerState', values.reviewerState);
            formData.append('reviewerCity', values.reviewerCity);
            formData.append('reviewerAddress', values.reviewerAddress);

            const response = await manuscriptApi.submit(formData);

            Swal.fire({
                title: "Submitted Successfully!",
                text: `Congratulations! You have successfully submitted your manuscript. Your manuscript ID is: ${response.data.data.manuscriptId}. Please check your mailbox for acknowledgement of receipt of manuscript.`,
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "bg-[#12b48b] text-white px-6 py-2 rounded",
                }
            }).then(() => {
                navigate('/dashboard/submit-manuscript');
            });
        } catch (error) {
            console.error(error);
            message.error(error.response?.data?.error || "Failed to submit manuscript");
        }
    };

    const StepIndicator = () => {
        const stepsToRender = isLoggedIn ? [2, 3, 4, 5, 6, 7, 8] : [1, 2, 3, 4, 5, 6, 7, 8];
        const displayStep = isLoggedIn ? currentStep - 1 : currentStep;
        const displayTotal = isLoggedIn ? totalSteps - 1 : totalSteps;

        return (
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {stepsToRender.map((step) => {
                        const label = isLoggedIn ? step - 1 : step;
                        return (
                            <div key={step} className="flex items-center flex-1">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step ? 'bg-[#12b48b] border-[#12b48b] text-white' : 'bg-white border-gray-300 text-gray-400'
                                    }`}>
                                    {currentStep > step ? <FaCheck /> : label}
                                </div>
                                {step < 8 && (
                                    <div className={`flex-1 h-1 mx-2 ${currentStep > step ? 'bg-[#12b48b]' : 'bg-gray-300'}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="mt-2 text-center text-sm text-gray-600">
                    Step {displayStep} of {displayTotal}
                </div>
            </div>
        );
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={getStepValidationSchema(currentStep)}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={true}
        >
            {({ values, setFieldValue, validateForm, setTouched }) => (
                <div>
                    <StepIndicator />

                    {/* Step 1: Personal Details with OTP */}
                    {currentStep === 1 && (
                        <FormSection legend="Personal Information">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <IconInput icon={FaUser} type="text" name="name" placeholder="Name *" disabled={otpVerified} />
                                <IconInput icon={FaEnvelope} type="email" name="email" placeholder="Email ID *" disabled={otpVerified} />
                                <IconInput icon={FaPhone} type="text" name="phone" placeholder="Phone No *" disabled={otpVerified} />
                            </div>

                            {!otpVerified && (
                                <div className="mt-4">
                                    {!otpSent ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                validateForm().then((errors) => {
                                                    if (Object.keys(errors).length === 0) {
                                                        handleSendOTP(values);
                                                    } else {
                                                        setTouched({ name: true, email: true, phone: true });
                                                        message.error("Please fill all required fields correctly");
                                                    }
                                                });
                                            }}
                                            className="bg-[#12b48b] hover:bg-[#0e9470] text-white font-bold py-2 px-6 rounded"
                                        >
                                            Send OTP
                                        </button>
                                    ) : (
                                        <div className="space-y-3">
                                            <h4>Insert This OTP -  {currentOtp}</h4>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="text"
                                                    maxLength="6"
                                                    placeholder="Enter 6-digit OTP"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                    className="border border-gray-300 px-4 py-2 rounded w-48 text-center text-lg tracking-widest"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleVerifyOTP(values.email)}
                                                    className="bg-[#12b48b] hover:bg-[#0e9470] text-white font-bold py-2 px-6 rounded"
                                                >
                                                    Verify OTP
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500">OTP has been sent to {values.email}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {otpVerified && (
                                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                                    <div className="flex items-center gap-2 text-green-700">
                                        <FaCheck className="text-green-600" />
                                        <span className="font-semibold">Email Verified Successfully!</span>
                                    </div>
                                    <div className="mt-3 text-sm text-gray-700">
                                        <p><strong>Name:</strong> {personalDetails?.name}</p>
                                        <p><strong>Email:</strong> {personalDetails?.email}</p>
                                        <p><strong>Phone:</strong> {personalDetails?.phone}</p>
                                    </div>
                                </div>
                            )}
                        </FormSection>
                    )}

                    {/* Step 2: Manuscript Information */}
                    {currentStep === 2 && (
                        <FormSection legend="Manuscript Information">
                            <div className="space-y-4">
                                {/* Journal Selection */}
                                <div className="flex flex-col">
                                    <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                                        <div className="w-10 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                                            <FaUser className="text-sm" />
                                        </div>
                                        <Field as="select" name="journalId" className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700">
                                            <option value="">Select Journal *</option>
                                            {fetchedJournalOptions?.map((group, idx) => (
                                                <optgroup key={idx} label={group.label}>
                                                    {group.options.map((opt, optIdx) => (
                                                        <option key={optIdx} value={opt.value}>{opt.label}</option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </Field>
                                    </div>
                                    <ErrorMessage name="journalId" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                {/* Manuscript Type */}
                                <div className="flex flex-col">
                                    <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                                        <div className="w-10 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                                            <FaFile className="text-sm" />
                                        </div>
                                        <Field as="select" name="manuscriptType" className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700">
                                            <option value="">Select Manuscript Type *</option>
                                            {manuscriptTypes.map((type, idx) => (
                                                <option key={idx} value={type}>{type}</option>
                                            ))}
                                        </Field>
                                    </div>
                                    <ErrorMessage name="manuscriptType" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                {/* Manuscript Title */}
                                <IconInput icon={FaPencilAlt} type="text" name="paperTitle" placeholder="Manuscript Title *" />

                                {/* Abstract */}
                                <div className="flex flex-col">
                                    <label className="text-xs text-gray-600 mb-1">Abstract (Max 200 words) *</label>
                                    <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                                        <div className="w-10 flex items-start pt-3 justify-center bg-gray-200 text-gray-500 border-r border-gray-300 h-32">
                                            <FaFile className="text-sm" />
                                        </div>
                                        <Field
                                            as="textarea"
                                            name="abstract"
                                            placeholder="Enter abstract (max 200 words)"
                                            onChange={(e) => handleAbstractChange(e, setFieldValue)}
                                            className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700 h-32 resize-none"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <ErrorMessage name="abstract" component="div" className="text-red-500 text-xs" />
                                        <span className={`text-xs ${abstractWordCount > 200 ? 'text-red-500' : 'text-gray-500'}`}>
                                            {abstractWordCount} / 200 words
                                        </span>
                                    </div>
                                </div>

                                {/* Word Count */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <IconInput
                                            icon={FaFile}
                                            type="number"
                                            name="wordCount"
                                            placeholder="No. of words *"
                                            onChange={(e) => {
                                                setFieldValue('wordCount', e.target.value);
                                                setWordCountText(numberToWords(e.target.value));
                                            }}
                                        />
                                        {wordCountText && (
                                            <p className="text-xs text-gray-600 mt-1 italic">{wordCountText}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Keywords */}
                                <div className="flex flex-col">
                                    <label className="text-xs text-gray-600 mb-1">Keywords</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={keywordInput}
                                            onChange={(e) => setKeywordInput(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddKeyword();
                                                }
                                            }}
                                            placeholder="Type keyword and press Enter"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#12b48b]"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddKeyword}
                                            className="bg-[#12b48b] hover:bg-[#0e9470] text-white px-4 py-2 rounded text-sm"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    {keywords.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {keywords.map((keyword, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center gap-2 bg-[#12b48b] text-white px-3 py-1 rounded-full text-sm"
                                                >
                                                    {keyword}
                                                    <FaTimes
                                                        className="cursor-pointer hover:text-red-200"
                                                        onClick={() => handleRemoveKeyword(index)}
                                                    />
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </FormSection>
                    )}

                    {/* Step 3: Primary Author */}
                    {currentStep === 3 && (
                        <FormSection legend="Primary Author Information">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <IconInput icon={FaUser} type="text" name="primaryAuthor.firstName" placeholder="First Name *" />
                                <IconInput icon={FaUser} type="text" name="primaryAuthor.lastName" placeholder="Last Name *" />
                                <IconInput icon={FaEnvelope} type="email" name="primaryAuthor.email" placeholder="Email ID *" />
                                <IconInput icon={FaEnvelope} type="email" name="primaryAuthor.confirmEmail" placeholder="Confirm Email ID *" />
                                <IconInput icon={FaPhone} type="text" name="primaryAuthor.phone" placeholder="Phone No *" />

                                <div className="flex flex-col">
                                    <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                                        <div className="w-10 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                                            <MdLocationOn className="text-sm" />
                                        </div>
                                        <Field as="select" name="primaryAuthor.country" className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700">
                                            {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
                                        </Field>
                                    </div>
                                    <ErrorMessage name="primaryAuthor.country" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <IconInput icon={MdSchool} type="text" name="primaryAuthor.institution" placeholder="Institution *" />
                                <IconInput icon={FaBuilding} type="text" name="primaryAuthor.department" placeholder="Department *" />
                                <IconInput icon={FaUniversity} type="text" name="primaryAuthor.state" placeholder="State *" />
                                <IconInput icon={FaCity} type="text" name="primaryAuthor.city" placeholder="City *" />

                                <div className="md:col-span-2">
                                    <IconInput icon={FaMapMarkerAlt} type="text" name="primaryAuthor.address" placeholder="Address *" />
                                </div>
                            </div>
                        </FormSection>
                    )}

                    {/* Step 4: Additional Authors */}
                    {currentStep === 4 && (
                        <div>
                            <FormSection legend="Additional Authors (Optional)">
                                <p className="text-sm text-gray-600 mb-4">Add co-authors for this manuscript (optional)</p>

                                <FieldArray name="authors">
                                    {({ push, remove }) => (
                                        <div>
                                            {values.authors.map((author, index) => (
                                                <div key={index} className="mb-6 p-4 border border-gray-200 rounded">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <h4 className="text-sm font-semibold text-[#204066]">Co-Author {index + 1}</h4>
                                                        <button
                                                            type="button"
                                                            onClick={() => remove(index)}
                                                            className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                                                        >
                                                            <FaTrash /> Remove
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <IconInput icon={FaUser} type="text" name={`authors.${index}.firstName`} placeholder="First Name *" />
                                                        <IconInput icon={FaUser} type="text" name={`authors.${index}.lastName`} placeholder="Last Name *" />
                                                        <IconInput icon={FaEnvelope} type="email" name={`authors.${index}.email`} placeholder="Email ID *" />
                                                        <IconInput icon={FaEnvelope} type="email" name={`authors.${index}.confirmEmail`} placeholder="Confirm Email ID *" />
                                                        <IconInput icon={FaPhone} type="text" name={`authors.${index}.phone`} placeholder="Phone No *" />

                                                        <div className="flex flex-col">
                                                            <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                                                                <div className="w-10 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                                                                    <MdLocationOn className="text-sm" />
                                                                </div>
                                                                <Field as="select" name={`authors.${index}.country`} className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700">
                                                                    {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
                                                                </Field>
                                                            </div>
                                                            <ErrorMessage name={`authors.${index}.country`} component="div" className="text-red-500 text-xs mt-1" />
                                                        </div>

                                                        <IconInput icon={MdSchool} type="text" name={`authors.${index}.institution`} placeholder="Institution *" />
                                                        <IconInput icon={FaUser} type="text" name={`authors.${index}.designation`} placeholder="Designation *" />
                                                        <IconInput icon={FaBuilding} type="text" name={`authors.${index}.department`} placeholder="Department *" />
                                                        <IconInput icon={FaUniversity} type="text" name={`authors.${index}.state`} placeholder="State *" />
                                                        <IconInput icon={FaCity} type="text" name={`authors.${index}.city`} placeholder="City *" />

                                                        <div className="md:col-span-2">
                                                            <IconInput icon={FaMapMarkerAlt} type="text" name={`authors.${index}.address`} placeholder="Address *" />
                                                        </div>

                                                        <div className="md:col-span-2 flex items-center gap-2">
                                                            <Field type="checkbox" name={`authors.${index}.isCorrespondingAuthor`} className="h-4 w-4" />
                                                            <span className="text-xs text-gray-700">Corresponding Author</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={() => push({
                                                    firstName: "", lastName: "", email: "", confirmEmail: "", phone: "",
                                                    country: "", institution: "", designation: "", department: "",
                                                    state: "", city: "", address: "", isCorrespondingAuthor: false
                                                })}
                                                className="bg-[#6dbd63] hover:bg-[#5da554] text-white font-bold py-2 px-4 rounded flex items-center gap-2"
                                            >
                                                <FaPlus /> Add More Authors
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                            </FormSection>
                        </div>
                    )}

                    {/* Step 5: Submission Checklist */}
                    {currentStep === 5 && (
                        <FormSection legend="Submission Checklist">
                            <p className="text-sm text-gray-600 mb-4">Please confirm the following statements:</p>
                            <div className="space-y-3">
                                {[
                                    { name: 'isSoleSubmission', label: 'The manuscript is solely submitted to this journal and is not currently under submission to, or consideration by, any other journal or publication.' },
                                    { name: 'isNotPublished', label: 'The manuscript has not been published before in its current or a substantially similar form.' },
                                    { name: 'isOriginalWork', label: 'The Article is my/our original work and does not infringe the intellectual property rights of any other person or entity and cannot be considered as plagiarising any other published work.' },
                                    { name: 'hasDeclaredConflicts', label: 'I/we have declared any potential conflict of interest in the research.' },
                                    { name: 'hasAcknowledgedSupport', label: 'Any support from a third party has been noted in the Acknowledgements.' },
                                    { name: 'hasAcknowledgedFunding', label: 'Sources of funding, if any, have been acknowledged.' },
                                    { name: 'followsGuidelines', label: 'The manuscript is submitted as per the journal submission guidelines provided at the journal home page.' },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded hover:bg-gray-50">
                                        <Field type="checkbox" name={`checklist.${item.name}`} className="mt-1 h-4 w-4 text-[#12b48b]" />
                                        <label className="text-sm text-gray-700 flex-1">{item.label}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2">
                                <ErrorMessage name="checklist.isSoleSubmission" component="div" className="text-red-500 text-xs" />
                            </div>
                        </FormSection>
                    )}

                    {/* Step 6: File Uploads */}
                    {currentStep === 6 && (
                        <FormSection legend="File Uploads">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-700 mb-2 block">
                                        Manuscript (without author details) * <span className="text-xs text-gray-500">(.doc, .docx, .pdf)</span>
                                    </label>
                                    <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                                        <div className="w-14 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                                            <FaCloudUploadAlt className="text-lg" />
                                        </div>
                                        <input
                                            type="file"
                                            accept=".doc,.docx,.pdf"
                                            onChange={(e) => setFieldValue('manuscriptFile', e.currentTarget.files[0])}
                                            className="flex-1 px-3 py-2 bg-gray-100 text-sm"
                                        />
                                    </div>
                                    <ErrorMessage name="manuscriptFile" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-700 mb-2 block">
                                        Cover Letter for Manuscript (Optional) <span className="text-xs text-gray-500">(.doc, .docx, .pdf)</span>
                                    </label>
                                    <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                                        <div className="w-14 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                                            <FaFile className="text-lg" />
                                        </div>
                                        <input
                                            type="file"
                                            accept=".doc,.docx,.pdf"
                                            onChange={(e) => setFieldValue('coverLetter', e.currentTarget.files[0])}
                                            className="flex-1 px-3 py-2 bg-gray-100 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </FormSection>
                    )}

                    {/* Step 7: Suggested Reviewers */}
                    {currentStep === 7 && (
                        <FormSection legend="Suggest Reviewers">
                            <p className="text-sm text-gray-600 mb-4">Suggest a reviewer belonging to a similar research background</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <IconInput icon={FaUser} type="text" name="reviewerFirstName" placeholder="First Name *" />
                                <IconInput icon={FaUser} type="text" name="reviewerLastName" placeholder="Last Name *" />
                                <IconInput icon={FaEnvelope} type="email" name="reviewerEmail" placeholder="Email ID *" />
                                <IconInput icon={FaPhone} type="text" name="reviewerPhone" placeholder="Phone No *" />
                                <IconInput icon={FaKeyboard} type="text" name="reviewerSpecialisation" placeholder="Specialisation *" />

                                <div className="flex flex-col">
                                    <div className="flex bg-gray-100 border border-gray-300 rounded overflow-hidden">
                                        <div className="w-10 flex items-center justify-center bg-gray-200 text-gray-500 border-r border-gray-300">
                                            <MdLocationOn className="text-sm" />
                                        </div>
                                        <Field as="select" name="reviewerCountry" className="flex-1 px-3 py-2 bg-gray-100 focus:bg-white focus:outline-none text-sm text-gray-700">
                                            {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
                                        </Field>
                                    </div>
                                    <ErrorMessage name="reviewerCountry" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <IconInput icon={MdSchool} type="text" name="reviewerInstitution" placeholder="Institution *" />
                                <IconInput icon={FaUser} type="text" name="reviewerDesignation" placeholder="Designation *" />
                                <IconInput icon={FaBuilding} type="text" name="reviewerDepartment" placeholder="Department *" />
                                <IconInput icon={FaUniversity} type="text" name="reviewerState" placeholder="State *" />
                                <IconInput icon={FaCity} type="text" name="reviewerCity" placeholder="City *" />

                                <div className="md:col-span-2">
                                    <IconInput icon={FaMapMarkerAlt} type="text" name="reviewerAddress" placeholder="Address *" />
                                </div>
                            </div>
                        </FormSection>
                    )}

                    {/* Step 8: Summary & Review */}
                    {currentStep === 8 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-[#204066] mb-4">Review Your Submission</h2>

                            {/* Personal Details */}
                            <div className="border border-gray-300 rounded p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold text-[#204066]">Personal Details</h3>
                                    {!isLoggedIn && (
                                        <button type="button" onClick={() => setCurrentStep(1)} className="text-[#12b48b] text-sm hover:underline">Edit</button>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p><strong>Name:</strong> {personalDetails?.name}</p>
                                    <p><strong>Email:</strong> {personalDetails?.email}</p>
                                    <p><strong>Phone:</strong> {personalDetails?.phone}</p>
                                </div>
                            </div>

                            {/* Manuscript Information */}
                            <div className="border border-gray-300 rounded p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold text-[#204066]">Manuscript Information</h3>
                                    <button type="button" onClick={() => setCurrentStep(2)} className="text-[#12b48b] text-sm hover:underline">Edit</button>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Journal:</strong> {fetchedJournalOptions?.flatMap(g => g.options).find(o => o.value == values.journalId)?.label}</p>
                                    <p><strong>Type:</strong> {values.manuscriptType}</p>
                                    <p><strong>Title:</strong> {values.paperTitle}</p>
                                    <p><strong>Word Count:</strong> {values.wordCount} ({wordCountText})</p>
                                    <p><strong>Keywords:</strong> {keywords.join(', ')}</p>
                                    <p><strong>Abstract:</strong> {values.abstract?.substring(0, 100)}...</p>
                                </div>
                            </div>

                            {/* Primary Author */}
                            <div className="border border-gray-300 rounded p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold text-[#204066]">Primary Author</h3>
                                    <button type="button" onClick={() => setCurrentStep(3)} className="text-[#12b48b] text-sm hover:underline">Edit</button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p><strong>Name:</strong> {values.primaryAuthor.firstName} {values.primaryAuthor.lastName}</p>
                                    <p><strong>Email:</strong> {values.primaryAuthor.email}</p>
                                    <p><strong>Institution:</strong> {values.primaryAuthor.institution}</p>
                                    <p><strong>Country:</strong> {values.primaryAuthor.country}</p>
                                </div>
                            </div>

                            {/* Additional Authors */}
                            {values.authors.length > 0 && (
                                <div className="border border-gray-300 rounded p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-semibold text-[#204066]">Co-Authors ({values.authors.length})</h3>
                                        <button type="button" onClick={() => setCurrentStep(4)} className="text-[#12b48b] text-sm hover:underline">Edit</button>
                                    </div>
                                    {values.authors.map((author, idx) => (
                                        <p key={idx} className="text-sm">{author.firstName} {author.lastName} - {author.institution}</p>
                                    ))}
                                </div>
                            )}

                            {/* Files */}
                            <div className="border border-gray-300 rounded p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold text-[#204066]">Uploaded Files</h3>
                                    <button type="button" onClick={() => setCurrentStep(6)} className="text-[#12b48b] text-sm hover:underline">Edit</button>
                                </div>
                                <div className="text-sm space-y-1">
                                    <p><strong>Manuscript:</strong> {values.manuscriptFile?.name}</p>
                                    {values.coverLetter && <p><strong>Cover Letter:</strong> {values.coverLetter?.name}</p>}
                                </div>
                            </div>

                            {/* Reviewer */}
                            <div className="border border-gray-300 rounded p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold text-[#204066]">Suggested Reviewer</h3>
                                    <button type="button" onClick={() => setCurrentStep(7)} className="text-[#12b48b] text-sm hover:underline">Edit</button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p><strong>Name:</strong> {values.reviewerFirstName} {values.reviewerLastName}</p>
                                    <p><strong>Email:</strong> {values.reviewerEmail}</p>
                                    <p><strong>Institution:</strong> {values.reviewerInstitution}</p>
                                    <p><strong>Specialisation:</strong> {values.reviewerSpecialisation}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={() => setCurrentStep(currentStep - 1)}
                            disabled={currentStep === 1 || (isLoggedIn && currentStep === 2)}
                            className={`flex items-center gap-2 px-6 py-2 rounded font-bold ${(currentStep === 1 || (isLoggedIn && currentStep === 2))
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-500 hover:bg-gray-600 text-white'
                                }`}
                        >
                            <FaArrowLeft /> Previous
                        </button>

                        {currentStep < totalSteps ? (
                            <button
                                type="button"
                                onClick={() => {
                                    if (currentStep === 1 && !otpVerified) {
                                        message.error("Please verify your email with OTP before proceeding");
                                        return;
                                    }

                                    validateForm().then((errors) => {
                                        const hasErrors = Object.keys(errors).length > 0;
                                        if (!hasErrors) {
                                            setCurrentStep(currentStep + 1);
                                        } else {
                                            message.error("Please fill all required fields correctly");
                                        }
                                    });
                                }}
                                className="flex items-center gap-2 bg-[#12b48b] hover:bg-[#0e9470] text-white px-6 py-2 rounded font-bold"
                            >
                                Next <FaLongArrowAltRight />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => handleSubmit(values)}
                                className="flex items-center gap-2 bg-[#00a65a] hover:bg-[#008d4c] text-white px-6 py-2 rounded font-bold"
                            >
                                Submit Manuscript <FaLongArrowAltRight />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default ManuscriptFormSteps;
