import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Card, Checkbox, Button, Tag, Dropdown, Menu } from 'antd';
import {
    FolderOpenOutlined,
    EyeOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    MoreOutlined,
} from '@ant-design/icons';
export default function Category_tree_view({
    categories,
    selectedCategories,
    setSelectedCategories,
    handleEdit,
    handleAddSubcategory,
    handleDelete,
    statusColors,
}) {
    return _jsxs('div', {
        className: 'p-4 space-y-2',
        children: [
            _jsxs('div', {
                className: `grid grid-cols-12 gap-4 items-center p-4 rounded-lg text-sm font-medium dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700`,
                children: [
                    _jsxs('div', {
                        className: 'col-span-3 flex items-center gap-2',
                        children: [
                            _jsx(Checkbox, {
                                checked:
                                    selectedCategories?.length ===
                                        categories?.length &&
                                    categories?.length > 0,
                                indeterminate:
                                    selectedCategories?.length > 0 &&
                                    selectedCategories?.length <
                                        categories?.length,
                                onChange: e =>
                                    setSelectedCategories(
                                        e.target.checked
                                            ? categories.map(cat => cat._id) // FIXED here
                                            : []
                                    ),
                            }),
                            'Category',
                        ],
                    }),
                    _jsx('div', {
                        className: 'col-span-3',
                        children: 'Description',
                    }),
                    _jsx('div', {
                        className: 'col-span-1',
                        children: 'Status',
                    }),
                    _jsx('div', {
                        className: 'col-span-1 text-center',
                        children: 'Items',
                    }),
                    _jsx('div', {
                        className: 'col-span-2',
                        children: 'Last Updated',
                    }),
                    _jsx('div', {
                        className: 'col-span-2 text-right',
                        children: 'Actions',
                    }),
                ],
            }),
            categories.map(category =>
                _jsx(
                    'div',
                    {
                        className: 'space-y-2',
                        children: _jsx(Card, {
                            className: `hover:shadow-md transition-shadow dark:bg-gray-900 dark:text-gray-100`,
                            style: { marginLeft: `${category.level * 24}px` },
                            bodyStyle: { padding: 16 },
                            children: _jsxs('div', {
                                className: 'flex items-center gap-4',
                                children: [
                                    _jsx(Checkbox, {
                                        checked: selectedCategories.includes(
                                            category._id
                                        ),
                                        onChange: e => {
                                            if (e.target.checked)
                                                setSelectedCategories(prev => [
                                                    ...prev,
                                                    category._id,
                                                ]);
                                            else
                                                setSelectedCategories(prev =>
                                                    prev.filter(
                                                        id =>
                                                            id !== category._id
                                                    )
                                                );
                                        },
                                    }),
                                    _jsxs('div', {
                                        className:
                                            'flex-1 grid grid-cols-12 gap-4 items-center',
                                        children: [
                                            _jsxs('div', {
                                                className:
                                                    'col-span-3 flex items-center gap-2',
                                                children: [
                                                    _jsx(
                                                        FolderOpenOutlined,
                                                        {}
                                                    ),
                                                    _jsxs('div', {
                                                        children: [
                                                            _jsx('p', {
                                                                className:
                                                                    'font-semibold',
                                                                children:
                                                                    category.name,
                                                            }),
                                                            _jsx('p', {
                                                                className: `text-sm dark:text-gray-400`,
                                                                children:
                                                                    category.code,
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            _jsx('div', {
                                                className: 'col-span-3',
                                                children: _jsx('p', {
                                                    className: `text-sm dark:text-gray-400`,
                                                    children:
                                                        category.description,
                                                }),
                                            }),
                                            _jsx('div', {
                                                className: 'col-span-1',
                                                children: _jsx(Tag, {
                                                    color: statusColors[
                                                        category.status
                                                    ],
                                                    children:
                                                        category.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        category.status.slice(
                                                            1
                                                        ),
                                                }),
                                            }),
                                            _jsx('div', {
                                                className:
                                                    'col-span-1 text-center',
                                                children: _jsx(Tag, {
                                                    color: 'blue',
                                                    children:
                                                        category.itemCount,
                                                }),
                                            }),
                                            _jsxs('div', {
                                                className: 'col-span-2 text-sm',
                                                children: [
                                                    _jsx('p', {
                                                        children: new Date(
                                                            category.updatedAt
                                                        ).toLocaleString(),
                                                    }),
                                                    _jsx('p', {
                                                        className: 'text-xs',
                                                        children:
                                                            category?.created_by,
                                                    }),
                                                ],
                                            }),
                                            _jsx('div', {
                                                className:
                                                    'col-span-2 flex justify-end',
                                                children: _jsx(Dropdown, {
                                                    overlay: _jsxs(Menu, {
                                                        children: [
                                                            _jsx(Menu.Item, {
                                                                icon: _jsx(
                                                                    EyeOutlined,
                                                                    {}
                                                                ),
                                                                children:
                                                                    'View Details',
                                                            }),
                                                            _jsx(Menu.Item, {
                                                                icon: _jsx(
                                                                    EditOutlined,
                                                                    {}
                                                                ),
                                                                onClick: () =>
                                                                    handleEdit(
                                                                        category
                                                                    ),
                                                                children:
                                                                    'Edit Category',
                                                            }),
                                                            _jsx(Menu.Item, {
                                                                icon: _jsx(
                                                                    PlusOutlined,
                                                                    {}
                                                                ),
                                                                onClick: () =>
                                                                    handleAddSubcategory(
                                                                        category
                                                                    ),
                                                                children:
                                                                    'Add Subcategory',
                                                            }),
                                                            _jsx(
                                                                Menu.Divider,
                                                                {}
                                                            ),
                                                            _jsx(Menu.Item, {
                                                                icon: _jsx(
                                                                    DeleteOutlined,
                                                                    {}
                                                                ),
                                                                danger: true,
                                                                onClick: () =>
                                                                    handleDelete(
                                                                        category
                                                                    ),
                                                                children:
                                                                    'Delete',
                                                            }),
                                                        ],
                                                    }),
                                                    children: _jsx(Button, {
                                                        type: 'text',
                                                        icon: _jsx(
                                                            MoreOutlined,
                                                            {}
                                                        ),
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        }),
                    },
                    category._id
                )
            ),
        ],
    });
}
