import { getBaseUrl } from '@/helpers/config/envConfig';
import React, { useEffect, useState, useContext } from 'react';
import { Erp_context } from '@/provider/ErpContext';

type User = {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role?: {
        _id: string;
        display_name: string;
        permissions: string[];
    };
};

const API_BASE = `${getBaseUrl}/settings/user-role/users-with-roles`;

const UserPage: React.FC = () => {
    const { user, workspace, user_loading } = useContext(Erp_context)!;
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showCreate, setShowCreate] = useState(false);

    // Get workspace_id dynamically
    const workspace_id = workspace?._id;

    // Fetch users for the specific workspace with roles
    const fetchUsers = async () => {
        if (!workspace_id) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}?workspace_id=${workspace_id}`);
            const data = await res.json();
            if (data.success) setUsers(data.data || []);
            else setError(data.message || 'Failed to load users');
        } catch (e: any) {
            setError(e?.message || 'Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user_loading && workspace_id) {
            fetchUsers();
        }
    }, [user_loading, workspace_id]);

    const onCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!workspace_id) {
            setError('No workspace selected');
            return;
        }
        setError(null);
        try {
            const res = await fetch(`${getBaseUrl}/settings/user-role/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    password,
                    workspace_id,
                    created_by: user?._id,
                }),
            });
            const data = await res.json();
            if (!data.success)
                throw new Error(data.message || 'Failed to create');
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setShowCreate(false);
            // Add new user to users list immediately
            setUsers(prev => [...prev, { ...data.data, role: undefined }]);
            // Optionally refresh users list after some delay to get updated roles
            setTimeout(() => {
                fetchUsers();
            }, 3000);
        } catch (e: any) {
            setError(e?.message || 'Failed to create');
        }
    };

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Users</h2>
                <button
                    onClick={() => setShowCreate(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add User
                </button>
            </div>
            {error && <div className="text-red-600">{error}</div>}
            <div>
                {loading ? (
                    'Loading...'
                ) : (
                    <table className="min-w-full divide-y divide-gray-200 border rounded">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Permissions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(u => (
                                <tr
                                    key={u._id}
                                    className="hover:bg-gray-100"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {u.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {u.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {u.phone || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {u.role?.display_name ||
                                            'No role assigned'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {u.role?.permissions?.length
                                            ? u.role.permissions.join(', ')
                                            : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showCreate && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded shadow max-w-md w-full">
                        <div className="p-4 border-b flex items-center justify-between">
                            <h3 className="font-medium">Add User</h3>
                            <button
                                onClick={() => setShowCreate(false)}
                                className="text-gray-500"
                            >
                                ✕
                            </button>
                        </div>
                        <form
                            onSubmit={onCreate}
                            className="p-4 grid gap-3"
                        >
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Name"
                                className="border p-2 rounded"
                                required
                            />
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                                type="email"
                                className="border p-2 rounded"
                                required
                            />
                            <input
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                placeholder="Phone"
                                className="border p-2 rounded"
                            />
                            <input
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                type="password"
                                className="border p-2 rounded"
                                required
                            />
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCreate(false)}
                                    className="px-4 py-2 rounded border"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPage;
