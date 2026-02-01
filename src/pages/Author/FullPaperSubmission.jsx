import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Button, message, Tooltip, Breadcrumb } from 'antd';
import { FaDownload, FaUpload, FaFileAlt } from 'react-icons/fa';
import { HomeOutlined, FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { ImageURl } from '../../services/serviceApi';
import { abstractSubmissionApi } from '../../services/api';
import FullPaperUploadModal from '../../components/FullPaperUploadModal';
import moment from 'moment';

const FullPaperSubmission = () => {
    const [abstracts, setAbstracts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadModal, setUploadModal] = useState({ open: false, record: null });

    useEffect(() => {
        fetchAcceptedAbstracts();
    }, []);

    const fetchAcceptedAbstracts = async () => {
        setLoading(true);
        try {
            const response = await abstractSubmissionApi.getAuthorAccepted();
            if (response.data && response.data.success) {
                setAbstracts(response.data.data);
            } else {
                setAbstracts([]);
            }
        } catch (error) {
            console.error('Error fetching accepted abstracts:', error);
            message.error(error?.response?.data?.message || 'Failed to fetch accepted abstracts');
        } finally {
            setLoading(false);
        }
    };

    const openUploadModal = (record) => {
        setUploadModal({ open: true, record });
    };

    const closeUploadModal = () => {
        setUploadModal({ open: false, record: null });
    };

    const columns = [
        {
            title: '#',
            key: 'index',
            width: 50,
            render: (_, __, index) => (
                <span className="text-gray-600 font-mono text-xs">#{index + 1}</span>
            ),
        },
        {
            title: 'Abstract ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (id) => <span className="font-mono text-xs text-gray-500">ABS-{String(id).padStart(3, '0')}</span>,
        },
        {
            title: 'Abstract Title',
            dataIndex: 'title',
            key: 'title',
            width: 250,
            render: (title) => <span className="font-medium text-gray-800">{title}</span>,
        },
        {
            title: 'Conference',
            dataIndex: ['conference', 'name'],
            key: 'conference',
            width: 220,
            render: (text) => <span className="font-medium text-[#12b48b]">{text || 'N/A'}</span>,
        },
        {
            title: 'Abstract File',
            dataIndex: 'abstract_file',
            key: 'abstract_file',
            width: 120,
            render: (text) =>
                text ? (
                    <a
                        href={`${ImageURl}${text}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                        <FaDownload /> Download
                    </a>
                ) : (
                    <span className="text-gray-400">No File</span>
                ),
        },
        {
            title: 'Submission Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 160,
            render: (date) => moment(date).format('DD MMM YYYY, hh:mm A'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: () => (
                <Tag color="green" icon={<CheckCircleOutlined />}>
                    ACCEPTED
                </Tag>
            ),
        },
        {
            title: 'Full Paper',
            key: 'full_paper',
            width: 200,
            render: (_, record) => {
                const files = record.full_paper_files;
                if (files && files.length > 0) {
                    return (
                        <div className="space-y-1">
                            {files.map((f) => (
                                <div key={f.id} className="flex items-center gap-1">
                                    <Tooltip title={`Uploaded: ${moment(f.uploaded_at).format('DD MMM YYYY, hh:mm A')}`}>
                                        <a
                                            href={`${ImageURl}${f.file_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-blue-600 hover:underline text-xs"
                                        >
                                            <FaDownload className="text-[10px]" />
                                            <span className="truncate max-w-[120px]">{f.file_name}</span>
                                        </a>
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    );
                }

                return (
                    <Tag color="warning" className="text-xs">
                        Not Submitted
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            width: 160,
            render: (_, record) => {
                const hasFiles = record.full_paper_files && record.full_paper_files.length > 0;
                return (
                    <Button
                        type="primary"
                        size="small"
                        icon={<FaUpload />}
                        onClick={() => openUploadModal(record)}
                        disabled={hasFiles}
                        className={`flex items-center gap-1 ${hasFiles ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#12b48b] hover:bg-[#0e9a77]'} border-none`}
                    >
                        {hasFiles ? 'Paper Submitted' : 'Submit Full Paper'}
                    </Button>
                );
            },
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <Breadcrumb
                    items={[
                        { href: '/dashboard', title: <HomeOutlined /> },
                        { title: 'Full Paper Submission' },
                    ]}
                />
            </div>

            <Card
                title={
                    <div className="flex items-center gap-2">
                        <FileTextOutlined className="text-[#12b48b]" />
                        <span>Full Paper Submission</span>
                    </div>
                }
                className="shadow-sm border-t-4 border-t-[#12b48b]"
                extra={
                    <span className="text-sm text-gray-500">
                        Only accepted abstracts are shown below
                    </span>
                }
            >
                <Table
                    columns={columns}
                    dataSource={abstracts}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    locale={{ emptyText: 'No accepted abstracts found. Full paper submission is available only after your abstract is accepted.' }}
                    scroll={{ x: 1300 }}
                />
            </Card>

            {/* Full Paper Upload Modal */}
            <FullPaperUploadModal
                open={uploadModal.open}
                onCancel={closeUploadModal}
                abstractRecord={uploadModal.record}
                onSuccess={fetchAcceptedAbstracts}
            />
        </div>
    );
};

export default FullPaperSubmission;
