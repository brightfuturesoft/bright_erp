import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useRef, useState, useEffect } from 'react';
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
const JournalInvoice = () => {
    const componentRef = useRef(null);
    const { workspace, user } = useContext(Erp_context);
    const { id } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);
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
    if (loading) return _jsx('p', { children: 'Loading...' });
    return _jsxs('section', {
        children: [
            _jsx('header', {
                children: _jsxs(DashboardHeader, {
                    children: [
                        _jsx(DashboardTitle, { title: 'Journal Details' }),
                        _jsxs('div', {
                            className: 'flex items-center gap-2',
                            children: [
                                _jsx(ReactToPrint, {
                                    trigger: () =>
                                        _jsx(Button, {
                                            shape: 'circle',
                                            type: 'primary',
                                            size: 'large',
                                            children: _jsx(Printer, {
                                                className: ' text-light',
                                                strokeWidth: 1.5,
                                                size: 22,
                                            }),
                                        }),
                                    content: () => componentRef.current,
                                    onBeforePrint: () => {
                                        if (componentRef.current)
                                            componentRef.current.style.display =
                                                'block';
                                    },
                                    onAfterPrint: () => {
                                        if (componentRef.current)
                                            componentRef.current.style.display =
                                                'none';
                                    },
                                }),
                                _jsx(Button, {
                                    shape: 'circle',
                                    type: 'primary',
                                    size: 'large',
                                    onClick: handleDownloadPdf,
                                    children: _jsx(Newspaper, {
                                        size: 23,
                                        strokeWidth: 1.5,
                                    }),
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            _jsx('br', {}),
            _jsx('div', {
                className: 'print-box md:block hidden',
                children: _jsxs('main', {
                    ref: componentRef,
                    className:
                        'mx-auto max-w-screen-xl text-black relative bg-white shadow-lg border-gray-300 px-20 py-40',
                    children: [
                        _jsx('div', {
                            style: {
                                backgroundImage: `url(${shapeTop})`,
                                backgroundSize: '100% 100%',
                            },
                            className:
                                'absolute top-0 left-0 object-fill right-0 h-[180px]',
                        }),
                        _jsxs('div', {
                            className: 'relative !z-[300]',
                            children: [
                                _jsx('header', {
                                    className:
                                        'flex justify-between items-center mb-8',
                                    children: _jsxs('div', {
                                        children: [
                                            _jsx('img', {
                                                src: workspace?.image,
                                                alt: 'logo',
                                                className: 'w-20',
                                            }),
                                            _jsx('p', {
                                                className: 'mt-1',
                                                children: workspace?.name,
                                            }),
                                            _jsx('p', {
                                                className: 'mt-1',
                                                children: workspace?.address,
                                            }),
                                        ],
                                    }),
                                }),
                                _jsxs('table', {
                                    className: 'w-full mb-8 border-collapse',
                                    children: [
                                        _jsx('thead', {
                                            className:
                                                'bg-blue-600 text-light rounded-t-lg border-b',
                                            children: _jsxs('tr', {
                                                children: [
                                                    _jsx('th', {
                                                        className:
                                                            'py-2 px-4 text-left',
                                                        children:
                                                            'ACCOUNT NAME',
                                                    }),
                                                    _jsx('th', {
                                                        className:
                                                            'py-2 px-4 text-right',
                                                        children: 'CREDIT',
                                                    }),
                                                    _jsx('th', {
                                                        className:
                                                            'py-2 px-4 text-right',
                                                        children: 'DEBIT',
                                                    }),
                                                ],
                                            }),
                                        }),
                                        _jsxs('tbody', {
                                            children: [
                                                invoiceData?.field?.map(
                                                    (row, index) =>
                                                        _jsxs(
                                                            'tr',
                                                            {
                                                                className:
                                                                    'border-b',
                                                                children: [
                                                                    _jsx('td', {
                                                                        className:
                                                                            'py-2 px-4',
                                                                        children:
                                                                            row.account,
                                                                    }),
                                                                    _jsx('td', {
                                                                        className:
                                                                            'py-2 px-4 text-right',
                                                                        children:
                                                                            row.credit.toFixed(
                                                                                2
                                                                            ),
                                                                    }),
                                                                    _jsx('td', {
                                                                        className:
                                                                            'py-2 px-4 text-right',
                                                                        children:
                                                                            row.debit.toFixed(
                                                                                2
                                                                            ),
                                                                    }),
                                                                ],
                                                            },
                                                            index
                                                        )
                                                ),
                                                _jsxs('tr', {
                                                    className:
                                                        'font-bold border-t',
                                                    children: [
                                                        _jsx('td', {
                                                            className:
                                                                'py-2 px-4 text-right',
                                                            children: 'TOTAL',
                                                        }),
                                                        _jsx('td', {
                                                            className:
                                                                'py-2 px-4 text-right',
                                                            children:
                                                                invoiceData?.field
                                                                    ?.reduce(
                                                                        (
                                                                            sum,
                                                                            row
                                                                        ) =>
                                                                            sum +
                                                                            row.credit,
                                                                        0
                                                                    )
                                                                    .toFixed(2),
                                                        }),
                                                        _jsx('td', {
                                                            className:
                                                                'py-2 px-4 text-right',
                                                            children:
                                                                invoiceData?.field
                                                                    ?.reduce(
                                                                        (
                                                                            sum,
                                                                            row
                                                                        ) =>
                                                                            sum +
                                                                            row.debit,
                                                                        0
                                                                    )
                                                                    .toFixed(2),
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                _jsxs('footer', {
                                    className:
                                        'flex justify-between items-center',
                                    children: [
                                        _jsxs('div', {
                                            children: [
                                                _jsx('p', {
                                                    className:
                                                        'text-xl font-bold',
                                                    children:
                                                        'Thank you for your business!',
                                                }),
                                                _jsx('p', {
                                                    className: 'mt-2',
                                                    children:
                                                        'Phone: +123-456-7890',
                                                }),
                                                _jsx('p', {
                                                    children:
                                                        'Email: hello@reallygreatsite.com',
                                                }),
                                                _jsx('p', {
                                                    children:
                                                        'www.reallygreatsite.com',
                                                }),
                                            ],
                                        }),
                                        _jsxs('div', {
                                            className: 'text-right',
                                            children: [
                                                _jsx('p', {
                                                    children:
                                                        'Rosa Maria Aguado',
                                                }),
                                                _jsx('p', {
                                                    className: 'font-semibold',
                                                    children: 'Company CEO',
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        _jsx('div', {
                            style: {
                                backgroundImage: `url(${shapeBottom})`,
                                backgroundSize: '100% 100%',
                            },
                            className:
                                'absolute bottom-0 left-0 object-fill right-0 h-[180px]',
                        }),
                    ],
                }),
            }),
        ],
    });
};
export default JournalInvoice;
