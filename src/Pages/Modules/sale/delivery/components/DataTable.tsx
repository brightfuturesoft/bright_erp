import { Dropdown, Space, Table, TableProps } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { DataType } from '../Delivery.type';
import Status from '@/Pages/Modules/common/components/Status';
import { tableData } from '../Delivery.demo';

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
            <div onClick={() => console.log('Create Invoice clicked')}>
                Create Invoice
            </div>
        ),
    },
    {
        key: '3',
        label: <div onClick={() => console.log('Cancel clicked')}>Cancel</div>,
    },
    {
        key: '4',
        label: (
            <div onClick={() => console.log('Mark as Delivered clicked')}>
                Mark as Delivered
            </div>
        ),
    },
];

const tableHead: TableProps<DataType>['columns'] = [
    {
        title: 'DELIVERY NUMBER',
        dataIndex: 'deliveryNumber',
        key: 'deliveryNumber',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'DELIVERY DATE',
        dataIndex: 'deliveryDate',
        key: 'deliveryDate',
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
        title: 'DELIVERY TYPE',
        dataIndex: 'deliveryType',
        key: 'deliveryType',
    },
    {
        title: 'DELIVERY CHARGE',
        dataIndex: 'deliveryCharge',
        key: 'deliveryCharge',
    },
    {
        title: 'DELIVERY CHANNEL',
        dataIndex: 'deliveryChannel',
        key: 'deliveryChannel',
    },
    {
        title: 'CHANNEL CHARGE',
        dataIndex: 'channelCharge',
        key: 'channelCharge',
    },
    {
        title: 'CONSIGNMENT ID',
        dataIndex: 'consignmentId',
        key: 'consignmentId',
    },
    {
        title: 'DELIVERY STATUS',
        dataIndex: 'deliveryStatus',
        key: 'deliveryStatus',
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
