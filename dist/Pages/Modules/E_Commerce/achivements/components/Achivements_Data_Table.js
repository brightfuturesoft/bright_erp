import { jsx as _jsx } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Table, Image, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
const AchievementsDataTable = ({ data, onEditClick, refetch }) => {
    const { user } = useContext(Erp_context);
    const handleDelete = async achievement => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/achivements/delete-achievement`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: achievement._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Achievement deleted');
            refetch?.();
        }
    };
    const handleToggleStatus = async achievement => {
        const newStatus =
            achievement.status === 'Active' ? 'Inactive' : 'Active';
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/achivements/update-achievement`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({
                    id: achievement._id,
                    status: newStatus,
                }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success(`Achievement ${newStatus.toLowerCase()}`);
            refetch?.();
        }
    };
    return _jsx(Table, {
        dataSource: data,
        rowKey: '_id',
        columns: [
            {
                title: 'Image',
                key: 'img',
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
            { title: 'Link', dataIndex: 'link', key: 'link' },
            {
                title: 'Created By',
                dataIndex: 'createdBy',
                key: 'createdBy',
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
export default AchievementsDataTable;
