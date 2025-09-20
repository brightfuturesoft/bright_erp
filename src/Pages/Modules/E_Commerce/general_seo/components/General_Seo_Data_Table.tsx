'use client';

import React, { useContext } from 'react';
import { Table, Space, Dropdown, message, Image } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { SEOType } from '../General_Seo_type';

interface SEODataTableProps {
    data: SEOType[];
    onEditClick?: (seo: SEOType) => void;
    refetch?: () => void;
}

const SEODataTable: React.FC<SEODataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (seo: SEOType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/general-seo/delete-seo`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: seo._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('SEO entry deleted successfully');
            refetch?.();
        }
    };

    const handleToggleStatus = async (seo: SEOType) => {
        const newStatus = seo.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/general-seo/update-seo`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: seo._id, status: newStatus }),
            }
        );
        message.success(`SEO status updated to ${newStatus}`);
        refetch?.();
    };

    return (
        <Table
            dataSource={data}
            rowKey="_id"
            columns={[
                {
                    title: 'OG Image',
                    dataIndex: 'ogImage',
                    key: 'ogImage',
                    render: (url: string) =>
                        url ? (
                            <Image
                                src={url}
                                width={80}
                                height={50}
                                alt="OG Image"
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            '-'
                        ),
                },
                {
                    title: 'Page Title',
                    dataIndex: 'pageTitle',
                    key: 'pageTitle',
                },
                { title: 'Slug / URL', dataIndex: 'slug', key: 'slug' },
                {
                    title: 'Meta Description',
                    dataIndex: 'metaDescription',
                    key: 'metaDescription',
                    ellipsis: true,
                },
                {
                    title: 'Meta Robots',
                    dataIndex: 'metaRobots',
                    key: 'metaRobots',
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status: string) =>
                        status === 'Active' ? (
                            <span className="text-green-600 font-medium">
                                {status}
                            </span>
                        ) : (
                            <span className="text-red-600 font-medium">
                                {status}
                            </span>
                        ),
                },
                {
                    title: 'Actions',
                    key: 'actions',
                    render: (_, record) => (
                        <Space size="middle">
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'edit',
                                            label: (
                                                <div
                                                    onClick={() =>
                                                        onEditClick?.(record)
                                                    }
                                                >
                                                    Edit
                                                </div>
                                            ),
                                        },
                                        {
                                            key: 'toggle',
                                            label: (
                                                <div
                                                    onClick={() =>
                                                        handleToggleStatus(
                                                            record
                                                        )
                                                    }
                                                >
                                                    {record.status === 'Active'
                                                        ? 'Make Inactive'
                                                        : 'Make Active'}
                                                </div>
                                            ),
                                        },
                                        {
                                            key: 'delete',
                                            label: (
                                                <div
                                                    onClick={() =>
                                                        handleDelete(record)
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
                    ),
                },
            ]}
        />
    );
};

export default SEODataTable;
