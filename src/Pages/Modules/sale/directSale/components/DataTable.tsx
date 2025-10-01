import { Dropdown, Space, Table, TableProps, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { DataType } from '../DirectSale.type';
import { tableData } from '../DirectSale.demo';

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

const tableHead: TableProps<DataType>['columns'] = [
    {
        title: 'ORDER NUMBER',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'SALE DATE',
        dataIndex: 'saleDate',
        key: 'saleDate',
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
        render: (amount: number) => (
            <p>
                <span className="kalpurush-font text-lg">৳ </span> {amount}
            </p>
        ),
    },
    {
        title: 'TOTAL TAX',
        dataIndex: 'totalTax',
        key: 'totalTax',
        render: (amount: number) => (
            <p>
                <span className="kalpurush-font text-lg">৳ </span> {amount}
            </p>
        ),
    },
    {
        title: 'TOTAL DISCOUNT',
        dataIndex: 'totalDiscount',
        key: 'totalDiscount',
        render: (amount: number) => (
            <p>
                <span className="kalpurush-font text-lg">৳ </span> {amount}
            </p>
        ),
    },
    {
        title: 'GRAND TOTAL',
        dataIndex: 'grandTotal',
        key: 'grandTotal',
        render: (amount: number) => (
            <p>
                <span className="kalpurush-font text-lg">৳ </span> {amount}
            </p>
        ),
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
        render: (status: boolean) => (
            <Tag color={status ? 'green' : 'red'}>
                {status ? 'Completed' : 'Draft'}
            </Tag>
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
