import React, { useContext } from 'react';
import { Table, Image, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { BlogCategoryType } from '../Blog_Category_Type';

interface DataTableProps {
    data: BlogCategoryType[];
    onEditClick?: (category: BlogCategoryType) => void;
    refetch?: () => void;
}

const BlogCategoryDataTable: React.FC<DataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (category: BlogCategoryType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/blog-category/delete-blog-category`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: category._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Category deleted');
            refetch?.();
        }
    };

    const handleToggleStatus = async (category: BlogCategoryType) => {
        const newStatus = category.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/blog-category/update-blog-category`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: category._id, status: newStatus }),
            }
        );
        message.success(`Category ${newStatus.toLowerCase()}`);
        refetch?.();
    };

    return (
        <Table
            dataSource={data}
            rowKey="_id"
            columns={[
                {
                    title: 'Image',
                    key: 'img',
                    render: (_, record) =>
                        record.image ? (
                            <Image
                                width={100}
                                height={70}
                                src={record.image}
                                alt={record.name}
                            />
                        ) : (
                            '-'
                        ),
                },
                { title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Slug', dataIndex: 'slug', key: 'slug' },
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

export default BlogCategoryDataTable;
