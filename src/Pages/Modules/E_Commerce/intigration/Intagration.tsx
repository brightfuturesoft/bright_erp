'use client';

import React, { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import { SocialLinkType } from './Intagration_Type';
import { SocialLinkFilter } from './components/Table_Filter';
import SocialLinkDataTable from './components/Intagration_Data_Table';
import SocialLinkModal from './components/Intagration_Add_Modal';

const SocialLinksPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<SocialLinkType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState<any>({});

    const { data: socialLinksData, refetch } = useQuery({
        queryKey: ['socialLinksData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/intigration/get-links`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch social links');
            const data = await res.json();
            return data.data;
        },
    });

    const filteredLinks = useMemo(() => {
        return (
            socialLinksData?.filter((link: SocialLinkType) => {
                // Search: check if searchValue matches any social link URL
                const matchesSearch = searchValue
                    ? Object.values({
                          facebook_url: link.facebook_url,
                          instagram_url: link.instagram_url,
                          youtube_url: link.youtube_url,
                          whatsapp_url: link.whatsapp_url,
                          twitter_url: link.twitter_url,
                          linkedin_url: link.linkedin_url,
                      })
                          .filter(Boolean) // remove undefined/null
                          .some(val =>
                              val!
                                  .toLowerCase()
                                  .includes(searchValue.toLowerCase())
                          )
                    : true;

                // Filters
                const matchesFilters =
                    (!filters.status ||
                        link.status.toLowerCase() ===
                            filters.status.toLowerCase()) &&
                    (!filters.createdBy ||
                        (link.created_By || 'Unknown')
                            .toLowerCase()
                            .includes(filters.createdBy.toLowerCase()));

                return matchesSearch && matchesFilters;
            }) ?? []
        );
    }, [socialLinksData, filters, searchValue]);

    const handleAddClick = () => {
        setEditingLink(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleEditClick = (link: SocialLinkType) => {
        setEditingLink(link);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleSubmit = async (values: any) => {
        try {
            const linkData = {
                ...values, // Facebook, Instagram, WhatsApp etc.
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
                created_By: user?.name,
            };

            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/intigration/create-link`;
            let method: 'POST' | 'PATCH' = 'POST';

            if (editingLink) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/intigration/update-link`;
                method = 'PATCH';
                linkData.id = editingLink._id;
            }

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(linkData),
            });

            const result = await res.json();

            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingLink
                        ? 'Social links updated successfully'
                        : 'Social links added successfully'
                );
                setIsModalOpen(false);
                setEditingLink(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err: any) {
            console.error(err);
            setErrorMsg('Failed to save social links');
        }
    };

    return (
        <ConfigProvider>
            <div className="min-h-screen space-y-6 mt-4 dark:bg-gray-900">
                <Section
                    title="Social Links"
                    sideComponent={
                        <div className="flex gap-2">
                            <Button
                                type="primary"
                                onClick={handleAddClick}
                            >
                                Add Social Link
                            </Button>
                        </div>
                    }
                >
                    <SocialLinkFilter
                        filters={filters}
                        setFilters={setFilters}
                        onClear={() => setFilters({})}
                    />

                    <TableController
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />

                    <SocialLinkDataTable
                        data={filteredLinks}
                        onEditClick={handleEditClick}
                        refetch={refetch}
                    />
                </Section>

                <SocialLinkModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    handleAddSave={handleSubmit}
                    error_message={errorMsg}
                    set_error_message={setErrorMsg}
                    editingLink={editingLink}
                />
            </div>
        </ConfigProvider>
    );
};

export default SocialLinksPage;
