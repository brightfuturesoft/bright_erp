import { Dropdown, Space, Table, TableProps } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { DataType } from '../Return.type';
import Status from '@/Pages/Modules/common/components/Status';
import { tableData } from '../Return.demo';

const items = [
    {
        key: '1',
        label: (
            <div onClick={() => console.log('Details clicked')}>Details</div>
        ),
    },

    {
        key: '2',
        label: <div onClick={() => console.log('Cancel  clicked')}>Cancel</div>,
    },
];

const tableHead: TableProps<DataType>['columns'] = [
    {
        title: 'RETURN NUMBER',
        dataIndex: 'returnNumber',
        key: 'returnNumber',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'RETURN DATE',
        dataIndex: 'returnDate',
        key: 'returnDate',
    },
    {
        title: 'REFERENCE',
        dataIndex: 'reference',
        key: 'reference',
        render: (text: string) => <a>{text}</a>,
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
        title: 'RETURN AMOUNT',
        dataIndex: 'returnAmount',
        key: 'returnAmount',
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
