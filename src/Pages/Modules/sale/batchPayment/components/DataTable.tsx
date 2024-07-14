import { Dropdown, Space, Table, TableProps } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { tableData } from '@modules/sale/batchPayment/BatchPayment.demo';
import { DataType } from '@modules/sale/batchPayment/BatchPayment.type';

const items = [
    {
        key: '1',
        label: (
            <div onClick={() => console.log('Details clicked')}>Details</div>
        ),
    },
];

const tableHead: TableProps<DataType>['columns'] = [
    {
        title: 'BATCH NUMBER',
        dataIndex: 'batchNumber',
        key: 'batchNumber',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customer',
        key: 'customer',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'PAYMENT METHOD',
        dataIndex: 'paymentMethod',
        key: 'paymentMethod',
    },
    {
        title: 'TRANSACTION ID',
        dataIndex: 'transactionId',
        key: 'transactionId',
    },
    {
        title: 'PAID AMOUNT',
        dataIndex: 'paidAmount',
        key: 'paidAmount',
        render: (amount: number) => <p>৳ {amount}</p>,
    },
    {
        title: 'DISCOUNT AMOUNT',
        dataIndex: 'discountAmount',
        key: 'discountAmount',
        render: (amount: number) => <p>৳ {amount}</p>,
    },
    {
        title: 'TOTAL AMOUNT',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        render: (amount: number) => <p>৳ {amount}</p>,
    },
    {
        title: 'ACTION',
        key: 'action',
        render: () => (
            <Space size="middle">
                <Dropdown
                    menu={{ items }}
                    trigger={['click']}
                >
                    <a>
                        <EllipsisVertical className="hover:cursor-pointer" />
                    </a>
                </Dropdown>
            </Space>
        ),
    },
];

const DataTable: React.FC = () => (
    <Table
        columns={tableHead}
        dataSource={tableData}
    />
);

export default DataTable;
