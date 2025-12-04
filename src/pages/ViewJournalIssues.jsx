import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Popconfirm, message, Space, Typography } from 'antd';
import { FaPlus, FaEye, FaTrash } from 'react-icons/fa';
import { journalIssueApi } from '../services/api';

const { Title } = Typography;

const ViewJournalIssues = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchIssues = async () => {
        setLoading(true);
        try {
            const response = await journalIssueApi.getAll();
            // API returns { success: true, data: [...] }
            const issuesData = response.data.data || response.data;
            setIssues(issuesData);
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to fetch journal issues');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await journalIssueApi.delete(id);
            message.success(response.data.message || 'Journal issue deleted successfully');
            fetchIssues();
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to delete journal issue');
        }
    };

    const columns = [
        {
            title: 'S.No.',
            key: 'sno',
            width: 80,
            render: (_, __, index) => index + 1,
            align: 'center',
        },
        {
            title: 'Journal Title',
            dataIndex: ['journal', 'title'],
            key: 'journal_title',
            sorter: (a, b) => (a.journal?.title || '').localeCompare(b.journal?.title || ''),
            ellipsis: true,
            render: (text, record) => record.journal?.title || 'N/A',
        },
        {
            title: 'Volume',
            dataIndex: 'volume',
            key: 'volume',
            width: 120,
            sorter: (a, b) => a.volume - b.volume,
            align: 'center',
        },
        {
            title: 'Issue No.',
            dataIndex: 'issue_no',
            key: 'issue_no',
            width: 120,
            sorter: (a, b) => a.issue_no - b.issue_no,
            align: 'center',
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            width: 100,
            sorter: (a, b) => a.year - b.year,
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            align: 'center',
            render: (_, record) => (
                <Space size="small">
                    <Popconfirm
                        title="Delete Issue"
                        description="Are you sure you want to delete this journal issue?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <span

                        > <FaTrash color='red' />  </span>
                    </Popconfirm>
                    <span
                        type="primary"

                        onClick={() => navigate(`/dashboard/journal-issues/${record.id}`)}
                        className="bg-blue-500 hover:bg-blue-600  cursor-pointer"
                    >
                        <FaEye color='blue' />
                    </span>

                </Space>
            ),
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={2} className="!mb-0 text-gray-800">
                    Journal Issues
                </Title>
                <Button
                    type="primary"
                    icon={<FaPlus />}
                    onClick={() => navigate('/dashboard/journal-issues/add')}
                    size="large"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-lg"
                >
                    Add New Issue
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={issues}
                rowKey="id"
                loading={loading}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Total ${total} issues`,
                    pageSizeOptions: ['10', '20', '50', '100'],
                }}
                bordered
                className="shadow-sm"
                scroll={{ x: 800 }}
            />
        </div>
    );
};

export default ViewJournalIssues;
