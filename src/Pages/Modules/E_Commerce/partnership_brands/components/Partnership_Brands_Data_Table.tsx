'use client';

import React, { useContext } from 'react';
import { Table, Image, Space, Dropdown, message } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { BrandType } from '../Partnership_Type';

interface BrandDataTableProps {
    data: BrandType[];
    onEditClick?: (brand: BrandType) => void;
    refetch?: () => void;
}

const BrandDataTable: React.FC<BrandDataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (brand: BrandType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/partnership_brands/delete-brand`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: brand._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Brand deleted successfully');
            refetch?.();
        }
    };

    const handleToggleStatus = async (brand: BrandType) => {
        const newStatus = brand.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/partnership_brands/update-brand`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: brand._id, status: newStatus }),
            }
        );
        message.success(`Brand ${newStatus.toLowerCase()} successfully`);
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
                                width={120}
                                height={80}
                                src={record.image}
                                alt={record.title}
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            '-'
                        ),
                },
                { title: 'Title', dataIndex: 'title', key: 'title' },
                {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description',
                    ellipsis: true,
                },
                {
                    title: 'CTA / URL',
                    key: 'cta',
                    render: (_, record) =>
                        record.cta ? (
                            <a
                                href={record.cta}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                {record.cta}
                            </a>
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

export default BrandDataTable;
