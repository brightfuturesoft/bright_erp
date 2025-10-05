import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext, useMemo } from 'react';
import {
    Layout,
    Table,
    Select,
    DatePicker,
    Button,
    Tag,
    Input,
    Dropdown,
    ConfigProvider,
    theme,
    Alert,
    message,
} from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    FilterOutlined,
    ClearOutlined,
    MoreOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
dayjs.extend(isBetween);
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;
export default function EmployeesPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(Erp_context);
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [employmentTypeFilter, setEmploymentTypeFilter] = useState(null);
    const [departmentFilter, setDepartmentFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [dateRange, setDateRange] = useState(null);
    const [rangePreset, setRangePreset] = useState(null);
    const [searchText, setSearchText] = useState('');
    const {
        data: employeesData = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['employees', user?.workspace_id],
        queryFn: async () => {
            if (!user?._id || !user?.workspace_id) return [];
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}hrm/employees/get-employees`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch employees');
            const data = await res.json();
            return data.data || [];
        },
        enabled: !!user?._id && !!user?.workspace_id,
    });
    const filteredAndMappedData = useMemo(() => {
        let filteredData = employeesData;
        if (searchText) {
            filteredData = filteredData.filter(
                emp =>
                    emp.fullName
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    emp.email
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    emp.phoneNumber.includes(searchText)
            );
        }
        if (employmentTypeFilter) {
            filteredData = filteredData.filter(
                emp => emp.employmentType === employmentTypeFilter
            );
        }
        if (departmentFilter) {
            filteredData = filteredData.filter(
                emp => emp.department === departmentFilter
            );
        }
        if (statusFilter) {
            filteredData = filteredData.filter(
                emp => emp.status === statusFilter
            );
        }
        if (dateRange && dateRange[0] && dateRange[1]) {
            const [startDate, endDate] = dateRange;
            filteredData = filteredData.filter(emp => {
                const joiningDate = dayjs(emp.joiningDate);
                return joiningDate.isBetween(startDate, endDate, null, '[]');
            });
        }
        return filteredData.map(employee => ({
            ...employee,
            key: employee._id,
            name: `${employee.fullName} `.trim(),
        }));
    }, [
        employeesData,
        searchText,
        employmentTypeFilter,
        departmentFilter,
        statusFilter,
        dateRange,
    ]);
    const handleRangeSelect = value => {
        setRangePreset(value);
        if (value === 'today')
            setDateRange([dayjs().startOf('day'), dayjs().endOf('day')]);
        else if (value === 'week')
            setDateRange([dayjs().startOf('week'), dayjs().endOf('week')]);
        else if (value === 'month')
            setDateRange([dayjs().startOf('month'), dayjs().endOf('month')]);
        else setDateRange(null);
    };
    const handleClearFilters = () => {
        setEmploymentTypeFilter(null);
        setDepartmentFilter(null);
        setStatusFilter(null);
        setDateRange(null);
        setRangePreset(null);
        setSearchText('');
    };
    const columns = [
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
            className: 'font-medium',
        },
        { title: 'DEPARTMENT', dataIndex: 'department', key: 'department' },
        { title: 'POSITION', dataIndex: 'position', key: 'position' },
        {
            title: 'EMPLOYMENT TYPE',
            dataIndex: 'employmentType',
            key: 'employmentType',
        },
        { title: 'EMAIL', dataIndex: 'email', key: 'email' },
        { title: 'PHONE NUMBER', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        {
            title: 'JOINING DATE',
            dataIndex: 'joiningDate',
            key: 'joiningDate',
            render: date =>
                dayjs(date).isValid()
                    ? dayjs(date).format('D MMM YYYY')
                    : 'N/A',
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                const color =
                    status === 'Active'
                        ? 'green'
                        : status === 'Resigned'
                          ? 'orange'
                          : 'blue';
                return _jsx(Tag, { color: color, children: status || 'N/A' });
            },
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (_, record) =>
                _jsx(Dropdown, {
                    menu: {
                        items: [
                            { key: 'edit', label: 'Edit' },
                            { key: 'delete', label: 'Delete' },
                            { key: 'view', label: 'View Details' },
                        ],
                        onClick: async ({ key }) => {
                            if (key === 'edit')
                                navigate(
                                    `/dashboard/hr-module/employees/edit-employees/${record._id}`
                                );
                            else if (key === 'view')
                                navigate(
                                    `/dashboard/hr-module/employees/view-details/${record._id}`
                                );
                            else if (key == 'delete')
                                try {
                                    const res = await fetch(
                                        `${import.meta.env.VITE_BASE_URL}hrm/employees/delete-employee`,
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
                                    message.success('Employee deleted!');
                                    refetch();
                                } catch (err) {
                                    console.error(err);
                                    message.error(
                                        'Failed to delete employee field'
                                    );
                                }
                        },
                    },
                    trigger: ['click'],
                    children: _jsx(Button, {
                        type: 'text',
                        icon: _jsx(MoreOutlined, {}),
                    }),
                }),
        },
    ];
    const rowSelection = {
        selectedRowKeys: selectedRows,
        onChange: selectedRowKeys => {
            setSelectedRows(selectedRowKeys);
        },
    };
    return _jsx(ConfigProvider, {
        theme: {
            algorithm: defaultAlgorithm,
            token: {
                colorPrimary: '#0A65B4',
            },
        },
        children: _jsx(Layout, {
            className: 'min-h-screen bg-white dark:bg-dark',
            children: _jsxs(Content, {
                className: 'p-6 bg-white dark:bg-dark',
                children: [
                    _jsxs('div', {
                        className: 'flex items-center justify-between mb-6',
                        children: [
                            _jsx('h1', {
                                className: 'text-2xl font-bold text-foreground',
                                children: 'Employees',
                            }),
                            _jsx('div', {
                                className: 'flex items-center gap-3',
                                children: _jsx(Button, {
                                    type: 'primary',
                                    icon: _jsx(PlusOutlined, {}),
                                    className: 'bg-primary',
                                    onClick: () => navigate('add-employees'),
                                    children: 'Add Employee',
                                }),
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className:
                            'bg-card p-4 rounded-lg border border-border mb-6',
                        children: _jsxs('div', {
                            className:
                                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end',
                            children: [
                                _jsxs('div', {
                                    children: [
                                        _jsx('label', {
                                            className:
                                                'block text-sm font-medium text-card-foreground mb-1',
                                            children: 'Select Employee Type',
                                        }),
                                        _jsxs(Select, {
                                            placeholder: 'All Types',
                                            className: 'w-full',
                                            allowClear: true,
                                            value: employmentTypeFilter,
                                            onChange: setEmploymentTypeFilter,
                                            children: [
                                                _jsx(Option, {
                                                    value: 'full-time',
                                                    children: 'Full Time',
                                                }),
                                                _jsx(Option, {
                                                    value: 'part-time',
                                                    children: 'Part Time',
                                                }),
                                                _jsx(Option, {
                                                    value: 'remote',
                                                    children: 'Remote',
                                                }),
                                                _jsx(Option, {
                                                    value: 'contract',
                                                    children: 'Contract',
                                                }),
                                                _jsx(Option, {
                                                    value: 'internship',
                                                    children: 'Internship',
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    children: [
                                        _jsx('label', {
                                            className:
                                                'block text-sm font-medium text-card-foreground mb-1',
                                            children: 'Select Department',
                                        }),
                                        _jsxs(Select, {
                                            placeholder: 'All Departments',
                                            className: 'w-full',
                                            allowClear: true,
                                            value: departmentFilter,
                                            onChange: setDepartmentFilter,
                                            children: [
                                                _jsx(Option, {
                                                    value: 'development',
                                                    children: 'Development',
                                                }),
                                                _jsx(Option, {
                                                    value: 'quality',
                                                    children: 'Quality',
                                                }),
                                                _jsx(Option, {
                                                    value: 'sales',
                                                    children:
                                                        'Sales & Marketing',
                                                }),
                                                _jsx(Option, {
                                                    value: 'hr',
                                                    children: 'Human Resources',
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    children: [
                                        _jsx('label', {
                                            className:
                                                'block text-sm font-medium text-card-foreground mb-1',
                                            children:
                                                'Select Employment Status',
                                        }),
                                        _jsxs(Select, {
                                            placeholder: 'All Status',
                                            className: 'w-full',
                                            allowClear: true,
                                            value: statusFilter,
                                            onChange: setStatusFilter,
                                            children: [
                                                _jsx(Option, {
                                                    value: 'Active',
                                                    children: 'Active',
                                                }),
                                                _jsx(Option, {
                                                    value: 'Resigned',
                                                    children: 'Resigned',
                                                }),
                                                _jsx(Option, {
                                                    value: 'On Leave',
                                                    children: 'On Leave',
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    children: [
                                        _jsx('label', {
                                            className:
                                                'block text-sm font-medium text-card-foreground mb-1',
                                            children: 'Select Range',
                                        }),
                                        _jsxs(Select, {
                                            placeholder: 'Any Time',
                                            className: 'w-full',
                                            allowClear: true,
                                            value: rangePreset,
                                            onChange: handleRangeSelect,
                                            children: [
                                                _jsx(Option, {
                                                    value: 'today',
                                                    children: 'Today',
                                                }),
                                                _jsx(Option, {
                                                    value: 'week',
                                                    children: 'This Week',
                                                }),
                                                _jsx(Option, {
                                                    value: 'month',
                                                    children: 'This Month',
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    children: [
                                        _jsx('label', {
                                            className:
                                                'block text-sm font-medium text-card-foreground mb-1',
                                            children: 'From Date - To Date',
                                        }),
                                        _jsx(RangePicker, {
                                            className:
                                                'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                            value: dateRange,
                                            onChange: dates => {
                                                setDateRange(dates);
                                                setRangePreset('custom');
                                            },
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    className: 'flex gap-2',
                                    children: [
                                        _jsx(Button, {
                                            type: 'primary',
                                            icon: _jsx(FilterOutlined, {}),
                                            className: 'bg-primary',
                                            children: 'Filter',
                                        }),
                                        _jsx(Button, {
                                            icon: _jsx(ClearOutlined, {}),
                                            onClick: handleClearFilters,
                                            children: 'Clear',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                    _jsxs('div', {
                        className: 'flex items-center justify-between mb-4',
                        children: [
                            _jsxs('div', {
                                className: 'flex items-center gap-4',
                                children: [
                                    _jsx('span', {
                                        className:
                                            'text-sm text-muted-foreground',
                                        children: 'Show',
                                    }),
                                    _jsxs(Select, {
                                        defaultValue: '25',
                                        className: 'w-20',
                                        children: [
                                            _jsx(Option, {
                                                value: '10',
                                                children: '10',
                                            }),
                                            _jsx(Option, {
                                                value: '25',
                                                children: '25',
                                            }),
                                            _jsx(Option, {
                                                value: '50',
                                                children: '50',
                                            }),
                                            _jsx(Option, {
                                                value: '100',
                                                children: '100',
                                            }),
                                        ],
                                    }),
                                    _jsx('span', {
                                        className:
                                            'text-sm text-muted-foreground',
                                        children: 'entries',
                                    }),
                                ],
                            }),
                            _jsx('div', {
                                className: 'flex items-center gap-2',
                                children: _jsx(Input, {
                                    placeholder: 'Search name, email, phone...',
                                    className:
                                        'w-64 dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                    prefix: _jsx(SearchOutlined, {}),
                                    value: searchText,
                                    onChange: e =>
                                        setSearchText(e.target.value),
                                }),
                            }),
                        ],
                    }),
                    error &&
                        _jsx(Alert, {
                            message: 'Error',
                            description: error.message,
                            type: 'error',
                            showIcon: true,
                            className: 'mb-4',
                        }),
                    _jsx('div', {
                        className:
                            'bg-card rounded-lg border border-border overflow-hidden',
                        children: _jsx(Table, {
                            columns: columns,
                            dataSource: filteredAndMappedData,
                            rowSelection: rowSelection,
                            loading: isLoading,
                            pagination: {
                                total: filteredAndMappedData.length,
                                pageSize: 25,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                            },
                            className: 'bg-card',
                            scroll: { x: 1400 },
                        }),
                    }),
                ],
            }),
        }),
    });
}
