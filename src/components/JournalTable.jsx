import React, { useState } from 'react';
import { Table, Button, Space, Tooltip, Modal, List, Avatar } from 'antd';
import { FaEye, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JournalTable = ({ journals }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentApps, setCurrentApps] = useState([]);
    const [modalTitle, setModalTitle] = useState("Editor Applications");

    const showApplications = (applications, journalTitle) => {
        setCurrentApps(applications || []);
        setModalTitle(`Applications for ${journalTitle}`);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: 'Sno.',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Journal Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Start Year',
            dataIndex: 'start_year',
            key: 'start_year',
        },
        {
            title: 'Frequency',
            dataIndex: 'frequency',
            key: 'frequency',
        },
        {
            title: 'Print ISSN',
            dataIndex: 'print_issn',
            key: 'print_issn',
        },
        {
            title: 'E ISSN',
            dataIndex: 'e_issn',
            key: 'e_issn',
        },
        {
            title: 'Editor Applications',
            key: 'editorApplications',
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{record.editorApplications?.length || 0}</span>
                    {record.editorApplications?.length > 0 && (
                        <Tooltip title="View Applicants">
                            <Button
                                type="text"
                                icon={<FaEye className="text-blue-500" />}
                                shape="circle"
                                className="hover:bg-blue-50"
                                onClick={() => showApplications(record.editorApplications, record.title)}
                            />
                        </Tooltip>
                    )}
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="View Details">
                        <Link to={`/dashboard/view-journal/${record.encryptedId}`}>
                            <Button
                                type="text"
                                icon={<FaEye className="text-[#12b48b]" />}
                                shape="circle"
                                className="hover:bg-green-50"
                            />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={journals}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={modalTitle}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="close" onClick={handleCancel}>
                        Close
                    </Button>
                ]}
            >
                {currentApps.length > 0 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={currentApps}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar icon={<FaUserTie />} style={{ backgroundColor: '#12b48b' }} />}
                                    title={<span className="capitalize">{item.firstName} {item.lastName}</span>}
                                    description="Applicant"
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    <div className="text-center py-4 text-gray-500">
                        No applications found.
                    </div>
                )}
            </Modal>
        </>
    );
};

export default JournalTable;
