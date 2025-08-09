'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
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
    Modal,
    Form,
    ConfigProvider,
    message,
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
import Upload from 'antd/es/upload/Upload';

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
}

const statusColors = {
    active: 'green',
    inactive: 'red',
    draft: 'gold',
};

const initialCategories: Category[] = [
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
    },
];

export default function CategoryDashboard() {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [levelFilter, setLevelFilter] = useState<string>('all');
    const [currentView, setCurrentView] = useState<'tree' | 'table'>('tree');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Modal/Edit/Add states
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null
    );
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Add modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addParentCategory, setAddParentCategory] = useState<Category | null>(
        null
    );

    const [form] = Form.useForm();

    // Export/Import refs
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (editingCategory) {
            form.setFieldsValue(editingCategory);
        } else {
            form.resetFields();
        }
    }, [editingCategory, form]);

    // Filtering logic
    const filteredCategories = useMemo(() => {
        return categories.filter(cat => {
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
    }, [categories, searchTerm, statusFilter, levelFilter]);

    // Statistics
    const stats = useMemo(() => {
        const total = categories.length;
        const active = categories.filter(cat => cat.status === 'active').length;
        const inactive = categories.filter(
            cat => cat.status === 'inactive'
        ).length;
        const draft = categories.filter(cat => cat.status === 'draft').length;
        const totalItems = categories.reduce(
            (sum, cat) => sum + Number(cat.itemCount),
            0
        );
        return { total, active, inactive, draft, totalItems };
    }, [categories]);

    // Edit Handler
    function handleEdit(category: Category) {
        setEditingCategory(category);
        setIsEditModalOpen(true);
    }

    function handleEditSave(values: Partial<Category>) {
        if (editingCategory) {
            setCategories(prev =>
                prev.map(cat =>
                    cat.id === editingCategory.id ? { ...cat, ...values } : cat
                )
            );
            console.log('Edited:', { ...editingCategory, ...values });
            setIsEditModalOpen(false);
            setEditingCategory(null);
        }
    }

    // Delete Handler
    function handleDelete(category: Category) {
        // Recursively delete children
        function getDescendantIds(id: string): string[] {
            const childIds = categories
                .filter(cat => cat.parentId === id)
                .flatMap(cat => [cat.id, ...getDescendantIds(cat.id)]);
            return childIds;
        }
        const idsToDelete = [category.id, ...getDescendantIds(category.id)];
        setCategories(prev =>
            prev.filter(cat => !idsToDelete.includes(cat.id))
        );
        setSelectedCategories(prev =>
            prev.filter(id => !idsToDelete.includes(id))
        );
        console.log('Deleted:', category);
    }

    // Add Subcategory Handler
    function handleAddSubcategory(parent: Category) {
        setAddParentCategory(parent);
        setIsAddModalOpen(true);
        setTimeout(() => {
            form.resetFields();
        }, 0);
    }

    // Add New Root Category Handler
    function handleAddRootCategory() {
        setAddParentCategory(null);
        setIsAddModalOpen(true);
        setTimeout(() => {
            form.resetFields();
        }, 0);
    }

    // Save new category
    function handleAddSave(values: Partial<Category>) {
        const now = new Date().toISOString().slice(0, 10);
        const id = Date.now().toString();
        let level = 0;
        let path = values.name || '';
        let parentId: string | undefined = undefined;
        if (addParentCategory) {
            level = addParentCategory.level + 1;
            path = `${addParentCategory.path} > ${values.name}`;
            parentId = addParentCategory.id;
        }
        const newCat: Category = {
            id,
            code: values.code ?? '',
            name: values.name ?? '',
            description: values.description ?? '',
            status: (values.status as any) ?? 'draft',
            parentId,
            level,
            path,
            itemCount: values.itemCount ?? 0,
            createdAt: now,
            updatedAt: now,
            createdBy: values.createdBy ?? 'System',
        };
        setCategories(prev => [...prev, newCat]);
        setIsAddModalOpen(false);
        setAddParentCategory(null);
        console.log('Added:', newCat);
    }

    // EXPORT CATEGORIES
    function handleExport(allOrSelected: 'all' | 'selected') {
        let dataToExport: Category[] =
            allOrSelected === 'all'
                ? categories
                : categories.filter(cat => selectedCategories.includes(cat.id));
        const jsonStr = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download =
            allOrSelected === 'all'
                ? 'categories_export.json'
                : 'categories_selected_export.json';
        a.click();
        URL.revokeObjectURL(url);
        message.success('Exported categories as JSON');
    }

    // IMPORT CATEGORIES FROM FILE
    function handleImportClick() {
        fileInputRef.current?.click();
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            try {
                const json = JSON.parse(ev.target?.result as string);
                if (Array.isArray(json)) {
                    // Simple merge: add new, skip duplicates by id
                    setCategories(prev => {
                        const ids = new Set(prev.map(c => c.id));
                        const merged = [
                            ...prev,
                            ...json.filter((cat: Category) => !ids.has(cat.id)),
                        ];
                        return merged;
                    });
                    message.success('Imported categories');
                    console.log('Imported:', json);
                } else {
                    message.error('Invalid file format');
                }
            } catch {
                message.error('Failed to parse JSON file');
            }
        };
        reader.readAsText(file);
        // Reset input so same file can be chosen again if needed
        e.target.value = '';
    }

    // Render tree from flat array
    const renderTreeView = (parentId?: string, level = 0) => {
        // Only show filtered categories
        const nodes = filteredCategories.filter(
            cat => cat.parentId === parentId
        );

        return nodes.map(category => (
            <div
                key={category.id}
                className="space-y-2"
            >
                <Card
                    className={`hover:shadow-md transition-shadow dark:bg-gray-900 dark:text-gray-100`}
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
                                    <p className={`text-sm dark:text-gray-400`}>
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
                {/* Recursively render subcategories */}
                {renderTreeView(category.id, level + 1)}
            </div>
        ));
    };

    const columns = [
        {
            title: (
                <Checkbox
                    checked={
                        selectedCategories.length ===
                            filteredCategories.length &&
                        filteredCategories.length > 0
                    }
                    indeterminate={
                        selectedCategories.length > 0 &&
                        selectedCategories.length < filteredCategories.length
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
        <ConfigProvider>
            <input
                type="file"
                accept=".json,application/json"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div
                className={`"dark:ant-theme-dark dark:bg-gray-950 dark:text-gray-100 bg-white text-gray-900" min-h-screen space-y-6 mt-4`}
            >
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* ... statistics cards as before ... */}
                    <Card className="dark:bg-gray-900 dark:text-gray-100">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <span className="text-sm font-medium">
                                Total Categories
                            </span>
                            <FolderOpenOutlined className="text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className={`text-xs dark:text-gray-400`}>
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
                        <p className={`text-xs dark:text-gray-400`}>
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
                        <p className={`text-xs dark:text-gray-400`}>
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
                        <p className={`text-xs dark:text-gray-400`}>
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
                            {stats.total
                                ? Math.round(stats.totalItems / stats.total)
                                : 0}
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
                        <div className="flex-1 flex justify-end gap-2">
                            <Button
                                icon={<DownloadOutlined />}
                                onClick={() => handleExport('all')}
                            >
                                Export All
                            </Button>
                            <Button
                                className="dark:bg-gray-900 dark:text-gray-100"
                                icon={<DownloadOutlined />}
                                disabled={selectedCategories.length === 0}
                                onClick={() => handleExport('selected')}
                            >
                                Export Selected
                            </Button>
                            <Button
                                icon={<UploadOutlined />}
                                onClick={handleImportClick}
                            >
                                Import
                            </Button>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={handleAddRootCategory}
                            >
                                Add Category
                            </Button>
                        </div>
                    </div>
                    {selectedCategories.length > 0 && (
                        <div
                            className={`mt-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center dark:bg-blue-950 dark:text-blue-200`}
                        >
                            <span className={`text-sm dark:text-blue-200`}>
                                {selectedCategories.length} categories selected
                            </span>
                            <div className="flex gap-2">
                                <Button>Bulk Edit</Button>
                                <Button
                                    danger
                                    onClick={() => {
                                        selectedCategories.forEach(id => {
                                            const cat = categories.find(
                                                c => c.id === id
                                            );
                                            if (cat) handleDelete(cat);
                                        });
                                        setSelectedCategories([]);
                                    }}
                                >
                                    Delete Selected
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>

                <div className="dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 rounded-t border">
                    <div className="p-0">
                        {currentView === 'tree' ? (
                            <div className="p-4 space-y-2">
                                <div
                                    className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg text-sm font-medium dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700`}
                                >
                                    <div className="col-span-3 flex items-center gap-2">
                                        <Checkbox
                                            checked={
                                                selectedCategories.length ===
                                                    filteredCategories.length &&
                                                filteredCategories.length > 0
                                            }
                                            indeterminate={
                                                selectedCategories.length > 0 &&
                                                selectedCategories.length <
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
                                {renderTreeView(undefined, 0)}
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

                <Modal
                    title="Edit Category"
                    open={isEditModalOpen}
                    onCancel={() => {
                        setIsEditModalOpen(false);
                        setEditingCategory(null);
                    }}
                    onOk={() => {
                        form.validateFields().then(values => {
                            handleEditSave(values);
                        });
                    }}
                    destroyOnClose
                >
                    <Form
                        form={form}
                        layout="vertical"
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            label="Code"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="Status"
                            rules={[{ required: true }]}
                        >
                            <Select
                                options={[
                                    { value: 'active', label: 'Active' },
                                    { value: 'inactive', label: 'Inactive' },
                                    { value: 'draft', label: 'Draft' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            name="itemCount"
                            label="Item Count"
                            initialValue={0}
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item
                            name="createdBy"
                            label="Created By"
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Add Modal */}
                <Modal
                    title={
                        addParentCategory ? 'Add Subcategory' : 'Add Category'
                    }
                    open={isAddModalOpen}
                    onCancel={() => {
                        setIsAddModalOpen(false);
                        setAddParentCategory(null);
                    }}
                    onOk={() => {
                        form.validateFields().then(values => {
                            handleAddSave(values);
                        });
                    }}
                    destroyOnClose
                >
                    <Form
                        form={form}
                        layout="vertical"
                    >
                        <Form.Item
                            name="image"
                            label="Upload Image"
                            valuePropName="fileList"
                            getValueFromEvent={e =>
                                Array.isArray(e) ? e : e?.fileList
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Please upload an image!',
                                },
                            ]}
                        >
                            <Upload
                                listType="picture-card"
                                beforeUpload={() => false} // Don't auto-upload
                                maxCount={1}
                                accept="image/*"
                            >
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            label="Code"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="Status"
                            initialValue="draft"
                            rules={[{ required: true }]}
                        >
                            <Select
                                options={[
                                    { value: 'active', label: 'Active' },
                                    { value: 'inactive', label: 'Inactive' },
                                    { value: 'draft', label: 'Draft' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            name="itemCount"
                            label="Item Count"
                            initialValue={0}
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item
                            name="createdBy"
                            label="Created By"
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </ConfigProvider>
    );
}
