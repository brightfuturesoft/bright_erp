'use client';
import { jsx as _jsx } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Table, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
const FaqDataTable = ({ data, onEditClick, refetch }) => {
    const { user } = useContext(Erp_context);
    // Delete FAQ
    const handleDelete = async faq => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/questions/delete-question`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: faq._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('FAQ deleted successfully');
            refetch?.();
        }
    };
    // Toggle Active/Inactive
    const handleToggleStatus = async faq => {
        const newStatus = faq.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/questions/update-question`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: faq._id, status: newStatus }),
            }
        );
        message.success(`FAQ ${newStatus.toLowerCase()} successfully`);
        refetch?.();
    };
    return _jsx(Table, {
        dataSource: data,
        rowKey: '_id',
        columns: [
            {
                title: 'Question',
                dataIndex: 'question',
                key: 'question',
            },
            {
                title: 'Answer',
                dataIndex: 'answer',
                key: 'answer',
                render: ans =>
                    ans
                        ? _jsx('span', {
                              children:
                                  ans.length > 100
                                      ? ans.substring(0, 100) + '...'
                                      : ans,
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
export default FaqDataTable;
