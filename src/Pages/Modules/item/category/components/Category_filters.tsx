import React from 'react';
import { Button, Input, Select } from 'antd';
import {
    AppstoreOutlined,
    DownloadOutlined,
    UploadOutlined,
    PlusOutlined,
} from '@ant-design/icons';

export default function Category_filters({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    levelFilter,
    setLevelFilter,
    currentView,
    setCurrentView,
    handleExport,
    handleImportClick,
    handleAddRootCategory,
    disableExportSelected,
}: any) {
    return (
        <div className="dark:bg-gray-900 dark:text-gray-100">
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
                    className={' dark:bg-gray-900 text-gray-100'}
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
                    className={' dark:bg-gray-900 text-gray-100'}
                />
                <div className="flex gap-2">
                    <Button
                        type={currentView === 'tree' ? 'primary' : 'default'}
                        onClick={() => setCurrentView('tree')}
                    >
                        Tree View
                    </Button>
                    <Button
                        type={currentView === 'table' ? 'primary' : 'default'}
                        onClick={() => setCurrentView('table')}
                    >
                        Table View
                    </Button>
                </div>
                <div className="flex-1 flex justify-end gap-2">
                    <Button
                        className="dark:bg-gray-900 dark:text-gray-100 group"
                        icon={
                            <DownloadOutlined className="group-hover:text-gray-900" />
                        }
                        onClick={() => handleExport('all')}
                    >
                        Export All
                    </Button>
                    <Button
                        className="dark:bg-gray-900 dark:text-gray-100 group"
                        icon={
                            <DownloadOutlined className="group-hover:text-gray-900" />
                        }
                        disabled={disableExportSelected}
                        onClick={() => handleExport('selected')}
                    >
                        Export Selected
                    </Button>
                    <Button
                        className="dark:bg-gray-900 dark:text-gray-100 group"
                        icon={
                            <UploadOutlined className="group-hover:text-gray-900" />
                        }
                        onClick={handleImportClick}
                    >
                        Import
                    </Button>
                    <Button
                        className="dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-700 group"
                        icon={
                            <PlusOutlined className="group-hover:text-gray-900" />
                        }
                        onClick={handleAddRootCategory}
                    >
                        Add Category
                    </Button>
                </div>
            </div>
        </div>
    );
}
