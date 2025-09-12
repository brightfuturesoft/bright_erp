import React, { useContext, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import shapeTop from '../../../../../assets/images/shape-top.png';
import shapeBottom from '../../../../../assets/images/shape-bottom.png';
import { Button } from 'antd';
import ReactToPrint from 'react-to-print';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Newspaper, Printer } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import DashboardHeader from '@/Pages/Modules/CommonComponents/DashboardHeader';
import DashboardTitle from '@/Pages/Modules/CommonComponents/DashboardTitle';

const OrderInvoice: React.FC = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const { workspace } = useContext(Erp_context);

    // Get order from router state
    const { id } = useParams();
    const location = useLocation();
    let order = location.state?.order;

    if (order) {
        // Normalize fields
        order = {
            ...order,
            created_by: order.createdBy || order.created_by || 'N/A',
            transactionId: order.transactionId || order.orderNumber || id,
            subtotal: Number(order.subtotal || order.subTotal || 0),
            total: Number(order.total || order.grandTotal || 0),
            discountAmount: Number(order.discountAmount || order.discount || 0),
            taxAmount: Number(order.taxAmount || order.totalTax || 0),
            tax: Number(order.tax || 0),
            date: order.date ? order.date.split(' ')[0] : '',
            items:
                order.items?.map((item: any) => ({
                    ...item,
                    price: Number(item.price || item.selling_price || 0),
                    quantity: Number(item.quantity || 1),
                    item_name: item.item_name || item.name || 'Item',
                })) || [],
        };
    }

    const handleDownloadPdf = async () => {
        if (!componentRef.current) return;

        const originalDisplay = componentRef.current.style.display;
        componentRef.current.style.display = 'block';

        const canvas = await html2canvas(componentRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        let heightLeft = pdfHeight;
        let position = 0;
        while (heightLeft >= 0) {
            position = heightLeft - pdfHeight;
            if (position > 0) {
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            }
            heightLeft -= pdf.internal.pageSize.getHeight();
        }

        pdf.save(`invoice-${order?.transactionId}.pdf`);
        componentRef.current.style.display = originalDisplay;
    };

    return (
        <section>
            <header>
                <DashboardHeader>
                    <DashboardTitle
                        title={`Invoice ${order?.transactionId || ''}`}
                    />
                    <div className="flex items-center gap-2">
                        <ReactToPrint
                            trigger={() => (
                                <Button
                                    shape="circle"
                                    type="primary"
                                    size="large"
                                >
                                    <Printer
                                        className="text-light"
                                        strokeWidth={1.5}
                                        size={22}
                                    />
                                </Button>
                            )}
                            content={() => componentRef.current}
                            onBeforePrint={() => {
                                if (componentRef.current)
                                    componentRef.current.style.display =
                                        'block';
                            }}
                            onAfterPrint={() => {
                                if (componentRef.current)
                                    componentRef.current.style.display = 'none';
                            }}
                        />
                        <Button
                            shape="circle"
                            type="primary"
                            size="large"
                            onClick={handleDownloadPdf}
                        >
                            <Newspaper
                                size={23}
                                strokeWidth={1.5}
                            />
                        </Button>
                    </div>
                </DashboardHeader>
            </header>

            <div className="print-box md:block hidden">
                <main
                    ref={componentRef}
                    className="mx-auto max-w-screen-xl text-black relative bg-white shadow-lg border-gray-300 px-20 py-40"
                >
                    {/* Top Shape */}
                    <div
                        style={{
                            backgroundImage: `url(${shapeTop})`,
                            backgroundSize: '100% 100%',
                        }}
                        className="absolute top-0 left-0 right-0 h-[180px]"
                    ></div>

                    <div className="relative !z-[300]">
                        {/* Header */}
                        <header className="flex justify-between items-center mb-8">
                            <div>
                                <img
                                    src={workspace?.image}
                                    alt="logo"
                                    className="w-20"
                                />
                                <p className="mt-1">{workspace?.name}</p>
                                <p className="mt-1">{workspace?.address}</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-4xl font-semibold">
                                    INVOICE
                                </h2>
                                <p>
                                    Invoice No:{' '}
                                    <strong>{order?.transactionId}</strong>
                                </p>
                                <p>
                                    Invoice Date: <strong>{order?.date}</strong>
                                </p>
                                <p>
                                    Created By:{' '}
                                    <strong>{order?.created_by}</strong>
                                </p>
                            </div>
                        </header>

                        {/* Customer + Payment */}
                        <div className="flex justify-between">
                            <section className="mb-8">
                                <h3 className="text-lg font-semibold">
                                    Invoice To:
                                </h3>
                                <p>{order?.customer?.name}</p>
                                <p>Phone: {order?.customer?.phone || 'N/A'}</p>
                                <p>Email: {order?.customer?.email || 'N/A'}</p>
                                <p>
                                    Address: {order?.customer?.address || 'N/A'}
                                </p>
                            </section>
                            <section className="mb-8 text-end">
                                <h3 className="text-lg font-semibold">
                                    Payment Method
                                </h3>
                                <p>Shop: {order?.shopName}</p>
                                <p>Workspace ID: {order?.workspace_id}</p>
                                <p>
                                    Payment Status:{' '}
                                    {order?.invoiceStatus || 'Pending'}
                                </p>
                            </section>
                        </div>

                        {/* Items Table */}
                        <table className="w-full mb-8 border-collapse">
                            <thead className="bg-blue-600 text-light border-b">
                                <tr>
                                    <th className="py-2 px-4 text-left">
                                        DESCRIPTION
                                    </th>
                                    <th className="py-2 px-4 text-right">
                                        PRICE
                                    </th>
                                    <th className="py-2 px-4 text-right">
                                        QTY
                                    </th>
                                    <th className="py-2 px-4 text-right">
                                        SUBTOTAL
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {order?.items.length ? (
                                    order.items.map(
                                        (item: any, idx: number) => (
                                            <tr
                                                key={idx}
                                                className="border-b"
                                            >
                                                <td className="py-2 px-4">
                                                    {item.item_name}
                                                </td>
                                                <td className="py-2 px-4 text-right">
                                                    {item.price.toFixed(2)}
                                                </td>
                                                <td className="py-2 px-4 text-right">
                                                    {item.quantity}
                                                </td>
                                                <td className="py-2 px-4 text-right">
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </td>
                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="text-center py-4"
                                        >
                                            No items found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Totals */}
                        <div className="flex justify-end mb-8">
                            <div className="w-1/3">
                                <div className="flex justify-between border-t py-2">
                                    <span>Sub-total:</span>
                                    <span>{order?.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between border-t py-2">
                                    <span>Discount:</span>
                                    <span>
                                        {order?.discountAmount.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t py-2">
                                    <span>Tax ({order?.tax}%):</span>
                                    <span>{order?.taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between border-t border-b py-2 font-bold">
                                    <span>Total:</span>
                                    <span>{order?.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Terms */}
                        <section className="mb-8 w-1/2">
                            <h3 className="text-xl font-bold">
                                Terms and Conditions
                            </h3>
                            <p>
                                {workspace?.terms ||
                                    `Please send payment within 30 days of receiving
                                this invoice. Late payments may incur additional
                                charges.`}
                            </p>
                        </section>

                        {/* Footer */}
                        <footer className="flex justify-between items-center">
                            <div>
                                <p className="text-xl font-bold">
                                    Thank you for your business!
                                </p>
                                <p className="mt-2">
                                    Phone:{' '}
                                    {workspace?.contact_info?.phone_number ||
                                        '+123-456-7890'}
                                </p>
                                <p>
                                    Email:{' '}
                                    {workspace?.contact_info?.official_email ||
                                        workspace?.contact_info
                                            ?.support_email ||
                                        'info@example.com'}
                                </p>
                                <p>
                                    {workspace?.domain_info?.domain ||
                                        'www.example.com'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p>{workspace?.owner}</p>
                                <p className="font-semibold">Company CEO</p>
                            </div>
                        </footer>
                    </div>

                    {/* Bottom Shape */}
                    <div
                        style={{
                            backgroundImage: `url(${shapeBottom})`,
                            backgroundSize: '100% 100%',
                        }}
                        className="absolute bottom-0 left-0 right-0 h-[180px]"
                    ></div>
                </main>
            </div>
        </section>
    );
};

export default OrderInvoice;
