import React from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Fullscreen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LedgerData {
    key: string;
    date: string;
    reference: string;
    debit: number;
    credit: number;
    balance: number;
}

const columns: ColumnsType<LedgerData> = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Reference',
        dataIndex: 'reference',
        key: 'reference',
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
        date: '2024-07-01',
        reference: 'INV-001',
        debit: 500.0,
        credit: 0.0,
        balance: 500.0,
    },
    {
        key: '2',
        date: '2024-07-02',
        reference: 'INV-002',
        debit: 0.0,
        credit: 200.0,
        balance: 300.0,
    },
    {
        key: '3',
        date: '2024-07-03',
        reference: 'INV-003',
        debit: 150.0,
        credit: 0.0,
        balance: 450.0,
    },
];

const calculateTotals = (data: LedgerData[]) => {
    let totalDebit = 0;
    let totalCredit = 0;

    data.forEach(item => {
        totalDebit += item.debit;
        totalCredit += item.credit;
    });

    return {
        totalDebit,
        totalCredit,
    };
};

const { totalDebit, totalCredit } = calculateTotals(data);

let totalBalance = (totalDebit ?? 0) - (totalCredit ?? 0);

const Ledger: React.FC = () => (
    <div className="">
        <div className="border">
            <Table
                columns={columns}
                scroll={{ x: 800 }}
                dataSource={data}
                pagination={false}
                summary={() => (
                    <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell
                                index={0}
                                className="font-bold text-md dark:!text-danger !text-primary"
                            >
                                Total
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}></Table.Summary.Cell>
                            <Table.Summary.Cell
                                index={2}
                                className="font-bold text-md dark:!text-danger !text-primary"
                            >
                                <span>${totalDebit.toFixed(2)}</span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell
                                index={3}
                                className="font-bold text-md dark:!text-danger !text-primary"
                            >
                                <span>${totalCredit.toFixed(2)}</span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell
                                index={4}
                                className="font-bold text-md dark:!text-danger !text-primary"
                            >
                                <span>${totalBalance}</span>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row>
                            <Table.Summary.Cell
                                index={0}
                                className="font-bold text-md dark:!text-danger !text-primary"
                            >
                                <Link
                                    to={`/dashboard/customer/customer-details/ledger/Edward%20King%200`}
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
                                        View All
                                    </Button>
                                </Link>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}></Table.Summary.Cell>
                            <Table.Summary.Cell
                                index={2}
                                className="font-bold text-md dark:!text-danger !text-primary"
                            >
                                <span></span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell
                                index={3}
                                className="font-bold text-md dark:!text-danger !text-primary"
                            >
                                <span></span>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell
                                index={4}
                                className="font-bold text-md dark:!text-danger !text-primary"
                            ></Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                )}
            />
        </div>
    </div>
);

export default Ledger;
