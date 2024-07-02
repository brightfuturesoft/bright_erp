import React, { useRef } from 'react';
import shapeTop from '../assets/images/shape-top.png';
import shapeBottom from '../assets/images/shape-bottom.png';
import DashboardHeader from '../Pages/Modules/CommonComponents/DashboardHeader';
import DashboardTitle from '../Pages/Modules/CommonComponents/DashboardTitle';
import { Button } from 'antd';
import ReactToPrint from 'react-to-print';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Dock, Newspaper, Printer } from 'lucide-react';

const JournalInvoice: React.FC = () => {
    const componentRef = useRef<HTMLDivElement>(null);

    const handleDownloadPdf = async () => {
        if (componentRef.current) {
            const originalDisplay = componentRef.current.style.display;
            componentRef.current.style.display = 'block';

            const canvas = await html2canvas(componentRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // If the content height is more than one page, add new pages
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

            pdf.save('invoice.pdf');

            // Restore the original display setting
            componentRef.current.style.display = originalDisplay;
        }
    };

    return (
        <section>
            <header>
                <DashboardHeader>
                    <DashboardTitle title={'Journal Details'} />
                    <div className='flex items-center gap-2'>
                        <ReactToPrint
                            trigger={() => <Button shape='circle' type='primary' size='large'>
                                <Printer className=' text-light' strokeWidth={1.5} size={22} />
                            </Button>}
                            content={() => componentRef.current}
                            onBeforePrint={() => {
                                if (componentRef.current) {
                                    componentRef.current.style.display = 'block';
                                }
                            }}
                            onAfterPrint={() => {
                                if (componentRef.current) {
                                    componentRef.current.style.display = 'none';
                                }
                            }}
                        />
                        <Button shape='circle' type='primary' size='large' onClick={handleDownloadPdf}>
                            <Newspaper size={23} strokeWidth={1.5} />
                        </Button>
                    </div>
                </DashboardHeader>
            </header>
            <br />
            <div className=" print-box md:block hidden">
                <main ref={componentRef} className="mx-auto  max-w-screen-xl text-black relative bg-white shadow-lg  border-gray-300 px-20 py-40">
                    <div style={{ backgroundImage: `url(${shapeTop})`, backgroundSize: '100% 100%' }} className="absolute top-0 left-0 object-fill right-0 h-[180px]"></div>
                    <div className="relative !z-[300]">
                        <header className="flex justify-between items-center mb-8">
                            <div>
                                <img src="http://localhost:5173/src/assets/logoDark.png" alt="logo" className="w-[300px]" />
                                <p className="mt-1">Managing Director, Liceria & Co.</p>
                                <p className="mt-1">123 Anywhere St, Any City</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-4xl font-semibold">INVOICE</h2>
                                <p>Invoice No: <strong>#12345</strong></p>
                                <p>Due Date: <strong>12 Oct, 2023</strong></p>
                                <p>Invoice Date: <strong>15 Oct, 2023</strong></p>
                            </div>
                        </header>
                        <div className="flex justify-between">
                            <section className="mb-8">
                                <h3 className="text-lg font-semibold">Invoice To:</h3>
                                <p>Marceline Anderson</p>
                                <p>Phone: +123-456-7890</p>
                                <p>Email: hello@reallygreatsite.com</p>
                            </section>
                            <section className="mb-8 float-end text-end">
                                <h3 className="text-lg font-semibold">Payment Method</h3>
                                <p>Account No: +123-456-7890</p>
                                <p>Account Name: Marceline Anderson</p>
                                <p>Branch Name: Liceria & Co.</p>
                            </section>
                        </div>
                        <table className="w-full mb-8 border-collapse">
                            <thead className="bg-blue-600 text-light rounded-t-lg border-b">
                                <tr>
                                    <th className="py-2 px-4 text-left">DESCRIPTION</th>
                                    <th className="py-2 px-4 text-right">PRICE</th>
                                    <th className="py-2 px-4 text-right">QTY</th>
                                    <th className="py-2 px-4 text-right">SUBTOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array(3).fill(null).map((_, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2 px-4">Invoice Description</td>
                                        <td className="py-2 px-4 text-right">$100.00</td>
                                        <td className="py-2 px-4 text-right">1</td>
                                        <td className="py-2 px-4 text-right">$100.00</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mb-8">
                            <div className="w-1/3">
                                <div className="flex justify-between border-t py-2">
                                    <span>Sub-total:</span>
                                    <span>$300.00</span>
                                </div>
                                <div className="flex justify-between border-t py-2">
                                    <span>Discount:</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between border-t py-2">
                                    <span>Tax (10%):</span>
                                    <span>$30.00</span>
                                </div>
                                <div className="flex justify-between border-t border-b py-2 font-bold">
                                    <span>Total:</span>
                                    <span>$330.00</span>
                                </div>
                            </div>
                        </div>
                        <section className="mb-8 w-1/2">
                            <h3 className="text-xl font-bold">Terms and Conditions</h3>
                            <p>Please send payment within 30 days of receiving this invoice. There will be 10% interest charge per month on late invoice.</p>
                        </section>
                        <footer className="flex justify-between items-center">
                            <div>
                                <p className="text-xl font-bold">Thank you for your business!</p>
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
                    <div style={{ backgroundImage: `url(${shapeBottom})`, backgroundSize: '100% 100%' }} className="absolute bottom-0 left-0 object-fill right-0 h-[180px]"></div>
                </main>

            </div>
        </section>
    );
};

export default JournalInvoice;
