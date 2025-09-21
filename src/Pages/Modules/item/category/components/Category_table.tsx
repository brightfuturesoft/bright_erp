import React from 'react';
import { Table, Checkbox, Tag, Button, Dropdown, Menu } from 'antd';
import {
    EyeOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    MoreOutlined,
} from '@ant-design/icons';
import { Category } from '../CategoryDashboard';

interface Props {
    categories: Category[];
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    handleEdit: (cat: Category) => void;
    handleAddSubcategory: (cat: Category) => void;
    handleDelete: (cat: Category) => void;
    statusColors: { [key in Category['status']]: string };
}

export default function Category_table({
    categories,
    selectedCategories,
    setSelectedCategories,
    handleEdit,
    handleAddSubcategory,
    handleDelete,
    statusColors,
}: Props) {
    const columns = [
        {
            title: (
                <Checkbox
                    checked={
                        selectedCategories.length === categories.length &&
                        categories.length > 0
                    }
                    indeterminate={
                        selectedCategories.length > 0 &&
                        selectedCategories.length < categories.length
                    }
                    onChange={e =>
                        setSelectedCategories(
                            e.target.checked
                                ? categories.map(cat => cat._id)
                                : []
                        )
                    }
                />
            ),
            dataIndex: '_id',
            render: (_: any, record: Category) => (
                <Checkbox
                    checked={selectedCategories.includes(record._id)}
                    onChange={e => {
                        if (e.target.checked)
                            setSelectedCategories(prev => [
                                ...prev,
                                record._id,
                            ]);
                        else
                            setSelectedCategories(prev =>
                                prev.filter(id => id !== record._id)
                            );
                    }}
                />
            ),
            width: 50,
        },
        { title: 'Code', dataIndex: 'code', key: 'code' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Path', dataIndex: 'path', key: 'path' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={statusColors[status as keyof typeof statusColors]}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Tag>
            ),
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            render: (level: number) => (
                <Tag color="purple">{`L${level + 1}`}</Tag>
            ),
        },
        {
            title: 'Items',
            dataIndex: 'itemCount',
            key: 'itemCount',
            render: (count: number) => <Tag color="blue">{count}</Tag>,
        },
        {
            title: 'Updated',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text: string) => <p>{new Date(text).toLocaleString()}</p>,
        },
        {
            title: 'Created By',
            dataIndex: 'created_by',
            key: 'created_by',
            render: (text: string) => <p>{text}</p>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Category) => (
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item icon={<EyeOutlined />}>View</Menu.Item>
                            <Menu.Item
                                icon={<EditOutlined />}
                                onClick={() => handleEdit(record)}
                            >
                                Edit
                            </Menu.Item>
                            <Menu.Item
                                icon={<PlusOutlined />}
                                onClick={() => handleAddSubcategory(record)}
                            >
                                Add Sub
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item
                                icon={<DeleteOutlined />}
                                danger
                                onClick={() => handleDelete(record)}
                            >
                                Delete
                            </Menu.Item>
                        </Menu>
                    }
                >
                    <Button
                        type="text"
                        icon={<MoreOutlined />}
                    />
                </Dropdown>
            ),
            align: 'right' as const,
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={categories}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
            className="dark:ant-table-dark"
        />
    );
}
