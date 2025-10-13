import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { instance } from '@/helpers/axios/axiosInstance';

type Request = {
    _id: string;
    image: string;
    order: string;
    status: string;
    deliveryStatus: string;
    note: string;
    quantity: number;
    seller: string;
    requestTime: string;
};

export default function Stock_Request() {
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        } catch (err: any) {
            setError(err.message || 'Failed to fetch stock requests');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this request?')) {
            try {
                await instance.delete(
                    `${getBaseUrl}/inventory/stock_request/${id}`
                );
                setRequests(requests.filter(req => req._id !== id));
            } catch (err: any) {
                alert('Failed to delete request');
            }
        }
    };

    const handleApprove = async (id: string) => {
        try {
            await instance.put(`${getBaseUrl}/inventory/stock_request/${id}`, {
                status: 'approved',
            });
            setRequests(
                requests.map(req =>
                    req._id === id ? { ...req, status: 'approved' } : req
                )
            );
        } catch (err: any) {
            alert('Failed to approve request');
        }
    };

    const handleReject = async (id: string) => {
        try {
            await instance.put(`${getBaseUrl}/inventory/stock_request/${id}`, {
                status: 'rejected',
            });
            setRequests(
                requests.map(req =>
                    req._id === id ? { ...req, status: 'rejected' } : req
                )
            );
        } catch (err: any) {
            alert('Failed to reject request');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6 space-y-4">
            {/* Filters */}
            <div className="flex items-center space-x-2">
                <select className="border rounded-md p-2">
                    <option>All</option>
                </select>
                <select className="border rounded-md p-2">
                    <option>Delivery Status</option>
                </select>
                <select className="border rounded-md p-2">
                    <option>All</option>
                </select>
                <div className="ml-auto flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search for..."
                        className="border rounded-md p-2 w-48"
                    />
                    <button className="p-2 border rounded-md">
                        <Search className="w-4 h-4" />
                    </button>
                    <select className="border rounded-md p-2">
                        <option>10</option>
                        <option>20</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-2xl overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-2 text-left">
                                <input type="checkbox" />
                            </th>
                            <th className="p-2 text-left">Image</th>
                            <th className="p-2 text-left">Order</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">Delivery Status</th>
                            <th className="p-2 text-left">Note</th>
                            <th className="p-2 text-left">Quantity</th>
                            <th className="p-2 text-left">Seller</th>
                            <th className="p-2 text-left">Request Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {requests.map(req => (
                            <tr key={req._id}>
                                <td className="p-2">
                                    <input type="checkbox" />
                                </td>
                                <td className="p-2">
                                    <img
                                        src={req.image}
                                        alt="product"
                                        className="w-12 h-12 rounded"
                                    />
                                </td>
                                <td className="p-2 whitespace-pre-line">
                                    {req.order}
                                </td>
                                <td className="p-2 space-x-2">
                                    <button
                                        onClick={() => handleDelete(req._id)}
                                        className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-xs"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleApprove(req._id)}
                                        className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-xs"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(req._id)}
                                        className="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-xs"
                                    >
                                        Reject
                                    </button>
                                </td>
                                <td className="p-2">
                                    {req.deliveryStatus ? (
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                                            {req.deliveryStatus}
                                        </span>
                                    ) : (
                                        <button className="p-1 border rounded">
                                            ✏️
                                        </button>
                                    )}
                                </td>
                                <td className="p-2 flex items-center space-x-1">
                                    <span>{req.note}</span>
                                    <button className="p-1 border rounded">
                                        ✏️
                                    </button>
                                </td>
                                <td className="p-2 flex items-center space-x-1">
                                    <span className="text-blue-600 font-semibold">
                                        {req.quantity}
                                    </span>
                                    <button className="p-1 border rounded">
                                        ✏️
                                    </button>
                                </td>
                                <td className="p-2">{req.seller}</td>
                                <td className="p-2">{req.requestTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
