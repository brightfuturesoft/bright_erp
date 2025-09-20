'use client';

import React, { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import BannerModal from './components/BannerAddModal';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import uploadImage from '@/helpers/hooks/uploadImage';
import { BannerType } from './BannerTypes';
import DataTable from './components/DataTable';

const BannersPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<BannerType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { data: bannersData, refetch } = useQuery({
        queryKey: ['bannersData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/banners/get-banners`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch banners');
            const data = await res.json();
            return data.data;
        },
    });

    const filteredBanners = useMemo(() => {
        return (
            bannersData?.filter(
                (banner: BannerType) =>
                    banner.title
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    banner.status
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    banner.redirect_url
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase())
            ) ?? []
        );
    }, [bannersData, searchValue]);

    const handleAddClick = () => {
        setEditingBanner(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleEditClick = (banner: BannerType) => {
        setEditingBanner(banner);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleSubmit = async (values: any) => {
        try {
            let imageUrl = editingBanner?.image_url ?? '';
            const imageList = (values.image ?? []) as any[];
            const fileObj = imageList[0]?.originFileObj as File | undefined;
            if (fileObj) imageUrl = await uploadImage(fileObj);

            const bannerData: any = {
                title: values.title ?? '',
                status: values.status ?? 'Active',
                redirect_url: values.redirect_url ?? '',
                image_url: imageUrl,
                workspace_id: user.workspace_id,
            };

            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/banners/create-banner`;
            let method: 'POST' | 'PATCH' = 'POST';
            if (editingBanner) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/banners/update-banner`;
                method = 'PATCH';
                bannerData.id = editingBanner._id;
            }

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bannerData),
            });
            const result = await res.json();

            if (result.error) setErrorMsg(result.message);
            else {
                message.success(
                    editingBanner ? 'Banner updated' : 'Banner added'
                );
                setIsModalOpen(false);
                setEditingBanner(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err: any) {
            console.error(err);
            setErrorMsg('Failed to save banner');
        }
    };

    return (
        <ConfigProvider>
            <div className="min-h-screen space-y-6 mt-4 dark:bg-gray-900">
                <Section
                    title="Banners"
                    sideComponent={
                        <div className="flex gap-2">
                            <Button
                                type="primary"
                                onClick={handleAddClick}
                            >
                                Add New Banner
                            </Button>
                        </div>
                    }
                >
                    <TableController
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
                    <DataTable
                        data={filteredBanners}
                        onEditClick={handleEditClick}
                        refetch={refetch}
                    />
                </Section>

                <BannerModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    handleAddSave={handleSubmit}
                    error_message={errorMsg}
                    set_error_message={setErrorMsg}
                    editingBanner={editingBanner}
                />
            </div>
        </ConfigProvider>
    );
};

export default BannersPage;
