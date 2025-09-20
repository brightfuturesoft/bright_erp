'use client';

import React, { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import { NewsletterType } from './Newsletter_Type';
import { NewsletterFilter } from './components/Table_Filter';
import NewsletterDataTable from './components/Newsletter_Data_Type';

const NewslettersPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNewsletter, setEditingNewsletter] =
        useState<NewsletterType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState<any>({});

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
            newslettersData?.filter((newsletter: NewsletterType) => {
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
    const handleEditClick = (newsletter: NewsletterType) => {
        setEditingNewsletter(newsletter);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    // Submit Add/Edit
    const handleSubmit = async (values: any) => {
        try {
            const newsletterData: any = {
                email: values.email ?? '',
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
            };

            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/newsletter/create-newsletter`;
            let method: 'POST' | 'PATCH' = 'POST';
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
        } catch (err: any) {
            console.error(err);
            setErrorMsg('Failed to save newsletter');
        }
    };

    return (
        <ConfigProvider>
            <div className="min-h-screen space-y-6 mt-4 dark:bg-gray-900">
                <Section title="Newsletters">
                    <NewsletterFilter
                        filters={filters}
                        setFilters={setFilters}
                        onClear={() => setFilters({})}
                    />

                    <TableController
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />

                    <NewsletterDataTable
                        data={filteredNewsletters}
                        onEditClick={handleEditClick}
                        refetch={refetch}
                    />
                </Section>
                {/* 
                <NewsletterModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    handleAddSave={handleSubmit}
                    error_message={errorMsg}
                    set_error_message={setErrorMsg}
                    editingNewsletter={editingNewsletter}
                /> */}
            </div>
        </ConfigProvider>
    );
};

export default NewslettersPage;
