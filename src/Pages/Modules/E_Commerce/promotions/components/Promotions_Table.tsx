'use client';

import React, { useContext } from 'react';
import { Table, Image, Space, Dropdown, message } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { PromotionType } from '../Promotions_Type';

interface DataTableProps {
    data: PromotionType[];
    onEditClick?: (promo: PromotionType) => void;
    refetch?: () => void;
}

const PromotionDataTable: React.FC<DataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (promo: PromotionType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/promotions/delete-promotion`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: promo._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Promotion deleted successfully');
            refetch?.();
        }
    };

    const handleToggleStatus = async (promo: PromotionType) => {
        const newStatus = promo.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/promotions/update-promotion`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: promo._id, status: newStatus }),
            }
        );
        message.success(`Promotion ${newStatus.toLowerCase()} successfully`);
        refetch?.();
    };

    return (
        <Table
            dataSource={data}
            rowKey="_id"
            columns={[
                {
                    title: 'Image',
                    key: 'image',
                    render: (_, record) =>
                        record.image ? (
                            <Image
                                width={100}
                                height={70}
                                src={record.image}
                                alt={record.title}
                            />
                        ) : (
                            '-'
                        ),
                },
                { title: 'Title', dataIndex: 'title', key: 'title' },
                {
                    title: 'Button Text',
                    dataIndex: 'button_text',
                    key: 'button_text',
                },
                {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description',
                    render: (desc: string) =>
                        desc ? (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html:
                                        desc.length > 80
                                            ? desc.substring(0, 80) + '...'
                                            : desc,
                                }}
                            />
                        ) : (
                            '-'
                        ),
                },
                {
                    title: 'URL',
                    dataIndex: 'url',
                    key: 'url',
                    render: (url: string) =>
                        url ? (
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {url.length > 30
                                    ? url.substring(0, 30) + '...'
                                    : url}
                            </a>
                        ) : (
                            '-'
                        ),
                },
                { title: 'Status', dataIndex: 'status', key: 'status' },
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

export default PromotionDataTable;
