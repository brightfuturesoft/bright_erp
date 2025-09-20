'use client';

import React, { useContext } from 'react';
import { Table, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { SocialLinkType } from '../Intagration_Type';

interface SocialLinkDataTableProps {
    data: SocialLinkType[];
    onEditClick?: (link: SocialLinkType) => void;
    refetch?: () => void;
}

const SocialLinkDataTable: React.FC<SocialLinkDataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (link: SocialLinkType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/intigration/delete-link`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: link._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Social link deleted successfully');
            refetch?.();
        }
    };

    const handleToggleStatus = async (link: SocialLinkType) => {
        const newStatus = link.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/intigration/update-link`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: link._id, status: newStatus }),
            }
        );
        message.success(`Social link ${newStatus.toLowerCase()} successfully`);
        refetch?.();
    };

    return (
        <Table
            dataSource={data}
            rowKey="_id"
            columns={[
                {
                    title: 'Facebook',
                    dataIndex: 'facebook_url',
                    key: 'facebook_url',
                    render: val => val || 'N/A',
                },
                {
                    title: 'Instagram',
                    dataIndex: 'instagram_url',
                    key: 'instagram_url',
                    render: val => val || 'N/A',
                },
                {
                    title: 'YouTube',
                    dataIndex: 'youtube_url',
                    key: 'youtube_url',
                    render: val => val || 'N/A',
                },
                {
                    title: 'WhatsApp',
                    dataIndex: 'whatsapp_url',
                    key: 'whatsapp_url',
                    render: val => val || 'N/A',
                },
                {
                    title: 'Twitter',
                    dataIndex: 'twitter_url',
                    key: 'twitter_url',
                    render: val => val || 'N/A',
                },
                {
                    title: 'LinkedIn',
                    dataIndex: 'linkedin_url',
                    key: 'linkedin_url',
                    render: val => val || 'N/A',
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status: string) =>
                        status === 'Active' ? (
                            <Tag color="green">Active</Tag>
                        ) : (
                            <Tag color="red">Inactive</Tag>
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
                                            key: 'edit',
                                            label: (
                                                <div
                                                    onClick={() =>
                                                        onEditClick?.(record)
                                                    }
                                                >
                                                    Edit
                                                </div>
                                            ),
                                        },
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
                                                    {record.status === 'Active'
                                                        ? 'Make Inactive'
                                                        : 'Make Active'}
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

export default SocialLinkDataTable;
