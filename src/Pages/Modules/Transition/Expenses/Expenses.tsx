import React, { useState, useContext } from 'react';
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

interface ExpenseRecord {
    _id: string;
    referenceNumber: string;
    date: string;
    time: string;
    description: string;
    expenseFrom: string;
    amount: number;
    status: 'Approved' | 'Draft' | 'Pending';
}

export default function AccountingDashboard() {
    const navigate = useNavigate();
    const { user } = useContext(Erp_context);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
        'Approved',
        'Draft',
    ]);
    const [dateRange, setDateRange] = useState<any>(null);

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
    const filteredExpenses = expenses.filter((exp: ExpenseRecord) => {
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
            render: (val: number) => <span>{val?.toFixed(2)}</span>,
        },

        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const color =
                    status === 'Approved'
                        ? 'green'
                        : status === 'Draft'
                          ? 'orange'
                          : 'blue';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (record: ExpenseRecord) => (
                <Dropdown
                    menu={{
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

    const handleStatusChange = (value: string[]) => setSelectedStatuses(value);

    return (
        <div>
            <Layout>
                <Content className="p-6 bg-[#f8fbff] dark:bg-[#0b0f1a] min-h-screen transition-colors">
                    {/* Title */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-black dark:text-white">
                            Expenses
                        </h1>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => navigate('add_expenses')}
                            className="bg-primary"
                        >
                            Add Expense
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="bg-white dark:bg-[#141c2b] p-4 rounded-lg border border-gray-200 dark:border-gray-600 mb-6 transition-colors">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Status
                                </label>
                                <Select
                                    mode="multiple"
                                    placeholder="Select Status"
                                    className="w-full"
                                    value={selectedStatuses}
                                    onChange={handleStatusChange}
                                    allowClear
                                >
                                    <Option value="Approved">Approved</Option>
                                    <Option value="Draft">Draft</Option>
                                    <Option value="Pending">Pending</Option>
                                </Select>
                            </div>

                            <div>
                                <RangePicker
                                    className="w-full dark:bg-light-dark dark:border-dark-gray dark:text-white"
                                    value={dateRange}
                                    onChange={setDateRange}
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    type="primary"
                                    icon={<FilterOutlined />}
                                    className="bg-primary"
                                    onClick={() => {
                                        // Filtering happens automatically
                                        message.success('Filter applied');
                                    }}
                                >
                                    Apply Filter
                                </Button>
                                <Button
                                    icon={<ClearOutlined />}
                                    onClick={() => {
                                        setDateRange(null);
                                        setSelectedStatuses([
                                            'Approved',
                                            'Draft',
                                        ]);
                                        message.success('Filters cleared');
                                    }}
                                >
                                    Clear Filter
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Expenses Table */}
                    <div className="bg-white dark:bg-[#141c2b] rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden transition-colors">
                        <Table
                            columns={columns}
                            dataSource={filteredExpenses}
                            rowKey="_id"
                            loading={isLoading}
                            pagination={{
                                total: filteredExpenses.length,
                                pageSize: 25,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                            }}
                            className="bg-transparent"
                            scroll={{ x: 1200 }}
                        />
                    </div>
                </Content>
            </Layout>
        </div>
    );
}
