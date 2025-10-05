'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import { FaqFilter } from './components/Table_Filter';
import FaqDataTable from './components/Question_Data_Table';
import FaqModal from './components/Question_Add_Modal';
const FaqsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState({});
    // Get FAQs
    const { data: faqsData, refetch } = useQuery({
        queryKey: ['faqsData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/questions/get-question`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch FAQs');
            const data = await res.json();
            return data.data;
        },
    });
    // Filters
    const filteredFaqs = useMemo(() => {
        return (
            faqsData?.filter(faq => {
                return (
                    (!filters.question ||
                        faq.question
                            .toLowerCase()
                            .includes(filters.question.toLowerCase())) &&
                    (!filters.answer ||
                        faq.answer
                            .toLowerCase()
                            .includes(filters.answer.toLowerCase())) &&
                    (!filters.createdBy ||
                        (faq.createdBy || 'Unknown')
                            .toLowerCase()
                            .includes(filters.createdBy.toLowerCase()))
                );
            }) ?? []
        );
    }, [faqsData, filters]);
    // Add FAQ
    const handleAddClick = () => {
        setEditingFaq(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    // Edit FAQ
    const handleEditClick = faq => {
        setEditingFaq(faq);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    // Submit Add/Edit
    const handleSubmit = async values => {
        try {
            const faqData = {
                question: values.question ?? '',
                answer: values.answer ?? '',
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
                createdBy: user?.name,
            };
            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/questions/create-question`;
            let method = 'POST';
            if (editingFaq) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/questions/update-question`;
                method = 'PATCH';
                faqData.id = editingFaq._id;
            }
            // delete-question
            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(faqData),
            });
            const result = await res.json();
            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingFaq
                        ? 'FAQ updated successfully'
                        : 'FAQ added successfully'
                );
                setIsModalOpen(false);
                setEditingFaq(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to save FAQ');
        }
    };
    return _jsx(ConfigProvider, {
        children: _jsxs('div', {
            className: 'min-h-screen space-y-6 mt-4 dark:bg-gray-900',
            children: [
                _jsxs(Section, {
                    title: 'FAQs',
                    sideComponent: _jsx('div', {
                        className: 'flex gap-2',
                        children: _jsx(Button, {
                            type: 'primary',
                            onClick: handleAddClick,
                            children: 'Add FAQ',
                        }),
                    }),
                    children: [
                        _jsx(FaqFilter, {
                            filters: filters,
                            setFilters: setFilters,
                            onClear: () => setFilters({}),
                        }),
                        _jsx(FaqDataTable, {
                            data: filteredFaqs,
                            onEditClick: handleEditClick,
                            refetch: refetch,
                        }),
                    ],
                }),
                _jsx(FaqModal, {
                    isOpen: isModalOpen,
                    setIsOpen: setIsModalOpen,
                    handleAddSave: handleSubmit,
                    error_message: errorMsg,
                    set_error_message: setErrorMsg,
                    editingFaq: editingFaq,
                }),
            ],
        }),
    });
};
export default FaqsPage;
