import { jsx as _jsx } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Table, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
const ContactDataTable = ({ data, onEditClick, refetch }) => {
    const { user } = useContext(Erp_context);
    const handleDelete = async contact => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/contacts/delete-contact`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: contact._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Contact deleted');
            refetch?.();
        }
    };
    const handleToggleStatus = async contact => {
        let newStatus = 'Resolved';
        if (contact.status === 'Resolved') newStatus = 'Pending';
        else if (contact.status === 'Closed') newStatus = 'Pending';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/contacts/update-contact`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: contact._id, status: newStatus }),
            }
        );
        message.success(`Status updated to ${newStatus}`);
        refetch?.();
    };
    return _jsx(Table, {
        dataSource: data,
        rowKey: '_id',
        columns: [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Email', dataIndex: 'email', key: 'email' },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
                render: phone => phone || '-',
            },
            { title: 'Message', dataIndex: 'message', key: 'message' },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: status =>
                    status === 'Pending'
                        ? _jsx(Tag, { color: 'green', children: 'Pending' })
                        : _jsx(Tag, { color: 'red', children: 'Closed' }),
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
                                                record.status === 'Pending'
                                                    ? 'Make Closed'
                                                    : 'Make Pending',
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
export default ContactDataTable;
