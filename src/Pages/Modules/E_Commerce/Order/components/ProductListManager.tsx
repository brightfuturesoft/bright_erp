import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Card, Input, Typography, Button } from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
    UpOutlined,
    DownOutlined,
    MinusOutlined,
} from '@ant-design/icons';
import type { ChangeEvent } from 'react';
import { Order, Product, ProductCard } from './ProductCard';

const { Title, Text } = Typography;

interface ProductListManagerProps {
    order: Order;
}

const ProductListManager: React.FC<ProductListManagerProps> = ({ order }) => {
    const [products, setProducts] = useState<Product[]>(order.products || []);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleAddProduct = useCallback(() => {
        const newProduct: Product = {
            product_id: crypto.randomUUID(),
            product_name: `New Product ${products.length + 1}`,
            product_image:
                'https://placehold.co/250x250/f4e3c5/1c1917?text=Product+Image',
            sku: 'new-sku',
            order_price: 0,
            quantity: 1,
            warranty: '',
        };
        setProducts(prev => [...prev, newProduct]);
    }, [products.length]);

    const handleDeleteProduct = useCallback((id: string) => {
        setProducts(prev => prev.filter(p => p.product_id !== id));
    }, []);

    const handleUpdateProduct = useCallback(
        (id: string, field: keyof Product, value: any) => {
            setProducts(prev =>
                prev.map(p =>
                    p.product_id === id ? { ...p, [field]: value } : p
                )
            );
        },
        []
    );

    return (
        <div className=" px-5 w-full ">
            <Card
                className=" border-none shadow-lg rounded-xl bg-white dark:bg-gray-800"
                bodyStyle={{ padding: '16px' }}
            >
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                    <Title
                        level={4}
                        className="!mb-0 !text-lg font-medium text-gray-900 dark:text-gray-100"
                    >
                        Products
                    </Title>
                    {/* <div className="flex items-center space-x-2">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddProduct}
              className="bg-indigo-600 hover:bg-indigo-700 border-none rounded-lg flex items-center"
              size="middle"
            >
              Add More Product
            </Button>
            <Button
              type="text"
              icon={isCollapsed ? <DownOutlined /> : <UpOutlined />}
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-8 h-8 flex items-center justify-center rounded-full"
            />
          </div> */}
                </div>

                {/* Product List */}
                {!isCollapsed && (
                    <div className="pt-4">
                        {products.map(product => (
                            <ProductCard
                                key={product.product_id}
                                product={product}
                                onUpdate={handleUpdateProduct}
                                onDelete={handleDeleteProduct}
                            />
                        ))}

                        {products.length === 0 && (
                            <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                                No products added yet. Click "Add More Product"
                                to begin.
                            </div>
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ProductListManager;
