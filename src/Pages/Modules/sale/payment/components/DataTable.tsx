import { Dropdown, Space, Table, TableProps } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { DataType } from '../Payment.type';
import { tableData } from '../Payment.demo';

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
        title: 'Payment Number',
        dataIndex: 'payment_number',
        key: 'payment_number',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
        render: (text: string) => <p>{new Date(text).toDateString()}</p>,
    },
    {
        title: 'INVOICE NUMBER',
        dataIndex: 'invoice_number',
        key: 'invoice_number',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'INVOICE DATE',
        dataIndex: 'invoice_date',
        key: 'invoice_date',
        render: (text: string) => <p>{new Date(text).toDateString()}</p>,
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customer',
        key: 'customer',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'PAYMENT METHOD',
        dataIndex: 'payment_method',
        key: 'payment_method',
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
        render: (amount: number) => (
            <p>
                <span className="kalpurush-font text-lg">৳ </span> {amount}
            </p>
        ),
    },
    {
        title: 'DISCOUNT AMOUNT',
        dataIndex: 'discountAmount',
        key: 'discountAmount',
        render: (amount: number) => (
            <p>
                <span className="kalpurush-font text-lg">৳ </span> {amount}
            </p>
        ),
    },
    {
        title: 'TOTAL AMOUNT',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        render: (amount: number) => (
            <p>
                <span className="kalpurush-font text-lg">৳ </span> {amount}
            </p>
        ),
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
