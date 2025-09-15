import React, { useContext, useRef, useState, useEffect } from 'react';
import shapeTop from '../assets/images/shape-top.png';
import shapeBottom from '../assets/images/shape-bottom.png';
import DashboardHeader from '../Pages/Modules/CommonComponents/DashboardHeader';
import DashboardTitle from '../Pages/Modules/CommonComponents/DashboardTitle';
import { Button, message } from 'antd';
import ReactToPrint from 'react-to-print';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Newspaper, Printer } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { useParams } from 'react-router-dom';
import moment from 'moment';

interface RowData {
    description: string;
    account: string;
    debit: number;
    credit: number;
}

const JournalInvoice: React.FC = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const { workspace, user } = useContext(Erp_context);
    const { id } = useParams<{ id: string }>();
    const [invoiceData, setInvoiceData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Fetch journal info by ID
    useEffect(() => {
        const fetchJournal = async () => {
            if (!id || !user?._id) return;

            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}transaction/journal/get/${id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user._id,
                            workspace_id: user.workspace_id,
                        },
                    }
                );

                const data = await res.json();
                if (res.ok) {
                    setInvoiceData(data.data);
                } else {
                    message.error(
                        data.message || 'Failed to fetch journal data'
                    );
                }
            } catch (err) {
                console.error(err);
                message.error('Error fetching journal');
            } finally {
                setLoading(false);
            }
        };

        fetchJournal();
    }, [id, user]);

    const handleDownloadPdf = async () => {
        if (componentRef.current) {
            const originalDisplay = componentRef.current.style.display;
            componentRef.current.style.display = 'block';

            const canvas = await html2canvas(componentRef.current, {
                scale: 2,
            });
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
                    pdf.addImage(
                        imgData,
                        'PNG',
                        0,
                        position,
                        pdfWidth,
                        pdfHeight
                    );
                }
                heightLeft -= pdf.internal.pageSize.getHeight();
            }

            pdf.save('invoice.pdf');
            componentRef.current.style.display = originalDisplay;
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <section>
            <header>
                <DashboardHeader>
                    <DashboardTitle title={'Journal Details'} />
                    <div className="flex items-center gap-2">
                        <ReactToPrint
                            trigger={() => (
                                <Button
                                    shape="circle"
                                    type="primary"
                                    size="large"
                                >
                                    <Printer
                                        className=" text-light"
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
            <br />
            <div className="print-box md:block hidden">
                <main
                    ref={componentRef}
                    className="mx-auto max-w-screen-xl text-black relative bg-white shadow-lg border-gray-300 px-20 py-40"
                >
                    <div
                        style={{
                            backgroundImage: `url(${shapeTop})`,
                            backgroundSize: '100% 100%',
                        }}
                        className="absolute top-0 left-0 object-fill right-0 h-[180px]"
                    ></div>

                    <div className="relative !z-[300]">
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
                        </header>

                        {/* Modified Table */}
                        <table className="w-full mb-8 border-collapse">
                            <thead className="bg-blue-600 text-light rounded-t-lg border-b">
                                <tr>
                                    <th className="py-2 px-4 text-left">
                                        ACCOUNT NAME
                                    </th>
                                    <th className="py-2 px-4 text-right">
                                        CREDIT
                                    </th>
                                    <th className="py-2 px-4 text-right">
                                        DEBIT
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceData?.field?.map(
                                    (row: RowData, index: number) => (
                                        <tr
                                            key={index}
                                            className="border-b"
                                        >
                                            <td className="py-2 px-4">
                                                {row.account}
                                            </td>
                                            <td className="py-2 px-4 text-right">
                                                {row.credit.toFixed(2)}
                                            </td>
                                            <td className="py-2 px-4 text-right">
                                                {row.debit.toFixed(2)}
                                            </td>
                                        </tr>
                                    )
                                )}
                                <tr className="font-bold border-t">
                                    <td className="py-2 px-4 text-right">
                                        TOTAL
                                    </td>
                                    <td className="py-2 px-4 text-right">
                                        {invoiceData?.field
                                            ?.reduce(
                                                (sum: number, row: RowData) =>
                                                    sum + row.credit,
                                                0
                                            )
                                            .toFixed(2)}
                                    </td>
                                    <td className="py-2 px-4 text-right">
                                        {invoiceData?.field
                                            ?.reduce(
                                                (sum: number, row: RowData) =>
                                                    sum + row.debit,
                                                0
                                            )
                                            .toFixed(2)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <footer className="flex justify-between items-center">
                            <div>
                                <p className="text-xl font-bold">
                                    Thank you for your business!
                                </p>
                                <p className="mt-2">Phone: +123-456-7890</p>
                                <p>Email: hello@reallygreatsite.com</p>
                                <p>www.reallygreatsite.com</p>
                            </div>
                            <div className="text-right">
                                <p>Rosa Maria Aguado</p>
                                <p className="font-semibold">Company CEO</p>
                            </div>
                        </footer>
                    </div>

                    <div
                        style={{
                            backgroundImage: `url(${shapeBottom})`,
                            backgroundSize: '100% 100%',
                        }}
                        className="absolute bottom-0 left-0 object-fill right-0 h-[180px]"
                    ></div>
                </main>
            </div>
        </section>
    );
};

export default JournalInvoice;
