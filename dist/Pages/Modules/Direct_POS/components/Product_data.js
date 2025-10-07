import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const Product_data = ({ product, add_to_cart }) => {
    return _jsx('div', {
        children: _jsxs(
            'div',
            {
                className:
                    'bg-white dark:bg-gray-900 border dark:border-gray-700 text-gray-900 dark:text-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all transform hover:scale-105',
                onClick: () => add_to_cart(product),
                children: [
                    _jsx('div', {
                        className:
                            'aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center',
                        children:
                            product.cover_photo || product.cover_photo[0]
                                ? _jsx('img', {
                                      src:
                                          product?.cover_photo ||
                                          product?.cover_photo[0],
                                      alt: product.item_name,
                                      className:
                                          'w-full h-full object-cover rounded-lg',
                                  })
                                : _jsx('span', {
                                      className: 'text-gray-400 text-sm',
                                      children: 'No Image',
                                  }),
                    }),
                    _jsx('div', {
                        className: 'text-sm text-gray-600 dark:text-gray-400',
                        children:
                            product.category?.[0]?.label || 'Uncategorized',
                    }),
                    _jsx('div', {
                        className: 'font-semibold dark:text-white',
                        children: product.item_name
                            .split(' ')
                            .slice(0, 4)
                            .join(' '),
                    }),
                    _jsxs('div', {
                        className: 'flex justify-between items-center mt-2',
                        children: [
                            _jsxs('span', {
                                className:
                                    'text-sm text-gray-600 dark:text-gray-400',
                                children: [
                                    product.quantity || product.low_stock || 0,
                                    ' ',
                                    product.unit,
                                ],
                            }),
                            _jsxs('span', {
                                className:
                                    'font-semibold text-teal-600 dark:text-teal-400',
                                children: [
                                    '\u09F3',
                                    parseFloat(
                                        product.offer_price ||
                                            product.normal_price
                                    ) || 0,
                                ],
                            }),
                        ],
                    }),
                ],
            },
            product._id
        ),
    });
};
export default Product_data;
