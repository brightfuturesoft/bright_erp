'use client';

import React, { useContext } from 'react';
import { Table, Image, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { CustomSectionType } from '../Custom_Section_Type';

interface DataTableProps {
    data: CustomSectionType[];
    onEditClick?: (section: CustomSectionType) => void;
    refetch?: () => void;
}

const CustomSectionDataTable: React.FC<DataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (section: CustomSectionType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/custom_section/delete-section`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: section._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Section deleted successfully');
            refetch?.();
        }
    };

    const handleToggleStatus = async (section: CustomSectionType) => {
        const newStatus = section.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/custom_section/update-section`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: section._id, status: newStatus }),
            }
        );
        message.success(`Section ${newStatus.toLowerCase()} successfully`);
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
                                {url}
                            </a>
                        ) : (
                            '-'
                        ),
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

export default CustomSectionDataTable;
