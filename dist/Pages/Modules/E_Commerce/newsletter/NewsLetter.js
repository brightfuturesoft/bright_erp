'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext, useMemo } from 'react';
import { message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import { NewsletterFilter } from './components/Table_Filter';
import NewsletterDataTable from './components/Newsletter_Data_Type';
const NewslettersPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNewsletter, setEditingNewsletter] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState({});
    // Get Newsletters
    const { data: newslettersData, refetch } = useQuery({
        queryKey: ['newslettersData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/newsletter/get-newsletters`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch newsletters');
            const data = await res.json();
            return data.data;
        },
    });
    // Filters
    const filteredNewsletters = useMemo(() => {
        return (
            newslettersData?.filter(newsletter => {
                return (
                    (!filters.email ||
                        newsletter.email
                            .toLowerCase()
                            .includes(filters.email.toLowerCase())) &&
                    (!filters.status ||
                        newsletter.status
                            .toLowerCase()
                            .includes(filters.status.toLowerCase()))
                );
            }) ?? []
        );
    }, [newslettersData, filters]);
    // Add Newsletter
    const handleAddClick = () => {
        setEditingNewsletter(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    // Edit Newsletter
    const handleEditClick = newsletter => {
        setEditingNewsletter(newsletter);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    // Submit Add/Edit
    const handleSubmit = async values => {
        try {
            const newsletterData = {
                email: values.email ?? '',
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
            };
            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/newsletter/create-newsletter`;
            let method = 'POST';
            if (editingNewsletter) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/newsletter/update-newsletter`;
                method = 'PATCH';
                newsletterData.id = editingNewsletter._id;
            }
            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newsletterData),
            });
            const result = await res.json();
            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingNewsletter
                        ? 'Newsletter updated successfully'
                        : 'Newsletter added successfully'
                );
                setIsModalOpen(false);
                setEditingNewsletter(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to save newsletter');
        }
    };
    return _jsx(ConfigProvider, {
        children: _jsx('div', {
            className: 'min-h-screen space-y-6 mt-4 dark:bg-gray-900',
            children: _jsxs(Section, {
                title: 'Newsletters',
                children: [
                    _jsx(NewsletterFilter, {
                        filters: filters,
                        setFilters: setFilters,
                        onClear: () => setFilters({}),
                    }),
                    _jsx(NewsletterDataTable, {
                        data: filteredNewsletters,
                        onEditClick: handleEditClick,
                        refetch: refetch,
                    }),
                ],
            }),
        }),
    });
};
export default NewslettersPage;
