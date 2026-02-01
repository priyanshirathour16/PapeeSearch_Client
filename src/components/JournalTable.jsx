import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Tooltip,
  Modal,
  message,
} from "antd";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { journalApi } from "../services/api";

const JournalTable = ({ journals, onDelete }) => {
  const navigate = useNavigate();
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteConfirm = (journalId) => {
    setDeleteConfirmId(journalId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmId(null);
  };

  const handleDeleteJournal = async () => {
    if (!deleteConfirmId) return;

    setLoadingDeleteId(deleteConfirmId);
    try {
      const response = await journalApi.delete(deleteConfirmId);
      if (response.data?.success) {
        message.success(
          response.data?.message || "Journal deleted successfully",
        );
        if (onDelete) {
          onDelete(deleteConfirmId);
        }
        closeDeleteConfirm();
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to delete journal",
      );
    } finally {
      setLoadingDeleteId(null);
    }
  };

  const handleViewEditorApplications = (journalEncryptedId) => {
    navigate(`/dashboard/journal-editor-applications/${journalEncryptedId}`);
  };

  const columns = [
    {
      title: "Sno.",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Journal Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Start Year",
      dataIndex: "start_year",
      key: "start_year",
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
    },
    {
      title: "Print ISSN",
      dataIndex: "print_issn",
      key: "print_issn",
    },
    {
      title: "E ISSN",
      dataIndex: "e_issn",
      key: "e_issn",
    },
    {
      title: "Editor Applications",
      key: "editorApplications",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {record.editorApplications?.length || 0}
          </span>
          {record.editorApplications?.length > 0 && (
            <Tooltip title="View Editor Applications">
              <Button
                type="text"
                icon={<FaEye className="text-blue-500" />}
                shape="circle"
                className="hover:bg-blue-50"
                onClick={() => handleViewEditorApplications(record.encryptedId)}
              />
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Link to={`/dashboard/view-journal/${record.encryptedId}`}>
              <Button
                type="text"
                icon={
                  <FaEye className="text-blue-500" style={{ color: "blue" }} />
                }
                shape="circle"
                className="hover:bg-blue-50"
              />
            </Link>
          </Tooltip>
          <Tooltip title="Delete Journal">
            <Button
              type="text"
              icon={
                <FaTrash className="text-red-500" style={{ color: "red" }} />
              }
              shape="circle"
              className="hover:bg-red-50"
              onClick={() => openDeleteConfirm(record.id)}
            />
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
        title="Delete Journal"
        open={isDeleteModalOpen}
        onCancel={closeDeleteConfirm}
        centered
        footer={[
          <Button key="cancel" onClick={closeDeleteConfirm}>
            No
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            loading={loadingDeleteId === deleteConfirmId}
            onClick={handleDeleteJournal}
          >
            Yes, Delete
          </Button>,
        ]}
      >
        <p className="text-gray-700">
          Are you sure you want to delete this journal? This action cannot be
          undone.
        </p>
      </Modal>
    </>
  );
};

export default JournalTable;
