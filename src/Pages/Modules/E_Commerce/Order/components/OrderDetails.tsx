import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Image } from 'antd';
import Status from '@/Pages/Modules/common/components/Status';
import { rgbToHex, rgbToColorName } from '@/utils/colorConvert';
import { useOrdersData } from './data_get_api';
import OrderDetailsForm from './OrderDetailsForm';
import ProductListManager from './ProductListManager';
import OrderSummary from './OrderSummary';
import DeliveryInfo from './DeliveryInfo';
import Note_Input_Panel from './Note_Input_Panel';
import OrderHeader from './OrderHeader';

const EcommerceOrderDetailsPage: React.FC = () => {
    const { id } = useParams();
    const { orders } = useOrdersData();
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        if (!id) return;
        const orderData = orders?.find((o: any) => o.id === id || o._id === id);
        if (orderData) setOrder(orderData);
    }, [id, orders]);

    if (!order) return <div>Loading...</div>;

    console.log(order);

    return (
        <div className=" min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Header */}
            <OrderHeader
                order_number={order.order_number}
                order_status={order.order_status}
            />

            <div className="flex items-start">
                <OrderDetailsForm order={order} />
                <ProductListManager order={order} />
            </div>
            <OrderSummary order={order} />
            <DeliveryInfo />
            <Note_Input_Panel />
        </div>
    );
};

export default EcommerceOrderDetailsPage;
