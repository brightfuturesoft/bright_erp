import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Table, Checkbox, Tag, Button, Dropdown, Menu } from 'antd';
import {
    EyeOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    MoreOutlined,
} from '@ant-design/icons';
export default function Category_table({
    categories,
    selectedCategories,
    setSelectedCategories,
    handleEdit,
    handleAddSubcategory,
    handleDelete,
    statusColors,
}) {
    const columns = [
        {
            title: _jsx(Checkbox, {
                checked:
                    selectedCategories.length === categories.length &&
                    categories.length > 0,
                indeterminate:
                    selectedCategories.length > 0 &&
                    selectedCategories.length < categories.length,
                onChange: e =>
                    setSelectedCategories(
                        e.target.checked ? categories.map(cat => cat._id) : []
                    ),
            }),
            dataIndex: '_id',
            render: (_, record) =>
                _jsx(Checkbox, {
                    checked: selectedCategories.includes(record._id),
                    onChange: e => {
                        if (e.target.checked)
                            setSelectedCategories(prev => [
                                ...prev,
                                record._id,
                            ]);
                        else
                            setSelectedCategories(prev =>
                                prev.filter(id => id !== record._id)
                            );
                    },
                }),
            width: 50,
        },
        { title: 'Code', dataIndex: 'code', key: 'code' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Path', dataIndex: 'path', key: 'path' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status =>
                _jsx(Tag, {
                    color: statusColors[status],
                    children: status.charAt(0).toUpperCase() + status.slice(1),
                }),
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            render: level =>
                _jsx(Tag, { color: 'purple', children: `L${level + 1}` }),
        },
        {
            title: 'Items',
            dataIndex: 'itemCount',
            key: 'itemCount',
            render: count => _jsx(Tag, { color: 'blue', children: count }),
        },
        {
            title: 'Updated',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: text =>
                _jsx('p', { children: new Date(text).toLocaleString() }),
        },
        {
            title: 'Created By',
            dataIndex: 'created_by',
            key: 'created_by',
            render: text => _jsx('p', { children: text }),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) =>
                _jsx(Dropdown, {
                    overlay: _jsxs(Menu, {
                        children: [
                            _jsx(Menu.Item, {
                                icon: _jsx(EyeOutlined, {}),
                                children: 'View',
                            }),
                            _jsx(Menu.Item, {
                                icon: _jsx(EditOutlined, {}),
                                onClick: () => handleEdit(record),
                                children: 'Edit',
                            }),
                            _jsx(Menu.Item, {
                                icon: _jsx(PlusOutlined, {}),
                                onClick: () => handleAddSubcategory(record),
                                children: 'Add Sub',
                            }),
                            _jsx(Menu.Divider, {}),
                            _jsx(Menu.Item, {
                                icon: _jsx(DeleteOutlined, {}),
                                danger: true,
                                onClick: () => handleDelete(record),
                                children: 'Delete',
                            }),
                        ],
                    }),
                    children: _jsx(Button, {
                        type: 'text',
                        icon: _jsx(MoreOutlined, {}),
                    }),
                }),
            align: 'right',
        },
    ];
    return _jsx(Table, {
        columns: columns,
        dataSource: categories,
        rowKey: '_id',
        pagination: { pageSize: 10 },
        className: 'dark:ant-table-dark',
    });
}
