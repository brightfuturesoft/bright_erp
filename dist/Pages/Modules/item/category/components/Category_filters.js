import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
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
}) {
    return _jsx('div', {
        className: 'dark:bg-gray-900 dark:text-gray-100',
        children: _jsxs('div', {
            className: 'p-4 flex flex-wrap gap-4 items-center',
            children: [
                _jsx(Input, {
                    prefix: _jsx(AppstoreOutlined, {}),
                    placeholder: 'Search categories, codes, or descriptions...',
                    value: searchTerm,
                    onChange: e => setSearchTerm(e.target.value),
                    className:
                        'dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 min-w-[300px]',
                }),
                _jsx(Select, {
                    value: statusFilter,
                    style: { width: 150 },
                    onChange: value => setStatusFilter(value),
                    options: [
                        { value: 'all', label: 'All Status' },
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                        { value: 'draft', label: 'Draft' },
                    ],
                    placeholder: 'Status',
                    className: ' dark:bg-gray-900 text-gray-100',
                }),
                _jsx(Select, {
                    value: levelFilter,
                    style: { width: 150 },
                    onChange: value => setLevelFilter(value),
                    options: [
                        { value: 'all', label: 'All Levels' },
                        { value: '0', label: 'Level 1' },
                        { value: '1', label: 'Level 2' },
                        { value: '2', label: 'Level 3' },
                    ],
                    placeholder: 'Level',
                    className: ' dark:bg-gray-900 text-gray-100',
                }),
                _jsxs('div', {
                    className: 'flex gap-2',
                    children: [
                        _jsx(Button, {
                            type:
                                currentView === 'tree' ? 'primary' : 'default',
                            onClick: () => setCurrentView('tree'),
                            children: 'Tree View',
                        }),
                        _jsx(Button, {
                            type:
                                currentView === 'table' ? 'primary' : 'default',
                            onClick: () => setCurrentView('table'),
                            children: 'Table View',
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'flex-1 flex justify-end gap-2',
                    children: [
                        _jsx(Button, {
                            className:
                                'dark:bg-gray-900 dark:text-gray-100 group',
                            icon: _jsx(DownloadOutlined, {
                                className: 'group-hover:text-gray-900',
                            }),
                            onClick: () => handleExport('all'),
                            children: 'Export All',
                        }),
                        _jsx(Button, {
                            className:
                                'dark:bg-gray-900 dark:text-gray-100 group',
                            icon: _jsx(DownloadOutlined, {
                                className: 'group-hover:text-gray-900',
                            }),
                            disabled: disableExportSelected,
                            onClick: () => handleExport('selected'),
                            children: 'Export Selected',
                        }),
                        _jsx(Button, {
                            className:
                                'dark:bg-gray-900 dark:text-gray-100 group',
                            icon: _jsx(UploadOutlined, {
                                className: 'group-hover:text-gray-900',
                            }),
                            onClick: handleImportClick,
                            children: 'Import',
                        }),
                        _jsx(Button, {
                            className:
                                'dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-700 group',
                            icon: _jsx(PlusOutlined, {
                                className: 'group-hover:text-gray-900',
                            }),
                            onClick: handleAddRootCategory,
                            children: 'Add Category',
                        }),
                    ],
                }),
            ],
        }),
    });
}
