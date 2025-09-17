'use client';

import React, { useContext, useState, useEffect } from 'react';
import { Table, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { NewsletterType } from '../Newsletter_Type';

interface DataTableProps {
    data: NewsletterType[];
    onEditClick?: (newsletter: NewsletterType) => void;
    refetch?: () => void;
    onSelectionChange?: (selectedEmails: string[]) => void; // new prop
}

const NewsletterDataTable: React.FC<DataTableProps> = ({
    data,
    onEditClick,
    refetch,
    onSelectionChange,
}) => {
    const { user } = useContext(Erp_context);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

    // Delete newsletter
    const handleDelete = async (newsletter: NewsletterType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/newsletters/delete-newsletter`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: newsletter._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Newsletter deleted successfully');
            refetch?.();
        }
    };

    // Toggle Active/Inactive
    const handleToggleStatus = async (newsletter: NewsletterType) => {
        const newStatus =
            newsletter.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/newsletters/update-newsletter`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: newsletter._id, status: newStatus }),
            }
        );
        message.success(`Newsletter ${newStatus.toLowerCase()} successfully`);
        refetch?.();
    };

    // Row selection configuration
    const rowSelection = {
        selectedRowKeys,
        onChange: (
            selectedKeys: React.Key[],
            selectedRows: NewsletterType[]
        ) => {
            setSelectedRowKeys(selectedKeys);
            const emails = selectedRows.map(r => r.email);
            setSelectedEmails(emails);
            onSelectionChange?.(emails); // pass selected emails to parent
        },
    };

    return (
        <Table
            dataSource={data}
            rowKey="_id"
            rowSelection={{
                type: 'checkbox',
                ...rowSelection,
            }}
            columns={[
                {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
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
                    title: 'Created At',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    render: (date: string) =>
                        new Date(date).toLocaleString() || '-',
                },
                {
                    title: 'Updated At',
                    dataIndex: 'updatedAt',
                    key: 'updatedAt',
                    render: (date: string) =>
                        new Date(date).toLocaleString() || '-',
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

export default NewsletterDataTable;
