import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { instance } from '@/helpers/axios/axiosInstance';
export default function Stock_Request() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchStockRequests();
    }, []);
    const fetchStockRequests = async () => {
        try {
            setLoading(true);
            const response = await instance.get(
                `${getBaseUrl}/inventory/stock_request`
            );
            setRequests(response.data || []);
        } catch (err) {
            setError(err.message || 'Failed to fetch stock requests');
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async id => {
        if (window.confirm('Are you sure you want to delete this request?')) {
            try {
                await instance.delete(
                    `${getBaseUrl}/inventory/stock_request/${id}`
                );
                setRequests(requests.filter(req => req._id !== id));
            } catch (err) {
                alert('Failed to delete request');
            }
        }
    };
    const handleApprove = async id => {
        try {
            await instance.put(`${getBaseUrl}/inventory/stock_request/${id}`, {
                status: 'approved',
            });
            setRequests(
                requests.map(req =>
                    req._id === id ? { ...req, status: 'approved' } : req
                )
            );
        } catch (err) {
            alert('Failed to approve request');
        }
    };
    const handleReject = async id => {
        try {
            await instance.put(`${getBaseUrl}/inventory/stock_request/${id}`, {
                status: 'rejected',
            });
            setRequests(
                requests.map(req =>
                    req._id === id ? { ...req, status: 'rejected' } : req
                )
            );
        } catch (err) {
            alert('Failed to reject request');
        }
    };
    if (loading) return _jsx('div', { children: 'Loading...' });
    if (error) return _jsxs('div', { children: ['Error: ', error] });
    return _jsxs('div', {
        className: 'p-6 space-y-4',
        children: [
            _jsxs('div', {
                className: 'flex items-center space-x-2',
                children: [
                    _jsx('select', {
                        className: 'border rounded-md p-2',
                        children: _jsx('option', { children: 'All' }),
                    }),
                    _jsx('select', {
                        className: 'border rounded-md p-2',
                        children: _jsx('option', {
                            children: 'Delivery Status',
                        }),
                    }),
                    _jsx('select', {
                        className: 'border rounded-md p-2',
                        children: _jsx('option', { children: 'All' }),
                    }),
                    _jsxs('div', {
                        className: 'ml-auto flex items-center space-x-2',
                        children: [
                            _jsx('input', {
                                type: 'text',
                                placeholder: 'Search for...',
                                className: 'border rounded-md p-2 w-48',
                            }),
                            _jsx('button', {
                                className: 'p-2 border rounded-md',
                                children: _jsx(Search, {
                                    className: 'w-4 h-4',
                                }),
                            }),
                            _jsxs('select', {
                                className: 'border rounded-md p-2',
                                children: [
                                    _jsx('option', { children: '10' }),
                                    _jsx('option', { children: '20' }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            _jsx('div', {
                className: 'bg-white shadow rounded-2xl overflow-x-auto',
                children: _jsxs('table', {
                    className: 'min-w-full text-sm',
                    children: [
                        _jsx('thead', {
                            className: 'bg-gray-100 border-b',
                            children: _jsxs('tr', {
                                children: [
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: _jsx('input', {
                                            type: 'checkbox',
                                        }),
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Image',
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Order',
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Status',
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Delivery Status',
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Note',
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Quantity',
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Seller',
                                    }),
                                    _jsx('th', {
                                        className: 'p-2 text-left',
                                        children: 'Request Time',
                                    }),
                                ],
                            }),
                        }),
                        _jsx('tbody', {
                            className: 'divide-y',
                            children: requests.map(req =>
                                _jsxs(
                                    'tr',
                                    {
                                        children: [
                                            _jsx('td', {
                                                className: 'p-2',
                                                children: _jsx('input', {
                                                    type: 'checkbox',
                                                }),
                                            }),
                                            _jsx('td', {
                                                className: 'p-2',
                                                children: _jsx('img', {
                                                    src: req.image,
                                                    alt: 'product',
                                                    className:
                                                        'w-12 h-12 rounded',
                                                }),
                                            }),
                                            _jsx('td', {
                                                className:
                                                    'p-2 whitespace-pre-line',
                                                children: req.order,
                                            }),
                                            _jsxs('td', {
                                                className: 'p-2 space-x-2',
                                                children: [
                                                    _jsx('button', {
                                                        onClick: () =>
                                                            handleDelete(
                                                                req._id
                                                            ),
                                                        className:
                                                            'bg-red-200 text-red-700 px-3 py-1 rounded-full text-xs',
                                                        children: 'Delete',
                                                    }),
                                                    _jsx('button', {
                                                        onClick: () =>
                                                            handleApprove(
                                                                req._id
                                                            ),
                                                        className:
                                                            'bg-green-200 text-green-700 px-3 py-1 rounded-full text-xs',
                                                        children: 'Approve',
                                                    }),
                                                    _jsx('button', {
                                                        onClick: () =>
                                                            handleReject(
                                                                req._id
                                                            ),
                                                        className:
                                                            'bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-xs',
                                                        children: 'Reject',
                                                    }),
                                                ],
                                            }),
                                            _jsx('td', {
                                                className: 'p-2',
                                                children: req.deliveryStatus
                                                    ? _jsx('span', {
                                                          className:
                                                              'bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs',
                                                          children:
                                                              req.deliveryStatus,
                                                      })
                                                    : _jsx('button', {
                                                          className:
                                                              'p-1 border rounded',
                                                          children:
                                                              '\u270F\uFE0F',
                                                      }),
                                            }),
                                            _jsxs('td', {
                                                className:
                                                    'p-2 flex items-center space-x-1',
                                                children: [
                                                    _jsx('span', {
                                                        children: req.note,
                                                    }),
                                                    _jsx('button', {
                                                        className:
                                                            'p-1 border rounded',
                                                        children:
                                                            '\u270F\uFE0F',
                                                    }),
                                                ],
                                            }),
                                            _jsxs('td', {
                                                className:
                                                    'p-2 flex items-center space-x-1',
                                                children: [
                                                    _jsx('span', {
                                                        className:
                                                            'text-blue-600 font-semibold',
                                                        children: req.quantity,
                                                    }),
                                                    _jsx('button', {
                                                        className:
                                                            'p-1 border rounded',
                                                        children:
                                                            '\u270F\uFE0F',
                                                    }),
                                                ],
                                            }),
                                            _jsx('td', {
                                                className: 'p-2',
                                                children: req.seller,
                                            }),
                                            _jsx('td', {
                                                className: 'p-2',
                                                children: req.requestTime,
                                            }),
                                        ],
                                    },
                                    req._id
                                )
                            ),
                        }),
                    ],
                }),
            }),
        ],
    });
}
