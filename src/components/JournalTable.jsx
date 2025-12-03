import React from 'react';
import { Table, Button, Space, Tooltip } from 'antd';
import { FaEye, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JournalTable = ({ journals }) => {
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
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="View Details">
                        <Link to={`/dashboard/view-journal/${record.encryptedId}`}>
                            <Button type="text" icon={<FaEye className="text-blue-500 text-lg" />} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={journals}
            rowKey="id"
            pagination={{ pageSize: 10 }}
        />
    );
};

export default JournalTable;
