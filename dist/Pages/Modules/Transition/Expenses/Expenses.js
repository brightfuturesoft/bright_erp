import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext } from 'react';
import {
    Layout,
    Table,
    Select,
    DatePicker,
    Button,
    Tag,
    Dropdown,
    message,
} from 'antd';
import {
    PlusOutlined,
    FilterOutlined,
    ClearOutlined,
    MoreOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;
export default function AccountingDashboard() {
    const navigate = useNavigate();
    const { user } = useContext(Erp_context);
    const [selectedStatuses, setSelectedStatuses] = useState([
        'Approved',
        'Draft',
    ]);
    const [dateRange, setDateRange] = useState(null);
    // ✅ Fetch expenses
    const {
        data: expenses = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['expenses', user?.workspace_id],
        queryFn: async () => {
            if (!user?._id || !user?.workspace_id) return [];
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}transaction/expense/get-expense`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch expenses');
            const json = await res.json();
            return json.data || [];
        },
        enabled: !!user?.workspace_id,
    });
    // ✅ Client-side filtering
    const filteredExpenses = expenses.filter(exp => {
        // Status filter
        const statusMatch =
            selectedStatuses.length === 0 ||
            selectedStatuses.includes(exp.status);
        // Date filter
        let dateMatch = true;
        if (dateRange && dateRange.length === 2) {
            const start = dayjs(dateRange[0]).startOf('day');
            const end = dayjs(dateRange[1]).endOf('day');
            const expDate = dayjs(exp.date);
            dateMatch = expDate.isBetween(start, end, null, '[]'); // inclusive
        }
        return statusMatch && dateMatch;
    });
    const columns = [
        {
            title: 'REFERENCE NUMBER',
            dataIndex: 'referenceNumber',
            key: 'referenceNumber',
            className: 'font-medium text-primary',
        },
        { title: 'DATE', dataIndex: 'date', key: 'date' },
        { title: 'TIME', dataIndex: 'time', key: 'time' },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            ellipsis: true,
        },
        { title: 'EXPENSE FROM', dataIndex: 'expenseFrom', key: 'expenseFrom' },
        {
            title: 'AMOUNT',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: val => _jsx('span', { children: val?.toFixed(2) }),
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                const color =
                    status === 'Approved'
                        ? 'green'
                        : status === 'Draft'
                          ? 'orange'
                          : 'blue';
                return _jsx(Tag, { color: color, children: status });
            },
        },
        {
            title: 'ACTION',
            key: 'action',
            render: record =>
                _jsx(Dropdown, {
                    menu: {
                        items: [
                            {
                                key: 'edit',
                                label: 'Edit',
                                onClick: () =>
                                    navigate(`edit_expense/${record._id}`),
                            },
                            {
                                key: 'delete',
                                label: 'Delete',
                                onClick: async () => {
                                    try {
                                        const res = await fetch(
                                            `${import.meta.env.VITE_BASE_URL}transaction/expense/delete-expense`,
                                            {
                                                method: 'PATCH',
                                                headers: {
                                                    'Content-Type':
                                                        'application/json',
                                                    Authorization: user?._id,
                                                    workspace_id:
                                                        user?.workspace_id,
                                                },
                                                body: JSON.stringify({
                                                    id: record._id,
                                                }),
                                            }
                                        );
                                        if (!res.ok)
                                            throw new Error('Delete failed');
                                        message.success('Expense deleted!');
                                        refetch();
                                    } catch (err) {
                                        console.error(err);
                                        message.error(
                                            'Failed to delete expense'
                                        );
                                    }
                                },
                            },
                        ],
                    },
                    trigger: ['click'],
                    children: _jsx(Button, {
                        type: 'text',
                        icon: _jsx(MoreOutlined, {}),
                    }),
                }),
        },
    ];
    const handleStatusChange = value => setSelectedStatuses(value);
    return _jsx('div', {
        children: _jsx(Layout, {
            children: _jsxs(Content, {
                className:
                    'p-6 bg-[#f8fbff] dark:bg-[#0b0f1a] min-h-screen transition-colors',
                children: [
                    _jsxs('div', {
                        className: 'flex items-center justify-between mb-6',
                        children: [
                            _jsx('h1', {
                                className:
                                    'text-2xl font-bold text-black dark:text-white',
                                children: 'Expenses',
                            }),
                            _jsx(Button, {
                                type: 'primary',
                                icon: _jsx(PlusOutlined, {}),
                                onClick: () => navigate('add_expenses'),
                                className: 'bg-primary',
                                children: 'Add Expense',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className:
                            'bg-white dark:bg-[#141c2b] p-4 rounded-lg border border-gray-200 dark:border-gray-600 mb-6 transition-colors',
                        children: _jsxs('div', {
                            className:
                                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end',
                            children: [
                                _jsxs('div', {
                                    children: [
                                        _jsx('label', {
                                            className:
                                                'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1',
                                            children: 'Status',
                                        }),
                                        _jsxs(Select, {
                                            mode: 'multiple',
                                            placeholder: 'Select Status',
                                            className: 'w-full',
                                            value: selectedStatuses,
                                            onChange: handleStatusChange,
                                            allowClear: true,
                                            children: [
                                                _jsx(Option, {
                                                    value: 'Approved',
                                                    children: 'Approved',
                                                }),
                                                _jsx(Option, {
                                                    value: 'Draft',
                                                    children: 'Draft',
                                                }),
                                                _jsx(Option, {
                                                    value: 'Pending',
                                                    children: 'Pending',
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                _jsx('div', {
                                    children: _jsx(RangePicker, {
                                        className:
                                            'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                        value: dateRange,
                                        onChange: setDateRange,
                                    }),
                                }),
                                _jsxs('div', {
                                    className: 'flex gap-2',
                                    children: [
                                        _jsx(Button, {
                                            type: 'primary',
                                            icon: _jsx(FilterOutlined, {}),
                                            className: 'bg-primary',
                                            onClick: () => {
                                                // Filtering happens automatically
                                                message.success(
                                                    'Filter applied'
                                                );
                                            },
                                            children: 'Apply Filter',
                                        }),
                                        _jsx(Button, {
                                            icon: _jsx(ClearOutlined, {}),
                                            onClick: () => {
                                                setDateRange(null);
                                                setSelectedStatuses([
                                                    'Approved',
                                                    'Draft',
                                                ]);
                                                message.success(
                                                    'Filters cleared'
                                                );
                                            },
                                            children: 'Clear Filter',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                    _jsx('div', {
                        className:
                            'bg-white dark:bg-[#141c2b] rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden transition-colors',
                        children: _jsx(Table, {
                            columns: columns,
                            dataSource: filteredExpenses,
                            rowKey: '_id',
                            loading: isLoading,
                            pagination: {
                                total: filteredExpenses.length,
                                pageSize: 25,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                            },
                            className: 'bg-transparent',
                            scroll: { x: 1200 },
                        }),
                    }),
                ],
            }),
        }),
    });
}
