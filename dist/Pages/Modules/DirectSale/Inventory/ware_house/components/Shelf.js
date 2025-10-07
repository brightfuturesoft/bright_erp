import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getBaseUrl } from '@/helpers/config/envConfig';
const Shelf = () => {
    const [shelves, setShelves] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        fetchShelves();
        fetchWarehouses();
    }, []);
    const fetchShelves = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/shelfs`
            );
            if (response.data && Array.isArray(response.data.data)) {
                setShelves(response.data.data);
            } else {
                setError('Invalid data format from server');
            }
        } catch (error) {
            setError(error.message || 'Error fetching shelves');
        } finally {
            setLoading(false);
        }
    };
    const fetchWarehouses = async () => {
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house`
            );
            if (response.data && Array.isArray(response.data.data)) {
                setWarehouses(
                    response.data.data.map(wh => ({
                        _id: wh._id,
                        name: wh.name,
                    }))
                );
            }
        } catch (error) {
            console.error('Error fetching warehouses', error);
        }
    };
    const handleAddShelf = async () => {
        if (!selectedWarehouse || !description) {
            setError('Please select warehouse and enter description');
            return;
        }
        try {
            await axios.post(`${getBaseUrl}/inventory/ware_house/shelf`, {
                warehouseId: selectedWarehouse,
                description,
            });
            fetchShelves();
            setIsModalOpen(false);
            setSelectedWarehouse('');
            setDescription('');
        } catch (error) {
            setError(error.message || 'Error adding shelf');
        }
    };
    const handleDeleteShelf = async id => {
        if (window.confirm('Are you sure you want to delete this shelf?')) {
            try {
                await axios.delete(
                    `${getBaseUrl}/inventory/ware_house/shelf/${id}`
                );
                fetchShelves();
            } catch (error) {
                setError(error.message || 'Error deleting shelf');
            }
        }
    };
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            console.log(`Updating status for shelf ${id} to ${newStatus}`);
            // Use dedicated status update endpoint like Area and Cell
            const response = await axios.put(
                `${getBaseUrl}/inventory/ware_house/shelf/${id}/status`,
                {
                    status: newStatus,
                }
            );
            console.log('Status update response:', response.data);
            if (!response.data.error) {
                await fetchShelves();
            } else {
                setError(response.data.message || 'Error updating status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            setError(error.message || 'Error updating status');
        }
    };
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedWarehouse('');
        setDescription('');
        setError(null);
    };
    return _jsxs('div', {
        className: 'p-4 min-h-screen',
        children: [
            _jsx('div', {
                className: 'flex gap-2 mb-4',
                children: _jsx('button', {
                    className: 'px-4 py-2 bg-gray-900 text-white rounded',
                    onClick: openModal,
                    children: 'Add Shelf',
                }),
            }),
            error &&
                _jsx('div', {
                    className: 'mb-4 p-2 bg-red-200 text-red-800 rounded',
                    children: error,
                }),
            loading &&
                _jsx('div', {
                    className: 'mb-4 p-2 bg-blue-200 text-blue-800 rounded',
                    children: 'Loading...',
                }),
            _jsx('div', {
                className: 'overflow-x-auto bg-white rounded shadow',
                children: _jsxs('table', {
                    className: 'w-full text-sm',
                    children: [
                        _jsx('thead', {
                            className: 'bg-gray-800 text-white',
                            children: _jsxs('tr', {
                                children: [
                                    _jsx('th', {
                                        className: 'text-left px-4 py-2',
                                        children: 'Name',
                                    }),
                                    _jsx('th', {
                                        className: 'text-left px-4 py-2',
                                        children: 'Warehouse',
                                    }),
                                    _jsx('th', {
                                        className: 'text-left px-4 py-2',
                                        children: 'Status',
                                    }),
                                    _jsx('th', {
                                        className: 'text-left px-4 py-2',
                                        children: 'Action',
                                    }),
                                ],
                            }),
                        }),
                        _jsx('tbody', {
                            children: shelves.map(shelf =>
                                _jsxs(
                                    'tr',
                                    {
                                        className:
                                            'border-t hover:bg-gray-50 transition',
                                        children: [
                                            _jsx('td', {
                                                className: 'px-4 py-2',
                                                children: shelf.name,
                                            }),
                                            _jsx('td', {
                                                className: 'px-4 py-2',
                                                children: shelf.warehouse,
                                            }),
                                            _jsx('td', {
                                                className: 'px-4 py-2',
                                                children:
                                                    shelf.status === 'Enable'
                                                        ? _jsx('span', {
                                                              className:
                                                                  'px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer',
                                                              children:
                                                                  'Enable',
                                                          })
                                                        : _jsx('span', {
                                                              className:
                                                                  'px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer',
                                                              children:
                                                                  'Disable',
                                                          }),
                                            }),
                                            _jsxs('td', {
                                                className:
                                                    'px-4 py-2 flex gap-2',
                                                children: [
                                                    _jsx('button', {
                                                        className:
                                                            'text-red-600',
                                                        onClick: () =>
                                                            handleDeleteShelf(
                                                                shelf._id
                                                            ),
                                                        children:
                                                            '\uD83D\uDDD1\uFE0F',
                                                    }),
                                                    _jsx('button', {
                                                        className:
                                                            'text-yellow-600',
                                                        children:
                                                            '\u270F\uFE0F',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    },
                                    shelf._id
                                )
                            ),
                        }),
                    ],
                }),
            }),
            isModalOpen &&
                _jsx('div', {
                    className:
                        'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
                    children: _jsxs('div', {
                        className: 'bg-white rounded shadow-lg w-96 max-w-full',
                        children: [
                            _jsxs('div', {
                                className: 'p-4',
                                children: [
                                    _jsx('h2', {
                                        className: 'text-lg font-bold mb-4',
                                        children: 'Add Shelf',
                                    }),
                                    _jsxs('select', {
                                        value: selectedWarehouse,
                                        onChange: e =>
                                            setSelectedWarehouse(
                                                e.target.value
                                            ),
                                        className: 'border p-2 mb-2 w-full',
                                        children: [
                                            _jsx('option', {
                                                value: '',
                                                children: 'Select Warehouse',
                                            }),
                                            warehouses.map(wh =>
                                                _jsx(
                                                    'option',
                                                    {
                                                        value: wh._id,
                                                        children: wh.name,
                                                    },
                                                    wh._id
                                                )
                                            ),
                                        ],
                                    }),
                                    _jsx('textarea', {
                                        placeholder: 'Description',
                                        value: description,
                                        onChange: e =>
                                            setDescription(e.target.value),
                                        className: 'border p-2 mb-2 w-full',
                                    }),
                                    _jsx('button', {
                                        onClick: handleAddShelf,
                                        className:
                                            'bg-blue-600 text-white px-4 py-2 rounded',
                                        children: 'Add',
                                    }),
                                ],
                            }),
                            _jsx('div', {
                                className: 'flex justify-end p-4 border-t',
                                children: _jsx('button', {
                                    onClick: closeModal,
                                    className:
                                        'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                                    children: 'Cancel',
                                }),
                            }),
                        ],
                    }),
                }),
        ],
    });
};
export default Shelf;
