import Status from '@/Pages/Modules/common/components/Status';
import { Dropdown, Space, Table, TableProps } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { tableData } from '../refund.demo';

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

const tableHead: TableProps['columns'] = [
    {
        title: 'REFUND ID',
        dataIndex: 'refundId',
        key: 'refundId',
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
        render: text => text,
    },
    {
        title: 'CUSTOMER',
        key: 'customer',
        render: (_, record) => (
            <>
                <p className="font-medium">{record.customer.name}</p>
                <p className="text-gray-500 text-sm">{record.customer.phone}</p>
            </>
        ),
    },
    {
        title: 'INVOICE',
        dataIndex: ['invoice', 'invoiceId'],
        key: 'invoiceId',
        render: text => <a>{text}</a>,
    },
    {
        title: 'REFUND AMOUNT',
        key: 'refundAmount',
        align: 'right',
        render: (_, record) => (
            <span>
                <span className="kalpurush-font text-lg">৳</span>{' '}
                {record.invoice.refundAmount.toFixed(2)}
            </span>
        ),
    },
    {
        title: 'METHOD',
        dataIndex: 'method',
        key: 'method',
    },
    {
        title: 'REASON',
        dataIndex: 'reason',
        key: 'reason',
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
        render: status => <Status status={status} />,
    },
    {
        title: 'ACTION',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'view',
                                label: (
                                    <span
                                        onClick={() =>
                                            alert(`Viewing ${record.refundId}`)
                                        }
                                    >
                                        View Details
                                    </span>
                                ),
                            },
                            {
                                key: 'approve',
                                label: (
                                    <span
                                        onClick={() =>
                                            alert(
                                                `Approving refund ${record.refundId}`
                                            )
                                        }
                                    >
                                        Approve
                                    </span>
                                ),
                            },
                            {
                                key: 'print',
                                label: (
                                    <span
                                        onClick={() =>
                                            alert(
                                                `Printing receipt for ${record.refundId}`
                                            )
                                        }
                                    >
                                        Print Receipt
                                    </span>
                                ),
                            },
                        ],
                    }}
                    trigger={['click']}
                >
                    <a onClick={e => e.preventDefault()}>
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
        pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            position: ['bottomRight'],
            className: 'custom-antd-pagination',
        }}
    />
);

export default DataTable;
