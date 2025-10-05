'use client';
import { jsx as _jsx } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Table, Image, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
const PromotionDataTable = ({ data, onEditClick, refetch }) => {
    const { user } = useContext(Erp_context);
    const handleDelete = async promo => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/promotions/delete-promotion`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: promo._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Promotion deleted successfully');
            refetch?.();
        }
    };
    const handleToggleStatus = async promo => {
        const newStatus = promo.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/promotions/update-promotion`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: promo._id, status: newStatus }),
            }
        );
        message.success(`Promotion ${newStatus.toLowerCase()} successfully`);
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
                              width: 100,
                              height: 70,
                              src: record.image,
                              alt: record.title,
                          })
                        : '-',
            },
            { title: 'Title', dataIndex: 'title', key: 'title' },
            {
                title: 'Button Text',
                dataIndex: 'button_text',
                key: 'button_text',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                render: desc =>
                    desc
                        ? _jsx('span', {
                              dangerouslySetInnerHTML: {
                                  __html:
                                      desc.length > 80
                                          ? desc.substring(0, 80) + '...'
                                          : desc,
                              },
                          })
                        : '-',
            },
            {
                title: 'URL',
                dataIndex: 'url',
                key: 'url',
                render: url =>
                    url
                        ? _jsx('a', {
                              href: url,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              children:
                                  url.length > 30
                                      ? url.substring(0, 30) + '...'
                                      : url,
                          })
                        : '-',
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
export default PromotionDataTable;
