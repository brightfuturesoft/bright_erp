import {
    Dropdown,
    Space,
    Table,
    TableProps,
    Modal,
    Descriptions,
    theme,
} from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { DataType } from '../Order.type';
import Status from '@/Pages/Modules/common/components/Status';
import { useState } from 'react';

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

interface DataTableProps {
    orders: any[];
}

const DataTable: React.FC<DataTableProps> = ({ orders }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

    const { token } = theme.useToken(); // 🎨 for dark/light theme

    const handleCustomerClick = (customer: any) => {
        setSelectedCustomer(customer);
        setIsModalVisible(true);
    };

    const dataSource = orders?.map((order, index) => ({
        key: order._id || index,
        orderNumber: order?.transactionId,
        date: order?.date,
        quotationNumber: order?.quotationNumber || null,
        customer: order?.customer || { name: 'Walk-in Customer' },
        subTotal: order?.subtotal,
        totalTax: order?.taxAmount,
        grandTotal: order?.total,
        orderStatus: order?.orderStatus || 'Pending',
        deliveryStatus: order?.deliveryStatus || 'Not Started',
        invoiceStatus: order?.invoiceStatus || 'Unpaid',
    }));

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
            render: (text: string) => <a>{text || '-'}</a>,
        },
        {
            title: 'CUSTOMER',
            dataIndex: 'customer',
            key: 'customer',
            render: (customer: any) => (
                <a
                    onClick={() => handleCustomerClick(customer)}
                    className="cursor-pointer"
                >
                    {customer?.name}
                </a>
            ),
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
            render: (status: string) => <Status status={status || 'Pending'} />,
        },
        {
            title: 'DELIVERY STATUS',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            render: (status: string) => (
                <Status status={status || 'Not Started'} />
            ),
        },
        {
            title: 'INVOICE STATUS',
            dataIndex: 'invoiceStatus',
            key: 'invoiceStatus',
            render: (status: string) => <Status status={status || 'Unpaid'} />,
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

    return (
        <>
            <Table
                columns={tableHead}
                dataSource={dataSource}
            />

            {/* 🧾 Customer Details Modal */}
            <Modal
                title="Customer Details"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                centered
                bodyStyle={{
                    backgroundColor: token.colorBgContainer,
                    color: token.colorText,
                }}
            >
                {selectedCustomer && (
                    <Descriptions
                        column={1}
                        bordered
                        labelStyle={{ fontWeight: 600 }}
                        contentStyle={{ color: token.colorText }}
                    >
                        <Descriptions.Item label="Name">
                            {selectedCustomer.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone">
                            {selectedCustomer.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {selectedCustomer.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address">
                            {selectedCustomer.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Customer Type">
                            {selectedCustomer.customer_type}
                        </Descriptions.Item>
                        <Descriptions.Item label="ID">
                            {selectedCustomer.id}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </>
    );
};

export default DataTable;
