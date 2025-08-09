import React from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Fullscreen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LedgerData {
    key: string;
    orderNumber: string;
    date: string;
    quotationNumber: string;
    grandTotal: number;
    status: string;
}

const columns: ColumnsType<LedgerData> = [
    {
        title: 'Order Number',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Quotation Number',
        dataIndex: 'quotationNumber',
        key: 'quotationNumber',
    },
    {
        title: 'Grand Total',
        dataIndex: 'grandTotal',
        key: 'grandTotal',
        render: text => <span>${text.toFixed(2)}</span>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
];

const data: LedgerData[] = [
    {
        key: '1',
        orderNumber: 'ORD-001',
        date: '2024-07-01',
        quotationNumber: 'QT-001',
        grandTotal: 500.0,
        status: 'Completed',
    },
    {
        key: '2',
        orderNumber: 'ORD-002',
        date: '2024-07-02',
        quotationNumber: 'QT-002',
        grandTotal: 200.0,
        status: 'Pending',
    },
    {
        key: '3',
        orderNumber: 'ORD-003',
        date: '2024-07-03',
        quotationNumber: 'QT-003',
        grandTotal: 150.0,
        status: 'Completed',
    },
];

const calculateTotals = (data: LedgerData[]) => {
    let totalGrandTotal = 0;

    data.forEach(item => {
        totalGrandTotal += item.grandTotal;
    });

    return {
        totalGrandTotal,
    };
};

const { totalGrandTotal } = calculateTotals(data);

const StanderdOrder: React.FC = () => (
    <div className="">
        <div className="border">
            <Table
                columns={columns}
                scroll={{ x: 800 }}
                dataSource={data}
                pagination={false}
                summary={() => (
                    <>
                        {/* <Table.Summary.Row>
                            <Table.Summary.Cell
                                index={0}
                                className="font-bold text-md dark:!text-danger !text-primary"
                            >
                                Total
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}></Table.Summary.Cell>
                            <Table.Summary.Cell index={2}></Table.Summary.Cell>
                            <Table.Summary.Cell
                                index={3}
                                className="font-bold text-md dark:!text-danger !text-primary"
                            >
                                <span>${totalGrandTotal.toFixed(2)}</span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={4}></Table.Summary.Cell>
                        </Table.Summary.Row> */}
                        <Table.Summary.Row>
                            <Table.Summary.Cell
                                index={0}
                                className="font-bold text-md dark:!text-danger !text-primary"
                            >
                                <Link
                                    to={`/dashboard/customer/customer-details/order/Edward%20King%200`}
                                >
                                    <Button
                                        icon={
                                            <Fullscreen
                                                size={16}
                                                strokeWidth={2}
                                            />
                                        }
                                        className="bg-transparent !rounded-sm border-blue-500 text-primary flex items-center"
                                    >
                                        View All.......
                                    </Button>
                                </Link>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}></Table.Summary.Cell>
                            <Table.Summary.Cell index={2}></Table.Summary.Cell>
                            <Table.Summary.Cell index={3}></Table.Summary.Cell>
                            <Table.Summary.Cell index={4}></Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                )}
            />
        </div>
    </div>
);

export default StanderdOrder;
