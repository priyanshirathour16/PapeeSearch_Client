import React, { useState } from 'react';
import { Modal, Upload, Button, message, Tag } from 'antd';
import { UploadOutlined, FileTextOutlined, InboxOutlined } from '@ant-design/icons';
import { abstractSubmissionApi } from '../services/api';
import moment from 'moment';

const { Dragger } = Upload;

const ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/jpg',
];

const ALLOWED_EXTENSIONS = '.pdf,.doc,.docx,.jpg,.jpeg,.png';

const FullPaperUploadModal = ({ open, onCancel, abstractRecord, onSuccess }) => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (fileList.length === 0) {
            message.warning('Please select at least one file to upload.');
            return;
        }

        setUploading(true);
        try {
            // Create FormData and append files with field name "files"
            const formData = new FormData();
            fileList.forEach((file) => {
                formData.append('files', file);
            });

            const response = await abstractSubmissionApi.submitFullPaper(abstractRecord.id, formData);
            if (response.data && response.data.success) {
                message.success(response.data.message || 'Full paper submitted successfully!');
            }
            setFileList([]);
            if (onSuccess) onSuccess();
            onCancel();
        } catch (error) {
            console.error('Error submitting full paper:', error);
            message.error(error?.response?.data?.message || 'Failed to submit full paper');
        } finally {
            setUploading(false);
        }
    };

    const uploadProps = {
        multiple: true,
        accept: ALLOWED_EXTENSIONS,
        fileList,
        beforeUpload: (file) => {
            const isAllowed = ALLOWED_TYPES.includes(file.type);
            if (!isAllowed) {
                message.error(`${file.name} is not a supported file type. Allowed: PDF, Word, JPG, PNG.`);
                return Upload.LIST_IGNORE;
            }
            const isLt20M = file.size / 1024 / 1024 < 20;
            if (!isLt20M) {
                message.error(`${file.name} exceeds 20MB size limit.`);
                return Upload.LIST_IGNORE;
            }
            setFileList((prev) => [...prev, file]);
            return false;
        },
        onRemove: (file) => {
            setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
        },
    };

    const handleClose = () => {
        setFileList([]);
        onCancel();
    };

    return (
        <Modal
            title={
                <div className="flex items-center gap-2">
                    <FileTextOutlined className="text-[#12b48b]" />
                    <span>Submit Full Paper</span>
                </div>
            }
            open={open}
            onCancel={handleClose}
            footer={null}
            destroyOnClose
            centered
            width={600}
        >
            <div className="py-2">
                {abstractRecord && (
                    <>
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <span className="text-xs text-gray-500 block mb-1">Abstract Title</span>
                            <span className="font-medium text-gray-800">{abstractRecord.title}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <span className="text-xs text-gray-500 block mb-1">Conference</span>
                                <span className="text-sm font-medium text-[#12b48b]">{abstractRecord.conference?.name || 'N/A'}</span>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <span className="text-xs text-gray-500 block mb-1">Abstract Status</span>
                                <Tag color="green">ACCEPTED</Tag>
                            </div>
                        </div>
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <span className="text-xs text-gray-500 block mb-1">Abstract Submission Date</span>
                            <span className="text-sm text-gray-700">{moment(abstractRecord.createdAt).format('DD MMM YYYY, hh:mm A')}</span>
                        </div>

                        {/* Show previously uploaded files */}
                        {abstractRecord.full_paper_files && abstractRecord.full_paper_files.length > 0 && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <span className="text-xs text-blue-600 font-medium block mb-2">Previously Uploaded Files</span>
                                {abstractRecord.full_paper_files.map((f) => (
                                    <div key={f.id} className="text-sm text-gray-700 flex items-center gap-2 mb-1">
                                        <FileTextOutlined className="text-blue-500" />
                                        <span>{f.file_name}</span>
                                        <span className="text-xs text-gray-400">({moment(f.uploaded_at).format('DD MMM YYYY')})</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Full Paper <span className="text-red-500">*</span>
                    </label>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined style={{ color: '#12b48b' }} />
                        </p>
                        <p className="ant-upload-text">Click or drag files to upload</p>
                        <p className="ant-upload-hint text-xs">
                            Supported: PDF, Word (.doc, .docx), Images (JPG, PNG). Max 20MB per file.
                        </p>
                    </Dragger>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        type="primary"
                        icon={<UploadOutlined />}
                        onClick={handleUpload}
                        loading={uploading}
                        disabled={fileList.length === 0}
                        className="bg-[#12b48b] hover:bg-[#0e9a77] border-none"
                    >
                        Submit Full Paper
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default FullPaperUploadModal;
