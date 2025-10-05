import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Category_card from '../components/Category_card';
import Product_data from '../components/Product_data';
const Left_panel = ({
    categories,
    visible_categories,
    selected_category,
    set_selected_category,
    page,
    setPage,
    itemsPerView,
    endIndex,
    cart_items,
    handleReset,
    heldOrders,
    set_is_hold_list_modal_visible,
    filtered_products,
    add_to_cart,
    search_term,
    set_search_term,
    handle_search_key_down,
}) => {
    return _jsxs('div', {
        className: 'flex-1 p-6 overflow-y-auto',
        children: [
            _jsxs('div', {
                className: 'flex gap-3 mb-6',
                children: [
                    _jsx(Link, {
                        to: '/dashboard/pos/orders',
                        children: _jsx('button', {
                            className:
                                'bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2',
                            children: '\uD83D\uDCCB View Orders',
                        }),
                    }),
                    _jsx('button', {
                        onClick: handleReset,
                        className:
                            'bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2',
                        children: '\uD83D\uDD04 Reset',
                    }),
                    _jsx(Link, {
                        to: '/dashboard/pos/orders',
                        children: _jsx('button', {
                            className:
                                'bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2',
                            children: '\uD83D\uDCB3 Transaction',
                        }),
                    }),
                    heldOrders?.length > 0 &&
                        _jsxs('button', {
                            onClick: () => set_is_hold_list_modal_visible(true),
                            className:
                                'bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2',
                            children: [
                                'Pending Orders (',
                                heldOrders.length,
                                ')',
                            ],
                        }),
                ],
            }),
            _jsxs('div', {
                className: 'mb-6',
                children: [
                    _jsxs('div', {
                        className: 'flex justify-between items-center mb-4',
                        children: [
                            _jsx('h2', {
                                className:
                                    'text-xl font-semibold dark:text-white text-black ',
                                children: 'Categories',
                            }),
                            _jsxs('div', {
                                className: 'flex justify-end gap-2 ',
                                children: [
                                    _jsx('button', {
                                        onClick: () =>
                                            setPage(p => Math.max(0, p - 1)),
                                        disabled: page === 0,
                                        className:
                                            'dark:bg-white bg-gray-900 hover:bg-gray-50 disabled:dark:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed border border-gray-200 rounded-lg p-2 shadow-sm transition-all duration-200 hover:shadow-md',
                                        children: _jsx(ChevronLeftIcon, {
                                            className: `w-5 h-5 ${page === 0 ? 'text-gray-300' : 'text-gray-600 hover:text-gray-800'}`,
                                        }),
                                    }),
                                    _jsx('button', {
                                        onClick: () =>
                                            setPage(p =>
                                                Math.min(
                                                    Math.ceil(
                                                        (categories?.length ||
                                                            0) / itemsPerView
                                                    ) - 1,
                                                    p + 1
                                                )
                                            ),
                                        disabled:
                                            endIndex >=
                                            (categories?.length || 0),
                                        className:
                                            'dark:bg-white bg-gray-900 hover:bg-gray-50 disabled:dark:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed border border-gray-200 rounded-lg p-2 shadow-sm transition-all duration-200 hover:shadow-md',
                                        children: _jsx(ChevronRightIcon, {
                                            className: `w-5 h-5 ${endIndex >= (categories?.length || 0) ? 'text-gray-300' : 'text-gray-600 hover:text-gray-800'}`,
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'grid grid-cols-6 gap-4',
                        children: visible_categories?.map(category =>
                            _jsx(
                                Category_card,
                                {
                                    category: category,
                                    selected_category: selected_category,
                                    set_selected_category:
                                        set_selected_category,
                                },
                                category._id
                            )
                        ),
                    }),
                    _jsx('div', {
                        className: 'flex justify-center mt-4 gap-1',
                        children: Array.from(
                            {
                                length: Math.ceil(
                                    (categories?.length || 0) / itemsPerView
                                ),
                            },
                            (_, index) =>
                                _jsx(
                                    'button',
                                    {
                                        onClick: () => setPage(index),
                                        className: `w-2 h-2 rounded-full transition-all duration-200 ${
                                            page === index
                                                ? 'bg-orange-400 w-6'
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`,
                                    },
                                    index
                                )
                        ),
                    }),
                ],
            }),
            _jsxs('div', {
                children: [
                    _jsxs('div', {
                        className: 'flex justify-between items-center mb-4',
                        children: [
                            _jsx('h2', {
                                className:
                                    'text-xl font-semibold dark:text-white text-black',
                                children: 'Products',
                            }),
                            _jsx('div', {
                                className: 'relative',
                                children: _jsx('input', {
                                    value: search_term,
                                    onKeyDown: handle_search_key_down,
                                    onChange: e =>
                                        set_search_term(e.target.value),
                                    type: 'text',
                                    placeholder: 'Search Product',
                                    className:
                                        'pl-3 pr-3 py-2 border rounded-lg bg-white text-gray-900 placeholder:text-gray-400',
                                }),
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'grid grid-cols-4 gap-4',
                        children: filtered_products.map(product =>
                            _jsx(Product_data, {
                                add_to_cart: add_to_cart,
                                product: product,
                            })
                        ),
                    }),
                ],
            }),
        ],
    });
};
export default Left_panel;
