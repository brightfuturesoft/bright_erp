import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button, Select, Input, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
const CustomerAction = ({
    searchText,
    handleSearch,
    filterCustomerType,
    filterCustomerStatus,
    handleFilterChange,
    clearFilters,
    start,
    loading,
    hasSelected,
    pageSize,
    handlePageSizeChange,
}) => {
    const commonClass =
        'h-10 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white';
    return _jsxs('div', {
        className:
            'flex flex-col md:flex-row justify-between items-center gap-2 mb-4',
        children: [
            _jsxs(Space, {
                wrap: true,
                className: 'flex-1',
                children: [
                    _jsx(Input, {
                        value: searchText,
                        onChange: handleSearch,
                        placeholder: 'Search customers...',
                        className: `${commonClass} w-64 items-center`,
                        allowClear: true,
                    }),
                    _jsx(Select, {
                        value: filterCustomerType,
                        onChange: val =>
                            handleFilterChange('customerType', val),
                        placeholder: 'Customer Type',
                        className: `${commonClass} w-40`,
                        options: [
                            { value: '', label: 'All Types' },
                            { value: 'POS', label: 'POS' },
                            { value: 'Ecommerce', label: 'E-commerce' },
                        ],
                        suffixIcon: _jsx(DownOutlined, {
                            className: classNames('text-black dark:text-white'),
                        }),
                    }),
                    _jsx(Select, {
                        value: filterCustomerStatus,
                        onChange: val =>
                            handleFilterChange('customerStatus', val),
                        placeholder: 'Customer Status',
                        className: `${commonClass} w-40`,
                        options: [
                            { value: '', label: 'All Status' },
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                        ],
                        suffixIcon: _jsx(DownOutlined, {
                            className: classNames('text-black dark:text-white'),
                        }),
                    }),
                    _jsx(Select, {
                        value: pageSize,
                        onChange: handlePageSizeChange,
                        className: `${commonClass} w-32`,
                        options: [
                            { value: 5, label: '5' },
                            { value: 10, label: '10' },
                            { value: 15, label: '15' },
                        ],
                        suffixIcon: _jsx(DownOutlined, {
                            className: classNames('text-black dark:text-white'),
                        }),
                    }),
                    _jsx(Button, {
                        type: 'default',
                        onClick: clearFilters,
                        className:
                            'h-10 dark:bg-gray-600 dark:text-white dark:border-gray-500',
                        children: 'Clear Filters',
                    }),
                ],
            }),
            _jsxs('div', {
                className: 'flex items-center gap-2 mt-2 md:mt-0',
                children: [
                    hasSelected &&
                        _jsxs('span', {
                            className: 'dark:text-white',
                            children: [hasSelected, ' selected'],
                        }),
                    _jsx(Button, {
                        type: 'primary',
                        onClick: start,
                        loading: loading,
                        className: 'h-10',
                        children: 'Add Customer',
                    }),
                ],
            }),
        ],
    });
};
export default CustomerAction;
