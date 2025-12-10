import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Descriptions, Typography, Card, Table, Button, Tag, message, Divider, Space } from 'antd';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import { manuscriptApi } from '../../services/api';
import { scriptUrl } from '../../services/serviceApi';

const { Title, Text } = Typography;

const ManuscriptDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [manuscript, setManuscript] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await manuscriptApi.getById(id);
                setManuscript(response.data.data);
            } catch (error) {
                console.error("Error fetching manuscript details:", error);
                message.error("Failed to fetch manuscript details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDetails();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Loading details..." />
            </div>
        );
    }

    if (!manuscript) {
        return <div className="p-6 text-center">Manuscript not found.</div>;
    }

    const authorColumns = [
        { title: 'Name', key: 'name', render: (text, record) => `${record.first_name} ${record.last_name}` },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Institution', dataIndex: 'institution', key: 'institution' },
        { title: 'Department', dataIndex: 'department', key: 'department' },
        { title: 'Country', dataIndex: 'country', key: 'country' },
        {
            title: 'Role',
            key: 'role',
            render: (text, record) => (
                record.is_corresponding_author ? <Tag color="blue">Corresponding Author</Tag> : <Tag>Author</Tag>
            )
        },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Button
                icon={<FaArrowLeft />}
                onClick={() => navigate('/dashboard/manuscripts')}
                className="mb-4"
            >
                Back to List
            </Button>

            <div className="bg-white p-6 shadow rounded-lg">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <Title level={3} className="m-0">{manuscript.paper_title}</Title>
                        <Text type="secondary">Ref ID: {manuscript.manuscript_id}</Text>
                        <div className="mt-2">
                            <Tag color={manuscript.status === 'Submitted' ? 'green' : 'default'}>{manuscript.status}</Tag>
                            <Text type="secondary" className="ml-2">Submitted on: {new Date(manuscript.createdAt).toLocaleDateString()}</Text>
                        </div>
                    </div>
                </div>

                <Descriptions title="Journal Information" bordered column={1} className="mb-6">
                    <Descriptions.Item label="Journal Title">{manuscript.journal?.title || 'Unknown'}</Descriptions.Item>
                    {manuscript.journal?.print_issn && <Descriptions.Item label="ISSN">{manuscript.journal.print_issn}</Descriptions.Item>}
                </Descriptions>

                <Descriptions title="Submitter Details" bordered column={2} className="mb-6">
                    <Descriptions.Item label="Name">{manuscript.submitter_name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{manuscript.submitter_email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{manuscript.submitter_phone}</Descriptions.Item>
                </Descriptions>

                <Divider orientation="left">Metadata</Divider>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <Card size="small" title="Word Count">{manuscript.word_count}</Card>
                    <Card size="small" title="Page Count">{manuscript.page_count}</Card>
                    <Card size="small" title="Tables">{manuscript.table_count || 0}</Card>
                    <Card size="small" title="Figures">{manuscript.figure_count || 0}</Card>
                </div>

                <div className="mb-6">
                    <Title level={5}>Abstract</Title>
                    <div className="p-4 bg-gray-50 rounded border">{manuscript.abstract}</div>
                </div>

                <div className="mb-6">
                    <Title level={5}>Keywords</Title>
                    <Text>{manuscript.keywords}</Text>
                </div>

                <Divider orientation="left">Authors</Divider>
                <Table
                    dataSource={manuscript.authors}
                    columns={authorColumns}
                    pagination={false}
                    rowKey="id"
                    bordered
                    className="mb-8"
                />

                <Divider orientation="left">Suggested Reviewer</Divider>
                <Descriptions bordered column={2} className="mb-6">
                    <Descriptions.Item label="Name">{manuscript.reviewer_first_name} {manuscript.reviewer_last_name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{manuscript.reviewer_email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{manuscript.reviewer_phone}</Descriptions.Item>
                    <Descriptions.Item label="Institution">{manuscript.reviewer_institution}</Descriptions.Item>
                </Descriptions>

                <Divider orientation="left">Attachments</Divider>
                <Space size="large">
                    {manuscript.manuscript_file_path && (
                        <Button type="primary" icon={<FaDownload />} href={`${scriptUrl}${manuscript.manuscript_file_path}`} target="_blank">
                            Download Manuscript
                        </Button>
                    )}
                    {manuscript.cover_letter_file_path && (
                        <Button icon={<FaDownload />} href={`${scriptUrl}${manuscript.cover_letter_file_path}`} target="_blank">
                            Download Cover Letter
                        </Button>
                    )}
                    {manuscript.signature_file_path && (
                        <div>
                            <Text strong className="block mb-2">Signature:</Text>
                            <img src={`${scriptUrl}${manuscript.signature_file_path}`} alt="Signature" className="h-16 border p-1" />
                        </div>
                    )}
                </Space>
            </div>
        </div>
    );
};

export default ManuscriptDetails;
