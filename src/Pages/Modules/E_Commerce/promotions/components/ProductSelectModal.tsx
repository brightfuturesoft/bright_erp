import React, { useState } from 'react';
import { Modal, Table, Button, Input, Image } from 'antd';

interface Product {
    _id: string;
    item_name: string;
    item_type: string;
    availeablein_ecommerce: boolean;
    variants: {
        sku: string;
        normal_price: number;
        offer_price: number;
        cover_photo: string[];
    }[];
}

interface ProductSelectModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    allProducts: Product[];
    onAddProduct: (product: Product) => void;
}

const ProductSelectModal: React.FC<ProductSelectModalProps> = ({
    isOpen,
    setIsOpen,
    allProducts,
    onAddProduct,
}) => {
    const [searchText, setSearchText] = useState('');

    // Filter only ecommerce products
    const filteredProducts = allProducts.filter(
        item =>
            item.item_type === 'product' &&
            item.availeablein_ecommerce === true &&
            item.item_name.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: 'Image',
            dataIndex: 'variants',
            key: 'image',
            render: (variants: any) => (
                <Image
                    width={50}
                    src={variants?.[0]?.cover_photo?.[0]}
                    alt="product"
                    className="rounded-md"
                />
            ),
        },
        {
            title: 'Product Name',
            dataIndex: 'item_name',
            key: 'item_name',
        },
        {
            title: 'SKU',
            dataIndex: ['variants', 0, 'sku'],
            key: 'sku',
        },
        {
            title: 'Main Price',
            dataIndex: ['variants', 0, 'normal_price'],
            key: 'normal_price',
        },
        {
            title: 'Offer Price',
            dataIndex: ['variants', 0, 'offer_price'],
            key: 'offer_price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Product) => (
                <Button
                    type="primary"
                    onClick={() => {
                        onAddProduct(record);
                        setIsOpen(false);
                    }}
                >
                    Add
                </Button>
            ),
        },
    ];

    return (
        <Modal
            title="Select Product"
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={null}
            width={800}
            className="dark:bg-gray-900 dark:text-white"
        >
            <div className="flex justify-between mb-4">
                <Input
                    placeholder="Search product..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    className="w-1/2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                />
            </div>

            <Table
                dataSource={filteredProducts}
                columns={columns}
                rowKey="_id"
                pagination={{ pageSize: 5 }}
                className="dark:bg-gray-900 dark:text-white"
            />
        </Modal>
    );
};

export default ProductSelectModal;
