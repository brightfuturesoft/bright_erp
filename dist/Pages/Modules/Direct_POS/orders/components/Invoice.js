import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { usePosOrdersData } from './data_get_api';
if (typeof window !== 'undefined' && !window.html2pdf) {
    const script = document.createElement('script');
    script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => {
        // console.log('html2pdf.js loaded successfully');
    };
    document.head.appendChild(script);
}
export const SalesInvoice = ({ order }) => {
    const { workspace } = usePosOrdersData();
    if (!order || !workspace) return null;
    if (!order || !workspace) {
        return _jsx('div', {
            className:
                'flex justify-center items-center min-h-screen bg-gray-100',
            children: _jsx('div', {
                className: 'text-xl text-gray-700',
                children: 'Loading invoice...',
            }),
        });
    }
    const handleBrowserPrint = () => {
        const element = document.getElementById('invoice-content');
        if (!element) return;
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (!printWindow) return;
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
    return _jsxs('div', {
        className: 'min-h-screen bg-gray-100 p-4 md:p-8 font-sans',
        children: [
            _jsxs('div', {
                className:
                    'max-w-4xl mx-auto bg-white shadow-md p-6 rounded-md',
                id: 'invoice-content',
                children: [
                    _jsxs('div', {
                        className: 'flex justify-between items-start mb-6',
                        children: [
                            _jsx('div', {
                                children:
                                    workspace.image &&
                                    _jsx('img', {
                                        src: workspace.image,
                                        alt: workspace.name,
                                        className:
                                            'w-32 h-32 object-contain rounded-md',
                                    }),
                            }),
                            _jsxs('div', {
                                className:
                                    'text-right text-sm md:text-base text-gray-700',
                                children: [
                                    _jsx('div', {
                                        children:
                                            workspace.address_info?.address,
                                    }),
                                    _jsxs('div', {
                                        children: [
                                            workspace.address_info?.city,
                                            ',',
                                            ' ',
                                            workspace.address_info?.state,
                                        ],
                                    }),
                                    _jsx('div', {
                                        children:
                                            workspace.contact_info
                                                ?.official_email ||
                                            workspace.contact_info
                                                ?.support_email,
                                    }),
                                    _jsx('div', {
                                        children:
                                            workspace.contact_info
                                                ?.phone_number?.[0],
                                    }),
                                ],
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className:
                            'bg-gray-200 text-center py-3 mb-6 rounded-md',
                        children: _jsx('h1', {
                            className:
                                'font-semibold text-gray-800 text-lg md:text-xl',
                            children: 'SALES INVOICE',
                        }),
                    }),
                    _jsxs('div', {
                        className:
                            'flex flex-col lg:flex-row justify-between mb-6 gap-6',
                        children: [
                            _jsxs('div', {
                                children: [
                                    _jsx('h3', {
                                        className:
                                            'font-semibold mb-2 text-gray-800',
                                        children: 'Customer Details:',
                                    }),
                                    _jsxs('div', {
                                        className:
                                            'text-gray-700 text-sm md:text-base space-y-1',
                                        children: [
                                            _jsxs('div', {
                                                children: [
                                                    _jsx('span', {
                                                        className:
                                                            'font-medium',
                                                        children: 'Name:',
                                                    }),
                                                    ' ',
                                                    order.delivery_address
                                                        .full_name,
                                                ],
                                            }),
                                            _jsxs('div', {
                                                children: [
                                                    _jsx('span', {
                                                        className:
                                                            'font-medium',
                                                        children: 'Phone:',
                                                    }),
                                                    ' ',
                                                    order.delivery_address
                                                        .phone_number,
                                                ],
                                            }),
                                            _jsxs('div', {
                                                children: [
                                                    _jsx('span', {
                                                        className:
                                                            'font-medium',
                                                        children: 'Address:',
                                                    }),
                                                    ' ',
                                                    order.delivery_address
                                                        .street,
                                                    ',',
                                                    ' ',
                                                    order.delivery_address.city,
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            _jsx('div', {
                                className: 'text-right',
                                children: _jsxs('div', {
                                    className:
                                        'text-gray-700 text-sm md:text-base space-y-1',
                                    children: [
                                        _jsxs('div', {
                                            children: [
                                                _jsx('span', {
                                                    className: 'font-medium',
                                                    children: 'Invoice No:',
                                                }),
                                                ' ',
                                                order.order_number,
                                            ],
                                        }),
                                        _jsxs('div', {
                                            children: [
                                                _jsx('span', {
                                                    className: 'font-medium',
                                                    children: 'Invoice Date:',
                                                }),
                                                ' ',
                                                new Date().toDateString(),
                                            ],
                                        }),
                                        _jsxs('div', {
                                            children: [
                                                _jsx('span', {
                                                    className: 'font-medium',
                                                    children: 'Order Date:',
                                                }),
                                                ' ',
                                                new Date(
                                                    order.created_at
                                                ).toDateString(),
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'overflow-x-auto mb-6',
                        children: _jsxs('table', {
                            className:
                                'w-full border-collapse rounded-md overflow-hidden',
                            children: [
                                _jsx('thead', {
                                    children: _jsxs('tr', {
                                        className: 'bg-gray-100',
                                        children: [
                                            _jsx('th', {
                                                className:
                                                    'p-3 text-left font-semibold border-b',
                                                children: 'PHOTO',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'p-3 text-left font-semibold border-b',
                                                children: 'NAME',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'p-3 text-center font-semibold border-b',
                                                children: 'QUANTITY',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'p-3 text-right font-semibold border-b',
                                                children: 'PRICE',
                                            }),
                                        ],
                                    }),
                                }),
                                _jsx('tbody', {
                                    children: order.products.map((p, i) =>
                                        _jsxs(
                                            'tr',
                                            {
                                                className: 'border-b',
                                                children: [
                                                    _jsx('td', {
                                                        className: 'p-3',
                                                        children: _jsx('img', {
                                                            src: p.product_image,
                                                            alt: p.product_name,
                                                            className:
                                                                'w-16 h-16 object-contain rounded-md',
                                                        }),
                                                    }),
                                                    _jsx('td', {
                                                        className: 'p-3',
                                                        children: _jsxs('div', {
                                                            className:
                                                                'text-gray-700',
                                                            children: [
                                                                _jsx('div', {
                                                                    className:
                                                                        'font-medium',
                                                                    children:
                                                                        p.product_name,
                                                                }),
                                                                _jsxs('div', {
                                                                    className:
                                                                        'text-sm',
                                                                    children: [
                                                                        'Color:',
                                                                        ' ',
                                                                        p
                                                                            .variation
                                                                            ?.color ||
                                                                            'N/A',
                                                                    ],
                                                                }),
                                                                _jsxs('div', {
                                                                    className:
                                                                        'text-sm',
                                                                    children: [
                                                                        'Size:',
                                                                        ' ',
                                                                        p
                                                                            .variation
                                                                            ?.size ||
                                                                            'N/A',
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                    }),
                                                    _jsx('td', {
                                                        className:
                                                            'p-3 text-center',
                                                        children: p.quantity,
                                                    }),
                                                    _jsxs('td', {
                                                        className:
                                                            'p-3 text-right',
                                                        children: [
                                                            'TK.',
                                                            p.order_price.toFixed(
                                                                2
                                                            ),
                                                        ],
                                                    }),
                                                ],
                                            },
                                            i
                                        )
                                    ),
                                }),
                            ],
                        }),
                    }),
                    _jsx('div', {
                        className: 'flex justify-end',
                        children: _jsxs('div', {
                            className:
                                'w-full md:w-80 space-y-1 bg-gray-100 p-3 rounded-md',
                            children: [
                                _jsxs('div', {
                                    className: 'flex justify-between',
                                    children: [
                                        _jsx('span', { children: 'Subtotal' }),
                                        _jsxs('span', {
                                            children: [
                                                'TK.',
                                                order.sub_total?.toFixed(2) ||
                                                    order.total_amount?.toFixed(
                                                        2
                                                    ),
                                            ],
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    className: 'flex justify-between',
                                    children: [
                                        _jsx('span', { children: 'Shipping' }),
                                        _jsxs('span', {
                                            children: [
                                                'TK.',
                                                order.shipping_charge?.toFixed(
                                                    2
                                                ) || '0.00',
                                            ],
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    className: 'flex justify-between',
                                    children: [
                                        _jsx('span', { children: 'Discount' }),
                                        _jsxs('span', {
                                            children: [
                                                'TK.',
                                                order.discount?.toFixed(2) ||
                                                    '0.00',
                                            ],
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    className:
                                        'flex justify-between font-bold text-lg mt-2',
                                    children: [
                                        _jsx('span', {
                                            children: 'GRAND TOTAL',
                                        }),
                                        _jsxs('span', {
                                            children: [
                                                'TK.',
                                                order.total_amount.toFixed(2),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                ],
            }),
            _jsxs('div', {
                className: 'mt-4 flex justify-center gap-4',
                children: [
                    _jsx('button', {
                        onClick: handleBrowserPrint,
                        className:
                            'px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200 ease-in-out font-medium',
                        children: 'Print Invoice',
                    }),
                    _jsx('button', {
                        onClick: handleDownloadPDF,
                        className:
                            'px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all duration-200 ease-in-out font-medium',
                        children: 'Download PDF',
                    }),
                ],
            }),
        ],
    });
};
