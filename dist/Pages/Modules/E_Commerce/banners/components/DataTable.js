import { jsx as _jsx } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Table, Image, Space, Dropdown, message } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
const DataTable = ({ data, onEditClick, refetch }) => {
    const { user } = useContext(Erp_context);
    const handleDelete = async banner => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/banners/delete-banner`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: banner._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Banner deleted');
            refetch?.();
        }
    };
    const handleToggleStatus = async banner => {
        const newStatus = banner.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/banners/update-banner`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: banner._id, status: newStatus }),
            }
        );
        message.success(`Banner ${newStatus.toLowerCase()}`);
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
                    record.image_url
                        ? _jsx(Image, {
                              width: 120,
                              height: 80,
                              src: record.image_url,
                          })
                        : '-',
            },
            { title: 'Title', dataIndex: 'title', key: 'title' },
            { title: 'Status', dataIndex: 'status', key: 'status' },
            {
                title: 'Redirect URL',
                dataIndex: 'redirect_url',
                key: 'redirect_url',
                render: url =>
                    url
                        ? _jsx('a', {
                              href: url,
                              target: '_blank',
                              children: url,
                          })
                        : '-',
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
export default DataTable;
