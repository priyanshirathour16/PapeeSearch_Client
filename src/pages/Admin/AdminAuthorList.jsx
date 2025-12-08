import React, { useState, useEffect } from 'react';
import { authorApi } from '../../services/api';
import { FaEye } from 'react-icons/fa';
import { Table, Modal, Button, Tag, Space } from 'antd';

const AdminAuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await authorApi.getAll();
            setAuthors(response.data);
        } catch (error) {
            console.error("Error fetching authors:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleView = (author) => {
        setSelectedAuthor(author);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAuthor(null);
    };

    const columns = [
        {
            title: 'S.No',
            key: 'serial',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Name',
            key: 'name',
            render: (_text, record) => <span className="font-medium">{record.firstName} {record.lastName}</span>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contact',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
        },
        // {
        //     title: 'Role',
        //     dataIndex: 'role',
        //     key: 'role',
        //     render: (role) => (
        //         <Tag color="green" className="uppercase">
        //             {role}
        //         </Tag>
        //     ),
        // },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_text, record) => (
                <Button
                    type="text"
                    icon={<FaEye className="text-[#12b48b]" />}
                    onClick={() => handleView(record)}
                    shape="circle"
                    className="hover:bg-green-50"
                />
            ),
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Authors</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden p-4">
                <Table
                    columns={columns}
                    dataSource={authors}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </div>

            <Modal
                title={<span className="text-xl font-bold text-gray-800">Author Details</span>}
                open={isModalOpen}
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>
                        Close
                    </Button>
                ]}
                width={700}
            >
                {selectedAuthor && (
                    <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <DetailRow label="First Name" value={selectedAuthor.firstName} />
                        <DetailRow label="Last Name" value={selectedAuthor.lastName} />
                        <DetailRow label="Email" value={selectedAuthor.email} />
                        <DetailRow label="Role" value={selectedAuthor.role} />
                        <DetailRow label="Contact Number" value={`${selectedAuthor.isd || ''} ${selectedAuthor.contactNumber}`} />
                        <DetailRow label="Alt. Contact" value={selectedAuthor.altContactNumber || 'N/A'} />
                        <DetailRow label="Qualification" value={selectedAuthor.qualification} />
                        <DetailRow label="Specialization" value={selectedAuthor.specialization} />
                        <DetailRow label="Institute" value={selectedAuthor.institute} />

                        <div className="md:col-span-2 mt-2">
                            <h3 className="font-bold text-gray-700 border-b pb-2 mb-2">Address Details</h3>
                        </div>
                        <DetailRow label="Address" value={selectedAuthor.address} fullWidth />
                        <DetailRow label="City" value={selectedAuthor.city} />
                        <DetailRow label="State" value={selectedAuthor.state} />
                        <DetailRow label="Country" value={selectedAuthor.country} />
                        <DetailRow label="Pincode" value={selectedAuthor.pincode} />

                        <div className="md:col-span-2 mt-2">
                            <h3 className="font-bold text-gray-700 border-b pb-2 mb-2">Organization Details</h3>
                        </div>
                        <DetailRow label="Job Title" value={selectedAuthor.jobTitle || 'N/A'} />
                        <DetailRow label="Organization" value={selectedAuthor.organization} />
                        <DetailRow label="Org Type" value={selectedAuthor.orgType} />
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

export default AdminAuthorList;
