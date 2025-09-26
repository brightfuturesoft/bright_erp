import type React from 'react';
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

interface EmployeeFromDB {
    _id: string;
    fullName: string;
    department: string;
    position: string;
    employmentType: string;
    email: string;
    phoneNumber: string;
    joiningDate: string;
    status?: 'Active' | 'Resigned' | 'On Leave';
}

interface EmployeeForTable extends EmployeeFromDB {
    key: string;
    name: string;
}

export default function EmployeesPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const navigate = useNavigate();
    const { user } = useContext(Erp_context);
    const { defaultAlgorithm, darkAlgorithm } = theme;

    const [employmentTypeFilter, setEmploymentTypeFilter] = useState<
        string | null
    >(null);
    const [departmentFilter, setDepartmentFilter] = useState<string | null>(
        null
    );
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<
        [dayjs.Dayjs, dayjs.Dayjs] | null
    >(null);
    const [rangePreset, setRangePreset] = useState<string | null>(null);
    const [searchText, setSearchText] = useState('');

    const {
        data: employeesData = [],
        isLoading,
        error,
        refetch,
    } = useQuery<EmployeeFromDB[]>({
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

    const filteredAndMappedData = useMemo<EmployeeForTable[]>(() => {
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

    const handleRangeSelect = (value: string | null) => {
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
            render: (date: string) =>
                dayjs(date).isValid()
                    ? dayjs(date).format('D MMM YYYY')
                    : 'N/A',
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const color =
                    status === 'Active'
                        ? 'green'
                        : status === 'Resigned'
                          ? 'orange'
                          : 'blue';
                return <Tag color={color}>{status || 'N/A'}</Tag>;
            },
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (_: any, record: EmployeeForTable) => (
                <Dropdown
                    menu={{
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
                    }}
                    trigger={['click']}
                >
                    <Button
                        type="text"
                        icon={<MoreOutlined />}
                    />
                </Dropdown>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys: selectedRows,
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedRows(selectedRowKeys as string[]);
        },
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: defaultAlgorithm,
                token: {
                    colorPrimary: '#0A65B4',
                },
            }}
        >
            <Layout className="min-h-screen bg-white dark:bg-dark">
                <Content className="p-6 bg-white dark:bg-dark">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-foreground dark:text-white">
                            Employees
                        </h1>
                        <div className="flex items-center gap-3">
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                className="bg-primary dark:text-white"
                                onClick={() => navigate('add-employees')}
                            >
                                Add Employee
                            </Button>
                        </div>
                    </div>

                    {/* === CORRECTED FILTER SECTION === */}
                    <div className="bg-card p-4 rounded-lg border border-border mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-1">
                                    Select Employee Type
                                </label>
                                <Select
                                    placeholder="All Types"
                                    className="w-full"
                                    allowClear
                                    value={employmentTypeFilter}
                                    onChange={setEmploymentTypeFilter}
                                >
                                    <Option value="full-time">Full Time</Option>
                                    <Option value="part-time">Part Time</Option>
                                    <Option value="remote">Remote</Option>
                                    <Option value="contract">Contract</Option>
                                    <Option value="internship">
                                        Internship
                                    </Option>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-1">
                                    Select Department
                                </label>
                                <Select
                                    placeholder="All Departments"
                                    className="w-full"
                                    allowClear
                                    value={departmentFilter}
                                    onChange={setDepartmentFilter}
                                >
                                    <Option value="development">
                                        Development
                                    </Option>
                                    <Option value="quality">Quality</Option>
                                    <Option value="sales">
                                        Sales & Marketing
                                    </Option>
                                    <Option value="hr">Human Resources</Option>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-1">
                                    Select Employment Status
                                </label>
                                <Select
                                    placeholder="All Status"
                                    className="w-full"
                                    allowClear
                                    value={statusFilter}
                                    onChange={setStatusFilter}
                                >
                                    <Option value="Active">Active</Option>
                                    <Option value="Resigned">Resigned</Option>
                                    <Option value="On Leave">On Leave</Option>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-1">
                                    Select Range
                                </label>
                                <Select
                                    placeholder="Any Time"
                                    className="w-full"
                                    allowClear
                                    value={rangePreset}
                                    onChange={handleRangeSelect}
                                >
                                    <Option value="today">Today</Option>
                                    <Option value="week">This Week</Option>
                                    <Option value="month">This Month</Option>
                                </Select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-1">
                                    From Date - To Date
                                </label>
                                <RangePicker
                                    className="w-full dark:bg-light-dark dark:border-dark-gray dark:text-white"
                                    value={dateRange}
                                    onChange={dates => {
                                        setDateRange(dates as any);
                                        setRangePreset('custom');
                                    }}
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    type="primary"
                                    icon={<FilterOutlined />}
                                    className="bg-primary"
                                >
                                    Filter
                                </Button>
                                <Button
                                    icon={<ClearOutlined />}
                                    onClick={handleClearFilters}
                                >
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 dark:text-white">
                            <span className="text-sm text-muted-foreground">
                                Show
                            </span>
                            <Select
                                defaultValue="25"
                                className="w-20"
                            >
                                <Option value="10">10</Option>
                                <Option value="25">25</Option>
                                <Option value="50">50</Option>
                                <Option value="100">100</Option>
                            </Select>
                            <span className="text-sm text-muted-foreground">
                                entries
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Search name, email, phone..."
                                className="w-64 dark:bg-light-dark dark:border-dark-gray dark:text-white"
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <Alert
                            message="Error"
                            description={error.message}
                            type="error"
                            showIcon
                            className="mb-4"
                        />
                    )}

                    <div className="bg-card rounded-lg border border-border overflow-hidden">
                        <Table
                            columns={columns}
                            dataSource={filteredAndMappedData}
                            rowSelection={rowSelection}
                            loading={isLoading}
                            pagination={{
                                total: filteredAndMappedData.length,
                                pageSize: 25,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                            }}
                            className="bg-card  dark:text-white"
                            scroll={{ x: 1400 }}
                        />
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
}
