import React, { useContext } from 'react';
import { Table, Image, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { AchievementType } from '../Achivement_Type';

interface DataTableProps {
    data: AchievementType[];
    onEditClick?: (achievement: AchievementType) => void;
    refetch?: () => void;
}

const AchievementsDataTable: React.FC<DataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (achievement: AchievementType) => {
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

    const handleToggleStatus = async (achievement: AchievementType) => {
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

    return (
        <Table
            dataSource={data}
            rowKey="_id"
            columns={[
                {
                    title: 'Image',
                    key: 'img',
                    render: (_, record) =>
                        record.image ? (
                            <Image
                                width={100}
                                height={70}
                                src={record.image}
                                alt={record.title}
                            />
                        ) : (
                            '-'
                        ),
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

export default AchievementsDataTable;
