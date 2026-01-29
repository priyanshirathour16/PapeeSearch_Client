import React, { useState } from 'react';
import { Modal, Table, Tag, Button, Space, Select, Input, message, Tooltip, Popconfirm, Divider, Timeline, Descriptions, Card } from 'antd';
import { FaDownload, FaUserEdit, FaCheck, FaTimes, FaFilePdf, FaUser, FaCalendarAlt, FaFileAlt, FaClipboardList } from 'react-icons/fa';
import { FileTextOutlined, UserOutlined, CommentOutlined, PaperClipOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, SyncOutlined, InfoCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { ImageURl } from '../services/serviceApi';
import {
    useAbstractsQuery,
    useEditorsQuery,
    useAssignEditorMutation,
    useAssignConferenceEditorMutation,
    useAdminDecisionMutation
} from '../hooks/useAbstractsQuery';
import moment from 'moment';

const { TextArea } = Input;

const STATUS_COLORS = {
    'Submitted': 'orange',
    'Assigned to Editor': 'blue',
    'Reviewed by Editor': 'geekblue',
    'Assigned to Conference Editor': 'purple',
    'Reviewed by Conference Editor': 'cyan',
    'Accepted': 'green',
    'Rejected': 'red',
};

// Status stages for timeline
const STATUS_STAGES = [
    { key: 'Submitted', label: 'Submitted', icon: <FileTextOutlined /> },
    { key: 'Assigned to Editor', label: 'Assigned to Editor', icon: <UserOutlined /> },
    { key: 'Reviewed by Editor', label: 'Reviewed by Editor', icon: <CheckCircleOutlined /> },
    { key: 'Assigned to Conference Editor', label: 'Assigned to Conf. Editor', icon: <UserOutlined /> },
    { key: 'Reviewed by Conference Editor', label: 'Reviewed by Conf. Editor', icon: <CheckCircleOutlined /> },
    { key: 'Accepted', label: 'Accepted', icon: <CheckCircleOutlined /> },
];

const SubmittedAbstractsModal = ({ open, onCancel, conferenceId, conferenceName }) => {
    // React Query hooks for real-time polling
    const {
        data: abstracts = [],
        isLoading: loading,
        refetch: refetchAbstracts,
        isFetching
    } = useAbstractsQuery(conferenceId, open);

    const { data: editors = [] } = useEditorsQuery(open);

    // Mutation hooks
    const assignEditorMutation = useAssignEditorMutation(conferenceId);
    const assignConfEditorMutation = useAssignConferenceEditorMutation(conferenceId);
    const adminDecisionMutation = useAdminDecisionMutation(conferenceId);

    // Local UI state
    const [selectedEditor, setSelectedEditor] = useState({});
    const [selectedConfEditor, setSelectedConfEditor] = useState({});
    const [finalDecisionModal, setFinalDecisionModal] = useState({ open: false, abstractId: null, action: null, record: null });
    const [adminComment, setAdminComment] = useState('');
    const [adminCommentError, setAdminCommentError] = useState('');
    const [detailModal, setDetailModal] = useState({ open: false, record: null });

    // Stage 1: Assign Editor
    const handleAssignEditor = async (abstractId) => {
        const editorId = selectedEditor[abstractId];
        if (!editorId) {
            message.warning('Please select an editor first');
            return;
        }
        try {
            const data = await assignEditorMutation.mutateAsync({ abstractId, editorId });
            if (data && data.success) {
                message.success(data.message || 'Abstract assigned to editor successfully');
            }
            setSelectedEditor((prev) => {
                const updated = { ...prev };
                delete updated[abstractId];
                return updated;
            });
        } catch (error) {
            console.error('Error assigning editor:', error);
            message.error(error?.response?.data?.message || 'Failed to assign editor');
        }
    };

    // Stage 2: Assign Conference Editor
    const handleAssignConferenceEditor = async (abstractId) => {
        const editorId = selectedConfEditor[abstractId];
        if (!editorId) {
            message.warning('Please select a conference editor first');
            return;
        }
        try {
            const data = await assignConfEditorMutation.mutateAsync({ abstractId, editorId });
            if (data && data.success) {
                message.success(data.message || 'Abstract assigned to conference editor successfully');
            }
            setSelectedConfEditor((prev) => {
                const updated = { ...prev };
                delete updated[abstractId];
                return updated;
            });
        } catch (error) {
            console.error('Error assigning conference editor:', error);
            message.error(error?.response?.data?.message || 'Failed to assign conference editor');
        }
    };

    // Stage 3: Final Admin Decision
    const openFinalDecisionModal = (abstractId, action, record) => {
        setFinalDecisionModal({ open: true, abstractId, action, record });
        setAdminComment('');
        setAdminCommentError('');
    };

    const closeFinalDecisionModal = () => {
        setFinalDecisionModal({ open: false, abstractId: null, action: null, record: null });
        setAdminComment('');
        setAdminCommentError('');
    };

    const handleFinalDecision = async () => {
        const { abstractId, action } = finalDecisionModal;
        if (action === 'reject' && !adminComment.trim()) {
            setAdminCommentError('Comment is mandatory for rejection.');
            return;
        }
        setAdminCommentError('');

        try {
            const data = await adminDecisionMutation.mutateAsync({ abstractId, action, comment: adminComment });
            if (data && data.success) {
                message.success(data.message || `Abstract ${action === 'accept' ? 'accepted' : 'rejected'} successfully`);
            }
            closeFinalDecisionModal();
        } catch (error) {
            console.error('Error with final decision:', error);
            message.error(error?.response?.data?.message || 'Failed to process decision');
        }
    };

    const editorOptions = editors.map((editor) => ({
        value: editor.id,
        label: `${editor.name} (${editor.specialization})`,
    }));

    const renderComments = (record) => {
        const comments = [];
        if (record.editor_comment) {
            comments.push({ label: 'Editor', name: record.assigned_editor?.name, text: record.editor_comment, color: 'blue' });
        }
        if (record.conference_editor_comment) {
            comments.push({ label: 'Conf. Editor', name: record.assigned_conference_editor?.name, text: record.conference_editor_comment, color: 'purple' });
        }
        if (record.admin_final_comment) {
            comments.push({ label: 'Admin', name: 'Admin', text: record.admin_final_comment, color: 'orange' });
        }

        if (comments.length === 0) return null;

        return (
            <div className="space-y-1 mt-1">
                {comments.map((c, i) => (
                    <div key={i} className="text-xs">
                        <CommentOutlined className={`mr-1 text-${c.color}-500`} />
                        <span className="font-medium">{c.label}:</span>{' '}
                        <span className="text-gray-500 truncate inline-block max-w-[100px] align-bottom">
                            {c.text}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    // Render the admin action column based on abstract status
    const renderAdminAction = (record) => {
        const { status } = record;

        // Rejected or Final Accepted: No action
        if (status === 'Rejected') {
            return <span className="text-red-500 text-xs font-medium">Rejected</span>;
        }
        if (status === 'Accepted') {
            return <span className="text-green-600 text-xs font-medium">Accepted (Final)</span>;
        }

        // Stage 1: Submitted → Assign Editor
        if (status === 'Submitted') {
            return (
                <Space direction="vertical" size="small" className="w-full">
                    <Select
                        placeholder="Select Editor"
                        className="w-full"
                        size="small"
                        value={selectedEditor[record.id] || undefined}
                        onChange={(value) => setSelectedEditor((prev) => ({ ...prev, [record.id]: value }))}
                        options={editorOptions}
                        allowClear
                    />
                    <Popconfirm
                        title="Assign Editor"
                        description="Assign this abstract to the selected editor?"
                        onConfirm={() => handleAssignEditor(record.id)}
                        okText="Yes"
                        cancelText="No"
                        disabled={!selectedEditor[record.id]}
                    >
                        <Button
                            type="primary"
                            size="small"
                            icon={<FaUserEdit />}
                            loading={assignEditorMutation.isPending}
                            disabled={!selectedEditor[record.id]}
                            className="bg-[#12b48b] hover:bg-[#0e9a77] border-none"
                        >
                            Assign Editor
                        </Button>
                    </Popconfirm>
                </Space>
            );
        }

        // Waiting: Assigned to Editor
        if (status === 'Assigned to Editor') {
            return (
                <span className="text-blue-600 text-xs font-medium">
                    Awaiting Editor Review
                    <div className="text-gray-500 mt-1">Editor: {record.assigned_editor?.name}</div>
                </span>
            );
        }

        // Stage 2: Reviewed by Editor → Assign Conference Editor
        if (status === 'Reviewed by Editor') {
            return (
                <Space direction="vertical" size="small" className="w-full">
                    <Select
                        placeholder="Select Conference Editor"
                        className="w-full"
                        size="small"
                        value={selectedConfEditor[record.id] || undefined}
                        onChange={(value) => setSelectedConfEditor((prev) => ({ ...prev, [record.id]: value }))}
                        options={editorOptions}
                        allowClear
                    />
                    <Popconfirm
                        title="Assign Conference Editor"
                        description="Assign this abstract to the selected conference editor?"
                        onConfirm={() => handleAssignConferenceEditor(record.id)}
                        okText="Yes"
                        cancelText="No"
                        disabled={!selectedConfEditor[record.id]}
                    >
                        <Button
                            type="primary"
                            size="small"
                            icon={<FaUserEdit />}
                            loading={assignConfEditorMutation.isPending}
                            disabled={!selectedConfEditor[record.id]}
                            className="bg-purple-600 hover:bg-purple-700 border-none"
                        >
                            Assign Conf. Editor
                        </Button>
                    </Popconfirm>
                </Space>
            );
        }

        // Waiting: Assigned to Conference Editor
        if (status === 'Assigned to Conference Editor') {
            return (
                <span className="text-purple-600 text-xs font-medium">
                    Awaiting Conf. Editor Review
                    <div className="text-gray-500 mt-1">Conf. Editor: {record.assigned_conference_editor?.name}</div>
                </span>
            );
        }

        // Stage 3: Reviewed by Conference Editor → Admin Final Decision
        if (status === 'Reviewed by Conference Editor') {
            return (
                <Space size="small">
                    <Button
                        type="primary"
                        size="small"
                        icon={<FaCheck />}
                        onClick={() => openFinalDecisionModal(record.id, 'accept', record)}
                        className="bg-green-600 hover:bg-green-700 border-none flex items-center gap-1"
                    >
                        Accept
                    </Button>
                    <Button
                        type="primary"
                        danger
                        size="small"
                        icon={<FaTimes />}
                        onClick={() => openFinalDecisionModal(record.id, 'reject', record)}
                        className="flex items-center gap-1"
                    >
                        Reject
                    </Button>
                </Space>
            );
        }

        return null;
    };

    // Detail Modal Functions
    const openDetailModal = (record) => {
        setDetailModal({ open: true, record });
    };

    const closeDetailModal = () => {
        setDetailModal({ open: false, record: null });
    };

    // Get current stage index for timeline
    const getStageIndex = (status) => {
        if (status === 'Rejected') return -1;
        return STATUS_STAGES.findIndex(s => s.key === status);
    };

    // Render timeline for abstract status progress
    const renderStatusTimeline = (record) => {
        const currentIndex = getStageIndex(record.status);
        const isRejected = record.status === 'Rejected';

        // Statuses where current step is complete and waiting for next assignment
        const completionStatuses = ['Submitted', 'Reviewed by Editor', 'Reviewed by Conference Editor', 'Accepted'];
        // Statuses where someone is assigned and we're waiting for their action
        const waitingForActionStatuses = ['Assigned to Editor', 'Assigned to Conference Editor'];

        const timelineItems = STATUS_STAGES.map((stage, index) => {
            let color = 'gray';
            let dot = <ClockCircleOutlined style={{ fontSize: 16, color: '#9ca3af' }} />;

            if (isRejected) {
                // For rejected: show completed stages before rejection
                if (index < currentIndex) {
                    color = 'green';
                    dot = <CheckCircleOutlined style={{ fontSize: 16, color: '#22c55e' }} />;
                } else if (index === currentIndex) {
                    // The stage where rejection happened - show as waiting (it was in progress)
                    color = 'orange';
                    dot = <ClockCircleOutlined style={{ fontSize: 16, color: '#f97316' }} />;
                }
            } else if (index < currentIndex) {
                // Completed stages
                color = 'green';
                dot = <CheckCircleOutlined style={{ fontSize: 16, color: '#22c55e' }} />;
            } else if (index === currentIndex) {
                // Current stage
                if (completionStatuses.includes(record.status)) {
                    // Current step is complete (green check)
                    color = 'green';
                    dot = <CheckCircleOutlined style={{ fontSize: 16, color: '#22c55e' }} />;
                } else if (waitingForActionStatuses.includes(record.status)) {
                    // Assigned but waiting for reviewer action (clock/waiting)
                    color = 'orange';
                    dot = <ClockCircleOutlined style={{ fontSize: 16, color: '#f97316' }} />;
                }
            } else if (index === currentIndex + 1 && completionStatuses.includes(record.status) && record.status !== 'Accepted') {
                // Next step that needs to be initiated (blue spinner)
                color = 'blue';
                dot = <SyncOutlined spin style={{ fontSize: 16, color: '#3b82f6' }} />;
            }

            // Build content for each stage
            let content = null;
            if (index === 0) {
                content = (
                    <div className="text-xs text-gray-500">
                        {moment(record.createdAt).format('DD MMM YYYY, hh:mm A')}
                    </div>
                );
            }
            if (index === 1 && record.assigned_editor) {
                content = (
                    <div className="text-xs text-gray-600">
                        <span className="font-medium">Editor:</span> {record.assigned_editor.name}
                    </div>
                );
            }
            if (index === 2 && record.editor_comment) {
                content = (
                    <div className="mt-1 p-2 bg-blue-50 rounded border border-blue-100 text-xs">
                        <div className="font-medium text-blue-700 mb-1">
                            <CommentOutlined className="mr-1" />
                            Editor Comment:
                        </div>
                        <div className="text-gray-700">{record.editor_comment}</div>
                    </div>
                );
            }
            if (index === 3 && record.assigned_conference_editor) {
                content = (
                    <div className="text-xs text-gray-600">
                        <span className="font-medium">Conf. Editor:</span> {record.assigned_conference_editor.name}
                    </div>
                );
            }
            if (index === 4 && record.conference_editor_comment) {
                content = (
                    <div className="mt-1 p-2 bg-purple-50 rounded border border-purple-100 text-xs">
                        <div className="font-medium text-purple-700 mb-1">
                            <CommentOutlined className="mr-1" />
                            Conference Editor Comment:
                        </div>
                        <div className="text-gray-700">{record.conference_editor_comment}</div>
                    </div>
                );
            }
            if (index === 5 && record.admin_final_comment) {
                content = (
                    <div className="mt-1 p-2 bg-green-50 rounded border border-green-100 text-xs">
                        <div className="font-medium text-green-700 mb-1">
                            <CommentOutlined className="mr-1" />
                            Admin Final Comment:
                        </div>
                        <div className="text-gray-700">{record.admin_final_comment}</div>
                    </div>
                );
            }

            // Determine text styling based on stage state
            let textClass = 'text-gray-400'; // Default for future stages
            if (isRejected) {
                if (index <= currentIndex) textClass = 'text-gray-800';
            } else if (index < currentIndex) {
                textClass = 'text-gray-800'; // Completed
            } else if (index === currentIndex) {
                textClass = 'text-gray-800'; // Current (whether complete or waiting)
            } else if (index === currentIndex + 1 && completionStatuses.includes(record.status) && record.status !== 'Accepted') {
                textClass = 'text-blue-600'; // Next step needing action
            }

            return {
                color,
                dot,
                children: (
                    <div className="pb-2">
                        <div className={`font-medium ${textClass}`}>
                            {stage.label}
                        </div>
                        {content}
                    </div>
                ),
            };
        });

        // Add rejection item if rejected
        if (isRejected) {
            // Find at which stage it was rejected based on comments
            let rejectionComment = record.admin_final_comment || record.conference_editor_comment || record.editor_comment;
            let rejectedBy = 'Admin';
            if (record.conference_editor_comment && !record.admin_final_comment) {
                rejectedBy = record.assigned_conference_editor?.name || 'Conference Editor';
            } else if (record.editor_comment && !record.conference_editor_comment) {
                rejectedBy = record.assigned_editor?.name || 'Editor';
            }

            timelineItems.push({
                color: 'red',
                dot: <CloseCircleOutlined style={{ fontSize: 16, color: '#ef4444' }} />,
                children: (
                    <div className="pb-2">
                        <div className="font-medium text-red-600">Rejected</div>
                        {rejectionComment && (
                            <div className="mt-1 p-2 bg-red-50 rounded border border-red-100 text-xs">
                                <div className="font-medium text-red-700 mb-1">
                                    <CommentOutlined className="mr-1" />
                                    Rejection Reason ({rejectedBy}):
                                </div>
                                <div className="text-gray-700">{rejectionComment}</div>
                            </div>
                        )}
                    </div>
                ),
            });
        }

        return <Timeline items={timelineItems} />;
    };

    const columns = [
        {
            title: '#',
            key: 'index',
            width: 40,
            render: (_, __, index) => (
                <span className="text-gray-600 font-mono text-xs">#{index + 1}</span>
            ),
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            width: 130,
            render: (author) => {
                if (author && author.firstName && author.lastName) {
                    return <span className="font-medium">{`${author.firstName} ${author.lastName}`}</span>;
                }
                return <span className="text-gray-400">N/A</span>;
            },
        },
        {
            title: 'Abstract File',
            dataIndex: 'abstract_file',
            key: 'abstract_file',
            width: 100,
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
            width: 140,
            render: (date) => moment(date).format('DD MMM YYYY, hh:mm A'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 200,
            render: (status, record) => (
                <div
                    onClick={() => openDetailModal(record)}
                    className="cursor-pointer hover:bg-blue-50 -m-2 p-2 rounded transition-colors"
                >
                    <Tag color={STATUS_COLORS[status] || 'default'}>
                        {status ? status.toUpperCase() : 'SUBMITTED'}
                    </Tag>
                    {record.assigned_editor && (
                        <div className="text-xs text-gray-500 mt-1">
                            <UserOutlined className="mr-1" />
                            Editor: {record.assigned_editor.name}
                        </div>
                    )}
                    {record.assigned_conference_editor && (
                        <div className="text-xs text-purple-500 mt-1">
                            <UserOutlined className="mr-1" />
                            Conf. Editor: {record.assigned_conference_editor.name}
                        </div>
                    )}
                    {renderComments(record)}
                </div>
            ),
        },
        {
            title: 'Full Paper',
            key: 'full_paper',
            width: 160,
            render: (_, record) => {
                const files = record.full_paper_files;
                if (!files || files.length === 0) {
                    if (record.status === 'Accepted') {
                        return <span className="text-orange-500 text-xs font-medium">Awaiting Submission</span>;
                    }
                    return <span className="text-gray-400 text-xs">N/A</span>;
                }
                return (
                    <div className="space-y-1">
                        {files.map((f) => (
                            <Tooltip key={f.id} title={`Uploaded by ${f.uploaded_by?.firstName} ${f.uploaded_by?.lastName} on ${new Date(f.uploaded_at).toLocaleDateString()}`}>
                                <a
                                    href={`${ImageURl}${f.file_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-blue-600 hover:underline text-xs"
                                >
                                    <PaperClipOutlined />
                                    <span className="truncate max-w-[100px]">{f.file_name}</span>
                                </a>
                            </Tooltip>
                        ))}
                    </div>
                );
            },
        },
        {
            title: 'Admin Action',
            key: 'action',
            width: 230,
            render: (_, record) => renderAdminAction(record),
        },
    ];

    const handleClose = () => {
        setSelectedEditor({});
        setSelectedConfEditor({});
        onCancel();
    };

    return (
        <>
            <Modal
                title={
                    <div className="flex items-center justify-between w-full pr-8">
                        <div className="flex items-center gap-2">
                            <FileTextOutlined className="text-[#12b48b]" />
                            <span>Submitted Abstracts {conferenceName ? `- ${conferenceName}` : ''}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Tooltip title="Auto-refreshing every 5 seconds">
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <SyncOutlined spin={isFetching} className={isFetching ? 'text-blue-500' : 'text-gray-400'} />
                                    <span>Live</span>
                                </div>
                            </Tooltip>
                            <Tooltip title="Refresh now">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<ReloadOutlined spin={isFetching} />}
                                    onClick={() => refetchAbstracts()}
                                    className="text-gray-500 hover:text-blue-500"
                                />
                            </Tooltip>
                        </div>
                    </div>
                }
                open={open}
                onCancel={handleClose}
                footer={<Button onClick={handleClose}>Close</Button>}
                width={1400}
                centered
                destroyOnClose
                styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
            >
                <Table
                    columns={columns}
                    dataSource={abstracts}
                    rowKey="id"
                    loading={loading && !abstracts.length}
                    pagination={{ pageSize: 5 }}
                    locale={{ emptyText: 'No abstract submissions found for this conference' }}
                    size="small"
                    scroll={{ x: 1200 }}
                />
            </Modal>

            {/* Admin Final Decision Modal */}
            <Modal
                title={
                    <div className="flex items-center gap-2">
                        {finalDecisionModal.action === 'accept' ? (
                            <FaCheck className="text-green-600" />
                        ) : (
                            <FaTimes className="text-red-500" />
                        )}
                        <span>
                            {finalDecisionModal.action === 'accept' ? 'Final Accept' : 'Final Reject'} Abstract
                        </span>
                    </div>
                }
                open={finalDecisionModal.open}
                onCancel={closeFinalDecisionModal}
                footer={null}
                destroyOnClose
                centered
                width={600}
                zIndex={1100}
            >
                <div className="py-2">
                    {finalDecisionModal.record?.title && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <span className="text-xs text-gray-500 block mb-1">Abstract Title</span>
                            <span className="font-medium text-gray-800">{finalDecisionModal.record.title}</span>
                        </div>
                    )}

                    {/* Show Editor Comment */}
                    {finalDecisionModal.record?.editor_comment && (
                        <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <span className="text-xs text-blue-600 font-medium block mb-1">
                                <CommentOutlined className="mr-1" />
                                Editor Comment ({finalDecisionModal.record.assigned_editor?.name})
                            </span>
                            <span className="text-gray-700 text-sm">{finalDecisionModal.record.editor_comment}</span>
                        </div>
                    )}

                    {/* Show Conference Editor Comment */}
                    {finalDecisionModal.record?.conference_editor_comment && (
                        <div className="mb-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                            <span className="text-xs text-purple-600 font-medium block mb-1">
                                <CommentOutlined className="mr-1" />
                                Conference Editor Comment ({finalDecisionModal.record.assigned_conference_editor?.name})
                            </span>
                            <span className="text-gray-700 text-sm">{finalDecisionModal.record.conference_editor_comment}</span>
                        </div>
                    )}

                    <div className="mb-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Admin Comment {finalDecisionModal.action === 'reject' && <span className="text-red-500">*</span>}
                        </label>
                        <TextArea
                            rows={4}
                            value={adminComment}
                            onChange={(e) => {
                                setAdminComment(e.target.value);
                                if (e.target.value.trim()) setAdminCommentError('');
                            }}
                            placeholder={
                                finalDecisionModal.action === 'accept'
                                    ? 'Enter your comment (optional)...'
                                    : 'Enter rejection reason (mandatory)...'
                            }
                            status={adminCommentError ? 'error' : ''}
                            maxLength={1000}
                            showCount
                        />
                        {adminCommentError && (
                            <div className="text-red-500 text-xs mt-1">{adminCommentError}</div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button onClick={closeFinalDecisionModal}>Cancel</Button>
                        {finalDecisionModal.action === 'accept' ? (
                            <Button
                                type="primary"
                                onClick={handleFinalDecision}
                                loading={adminDecisionMutation.isPending}
                                className="bg-green-600 hover:bg-green-700 border-none"
                            >
                                Final Accept
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                danger
                                onClick={handleFinalDecision}
                                loading={adminDecisionMutation.isPending}
                            >
                                Final Reject
                            </Button>
                        )}
                    </div>
                </div>
            </Modal>

            {/* Abstract Detail Modal */}
            <Modal
                title={
                    <div className="flex items-center gap-2">
                        <InfoCircleOutlined className="text-[#12b48b]" />
                        <span>Abstract Details</span>
                    </div>
                }
                open={detailModal.open}
                onCancel={closeDetailModal}
                footer={<Button onClick={closeDetailModal}>Close</Button>}
                width={900}
                centered
                destroyOnClose
                zIndex={1100}
                styles={{ body: { maxHeight: '75vh', overflowY: 'auto' } }}
            >
                {detailModal.record && (
                    <div className="py-2">
                        {/* Header Section with Status Badge */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {detailModal.record.title || ''}
                                </h3>
                                <Tag color={STATUS_COLORS[detailModal.record.status] || 'default'} className="text-sm px-3 py-1">
                                    {detailModal.record.status?.toUpperCase() || 'SUBMITTED'}
                                </Tag>
                            </div>
                            <div className="text-right text-xs text-gray-500">
                                <div>Abstract ID: #{detailModal.record.id}</div>
                            </div>
                        </div>

                        <Divider className="my-4" />

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column - Abstract Info */}
                            <div>
                                <Card
                                    title={
                                        <span className="flex items-center gap-2 text-sm">
                                            <FaClipboardList className="text-[#12b48b]" />
                                            Abstract Information
                                        </span>
                                    }
                                    size="small"
                                    className="shadow-sm"
                                >
                                    <Descriptions column={1} size="small" className="text-sm">
                                        <Descriptions.Item label={<span className="font-medium text-gray-600">Conference</span>}>
                                            <span className="text-gray-800">{detailModal.record.conference?.name || 'N/A'}</span>
                                        </Descriptions.Item>
                                        <Descriptions.Item label={<span className="font-medium text-gray-600">Author</span>}>
                                            <span className="text-gray-800 flex items-center gap-1">
                                                <FaUser className="text-gray-400" />
                                                {detailModal.record.author?.firstName} {detailModal.record.author?.lastName}
                                            </span>
                                        </Descriptions.Item>
                                        <Descriptions.Item label={<span className="font-medium text-gray-600">Email</span>}>
                                            <a href={`mailto:${detailModal.record.author?.email}`} className="text-blue-600 hover:underline">
                                                {detailModal.record.author?.email}
                                            </a>
                                        </Descriptions.Item>
                                        <Descriptions.Item label={<span className="font-medium text-gray-600">Submitted On</span>}>
                                            <span className="text-gray-800 flex items-center gap-1">
                                                <FaCalendarAlt className="text-gray-400" />
                                                {moment(detailModal.record.createdAt).format('DD MMM YYYY, hh:mm A')}
                                            </span>
                                        </Descriptions.Item>
                                        <Descriptions.Item label={<span className="font-medium text-gray-600">Abstract File</span>}>
                                            {detailModal.record.abstract_file ? (
                                                <a
                                                    href={`${ImageURl}${detailModal.record.abstract_file}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-blue-600 hover:underline"
                                                >
                                                    <FaFileAlt />
                                                    Download Abstract
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">No file</span>
                                            )}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>

                                {/* Full Paper Files Section */}
                                <Card
                                    title={
                                        <span className="flex items-center gap-2 text-sm">
                                            <PaperClipOutlined className="text-purple-600" />
                                            Full Paper Files
                                        </span>
                                    }
                                    size="small"
                                    className="shadow-sm mt-4"
                                >
                                    {detailModal.record.full_paper_files && detailModal.record.full_paper_files.length > 0 ? (
                                        <div className="space-y-2">
                                            {detailModal.record.full_paper_files.map((file) => (
                                                <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                                                    <div className="flex items-center gap-2">
                                                        <FaFilePdf className="text-red-500" />
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-800">{file.file_name}</div>
                                                            <div className="text-xs text-gray-500">
                                                                Uploaded by {file.uploaded_by?.firstName} {file.uploaded_by?.lastName} on {moment(file.uploaded_at).format('DD MMM YYYY')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={`${ImageURl}${file.file_path}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 text-blue-600 hover:underline text-xs"
                                                    >
                                                        <FaDownload /> Download
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-gray-400">
                                            {detailModal.record.status === 'Accepted' ? (
                                                <span className="text-orange-500">Awaiting full paper submission</span>
                                            ) : (
                                                <span>Full paper not yet required</span>
                                            )}
                                        </div>
                                    )}
                                </Card>

                                {/* Assigned Reviewers */}
                                <Card
                                    title={
                                        <span className="flex items-center gap-2 text-sm">
                                            <UserOutlined className="text-blue-600" />
                                            Assigned Reviewers
                                        </span>
                                    }
                                    size="small"
                                    className="shadow-sm mt-4"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 text-sm">Editor:</span>
                                            {detailModal.record.assigned_editor ? (
                                                <Tag color="blue">{detailModal.record.assigned_editor.name}</Tag>
                                            ) : (
                                                <span className="text-gray-400 text-sm">Not assigned</span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 text-sm">Conference Editor:</span>
                                            {detailModal.record.assigned_conference_editor ? (
                                                <Tag color="purple">{detailModal.record.assigned_conference_editor.name}</Tag>
                                            ) : (
                                                <span className="text-gray-400 text-sm">Not assigned</span>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Right Column - Status Timeline */}
                            <div>
                                <Card
                                    title={
                                        <span className="flex items-center gap-2 text-sm">
                                            
                                            Review Progress & Comments
                                        </span>
                                    }
                                    size="small"
                                    className="shadow-sm h-full"
                                >
                                    <div className="pt-2">
                                        {renderStatusTimeline(detailModal.record)}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default SubmittedAbstractsModal;
