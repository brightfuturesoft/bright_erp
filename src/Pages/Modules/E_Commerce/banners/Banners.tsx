'use client';

import React, { useState, useContext, useMemo } from 'react';
import { Button, message, Image, ConfigProvider, Dropdown, Space } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import BannerModal from './components/BannerAddModal';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import uploadImage from '@/helpers/hooks/uploadImage';
import { EllipsisVertical } from 'lucide-react';

export interface BannerType {
    _id: string;
    image_url: string;
    title?: string;
    status: 'active' | 'inactive';
    redirect_url?: string;
    workspace_id: string;
}

const BannersPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<BannerType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Fetch banners
    const {
        data: bannersData,
        isLoading,
        refetch,
    } = useQuery({
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

    // Filter banners
    const filteredBanners = useMemo(() => {
        return (
            bannersData?.filter((banner: BannerType) => {
                return (
                    banner.title
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    banner.status
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    banner.redirect_url
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase())
                );
            }) ?? []
        );
    }, [bannersData, searchValue]);

    // Modal handlers
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
    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingBanner(null);
        setErrorMsg('');
    };

    // Submit banner
    const handleSubmit = async (values: any) => {
        try {
            let imageUrl = editingBanner?.image_url ?? '';
            const imageList = (values.image ?? []) as any[];
            const fileObj = imageList[0]?.originFileObj as File | undefined;
            if (fileObj) {
                imageUrl = await uploadImage(fileObj);
            }

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

            if (result.error) {
                setErrorMsg(result.message);
            } else {
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

    // Delete banner
    const handleDelete = async (banner: BannerType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/banners/delete-banner`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: banner._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Banner deleted');
            refetch();
        }
    };

    // Make Active/Inactive
    const handleMakeActive = async (banner: BannerType) => {
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/banners/update-banner`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: banner._id, status: 'Active' }),
            }
        );
        message.success('Banner activated');
        refetch();
    };

    const handleMakeInactive = async (banner: BannerType) => {
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/banners/update-banner`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: banner._id, status: 'Inactive' }),
            }
        );
        message.success('Banner deactivated');
        refetch();
    };

    // Export banners
    const handleExport = () => {
        const jsonStr = JSON.stringify(bannersData ?? [], null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'banners_export.json';
        a.click();
        URL.revokeObjectURL(url);
        message.success('Exported banners as JSON');
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
                            <Button onClick={handleExport}>Export JSON</Button>
                        </div>
                    }
                >
                    <TableController
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
                    <table className="w-full text-left border dark:border-gray-700">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Redirect URL</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBanners.map((banner: BannerType) => (
                                <tr
                                    key={banner._id}
                                    className="border-t dark:border-gray-700"
                                >
                                    <td>
                                        {banner.image_url && (
                                            <Image
                                                src={banner.image_url}
                                                alt="banner"
                                                width={120}
                                                height={80}
                                            />
                                        )}
                                    </td>
                                    <td>{banner.title || '-'}</td>
                                    <td>{banner.status}</td>
                                    <td>
                                        {banner.redirect_url ? (
                                            <a
                                                href={banner.redirect_url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {banner.redirect_url}
                                            </a>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td>
                                        <Space size="middle">
                                            <Dropdown
                                                menu={{
                                                    items: [
                                                        {
                                                            key: '1',
                                                            label: (
                                                                <div
                                                                    onClick={() =>
                                                                        handleEditClick(
                                                                            banner
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </div>
                                                            ),
                                                        },
                                                        {
                                                            key: '2',
                                                            label: (
                                                                <div
                                                                    onClick={() => {
                                                                        if (
                                                                            banner.status ===
                                                                            'active'
                                                                        )
                                                                            handleMakeInactive(
                                                                                banner
                                                                            );
                                                                        else
                                                                            handleMakeActive(
                                                                                banner
                                                                            );
                                                                    }}
                                                                >
                                                                    {banner.status ===
                                                                    'active'
                                                                        ? 'Make Inactive'
                                                                        : 'Make Active'}
                                                                </div>
                                                            ),
                                                        },
                                                        {
                                                            key: '4',
                                                            label: (
                                                                <div
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            banner
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </div>
                                                            ),
                                                        },
                                                    ],
                                                }}
                                                trigger={['click']}
                                            >
                                                <a>
                                                    <EllipsisVertical className="hover:cursor-pointer" />
                                                </a>
                                            </Dropdown>
                                        </Space>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
