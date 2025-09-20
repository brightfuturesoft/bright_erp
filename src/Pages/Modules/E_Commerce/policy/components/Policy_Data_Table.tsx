'use client';

import React, { useContext } from 'react';
import { Table, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';

export type PolicyType = {
    _id?: string;
    title: string;
    description: string;
    status: 'Active' | 'Inactive';
    workspace_id: string;
    created_By?: string;
};

interface PolicyDataTableProps {
    data: PolicyType[];
    onEditClick?: (policy: PolicyType) => void;
    refetch?: () => void;
}

const PolicyDataTable: React.FC<PolicyDataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (policy: PolicyType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/policy/delete-policy`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: policy._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Policy deleted successfully');
            refetch?.();
        }
    };

    const handleToggleStatus = async (policy: PolicyType) => {
        const newStatus = policy.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/policy/update-policy`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: policy._id, status: newStatus }),
            }
        );
        message.success(`Policy ${newStatus.toLowerCase()} successfully`);
        refetch?.();
    };

    return (
        <Table
            dataSource={data}
            rowKey="_id"
            columns={[
                { title: 'Title', dataIndex: 'title', key: 'title' },
                {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description',
                    ellipsis: true,
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

export default PolicyDataTable;
