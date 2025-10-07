'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Table, Space, Dropdown, message, Tag, Tooltip } from 'antd';
import { EllipsisVertical, Copy } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import dayjs from 'dayjs';
const CouponDataTable = ({ data, onEditClick, refetch }) => {
    const { user } = useContext(Erp_context);
    const handleDelete = async coupon => {
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
    const handleToggleStatus = async coupon => {
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
    const handleCopyCode = code => {
        navigator.clipboard.writeText(code);
        message.success('Coupon code copied to clipboard!');
    };
    return _jsx(Table, {
        dataSource: data,
        rowKey: '_id',
        columns: [
            {
                title: 'Code',
                dataIndex: 'code',
                key: 'code',
                render: code =>
                    _jsxs(Space, {
                        children: [
                            _jsx('span', { children: code }),
                            _jsx(Tooltip, {
                                title: 'Copy Code',
                                children: _jsx(Copy, {
                                    className: 'hover:cursor-pointer',
                                    size: 16,
                                    onClick: () => handleCopyCode(code),
                                }),
                            }),
                        ],
                    }),
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
                        ? `${dayjs(record.startDateTime).format('ddd, DD MMM YYYY HH:mm')} - ${dayjs(record.endDateTime).format('ddd, DD MMM YYYY HH:mm')}`
                        : 'N/A',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: status =>
                    status === 'Active'
                        ? _jsx(Tag, { color: 'green', children: 'Active' })
                        : _jsx(Tag, { color: 'red', children: 'Inactive' }),
            },
            {
                title: 'Actions',
                key: 'actions',
                render: (_, record) =>
                    _jsx(Space, {
                        size: 'middle',
                        children: _jsx(Dropdown, {
                            menu: {
                                items: [
                                    {
                                        key: 'edit',
                                        label: _jsx('div', {
                                            onClick: () =>
                                                onEditClick?.(record),
                                            children: 'Edit',
                                        }),
                                    },
                                    {
                                        key: 'toggle',
                                        label: _jsx('div', {
                                            onClick: () =>
                                                handleToggleStatus(record),
                                            children:
                                                record.status === 'Active'
                                                    ? 'Make Inactive'
                                                    : 'Make Active',
                                        }),
                                    },
                                    {
                                        key: 'delete',
                                        label: _jsx('div', {
                                            onClick: () => handleDelete(record),
                                            children: 'Delete',
                                        }),
                                    },
                                ],
                            },
                            trigger: ['click'],
                            children: _jsx('a', {
                                children: _jsx(EllipsisVertical, {
                                    className: 'hover:cursor-pointer',
                                }),
                            }),
                        }),
                    }),
            },
        ],
    });
};
export default CouponDataTable;
