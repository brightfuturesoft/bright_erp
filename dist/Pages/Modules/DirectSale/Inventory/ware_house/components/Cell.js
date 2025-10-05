import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getBaseUrl } from '@/helpers/config/envConfig';
const Cell = () => {
    const [cells, setCells] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [areas, setAreas] = useState([]);
    const [racks, setRacks] = useState([]);
    const [shelfs, setShelfs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedRack, setSelectedRack] = useState('');
    const [selectedShelf, setSelectedShelf] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        fetchCells();
        fetchWarehouses();
    }, []);
    useEffect(() => {
        if (selectedWarehouse) {
            fetchAreas(selectedWarehouse);
        } else {
            setAreas([]);
            setSelectedArea('');
        }
        setRacks([]);
        setSelectedRack('');
        setShelfs([]);
        setSelectedShelf('');
    }, [selectedWarehouse]);
    useEffect(() => {
        if (selectedArea) {
            fetchRacks(selectedArea);
        } else {
            setRacks([]);
            setSelectedRack('');
        }
        setShelfs([]);
        setSelectedShelf('');
    }, [selectedArea]);
    useEffect(() => {
        if (selectedRack) {
            fetchShelfs(selectedRack);
        } else {
            setShelfs([]);
            setSelectedShelf('');
        }
    }, [selectedRack]);
    const fetchCells = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/cells`
            );
            if (response.data && Array.isArray(response.data.data)) {
                setCells(response.data.data);
            } else {
                setError('Invalid data format from server');
            }
        } catch (error) {
            setError(error.message || 'Error fetching cells');
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
    const fetchAreas = async warehouseId => {
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/areas`,
                {
                    params: { warehouseId },
                }
            );
            if (response.data && Array.isArray(response.data.data)) {
                setAreas(
                    response.data.data.map(area => ({
                        _id: area._id,
                        name: area.name,
                    }))
                );
            }
        } catch (error) {
            console.error('Error fetching areas', error);
        }
    };
    const fetchRacks = async areaId => {
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/racks`,
                {
                    params: { areaId },
                }
            );
            if (response.data && Array.isArray(response.data.data)) {
                setRacks(
                    response.data.data.map(rack => ({
                        _id: rack._id,
                        name: rack.name,
                    }))
                );
            }
        } catch (error) {
            console.error('Error fetching racks', error);
        }
    };
    const fetchShelfs = async rackId => {
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/shelfs`,
                {
                    params: { rackId },
                }
            );
            if (response.data && Array.isArray(response.data.data)) {
                setShelfs(
                    response.data.data.map(shelf => ({
                        _id: shelf._id,
                        name: shelf.name,
                    }))
                );
            }
        } catch (error) {
            console.error('Error fetching shelfs', error);
        }
    };
    const handleAddCell = async () => {
        if (
            !selectedWarehouse ||
            !selectedArea ||
            !selectedRack ||
            !selectedShelf ||
            !description
        ) {
            setError('Please select all fields and enter description');
            return;
        }
        try {
            await axios.post(`${getBaseUrl}/inventory/ware_house/cell`, {
                shelfId: selectedShelf,
                description,
            });
            fetchCells();
            setIsModalOpen(false);
            setSelectedWarehouse('');
            setSelectedArea('');
            setSelectedRack('');
            setSelectedShelf('');
            setDescription('');
            setError(null);
        } catch (error) {
            setError(error.message || 'Error adding cell');
        }
    };
    const handleDeleteCell = async id => {
        if (window.confirm('Are you sure you want to delete this cell?')) {
            try {
                await axios.delete(
                    `${getBaseUrl}/inventory/ware_house/cell/${id}`
                );
                fetchCells();
            } catch (error) {
                setError(error.message || 'Error deleting cell');
            }
        }
    };
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const response = await axios.put(
                `${getBaseUrl}/inventory/ware_house/cell/${id}/status`,
                {
                    status: newStatus,
                }
            );
            if (!response.data.error) {
                await fetchCells();
            } else {
                setError(response.data.message || 'Error updating status');
            }
        } catch (error) {
            setError(error.message || 'Error updating status');
        }
    };
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedWarehouse('');
        setSelectedArea('');
        setSelectedRack('');
        setSelectedShelf('');
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
                    children: 'Add Cell',
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
                                        children: 'Area',
                                    }),
                                    _jsx('th', {
                                        className: 'text-left px-4 py-2',
                                        children: 'Rack',
                                    }),
                                    _jsx('th', {
                                        className: 'text-left px-4 py-2',
                                        children: 'Shelf',
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
                            children: cells.map(cell =>
                                _jsxs(
                                    'tr',
                                    {
                                        className:
                                            'border-t hover:bg-gray-50 transition',
                                        children: [
                                            _jsx('td', {
                                                className: 'px-4 py-2',
                                                children: cell.name,
                                            }),
                                            _jsx('td', {
                                                className: 'px-4 py-2',
                                                children: cell.warehouse,
                                            }),
                                            _jsx('td', {
                                                className: 'px-4 py-2',
                                                children: cell.area,
                                            }),
                                            _jsx('td', {
                                                className: 'px-4 py-2',
                                                children: cell.rack,
                                            }),
                                            _jsx('td', {
                                                className: 'px-4 py-2',
                                                children: cell.shelf,
                                            }),
                                            _jsx('td', {
                                                className: 'px-4 py-2',
                                                children:
                                                    cell.status === 'Enable'
                                                        ? _jsx('span', {
                                                              className:
                                                                  'px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer',
                                                              children:
                                                                  'Enable',
                                                          })
                                                        : _jsx('span', {
                                                              className:
                                                                  'px-3 py-1 rounded bg-red-500 text-white border-none cursor-pointer',
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
                                                            handleDeleteCell(
                                                                cell._id
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
                                    cell._id
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
                                        children: 'Add Cell',
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
                                    _jsxs('select', {
                                        value: selectedArea,
                                        onChange: e =>
                                            setSelectedArea(e.target.value),
                                        className: 'border p-2 mb-2 w-full',
                                        disabled: !selectedWarehouse,
                                        children: [
                                            _jsx('option', {
                                                value: '',
                                                children: 'Select Area',
                                            }),
                                            areas.map(area =>
                                                _jsx(
                                                    'option',
                                                    {
                                                        value: area._id,
                                                        children: area.name,
                                                    },
                                                    area._id
                                                )
                                            ),
                                        ],
                                    }),
                                    _jsxs('select', {
                                        value: selectedRack,
                                        onChange: e =>
                                            setSelectedRack(e.target.value),
                                        className: 'border p-2 mb-2 w-full',
                                        disabled: !selectedArea,
                                        children: [
                                            _jsx('option', {
                                                value: '',
                                                children: 'Select Rack',
                                            }),
                                            racks.map(rack =>
                                                _jsx(
                                                    'option',
                                                    {
                                                        value: rack._id,
                                                        children: rack.name,
                                                    },
                                                    rack._id
                                                )
                                            ),
                                        ],
                                    }),
                                    _jsxs('select', {
                                        value: selectedShelf,
                                        onChange: e =>
                                            setSelectedShelf(e.target.value),
                                        className: 'border p-2 mb-2 w-full',
                                        disabled: !selectedRack,
                                        children: [
                                            _jsx('option', {
                                                value: '',
                                                children: 'Select Shelf',
                                            }),
                                            shelfs.map(shelf =>
                                                _jsx(
                                                    'option',
                                                    {
                                                        value: shelf._id,
                                                        children: shelf.name,
                                                    },
                                                    shelf._id
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
                                        onClick: handleAddCell,
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
export default Cell;
