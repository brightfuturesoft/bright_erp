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

    const dataSource = orders?.map((order, index) => {
        const subTotal =
            order.products?.reduce(
                (sum, p) =>
                    sum +
                    (p.offer_price || p.normal_price || 0) * (p.quantity || 1),
                0
            ) || 0;

        return {
            key: order.order_number || index,
            orderNumber: order.order_number,
            date: new Date(order.created_at).toLocaleDateString(),
            customer: {
                id: order.delivery_address?.customer_id,
                name: order.delivery_address?.full_name,
            },
            subTotal: subTotal,
            discount: order.discount || 0,
            shipping: order.shipping_charge || 0,
            totalTax: order.tax_amount || 0,
            grandTotal: order.total_amount || subTotal,
            orderStatus: order.order_status || 'Pending',
            change: order.payment?.change || 0,
            createAt: order.createAt,
            updatedAt: order.updatedAt,
            delete: order.delete || false,
        };
    });

    const tableHead: TableProps<any>['columns'] = [
        {
            title: 'ORDER NUMBER',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            render: (_: any, record: any) => (
                <a
                    className="text-blue-600 cursor-pointer"
                    onClick={() =>
                        navigate(
                            `/dashboard/pos/order/invoice/${record.orderNumber}`,
                            {
                                state: { order: record },
                            }
                        )
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
            render: (date: string) => (
                <span>
                    {/* {need here time and date format} */}
                    {new Date(date).toLocaleString()}
                </span>
            ),
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
            title: 'CHANGE',
            dataIndex: 'change',
            key: 'change',
            // render: (val: number) => formatAmount(val),
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
            {console.log(selectedCustomer, 'selectedCustomer')}
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
                className="dark:text-white text-gray-900"
            >
                {selectedCustomer && (
                    <Descriptions
                        className="dark:text-white text-gray-900"
                        column={1}
                        bordered
                    >
                        <Descriptions.Item label="Name">
                            {selectedCustomer.name}
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
