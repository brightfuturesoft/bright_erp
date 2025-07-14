'use client';

import React, { useState, useMemo } from 'react';
import {
    Button,
    Card,
    Input,
    Select,
    Table,
    Checkbox,
    Tag,
    Dropdown,
    Menu,
    Switch,
    ConfigProvider,
} from 'antd';
import {
    UploadOutlined,
    DownloadOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    MoreOutlined,
    FolderOpenOutlined,
    BarChartOutlined,
    AppstoreOutlined,
    EyeOutlined,
} from '@ant-design/icons';

// For Ant Design v5, you can use theme config, or for v4, use ConfigProvider with component className overrides

interface Category {
    id: string;
    code: string;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'draft';
    parentId?: string;
    level: number;
    path: string;
    itemCount: number;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    image?: string;
    children: Category[];
}

const statusColors = {
    active: 'green',
    inactive: 'red',
    draft: 'gold',
};

export default function CategoryDashboard() {
    const [categories] = useState<Category[]>([
        {
            id: '1',
            code: 'ELEC',
            name: 'Electronics',
            description: 'Electronic devices and components',
            status: 'active',
            level: 0,
            path: 'Electronics',
            itemCount: 1250,
            createdAt: '2024-01-15',
            updatedAt: '2024-01-20',
            createdBy: 'John Doe',
            children: [
                {
                    id: '2',
                    code: 'ELEC-MOB',
                    name: 'Mobile Devices',
                    description: 'Smartphones, tablets, and accessories',
                    status: 'active',
                    parentId: '1',
                    level: 1,
                    path: 'Electronics > Mobile Devices',
                    itemCount: 450,
                    createdAt: '2024-01-16',
                    updatedAt: '2024-01-18',
                    createdBy: 'Jane Smith',
                    children: [
                        {
                            id: '3',
                            code: 'ELEC-MOB-PHONE',
                            name: 'Smartphones',
                            description: 'Smart mobile phones',
                            status: 'active',
                            parentId: '2',
                            level: 2,
                            path: 'Electronics > Mobile Devices > Smartphones',
                            itemCount: 320,
                            createdAt: '2024-01-17',
                            updatedAt: '2024-01-19',
                            createdBy: 'Mike Johnson',
                            children: [],
                        },
                    ],
                },
                {
                    id: '4',
                    code: 'ELEC-COMP',
                    name: 'Computers',
                    description: 'Desktop and laptop computers',
                    status: 'active',
                    parentId: '1',
                    level: 1,
                    path: 'Electronics > Computers',
                    itemCount: 800,
                    createdAt: '2024-01-16',
                    updatedAt: '2024-01-21',
                    createdBy: 'Sarah Wilson',
                    children: [],
                },
            ],
        },
        {
            id: '5',
            code: 'FASH',
            name: 'Fashion',
            description: 'Clothing and accessories',
            status: 'active',
            level: 0,
            path: 'Fashion',
            itemCount: 2100,
            createdAt: '2024-01-10',
            updatedAt: '2024-01-22',
            createdBy: 'Emily Davis',
            children: [],
        },
        {
            id: '6',
            code: 'HOME',
            name: 'Home & Garden',
            description: 'Home improvement and garden supplies',
            status: 'draft',
            level: 0,
            path: 'Home & Garden',
            itemCount: 0,
            createdAt: '2024-01-25',
            updatedAt: '2024-01-25',
            createdBy: 'Tom Brown',
            children: [],
        },
    ]);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [levelFilter, setLevelFilter] = useState<string>('all');
    const [currentView, setCurrentView] = useState<'tree' | 'table'>('tree');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Flatten categories for table view
    const flattenCategories = (cats: Category[]): Category[] => {
        const result: Category[] = [];
        const flatten = (categories: Category[]) => {
            categories.forEach(cat => {
                result.push(cat);
                if (cat.children.length > 0) {
                    flatten(cat.children);
                }
            });
        };
        flatten(cats);
        return result;
    };

    const flatCategories = useMemo(
        () => flattenCategories(categories),
        [categories]
    );

    // Filter categories
    const filteredCategories = useMemo(() => {
        return flatCategories.filter(cat => {
            const matchesSearch =
                cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cat.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cat.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            const matchesStatus =
                statusFilter === 'all' || cat.status === statusFilter;
            const matchesLevel =
                levelFilter === 'all' || cat.level.toString() === levelFilter;
            return matchesSearch && matchesStatus && matchesLevel;
        });
    }, [flatCategories, searchTerm, statusFilter, levelFilter]);

    // Statistics
    const stats = useMemo(() => {
        const total = flatCategories.length;
        const active = flatCategories.filter(
            cat => cat.status === 'active'
        ).length;
        const inactive = flatCategories.filter(
            cat => cat.status === 'inactive'
        ).length;
        const draft = flatCategories.filter(
            cat => cat.status === 'draft'
        ).length;
        const totalItems = flatCategories.reduce(
            (sum, cat) => sum + cat.itemCount,
            0
        );
        return { total, active, inactive, draft, totalItems };
    }, [flatCategories]);

    const columns = [
        {
            title: (
                <Checkbox
                    checked={
                        selectedCategories.length === filteredCategories.length
                    }
                    onChange={e =>
                        setSelectedCategories(
                            e.target.checked
                                ? filteredCategories.map(cat => cat.id)
                                : []
                        )
                    }
                />
            ),
            dataIndex: 'id',
            render: (_: any, record: Category) => (
                <Checkbox
                    checked={selectedCategories.includes(record.id)}
                    onChange={e => {
                        if (e.target.checked)
                            setSelectedCategories(prev => [...prev, record.id]);
                        else
                            setSelectedCategories(prev =>
                                prev.filter(id => id !== record.id)
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
        { title: 'Updated', dataIndex: 'updatedAt', key: 'updatedAt' },
        { title: 'Created By', dataIndex: 'createdBy', key: 'createdBy' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Category) => (
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item icon={<EyeOutlined />}>View</Menu.Item>
                            <Menu.Item icon={<EditOutlined />}>Edit</Menu.Item>
                            <Menu.Item icon={<PlusOutlined />}>
                                Add Sub
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item
                                icon={<DeleteOutlined />}
                                danger
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

    const renderTreeView = (cats: Category[], level = 0) => {
        return cats.map(category => (
            <div
                key={category.id}
                className="space-y-2"
            >
                <Card
                    className={`hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-900 text-gray-100' : ''}`}
                    style={{ marginLeft: `${level * 24}px` }}
                    bodyStyle={{ padding: 16 }}
                >
                    <div className="flex items-center gap-4">
                        <Checkbox
                            checked={selectedCategories.includes(category.id)}
                            onChange={e => {
                                if (e.target.checked)
                                    setSelectedCategories(prev => [
                                        ...prev,
                                        category.id,
                                    ]);
                                else
                                    setSelectedCategories(prev =>
                                        prev.filter(id => id !== category.id)
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
                                        className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                                    >
                                        {category.code}
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <p
                                    className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                                >
                                    {category.description}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <Tag color={statusColors[category.status]}>
                                    {category.status.charAt(0).toUpperCase() +
                                        category.status.slice(1)}
                                </Tag>
                            </div>
                            <div className="col-span-1 text-center">
                                <Tag color="blue">{category.itemCount}</Tag>
                            </div>
                            <div className="col-span-2 text-sm">
                                <p>{category.updatedAt}</p>
                                <p className="text-xs">{category.createdBy}</p>
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item icon={<EyeOutlined />}>
                                                View Details
                                            </Menu.Item>
                                            <Menu.Item icon={<EditOutlined />}>
                                                Edit Category
                                            </Menu.Item>
                                            <Menu.Item icon={<PlusOutlined />}>
                                                Add Subcategory
                                            </Menu.Item>
                                            <Menu.Divider />
                                            <Menu.Item
                                                icon={<DeleteOutlined />}
                                                danger
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
                {category.children.length > 0 &&
                    renderTreeView(category.children, level + 1)}
            </div>
        ));
    };

    // Ant Design theme algorithm: v5+ supports dark/light natively. For v4 use className overrides (as above).
    // The root element gets either .ant-theme-dark or nothing.
    return (
        <ConfigProvider>
            <div
                className={` "dark:ant-theme-dark dark:bg-gray-950 dark:text-gray-100 bg-white text-gray-900" min-h-screen space-y-6 mt-4`}
            >
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <Card className="dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <span className="text-sm font-medium">
                                Total Categories
                            </span>
                            <FolderOpenOutlined className="text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p
                            className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        >
                            All categories
                        </p>
                    </Card>
                    <Card className="dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <span className="text-sm font-medium">Active</span>
                            <AppstoreOutlined className="text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.active}
                        </div>
                        <p
                            className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        >
                            Currently active
                        </p>
                    </Card>
                    <Card className="dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <span className="text-sm font-medium">Draft</span>
                            <EditOutlined className="text-yellow-600" />
                        </div>
                        <div className="text-2xl font-bold text-yellow-600">
                            {stats.draft}
                        </div>
                        <p
                            className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        >
                            In draft status
                        </p>
                    </Card>
                    <Card className="dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <span className="text-sm font-medium">
                                Total Items
                            </span>
                            <BarChartOutlined className="text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                            {stats.totalItems.toLocaleString()}
                        </div>
                        <p
                            className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        >
                            Items across all categories
                        </p>
                    </Card>
                    <Card className="dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <span className="text-sm font-medium">
                                Avg Items/Category
                            </span>
                            <BarChartOutlined className="text-purple-600" />
                        </div>
                        <div className="text-2xl font-bold text-purple-600">
                            {Math.round(stats.totalItems / stats.total)}
                        </div>
                        <p
                            className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        >
                            Average distribution
                        </p>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card className="dark:bg-gray-900 dark:text-gray-100">
                    <div className="p-4 flex flex-wrap gap-4 items-center">
                        <Input
                            prefix={<AppstoreOutlined />}
                            placeholder="Search categories, codes, or descriptions..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 min-w-[300px]"
                        />
                        <Select
                            value={statusFilter}
                            style={{ width: 150 }}
                            onChange={value => setStatusFilter(value)}
                            options={[
                                { value: 'all', label: 'All Status' },
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                                { value: 'draft', label: 'Draft' },
                            ]}
                            placeholder="Status"
                            className={
                                isDarkMode ? 'bg-gray-900 text-gray-100' : ''
                            }
                        />
                        <Select
                            value={levelFilter}
                            style={{ width: 150 }}
                            onChange={value => setLevelFilter(value)}
                            options={[
                                { value: 'all', label: 'All Levels' },
                                { value: '0', label: 'Level 1' },
                                { value: '1', label: 'Level 2' },
                                { value: '2', label: 'Level 3' },
                            ]}
                            placeholder="Level"
                            className={
                                isDarkMode ? 'bg-gray-900 text-gray-100' : ''
                            }
                        />
                        <div className="flex gap-2">
                            <Button
                                type={
                                    currentView === 'tree'
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={() => setCurrentView('tree')}
                            >
                                Tree View
                            </Button>
                            <Button
                                type={
                                    currentView === 'table'
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={() => setCurrentView('table')}
                            >
                                Table View
                            </Button>
                        </div>
                    </div>
                    {selectedCategories.length > 0 && (
                        <div
                            className={`mt-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center ${isDarkMode ? 'bg-blue-950 text-blue-200' : ''}`}
                        >
                            <span
                                className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}
                            >
                                {selectedCategories.length} categories selected
                            </span>
                            <div className="flex gap-2">
                                <Button>Bulk Edit</Button>
                                <Button>Export Selected</Button>
                                <Button danger>Delete Selected</Button>
                            </div>
                        </div>
                    )}
                </Card>

                {/* Content */}
                <div className="dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 rounded-t border">
                    <div className="p-0">
                        {currentView === 'tree' ? (
                            <div className="p-4 space-y-2">
                                {/* Tree Header */}
                                <div
                                    className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg text-sm font-medium dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700`}
                                >
                                    <div className="col-span-3 flex items-center gap-2">
                                        <Checkbox
                                            checked={
                                                selectedCategories.length ===
                                                filteredCategories.length
                                            }
                                            onChange={e =>
                                                setSelectedCategories(
                                                    e.target.checked
                                                        ? filteredCategories.map(
                                                              cat => cat.id
                                                          )
                                                        : []
                                                )
                                            }
                                        />
                                        Category
                                    </div>
                                    <div className="col-span-3">
                                        Description
                                    </div>
                                    <div className="col-span-1">Status</div>
                                    <div className="col-span-1 text-center">
                                        Items
                                    </div>
                                    <div className="col-span-2">
                                        Last Updated
                                    </div>
                                    <div className="col-span-2 text-right">
                                        Actions
                                    </div>
                                </div>
                                {renderTreeView(categories)}
                            </div>
                        ) : (
                            <Table
                                columns={columns}
                                dataSource={filteredCategories}
                                rowKey="id"
                                pagination={{ pageSize: 10 }}
                                className={isDarkMode ? 'ant-table-dark' : ''}
                            />
                        )}
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}
