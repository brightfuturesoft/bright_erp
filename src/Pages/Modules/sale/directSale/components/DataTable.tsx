import React, { useContext } from 'react';
import { Dropdown, Space, Table, TableProps, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Erp_context } from '@/provider/ErpContext';
import { SaleRowType } from '../DirectSale.type';

interface DirectSaleTableProps {
    tableData: SaleRowType[];
    refetch?: () => void;
}

const DirectSaleTable: React.FC<DirectSaleTableProps> = ({
    refetch,
    tableData,
}) => {
    const { user } = useContext(Erp_context);
    const navigate = useNavigate();

    // 🔹 Update Order Status
    const handleUpdateStatus = async (record: SaleRowType, status: string) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}sale/direct_sale/update-direct-sale`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify({
                        id: record?._id,
                        order_status: status,
                    }),
                }
            );
            const result = await res.json();
            refetch();
            if (result.error) message.error(result.message);
            else message.success(`Order marked as ${status}`);
        } catch (error) {
            console.error(error);
            message.error('Failed to update status');
        }
    };

    // 🔹 Delete Order
    const handleDelete = async (record: SaleRowType) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}sale/direct_sale/delete-direct-sale`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify({ id: record?._id }),
                }
            );
            const result = await res.json();
            refetch();
            if (result.error) message.error(result.message);
            else message.success('Order deleted successfully');
        } catch (error) {
            console.error(error);
            message.error('Failed to delete order');
        }
    };

    // 🔹 Columns for order-level table
    const columns: TableProps<SaleRowType>['columns'] = [
        { title: 'ORDER NO', dataIndex: 'order_number', key: 'order_number' },
        { title: 'CUSTOMER', dataIndex: 'customer_name', key: 'customer_name' },
        { title: 'PHONE', dataIndex: 'customer_phone', key: 'customer_phone' },
        {
            title: 'SALES PERSON',
            dataIndex: 'sales_person',
            key: 'sales_person',
        },
        {
            title: 'GRAND TOTAL',
            dataIndex: 'grand_total',
            key: 'grand_total',
            render: (amount: number) => (
                <p>
                    <span className="kalpurush-font text-lg">৳ </span>
                    {amount.toFixed(2)}
                </p>
            ),
        },
        {
            title: 'PAID',
            dataIndex: 'paid_amount',
            key: 'paid_amount',
            render: (amount: number) => (
                <p>
                    <span className="kalpurush-font text-lg">৳ </span>
                    {amount.toFixed(2)}
                </p>
            ),
        },
        {
            title: 'DUE',
            dataIndex: 'due_amount',
            key: 'due_amount',
            render: (amount: number) => (
                <p>
                    <span className="kalpurush-font text-lg">৳ </span>
                    {amount.toFixed(2)}
                </p>
            ),
        },
        {
            title: 'STATUS',
            dataIndex: 'order_status',
            key: 'order_status',
            render: (order_status: string) => {
                let color: string = 'default';
                let label: string = order_status || 'Unknown';

                switch (order_status?.toLowerCase()) {
                    case 'processing':
                        color = 'blue';
                        label = 'Processing';
                        break;
                    case 'delivered':
                        color = 'green';
                        label = 'Delivered';
                        break;
                    case 'cancelled':
                        color = 'red';
                        label = 'Cancelled';
                        break;
                    case 'refuned':
                        color = 'orange';
                        label = 'Refuned';
                        break;
                    default:
                        color = 'default';
                }

                return (
                    <Tag
                        color={color}
                        className=" font-semibold"
                    >
                        {label.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'ACTIONS',
            key: 'actions',
            render: (_: any, record: SaleRowType) => {
                const menuItems = [
                    {
                        key: 'details',
                        label: (
                            <div
                                onClick={() =>
                                    navigate(
                                        `/dashboard/sale/direct-sale/${record._id}`
                                    )
                                }
                            >
                                View Details
                            </div>
                        ),
                    },
                    {
                        key: 'delivered',
                        label: (
                            <div
                                onClick={() =>
                                    handleUpdateStatus(record, 'Delivered')
                                }
                            >
                                Mark as Delivered
                            </div>
                        ),
                    },
                    {
                        key: 'cancel',
                        label: (
                            <div
                                onClick={() =>
                                    handleUpdateStatus(record, 'Cancelled')
                                }
                            >
                                Mark as Cancelled
                            </div>
                        ),
                    },
                    {
                        key: 'refuned',
                        label: (
                            <div
                                onClick={() =>
                                    handleUpdateStatus(record, 'Refuned')
                                }
                            >
                                Mark as Refuned
                            </div>
                        ),
                    },
                    {
                        key: 'delete',
                        label: (
                            <div onClick={() => handleDelete(record)}>
                                Delete Order
                            </div>
                        ),
                    },
                ];

                return (
                    <Space size="middle">
                        <Dropdown
                            menu={{ items: menuItems }}
                            trigger={['click']}
                        >
                            <a>
                                <EllipsisVertical className="hover:cursor-pointer" />
                            </a>
                        </Dropdown>
                    </Space>
                );
            },
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={tableData}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
        />
    );
};

export default DirectSaleTable;
