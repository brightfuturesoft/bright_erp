import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import shapeTop from '../../../../../assets/images/shape-top.png';
import shapeBottom from '../../../../../assets/images/shape-bottom.png';
import { Button } from 'antd';
import ReactToPrint from 'react-to-print';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Newspaper, Printer } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import DashboardTitle from '@/Pages/Modules/CommonComponents/DashboardTitle';
import DashboardContentHeader from '@/wraper/DashboardContentHeader';
import { useQuery } from '@tanstack/react-query';
const OrderInvoice = () => {
    const componentRef = useRef(null);
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
    return _jsxs('section', {
        children: [
            _jsx('header', {
                children: _jsxs(DashboardContentHeader, {
                    children: [
                        _jsx(DashboardTitle, {
                            title: `Invoice ${order_info?.order_number || ''}`,
                        }),
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
                                                className: 'text-light',
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
                                'absolute top-0 left-0 right-0 h-[180px]',
                        }),
                        _jsxs('div', {
                            className: 'relative !z-[300]',
                            children: [
                                _jsxs('header', {
                                    className:
                                        'flex justify-between items-center mb-8',
                                    children: [
                                        _jsxs('div', {
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
                                                    children:
                                                        workspace?.address,
                                                }),
                                            ],
                                        }),
                                        _jsxs('div', {
                                            className: 'text-right',
                                            children: [
                                                _jsx('h2', {
                                                    className:
                                                        'text-4xl font-semibold',
                                                    children: 'INVOICE',
                                                }),
                                                _jsxs('p', {
                                                    children: [
                                                        'Invoice No:',
                                                        ' ',
                                                        _jsx('strong', {
                                                            children:
                                                                order_info?.order_number,
                                                        }),
                                                    ],
                                                }),
                                                _jsxs('p', {
                                                    children: [
                                                        'Invoice Date:',
                                                        ' ',
                                                        _jsx('strong', {
                                                            children: new Date(
                                                                order_info?.created_at
                                                            ).toDateString(),
                                                        }),
                                                    ],
                                                }),
                                                _jsxs('p', {
                                                    children: [
                                                        'Created By:',
                                                        _jsx('strong', {
                                                            children:
                                                                order_info?.cashier_name,
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    className: 'flex justify-between',
                                    children: [
                                        _jsxs('section', {
                                            className:
                                                'mb-8 flex gap-1 items-center',
                                            children: [
                                                _jsx('h3', {
                                                    className:
                                                        'text-lg font-semibold',
                                                    children: 'Invoice To:',
                                                }),
                                                _jsx('p', {
                                                    children:
                                                        order_info
                                                            ?.delivery_address
                                                            ?.full_name,
                                                }),
                                            ],
                                        }),
                                        _jsx('section', {
                                            className: 'mb-8 text-end',
                                            children: _jsxs('p', {
                                                children: [
                                                    'Payment Method:',
                                                    ' ',
                                                    _jsx('span', {
                                                        className:
                                                            'font-semibold uppercase',
                                                        children:
                                                            order_info?.payment
                                                                ?.payment_method,
                                                    }),
                                                ],
                                            }),
                                        }),
                                    ],
                                }),
                                _jsxs('table', {
                                    className: 'w-full mb-8 border-collapse',
                                    children: [
                                        _jsx('thead', {
                                            className:
                                                'bg-blue-600 text-light border-b',
                                            children: _jsxs('tr', {
                                                children: [
                                                    _jsx('th', {
                                                        className:
                                                            'py-2 px-4 text-left',
                                                        children: 'DESCRIPTION',
                                                    }),
                                                    _jsx('th', {
                                                        className:
                                                            'py-2 px-4 text-right',
                                                        children: 'PRICE',
                                                    }),
                                                    _jsx('th', {
                                                        className:
                                                            'py-2 px-4 text-right',
                                                        children: 'QTY',
                                                    }),
                                                    _jsx('th', {
                                                        className:
                                                            'py-2 px-4 text-right',
                                                        children: 'SUBTOTAL',
                                                    }),
                                                ],
                                            }),
                                        }),
                                        _jsx('tbody', {
                                            children: order_info?.products
                                                ?.length
                                                ? order_info.products.map(
                                                      (item, idx) =>
                                                          _jsxs(
                                                              'tr',
                                                              {
                                                                  className:
                                                                      'border-b',
                                                                  children: [
                                                                      _jsx(
                                                                          'td',
                                                                          {
                                                                              className:
                                                                                  'py-2 px-4',
                                                                              children:
                                                                                  item.item_name,
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          'td',
                                                                          {
                                                                              className:
                                                                                  'py-2 px-4 text-right',
                                                                              children:
                                                                                  item.offer_price ||
                                                                                  item.normal_price,
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          'td',
                                                                          {
                                                                              className:
                                                                                  'py-2 px-4 text-right',
                                                                              children:
                                                                                  item.quantity,
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          'td',
                                                                          {
                                                                              className:
                                                                                  'py-2 px-4 text-right',
                                                                              children:
                                                                                  (item.offer_price ||
                                                                                      item.normal_price) *
                                                                                  item.quantity,
                                                                          }
                                                                      ),
                                                                  ],
                                                              },
                                                              idx
                                                          )
                                                  )
                                                : _jsx('tr', {
                                                      children: _jsx('td', {
                                                          colSpan: 4,
                                                          className:
                                                              'text-center py-4',
                                                          children:
                                                              'No items found',
                                                      }),
                                                  }),
                                        }),
                                    ],
                                }),
                                _jsx('div', {
                                    className: 'flex justify-end mb-8',
                                    children: _jsxs('div', {
                                        className: 'w-1/3',
                                        children: [
                                            _jsxs('div', {
                                                className:
                                                    'flex justify-between border-t py-2',
                                                children: [
                                                    _jsx('span', {
                                                        children: 'Sub-total:',
                                                    }),
                                                    _jsx('span', {
                                                        children:
                                                            order_info?.products?.reduce(
                                                                (total, item) =>
                                                                    total +
                                                                    (item.offer_price ||
                                                                        item.normal_price) *
                                                                        item.quantity,
                                                                0
                                                            ),
                                                    }),
                                                ],
                                            }),
                                            _jsxs('div', {
                                                className:
                                                    'flex justify-between border-t py-2',
                                                children: [
                                                    _jsx('span', {
                                                        children: 'Discount:',
                                                    }),
                                                    _jsx('span', {
                                                        children:
                                                            order_info?.discount,
                                                    }),
                                                ],
                                            }),
                                            _jsxs('div', {
                                                className:
                                                    'flex justify-between border-t py-2',
                                                children: [
                                                    _jsx('span', {
                                                        children: 'Tax :',
                                                    }),
                                                    _jsx('span', {
                                                        children:
                                                            order_info?.tax_amount.toFixed(
                                                                2
                                                            ),
                                                    }),
                                                ],
                                            }),
                                            _jsxs('div', {
                                                className:
                                                    'flex justify-between border-t border-b py-2 font-bold',
                                                children: [
                                                    _jsx('span', {
                                                        children: 'Total:',
                                                    }),
                                                    _jsx('span', {
                                                        children:
                                                            order_info?.total_amount,
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                                _jsxs('section', {
                                    className: 'mb-8 w-1/2',
                                    children: [
                                        _jsx('h3', {
                                            className: 'text-xl font-bold',
                                            children: 'Terms and Conditions',
                                        }),
                                        _jsx('p', {
                                            children:
                                                workspace?.terms ||
                                                `Please send payment within 30 days of receiving
                                this invoice. Late payments may incur additional
                                charges.`,
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
                                                _jsxs('p', {
                                                    className: 'mt-2',
                                                    children: [
                                                        'Phone:',
                                                        ' ',
                                                        workspace?.contact_info
                                                            ?.phone_number ||
                                                            '+123-456-7890',
                                                    ],
                                                }),
                                                _jsxs('p', {
                                                    children: [
                                                        'Email:',
                                                        ' ',
                                                        workspace?.contact_info
                                                            ?.official_email ||
                                                            workspace
                                                                ?.contact_info
                                                                ?.support_email ||
                                                            'info@example.com',
                                                    ],
                                                }),
                                                _jsx('p', {
                                                    children:
                                                        workspace?.domain_info
                                                            ?.domain ||
                                                        'www.example.com',
                                                }),
                                            ],
                                        }),
                                        _jsxs('div', {
                                            className: 'text-right',
                                            children: [
                                                _jsx('p', {
                                                    children: workspace?.owner,
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
                                'absolute bottom-0 left-0 right-0 h-[180px]',
                        }),
                    ],
                }),
            }),
        ],
    });
};
export default OrderInvoice;
