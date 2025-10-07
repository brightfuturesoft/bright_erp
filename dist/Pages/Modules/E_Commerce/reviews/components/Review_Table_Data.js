'use client';
import { jsx as _jsx } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Table, Space, Dropdown, message, Tag, Image } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
const ReviewDataTable = ({ data, refetch }) => {
    const { user } = useContext(Erp_context);
    // Delete Review
    const handleDelete = async review => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/reviews/delete-review`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: review._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Review deleted successfully');
            refetch?.();
        }
    };
    // Toggle Active/Inactive
    const handleToggleStatus = async review => {
        const newStatus = review.status === 'Active' ? 'Inactive' : 'Active';
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/reviews/update-review`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: review._id, status: newStatus }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success(`Review ${newStatus.toLowerCase()} successfully`);
            refetch?.();
        }
    };
    return _jsx(Table, {
        dataSource: data,
        rowKey: '_id',
        columns: [
            {
                title: 'Review Text',
                dataIndex: 'reviewText',
                key: 'reviewText',
                ellipsis: true,
            },
            {
                title: 'Rating',
                dataIndex: 'rating',
                key: 'rating',
                render: rating =>
                    _jsx(Tag, { color: 'blue', children: rating }),
            },
            {
                title: 'Images',
                dataIndex: 'images',
                key: 'images',
                render: images =>
                    images && images.length > 0
                        ? _jsx(Space, {
                              children: images.map((img, index) =>
                                  _jsx(
                                      Image,
                                      {
                                          src: img,
                                          width: 50,
                                          height: 50,
                                          alt: 'review image',
                                          preview: {
                                              mask: _jsx('span', {
                                                  children: 'Preview',
                                              }),
                                          },
                                      },
                                      index
                                  )
                              ),
                          })
                        : _jsx('span', { children: 'No Images' }),
            },
            {
                title: 'Workspace ID',
                dataIndex: 'workspace_id',
                key: 'workspace_id',
            },
            {
                title: 'Product ID',
                dataIndex: 'product_id',
                key: 'product_id',
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
export default ReviewDataTable;
