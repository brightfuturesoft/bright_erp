'use client';

import React, { useContext } from 'react';
import { Table, Space, Dropdown, message, Tag, Tooltip } from 'antd';
import { EllipsisVertical, Copy } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { CouponType } from '../Coupon';
import dayjs from 'dayjs';

interface CouponDataTableProps {
    data: CouponType[];
    onEditClick?: (coupon: CouponType) => void;
    refetch?: () => void;
}

const CouponDataTable: React.FC<CouponDataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (coupon: CouponType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/coupon/delete-coupon`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: coupon._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Coupon deleted successfully');
            refetch?.();
        }
    };

    const handleToggleStatus = async (coupon: CouponType) => {
        const newStatus = coupon.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/coupon/update-coupon`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: coupon._id, status: newStatus }),
            }
        );
        message.success(`Coupon ${newStatus.toLowerCase()} successfully`);
        refetch?.();
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        message.success('Coupon code copied to clipboard!');
    };

    return (
        <Table
            dataSource={data}
            rowKey="_id"
            columns={[
                {
                    title: 'Code',
                    dataIndex: 'code',
                    key: 'code',
                    render: (code: string) => (
                        <Space>
                            <span>{code}</span>
                            <Tooltip title="Copy Code">
                                <Copy
                                    className="hover:cursor-pointer"
                                    size={16}
                                    onClick={() => handleCopyCode(code)}
                                />
                            </Tooltip>
                        </Space>
                    ),
                },
                { title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Type', dataIndex: 'type', key: 'type' },
                {
                    title: 'Price / Discount',
                    dataIndex: 'price',
                    key: 'price',
                    render: (val, record) =>
                        record.type === 'percentage' ? `${val}%` : `${val}৳`,
                },
                {
                    title: 'Usage/User Limit',
                    dataIndex: 'usageLimitPerUser',
                    key: 'usageLimitPerUser',
                    render: (_, record) =>
                        `${record.usageLimitPerUser}/${record.userLimit}`,
                },
                {
                    title: 'Expiry',
                    key: 'expiry',
                    render: (_, record) =>
                        record.startDateTime && record.endDateTime
                            ? `${dayjs(record.startDateTime).format(
                                  'ddd, DD MMM YYYY HH:mm'
                              )} - ${dayjs(record.endDateTime).format(
                                  'ddd, DD MMM YYYY HH:mm'
                              )}`
                            : 'N/A',
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

export default CouponDataTable;
