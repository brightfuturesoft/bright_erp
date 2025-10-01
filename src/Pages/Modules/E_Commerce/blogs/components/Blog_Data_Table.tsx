'use client';

import React, { useContext } from 'react';
import { Table, Image, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { BlogType } from '../Blog_Type';

interface DataTableProps {
    data: BlogType[];
    onEditClick?: (blog: BlogType) => void;
    refetch?: () => void;
}

const BlogDataTable: React.FC<DataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (blog: BlogType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/blogs/delete-blog`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: blog._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Blog deleted Successfull');
            refetch?.();
        }
    };

    const handleToggleStatus = async (blog: BlogType) => {
        const newStatus = blog.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/blogs/update-blog`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: blog._id, status: newStatus }),
            }
        );
        message.success(`Blog ${newStatus.toLowerCase()} Successfull`);
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
                { title: 'Category', dataIndex: 'category', key: 'category' },
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

export default BlogDataTable;
