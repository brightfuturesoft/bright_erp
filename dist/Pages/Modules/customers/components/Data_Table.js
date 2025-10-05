import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Table, Dropdown, Button, Menu } from 'antd';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Info, PowerOff, PowerOffIcon } from 'lucide-react';
const CustomerTable = ({
    data,
    selectedRowKeys,
    setSelectedRowKeys,
    pageSize,
    handleStatusUpdate,
    handleDelete,
}) => {
    const rowSelection = {
        selectedRowKeys,
        onChange: keys => setSelectedRowKeys(keys),
    };
    const menu = record =>
        _jsxs(Menu, {
            className: 'w-[160px]',
            children: [
                _jsx(
                    Menu.Item,
                    {
                        onClick: () => handleDelete(record),
                        children: _jsxs('div', {
                            className: 'flex items-center gap-1',
                            children: [_jsx(DeleteOutlined, {}), ' Delete'],
                        }),
                    },
                    'delete'
                ),
                _jsx(
                    Menu.Item,
                    {
                        children: _jsx('div', {
                            className: 'flex items-center gap-1 cursor-pointer',
                            children:
                                record.customerStatus === 'Active'
                                    ? _jsxs('span', {
                                          onClick: () =>
                                              handleStatusUpdate(record),
                                          className:
                                              'flex items-center gap-1 text-red-600',
                                          children: [
                                              _jsx(PowerOffIcon, {
                                                  className: 'text-red-700',
                                                  size: 17,
                                              }),
                                              ' ',
                                              'Inactive',
                                          ],
                                      })
                                    : _jsxs('span', {
                                          onClick: () =>
                                              handleStatusUpdate(record),
                                          className:
                                              'flex items-center gap-1 text-green-600',
                                          children: [
                                              _jsx(PowerOff, {
                                                  className: 'text-green-700',
                                                  size: 17,
                                              }),
                                              ' ',
                                              'Active',
                                          ],
                                      }),
                        }),
                    },
                    'status'
                ),
                _jsx(
                    Menu.Item,
                    {
                        children: _jsxs(Link, {
                            to: `/dashboard/e-commerce/customer-details/${record.key}`,
                            className: 'flex items-center gap-1',
                            children: [_jsx(Info, { size: 17 }), ' Details'],
                        }),
                    },
                    'details'
                ),
            ],
        });
    const columns = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'Customer Since', dataIndex: 'customerSince' },
        { title: 'Customer Type', dataIndex: 'customerType' },
        {
            title: 'Status',
            dataIndex: 'customerStatus',
            render: status =>
                _jsx('div', {
                    className: `status-badge px-2 pt-0.5 flex items-center justify-center pb-0.5 !w-[70px] shape-z ${
                        status === 'Active'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                    }`,
                    children: status,
                }),
            responsive: ['sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) =>
                _jsx(Dropdown, {
                    overlay: menu(record),
                    trigger: ['click'],
                    children: _jsx(Button, {
                        className:
                            'dark:text-light text-dark dark:bg-gray-700 dark:hover:!bg-gray-600 bg-gray-50',
                        icon: _jsx(MoreOutlined, {
                            className: 'dark:text-light text-dark',
                        }),
                    }),
                }),
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
    ];
    return _jsx(Table, {
        rowSelection: rowSelection,
        columns: columns,
        dataSource: data,
        pagination: { pageSize },
        scroll: { x: '100%' },
    });
};
export default CustomerTable;
