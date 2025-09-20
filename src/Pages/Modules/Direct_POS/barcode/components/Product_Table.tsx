'use client';

import React, { useState } from 'react';
import { Table, TableProps, Image, Modal, Space, Button, message } from 'antd';
import Barcode from 'react-barcode';
import { rgbToHex, rgbToColorName } from '@/utils/colorConvert';

const ProductTable: React.FC<{ data: any[] }> = ({ data }) => {
    const [detailsModal, setDetailsModal] = useState<any>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [barcodeModalOpen, setBarcodeModalOpen] = useState(false);

    const handleDetails = (record: any) => {
        setDetailsModal(record);
    };

    const handleGenerateBarcode = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('Please select at least one product.');
            return;
        }
        setBarcodeModalOpen(true);
    };

    const handleResetBarcode = () => {
        setSelectedRowKeys([]);
        message.info('Barcode selection reset.');
    };

    const handlePrintBarcode = () => {
        window.print();
    };

    const tableHead: TableProps<any>['columns'] = [
        { title: 'PRODUCT NAME', dataIndex: 'item_name', key: 'item_name' },
        { title: 'SKU', dataIndex: 'sku', key: 'sku' },
        {
            title: 'CATEGORY',
            key: 'category',
            render: (text, record) =>
                record.categories?.map((c: any) => c.label).join(', '),
        },
        {
            title: 'BRAND',
            key: 'brand',
            render: (text, record) => record.brand?.label,
        },
        { title: 'STATUS', dataIndex: 'status', key: 'status' },
        {
            title: 'ACTION',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a
                        onClick={() => handleDetails(record)}
                        className="hover:cursor-pointer text-blue-600"
                    >
                        Details
                    </a>
                </Space>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys: React.Key[]) => {
            setSelectedRowKeys(selectedKeys);
        },
    };

    // Only get selected products for barcode modal
    const selectedProducts = data.filter(item =>
        selectedRowKeys.includes(item._id)
    );

    return (
        <>
            <Table
                rowSelection={{ type: 'checkbox', ...rowSelection }}
                columns={tableHead}
                dataSource={data}
                rowKey="_id"
                scroll={{ x: 1200 }}
            />

            {/* Buttons under table */}
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
                    Reset Barcode
                </Button>
            </div>

            {/* Barcode Modal */}
            {/* Barcode Modal */}
            <Modal
                open={barcodeModalOpen}
                onCancel={() => setBarcodeModalOpen(false)}
                footer={null}
                width={800}
                title="Print Barcodes"
            >
                <div className="flex justify-between items-center mb-6">
                    <Button
                        type="primary"
                        onClick={handlePrintBarcode}
                    >
                        <span className="mr-2">🖨️</span> Print All Barcodes
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {selectedProducts.map(product =>
                        product.variants.map((variant: any, index: number) => (
                            <div
                                key={`${product._id}-${index}`}
                                className="bg-white px-2 py-2 shadow-md rounded-lg flex flex-col items-center border border-gray-300"
                            >
                                <div className="font-bold text-lg">
                                    {product.item_name}
                                </div>
                                <div className="text-sm text-gray-600">
                                    Size: {variant.size}
                                </div>
                                {/* Big Barcode */}
                                <div className="mb-4">
                                    <Barcode
                                        value={variant.sku}
                                        format="CODE128"
                                        width={2}
                                        height={80}
                                        displayValue={true}
                                        fontSize={18}
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="text-center">
                                    <div className="text-sm text-gray-800 font-semibold">
                                        Price: ${variant.offer_price}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Modal>

            {/* Details Modal */}
            <Modal
                open={!!detailsModal}
                onCancel={() => setDetailsModal(null)}
                footer={null}
                width={900}
                title={`Product Details #${detailsModal?.item_name || ''}`}
            >
                {detailsModal && (
                    <Table
                        columns={[
                            {
                                title: 'Image',
                                dataIndex: 'cover_photo',
                                key: 'cover_photo',
                                render: (cover_photo: string[]) => (
                                    <Image
                                        width={50}
                                        src={cover_photo[0]}
                                    />
                                ),
                            },
                            { title: 'SKU', dataIndex: 'sku', key: 'sku' },
                            {
                                title: 'Color',
                                dataIndex: 'color',
                                key: 'color',
                                render: (color: string) => {
                                    const hex = rgbToHex(color || 'rgb(0,0,0)');
                                    const name = rgbToColorName(
                                        color || 'rgb(0,0,0)'
                                    );
                                    return (
                                        <div className="flex items-center gap-2">
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    width: '12px',
                                                    height: '12px',
                                                    backgroundColor: hex,
                                                    border: '1px solid #000',
                                                }}
                                            ></span>
                                            {name}
                                        </div>
                                    );
                                },
                            },
                            { title: 'Size', dataIndex: 'size', key: 'size' },
                            {
                                title: 'Qty',
                                dataIndex: 'quantity',
                                key: 'quantity',
                            },
                            {
                                title: 'Normal Price',
                                dataIndex: 'normal_price',
                                key: 'normal_price',
                                render: (price: number) => `$${price}`,
                            },
                            {
                                title: 'Offer Price',
                                dataIndex: 'offer_price',
                                key: 'offer_price',
                                render: (price: number) => `$${price}`,
                            },
                            {
                                title: 'Total',
                                key: 'total',
                                render: (text: any, record: any) =>
                                    `$${record.offer_price * record.quantity}`,
                            },
                        ]}
                        dataSource={detailsModal.variants}
                        rowKey="sku"
                        pagination={false}
                    />
                )}
            </Modal>
        </>
    );
};

export default ProductTable;
