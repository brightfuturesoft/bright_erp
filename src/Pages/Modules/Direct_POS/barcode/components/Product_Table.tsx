'use client';

import React, { useState } from 'react';
import { Table, TableProps, Image, Modal, Button, message } from 'antd';
import Barcode from 'react-barcode';
import { rgbToHex, rgbToColorName } from '@/utils/colorConvert';

interface ExpandedProduct {
    _id: string;
    item_name: string;
    variant_sku: string;
    variant_color?: string;
    variant_size?: string;
    variant_quantity?: number;
    variant_normal_price?: number;
    variant_offer_price?: number;
    variant_cover_photo?: string;
}

const ProductTable: React.FC<{ data: ExpandedProduct[] }> = ({ data }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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

    const columns: TableProps<ExpandedProduct>['columns'] = [
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
            render: (color: string) => {
                const hex = rgbToHex(color || 'rgb(0,0,0)');
                const name = rgbToColorName(color || 'rgb(0,0,0)');
                return (
                    <div className="flex items-center gap-2">
                        <span
                            style={{
                                display: 'inline-block',
                                width: 12,
                                height: 12,
                                backgroundColor: hex,
                                border: '1px solid #000',
                            }}
                        />
                        {name}
                    </div>
                );
            },
        },
        {
            title: 'Offer Price',
            dataIndex: 'variant_offer_price',
            key: 'variant_offer_price',
            render: (price: number) => `$${price}`,
        },
    ];

    // Row selection
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys: React.Key[]) =>
            setSelectedRowKeys(selectedKeys),
    };

    // Selected variants for barcode
    const selectedVariants = data.filter(d =>
        selectedRowKeys.includes(d.variant_sku)
    );

    return (
        <>
            <Table
                rowSelection={{ type: 'checkbox', ...rowSelection }}
                columns={columns}
                dataSource={data}
                rowKey="variant_sku"
                scroll={{ x: 1000 }}
            />

            <div className="mt-4 flex gap-3">
                <Button
                    type="primary"
                    onClick={handleGenerateBarcode}
                >
                    Generate Barcode
                </Button>
                <Button
                    danger
                    onClick={handleResetBarcode}
                >
                    Reset
                </Button>
            </div>

            <Modal
                open={barcodeModalOpen}
                onCancel={() => setBarcodeModalOpen(false)}
                footer={null}
                width={800}
            >
                <div className="flex justify-between items-center mb-6 no-print">
                    <Button
                        type="primary"
                        onClick={handlePrintBarcode}
                    >
                        🖨️ Print Selected Barcodes
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {selectedVariants.map((variant, index) => (
                        <div
                            key={`${variant.variant_sku}-${index}`}
                            className="bg-white px-2 py-2 shadow-md rounded-lg flex flex-col items-center border border-gray-300"
                        >
                            <div className="font-bold text-lg">
                                {variant.item_name}
                            </div>
                            <div className="text-sm text-gray-600">
                                Size: {variant.variant_size}
                            </div>
                            <div className="mb-4 barcode-to-print">
                                <Barcode
                                    value={variant.variant_sku}
                                    format="CODE128"
                                    width={1}
                                    height={60}
                                    displayValue
                                    fontSize={16}
                                />
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-800 font-semibold">
                                    Price: ${variant.variant_offer_price}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
};

export default ProductTable;
