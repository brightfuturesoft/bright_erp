import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getBaseUrl } from '@/helpers/config/envConfig';

interface Cell {
    _id: string;
    name: string;
    warehouse: string;
    area: string;
    rack: string;
    shelf: string;
    status: string;
}

interface Warehouse {
    _id: string;
    name: string;
}

interface Area {
    _id: string;
    name: string;
}

interface Rack {
    _id: string;
    name: string;
}

interface Shelf {
    _id: string;
    name: string;
}

const Cell: React.FC = () => {
    const [cells, setCells] = useState<Cell[]>([]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [racks, setRacks] = useState<Rack[]>([]);
    const [shelfs, setShelfs] = useState<Shelf[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');
    const [selectedArea, setSelectedArea] = useState<string>('');
    const [selectedRack, setSelectedRack] = useState<string>('');
    const [selectedShelf, setSelectedShelf] = useState<string>('');
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
        } catch (error: any) {
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
                    response.data.data.map((wh: any) => ({
                        _id: wh._id,
                        name: wh.name,
                    }))
                );
            }
        } catch (error: any) {
            console.error('Error fetching warehouses', error);
        }
    };

    const fetchAreas = async (warehouseId: string) => {
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/areas`,
                {
                    params: { warehouseId },
                }
            );
            if (response.data && Array.isArray(response.data.data)) {
                setAreas(
                    response.data.data.map((area: any) => ({
                        _id: area._id,
                        name: area.name,
                    }))
                );
            }
        } catch (error: any) {
            console.error('Error fetching areas', error);
        }
    };

    const fetchRacks = async (areaId: string) => {
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/racks`,
                {
                    params: { areaId },
                }
            );
            if (response.data && Array.isArray(response.data.data)) {
                setRacks(
                    response.data.data.map((rack: any) => ({
                        _id: rack._id,
                        name: rack.name,
                    }))
                );
            }
        } catch (error: any) {
            console.error('Error fetching racks', error);
        }
    };

    const fetchShelfs = async (rackId: string) => {
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/shelfs`,
                {
                    params: { rackId },
                }
            );
            if (response.data && Array.isArray(response.data.data)) {
                setShelfs(
                    response.data.data.map((shelf: any) => ({
                        _id: shelf._id,
                        name: shelf.name,
                    }))
                );
            }
        } catch (error: any) {
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
        } catch (error: any) {
            setError(error.message || 'Error adding cell');
        }
    };

    const handleDeleteCell = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this cell?')) {
            try {
                await axios.delete(
                    `${getBaseUrl}/inventory/ware_house/cell/${id}`
                );
                fetchCells();
            } catch (error: any) {
                setError(error.message || 'Error deleting cell');
            }
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
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
        } catch (error: any) {
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

    return (
        <div className="p-4 min-h-screen">
            <div className="flex gap-2 mb-4">
                <button
                    className="px-4 py-2 bg-gray-900 text-white rounded"
                    onClick={openModal}
                >
                    Add Cell
                </button>
            </div>

            {error && (
                <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
                    {error}
                </div>
            )}

            {loading && (
                <div className="mb-4 p-2 bg-blue-200 text-blue-800 rounded">
                    Loading...
                </div>
            )}

            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full text-sm">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="text-left px-4 py-2">Name</th>
                            <th className="text-left px-4 py-2">Warehouse</th>
                            <th className="text-left px-4 py-2">Area</th>
                            <th className="text-left px-4 py-2">Rack</th>
                            <th className="text-left px-4 py-2">Shelf</th>
                            <th className="text-left px-4 py-2">Status</th>
                            <th className="text-left px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cells.map(cell => (
                            <tr
                                key={cell._id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-2">{cell.name}</td>
                                <td className="px-4 py-2">{cell.warehouse}</td>
                                <td className="px-4 py-2">{cell.area}</td>
                                <td className="px-4 py-2">{cell.rack}</td>
                                <td className="px-4 py-2">{cell.shelf}</td>
                                <td className="px-4 py-2">
                                    {cell.status === 'Enable' ? (
                                        <span className="px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer">
                                            Enable
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 rounded bg-red-500 text-white border-none cursor-pointer">
                                            Disable
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button
                                        className="text-red-600"
                                        onClick={() =>
                                            handleDeleteCell(cell._id)
                                        }
                                    >
                                        🗑️
                                    </button>
                                    <button className="text-yellow-600">
                                        ✏️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded shadow-lg w-96 max-w-full">
                        <div className="p-4">
                            <h2 className="text-lg font-bold mb-4">Add Cell</h2>
                            <select
                                value={selectedWarehouse}
                                onChange={e =>
                                    setSelectedWarehouse(e.target.value)
                                }
                                className="border p-2 mb-2 w-full"
                            >
                                <option value="">Select Warehouse</option>
                                {warehouses.map(wh => (
                                    <option
                                        key={wh._id}
                                        value={wh._id}
                                    >
                                        {wh.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedArea}
                                onChange={e => setSelectedArea(e.target.value)}
                                className="border p-2 mb-2 w-full"
                                disabled={!selectedWarehouse}
                            >
                                <option value="">Select Area</option>
                                {areas.map(area => (
                                    <option
                                        key={area._id}
                                        value={area._id}
                                    >
                                        {area.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedRack}
                                onChange={e => setSelectedRack(e.target.value)}
                                className="border p-2 mb-2 w-full"
                                disabled={!selectedArea}
                            >
                                <option value="">Select Rack</option>
                                {racks.map(rack => (
                                    <option
                                        key={rack._id}
                                        value={rack._id}
                                    >
                                        {rack.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedShelf}
                                onChange={e => setSelectedShelf(e.target.value)}
                                className="border p-2 mb-2 w-full"
                                disabled={!selectedRack}
                            >
                                <option value="">Select Shelf</option>
                                {shelfs.map(shelf => (
                                    <option
                                        key={shelf._id}
                                        value={shelf._id}
                                    >
                                        {shelf.name}
                                    </option>
                                ))}
                            </select>
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="border p-2 mb-2 w-full"
                            />
                            <button
                                onClick={handleAddCell}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex justify-end p-4 border-t">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cell;
