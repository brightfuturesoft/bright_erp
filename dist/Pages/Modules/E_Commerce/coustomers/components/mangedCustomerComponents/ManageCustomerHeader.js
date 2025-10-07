import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button, Dropdown, Menu, Select } from 'antd';
import {
    ReloadOutlined,
    SearchOutlined,
    PlusOutlined,
    ShareAltOutlined,
    FileUp,
    FileDown,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { MessageSquareMore, Mail, Edit } from 'lucide-react';
const { Option } = Select;
const ManageCustomerHeader = ({
    searchText,
    setSearchOn,
    handleSearch,
    filterCustomerType,
    setFilterCustomerType,
    filterCustomerStatus,
    setFilterCustomerStatus,
}) => {
    const handleFilterChange = (type, value) => {
        if (type === 'customerType') {
            setFilterCustomerType(value);
        } else {
            setFilterCustomerStatus(value);
        }
    };
    const shareMenu = _jsxs(Menu, {
        onClick: handleMenuClick,
        children: [
            _jsx(
                Menu.Item,
                {
                    children: _jsxs('div', {
                        className: 'flex items-center gap-1 w-[100px]',
                        children: [
                            _jsx(MessageSquareMore, {
                                size: 21,
                                strokeWidth: 1,
                            }),
                            ' ',
                            'SMS',
                        ],
                    }),
                },
                '1'
            ),
            _jsx(
                Menu.Item,
                {
                    children: _jsxs('div', {
                        className: 'flex items-center gap-1 w-[100px]',
                        children: [
                            _jsx(Mail, { size: 21, strokeWidth: 1 }),
                            ' ',
                            'Email',
                        ],
                    }),
                },
                '2'
            ),
        ],
    });
    const menu = _jsxs(Menu, {
        className: 'w-[160px]',
        children: [
            _jsx(
                Menu.Item,
                {
                    onClick: () => handleEdit(record),
                    children: _jsxs('div', {
                        className: 'flex items-center gap-1',
                        children: [_jsx(Edit, { size: 17 }), ' Edit'],
                    }),
                },
                'edit'
            ),
            _jsx(
                Menu.Item,
                {
                    onClick: () => handleDelete(record.key),
                    children: _jsxs('div', {
                        className: 'flex items-center gap-1',
                        children: [_jsx(DeleteOutlined, {}), ' Delete'],
                    }),
                },
                'delete'
            ),
        ],
    });
    const handleMenuClick = e => {
        message.info('Click on menu item.');
    };
    return _jsxs('div', {
        className:
            'flex items-center md:gap-2 gap-1 md:w-[85%] w-[90vw] justify-end',
        children: [
            _jsx(SearchBar, {
                width: '100%',
                searchText: searchText,
                handleSearch: handleSearch,
            }),
            _jsxs(Select, {
                className: '!w-[120px] md:block hidden',
                placeholder: 'Type',
                value: filterCustomerType,
                onChange: value => handleFilterChange('customerType', value),
                children: [
                    _jsx(Option, { value: '', children: 'All Types' }),
                    _jsx(Option, { value: 'Regular', children: 'Regular' }),
                    _jsx(Option, { value: 'Premium', children: 'Premium' }),
                ],
            }),
            _jsxs(Select, {
                className: '!w-[120px] md:block hidden',
                placeholder: 'Status',
                value: filterCustomerStatus,
                onChange: value => handleFilterChange('customerStatus', value),
                children: [
                    _jsx(Option, { value: '', children: 'All Status' }),
                    _jsx(Option, { value: 'Active', children: 'Active' }),
                    _jsx(Option, { value: 'Inactive', children: 'Inactive' }),
                ],
            }),
            _jsx(Link, {
                className:
                    '!bg-[#3946d1] w-[65px] h-[40px] hidden md:flex items-center justify-center rounded-md !border-none !text-white text-nowrap text-sm',
                to: `create-customer`,
                children: '+ Add',
            }),
            _jsx(Link, {
                className:
                    '!bg-[#3946d1] w-[31px] h-[31px] md:hidden flex items-center justify-center rounded-full !border-none !text-white text-nowrap text-sm',
                to: `create-customer`,
                children: _jsx(PlusOutlined, { style: { fontSize: 14 } }),
            }),
            _jsx(Button, {
                className:
                    '!bg-[#3946d1] rounded-full md:hidden block !border-none !text-white',
                size: 'medium',
                shape: 'circle',
                type: 'primary',
                onClick: start,
                disabled: !hasSelected,
                loading: loading,
                icon: _jsx(ReloadOutlined, {
                    className: `${loading ? 'rotate-45' : 'rotate-0'} duration-150`,
                }),
            }),
            _jsx(Button, {
                className:
                    '!bg-[#3946d1]  md:flex hidden items-center gap-1 py-[20px] !border-none !text-white',
                size: 'medium',
                shape: 'default',
                type: 'primary',
                onClick: start,
                disabled: !hasSelected,
                loading: loading,
                children: 'Reload',
            }),
            _jsx(Button, {
                onClick: () => setSearchOn(!searchOn),
                className:
                    '!bg-[#3946d1] rounded-full md:hidden flex !border-none !text-white',
                size: 'medium',
                shape: 'circle',
                type: 'primary',
                icon: _jsx(SearchOutlined, { style: { fontSize: 16 } }),
            }),
            _jsx(Dropdown, {
                overlay: shareMenu,
                trigger: ['click'],
                children: _jsx(Button, {
                    className:
                        '!bg-[#3946d1] h-[40px] !border-none !text-white',
                    size: 'middle',
                    type: 'primary',
                    icon: _jsx(ShareAltOutlined, {}),
                    children: 'Share',
                }),
            }),
            _jsx(Button, {
                className:
                    '!bg-[#3946d1] !border-none h-[40px] flex gap-1 !text-white',
                size: 'middle',
                type: 'primary',
                icon: _jsx(FileUp, { size: 17 }),
                children: 'Import',
            }),
            _jsx(Button, {
                className:
                    '!bg-[#3946d1] !border-none h-[40px] flex gap-1 !text-white',
                size: 'middle',
                type: 'primary',
                icon: _jsx(FileDown, { size: 17 }),
                children: 'Export',
            }),
        ],
    });
};
export default ManageCustomerHeader;
