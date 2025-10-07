import React from 'react';

interface Props {
    order_status: string;
    order_number: string;
}

const OrderHeader: React.FC<Props> = ({ order_status, order_number }) => {
    const statusColor = () => {
        switch (order_status) {
            case 'Processing':
                return 'bg-yellow-500 text-white';
            case 'Shipped':
                return 'bg-blue-500 text-white';
            case 'Delivered':
                return 'bg-green-500 text-white';
            case 'Cancelled':
                return 'bg-red-500 text-white';
            case 'Return':
                return 'bg-orange-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-5">
            Order Details: #{order_number}
            <span className={`text-sm px-2 py-1 rounded-full ${statusColor()}`}>
                {order_status}
            </span>
        </h1>
    );
};

export default OrderHeader;
