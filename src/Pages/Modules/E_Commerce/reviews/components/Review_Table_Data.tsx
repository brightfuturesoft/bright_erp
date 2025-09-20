'use client';

import React, { useContext } from 'react';
import { Table, Space, Dropdown, message, Tag, Image } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { ReviewType } from '../Reviews_Type';

interface ReviewDataTableProps {
    data: ReviewType[];
    refetch?: () => void;
}

const ReviewDataTable: React.FC<ReviewDataTableProps> = ({ data, refetch }) => {
    const { user } = useContext(Erp_context);

    // Delete Review
    const handleDelete = async (review: ReviewType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/reviews/delete-review`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: review._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Review deleted successfully');
            refetch?.();
        }
    };

    // Toggle Active/Inactive
    const handleToggleStatus = async (review: ReviewType) => {
        const newStatus = review.status === 'Active' ? 'Inactive' : 'Active';
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/reviews/update-review`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: review._id, status: newStatus }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success(`Review ${newStatus.toLowerCase()} successfully`);
            refetch?.();
        }
    };

    return (
        <Table
            dataSource={data}
            rowKey="_id"
            columns={[
                {
                    title: 'Review Text',
                    dataIndex: 'reviewText',
                    key: 'reviewText',
                    ellipsis: true,
                },
                {
                    title: 'Rating',
                    dataIndex: 'rating',
                    key: 'rating',
                    render: (rating: number) => (
                        <Tag color="blue">{rating}</Tag>
                    ),
                },
                {
                    title: 'Images',
                    dataIndex: 'images',
                    key: 'images',
                    render: (images: string[]) =>
                        images && images.length > 0 ? (
                            <Space>
                                {images.map((img, index) => (
                                    <Image
                                        key={index}
                                        src={img}
                                        width={50}
                                        height={50}
                                        alt="review image"
                                        preview={{ mask: <span>Preview</span> }}
                                    />
                                ))}
                            </Space>
                        ) : (
                            <span>No Images</span>
                        ),
                },
                {
                    title: 'Workspace ID',
                    dataIndex: 'workspace_id',
                    key: 'workspace_id',
                },
                {
                    title: 'Product ID',
                    dataIndex: 'product_id',
                    key: 'product_id',
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

export default ReviewDataTable;
