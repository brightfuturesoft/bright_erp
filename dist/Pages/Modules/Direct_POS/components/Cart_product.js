import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const Cart_product = ({ item, remove_from_cart, update_quantity }) => {
    return _jsx('div', {
        children: _jsx(
            'div',
            {
                className: 'dark:bg-gray-700 bg-gray-300 rounded-lg p-3 mb-3',
                children: _jsxs('div', {
                    className: 'flex gap-3',
                    children: [
                        _jsx('div', {
                            className:
                                'w-12 h-12 dark:bg-gray-600 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0',
                            children: _jsx('img', {
                                src: item.cover_photo || item.cover_photo[0],
                                alt: item.item_name || item.name,
                                className: 'w-full h-full object-cover',
                                onError: e => {
                                    e.currentTarget.src =
                                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yNCAzNkMzMC42Mjc0IDM2IDM2IDMwLjYyNzQgMzYgMjRDMzYgMTcuMzcyNiAzMC42Mjc0IDEyIDI0IDEyQzE3LjM3MjYgMTIgMTIgMTcuMzcyNiAxMiAyNEMxMiAzMC42Mjc0IDE3LjM3MjYgMzYgMjQgMzZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMjAgMjBMMjggMjgiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTI4IDIwTDIwIDI4IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=';
                                },
                            }),
                        }),
                        _jsxs('div', {
                            className: 'flex-1',
                            children: [
                                _jsxs('div', {
                                    className:
                                        'flex justify-between items-start mb-2',
                                    children: [
                                        _jsx('div', {
                                            className:
                                                'text-sm dark:text-gray-300 text-gray-800',
                                            children:
                                                item.code ||
                                                item.sku ||
                                                `#${item._id}`,
                                        }),
                                        _jsx('button', {
                                            onClick: () =>
                                                remove_from_cart(item.sku),
                                            className:
                                                'text-red-400 hover:text-red-300 text-xs',
                                            children: '\u2715',
                                        }),
                                    ],
                                }),
                                _jsx('div', {
                                    className:
                                        'font-medium dark:text-white text-black mb-1',
                                    children: item.item_name || item.name,
                                }),
                                _jsxs('div', {
                                    className:
                                        'dark:text-green-400 text-green-500 font-semibold  mb-2',
                                    children: [
                                        _jsx('span', {
                                            className: 'kalpurush-font',
                                            children: '\u09F3',
                                        }),
                                        ' ',
                                        parseFloat(
                                            item.offer_price ||
                                                item.normal_price
                                        ) || 0,
                                    ],
                                }),
                                _jsxs('div', {
                                    className:
                                        'flex items-center justify-between',
                                    children: [
                                        _jsxs('div', {
                                            className:
                                                'flex items-center gap-2',
                                            children: [
                                                _jsx('button', {
                                                    onClick: () =>
                                                        update_quantity(
                                                            item.sku,
                                                            item.quantity - 1
                                                        ),
                                                    className:
                                                        'bg-gray-600 text-white w-6 h-6 rounded flex items-center justify-center text-sm',
                                                    children: '-',
                                                }),
                                                _jsx('span', {
                                                    className:
                                                        'dark:text-white text-black',
                                                    children: item.quantity,
                                                }),
                                                _jsx('button', {
                                                    onClick: () =>
                                                        update_quantity(
                                                            item.sku,
                                                            item.quantity + 1
                                                        ),
                                                    className:
                                                        'bg-gray-600 text-white w-6 h-6 rounded flex items-center justify-center text-sm',
                                                    children: '+',
                                                }),
                                            ],
                                        }),
                                        _jsxs('div', {
                                            className:
                                                'dark:text-white text-black font-semibold',
                                            children: [
                                                _jsx('span', {
                                                    className: 'kalpurush-font',
                                                    children: '\u09F3',
                                                }),
                                                (
                                                    parseFloat(
                                                        item.offer_price ||
                                                            item.normal_price
                                                    ) * item.quantity
                                                ).toFixed(2),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            },
            item._id
        ),
    });
};
export default Cart_product;
