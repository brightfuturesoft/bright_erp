import React from 'react';

const Cart_product = ({ item, remove_from_cart, update_quantity }: any) => {
    return (
        <div>
            <div
                key={item._id}
                className="dark:bg-gray-700 bg-gray-300 rounded-lg p-3 mb-3"
            >
                <div className="flex gap-3">
                    <div className="w-12 h-12 dark:bg-gray-600 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            src={item.cover_photo || item.cover_photo[0]}
                            alt={item.item_name || item.name}
                            className="w-full h-full object-cover"
                            onError={e => {
                                e.currentTarget.src =
                                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yNCAzNkMzMC42Mjc0IDM2IDM2IDMwLjYyNzQgMzYgMjRDMzYgMTcuMzcyNiAzMC42Mjc0IDEyIDI0IDEyQzE3LjM3MjYgMTIgMTIgMTcuMzcyNiAxMiAyNEMxMiAzMC42Mjc0IDE3LjM3MjYgMzYgMjQgMzZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMjAgMjBMMjggMjgiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTI4IDIwTDIwIDI4IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=';
                            }}
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <div className="text-sm dark:text-gray-300 text-gray-800">
                                {item.code || item.sku || `#${item._id}`}
                            </div>
                            <button
                                onClick={() => remove_from_cart(item.sku)}
                                className="text-red-400 hover:text-red-300 text-xs"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="font-medium dark:text-white text-black mb-1">
                            {item.item_name || item.name}
                        </div>
                        <div className="dark:text-green-400 text-green-500 font-semibold  mb-2">
                            <span className="kalpurush-font">৳</span>{' '}
                            {parseFloat(
                                item.offer_price || item.normal_price
                            ) || 0}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        update_quantity(
                                            item.sku,
                                            item.quantity - 1
                                        )
                                    }
                                    className="bg-gray-600 text-white w-6 h-6 rounded flex items-center justify-center text-sm"
                                >
                                    -
                                </button>
                                <span className="dark:text-white text-black">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        update_quantity(
                                            item.sku,
                                            item.quantity + 1
                                        )
                                    }
                                    className="bg-gray-600 text-white w-6 h-6 rounded flex items-center justify-center text-sm"
                                >
                                    +
                                </button>
                            </div>
                            <div className="dark:text-white text-black font-semibold">
                                <span className="kalpurush-font">৳</span>
                                {(
                                    parseFloat(
                                        item.offer_price || item.normal_price
                                    ) * item.quantity
                                ).toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart_product;
