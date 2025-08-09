import Status from '@/Pages/Modules/common/components/Status';
import { Dropdown, Space, Table, TableProps } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { tableData } from '../Cusiner_debit.demo';

const items = [
    {
        key: '1',
        label: (
            <div onClick={() => console.log('Details clicked')}>Details</div>
        ),
    },
    {
        key: '2',
        label: <div onClick={() => console.log('Cancel clicked')}>Cancel</div>,
    },
];

const tableHead: TableProps<any>['columns'] = [
    {
        title: 'CUSTOMER NAME',
        dataIndex: ['customer', 'name'],
        key: 'customerName',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'PHONE',
        dataIndex: ['customer', 'phone'],
        key: 'phone',
    },
    {
        title: 'LAST PAYMENT DATE',
        dataIndex: ['order_info', 'last_payment_date'],
        key: 'lastPaymentDate',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'DUE AMOUNT',
        dataIndex: ['order_info', 'due_amount'],
        key: 'dueAmount',
        render: (amount: number) => (
            <p>
                <span className="kalpurush-font text-lg">৳ </span> {amount}
            </p>
        ),
    },
    {
        title: 'LAST INVOICE',
        dataIndex: ['order_info', 'last_invoice'],
        key: 'lastInvoice',
        render: (text: string) => <a>{text}</a>,
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
