import React, { useState, useEffect } from 'react';
import { Table, Button, message, Space, Tooltip } from 'antd';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { manuscriptApi } from '../../services/api';




const ManuscriptList = () => {
    const [manuscripts, setManuscripts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchManuscripts = async () => {
        setLoading(true);
        try {
            const response = await manuscriptApi.getAll();
            // Expected response structure: { message: "...", data: [...] }
            setManuscripts(response.data.data);
        } catch (error) {
            console.error("Failed to fetch manuscripts:", error);
            message.error("Failed to load manuscripts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchManuscripts();
    }, []);

    const columns = [
        {
            title: 'S.No',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: 70,
        },
        {
            title: 'Ref ID',
            dataIndex: 'manuscript_id',
            key: 'manuscript_id',
            ellipsis: true,
        },
        {
            title: 'Submitter Name',
            dataIndex: 'submitter_name',
            key: 'submitter_name',
        },
        {
            title: 'Email',
            dataIndex: 'submitter_email',
            key: 'submitter_email',
        },
        {
            title: 'Journal',
            dataIndex: 'journal',
            key: 'journal',
            render: (journal) => journal?.title || 'N/A',
        },
        {
            title: 'Submitted At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="View Details">
                        <Button
                            type="text"
                            icon={<FaEye className="text-gray-600 text-lg" />}
                            onClick={() => navigate(`/dashboard/manuscripts/${record.manuscript_id}`)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (


        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Manuscripts </h1>

            <div className="bg-white rounded-lg shadow overflow-hidden p-4">
                <Table
                    columns={columns}
                    dataSource={manuscripts}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    bordered
                />
            </div>
        </div>
    );
};

export default ManuscriptList;
