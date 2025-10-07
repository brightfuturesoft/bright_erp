'use client';
import { jsx as _jsx } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Table, Space, Dropdown, message, Image } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
const SEODataTable = ({ data, onEditClick, refetch }) => {
    const { user } = useContext(Erp_context);
    const handleDelete = async seo => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/general-seo/delete-seo`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: seo._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('SEO entry deleted successfully');
            refetch?.();
        }
    };
    const handleToggleStatus = async seo => {
        const newStatus = seo.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/general-seo/update-seo`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: seo._id, status: newStatus }),
            }
        );
        message.success(`SEO status updated to ${newStatus}`);
        refetch?.();
    };
    return _jsx(Table, {
        dataSource: data,
        rowKey: '_id',
        columns: [
            {
                title: 'OG Image',
                dataIndex: 'ogImage',
                key: 'ogImage',
                render: url =>
                    url
                        ? _jsx(Image, {
                              src: url,
                              width: 80,
                              height: 50,
                              alt: 'OG Image',
                              style: { objectFit: 'cover' },
                          })
                        : '-',
            },
            {
                title: 'Page Title',
                dataIndex: 'pageTitle',
                key: 'pageTitle',
            },
            { title: 'Slug / URL', dataIndex: 'slug', key: 'slug' },
            {
                title: 'Meta Description',
                dataIndex: 'metaDescription',
                key: 'metaDescription',
                ellipsis: true,
            },
            {
                title: 'Meta Robots',
                dataIndex: 'metaRobots',
                key: 'metaRobots',
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
export default SEODataTable;
