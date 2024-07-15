import React, { useState } from 'react';
import { DatePicker, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import DashboardContentHeader from '../../../../../../../wraper/DashboardContentHeader';
import DashboardTitle from '../../../../../CommonComponents/DashboardTitle';
import ViewAllLedgerFilterAction from './ViewAllLedgerFilterAction';
import moment from 'moment'; // Ensure moment is imported

interface LedgerData {
    key: string;
    timestamp: number; // Use timestamp
    reference: string;
    customerName: string;
    type: string;
    paymentStatus: string;
    paymentMethod: string;
    debit: number;
    credit: number;
    balance: number;
}

const columns: ColumnsType<LedgerData> = [
    {
        title: 'Customer Name',
        dataIndex: 'customerName',
        key: 'customerName',
    },
    {
        title: 'Date',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: date => new Date(date).toLocaleDateString(),
    },
    {
        title: 'Reference',
        dataIndex: 'reference',
        key: 'reference',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Payment Status',
        dataIndex: 'paymentStatus',
        key: 'paymentStatus',
    },
    {
        title: 'Payment Method',
        dataIndex: 'paymentMethod',
        key: 'paymentMethod',
    },
    {
        title: 'Debit',
        dataIndex: 'debit',
        key: 'debit',
        render: text => <span>${text.toFixed(2)}</span>,
    },
    {
        title: 'Credit',
        dataIndex: 'credit',
        key: 'credit',
        render: text => <span>${text.toFixed(2)}</span>,
    },
    {
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance',
        render: text => <span>${text.toFixed(2)}</span>,
    },
];

const data: LedgerData[] = [
    {
        key: '1',
        timestamp: 1688160000000, // 2024-07-01
        reference: 'INV-001',
        customerName: 'John Doe',
        type: 'invoice',
        paymentStatus: 'Partially Paid',
        paymentMethod: 'Bkash',
        debit: 500.0,
        credit: 0.0,
        balance: 500.0,
    },
    {
        key: '1.1',
        timestamp: 1688160000000, // 2024-07-01
        reference: 'INV-001',
        customerName: 'John Doe',
        type: 'invoice',
        paymentStatus: 'Partially Paid',
        paymentMethod: 'Bkash',
        debit: 500.0,
        credit: 0.0,
        balance: 500.0,
    },
    {
        key: '1.2',
        timestamp: 1688160000000, // 2024-07-01
        reference: 'INV-001',
        customerName: 'John Doe',
        type: 'invoice',
        paymentStatus: 'Partially Paid',
        paymentMethod: 'Bkash',
        debit: 500.0,
        credit: 0.0,
        balance: 500.0,
    },
    {
        key: '2',
        timestamp: 1688246400000, // 2024-07-02
        reference: 'INV-002',
        customerName: 'Jane Smith',
        type: 'invoice',
        paymentStatus: 'Paid',
        paymentMethod: 'Cash',
        debit: 0.0,
        credit: 200.0,
        balance: 300.0,
    },
    {
        key: '3',
        timestamp: 1688332800000, // 2024-07-03
        reference: 'INV-003',
        customerName: 'Alice Johnson',
        type: 'invoice',
        paymentStatus: 'Unpaid',
        paymentMethod: 'Credit Card',
        debit: 150.0,
        credit: 0.0,
        balance: 450.0,
    },
    {
        key: '4',
        timestamp: 1688419200000, // 2024-07-04
        reference: 'INV-004',
        customerName: 'Bob Brown',
        type: 'invoice',
        paymentStatus: 'Paid',
        paymentMethod: 'Paypal',
        debit: 0.0,
        credit: 300.0,
        balance: 150.0,
    },
    {
        key: '4.1',
        timestamp: 1688419200000, // 2024-07-04
        reference: 'INV-004',
        customerName: 'Bob Brown',
        type: 'invoice',
        paymentStatus: 'Paid',
        paymentMethod: 'Paypal',
        debit: 0.0,
        credit: 300.0,
        balance: 150.0,
    },
    {
        key: '5',
        timestamp: 1688505600000, // 2024-07-05
        reference: 'INV-005',
        customerName: 'Charlie Davis',
        type: 'invoice',
        paymentStatus: 'Partially Paid',
        paymentMethod: 'Bkash',
        debit: 400.0,
        credit: 0.0,
        balance: 550.0,
    },
    {
        key: '6',
        timestamp: 1688592000000, // 2024-07-06
        reference: 'INV-006',
        customerName: 'Diana Evans',
        type: 'invoice',
        paymentStatus: 'Paid',
        paymentMethod: 'Cash',
        debit: 0.0,
        credit: 250.0,
        balance: 300.0,
    },
    {
        key: '7',
        timestamp: 1688678400000, // 2024-07-07
        reference: 'INV-007',
        customerName: 'Evan Fisher',
        type: 'invoice',
        paymentStatus: 'Unpaid',
        paymentMethod: 'Credit Card',
        debit: 200.0,
        credit: 0.0,
        balance: 500.0,
    },
    {
        key: '8',
        timestamp: 1688764800000, // 2024-07-08
        reference: 'INV-008',
        customerName: 'Fiona Green',
        type: 'invoice',
        paymentStatus: 'Paid',
        paymentMethod: 'Paypal',
        debit: 0.0,
        credit: 350.0,
        balance: 150.0,
    },
    {
        key: '9',
        timestamp: 1688851200000, // 2024-07-09
        reference: 'INV-009',
        customerName: 'George Harris',
        type: 'invoice',
        paymentStatus: 'Partially Paid',
        paymentMethod: 'Bkash',
        debit: 300.0,
        credit: 0.0,
        balance: 450.0,
    },
    {
        key: '10',
        timestamp: 1688937600000, // 2024-07-10
        reference: 'INV-010',
        customerName: 'Hannah Lee',
        type: 'invoice',
        paymentStatus: 'Paid',
        paymentMethod: 'Cash',
        debit: 0.0,
        credit: 400.0,
        balance: 50.0,
    },
    {
        key: '11',
        timestamp: 1689024000000, // 2024-07-11
        reference: 'INV-011',
        customerName: 'Ian Martin',
        type: 'invoice',
        paymentStatus: 'Unpaid',
        paymentMethod: 'Credit Card',
        debit: 250.0,
        credit: 0.0,
        balance: 300.0,
    },
];

const customerList = [
    { value: 'all', label: 'All' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'jane-smith', label: 'Jane Smith' },
    { value: 'bob-brown', label: 'Bob Brown' },
];

const ViewAllLedger: React.FC = () => {
    const [customerLabel, setCustomerLabel] = useState<string>('All');
    const [startDate, setStartDate] = useState<number | null>(null);
    const [endDate, setEndDate] = useState<number | null>(null);
    const [menuOn, setMenuOn] = useState<boolean>(false);

    const handleCustomerChange = (value: string) => {
        const selectedCustomer = customerList.find(
            customer => customer.value === value
        );
        if (selectedCustomer) {
            setCustomerLabel(selectedCustomer.label);
        }
    };

    const handleStartDateChange = (date: moment.Moment | null) => {
        const timestamp = date ? date.valueOf() : null;
        setStartDate(timestamp);
    };

    const handleEndDateChange = (date: moment.Moment | null) => {
        const timestamp = date ? date.valueOf() : null;
        setEndDate(timestamp);
    };

    const filteredData = data.filter(item => {
        const isCustomerMatch =
            customerLabel === 'All' || item.customerName === customerLabel;
        const isDateInRange =
            (startDate === null || item.timestamp >= startDate) &&
            (endDate === null || item.timestamp <= endDate);

        return isCustomerMatch && isDateInRange;
    });

    const calculateTotals = (filteredData: LedgerData[]) => {
        let totalDebit = 0;
        let totalCredit = 0;

        filteredData.forEach(item => {
            totalDebit += item.debit;
            totalCredit += item.credit;
        });

        return {
            totalDebit,
            totalCredit,
        };
    };

    const { totalDebit, totalCredit } = calculateTotals(filteredData);
    const totalBalance = totalDebit - totalCredit;

    return (
        <div className="dark:text-light py-2 text-dark">
            <DashboardContentHeader>
                <DashboardTitle title={'Customer'} />
                <ViewAllLedgerFilterAction
                    handleCustomerChange={handleCustomerChange}
                    handleStartDateChange={handleStartDateChange}
                    handleEndDateChange={handleEndDateChange}
                    setMenuOn={setMenuOn}
                    menuOn={menuOn}
                    customerList={customerList}
                />
            </DashboardContentHeader>
            {/* filter for sm */}
            {menuOn && (
                <div className="p-2 border rounded dark:border-dark-gray border-gray mt-2 space-y-3">
                    <div className="select-label-container space-y-1">
                        <label
                            htmlFor="custom-select"
                            className="select-label"
                        >
                            Customer
                        </label>
                        <Select
                            id="custom-select"
                            className="!w-full"
                            defaultValue=""
                            style={{ width: 120 }}
                            onChange={handleCustomerChange}
                            options={customerList}
                        />
                    </div>

                    <div className="select-label-container space-y-1 flex flex-col">
                        <label
                            htmlFor="start-date"
                            className="select-label"
                        >
                            Start Date
                        </label>
                        <DatePicker
                            className="!h-[42px]"
                            id="start-date"
                            onChange={handleStartDateChange}
                        />
                    </div>

                    <div className="select-label-container space-y-1 flex flex-col">
                        <label
                            htmlFor="end-date"
                            className="select-label"
                        >
                            End Date
                        </label>
                        <DatePicker
                            className="!h-[42px]"
                            id="end-date"
                            onChange={handleEndDateChange}
                        />
                    </div>
                </div>
            )}

            <div className="pb">
                <div className="bmt-3 pt-3 relative">
                    <div className="md:relative absolute top-0 left-0 right-0 bottom-0">
                        <div className="border  dark:border-dark-gray border-gray-300 bg-light-dark mt-4">
                            <Table
                                columns={columns}
                                scroll={{ x: 800 }}
                                dataSource={filteredData}
                                pagination={true}
                                summary={() => (
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell
                                            index={0}
                                            className="font-bold text-md dark:!text-danger !text-primary"
                                        >
                                            Total :
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell
                                            index={1}
                                        ></Table.Summary.Cell>
                                        <Table.Summary.Cell
                                            index={1}
                                        ></Table.Summary.Cell>
                                        <Table.Summary.Cell
                                            index={1}
                                        ></Table.Summary.Cell>
                                        <Table.Summary.Cell
                                            index={1}
                                        ></Table.Summary.Cell>
                                        <Table.Summary.Cell
                                            index={1}
                                        ></Table.Summary.Cell>
                                        <Table.Summary.Cell
                                            index={2}
                                            className="font-bold text-md dark:!text-danger !text-primary"
                                        >
                                            <span>
                                                ${totalDebit.toFixed(2)}
                                            </span>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell
                                            index={3}
                                            className="font-bold text-md dark:!text-danger !text-primary"
                                        >
                                            <span>
                                                ${totalCredit.toFixed(2)}
                                            </span>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell
                                            index={4}
                                            className="font-bold text-md dark:!text-danger !text-primary"
                                        >
                                            <span>
                                                ${totalBalance.toFixed(2)}
                                            </span>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                )}
                            />
                        </div>
                        <div className="h-10"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAllLedger;
