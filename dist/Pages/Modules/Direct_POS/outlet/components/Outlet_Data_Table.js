'use client';
import { jsx as _jsx } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Table, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
const OutletDataTable = ({ data, onEditClick, refetch }) => {
    const { user } = useContext(Erp_context);
    const handleDelete = async outlet => {
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
    const handleToggleStatus = async outlet => {
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
    return _jsx(Table, {
        dataSource: data,
        rowKey: '_id',
        columns: [
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
export default OutletDataTable;
