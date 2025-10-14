import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrdersData } from './data_get_api';
import OrderDetailsForm from './OrderDetailsForm';
import ProductListManager from './ProductListManager';
import OrderSummary from './OrderSummary';
import DeliveryInfo from './DeliveryInfo';
import Note_Input_Panel from './Note_Input_Panel';
import OrderHeader from './OrderHeader';
import { SalesInvoice } from './Invoice';

// ✅ Load html2pdf globally
declare global {
    interface Window {
        html2pdf: any;
    }
}

if (typeof window !== 'undefined' && !window.html2pdf) {
    const script = document.createElement('script');
    script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.async = true;
    document.head.appendChild(script);
}

const EcommerceOrderDetailsPage: React.FC = () => {
    const { id } = useParams();
    const { orders } = useOrdersData();
    const [order, setOrder] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!id) return;
        const orderData = orders?.find((o: any) => o.id === id || o._id === id);
        if (orderData) setOrder(orderData);
    }, [id, orders]);

    if (!order) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="flex justify-end px-6 py-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out font-medium"
                >
                    Generate Invoice
                </button>
            </div>

            {/* --- PDF Content Wrapper --- */}
            <div
                id="invoice-pdf-content"
                className="px-6 pb-10"
            >
                {/* Header */}
                <OrderHeader
                    order_number={order.order_number}
                    order_status={order.order_status}
                />

                {/* Order details and products */}
                <div className="flex items-start">
                    <OrderDetailsForm order={order} />
                    <ProductListManager order={order} />
                </div>

                {/* Summary and delivery info */}
                <OrderSummary order={order} />
                <DeliveryInfo />

                {/* Notes */}
                <Note_Input_Panel />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-[95%] max-w-5xl h-[90vh] overflow-y-auto relative p-6">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 text-2xl font-bold"
                        >
                            ×
                        </button>

                        {/* 🧾 Sales Invoice inside Modal */}
                        <SalesInvoice order={order} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EcommerceOrderDetailsPage;
