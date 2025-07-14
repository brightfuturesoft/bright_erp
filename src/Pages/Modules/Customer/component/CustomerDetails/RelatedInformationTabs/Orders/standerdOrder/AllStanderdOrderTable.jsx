import React, { useState } from 'react';
import { Table, Button, Select, Input, Dropdown, Menu } from 'antd';
import { MoreVertical, Search } from 'lucide-react';
import CancelOrderModal from './modals/CancelOrderModal';
const { Option } = Select;

const AllStanderdOrderTable = () => {
    const initialDataSource = [
        {
            key: '1',
            orderNumber: '12345',
            date: '2024-07-16',
            quotationNumber: 'Q-12345',
            customer: 'John Doe',
            subTotal: '$100.00',
            totalTax: '$10.00',
            grandTotal: '$110.00',
            orderStatus: 'Completed',
            deliveryStatus: 'Delivered',
            invoiceStatus: 'Paid',
        },
        {
            key: '2',
            orderNumber: '12346',
            date: '2024-07-17',
            quotationNumber: 'Q-12346',
            customer: 'Jane Smith',
            subTotal: '$200.00',
            totalTax: '$20.00',
            grandTotal: '$220.00',
            orderStatus: 'Pending',
            deliveryStatus: 'Pending',
            invoiceStatus: 'Unpaid',
        },
        {
            key: '3',
            orderNumber: '12347',
            date: '2024-07-18',
            quotationNumber: 'Q-12347',
            customer: 'Alice Johnson',
            subTotal: '$150.00',
            totalTax: '$15.00',
            grandTotal: '$165.00',
            orderStatus: 'Completed',
            deliveryStatus: 'Delivered',
            invoiceStatus: 'Paid',
        },
        {
            key: '4',
            orderNumber: '12348',
            date: '2024-07-19',
            quotationNumber: 'Q-12348',
            customer: 'Bob Brown',
            subTotal: '$120.00',
            totalTax: '$12.00',
            grandTotal: '$132.00',
            orderStatus: 'Shipped',
            deliveryStatus: 'Shipped',
            invoiceStatus: 'Pending',
        },
        {
            key: '5',
            orderNumber: '12349',
            date: '2024-07-20',
            quotationNumber: 'Q-12349',
            customer: 'Charlie Green',
            subTotal: '$180.00',
            totalTax: '$18.00',
            grandTotal: '$198.00',
            orderStatus: 'Cancelled',
            deliveryStatus: 'Not Delivered',
            invoiceStatus: 'Unpaid',
        },
        {
            key: '6',
            orderNumber: '12350',
            date: '2024-07-21',
            quotationNumber: 'Q-12350',
            customer: 'Dana White',
            subTotal: '$140.00',
            totalTax: '$14.00',
            grandTotal: '$154.00',
            orderStatus: 'Processing',
            deliveryStatus: 'Pending',
            invoiceStatus: 'Unpaid',
        },
        {
            key: '7',
            orderNumber: '12351',
            date: '2024-07-22',
            quotationNumber: 'Q-12351',
            customer: 'Eve Black',
            subTotal: '$160.00',
            totalTax: '$16.00',
            grandTotal: '$176.00',
            orderStatus: 'Completed',
            deliveryStatus: 'Delivered',
            invoiceStatus: 'Paid',
        },
        {
            key: '8',
            orderNumber: '12352',
            date: '2024-07-23',
            quotationNumber: 'Q-12352',
            customer: 'Frank White',
            subTotal: '$110.00',
            totalTax: '$11.00',
            grandTotal: '$121.00',
            orderStatus: 'Completed',
            deliveryStatus: 'Delivered',
            invoiceStatus: 'Paid',
        },
        {
            key: '9',
            orderNumber: '12353',
            date: '2024-07-24',
            quotationNumber: 'Q-12353',
            customer: 'Grace Grey',
            subTotal: '$170.00',
            totalTax: '$17.00',
            grandTotal: '$187.00',
            orderStatus: 'Pending',
            deliveryStatus: 'Pending',
            invoiceStatus: 'Unpaid',
        },
        {
            key: '10',
            orderNumber: '12354',
            date: '2024-07-25',
            quotationNumber: 'Q-12354',
            customer: 'Henry Blue',
            subTotal: '$130.00',
            totalTax: '$13.00',
            grandTotal: '$143.00',
            orderStatus: 'Processing',
            deliveryStatus: 'Pending',
            invoiceStatus: 'Unpaid',
        },
    ];

    const [dataSource, setDataSource] = useState(initialDataSource);
    const [pageSize, setPageSize] = useState(3);
    const [searchText, setSearchText] = useState('');
    const [cancelOrderVisible, setCancelOrderVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchOn, setSearchOn] = useState(false);

    const handleSearch = value => {
        setSearchText(value);
        const filteredData = initialDataSource.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(value.toLowerCase())
            )
        );
        setDataSource(filteredData);
    };

    const handlePageSizeChange = value => {
        setPageSize(value);
    };

    const getStatusStyle = status => {
        // Your status styles here
    };

    const handleMenuClick = (key, record) => {
        if (key === '2') {
            setSelectedOrder(record);
            setCancelOrderVisible(true);
        }
        console.log(`Clicked menu item ${key}`);
        // Add your action here based on the clicked item
    };

    const handleCancelOrder = () => {
        // Add logic to handle order cancellation here
        setCancelOrderVisible(false);
    };

    const menuItems = [
        {
            key: '0',
            label: 'Details',
        },
        {
            key: '1',
            label: 'Edit',
        },
        {
            key: '2',
            label: 'Cancel order',
        },
        {
            key: '3',
            label: 'View Details',
        },
        {
            key: '4',
            label: 'Approve',
        },
        {
            key: '5',
            label: 'Create Delivery',
        },
        {
            key: '6',
            label: 'Create Invoice',
        },
        {
            key: '7',
            label: 'Delete',
        },
    ];

    const columns = [
        {
            title: 'Order Number',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Quotation Number',
            dataIndex: 'quotationNumber',
            key: 'quotationNumber',
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Sub Total',
            dataIndex: 'subTotal',
            key: 'subTotal',
        },
        {
            title: 'Total Tax',
            dataIndex: 'totalTax',
            key: 'totalTax',
        },
        {
            title: 'Grand Total',
            dataIndex: 'grandTotal',
            key: 'grandTotal',
        },
        {
            title: 'Order Status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: status => (
                <span
                    style={getStatusStyle(status)}
                    className="px-2 py-1 rounded"
                >
                    {status}
                </span>
            ),
        },
        {
            title: 'Delivery Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            render: status => (
                <span
                    style={getStatusStyle(status)}
                    className="px-2 py-1 rounded"
                >
                    {status}
                </span>
            ),
        },
        {
            title: 'Invoice Status',
            dataIndex: 'invoiceStatus',
            key: 'invoiceStatus',
            render: status => (
                <span
                    style={getStatusStyle(status)}
                    className="px-2 py-1 rounded"
                >
                    {status}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Dropdown
                    overlay={
                        <Menu
                            items={menuItems.map(item => ({
                                key: item.key,
                                label: item.label,
                                onClick: () =>
                                    handleMenuClick(item.key, record),
                            }))}
                        />
                    }
                    trigger={['click']}
                >
                    <Button
                        shape="circle"
                        icon={
                            <MoreVertical
                                size={16}
                                className="shadow-none !bg-transparent dark:text-light text-dark"
                            />
                        }
                    />
                </Dropdown>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                    <label
                        htmlFor="show"
                        className="md:text-md text-xs"
                    >
                        Show Page
                    </label>
                    <Select
                        id="show"
                        defaultValue={3}
                        className="md:w-[120px] w-[80px] md:block hidden px-1"
                        onChange={handlePageSizeChange}
                    >
                        <Option value={3}>3</Option>
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={20}>20</Option>
                    </Select>
                </div>

                <div className="md:flex hidden items-center gap-1 border dark:border-dark-gray rounded px-2 w-[400px] ml-auto">
                    <Input
                        className="border-none focus-within:border-none focus-within:outline-none "
                        placeholder="Search...."
                        value={searchText}
                        onChange={e => handleSearch(e.target.value)}
                    />
                    <button>
                        <Search size={17} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <Select
                        id="show"
                        defaultValue={3}
                        className="md:w-[120px] w-[80px] md:hidden block py-1 px-1"
                        onChange={handlePageSizeChange}
                    >
                        <Option value={3}>3</Option>
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={20}>20</Option>
                    </Select>

                    <Button
                        className="bg-transparent dark:border-dark-gray hover:!bg-transparent md:hidden block"
                        onClick={() => setSearchOn(!searchOn)}
                        shape="circle"
                        icon={
                            <Search
                                size={16}
                                className="dark:text-light text-dark"
                            />
                        }
                    />
                </div>
            </div>

            {searchOn && (
                <div className="md:hidden mt-2 flex items-center gap-1 border dark:border-dark-gray rounded px-2 w-full ml-auto">
                    <Input
                        className="border-none focus-within:border-none focus-within:outline-none "
                        placeholder="Search...."
                        value={searchText}
                        onChange={e => handleSearch(e.target.value)}
                    />
                    {/* <button>
                        <Search size={17} />
                    </button> */}
                </div>
            )}

            <div className="dark:bg-light-dark mt-3">
                <Table
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        pageSize: pageSize,
                    }}
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>

            <CancelOrderModal
                cancelOrderVisible={cancelOrderVisible}
                handleCancelOrder={handleCancelOrder}
                setCancelOrderVisible={setCancelOrderVisible}
                selectedOrder={selectedOrder}
            >
                <p>
                    Are you sure you want to cancel the order{' '}
                    {selectedOrder?.orderNumber}?
                </p>
            </CancelOrderModal>
        </div>
    );
};

export default AllStanderdOrderTable;
