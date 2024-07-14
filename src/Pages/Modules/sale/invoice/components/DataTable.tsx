import { Dropdown, Space, Table, TableProps } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import Status from '@modules/common/components/Status';
import { tableData } from '@modules/sale/invoice/Invoice.demo';
import { DataType } from '@modules/sale/invoice/Invoice.type';

const items = [
    {
        key: '1',
        label: (
            <div onClick={() => console.log('Details clicked')}>Details</div>
        ),
    },
    {
        key: '2',
        label: (
            <div onClick={() => console.log('Make Payment clicked')}>
                Make Payment
            </div>
        ),
    },
    {
        key: '3',
        label: <div onClick={() => console.log('Return clicked')}>Return</div>,
    },
    {
        key: '4',
        label: (
            <div onClick={() => console.log('Cancel Invoice clicked')}>
                Cancel Invoice
            </div>
        ),
    },
];

const tableHead: TableProps<DataType>['columns'] = [
    {
        title: 'INVOICE NUMBER',
        dataIndex: 'invoiceNumber',
        key: 'invoiceNumber',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'ORDER NUMBER',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customer',
        key: 'customer',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'TOTAL',
        dataIndex: 'total',
        key: 'total',
        render: (amount: number) => <p>৳ {amount}</p>,
    },
    {
        title: 'AMOUNT PAID',
        dataIndex: 'amountPaid',
        key: 'amountPaid',
        render: (amount: number) => <p>৳ {amount}</p>,
    },
    {
        title: 'DUE AMOUNT',
        dataIndex: 'dueAmount',
        key: 'dueAmount',
        render: (amount: number) => <p>৳ {amount}</p>,
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => <Status status={status} />,
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
