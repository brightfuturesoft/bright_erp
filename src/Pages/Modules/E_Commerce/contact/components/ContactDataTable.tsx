import React, { useContext } from 'react';
import { Table, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';

import { Erp_context } from '@/provider/ErpContext';
import { ContactType } from '../contactType';

interface ContactDataTableProps {
    data: ContactType[];
    onEditClick?: (contact: ContactType) => void;
    refetch?: () => void;
}

const ContactDataTable: React.FC<ContactDataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (contact: ContactType) => {
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

    const handleToggleStatus = async (contact: ContactType) => {
        let newStatus: ContactType['status'] = 'Resolved';
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

    return (
        <Table
            dataSource={data}
            rowKey="_id"
            columns={[
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
                    render: (status: string) =>
                        status === 'Pending' ? (
                            <Tag color="green">Pending</Tag>
                        ) : (
                            <Tag color="red">Closed</Tag>
                        ),
                },
                {
                    title: 'Actions',
                    key: 'actions',
                    render: (_, record) => (
                        <Space size="middle">
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'toggle',
                                            label: (
                                                <div
                                                    onClick={() =>
                                                        handleToggleStatus(
                                                            record
                                                        )
                                                    }
                                                >
                                                    {record.status === 'Pending'
                                                        ? 'Make Closed'
                                                        : 'Make Pending'}
                                                </div>
                                            ),
                                        },
                                        {
                                            key: 'delete',
                                            label: (
                                                <div
                                                    onClick={() =>
                                                        handleDelete(record)
                                                    }
                                                >
                                                    Delete
                                                </div>
                                            ),
                                        },
                                    ],
                                }}
                                trigger={['click']}
                            >
                                <a>
                                    <EllipsisVertical className="hover:cursor-pointer" />
                                </a>
                            </Dropdown>
                        </Space>
                    ),
                },
            ]}
        />
    );
};

export default ContactDataTable;
