import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, AlertCircle, ArrowDown, Equal } from 'lucide-react';
import axios from 'axios';

const Stock_Check: React.FC = () => {
    const [summary, setSummary] = useState<any>(null);
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

    return (
        <div className="p-6 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-green-100">
                    <CardContent className="p-4">
                        <h2 className="text-lg font-semibold">GoodStock</h2>
                        <p>Variations: {summary?.GoodStock?.variations || 0}</p>
                        <p>Total QTY: {summary?.GoodStock?.totalQTY || 0}</p>
                        <p>Value: TK.{summary?.GoodStock?.value || 0}</p>
                    </CardContent>
                </Card>

                <Card className="bg-blue-100">
                    <CardContent className="p-4">
                        <h2 className="text-lg font-semibold">AverageStock</h2>
                        <p>
                            Variations: {summary?.AverageStock?.variations || 0}
                        </p>
                        <p>Total QTY: {summary?.AverageStock?.totalQTY || 0}</p>
                        <p>Value: TK.{summary?.AverageStock?.value || 0}</p>
                    </CardContent>
                </Card>

                <Card className="bg-yellow-100">
                    <CardContent className="p-4">
                        <h2 className="text-lg font-semibold">LowestStock</h2>
                        <p>
                            Variations: {summary?.LowestStock?.variations || 0}
                        </p>
                        <p>Total QTY: {summary?.LowestStock?.totalQTY || 0}</p>
                        <p>Value: TK.{summary?.LowestStock?.value || 0}</p>
                    </CardContent>
                </Card>

                <Card className="bg-red-100">
                    <CardContent className="p-4">
                        <h2 className="text-lg font-semibold">StockOut</h2>
                        <p>Variations: {summary?.StockOut?.variations || 0}</p>
                        <p>Total QTY: {summary?.StockOut?.totalQTY || 0}</p>
                        <p>Value: TK.{summary?.StockOut?.value || 0}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
                <select
                    value={statusFilter}
                    onChange={handleStatusChange}
                    className="border rounded p-2"
                >
                    <option value="">Filter by Status</option>
                    <option value="GoodStock">GoodStock</option>
                    <option value="AverageStock">AverageStock</option>
                    <option value="LowestStock">LowestStock</option>
                    <option value="StockOut">StockOut</option>
                </select>
                <Input
                    placeholder="Search for..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-48"
                />
            </div>

            {/* Stock Items Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="border-b bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Product</th>
                            <th className="p-2 text-left">Seller</th>
                            <th className="p-2 text-left">Shop</th>
                            <th className="p-2 text-left">Stock Quantity</th>
                            <th className="p-2 text-left">Price</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">Warehouse</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredItems.map((item, idx) => (
                            <tr key={idx}>
                                <td className="p-2 flex items-center space-x-2">
                                    <img
                                        src={item.image}
                                        alt={item.product}
                                        className="w-12 h-12 rounded"
                                    />
                                    <span>{item.product}</span>
                                </td>
                                <td className="p-2">{item.seller}</td>
                                <td className="p-2">{item.shop}</td>
                                <td className="p-2">{item.quantity}</td>
                                <td className="p-2">{item.price}</td>
                                <td className="p-2">{item.status}</td>
                                <td className="p-2">{item.warehouse}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Stock_Check;
