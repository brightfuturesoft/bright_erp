'use client';

import React, { useContext } from 'react';
import { Table, Image, Space, Dropdown, message, Tag } from 'antd';
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
                    title: 'Banner',
                    key: 'banner',
                    render: (_, record) =>
                        record.banner ? (
                            <Image
                                width={100}
                                height={70}
                                src={record.banner}
                                alt={record.name}
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            '-'
                        ),
                },
                { title: 'Name', dataIndex: 'name', key: 'name' },
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
                    title: 'Flash Sale',
                    dataIndex: 'flash_sale',
                    key: 'flash_sale',
                    render: (flash_sale: boolean) =>
                        flash_sale ? (
                            <Tag color="blue">Yes</Tag>
                        ) : (
                            <Tag color="default">No</Tag>
                        ),
                },
                {
                    title: 'Flash Sale Duration',
                    dataIndex: 'flash_date',
                    key: 'flash_date',
                    render: (flash_date: string[] | undefined, record) =>
                        record.flash_sale &&
                        flash_date &&
                        flash_date.length === 2 ? (
                            <span>
                                {new Date(flash_date[0]).toLocaleString()} -{' '}
                                {new Date(flash_date[1]).toLocaleString()}
                            </span>
                        ) : (
                            '-'
                        ),
                },

                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status: string) =>
                        status === 'Active' ? (
                            <Tag color="green">Active</Tag>
                        ) : (
                            <Tag color="red">Inactive</Tag>
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

export default PromotionDataTable;
