import React, { useState, useEffect } from 'react';
import { useOrdersData } from './data_get_api';
declare global {
    interface Window {
        html2pdf: any;
    }
}

// Make html2pdf available globally
// This is a workaround for single-file React apps where external libraries
// are typically imported via script tags rather than npm.
if (typeof window !== 'undefined' && !window.html2pdf) {
    const script = document.createElement('script');
    script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => {
        console.log('html2pdf.js loaded successfully');
    };
    document.head.appendChild(script);
}
interface SalesInvoiceProps {
    order: any;
}
export const SalesInvoice: React.FC<SalesInvoiceProps> = ({ order }) => {
    const { workspace } = useOrdersData();
    if (!order || !workspace) return null;

    if (!order || !workspace) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-xl text-gray-700">Loading invoice...</div>
            </div>
        );
    }

    const handleBrowserPrint = () => {
        const element = document.getElementById('invoice-content');
        if (!element) return;

        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (!printWindow) return;

        // Collect all Tailwind / global CSS links
        const styles = Array.from(
            document.querySelectorAll("link[rel='stylesheet'], style")
        )
            .map(node => node.outerHTML)
            .join('\n');

        printWindow.document.open();
        printWindow.document.write(`
    <html>
      <head>
        <title>Invoice</title>
        ${styles}
        <style>
          body { -webkit-print-color-adjust: exact; color-adjust: exact; margin: 0; }
          .invoice-print-container { padding: 1in; }
        </style>
      </head>
      <body>
        <div class="invoice-print-container">
          ${element.outerHTML}
        </div>
      </body>
    </html>
  `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    // Download PDF function
    const handleDownloadPDF = () => {
        const element = document.getElementById('invoice-content');
        if (element) {
            const opt = {
                margin: [0.5, 0.5, 0.5, 0.5],
                filename: `Invoice-${order.order_number}.pdf`,
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            };

            const htmlContent = `
        <style>
          .pdf-text-color * {
            color: #000 !important;
          }
        </style>
        <div class="pdf-text-color">
          ${element.innerHTML}
        </div>
      `;

            if (window.html2pdf) {
                window.html2pdf().set(opt).from(htmlContent).save();
            } else {
                console.error('html2pdf library is not loaded.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
            <div
                className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-md"
                id="invoice-content"
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        {workspace.image && (
                            <img
                                src={workspace.image}
                                alt={workspace.name}
                                className="w-32 h-32 object-contain rounded-md"
                            />
                        )}
                    </div>
                    <div className="text-right text-sm md:text-base text-gray-700">
                        <div>{workspace.address_info?.address}</div>
                        <div>
                            {workspace.address_info?.city},{' '}
                            {workspace.address_info?.state}
                        </div>
                        <div>
                            {workspace.contact_info?.official_email ||
                                workspace.contact_info?.support_email}
                        </div>
                        <div>{workspace.contact_info?.phone_number?.[0]}</div>
                    </div>
                </div>

                {/* Invoice Title */}
                <div className="bg-gray-200 text-center py-3 mb-6 rounded-md">
                    <h1 className="font-semibold text-gray-800 text-lg md:text-xl">
                        SALES INVOICE
                    </h1>
                </div>

                {/* Customer & Invoice Details */}
                <div className="flex flex-col lg:flex-row justify-between mb-6 gap-6">
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-800">
                            Customer Details:
                        </h3>
                        <div className="text-gray-700 text-sm md:text-base space-y-1">
                            <div>
                                <span className="font-medium">Name:</span>{' '}
                                {order.delivery_address.full_name}
                            </div>
                            <div>
                                <span className="font-medium">Phone:</span>{' '}
                                {order.delivery_address.phone_number}
                            </div>
                            <div>
                                <span className="font-medium">Address:</span>{' '}
                                {order.delivery_address.street},{' '}
                                {order.delivery_address.city}
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-gray-700 text-sm md:text-base space-y-1">
                            <div>
                                <span className="font-medium">Invoice No:</span>{' '}
                                {order.order_number}
                            </div>
                            <div>
                                <span className="font-medium">
                                    Invoice Date:
                                </span>{' '}
                                {new Date().toDateString()}
                            </div>
                            <div>
                                <span className="font-medium">Order Date:</span>{' '}
                                {new Date(order.created_at).toDateString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse rounded-md overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left font-semibold border-b">
                                    PHOTO
                                </th>
                                <th className="p-3 text-left font-semibold border-b">
                                    NAME
                                </th>
                                <th className="p-3 text-center font-semibold border-b">
                                    QUANTITY
                                </th>
                                <th className="p-3 text-right font-semibold border-b">
                                    PRICE
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.products.map((p, i) => (
                                <tr
                                    key={i}
                                    className="border-b"
                                >
                                    <td className="p-3">
                                        <img
                                            src={p.product_image}
                                            alt={p.product_name}
                                            className="w-16 h-16 object-contain rounded-md"
                                        />
                                    </td>
                                    <td className="p-3">
                                        <div className="text-gray-700">
                                            <div className="font-medium">
                                                {p.product_name}
                                            </div>
                                            <div className="text-sm">
                                                Color:{' '}
                                                {p.variation?.color || 'N/A'}
                                            </div>
                                            <div className="text-sm">
                                                Size:{' '}
                                                {p.variation?.size || 'N/A'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3 text-center">
                                        {p.quantity}
                                    </td>
                                    <td className="p-3 text-right">
                                        TK.{p.order_price.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="flex justify-end">
                    <div className="w-full md:w-80 space-y-1 bg-gray-100 p-3 rounded-md">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>
                                TK.
                                {order.sub_total?.toFixed(2) ||
                                    order.total_amount?.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>
                                TK.{order.shipping_charge?.toFixed(2) || '0.00'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span>
                                TK.{order.discount?.toFixed(2) || '0.00'}
                            </span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-2">
                            <span>GRAND TOTAL</span>
                            <span>TK.{order.total_amount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-center gap-4">
                <button
                    onClick={handleBrowserPrint}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200 ease-in-out font-medium"
                >
                    Print Invoice
                </button>
                <button
                    onClick={handleDownloadPDF}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all duration-200 ease-in-out font-medium"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};
