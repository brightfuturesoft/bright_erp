import { Dropdown, Space, Table, TableProps } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import Status from '@modules/common/components/Status';
import { tableData } from '@modules/sale/order/Order.demo';
import { DataType } from '@modules/sale/order/Order.type';

const items = [
    {
        key: '1',
        label: (
            <div onClick={() => console.log('Details clicked')}>Details</div>
        ),
    },
    {
        key: '2',
        label: <div onClick={() => console.log('Edit clicked')}>Edit</div>,
    },
    {
        key: '3',
        label: (
            <div onClick={() => console.log('Approve clicked')}>Approve</div>
        ),
    },
    {
        key: '4',
        label: (
            <div onClick={() => console.log('Cancel Order clicked')}>
                Cancel Order
            </div>
        ),
    },
    {
        key: '5',
        label: (
            <div onClick={() => console.log('Create Delivery clicked')}>
                Create Delivery
            </div>
        ),
    },
    {
        key: '6',
        label: (
            <div onClick={() => console.log('Create Invoice clicked')}>
                Create Invoice
            </div>
        ),
    },
    {
        key: '7',
        label: <div onClick={() => console.log('Delete clicked')}>Delete</div>,
    },
];

const tableHead: TableProps<DataType>['columns'] = [
    {
        title: 'ORDER NUMBER',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'QUOTATION NUMBER',
        dataIndex: 'quotationNumber',
        key: 'quotationNumber',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customer',
        key: 'customer',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'SUB TOTAL',
        dataIndex: 'subTotal',
        key: 'subTotal',
    },
    {
        title: 'TOTAL TAX',
        dataIndex: 'totalTax',
        key: 'totalTax',
    },
    {
        title: 'GRAND TOTAL',
        dataIndex: 'grandTotal',
        key: 'grandTotal',
    },
    {
        title: 'ORDER STATUS',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: (status: string) => <Status status={status} />,
    },
    {
        title: 'DELIVERY STATUS',
        dataIndex: 'deliveryStatus',
        key: 'deliveryStatus',
        render: (status: string) => <Status status={status} />,
    },
    {
        title: 'INVOICE STATUS',
        dataIndex: 'invoiceStatus',
        key: 'invoiceStatus',
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
