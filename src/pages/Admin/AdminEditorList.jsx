import React, { useState, useEffect } from 'react';
import { editorApplicationApi } from '../../services/api';
import { Table, Modal, Button, Tag, Space, message, Popconfirm } from 'antd';
import { FaEye, FaFileDownload, FaTrash } from 'react-icons/fa';
import { ImageURl } from '../../services/serviceApi';

const AdminEditorList = () => {
    const [editors, setEditors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEditor, setSelectedEditor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchEditors();
    }, []);

    const fetchEditors = async () => {
        try {
            const response = await editorApplicationApi.getAll();
            setEditors(response.data);
        } catch (error) {
            console.error("Error fetching editor applications:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (editor) => {
        setSelectedEditor(editor);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEditor(null);
    };

    const handleDelete = async (id) => {
        try {
            await editorApplicationApi.delete(id);
            message.success('Application deleted successfully');
            fetchEditors();
        } catch (error) {
            message.error('Failed to delete application');
        }
    };

    const columns = [
        {
            title: 'S.No',
            key: 'serial',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Journal',
            dataIndex: 'journal',
            key: 'journal',
            render: (text) => <span className="font-medium">{text}</span>,
        },
        {
            title: 'Name',
            key: 'name',
            render: (_text, record) => <span>{record.title} {record.firstName} {record.lastName}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (status) => {
        //         const color = status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'gold';
        //         return (
        //             <Tag color={color} className="uppercase">
        //                 {status || 'PENDING'}
        //             </Tag>
        //         );
        //     },
        // },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'gold';
                let text = 'PENDING';
                if (status === 'active' || status === 'approved' || status === 'pending') {
                    color = 'green';
                    text = 'ACTIVE';
                } else if (status === 'inactive' || status === 'rejected') {
                    color = 'red';
                    text = 'INACTIVE';
                }

                return (
                    <Tag color={color} className="uppercase">
                        {text}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_text, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<FaEye className="text-[#12b48b]" />}
                        onClick={() => handleView(record)}
                        shape="circle"
                        className="hover:bg-green-50"
                    />
                    <Popconfirm
                        title="Delete Application"
                        description="Are you sure you want to delete this application?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="text"
                            icon={<FaTrash className="text-red-500" />}
                            shape="circle"
                            className="hover:bg-red-50"
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Editor Applications</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden p-4">
                <Table
                    columns={columns}
                    dataSource={editors}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </div>

            <Modal
                title={<span className="text-xl font-bold text-gray-800">Application Details</span>}
                open={isModalOpen}
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>
                        Close
                    </Button>
                ]}
                width={700}
            >
                {selectedEditor && (
                    <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <div className="md:col-span-2">
                            <h3 className="font-bold text-gray-700 border-b pb-2 mb-2">Personal Details</h3>
                        </div>
                        <DetailRow label="Journal" value={selectedEditor.journal} fullWidth />
                        <DetailRow label="Title" value={selectedEditor.title} />
                        <DetailRow label="Full Name" value={`${selectedEditor.firstName} ${selectedEditor.lastName}`} />
                        <DetailRow label="Email" value={selectedEditor.email} />

                        <div className="md:col-span-2 mt-2">
                            <h3 className="font-bold text-gray-700 border-b pb-2 mb-2">Academic Details</h3>
                        </div>
                        <DetailRow label="Qualification" value={selectedEditor.qualification} />
                        <DetailRow label="Specialization" value={selectedEditor.specialization} />
                        <DetailRow label="Institute" value={selectedEditor.institute} fullWidth />

                        <div className="md:col-span-2 mt-2">
                            <h3 className="font-bold text-gray-700 border-b pb-2 mb-2">Documents</h3>
                        </div>
                        <div className="md:col-span-2 flex items-center justify-between bg-gray-50 p-3 rounded border">
                            <span className="text-gray-600 text-sm">Curriculum Vitae</span>
                            {selectedEditor.cvFile ? (
                                <a
                                    href={`${ImageURl}/${selectedEditor.cvFile}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium"
                                >
                                    <FaFileDownload /> Download CV
                                </a>
                            ) : (
                                <span className="text-gray-400 text-sm italic">No file uploaded</span>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

const DetailRow = ({ label, value, fullWidth }) => (
    <div className={`flex flex-col ${fullWidth ? 'md:col-span-2' : ''}`}>
        <span className="text-sm text-gray-500 font-medium">{label}</span>
        <span className="text-base text-gray-900 border-b border-gray-100 pb-1">{value || 'N/A'}</span>
    </div>
);

export default AdminEditorList;
