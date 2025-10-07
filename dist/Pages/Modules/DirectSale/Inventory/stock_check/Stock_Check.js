import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import axios from 'axios';
const Stock_Check = () => {
    const [summary, setSummary] = useState(null);
    const [items, setItems] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        fetchSummary();
        fetchItems();
    }, []);
    const fetchSummary = async () => {
        try {
            const res = await axios.get('/inventory/stock_check/summary', {
                headers: { workspace_id: 'your_workspace_id' },
            });
            setSummary(res.data.data);
        } catch (error) {
            console.error('Failed to fetch stock summary', error);
        }
    };
    const fetchItems = async (status = '') => {
        try {
            const res = await axios.get('/inventory/stock_check/items', {
                headers: { workspace_id: 'your_workspace_id' },
                params: { status },
            });
            setItems(res.data.data || []);
        } catch (error) {
            console.error('Failed to fetch stock items', error);
        }
    };
    const handleStatusChange = e => {
        const value = e.target.value;
        setStatusFilter(value);
        fetchItems(value);
    };
    const filteredItems = (items || []).filter(item =>
        item.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return _jsxs('div', {
        className: 'p-6 space-y-6',
        children: [
            _jsxs('div', {
                className: 'grid grid-cols-1 md:grid-cols-4 gap-4',
                children: [
                    _jsx(Card, {
                        className: 'bg-green-100',
                        children: _jsxs(CardContent, {
                            className: 'p-4',
                            children: [
                                _jsx('h2', {
                                    className: 'text-lg font-semibold',
                                    children: 'GoodStock',
                                }),
                                _jsxs('p', {
                                    children: [
                                        'Variations: ',
                                        summary?.GoodStock?.variations || 0,
                                    ],
                                }),
                                _jsxs('p', {
                                    children: [
                                        'Total QTY: ',
                                        summary?.GoodStock?.totalQTY || 0,
                                    ],
                                }),
                                _jsxs('p', {
                                    children: [
                                        'Value: TK.',
                                        summary?.GoodStock?.value || 0,
                                    ],
                                }),
                            ],
                        }),
                    }),
                    _jsx(Card, {
                        className: 'bg-blue-100',
                        children: _jsxs(CardContent, {
                            className: 'p-4',
                            children: [
                                _jsx('h2', {
                                    className: 'text-lg font-semibold',
                                    children: 'AverageStock',
                                }),
                                _jsxs('p', {
                                    children: [
                                        'Variations: ',
                                        summary?.AverageStock?.variations || 0,
                                    ],
                                }),
                                _jsxs('p', {
                                    children: [
                                        'Total QTY: ',
                                        summary?.AverageStock?.totalQTY || 0,
                                    ],
                                }),
                                _jsxs('p', {
                                    children: [
                                        'Value: TK.',
                                        summary?.AverageStock?.value || 0,
                                    ],
                                }),
                            ],
                        }),
                    }),
                    _jsx(Card, {
                        className: 'bg-yellow-100',
                        children: _jsxs(CardContent, {
                            className: 'p-4',
                            children: [
                                _jsx('h2', {
                                    className: 'text-lg font-semibold',
                                    children: 'LowestStock',
                                }),
                                _jsxs('p', {
                                    children: [
                                        'Variations: ',
                                        summary?.LowestStock?.variations || 0,
                                    ],
                                }),
                                _jsxs('p', {
                                    children: [
                                        'Total QTY: ',
                                        summary?.LowestStock?.totalQTY || 0,
                                    ],
                                }),
                                _jsxs('p', {
                                    children: [
                                        'Value: TK.',
                                        summary?.LowestStock?.value || 0,
                                    ],
                                }),
                            ],
                        }),
                    }),
                    _jsx(Card, {
                        className: 'bg-red-100',
                        children: _jsxs(CardContent, {
                            className: 'p-4',
                            children: [
                                _jsx('h2', {
                                    className: 'text-lg font-semibold',
                                    children: 'StockOut',
                                }),
                                _jsxs('p', {
                                    children: [
                                        'Variations: ',
                                        summary?.StockOut?.variations || 0,
                                    ],
                                }),
                                _jsxs('p', {
                                    children: [
                                        'Total QTY: ',
                                        summary?.StockOut?.totalQTY || 0,
                                    ],
                                }),
                                _jsxs('p', {
                                    children: [
                                        'Value: TK.',
                                        summary?.StockOut?.value || 0,
                                    ],
                                }),
                            ],
                        }),
                    }),
                ],
            }),
            _jsxs('div', {
                className: 'flex items-center space-x-4',
                children: [
                    _jsxs('select', {
                        value: statusFilter,
                        onChange: handleStatusChange,
                        className: 'border rounded p-2',
                        children: [
                            _jsx('option', {
                                value: '',
                                children: 'Filter by Status',
                            }),
                            _jsx('option', {
                                value: 'GoodStock',
                                children: 'GoodStock',
                            }),
                            _jsx('option', {
                                value: 'AverageStock',
                                children: 'AverageStock',
                            }),
                            _jsx('option', {
                                value: 'LowestStock',
                                children: 'LowestStock',
                            }),
                            _jsx('option', {
                                value: 'StockOut',
                                children: 'StockOut',
                            }),
                        ],
                    }),
                    _jsx(Input, {
                        placeholder: 'Search for...',
                        value: searchTerm,
                        onChange: e => setSearchTerm(e.target.value),
                        className: 'w-48',
                    }),
                ],
            }),
            _jsx('div', {
                className: 'overflow-x-auto',
                children: _jsxs('table', {
                    className: 'min-w-full text-sm',
                    children: [
                        _jsx('thead', {
                            className: 'border-b bg-gray-100',
                            children: _jsxs('tr', {
                                children: [
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Product',
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Seller',
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Shop',
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Stock Quantity',
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Price',
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Status',
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Warehouse',
                                    }),
                                ],
                            }),
                        }),
                        _jsx('tbody', {
                            className: 'divide-y',
                            children: filteredItems.map((item, idx) =>
                                _jsxs(
                                    'tr',
                                    {
                                        children: [
                                            _jsxs('td', {
                                                className:
                                                    'p-2 flex items-center space-x-2',
                                                children: [
                                                    _jsx('img', {
                                                        src: item.image,
                                                        alt: item.product,
                                                        className:
                                                            'w-12 h-12 rounded',
                                                    }),
                                                    _jsx('span', {
                                                        children: item.product,
                                                    }),
                                                ],
                                            }),
                                            _jsx('td', {
                                                className: 'p-2',
                                                children: item.seller,
                                            }),
                                            _jsx('td', {
                                                className: 'p-2',
                                                children: item.shop,
                                            }),
                                            _jsx('td', {
                                                className: 'p-2',
                                                children: item.quantity,
                                            }),
                                            _jsx('td', {
                                                className: 'p-2',
                                                children: item.price,
                                            }),
                                            _jsx('td', {
                                                className: 'p-2',
                                                children: item.status,
                                            }),
                                            _jsx('td', {
                                                className: 'p-2',
                                                children: item.warehouse,
                                            }),
                                        ],
                                    },
                                    idx
                                )
                            ),
                        }),
                    ],
                }),
            }),
        ],
    });
};
export default Stock_Check;
