import React, { useState, useCallback, useMemo, ChangeEvent } from 'react';
import { Card, Input, Typography, Button } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// --- TYPES ---
export interface Variation {
    color?: string;
    size?: string;
}

export interface Product {
    product_id: string;
    product_name: string;
    product_image: string;
    sku: string;
    order_price: number;
    quantity: number;
    warranty?: string;
    user_email?: string;
    user_name?: string;
    user_number?: string;
    variation?: Variation;
}

export interface Order {
    _id: string;
    order_number: string;
    order_type: string;
    products: Product[];
    total_amount: number;
    tax_amount: number;
    delivery_address: {
        full_name: string;
        phone_number: string;
        street: string;
        city: string;
        state: string;
        country?: string;
    };
    order_status: string;
}

// --- PRODUCT CARD ---
interface ProductCardProps {
    product: Product;
    onUpdate: (
        id: string,
        field: keyof Product | 'variation',
        value: any
    ) => void;
    onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onUpdate,
    onDelete,
}) => {
    // Total Price Calculation
    const totalItemPrice = useMemo(
        () => (product.order_price * product.quantity).toFixed(2),
        [product.order_price, product.quantity]
    );

    // --- Handlers ---
    const handlePriceChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = parseFloat(e.target.value);
            onUpdate(
                product.product_id,
                'order_price',
                isNaN(value) ? 0 : value
            );
        },
        [product.product_id, onUpdate]
    );

    const handleQuantityChange = useCallback(
        (newQuantity: number) => {
            if (newQuantity >= 0) {
                onUpdate(product.product_id, 'quantity', newQuantity);
            }
        },
        [product.product_id, onUpdate]
    );

    return (
        <div className="relative border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4 p-4 shadow-sm bg-white dark:bg-gray-800">
            {/* Delete Button */}
            <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onDelete(product.product_id)}
                className="absolute top-2 right-2 z-10 p-0 w-8 h-8 flex items-center justify-center bg-white/80 dark:bg-gray-700/80 rounded-full hover:bg-red-50 dark:hover:bg-red-600/30"
                title="Delete Product"
            />

            <div className="flex flex-col sm:flex-row gap-4">
                {/* Product Image */}
                <div className="relative w-full sm:w-48 flex-shrink-0">
                    <img
                        src={product.product_image}
                        alt={product.product_name}
                        className="w-full h-auto rounded-lg object-cover"
                        onError={e => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                                'https://placehold.co/250x250/e0e0e0/4B5563?text=Image+Unavailable';
                        }}
                    />
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-md">
                        {product.sku}
                    </span>
                </div>

                {/* Product Details */}
                <div className="flex-grow space-y-4">
                    {/* Product Name */}
                    <Title
                        level={5}
                        className="!mt-0 !mb-0 text-base font-semibold text-gray-900 dark:text-gray-100"
                    >
                        {product.product_name}
                    </Title>

                    {/* Price and Total */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Unit Price */}
                        <div>
                            <Text className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                                Item Unit Price
                            </Text>
                            <Input
                                value={product.order_price}
                                onChange={handlePriceChange}
                                type="number"
                                placeholder="0"
                                className="rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                            />
                        </div>

                        {/* Total Price */}
                        <div>
                            <Text className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                                Item Total Price
                            </Text>
                            <Input
                                value={totalItemPrice}
                                readOnly
                                placeholder="Calculated"
                                className="rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 cursor-default"
                            />
                        </div>
                    </div>

                    {/* Warranty */}
                    <div>
                        <Text className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                            Warranty
                        </Text>
                        <Input
                            value={product.warranty || ''}
                            onChange={e =>
                                onUpdate(
                                    product.product_id,
                                    'warranty',
                                    e.target.value
                                )
                            }
                            placeholder="e.g., 1 Year Manufacturer Warranty"
                            className="rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                        />
                    </div>

                    {/* Variation */}
                    <div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                            {/* Color */}
                            <div className="flex flex-col">
                                <label className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                                    Color
                                </label>
                                <input
                                    type="color"
                                    value={
                                        product.variation?.color || '#ffffff'
                                    }
                                    onChange={e =>
                                        onUpdate(
                                            product.product_id,
                                            'variation',
                                            {
                                                ...product.variation,
                                                color: e.target.value,
                                            }
                                        )
                                    }
                                    className="w-full h-10  border-none  cursor-pointer"
                                />
                            </div>

                            {/* Size */}
                            <div className="flex flex-col">
                                <label className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                                    Size
                                </label>
                                <Input
                                    value={product.variation?.size || ''}
                                    onChange={e =>
                                        onUpdate(
                                            product.product_id,
                                            'variation',
                                            {
                                                ...product.variation,
                                                size: e.target.value,
                                            }
                                        )
                                    }
                                    placeholder="Size"
                                    className="rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Quantity Counter */}
                    <div className="mt-4">
                        <div className="flex w-36 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                            <Button
                                icon={<MinusOutlined />}
                                onClick={() =>
                                    handleQuantityChange(product.quantity - 1)
                                }
                                disabled={product.quantity <= 1}
                                className="!border-none !bg-transparent !hover:bg-gray-200 dark:!hover:bg-gray-600 text-gray-700 dark:text-gray-200 p-0 w-10 h-10 flex items-center justify-center rounded-none"
                            />
                            <Input
                                value={product.quantity}
                                onChange={e =>
                                    handleQuantityChange(
                                        parseInt(e.target.value) || 0
                                    )
                                }
                                type="number"
                                className="text-center border-y-0 border-x border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-0 h-10 flex-grow"
                                min={1}
                            />
                            <Button
                                icon={<PlusOutlined />}
                                onClick={() =>
                                    handleQuantityChange(product.quantity + 1)
                                }
                                className="!border-none !bg-transparent !hover:bg-gray-200 dark:!hover:bg-gray-600 text-gray-700 dark:text-gray-200 p-0 w-10 h-10 flex items-center justify-center rounded-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
