import React from 'react';

const Product_data = ({ product, add_to_cart }: any) => {
    return (
        <div>
            <div
                key={product._id}
                className="bg-white dark:bg-gray-900 border dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all transform hover:scale-105"
                onClick={() => add_to_cart(product)}
            >
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                    {product.cover_photo || product.cover_photo[0] ? (
                        <img
                            src={
                                product?.cover_photo || product?.cover_photo[0]
                            }
                            alt={product.item_name}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : (
                        <span className="text-gray-400 text-sm">No Image</span>
                    )}
                </div>

                {/* Category */}
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    {product.category?.[0]?.label || 'Uncategorized'}
                </div>

                {/* Name */}
                <div className="font-semibold dark:text-white">
                    {product.item_name.split(' ').slice(0, 4).join(' ')}
                </div>

                {/* Stock & Price */}
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {product.quantity || product.low_stock || 0}{' '}
                        {product.unit}
                    </span>
                    <span className="font-semibold text-teal-600 dark:text-teal-400">
                        ৳
                        {parseFloat(
                            product.offer_price || product.normal_price
                        ) || 0}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Product_data;
