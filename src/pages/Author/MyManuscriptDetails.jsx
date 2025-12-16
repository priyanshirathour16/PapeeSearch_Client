import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Tag, Spin, Button, message, Divider, Table, Typography, Row, Col, Statistic, Breadcrumb, Modal, Descriptions } from 'antd';
import {
    FaArrowLeft,
    FaFilePdf,
    FaImage,
    FaUserTie,
    FaAlignLeft,
    FaInfoCircle,
    FaUsers,
    FaClipboardList,
    FaEye
} from 'react-icons/fa';
import { manuscriptApi } from '../../services/api';
import { ImageURl, scriptUrl } from '../../services/serviceApi';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;

const MyManuscriptDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [manuscript, setManuscript] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authorModalVisible, setAuthorModalVisible] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    useEffect(() => {
        fetchDetails();
    }, [id]);

    const fetchDetails = async () => {
        try {
            const response = await manuscriptApi.getById(id);
            setManuscript(response.data.data ? response.data.data : response.data);
        } catch (error) {
            console.error('Error fetching manuscript details:', error);
            message.error('Failed to load manuscript details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    if (!manuscript) return <div className="p-6 text-center text-gray-500">Manuscript not found</div>;

    const authorColumns = [
        {
            title: 'Name',
            key: 'name',
            render: (_, r) => (
                <div>
                    <span className="font-medium text-gray-800">{r.first_name} {r.last_name}</span>
                    {r.is_corresponding_author && <Tag color="gold" className="ml-2 text-[10px]">Corresponding</Tag>}
                </div>
            )
        },
        { title: 'Email', dataIndex: 'email', key: 'email', render: text => <Text copyable>{text}</Text> },
        { title: 'Institution', dataIndex: 'institution', key: 'institution' },
        { title: 'Country', dataIndex: 'country', key: 'country' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button
                    type="primary"
                    shape="circle"
                    icon={<FaEye />}
                    onClick={() => {
                        setSelectedAuthor(record);
                        setAuthorModalVisible(true);
                    }}
                    className="bg-[#12b48b] hover:bg-[#0e9f7a] border-none"
                    size="small"
                />
            ),
        },
    ];

    const getStatusColor = (status) => {
        if (status === 'Submitted') return 'blue';
        if (status === 'Under Review') return 'orange';
        if (status === 'Accepted') return 'green';
        if (status === 'Rejected') return 'red';
        return 'default';
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Button
                        shape="circle"
                        icon={<FaArrowLeft />}
                        onClick={() => navigate(-1)}
                        className="border-none shadow-sm text-gray-600 hover:text-[#12b48b] bg-white"
                    />
                    <div>
                        <Title level={4} className="m-0 text-gray-800">Manuscript Details</Title>
                        <Breadcrumb items={[
                            { title: 'Dashboard' },
                            { title: 'My Manuscripts', onClick: () => navigate('/dashboard/submit-manuscript'), className: 'cursor-pointer' },
                            { title: manuscript.manuscript_id }
                        ]} />
                    </div>
                </div>

                <div className="text-right">
                    <Tag color={getStatusColor(manuscript.status)} className="text-sm px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                        {manuscript.status}
                    </Tag>
                </div>
            </div>

            <Row gutter={[24, 24]}>
                {/* Left Column: Main Content */}
                <Col xs={24} lg={16}>
                    {/* Abstract Card */}
                    <Card
                        className="shadow-sm border-none rounded-xl mb-6 overflow-hidden"
                        title={<div className="flex items-center gap-2 text-[#12b48b]"><FaAlignLeft /> Abstract</div>}
                    >
                        <Title level={3} className="text-gray-800 mb-2">{manuscript.paper_title}</Title>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {manuscript.keywords?.split(',').map((word, i) => (
                                <Tag key={i} className="bg-gray-100 text-gray-600 border-gray-200 rounded">{word.trim()}</Tag>
                            ))}
                        </div>
                        <Paragraph className="text-gray-600 text-justify leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                            {manuscript.abstract}
                        </Paragraph>
                    </Card>

                    {/* Authors Card */}
                    <Card
                        className="shadow-sm border-none rounded-xl mb-6"
                        title={<div className="flex items-center gap-2 text-[#12b48b]"><FaUsers /> Authors</div>}
                    >
                        <Table
                            dataSource={manuscript.authors || []}
                            columns={authorColumns}
                            rowKey="id"
                            pagination={false}
                            size="small"
                            className="no-border-table"
                        />
                    </Card>

                    {/* Reviewer Info Card (if relevant) */}
                    <Card
                        className="shadow-sm border-none rounded-xl"
                        title={<div className="flex items-center gap-2 text-[#12b48b]"><FaUserTie /> Nominated Reviewer</div>}
                    >
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Text type="secondary" className="text-xs uppercase tracking-wide">Name</Text>
                                <div className="font-medium text-base">{manuscript.reviewer_first_name} {manuscript.reviewer_first_name}</div>
                            </Col>
                            <Col span={12}>
                                <Text type="secondary" className="text-xs uppercase tracking-wide">Institution</Text>
                                <div className="font-medium text-base">{manuscript.reviewer_institution}</div>
                            </Col>
                            <Col span={12}>
                                <Text type="secondary" className="text-xs uppercase tracking-wide">Email</Text>
                                <div className="font-medium text-base">{manuscript.reviewer_email}</div>
                            </Col>
                            <Col span={12}>
                                <Text type="secondary" className="text-xs uppercase tracking-wide">Phone</Text>
                                <div className="font-medium text-base">{manuscript.reviewer_phone}</div>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                {/* Right Column: Sidebar Info */}
                <Col xs={24} lg={8}>
                    {/* Info Card */}
                    <Card className="shadow-sm border-none rounded-xl mb-6 bg-[#12b48b] text-white stats-card">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center border-b border-white/20 pb-3">
                                <span className="text-white/80">Submission Date</span>
                                <span className="font-bold">{moment(manuscript.createdAt).format('DD MMM, YYYY')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/20 pb-3">
                                <span className="text-white/80">Journal</span>
                                <span className="font-bold text-right truncate max-w-[150px]" title={manuscript.journal?.title}>{manuscript.journal?.title}</span>
                            </div>
                        </div>
                    </Card>

                    <Card
                        className="shadow-sm border-none rounded-xl mb-6"
                        title={<div className="flex items-center gap-2 text-gray-700"><FaInfoCircle /> Manuscript Stats</div>}
                    >
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Statistic title="Words" value={manuscript.word_count} valueStyle={{ fontSize: '1.2rem', fontWeight: 600 }} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Pages" value={manuscript.page_count} valueStyle={{ fontSize: '1.2rem', fontWeight: 600 }} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Tables" value={manuscript.table_count} valueStyle={{ fontSize: '1.2rem', fontWeight: 600 }} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Figures" value={manuscript.figure_count} valueStyle={{ fontSize: '1.2rem', fontWeight: 600 }} />
                            </Col>
                        </Row>
                    </Card>

                    {/* Files Card */}
                    <Card
                        className="shadow-sm border-none rounded-xl"
                        title={<div className="flex items-center gap-2 text-gray-700"><FaClipboardList /> Documents</div>}
                    >
                        <div className="flex flex-col gap-3">
                            {manuscript.manuscript_file_path ? (
                                <a
                                    href={`${scriptUrl}${manuscript.manuscript_file_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 border rounded-lg hover:border-[#12b48b] hover:bg-green-50 transition-all group"
                                >
                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-500 group-hover:bg-red-200 transition-colors">
                                        <FaFilePdf size={18} />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">Manuscript File</div>
                                        <div className="text-xs text-gray-500">Click to view/download</div>
                                    </div>
                                </a>
                            ) : <Text type="secondary" italic>No manuscript file</Text>}

                            {manuscript.signature_file_path ? (
                                <a
                                    href={`${scriptUrl}${manuscript.signature_file_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 border rounded-lg hover:border-[#12b48b] hover:bg-green-50 transition-all group"
                                >
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 group-hover:bg-purple-200 transition-colors">
                                        <FaImage size={18} />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">Signature File</div>
                                        <div className="text-xs text-gray-500">Click to view/download</div>
                                    </div>
                                </a>
                            ) : <Text type="secondary" italic>No signature file</Text>}
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Author Details Modal */}
            <Modal
                title={<div className="flex items-center gap-2 text-[#12b48b]"><FaUsers /> Author Details</div>}
                open={authorModalVisible}
                onCancel={() => {
                    setAuthorModalVisible(false);
                    setSelectedAuthor(null);
                }}
                footer={[
                    <Button key="close" onClick={() => setAuthorModalVisible(false)}>
                        Close
                    </Button>
                ]}
                width={700}
            >
                {selectedAuthor && (
                    <div className="pt-4">
                        <Descriptions bordered column={2} size="small">
                            <Descriptions.Item label="First Name" span={1}>
                                {selectedAuthor.first_name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Last Name" span={1}>
                                {selectedAuthor.last_name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Email" span={2}>
                                <Text copyable>{selectedAuthor.email}</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone" span={2}>
                                {selectedAuthor.phone || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Institution" span={2}>
                                {selectedAuthor.institution}
                            </Descriptions.Item>
                            <Descriptions.Item label="Department" span={2}>
                                {selectedAuthor.department || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Country" span={1}>
                                {selectedAuthor.country}
                            </Descriptions.Item>
                            <Descriptions.Item label="State/Province" span={1}>
                                {selectedAuthor.state || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="City" span={1}>
                                {selectedAuthor.city || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Postal Code" span={1}>
                                {selectedAuthor.postal_code || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Address" span={2}>
                                {selectedAuthor.address || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="ORCID" span={2}>
                                {selectedAuthor.orcid || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Corresponding Author" span={2}>
                                <Tag color={selectedAuthor.is_corresponding_author ? 'green' : 'default'}>
                                    {selectedAuthor.is_corresponding_author ? 'Yes' : 'No'}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MyManuscriptDetails;
