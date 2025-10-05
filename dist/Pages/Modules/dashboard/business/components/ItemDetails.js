import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useItemsData } from '@/Pages/Modules/item/items/components/data_get_api';
import { Flex, Progress } from 'antd';
const ItemDetails = () => {
    const { itemsData, isLoading } = useItemsData();
    if (isLoading) return _jsx('p', { children: 'Loading...' });
    const totalItems = itemsData?.length || 0;
    const lowStockItems = itemsData?.filter(
        item => item.low_stock && parseInt(item.low_stock) > 0
    ).length;
    const allItemGroups = itemsData?.reduce((acc, item) => {
        item.categories?.forEach(cat => {
            if (!acc.includes(cat.label)) acc.push(cat.label);
        });
        return acc;
    }, []).length;
    const progressPercent = totalItems
        ? Math.min((lowStockItems / totalItems) * 100, 100)
        : 0;
    let strokeColor = '#52c41a';
    if (progressPercent >= 30 && progressPercent < 70) strokeColor = '#faad14';
    else if (progressPercent >= 70) strokeColor = '#f5222d';
    return _jsxs('div', {
        className:
            'gap-2 dark:border-gray-700 grid md:grid-cols-2 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full',
        children: [
            _jsxs('div', {
                children: [
                    _jsx('h4', {
                        className: 'font-semibold text-xl dark:text-gray-400',
                        children: 'ITEM DETAILS',
                    }),
                    _jsxs('ul', {
                        children: [
                            _jsxs('li', {
                                className:
                                    'flex justify-between items-center mb-3 w-full text-red-600',
                                children: [
                                    _jsx('span', {
                                        children: 'Low Stock Items',
                                    }),
                                    _jsx('span', { children: lowStockItems }),
                                ],
                            }),
                            _jsxs('li', {
                                className:
                                    'flex justify-between items-center mb-3 w-full text-blue-600',
                                children: [
                                    _jsx('span', {
                                        children: 'All Active Items',
                                    }),
                                    _jsx('span', { children: totalItems }),
                                ],
                            }),
                            _jsxs('li', {
                                className:
                                    'flex justify-between items-center mb-3 w-full text-blue-600',
                                children: [
                                    _jsx('span', {
                                        children: 'All Item Groups',
                                    }),
                                    _jsx('span', { children: allItemGroups }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            _jsx('div', {
                className:
                    'flex justify-center md:justify-end items-center mt-6 md:mt-0',
                children: _jsx(Flex, {
                    gap: 'large',
                    wrap: true,
                    children: _jsx('div', {
                        className: 'stock-progress',
                        children: _jsx(Progress, {
                            type: 'dashboard',
                            percent: progressPercent,
                            strokeWidth: 10,
                            strokeColor: strokeColor,
                            size: 10,
                        }),
                    }),
                }),
            }),
        ],
    });
};
export default ItemDetails;
