import React, { useRef } from 'react';
import { Alert, Button } from 'antd';
import { DownloadOutlined, PrinterOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DashboardContentHeader from '../../../../wraper/DashboardContentHeader';
import DashboardTitle from '../../CommonComponents/DashboardTitle';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DownloadArea from './DownloadArea';
import { useReactToPrint } from 'react-to-print';

const CustomerLedgerInvoice: React.FC = () => {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const items = [
        {
            item: 'ITEM_1',
            description: 'Description for item 1',
            orderedQty: 10,
            billedQty: 10,
            deliveredQty: 10,
            returnedQty: 0,
            price: 100,
            discount: 5,
            amount: 95,
        },
        {
            item: 'ITEM_2',
            description: 'Description for item 2',
            orderedQty: 5,
            billedQty: 5,
            deliveredQty: 5,
            returnedQty: 0,
            price: 50,
            discount: 10,
            amount: 45,
        },
    ];

    const invoiceId = 'INV12345';
    const customerName = 'John Doe';
    const total = items.reduce((sum, item) => sum + item.amount, 0);
    const adjustmentAmount = 20;
    const subtotal = total - adjustmentAmount;
    const grandTotal = total;

    const handleBack = () => {
        navigate(-1);
    };

    const handleDownloadPDF = () => {
        const input = invoiceRef.current;
        if (input) {
            html2canvas(input, { scale: 2 }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgWidth = 210;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save(`invoice_${invoiceId}.pdf`);
            });
        }
    };

    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
        documentTitle: `invoice_${invoiceId}`,
        onAfterPrint: () => console.log('Print success!'),
    });

    return (
        <div style={{ padding: '10px' }}>
            <DashboardContentHeader>
                <DashboardTitle title="Product Name" />
                <div className="flex items-center gap-2">
                    <Button
                        icon={<ArrowLeft size={17} />}
                        onClick={handleBack}
                        danger
                        className="bg-danger hover:dark:!text-light hover:!text-dark hover:!bg-transparent flex gap-1 px-2 !rounded-sm !text-light"
                    >
                        Back
                    </Button>
                    <Button
                        icon={<DownloadOutlined />}
                        onClick={handleDownloadPDF}
                        className="!border-primary hover:dark:!text-light hover:!text-dark bg-primary hover:!bg-transparent !rounded-sm !text-light"
                    >
                        PDF
                    </Button>
                    <Button
                        icon={<PrinterOutlined />}
                        onClick={handlePrint}
                        className="!border-primary bg-primary hover:!bg-transparent hover:dark:!text-light hover:!text-dark !rounded-sm !text-light"
                    >
                        Print
                    </Button>
                </div>
            </DashboardContentHeader>
            <DownloadArea
                invoiceId={invoiceId}
                customerName={customerName}
                items={items}
                total={total}
                grandTotal={grandTotal}
                adjustmentAmount={adjustmentAmount}
                subtotal={subtotal}
                invoiceRef={invoiceRef}
            />
            <br />
            <Alert
                message="Related Delvers table in progress...."
                type="warning"
                showIcon
                closable
            />

            <br />
            <Alert
                message="Related Invoice table in progress...."
                type="warning"
                showIcon
                closable
            />

            <br />
            <Alert
                message="Related Return table in progress...."
                type="warning"
                showIcon
                closable
            />
        </div>
    );
};

export default CustomerLedgerInvoice;
