import { Dropdown, Space, Table, TableProps } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import Status from '@modules/common/components/Status';
import { tableData } from '@modules/sale/quotation/Quotation.demo';
import { DataType } from '@modules/sale/quotation/Quotation.type';

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
            <div onClick={() => console.log('Cancel clicked')}>
                Create Order
            </div>
        ),
    },
    {
        key: '3',
        label: <div onClick={() => console.log('Edit clicked')}>Edit</div>,
    },
    {
        key: '4',
        label: (
            <div onClick={() => console.log('Approve clicked')}>Approve</div>
        ),
    },
    {
        key: '5',
        label: <div onClick={() => console.log('Delete clicked')}>Delete</div>,
    },
];

const tableHead: TableProps<DataType>['columns'] = [
    {
        title: 'QUOTATION NUMBER',
        dataIndex: 'quotationNumber',
        key: 'quotationNumber',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'QUOTATION DATE',
        dataIndex: 'quotationDate',
        key: 'quotationDate',
    },
    {
        title: 'VALID TILL DATE',
        dataIndex: 'validTillDate',
        key: 'validTillDate',
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customer',
        key: 'customer',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'CREATED BY',
        dataIndex: 'createdBy',
        key: 'createdBy',
    },
    {
        title: 'AMOUNT',
        dataIndex: 'amount',
        key: 'amount',
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
