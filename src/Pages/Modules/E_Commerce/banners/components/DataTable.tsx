import React, { useContext } from 'react';
import { Table, Image, Space, Dropdown, message } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { BannerType } from '../BannerTypes';
import { Erp_context } from '@/provider/ErpContext';

interface DataTableProps {
    data: BannerType[];
    onEditClick?: (banner: BannerType) => void;
    refetch?: () => void;
}

const DataTable: React.FC<DataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (banner: BannerType) => {
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

    const handleToggleStatus = async (banner: BannerType) => {
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

    return (
        <Table
            dataSource={data}
            rowKey="_id"
            columns={[
                {
                    title: 'Image',
                    key: 'image',
                    render: (_, record) =>
                        record.image_url ? (
                            <Image
                                width={120}
                                height={80}
                                src={record.image_url}
                            />
                        ) : (
                            '-'
                        ),
                },
                { title: 'Title', dataIndex: 'title', key: 'title' },
                { title: 'Status', dataIndex: 'status', key: 'status' },
                {
                    title: 'Redirect URL',
                    dataIndex: 'redirect_url',
                    key: 'redirect_url',
                    render: url =>
                        url ? (
                            <a
                                href={url}
                                target="_blank"
                            >
                                {url}
                            </a>
                        ) : (
                            '-'
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

export default DataTable;
