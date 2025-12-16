import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Descriptions, Typography, Card, Table, Button, Tag, message, Divider, Space, Row, Col, Avatar, Tooltip } from 'antd';
import { FaArrowLeft, FaDownload, FaFilePdf, FaCheckCircle, FaTimesCircle, FaUser, FaInfoCircle } from 'react-icons/fa';
import { manuscriptApi } from '../../services/api';
import { scriptUrl } from '../../services/serviceApi';

const { Title, Text, Paragraph } = Typography;

const ManuscriptDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [manuscript, setManuscript] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await manuscriptApi.getById(id);
                // The API returns { message: "...", data: { ... } }
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
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <Spin size="large" tip="Loading manuscript details..." />
            </div>
        );
    }

    if (!manuscript) {
        return (
            <div className="p-12 text-center bg-gray-50 min-h-screen">
                <Title level={4}>Manuscript not found</Title>
                <Button onClick={() => navigate('/dashboard/manuscripts')}>Back to List</Button>
            </div>
        );
    }

    const authorColumns = [
        {
            title: 'Name',
            key: 'name',
            render: (text, record) => (
                <div className="flex items-center gap-2">
                    <Avatar icon={<FaUser />} size="small" className="bg-[#12b48b]" />
                    <Text strong>{record.first_name} {record.last_name}</Text>
                </div>
            )
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Institution', dataIndex: 'institution', key: 'institution' },
        { title: 'Department', dataIndex: 'department', key: 'department', responsive: ['md'] },
        { title: 'Country', dataIndex: 'country', key: 'country' },
        {
            title: 'Role',
            key: 'role',
            render: (text, record) => (
                record.is_corresponding_author ? <Tag color="blue">Corresponding</Tag> : <Tag>Author</Tag>
            )
        },
    ];

    const checklistItems = [
        { key: 'is_sole_submission', label: 'Sole Submission' },
        { key: 'is_not_published', label: 'Not Published Before' },
        { key: 'is_original_work', label: 'Original Work' },
        { key: 'has_declared_conflicts', label: 'Declared Conflicts' },
        { key: 'has_acknowledged_support', label: 'Acknowledged Support' },
        { key: 'has_acknowledged_funding', label: 'Acknowledged Funding' },
        { key: 'follows_guidelines', label: 'Follows Guidelines' },
    ];

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'submitted': return 'green';
            case 'under review': return 'orange';
            case 'accepted': return 'blue';
            case 'rejected': return 'red';
            default: return 'default';
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {/* Header / Navigation */}
            <div className="mb-6 flex justify-between items-center">
                <Button
                    icon={<FaArrowLeft />}
                    onClick={() => navigate('/dashboard/manuscripts')}
                    type="text"
                    className="hover:bg-gray-200"
                >
                    Back to List
                </Button>
                <Space>
                    <Tag color={getStatusColor(manuscript.status)} className="px-3 py-1 text-sm font-medium uppercase tracking-wide">
                        {manuscript.status || 'Unknown Status'}
                    </Tag>
                </Space>
            </div>

            <Row gutter={[24, 24]}>
                {/* LEFT COLUMN: Main Content */}
                <Col xs={24} lg={16}>
                    {/* 1. Header Card */}
                    <Card className="shadow-sm border-0 mb-6 rounded-lg overflow-hidden">
                        <div className="border-l-4 border-[#12b48b] pl-4">
                            <Text type="secondary" className="block text-xs uppercase tracking-wider mb-1">
                                {manuscript.manuscript_id} &bull; {manuscript.manuscript_type}
                            </Text>
                            <Title level={2} className="mt-0 mb-2 leading-tight text-[#204066]">{manuscript.paper_title}</Title>
                            <Text type="secondary">
                                Submitted on <span className="text-gray-800 font-medium">{new Date(manuscript.createdAt).toLocaleDateString()}</span>
                            </Text>
                        </div>
                    </Card>

                    {/* 2. Abstract & Keywords */}
                    <Card title={<span className="text-[#204066] font-semibold flex items-center gap-2"><FaInfoCircle /> Abstract & Keywords</span>} className="shadow-sm border-0 mb-6 rounded-lg">
                        <Paragraph className="text-gray-700 leading-relaxed text-justify mb-6">
                            {manuscript.abstract}
                        </Paragraph>
                        <Divider plain orientation="left" className="m-0 mb-3 text-xs text-gray-400">KEYWORDS</Divider>
                        <div className="flex flex-wrap gap-2">
                            {manuscript.keywords?.split(',').map((keyword, index) => (
                                <Tag key={index} className="px-3 py-1 bg-gray-100 border-transparent text-gray-600 rounded-full">
                                    {keyword.trim()}
                                </Tag>
                            ))}
                        </div>
                    </Card>

                    {/* 3. Authors Table */}
                    <Card title={<span className="text-[#204066] font-semibold flex items-center gap-2"><FaUser /> Authors</span>} className="shadow-sm border-0 mb-6 rounded-lg">
                        <Table
                            dataSource={manuscript.authors}
                            columns={authorColumns}
                            pagination={false}
                            rowKey="id"
                            size="middle"
                            className="border-t"
                        />
                    </Card>

                    {/* 4. Checklist */}
                    {manuscript.checklist && (
                        <Card title={<span className="text-[#204066] font-semibold flex items-center gap-2"><FaCheckCircle /> Submission Checklist</span>} className="shadow-sm border-0 mb-6 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {checklistItems.map((item) => (
                                    <div key={item.key} className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-100">
                                        {manuscript.checklist[item.key] ? (
                                            <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                                        ) : (
                                            <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                                        )}
                                        <Text className={manuscript.checklist[item.key] ? 'text-gray-700 font-medium' : 'text-gray-400'}>
                                            {item.label}
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* 5. Suggested Reviewer */}
                    <Card title={<span className="text-[#204066] font-semibold flex items-center gap-2"><FaUser /> Suggested Reviewer</span>} className="shadow-sm border-0 mb-6 rounded-lg">
                        <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} size="small">
                            <Descriptions.Item label="Name">{manuscript.reviewer_first_name} {manuscript.reviewer_last_name}</Descriptions.Item>
                            <Descriptions.Item label="Email">{manuscript.reviewer_email}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{manuscript.reviewer_phone}</Descriptions.Item>
                            <Descriptions.Item label="Institution">{manuscript.reviewer_institution}</Descriptions.Item>
                            <Descriptions.Item label="Department">{manuscript.reviewer_department}</Descriptions.Item>
                            <Descriptions.Item label="Specialisation">{manuscript.reviewer_specialisation}</Descriptions.Item>
                            <Descriptions.Item label="Location">{manuscript.reviewer_city}, {manuscript.reviewer_country}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

                {/* RIGHT COLUMN: Sidebar Metadata */}
                <Col xs={24} lg={8}>
                    {/* Metadata Card */}
                    <Card className="shadow-sm border-0 mb-6 rounded-lg bg-[#f8fafc]">
                        <Title level={5} className="mb-4 text-[#204066]">Manuscript Details</Title>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <Text type="secondary">Word Count</Text>
                                <div className="text-right">
                                    <Text strong>{manuscript.word_count}</Text>
                                    <div className="text-xs text-gray-500 italic">{manuscript.no_of_words_text}</div>
                                </div>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <Text type="secondary">Pages</Text>
                                <Text strong>{manuscript.page_count ?? 'N/A'}</Text>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <Text type="secondary">Tables / Figures</Text>
                                <Text strong>{manuscript.table_count || 0} / {manuscript.figure_count || 0}</Text>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <Text type="secondary">Journal</Text>
                                <div className="text-right">
                                    <Text strong className="block">{manuscript.journal?.title}</Text>
                                    <Text type="secondary" className="text-xs">ISSN: {manuscript.journal?.print_issn}</Text>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Submitter Info */}
                    <Card className="shadow-sm border-0 mb-6 rounded-lg">
                        <Title level={5} className="mb-4 text-[#204066]">Submitter Contact</Title>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <FaUser size={12} />
                                </div>
                                <div className="overflow-hidden">
                                    <Text className="block text-sm font-medium">{manuscript.submitter_name}</Text>
                                    <Text type="secondary" className="text-xs">Submitter</Text>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <FaCheckCircle size={12} />
                                </div>
                                <div className="overflow-hidden">
                                    <Tooltip title={manuscript.submitter_email}>
                                        <Text className="block text-sm font-medium truncate">{manuscript.submitter_email}</Text>
                                    </Tooltip>
                                    <Text type="secondary" className="text-xs">Email</Text>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Attachments */}
                    <Card className="shadow-sm border-0 mb-6 rounded-lg">
                        <Title level={5} className="mb-4 text-[#204066]">Attachments</Title>
                        <Space direction="vertical" className="w-full">
                            {manuscript.manuscript_file_path && (
                                <Button
                                    type="primary"
                                    block
                                    icon={<FaFilePdf />}
                                    href={`${scriptUrl}${manuscript.manuscript_file_path}`}
                                    target="_blank"
                                    className="bg-[#12b48b] border-[#12b48b] hover:bg-[#0e9470] h-10"
                                >
                                    View Manuscript
                                </Button>
                            )}
                            {manuscript.cover_letter_path && (
                                <Button
                                    block
                                    icon={<FaDownload />}
                                    href={`${scriptUrl}${manuscript.cover_letter_path}`}
                                    target="_blank"
                                    className="h-10"
                                >
                                    Cover Letter
                                </Button>
                            )}
                            {!manuscript.manuscript_file_path && <Text type="secondary" className="text-center block italic">No manuscript file.</Text>}
                        </Space>

                        {manuscript.signature_file_path && (
                            <div className="mt-6">
                                <Text type="secondary" className="block text-xs mb-2 uppercase tracking-wide">Digital Signature</Text>
                                <div className="p-2 border border-dashed border-gray-300 rounded bg-gray-50 flex justify-center">
                                    <img
                                        src={`${scriptUrl}${manuscript.signature_file_path}`}
                                        alt="Signature"
                                        className="h-16 object-contain opacity-80"
                                    />
                                </div>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ManuscriptDetails;
