import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getBaseUrl } from '@/helpers/config/envConfig';

interface Area {
    _id: string;
    name: string;
    warehouse: string;
    status: string;
}

interface Warehouse {
    _id: string;
    name: string;
}

const Area: React.FC = () => {
    const [areas, setAreas] = useState<Area[]>([]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchAreas();
        fetchWarehouses();
    }, []);

    const fetchAreas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/areas`
            );
            if (response.data && Array.isArray(response.data.data)) {
                setAreas(response.data.data);
            } else {
                setError('Invalid data format from server');
            }
        } catch (error: any) {
            setError(error.message || 'Error fetching areas');
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

    const handleAddArea = async () => {
        if (!selectedWarehouse || !description) {
            setError('Please select warehouse and enter description');
            return;
        }
        try {
            await axios.post(`${getBaseUrl}/inventory/ware_house/area`, {
                warehouseId: selectedWarehouse,
                description,
            });
            fetchAreas();
            setIsModalOpen(false);
            setSelectedWarehouse('');
            setDescription('');
        } catch (error: any) {
            setError(error.message || 'Error adding area');
        }
    };

    const handleDeleteArea = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this area?')) {
            try {
                await axios.delete(
                    `${getBaseUrl}/inventory/ware_house/area/${id}`
                );
                fetchAreas();
            } catch (error: any) {
                setError(error.message || 'Error deleting area');
            }
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            console.log(`Updating status for area ${id} to ${newStatus}`);
            // Use dedicated status update endpoint
            const response = await axios.put(
                `${getBaseUrl}/inventory/ware_house/area/${id}/status`,
                {
                    status: newStatus,
                }
            );
            console.log('Status update response:', response.data);
            if (!response.data.error) {
                await fetchAreas();
            } else {
                setError(response.data.message || 'Error updating status');
            }
        } catch (error: any) {
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

    return (
        <div className="p-4 min-h-screen">
            {/* Top buttons */}
            <div className="flex gap-2 mb-4">
                <button
                    className="px-4 py-2 bg-gray-900 text-white rounded"
                    onClick={openModal}
                >
                    Add Area
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="mb-4 p-2 bg-blue-200 text-blue-800 rounded">
                    Loading...
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full text-sm">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="text-left px-4 py-2">Name</th>
                            <th className="text-left px-4 py-2">Warehouse</th>
                            <th className="text-left px-4 py-2">Status</th>
                            <th className="text-left px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {areas.map(area => (
                            <tr
                                key={area._id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-2">{area.name}</td>
                                <td className="px-4 py-2">{area.warehouse}</td>
                                <td className="px-4 py-2">
                                    {area.status === 'Enable' ? (
                                        <span className="px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer">
                                            Enable
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer">
                                            Disable
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button
                                        className="text-red-600"
                                        onClick={() =>
                                            handleDeleteArea(area._id)
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded shadow-lg w-96 max-w-full">
                        <div className="p-4">
                            <h2 className="text-lg font-bold mb-4">Add Area</h2>
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
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="border p-2 mb-2 w-full"
                            />
                            <button
                                onClick={handleAddArea}
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

export default Area;
