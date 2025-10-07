import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Mail, Phone, User } from 'lucide-react';
import { Table } from 'antd';
import logoDark from '../../../../assets/logoDark.png';
import logoLight from '../../../../assets/logoLight.png';
const DownloadArea = ({
    invoiceId,
    customerName,
    items,
    total,
    grandTotal,
    adjustmentAmount,
    subtotal,
    invoiceRef,
}) => {
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Item & Description',
            dataIndex: 'description',
            key: 'description',
            render: (_, record) => `${record.item} - ${record.description}`,
        },
        {
            title: 'Ordered Qty',
            dataIndex: 'orderedQty',
            key: 'orderedQty',
        },
        {
            title: 'Billed Qty',
            dataIndex: 'billedQty',
            key: 'billedQty',
        },
        {
            title: 'Delivered Qty',
            dataIndex: 'deliveredQty',
            key: 'deliveredQty',
        },
        {
            title: 'Returned Qty',
            dataIndex: 'returnedQty',
            key: 'returnedQty',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: price => `$${price.toFixed(2)}`,
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: discount => `${discount}%`,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: amount => `$${amount.toFixed(2)}`,
        },
    ];
    const dataSource = items.map((item, index) => ({
        key: index + 1,
        index: index + 1,
        ...item,
    }));
    return _jsx('div', {
        ref: invoiceRef,
        className:
            'border mt-3 max-w-[1200px] w-[1200px] m-auto border-gray-300 dark:bg-slate-800 bg-light dark:!text-light !text-dark dark:border-light-dark',
        children: _jsxs('div', {
            className: 'p-[50px] ',
            children: [
                _jsxs('div', {
                    className:
                        'flex border-b dark:border-dark-gray border-gray-300 mb-3 items-start justify-between pb-6',
                    children: [
                        _jsxs('div', {
                            className: ' overflow-hidden',
                            children: [
                                _jsx('img', {
                                    className: 'w-[280px] dark:hidden block',
                                    src: logoDark,
                                    alt: 'Logo Dark',
                                }),
                                _jsx('img', {
                                    className: 'w-[280px] dark:block hidden',
                                    src: logoLight,
                                    alt: 'Logo Light',
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'flex flex-col gap-1',
                            children: [
                                _jsx('h1', {
                                    className:
                                        'font-bold text-xl pb-1 text-right float-right',
                                    children: 'BRIGHT E.RP',
                                }),
                                _jsx('p', {
                                    className:
                                        'text-sm text-right dark:text-gray-300 text-gray-500 float-right',
                                    children: 'bright.erp@gmail.com',
                                }),
                                _jsx('p', {
                                    className:
                                        'text-sm text-right dark:text-gray-300 text-gray-500 float-right',
                                    children: '+880171234567910',
                                }),
                                _jsx('p', {
                                    className:
                                        'text-sm text-right dark:text-gray-300 text-gray-500 float-right',
                                    children: 'Dhaka, Mymenshingh',
                                }),
                            ],
                        }),
                    ],
                }),
                _jsxs('div', {
                    className:
                        'flex dark:border-dark-gray border-gray-300 mb-3 items-start justify-between pb-6',
                    children: [
                        _jsx('div', {
                            className: ' overflow-hidden',
                            children: _jsxs('ul', {
                                className: 'space-y-2',
                                children: [
                                    _jsx('li', {
                                        className:
                                            'dark:text-blue-400 text-primary font-semibold',
                                        children: 'Order By :',
                                    }),
                                    _jsxs('li', {
                                        className: 'flex items-center gap-1',
                                        children: [
                                            _jsx(User, {
                                                size: 20,
                                                className: 'text-primary',
                                            }),
                                            ' ',
                                            'Nahid',
                                        ],
                                    }),
                                    _jsxs('li', {
                                        className: 'flex items-center gap-1',
                                        children: [
                                            _jsx(Mail, {
                                                size: 16,
                                                className: 'text-primary',
                                            }),
                                            ' ',
                                            'nahidd@gmail.com',
                                        ],
                                    }),
                                    _jsxs('li', {
                                        className: 'flex items-center gap-1',
                                        children: [
                                            _jsx(Phone, {
                                                size: 16,
                                                className: 'text-primary',
                                            }),
                                            ' ',
                                            '+8801234567891',
                                        ],
                                    }),
                                ],
                            }),
                        }),
                        _jsx('div', {
                            className: 'flex flex-col gap-1',
                            children: _jsxs('ul', {
                                className: 'space-y-1',
                                children: [
                                    _jsxs('li', {
                                        className: 'flex items-center gap-1',
                                        children: [
                                            _jsx('span', {
                                                className:
                                                    'w-[200px] font-semibold text-primary',
                                                children: 'Order Number',
                                            }),
                                            _jsx('span', {
                                                className:
                                                    'w-[100px] text-center font-bold',
                                                children: ':',
                                            }),
                                            _jsx('span', {
                                                className: 'w-[200px] text-end',
                                                children: 'a7df8sfasdg7y',
                                            }),
                                        ],
                                    }),
                                    _jsxs('li', {
                                        className: 'flex items-center gap-1',
                                        children: [
                                            _jsx('span', {
                                                className:
                                                    'w-[200px] font-semibold text-primary',
                                                children: 'Date',
                                            }),
                                            _jsx('span', {
                                                className:
                                                    'w-[100px] text-center font-bold',
                                                children: ':',
                                            }),
                                            _jsx('span', {
                                                className: 'w-[200px] text-end',
                                                children: '13 Jul 2024',
                                            }),
                                        ],
                                    }),
                                    _jsxs('li', {
                                        className: 'flex items-center gap-1',
                                        children: [
                                            _jsx('span', {
                                                className:
                                                    'w-[200px] font-semibold text-primary',
                                                children: 'Type',
                                            }),
                                            _jsx('span', {
                                                className:
                                                    'w-[100px] text-center font-bold',
                                                children: ':',
                                            }),
                                            _jsx('span', {
                                                className: 'w-[200px] text-end',
                                                children: 'Direct Sale',
                                            }),
                                        ],
                                    }),
                                    _jsxs('li', {
                                        className: 'flex items-center gap-1',
                                        children: [
                                            _jsx('span', {
                                                className:
                                                    'w-[200px] font-semibold text-primary',
                                                children: 'Sales person',
                                            }),
                                            _jsx('span', {
                                                className:
                                                    'w-[100px] text-center font-bold',
                                                children: ':',
                                            }),
                                            _jsx('span', {
                                                className: 'w-[200px] text-end',
                                                children: 'Demo',
                                            }),
                                        ],
                                    }),
                                    _jsxs('li', {
                                        className: 'flex items-center gap-1',
                                        children: [
                                            _jsx('span', {
                                                className:
                                                    'w-[200px] font-semibold text-primary',
                                                children: 'Status',
                                            }),
                                            _jsx('span', {
                                                className:
                                                    'w-[100px] text-center font-bold',
                                                children: ':',
                                            }),
                                            _jsx('div', {
                                                className: 'w-[200px] text-end',
                                                children: _jsx('div', {
                                                    className:
                                                        'bg-success text-light px-2 py-1 rounded text-xs flex w-[100px] ml-auto items-center justify-center',
                                                    children: 'Completed',
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        }),
                    ],
                }),
                _jsx(Table, {
                    dataSource: dataSource,
                    columns: columns,
                    pagination: false,
                }),
                _jsxs('div', {
                    className:
                        'text-right space-y-2 w-[400px] rounded ml-auto bg-primary text-light p-3 font-bold mt-3',
                    children: [
                        _jsxs('div', {
                            className: 'flex justify-between',
                            children: [
                                _jsx('span', { children: 'Subtotal:' }),
                                ' $',
                                subtotal.toFixed(2),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'flex justify-between',
                            children: [
                                _jsx('span', {
                                    children: 'Adjustment Amount:',
                                }),
                                ' $',
                                adjustmentAmount.toFixed(2),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'flex justify-between',
                            children: [
                                _jsx('span', { children: 'Total:' }),
                                ' $',
                                total.toFixed(2),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'flex justify-between',
                            children: [
                                _jsx('span', { children: 'Grand Total:' }),
                                ' $',
                                grandTotal.toFixed(2),
                            ],
                        }),
                    ],
                }),
            ],
        }),
    });
};
export default DownloadArea;
