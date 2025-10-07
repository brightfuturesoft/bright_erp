'use client';
import { jsx as _jsx } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Table, Image, Space, Dropdown, message } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
const BrandDataTable = ({ data, onEditClick, refetch }) => {
    const { user } = useContext(Erp_context);
    const handleDelete = async brand => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/partnership_brands/delete-brand`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: brand._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Brand deleted successfully');
            refetch?.();
        }
    };
    const handleToggleStatus = async brand => {
        const newStatus = brand.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/partnership_brands/update-brand`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: brand._id, status: newStatus }),
            }
        );
        message.success(`Brand ${newStatus.toLowerCase()} successfully`);
        refetch?.();
    };
    return _jsx(Table, {
        dataSource: data,
        rowKey: '_id',
        columns: [
            {
                title: 'Image',
                key: 'image',
                render: (_, record) =>
                    record.image
                        ? _jsx(Image, {
                              width: 120,
                              height: 80,
                              src: record.image,
                              alt: record.title,
                              style: { objectFit: 'cover' },
                          })
                        : '-',
            },
            { title: 'Title', dataIndex: 'title', key: 'title' },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                ellipsis: true,
            },
            {
                title: 'CTA / URL',
                key: 'cta',
                render: (_, record) =>
                    record.cta
                        ? _jsx('a', {
                              href: record.cta,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              className: 'text-blue-600 underline',
                              children: record.cta,
                          })
                        : '-',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: status =>
                    status === 'Active'
                        ? _jsx('span', {
                              className: 'text-green-600 font-medium',
                              children: status,
                          })
                        : _jsx('span', {
                              className: 'text-red-600 font-medium',
                              children: status,
                          }),
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
export default BrandDataTable;
