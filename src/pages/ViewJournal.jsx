import React, { useState, useEffect } from 'react';
import { Button, message, Modal } from 'antd';
import { FaPlus } from 'react-icons/fa';
import JournalTable from '../components/JournalTable';
import AddJournalModal from '../components/AddJournalModal';
import { journalApi } from '../services/api';

const ViewJournal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchJournals = async () => {
        setLoading(true);
        try {
            const response = await journalApi.getAll();
            setJournals(response.data);
        } catch (error) {
            message.error('Failed to fetch journals');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJournals();
    }, []);

    const handleAddJournal = async (values) => {
        try {
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (key === 'areasCovered') {
                    values[key].forEach(area => formData.append('areas_covered[]', area));
                } else if (key === 'image') {
                    if (values.image) formData.append('image', values.image);
                } else {
                    formData.append(key, values[key]);
                }
            });

            // Note: The backend expects specific field names like 'print_issn' instead of 'printIssn'.
            // We need to map them or ensure the form uses snake_case.
            // For now, let's map them manually or update the form to use snake_case.
            // Let's update the form submission logic in AddJournalModal to handle this mapping or FormData construction.
            // Actually, let's handle the mapping here for simplicity if possible, but FormData is cleaner if we just pass the values.
            // Wait, the user JSON uses snake_case keys (print_issn). My form uses camelCase (printIssn).
            // I should map them.

            // Let's assume AddJournalModal passes the values as is (camelCase).
            // I will construct FormData with snake_case keys.
            const apiData = new FormData();
            apiData.append('title', values.title);
            apiData.append('print_issn', values.printIssn);
            apiData.append('e_issn', values.eIssn);
            apiData.append('editors', values.editors);
            apiData.append('frequency', values.frequency);
            apiData.append('indexation', values.indexation);
            apiData.append('start_year', values.startYear);
            apiData.append('end_year', values.endYear);
            apiData.append('mission', values.mission);
            apiData.append('aims_scope', values.aimsScope);
            if (values.image) apiData.append('image', values.image);

            if (values.areasCovered) {
                values.areasCovered.forEach(area => apiData.append('areas_covered[]', area));
            }

            await journalApi.create(apiData);
            message.success('Journal added successfully');
            fetchJournals();
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to add journal');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Manage Journals</h1>
                <Button
                    type="primary"
                    icon={<FaPlus />}
                    onClick={() => setIsModalVisible(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Add New Journal
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden p-4">
                <JournalTable journals={journals} />
            </div>

            <AddJournalModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSubmit={handleAddJournal}
            />
        </div>
    );
};

export default ViewJournal;
