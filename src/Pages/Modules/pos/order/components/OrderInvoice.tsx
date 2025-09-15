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
import DashboardContentHeader from '@/wraper/DashboardContentHeader';
import { useQuery } from '@tanstack/react-query';

const OrderInvoice: React.FC = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const { workspace, user } = useContext(Erp_context);
    const { id } = useParams();
    console.log(id, 'location');

    const {
        data: order_info,
        isLoading: customer_pos_order_loading,
        isError: is_customer_pos_order_error,
        refetch: customer_pos_order_refetch,
    } = useQuery({
        queryKey: ['single_order_info'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}customers-order/pos/order/get-single-order?order_number=${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!response.ok) throw new Error('Failed to fetch customers');
            const data = await response.json();
            return data.data;
        },
    });

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

        pdf.save(`invoice-${order_info?.transactionId}.pdf`);
        componentRef.current.style.display = originalDisplay;
    };

    return (
        <section>
            <header>
                <DashboardContentHeader>
                    <DashboardTitle
                        title={`Invoice ${order_info?.order_number || ''}`}
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
                </DashboardContentHeader>
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
                                    <strong>{order_info?.order_number}</strong>
                                </p>
                                <p>
                                    Invoice Date:{' '}
                                    <strong>
                                        {new Date(
                                            order_info?.created_at
                                        ).toDateString()}
                                    </strong>
                                </p>
                                <p>
                                    Created By:
                                    <strong>{order_info?.cashier_name}</strong>
                                </p>
                            </div>
                        </header>

                        {/* Customer + Payment */}
                        <div className="flex justify-between">
                            <section className="mb-8 flex gap-1 items-center">
                                <h3 className="text-lg font-semibold">
                                    Invoice To:
                                </h3>
                                <p>{order_info?.delivery_address?.full_name}</p>
                            </section>
                            <section className="mb-8 text-end">
                                {/* <h3 className="text-lg font-semibold">
                                                      Payment Method
                                                </h3> */}
                                <p>
                                    Payment Method:{' '}
                                    <span className="font-semibold uppercase">
                                        {order_info?.payment?.payment_method}
                                    </span>
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
                                {order_info?.products?.length ? (
                                    order_info.products.map(
                                        (item: any, idx: number) => (
                                            <tr
                                                key={idx}
                                                className="border-b"
                                            >
                                                <td className="py-2 px-4">
                                                    {item.item_name}
                                                </td>
                                                <td className="py-2 px-4 text-right">
                                                    {item.offer_price ||
                                                        item.normal_price}
                                                </td>
                                                <td className="py-2 px-4 text-right">
                                                    {item.quantity}
                                                </td>
                                                <td className="py-2 px-4 text-right">
                                                    {(item.offer_price ||
                                                        item.normal_price) *
                                                        item.quantity}
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
                                    <span>
                                        {order_info?.products?.reduce(
                                            (total, item) =>
                                                total +
                                                (item.offer_price ||
                                                    item.normal_price) *
                                                    item.quantity,
                                            0
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t py-2">
                                    <span>Discount:</span>
                                    <span>{order_info?.discount}</span>
                                </div>
                                <div className="flex justify-between border-t py-2">
                                    <span>Tax :</span>
                                    <span>
                                        {order_info?.tax_amount.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-b py-2 font-bold">
                                    <span>Total:</span>
                                    <span>{order_info?.total_amount}</span>
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
