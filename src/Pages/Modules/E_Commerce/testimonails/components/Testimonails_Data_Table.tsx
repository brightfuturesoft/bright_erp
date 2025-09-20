import React, { useContext } from 'react';
import { Table, Image, Space, Dropdown, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { TestimonialType } from '../Testimonails_Type';

interface DataTableProps {
    data: TestimonialType[];
    onEditClick?: (testimonial: TestimonialType) => void;
    refetch?: () => void;
}

const TestimonialsDataTable: React.FC<DataTableProps> = ({
    data,
    onEditClick,
    refetch,
}) => {
    const { user } = useContext(Erp_context);

    const handleDelete = async (testimonial: TestimonialType) => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/testimonials/delete-testimonial`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: testimonial._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Testimonial deleted');
            refetch?.();
        }
    };

    const handleToggleStatus = async (testimonial: TestimonialType) => {
        const newStatus =
            testimonial.status === 'Active' ? 'Inactive' : 'Active';
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/testimonials/update-testimonial`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({
                    id: testimonial._id,
                    status: newStatus,
                }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success(`Testimonial ${newStatus.toLowerCase()}`);
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
                                alt={record.name}
                            />
                        ) : (
                            '-'
                        ),
                },
                { title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Comment', dataIndex: 'comment', key: 'comment' },
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

export default TestimonialsDataTable;
