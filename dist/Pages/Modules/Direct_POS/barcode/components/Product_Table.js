'use client';
import {
    jsx as _jsx,
    jsxs as _jsxs,
    Fragment as _Fragment,
} from 'react/jsx-runtime';
import { useState } from 'react';
import { Table, Modal, Button, message } from 'antd';
import Barcode from 'react-barcode';
import { rgbToHex, rgbToColorName } from '@/utils/colorConvert';
const ProductTable = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [barcodeModalOpen, setBarcodeModalOpen] = useState(false);
    const handleGenerateBarcode = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('Please select at least one variant.');
            return;
        }
        setBarcodeModalOpen(true);
    };
    const handleResetBarcode = () => {
        setSelectedRowKeys([]);
        message.info('Selection reset.');
    };
    const handlePrintBarcode = () => window.print();
    const columns = [
        { title: 'Product Name', dataIndex: 'item_name', key: 'item_name' },
        { title: 'SKU', dataIndex: 'variant_sku', key: 'variant_sku' },
        {
            title: 'Size',
            dataIndex: 'variant_size',
            key: 'variant_size',
        },
        {
            title: 'Color',
            dataIndex: 'variant_color',
            key: 'variant_color',
            render: color => {
                const hex = rgbToHex(color || 'rgb(0,0,0)');
                const name = rgbToColorName(color || 'rgb(0,0,0)');
                return _jsxs('div', {
                    className: 'flex items-center gap-2',
                    children: [
                        _jsx('span', {
                            style: {
                                display: 'inline-block',
                                width: 12,
                                height: 12,
                                backgroundColor: hex,
                                border: '1px solid #000',
                            },
                        }),
                        name,
                    ],
                });
            },
        },
        {
            title: 'Offer Price',
            dataIndex: 'variant_offer_price',
            key: 'variant_offer_price',
            render: price => `$${price}`,
        },
    ];
    // Row selection
    const rowSelection = {
        selectedRowKeys,
        onChange: selectedKeys => setSelectedRowKeys(selectedKeys),
    };
    // Selected variants for barcode
    const selectedVariants = data.filter(d =>
        selectedRowKeys.includes(d.variant_sku)
    );
    return _jsxs(_Fragment, {
        children: [
            _jsx(Table, {
                rowSelection: { type: 'checkbox', ...rowSelection },
                columns: columns,
                dataSource: data,
                rowKey: 'variant_sku',
                scroll: { x: 800, y: 500 },
            }),
            _jsxs('div', {
                className:
                    'mt-4 flex gap-3 sticky top-4 z-50 bg-white dark:bg-gray-900 p-2 rounded shadow',
                children: [
                    _jsx(Button, {
                        type: 'primary',
                        onClick: handleGenerateBarcode,
                        children: 'Generate Barcode',
                    }),
                    _jsx(Button, {
                        danger: true,
                        onClick: handleResetBarcode,
                        children: 'Reset',
                    }),
                ],
            }),
            _jsxs(Modal, {
                open: barcodeModalOpen,
                onCancel: () => setBarcodeModalOpen(false),
                footer: null,
                width: 800,
                children: [
                    _jsx('div', {
                        className:
                            'flex justify-between items-center mb-6 no-print',
                        children: _jsx(Button, {
                            type: 'primary',
                            onClick: handlePrintBarcode,
                            children:
                                '\uD83D\uDDA8\uFE0F Print Selected Barcodes',
                        }),
                    }),
                    _jsx('div', {
                        className: 'grid grid-cols-1 sm:grid-cols-2 gap-6',
                        children: selectedVariants.map((variant, index) =>
                            _jsxs(
                                'div',
                                {
                                    className:
                                        'bg-white px-2 py-2 shadow-md rounded-lg flex flex-col items-center border border-gray-300',
                                    children: [
                                        _jsx('div', {
                                            className: 'font-bold text-lg',
                                            children: variant.item_name,
                                        }),
                                        _jsxs('div', {
                                            className: 'text-sm text-gray-600',
                                            children: [
                                                'Size: ',
                                                variant.variant_size,
                                            ],
                                        }),
                                        _jsx('div', {
                                            className: 'mb-4 barcode-to-print',
                                            children: _jsx(Barcode, {
                                                value: variant.variant_sku,
                                                format: 'CODE128',
                                                width: 1,
                                                height: 60,
                                                displayValue: true,
                                                fontSize: 16,
                                            }),
                                        }),
                                        _jsx('div', {
                                            className: 'text-center',
                                            children: _jsxs('div', {
                                                className:
                                                    'text-sm text-gray-800 font-semibold',
                                                children: [
                                                    'Price: $',
                                                    variant.variant_offer_price,
                                                ],
                                            }),
                                        }),
                                    ],
                                },
                                `${variant.variant_sku}-${index}`
                            )
                        ),
                    }),
                ],
            }),
        ],
    });
};
export default ProductTable;
