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
import Status from '@/Pages/Modules/common/components/Status';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const { token } = theme.useToken();
    const navigate = useNavigate();

    const handleCustomerClick = (customer: any) => {
        setSelectedCustomer(customer);
        setIsModalVisible(true);
    };

    /** 🔹 Format numbers to 2 decimal places */
    const formatAmount = (value: number | undefined) => {
        if (value == null || isNaN(value)) return '0.00';
        return Number(value).toFixed(2);
    };

    /** 🔹 Transform API response into AntD table-ready format */
    /** 🔹 Transform API response into AntD table-ready format */
    const dataSource = orders?.map((order, index) => ({
        key: order._id || index,
        transactionId: order.transactionId,
        orderNumber: order.transactionId,
        date: order.date,
        time: order.time,
        shopName: order.shopName,
        workspace_id: order.workspace_id,
        customer: order.customer || { id: 'walk-in', name: 'Walk-in Customer' },
        subtotal: order.subtotal,
        discount: order.discount,
        discountAmount: order.discountAmount,
        shipping: order.shipping,
        tax: order.tax,
        taxAmount: order.taxAmount,
        total: order.total,
        items: order.items || [],
        created_by: order.created_by,
        createAt: order.createAt,
        updatedAt: order.updatedAt,
        orderStatus: order.status || 'Active',
        delete: order.delete || false,
    }));

    /** 🔹 Define table headers */
    const tableHead: TableProps<any>['columns'] = [
        {
            title: 'ORDER NUMBER',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            render: (_: any, record: any) => (
                <a
                    className="text-blue-600 cursor-pointer"
                    onClick={() =>
                        navigate(`/dashboard/invoice/${record.orderNumber}`, {
                            state: { order: record },
                        })
                    }
                >
                    {record.orderNumber}
                </a>
            ),
        },
        {
            title: 'DATE',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'SHOP NAME',
            dataIndex: 'shopName',
            key: 'shopName',
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
            render: (val: number) => formatAmount(val),
        },
        {
            title: 'DISCOUNT',
            dataIndex: 'discount',
            key: 'discount',
            render: (val: number) => formatAmount(val),
        },
        {
            title: 'SHIPPING',
            dataIndex: 'shipping',
            key: 'shipping',
            render: (val: number) => formatAmount(val),
        },
        {
            title: 'TOTAL TAX',
            dataIndex: 'totalTax',
            key: 'totalTax',
            render: (val: number) => formatAmount(val),
        },
        {
            title: 'GRAND TOTAL',
            dataIndex: 'grandTotal',
            key: 'grandTotal',
            render: (val: number) => formatAmount(val),
        },
        {
            title: 'ORDER STATUS',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: (status: string) => <Status status={status || 'Pending'} />,
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
