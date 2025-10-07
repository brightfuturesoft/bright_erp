import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// @ts-nocheck
import { ReloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button, Dropdown, Select, Space } from 'antd';
import {
    FileDown,
    FileUp,
    Filter,
    MoreVertical,
    Plus,
    Search,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../../../../../common/SearchBar';
import DashboardContentHeader from '../../../../../../wraper/DashboardContentHeader';
import DashboardTitle from '@/Pages/Modules/CommonComponents/DashboardTitle';
const { Option } = Select;
const CustomerAction = ({
    searchText,
    handleSearch,
    filterCustomerType,
    handleFilterChange,
    filterCustomerStatus,
    start,
    loading,
    hasSelected,
    searchOn,
    setSearchOn,
    shareMenu,
    exportMenu,
    pageSize,
    handlePageSizeChange,
}) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [filterActionOn, setFilterActionOn] = useState(false);
    const handleMenuClick = e => {
        e.preventDefault();
        setDropdownVisible(true);
    };
    const items = [
        {
            label: _jsxs(Link, {
                className: 'flex items-center gap-1',
                to: 'add-customer',
                onClick: handleMenuClick,
                children: [
                    _jsx(Plus, {
                        size: 16,
                        className: `${loading ? 'rotate-45' : 'rotate-0'} duration-150`,
                    }),
                    ' ',
                    'Add Customer',
                ],
            }),
            key: '0',
        },
        {
            label: _jsxs('button', {
                className:
                    'flex dark:!text-light !text-dark !bg-transparent !px-0 !justify-start !text-start gap-1 w-full !items-center !border-none',
                onClick: handleMenuClick,
                children: [
                    _jsx(ReloadOutlined, {
                        className: `${loading ? 'rotate-45' : 'rotate-0'} duration-150`,
                    }),
                    ' ',
                    'Reload',
                ],
            }),
            key: '1',
        },
        {
            label: _jsxs('button', {
                onClick: () => {
                    setSearchOn(!searchOn);
                    handleMenuClick;
                },
                className:
                    'flex dark:!text-light !text-dark !bg-transparent !px-0 !justify-start !text-start gap-1 w-full !items-center !border-none',
                children: [_jsx(Search, { size: 15 }), 'Search'],
            }),
            key: '2',
        },
        {
            label: _jsx('div', {
                children: _jsx(Dropdown, {
                    overlay: shareMenu,
                    trigger: ['click'],
                    children: _jsxs('p', {
                        className:
                            'flex dark:!text-light !text-dark !bg-transparent !px-0 !justify-start !text-start gap-1 w-full !items-center !border-none',
                        onClick: handleMenuClick,
                        children: [_jsx(ShareAltOutlined, {}), ' Share'],
                    }),
                }),
            }),
            key: '3',
        },
        {
            label: _jsx('div', {
                children: _jsxs('p', {
                    className:
                        'flex dark:!text-light !text-dark !bg-transparent !px-0 !justify-start !text-start gap-1 w-full !items-center !border-none',
                    onClick: handleMenuClick,
                    children: [_jsx(FileUp, { size: 17 }), ' Import'],
                }),
            }),
            key: '4',
        },
        {
            label: _jsx('div', {
                children: _jsx(Dropdown, {
                    overlay: exportMenu,
                    trigger: ['click'],
                    children: _jsxs(Button, {
                        className:
                            'flex dark:!text-light !text-dark !my-0 !py-0 !bg-transparent !px-0 !justify-start !text-start gap-1 w-full !items-center !border-none',
                        disabled: !hasSelected,
                        onClick: handleMenuClick,
                        children: [_jsx(FileDown, { size: 17 }), ' Export'],
                    }),
                }),
            }),
            key: '5',
        },
    ];
    const exportMenuItems =
        exportMenu?.items?.map(item => ({
            ...item,
            disabled: !hasSelected,
        })) || [];
    return _jsxs('div', {
        children: [
            _jsxs(DashboardContentHeader, {
                children: [
                    _jsx(DashboardTitle, { title: 'E-Commerce Customer' }),
                    _jsx('div', {
                        className: 'md:hidden block',
                        children: _jsx(Dropdown, {
                            menu: { items },
                            trigger: ['click'],
                            visible: dropdownVisible,
                            onVisibleChange: setDropdownVisible,
                            children: _jsx('a', {
                                onClick: e => e.preventDefault(),
                                children: _jsx(Space, {
                                    children: _jsx(Button, {
                                        className:
                                            'dark:!bg-gray-700 dark:text-light dark:border-none',
                                        shape: 'circle',
                                        children: _jsx(MoreVertical, {
                                            size: 16,
                                        }),
                                    }),
                                }),
                            }),
                        }),
                    }),
                ],
            }),
            _jsxs('div', {
                className: 'flex md:py-4 py-2 items-center justify-between',
                children: [
                    _jsxs('h1', {
                        className:
                            'font-bold text-sm md:flex hidden items-center gap-1',
                        children: [_jsx(Filter, { size: 16 }), ' Filter'],
                    }),
                    _jsxs('h1', {
                        onClick: () => setFilterActionOn(!filterActionOn),
                        className:
                            'font-bold text-sm md:hidden flex items-center dark:bg-gray-700 px-3 py-1 rounded gap-1',
                        children: [_jsx(Filter, { size: 16 }), ' Filter'],
                    }),
                    _jsxs('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            _jsx('div', {
                                className: 'md:block hidden relative',
                                children: _jsx(SearchBar, {
                                    width: '100%',
                                    searchText: searchText,
                                    handleSearch: handleSearch,
                                }),
                            }),
                            _jsxs(Select, {
                                className: '!w-[120px] md:block hidden',
                                placeholder: 'Type',
                                value: filterCustomerType,
                                onChange: value =>
                                    handleFilterChange('customerType', value),
                                children: [
                                    _jsx(Option, {
                                        value: '',
                                        children: 'All Types',
                                    }),
                                    _jsx(Option, {
                                        value: 'Regular',
                                        children: 'Regular',
                                    }),
                                    _jsx(Option, {
                                        value: 'Premium',
                                        children: 'Premium',
                                    }),
                                ],
                            }),
                            _jsxs(Select, {
                                className: '!w-[120px] md:block hidden',
                                placeholder: 'Status',
                                value: filterCustomerStatus,
                                onChange: value =>
                                    handleFilterChange('customerStatus', value),
                                children: [
                                    _jsx(Option, {
                                        value: '',
                                        children: 'All Status',
                                    }),
                                    _jsx(Option, {
                                        value: 'Active',
                                        children: 'Active',
                                    }),
                                    _jsx(Option, {
                                        value: 'Inactive',
                                        children: 'Inactive',
                                    }),
                                ],
                            }),
                            _jsxs(Select, {
                                className: '!w-[80px] md:block hidden',
                                placeholder: 'Page Size',
                                value: pageSize,
                                onChange: handlePageSizeChange,
                                children: [
                                    _jsx(Option, { value: 5, children: '5' }),
                                    _jsx(Option, { value: 10, children: '10' }),
                                    _jsx(Option, { value: 15, children: '15' }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            filterActionOn &&
                _jsxs('div', {
                    className:
                        'flex overflow-hidden flex-wrap items-center gap-2',
                    children: [
                        _jsxs(Select, {
                            className: '!w-[110px] md:hidden block',
                            placeholder: 'Type',
                            value: filterCustomerType,
                            onChange: value =>
                                handleFilterChange('customerType', value),
                            children: [
                                _jsx(Option, {
                                    value: '',
                                    children: 'All Types',
                                }),
                                _jsx(Option, {
                                    value: 'Regular',
                                    children: 'Regular',
                                }),
                                _jsx(Option, {
                                    value: 'Premium',
                                    children: 'Premium',
                                }),
                            ],
                        }),
                        _jsxs(Select, {
                            className: '!w-[110px] md:hidden block',
                            placeholder: 'Status',
                            value: filterCustomerStatus,
                            onChange: value =>
                                handleFilterChange('customerStatus', value),
                            children: [
                                _jsx(Option, {
                                    value: '',
                                    children: 'All Status',
                                }),
                                _jsx(Option, {
                                    value: 'Active',
                                    children: 'Active',
                                }),
                                _jsx(Option, {
                                    value: 'Inactive',
                                    children: 'Inactive',
                                }),
                            ],
                        }),
                        _jsxs(Select, {
                            className: '!w-[80px] md:hidden block',
                            placeholder: 'Page Size',
                            value: pageSize,
                            onChange: handlePageSizeChange,
                            children: [
                                _jsx(Option, { value: 5, children: '5' }),
                                _jsx(Option, { value: 10, children: '10' }),
                                _jsx(Option, { value: 15, children: '15' }),
                            ],
                        }),
                    ],
                }),
        ],
    });
};
export default CustomerAction;
