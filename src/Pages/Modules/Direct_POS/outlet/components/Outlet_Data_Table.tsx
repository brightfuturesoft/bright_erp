'use client';

import React, { useContext } from 'react';
import { Table, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';

export type OutletType = {
    _id?: string;
    name: string;
    address: string;
    contact: string;
    status: 'Active' | 'Inactive';
    workspace_id: string;
    created_By?: string;
};

interface OutletDataTableProps {
    data: OutletType[];
    onEditClick?: (outlet: OutletType) => void;
    refetch?: () => void;
}

const OutletDataTable: React.FC<OutletDataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (outlet: OutletType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}direct-pos/outlets/delete-outlet`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: outlet._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Outlet deleted successfully');
            refetch?.();
        }
    };

    const handleToggleStatus = async (outlet: OutletType) => {
        const newStatus = outlet.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}direct-pos/outlets/update-outlet`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: outlet._id, status: newStatus }),
            }
        );
        message.success(`Outlet ${newStatus.toLowerCase()} successfully`);
        refetch?.();
    };

    return (
        <Table
            dataSource={data}
            rowKey="_id"
            columns={[
                { title: 'Outlet Name', dataIndex: 'name', key: 'name' },
                {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                    ellipsis: true,
                },
                {
                    title: 'Contact',
                    dataIndex: 'contact',
                    key: 'contact',
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

export default OutletDataTable;
