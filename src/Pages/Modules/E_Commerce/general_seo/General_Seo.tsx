'use client';

import React, { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import { SEOType } from './General_Seo_type';
import { SEOFilter } from './components/Table_Filter';
import SEODataTable from './components/General_Seo_Data_Table';
import SEOModal from './components/General_Seo_Add_Modal';
import uploadImage from '@/helpers/hooks/uploadImage';

const SEOPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSEO, setEditingSEO] = useState<SEOType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState<any>({});

    // Fetch SEO entries
    const { data: seoData, refetch } = useQuery({
        queryKey: ['seoData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/general-seo/get-seo`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch SEO entries');
            const data = await res.json();
            return data.data;
        },
    });

    // Filter SEO entries
    const filteredSEO = useMemo(() => {
        return (
            seoData?.filter((entry: SEOType) => {
                const matchesTitle = filters.pageTitle
                    ? entry.pageTitle
                          .toLowerCase()
                          .includes(filters.pageTitle.toLowerCase())
                    : true;
                const matchesStatus = filters.status
                    ? entry.status.toLowerCase() ===
                      filters.status.toLowerCase()
                    : true;
                const matchesSearch = searchValue
                    ? entry.pageTitle
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                    : true;
                return matchesTitle && matchesStatus && matchesSearch;
            }) ?? []
        );
    }, [seoData, filters, searchValue]);

    const handleAddClick = () => {
        setEditingSEO(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleEditClick = (entry: SEOType) => {
        setEditingSEO(entry);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    // Handle modal save
    const handleSubmit = async (values: any) => {
        try {
            let imageUrl = editingSEO?.ogImage ?? '';
            const imageList = (values.ogImage ?? []) as any[];
            const fileObj = imageList[0]?.originFileObj as File | undefined;
            if (fileObj) imageUrl = await uploadImage(fileObj);

            const seoEntry: any = {
                pageTitle: values.pageTitle,
                metaDescription: values.metaDescription,
                metaKeywords: values.metaKeywords,
                slug: values.slug,
                status: values.status ?? 'Active',
                ogTitle: values.ogTitle,
                ogDescription: values.ogDescription,
                ogImage: imageUrl,
                canonicalUrl: values.canonicalUrl,
                metaRobots: values.metaRobots ?? 'index, follow',
                workspace_id: user.workspace_id,
                createdBy: user?.name,
            };

            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/general-seo/create-seo`;
            let method: 'POST' | 'PATCH' = 'POST';

            if (editingSEO) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/general-seo/update-seo`;
                method = 'PATCH';
                seoEntry.id = editingSEO._id;
            }

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(seoEntry),
            });

            const result = await res.json();

            if (res.ok && !result.error) {
                message.success(
                    editingSEO
                        ? 'SEO entry updated successfully'
                        : 'SEO entry added successfully'
                );
                setIsModalOpen(false);
                setEditingSEO(null);
                setErrorMsg('');
                refetch();
            } else {
                setErrorMsg(result.message || 'Failed to save SEO entry');
            }
        } catch (err: any) {
            console.error(err);
            setErrorMsg('Failed to save SEO entry');
        }
    };

    return (
        <ConfigProvider>
            <div className="min-h-screen space-y-6 mt-4 dark:bg-gray-900">
                <Section
                    title="General SEO Entries"
                    sideComponent={
                        <Button
                            type="primary"
                            onClick={handleAddClick}
                        >
                            Add SEO Entry
                        </Button>
                    }
                >
                    <SEOFilter
                        filters={filters}
                        setFilters={setFilters}
                        onClear={() => setFilters({})}
                    />
                    <TableController
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
                    <SEODataTable
                        data={filteredSEO}
                        onEditClick={handleEditClick}
                        refetch={refetch}
                    />
                </Section>

                <SEOModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    handleSave={handleSubmit}
                    errorMessage={errorMsg}
                    setErrorMessage={setErrorMsg}
                    editingSEO={editingSEO}
                />
            </div>
        </ConfigProvider>
    );
};

export default SEOPage;
