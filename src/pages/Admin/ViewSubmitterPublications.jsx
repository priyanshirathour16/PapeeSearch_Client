import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message, Space, Tooltip, Select, Input, Upload, Row, Col, Popconfirm } from 'antd';
import { FaEye, FaPlus, FaUpload, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { publicationApi, journalApi, journalIssueApi } from '../../services/api';
import { encryptId } from '../../utils/idEncryption';
import { ImageURl } from '../../services/serviceApi';

const { Option } = Select;
const { TextArea } = Input;

const ViewSubmitterPublications = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [journals, setJournals] = useState([]);
    const [issues, setIssues] = useState([]);
    const [editingPublication, setEditingPublication] = useState(null);
    const navigate = useNavigate();

    // Fetch Initial Data
    useEffect(() => {
        fetchPublications();
        fetchJournals();
    }, []);

    const fetchPublications = async () => {
        setLoading(true);
        try {
            const response = await publicationApi.getAll();
            setPublications(response.data.data || []);
        } catch (error) {
            console.error("Failed to fetch publications", error);
            message.error("Failed to load publications");
        } finally {
            setLoading(false);
        }
    };

    const fetchJournals = async () => {
        try {
            const response = await journalApi.getAll();
            // Handle both array directly or wrapped in data
            const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
            setJournals(data);
        } catch (error) {
            console.error("Failed to fetch journals", error);
        }
    };

    const fetchIssuesByJournal = async (journalId) => {
        if (!journalId) {
            setIssues([]);
            return;
        }
        try {
            const response = await journalIssueApi.getByJournal(journalId);
            setIssues(response.data.data || []);
        } catch (error) {
            console.error("Failed to fetch issues", error);
            message.error("Failed to load issues for the selected journal");
            setIssues([]);
        }
    };

    // Validation Schema
    const getPublicationSchema = (isEdit) => Yup.object().shape({
        journal_id: Yup.number().required('Journal is required'),
        issue_id: Yup.number().required('Issue is required'),
        manuscript_id: Yup.string().required('Manuscript ID is required'),
        title: Yup.string().required('Title is required'),
        author_name: Yup.string().required('Author Name is required'),
        doi: Yup.string().optional(),
        pages: Yup.string().optional(),
        author_affiliations: Yup.string().optional(),
        abstract_description: Yup.string().optional(),
        abstract_keywords: Yup.string().optional(),
        pdf_file: isEdit
            ? Yup.mixed().nullable().test(
                "fileType",
                "Only PDF files are allowed",
                value => !value || (value && value.type === "application/pdf")
            )
            : Yup.mixed().required('PDF File is required').test(
                "fileType",
                "Only PDF files are allowed",
                value => value && value.type === "application/pdf"
            )
    });

    const handleDelete = async (id) => {
        try {
            await publicationApi.delete(id);
            message.success('Publication deleted successfully');
            fetchPublications();
        } catch (error) {
            console.error("Delete error", error);
            message.error(error.response?.data?.message || 'Failed to delete publication');
        }
    };

    const handleEdit = (record) => {
        setEditingPublication(record);
        setIsModalVisible(true);
        // Pre-fetch issues if journal is already selected
        if (record.journal_id) {
            fetchIssuesByJournal(record.journal_id);
        }
    };

    const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
        console.log("Submitting values:", values);
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            // Only append if value is present or if it's pdf_file (handle differently for edit)
            if (values[key] !== null && values[key] !== undefined) {
                formData.append(key, values[key]);
            }
        });

        try {
            let response;
            if (editingPublication) {
                response = await publicationApi.update(editingPublication.id, formData);
            } else {
                response = await publicationApi.create(formData);
            }

            if (response.data.success) {
                message.success(`Publication ${editingPublication ? 'updated' : 'created'} successfully`);
                setIsModalVisible(false);
                resetForm();
                setEditingPublication(null);
                fetchPublications();
            } else {
                message.error(response.data.message || `Failed to ${editingPublication ? 'update' : 'create'} publication`);
            }
        } catch (error) {
            console.error("Submission error", error);
            message.error(error.response?.data?.message || `Failed to ${editingPublication ? 'update' : 'create'} publication`);
        } finally {
            setSubmitting(false);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: 70,
        },
        {
            title: 'Manuscript ID',
            dataIndex: 'manuscript_id',
            key: 'manuscript_id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
        },
        {
            title: 'Author',
            dataIndex: 'author_name',
            key: 'author_name',
        },
        {
            title: 'Journal',
            dataIndex: 'journal', // detailed object in response?
            key: 'journal',
            render: (journal) => journal?.title || 'N/A'
        },
        {
            title: 'Issue',
            dataIndex: 'issue',
            key: 'issue',
            render: (issue) => issue ? `Vol ${issue.volume} No ${issue.issue_no}` : 'N/A'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="View Details">
                        <Button
                            icon={<FaEye />}
                            onClick={() => {
                                const encryptedId = encryptId(record.id);
                                navigate(`/dashboard/view-submitter-publications/${encryptedId}`);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button
                            icon={<FaPencilAlt />}
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Delete Publication?"
                        description="Are you sure you want to delete this publication? This action cannot be undone."
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title="Delete">
                            <Button
                                icon={<FaTrash />}
                                className="text-red-500 hover:text-red-700"
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Submitter Publications</h1>
                <Button
                    type="primary"
                    icon={<FaPlus />}
                    onClick={() => {
                        setEditingPublication(null);
                        setIsModalVisible(true);
                        setIssues([]); // Reset issues on new
                    }}
                    size="large"
                >
                    Add New Publication
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden p-4">
                <Table
                    columns={columns}
                    dataSource={publications}
                    rowKey="id"
                    loading={loading}
                    bordered
                />
            </div>

            <Modal
                title={editingPublication ? "Edit Publication" : "Add New Publication"}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingPublication(null);
                }}
                footer={null}
                width={800}
                destroyOnClose
            >
                <Formik
                    initialValues={{
                        journal_id: editingPublication?.journal_id || '',
                        issue_id: editingPublication?.issue_id || '',
                        manuscript_id: editingPublication?.manuscript_id || '',
                        title: editingPublication?.title || '',
                        author_name: editingPublication?.author_name || '',
                        doi: editingPublication?.doi || '',
                        pages: editingPublication?.pages || '',
                        author_affiliations: editingPublication?.author_affiliations || '',
                        abstract_description: editingPublication?.abstract_description || '',
                        abstract_keywords: editingPublication?.abstract_keywords || '',
                        pdf_file: null // File cannot be prefilled
                    }}
                    validationSchema={getPublicationSchema(!!editingPublication)}
                    onSubmit={handleSubmitForm}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {

                        return (
                            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Journal <span className="text-red-500">*</span></label>
                                            <Select
                                                placeholder="Select Journal"
                                                className="w-full"
                                                value={values.journal_id}
                                                onChange={(val) => {
                                                    setFieldValue('journal_id', val);
                                                    setFieldValue('issue_id', ''); // Reset issue
                                                    fetchIssuesByJournal(val);
                                                }}
                                                status={touched.journal_id && errors.journal_id ? 'error' : ''}
                                            >
                                                {journals.map(j => <Option key={j.id} value={j.id}>{j.title}</Option>)}
                                            </Select>
                                            {touched.journal_id && errors.journal_id && <div className="text-red-500 text-xs mt-1">{errors.journal_id}</div>}
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Issue <span className="text-red-500">*</span></label>
                                            <Select
                                                placeholder="Select Issue"
                                                className="w-full"
                                                value={values.issue_id}
                                                onChange={(val) => setFieldValue('issue_id', val)}
                                                status={touched.issue_id && errors.issue_id ? 'error' : ''}
                                                disabled={!values.journal_id}
                                            >
                                                {issues.map(i => (
                                                    <Option key={i.id} value={i.id}>
                                                        Vol {i.volume}, No {i.issue_no} ({i.year})
                                                    </Option>
                                                ))}
                                            </Select>
                                            {touched.issue_id && errors.issue_id && <div className="text-red-500 text-xs mt-1">{errors.issue_id}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Manuscript ID <span className="text-red-500">*</span></label>
                                            <Input
                                                name="manuscript_id"
                                                placeholder="e.g. MS-2024-001"
                                                value={values.manuscript_id}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                status={touched.manuscript_id && errors.manuscript_id ? 'error' : ''}
                                            />
                                            {touched.manuscript_id && errors.manuscript_id && <div className="text-red-500 text-xs mt-1">{errors.manuscript_id}</div>}
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Author Name <span className="text-red-500">*</span></label>
                                            <Input
                                                name="author_name"
                                                placeholder="Main Author Name"
                                                value={values.author_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                status={touched.author_name && errors.author_name ? 'error' : ''}
                                            />
                                            {touched.author_name && errors.author_name && <div className="text-red-500 text-xs mt-1">{errors.author_name}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                                    <Input
                                        name="title"
                                        placeholder="Publication Title"
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        status={touched.title && errors.title ? 'error' : ''}
                                    />
                                    {touched.title && errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                                </div>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">DOI</label>
                                            <Input
                                                name="doi"
                                                placeholder="DOI"
                                                value={values.doi}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
                                            <Input
                                                name="pages"
                                                placeholder="e.g. 10-25"
                                                value={values.pages}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </Col>
                                </Row>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Author Affiliations</label>
                                    <TextArea
                                        name="author_affiliations"
                                        placeholder="Author Affiliations"
                                        value={values.author_affiliations}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        rows={2}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Abstract</label>
                                    <TextArea
                                        name="abstract_description"
                                        placeholder="Abstract description..."
                                        value={values.abstract_description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        rows={3}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                                    <Input
                                        name="abstract_keywords"
                                        placeholder="Keywords separated by comma"
                                        value={values.abstract_keywords}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">PDF File <span className="text-red-500">*</span></label>
                                    <Upload
                                        beforeUpload={(file) => {
                                            setFieldValue("pdf_file", file);
                                            return false; // Prevent automatic upload
                                        }}
                                        onRemove={() => setFieldValue("pdf_file", null)}
                                        maxCount={1}
                                        accept=".pdf"
                                    >
                                        <Button icon={<FaUpload />}>Select PDF File</Button>
                                    </Upload>
                                    {touched.pdf_file && errors.pdf_file && <div className="text-red-500 text-xs mt-1">{errors.pdf_file}</div>}
                                    {editingPublication && editingPublication.pdf_path && (
                                        <div className="mt-2 text-sm text-gray-500">
                                            Current File: <a href={`${ImageURl}${editingPublication.pdf_path}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Existing PDF</a>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-2 pt-4 border-t">
                                    <Button onClick={() => {
                                        setIsModalVisible(false);
                                        setEditingPublication(null);
                                    }} type="default">Cancel</Button>
                                    <Button type="primary" htmlType="submit" loading={isSubmitting}>
                                        {editingPublication ? 'Update Publication' : 'Submit Publication'}
                                    </Button>
                                </div>
                            </form>
                        )
                    }}
                </Formik>
            </Modal>
        </div>
    );
};

export default ViewSubmitterPublications;
