import React from 'react';
import { Card, Checkbox, Button, Tag, Dropdown, Menu, Empty } from 'antd';
import {
    FolderOpenOutlined,
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

export default function Category_tree_view({
    categories,
    selectedCategories,
    setSelectedCategories,
    handleEdit,
    handleAddSubcategory,
    handleDelete,
    statusColors,
}: Props) {
    // show Empty when there are no categories
    if (!categories || categories.length === 0) {
        return (
            <div className="p-8 flex justify-center items-center">
                <Empty description="No Record Found" />
            </div>
        );
    }

    return (
        <div className="p-4 space-y-2">
            <div
                className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg text-sm font-medium dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700`}
            >
                <div className="col-span-3 flex items-center gap-2">
                    <Checkbox
                        checked={
                            selectedCategories?.length === categories?.length &&
                            categories?.length > 0
                        }
                        indeterminate={
                            selectedCategories?.length > 0 &&
                            selectedCategories?.length < categories?.length
                        }
                        onChange={e =>
                            setSelectedCategories(
                                e.target.checked
                                    ? categories.map(cat => cat._id) // FIXED here
                                    : []
                            )
                        }
                    />
                    Category
                </div>
                <div className="col-span-3">Description</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1 text-center">Items</div>
                <div className="col-span-2">Last Updated</div>
                <div className="col-span-2 text-right">Actions</div>
            </div>
            {categories.map((category: Category) => (
                <div
                    key={category._id}
                    className="space-y-2"
                >
                    <Card
                        className={`hover:shadow-md transition-shadow dark:bg-gray-900 dark:text-gray-100`}
                        style={{ marginLeft: `${category.level * 24}px` }}
                        bodyStyle={{ padding: 16 }}
                    >
                        <div className="flex items-center gap-4">
                            <Checkbox
                                checked={selectedCategories.includes(
                                    category._id
                                )}
                                onChange={e => {
                                    if (e.target.checked)
                                        setSelectedCategories(
                                            (prev: string[]) => [
                                                ...prev,
                                                category._id,
                                            ]
                                        );
                                    else
                                        setSelectedCategories(
                                            (prev: string[]) =>
                                                prev.filter(
                                                    id => id !== category._id
                                                )
                                        );
                                }}
                            />
                            <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-3 flex items-center gap-2">
                                    <FolderOpenOutlined />
                                    <div>
                                        <p className="font-semibold">
                                            {category.name}
                                        </p>
                                        <p
                                            className={`text-sm dark:text-gray-400`}
                                        >
                                            {category.code}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <p className={`text-sm dark:text-gray-400`}>
                                        {category.description}
                                    </p>
                                </div>
                                <div className="col-span-1">
                                    <Tag color={statusColors[category.status]}>
                                        {category.status
                                            .charAt(0)
                                            .toUpperCase() +
                                            category.status.slice(1)}
                                    </Tag>
                                </div>
                                <div className="col-span-1 text-center">
                                    <Tag color="blue">{category.itemCount}</Tag>
                                </div>
                                <div className="col-span-2 text-sm">
                                    <p>
                                        {new Date(
                                            category.updatedAt
                                        ).toLocaleString()}
                                    </p>
                                    <p className="text-xs">
                                        {category?.created_by}
                                    </p>
                                </div>
                                <div className="col-span-2 flex justify-end">
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item
                                                    icon={<EyeOutlined />}
                                                >
                                                    View Details
                                                </Menu.Item>
                                                <Menu.Item
                                                    icon={<EditOutlined />}
                                                    onClick={() =>
                                                        handleEdit(category)
                                                    }
                                                >
                                                    Edit Category
                                                </Menu.Item>
                                                <Menu.Item
                                                    icon={<PlusOutlined />}
                                                    onClick={() =>
                                                        handleAddSubcategory(
                                                            category
                                                        )
                                                    }
                                                >
                                                    Add Subcategory
                                                </Menu.Item>
                                                <Menu.Divider />
                                                <Menu.Item
                                                    icon={<DeleteOutlined />}
                                                    danger
                                                    onClick={() =>
                                                        handleDelete(category)
                                                    }
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
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
}
