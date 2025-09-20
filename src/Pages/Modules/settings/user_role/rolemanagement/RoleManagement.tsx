import React, { useState, useEffect, useContext } from 'react';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { Erp_context } from '@/provider/ErpContext';

interface Permission {
    name: string;
    routes: string[];
}

interface Permissions {
    [key: string]: Permission;
}

interface Role {
    _id: string;
    name: string;
    display_name: string;
    description: string;
    permissions: string[];
    status: 'active' | 'inactive';
    created_by: string;
    created_at: string;
    updated_at: string;
    creator: {
        name: string;
        email: string;
    };
}

interface User {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    status: string;
    role?: {
        _id: string;
        display_name: string;
        name: string;
        status: string;
    };
    role_assigned_at?: string;
    created_at: string;
}

const RoleManagement: React.FC = () => {
    const context = useContext(Erp_context);
    const currentUser = context?.user;
    const workspace: any = context?.workspace;

    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem('theme') === 'dark'
    );

    const [activeTab, setActiveTab] = useState<
        'roles' | 'users' | 'permissions'
    >('roles');
    const [roles, setRoles] = useState<Role[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [permissions, setPermissions] = useState<Permissions>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    // Modal states
    const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
    const [showEditRoleModal, setShowEditRoleModal] = useState(false);
    const [showAssignRoleModal, setShowAssignRoleModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Form states
    const [roleForm, setRoleForm] = useState({
        name: '',
        description: '',
        permissions: [] as string[],
    });

    // Search and filter states
    const [roleSearch, setRoleSearch] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<
        'all' | 'active' | 'inactive'
    >('all');

    // Theme detection
    useEffect(() => {
        const handleThemeChange = () => {
            setIsDarkMode(localStorage.getItem('theme') === 'dark');
        };

        window.addEventListener('storage', handleThemeChange);

        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => {
            window.removeEventListener('storage', handleThemeChange);
            observer.disconnect();
        };
    }, []);

    // Fetch data on component mount
    useEffect(() => {
        fetchPermissions();
        fetchRoles();
        fetchUsers();
    }, []);

    const fetchPermissions = async () => {
        try {
            const response = await fetch(
                `${getBaseUrl}/settings/user-role/permissions`,
                {
                    credentials: 'include',
                }
            );
            const data = await response.json();

            if (data.success) {
                setPermissions(data.data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to fetch permissions');
        }
    };

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams();
            if (roleSearch) queryParams.append('search', roleSearch);
            if (statusFilter !== 'all')
                queryParams.append('status', statusFilter);

            if (workspace?._id)
                queryParams.append('workspace_id', workspace._id);
            const response = await fetch(
                `${getBaseUrl}/settings/user-role/roles?${queryParams}`,
                {
                    credentials: 'include',
                }
            );
            const data = await response.json();

            if (data.success) {
                setRoles(data.data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to fetch roles');
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const queryParams = new URLSearchParams();
            if (userSearch) queryParams.append('search', userSearch);

            if (workspace?._id)
                queryParams.append('workspace_id', workspace._id);
            const response = await fetch(
                `${getBaseUrl}/settings/user-role/users-with-roles?${queryParams}`,
                {
                    credentials: 'include',
                }
            );
            const data = await response.json();

            if (data.success) {
                setUsers(data.data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to fetch users');
        }
    };

    const handleCreateRole = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!roleForm.name.trim()) {
            setError('Role name is required');
            return;
        }

        if (roleForm.permissions.length === 0) {
            setError('At least one permission must be selected');
            return;
        }

        if (!currentUser?._id) {
            setError('Current user is not available. Please sign in again.');
            return;
        }

        if (!workspace?._id) {
            setError('Workspace is not available. Please refresh the page.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(
                `${getBaseUrl}/settings/user-role/roles`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        ...roleForm,
                        created_by: currentUser._id,
                        workspace_id: workspace._id,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setSuccess('Role created successfully');
                setShowCreateRoleModal(false);
                setRoleForm({ name: '', description: '', permissions: [] });
                fetchRoles();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to create role');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateRole = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedRole) return;
        if (!currentUser?._id) {
            setError('Current user is not available. Please sign in again.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(
                `${getBaseUrl}/settings/user-role/roles/${selectedRole._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        ...roleForm,
                        updated_by: currentUser._id,
                        workspace_id: workspace?._id,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setSuccess('Role updated successfully');
                setShowEditRoleModal(false);
                setSelectedRole(null);
                setRoleForm({ name: '', description: '', permissions: [] });
                fetchRoles();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to update role');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRole = async (roleId: string) => {
        if (!confirm('Are you sure you want to delete this role?')) return;

        try {
            setLoading(true);
            const response = await fetch(
                `${getBaseUrl}/settings/user-role/roles/${roleId}?${new URLSearchParams(workspace?._id ? { workspace_id: workspace._id } : {})}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );

            const data = await response.json();

            if (data.success) {
                setSuccess('Role deleted successfully');
                fetchRoles();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to delete role');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleRoleStatus = async (roleId: string) => {
        if (!currentUser?._id) {
            setError('Current user is not available. Please sign in again.');
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(
                `${getBaseUrl}/settings/user-role/roles/${roleId}/toggle-status`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        updated_by: currentUser._id,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message);
                fetchRoles();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to toggle role status');
        } finally {
            setLoading(false);
        }
    };

    const handleAssignRole = async (userId: string, roleId: string) => {
        if (!currentUser?._id) {
            setError('Current user is not available. Please sign in again.');
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(
                `${getBaseUrl}/settings/user-role/users/${userId}/assign-role`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        role_id: roleId,
                        assigned_by: currentUser._id,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setSuccess('Role assigned successfully');
                setShowAssignRoleModal(false);
                setSelectedUser(null);
                fetchUsers();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to assign role');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveRole = async (userId: string) => {
        if (
            !confirm('Are you sure you want to remove this role from the user?')
        )
            return;
        if (!currentUser?._id) {
            setError('Current user is not available. Please sign in again.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(
                `${getBaseUrl}/settings/user-role/users/${userId}/remove-role`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        removed_by: currentUser._id,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setSuccess('Role removed successfully');
                fetchUsers();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to remove role');
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (role: Role) => {
        setSelectedRole(role);
        setRoleForm({
            name: role.display_name,
            description: role.description,
            permissions: role.permissions,
        });
        setShowEditRoleModal(true);
    };

    const openAssignModal = (user: User) => {
        setSelectedUser(user);
        setShowAssignRoleModal(true);
    };

    const handlePermissionToggle = (permissionKey: string) => {
        setRoleForm(prev => ({
            ...prev,
            permissions: prev.permissions.includes(permissionKey)
                ? prev.permissions.filter(p => p !== permissionKey)
                : [...prev.permissions, permissionKey],
        }));
    };

    // Clear messages after 5 seconds
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    return (
        <div
            className={`min-h-screen p-6 ${
                isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1
                        className={`text-3xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                    >
                        Role & Permission Management
                    </h1>
                    <p
                        className={`mt-2 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                    >
                        Manage user roles and permissions for your application
                    </p>
                </div>

                {/* Status Messages */}
                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-500 dark:text-red-300">
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {error}
                        </div>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-500 dark:text-green-300">
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {success}
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="mb-6">
                    <div
                        className={`border-b ${
                            isDarkMode ? 'border-gray-700' : 'border-gray-200'
                        }`}
                    >
                        <nav className="-mb-px flex space-x-8">
                            {[
                                { key: 'roles', label: 'Roles', icon: '👥' },
                                { key: 'users', label: 'Users', icon: '👤' },
                                {
                                    key: 'permissions',
                                    label: 'Permissions',
                                    icon: '🔐',
                                },
                            ].map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key as any)}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                                        activeTab === tab.key
                                            ? isDarkMode
                                                ? 'border-blue-500 text-blue-400'
                                                : 'border-blue-500 text-blue-600'
                                            : isDarkMode
                                              ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <span>{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'roles' && (
                    <div>
                        {/* Roles Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    placeholder="Search roles..."
                                    value={roleSearch}
                                    onChange={e =>
                                        setRoleSearch(e.target.value)
                                    }
                                    className={`px-4 py-2 rounded-lg border ${
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                <select
                                    value={statusFilter}
                                    onChange={e =>
                                        setStatusFilter(e.target.value as any)
                                    }
                                    className={`px-4 py-2 rounded-lg border ${
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-600 text-gray-200'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                <button
                                    onClick={fetchRoles}
                                    className={`px-4 py-2 rounded-lg border ${
                                        isDarkMode
                                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    🔄 Refresh
                                </button>
                            </div>
                            <button
                                onClick={() => setShowCreateRoleModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                            >
                                <span>➕</span>
                                <span>Create Role</span>
                            </button>
                        </div>

                        {/* Roles Table */}
                        <div
                            className={`rounded-lg border ${
                                isDarkMode
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-white border-gray-200'
                            } overflow-hidden`}
                        >
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead
                                        className={
                                            isDarkMode
                                                ? 'bg-gray-700'
                                                : 'bg-gray-50'
                                        }
                                    >
                                        <tr>
                                            <th
                                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                    isDarkMode
                                                        ? 'text-gray-300'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                Role
                                            </th>
                                            <th
                                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                    isDarkMode
                                                        ? 'text-gray-300'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                Permissions
                                            </th>
                                            <th
                                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                    isDarkMode
                                                        ? 'text-gray-300'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                Status
                                            </th>
                                            <th
                                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                    isDarkMode
                                                        ? 'text-gray-300'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                Created By
                                            </th>
                                            <th
                                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                    isDarkMode
                                                        ? 'text-gray-300'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        className={`divide-y ${
                                            isDarkMode
                                                ? 'divide-gray-700'
                                                : 'divide-gray-200'
                                        }`}
                                    >
                                        {roles.map(role => (
                                            <tr
                                                key={role._id}
                                                className={
                                                    isDarkMode
                                                        ? 'hover:bg-gray-700'
                                                        : 'hover:bg-gray-50'
                                                }
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div
                                                            className={`text-sm font-medium ${
                                                                isDarkMode
                                                                    ? 'text-gray-200'
                                                                    : 'text-gray-900'
                                                            }`}
                                                        >
                                                            {role.display_name}
                                                        </div>
                                                        <div
                                                            className={`text-sm ${
                                                                isDarkMode
                                                                    ? 'text-gray-400'
                                                                    : 'text-gray-500'
                                                            }`}
                                                        >
                                                            {role.description ||
                                                                'No description'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {role.permissions
                                                            .slice(0, 3)
                                                            .map(permission => (
                                                                <span
                                                                    key={
                                                                        permission
                                                                    }
                                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                        isDarkMode
                                                                            ? 'bg-blue-900 text-blue-300'
                                                                            : 'bg-blue-100 text-blue-800'
                                                                    }`}
                                                                >
                                                                    {permissions[
                                                                        permission
                                                                    ]?.name ||
                                                                        permission}
                                                                </span>
                                                            ))}
                                                        {role.permissions
                                                            .length > 3 && (
                                                            <span
                                                                className={`text-xs ${
                                                                    isDarkMode
                                                                        ? 'text-gray-400'
                                                                        : 'text-gray-500'
                                                                }`}
                                                            >
                                                                +
                                                                {role
                                                                    .permissions
                                                                    .length -
                                                                    3}{' '}
                                                                more
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            role.status ===
                                                            'active'
                                                                ? isDarkMode
                                                                    ? 'bg-green-900 text-green-300'
                                                                    : 'bg-green-100 text-green-800'
                                                                : isDarkMode
                                                                  ? 'bg-red-900 text-red-300'
                                                                  : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        {role.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div
                                                        className={`text-sm ${
                                                            isDarkMode
                                                                ? 'text-gray-300'
                                                                : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {role.creator.name}
                                                    </div>
                                                    <div
                                                        className={`text-sm ${
                                                            isDarkMode
                                                                ? 'text-gray-400'
                                                                : 'text-gray-500'
                                                        }`}
                                                    >
                                                        {new Date(
                                                            role.created_at
                                                        ).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() =>
                                                                openEditModal(
                                                                    role
                                                                )
                                                            }
                                                            className={`text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300`}
                                                        >
                                                            ✏️
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleToggleRoleStatus(
                                                                    role._id
                                                                )
                                                            }
                                                            className={`${
                                                                role.status ===
                                                                'active'
                                                                    ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
                                                                    : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                                                            }`}
                                                        >
                                                            {role.status ===
                                                            'active'
                                                                ? '❌'
                                                                : '✅'}
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteRole(
                                                                    role._id
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div>
                        {/* Users Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={userSearch}
                                    onChange={e =>
                                        setUserSearch(e.target.value)
                                    }
                                    className={`px-4 py-2 rounded-lg border ${
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                <button
                                    onClick={fetchUsers}
                                    className={`px-4 py-2 rounded-lg border ${
                                        isDarkMode
                                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    🔄 Refresh
                                </button>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div
                            className={`rounded-lg border ${
                                isDarkMode
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-white border-gray-200'
                            } overflow-hidden`}
                        >
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead
                                        className={
                                            isDarkMode
                                                ? 'bg-gray-700'
                                                : 'bg-gray-50'
                                        }
                                    >
                                        <tr>
                                            <th
                                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                    isDarkMode
                                                        ? 'text-gray-300'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                User
                                            </th>
                                            <th
                                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                    isDarkMode
                                                        ? 'text-gray-300'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                Role
                                            </th>
                                            <th
                                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                    isDarkMode
                                                        ? 'text-gray-300'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                Assigned Date
                                            </th>
                                            <th
                                                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                    isDarkMode
                                                        ? 'text-gray-300'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        className={`divide-y ${
                                            isDarkMode
                                                ? 'divide-gray-700'
                                                : 'divide-gray-200'
                                        }`}
                                    >
                                        {users.map(user => (
                                            <tr
                                                key={user._id}
                                                className={
                                                    isDarkMode
                                                        ? 'hover:bg-gray-700'
                                                        : 'hover:bg-gray-50'
                                                }
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div
                                                            className={`text-sm font-medium ${
                                                                isDarkMode
                                                                    ? 'text-gray-200'
                                                                    : 'text-gray-900'
                                                            }`}
                                                        >
                                                            {user.name}
                                                        </div>
                                                        <div
                                                            className={`text-sm ${
                                                                isDarkMode
                                                                    ? 'text-gray-400'
                                                                    : 'text-gray-500'
                                                            }`}
                                                        >
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.role ? (
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                user.role
                                                                    .status ===
                                                                'active'
                                                                    ? isDarkMode
                                                                        ? 'bg-green-900 text-green-300'
                                                                        : 'bg-green-100 text-green-800'
                                                                    : isDarkMode
                                                                      ? 'bg-red-900 text-red-300'
                                                                      : 'bg-red-100 text-red-800'
                                                            }`}
                                                        >
                                                            {
                                                                user.role
                                                                    .display_name
                                                            }
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className={`text-sm ${
                                                                isDarkMode
                                                                    ? 'text-gray-400'
                                                                    : 'text-gray-500'
                                                            }`}
                                                        >
                                                            No role assigned
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div
                                                        className={`text-sm ${
                                                            isDarkMode
                                                                ? 'text-gray-300'
                                                                : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {user.role_assigned_at
                                                            ? new Date(
                                                                  user.role_assigned_at
                                                              ).toLocaleDateString()
                                                            : '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() =>
                                                                openAssignModal(
                                                                    user
                                                                )
                                                            }
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            {user.role
                                                                ? '🔄'
                                                                : '➕'}
                                                        </button>
                                                        {user.role && (
                                                            <button
                                                                onClick={() =>
                                                                    handleRemoveRole(
                                                                        user._id
                                                                    )
                                                                }
                                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                            >
                                                                🗑️
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'permissions' && (
                    <div>
                        <div
                            className={`rounded-lg border ${
                                isDarkMode
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-white border-gray-200'
                            } p-6`}
                        >
                            <h3
                                className={`text-lg font-medium mb-4 ${
                                    isDarkMode
                                        ? 'text-gray-200'
                                        : 'text-gray-900'
                                }`}
                            >
                                Available Permissions
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Object.entries(permissions).map(
                                    ([key, permission]) => (
                                        <div
                                            key={key}
                                            className={`p-4 rounded-lg border ${
                                                isDarkMode
                                                    ? 'border-gray-600 bg-gray-700'
                                                    : 'border-gray-200 bg-gray-50'
                                            }`}
                                        >
                                            <h4
                                                className={`font-medium mb-2 ${
                                                    isDarkMode
                                                        ? 'text-gray-200'
                                                        : 'text-gray-900'
                                                }`}
                                            >
                                                {permission.name}
                                            </h4>
                                            <div className="space-y-1">
                                                {permission.routes
                                                    .slice(0, 5)
                                                    .map(route => (
                                                        <div
                                                            key={route}
                                                            className={`text-xs px-2 py-1 rounded ${
                                                                isDarkMode
                                                                    ? 'bg-gray-600 text-gray-300'
                                                                    : 'bg-gray-200 text-gray-600'
                                                            }`}
                                                        >
                                                            /{route}
                                                        </div>
                                                    ))}
                                                {permission.routes.length >
                                                    5 && (
                                                    <div
                                                        className={`text-xs ${
                                                            isDarkMode
                                                                ? 'text-gray-400'
                                                                : 'text-gray-500'
                                                        }`}
                                                    >
                                                        +
                                                        {permission.routes
                                                            .length - 5}{' '}
                                                        more routes
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Role Modal */}
            {showCreateRoleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div
                        className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                        }`}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3
                                    className={`text-lg font-medium ${
                                        isDarkMode
                                            ? 'text-gray-200'
                                            : 'text-gray-900'
                                    }`}
                                >
                                    Create New Role
                                </h3>
                                <button
                                    onClick={() =>
                                        setShowCreateRoleModal(false)
                                    }
                                    className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}
                                >
                                    ✕
                                </button>
                            </div>

                            <form
                                onSubmit={handleCreateRole}
                                className="space-y-4"
                            >
                                <div>
                                    <label
                                        className={`block text-sm font-medium mb-2 ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        Role Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={roleForm.name}
                                        onChange={e =>
                                            setRoleForm(prev => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter role name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        className={`block text-sm font-medium mb-2 ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        value={roleForm.description}
                                        onChange={e =>
                                            setRoleForm(prev => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        rows={3}
                                        placeholder="Enter role description"
                                    />
                                </div>

                                <div>
                                    <label
                                        className={`block text-sm font-medium mb-2 ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        Permissions *
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                                        {Object.entries(permissions).map(
                                            ([key, permission]) => (
                                                <label
                                                    key={key}
                                                    className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                                                        roleForm.permissions.includes(
                                                            key
                                                        )
                                                            ? isDarkMode
                                                                ? 'border-blue-500 bg-blue-900/20'
                                                                : 'border-blue-500 bg-blue-50'
                                                            : isDarkMode
                                                              ? 'border-gray-600 hover:border-gray-500'
                                                              : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={roleForm.permissions.includes(
                                                            key
                                                        )}
                                                        onChange={() =>
                                                            handlePermissionToggle(
                                                                key
                                                            )
                                                        }
                                                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <div>
                                                        <div
                                                            className={`font-medium ${
                                                                isDarkMode
                                                                    ? 'text-gray-200'
                                                                    : 'text-gray-900'
                                                            }`}
                                                        >
                                                            {permission.name}
                                                        </div>
                                                        <div
                                                            className={`text-xs ${
                                                                isDarkMode
                                                                    ? 'text-gray-400'
                                                                    : 'text-gray-500'
                                                            }`}
                                                        >
                                                            {
                                                                permission
                                                                    .routes
                                                                    .length
                                                            }{' '}
                                                            routes
                                                        </div>
                                                    </div>
                                                </label>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCreateRoleModal(false)
                                        }
                                        className={`px-4 py-2 rounded-lg border ${
                                            isDarkMode
                                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {loading
                                            ? 'Creating...'
                                            : 'Create Role'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Role Modal */}
            {showEditRoleModal && selectedRole && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div
                        className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                        }`}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3
                                    className={`text-lg font-medium ${
                                        isDarkMode
                                            ? 'text-gray-200'
                                            : 'text-gray-900'
                                    }`}
                                >
                                    Edit Role: {selectedRole.display_name}
                                </h3>
                                <button
                                    onClick={() => setShowEditRoleModal(false)}
                                    className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}
                                >
                                    ✕
                                </button>
                            </div>

                            <form
                                onSubmit={handleUpdateRole}
                                className="space-y-4"
                            >
                                <div>
                                    <label
                                        className={`block text-sm font-medium mb-2 ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        Role Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={roleForm.name}
                                        onChange={e =>
                                            setRoleForm(prev => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter role name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        className={`block text-sm font-medium mb-2 ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        value={roleForm.description}
                                        onChange={e =>
                                            setRoleForm(prev => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        rows={3}
                                        placeholder="Enter role description"
                                    />
                                </div>

                                <div>
                                    <label
                                        className={`block text-sm font-medium mb-2 ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        Permissions *
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                                        {Object.entries(permissions).map(
                                            ([key, permission]) => (
                                                <label
                                                    key={key}
                                                    className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                                                        roleForm.permissions.includes(
                                                            key
                                                        )
                                                            ? isDarkMode
                                                                ? 'border-blue-500 bg-blue-900/20'
                                                                : 'border-blue-500 bg-blue-50'
                                                            : isDarkMode
                                                              ? 'border-gray-600 hover:border-gray-500'
                                                              : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={roleForm.permissions.includes(
                                                            key
                                                        )}
                                                        onChange={() =>
                                                            handlePermissionToggle(
                                                                key
                                                            )
                                                        }
                                                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <div>
                                                        <div
                                                            className={`font-medium ${
                                                                isDarkMode
                                                                    ? 'text-gray-200'
                                                                    : 'text-gray-900'
                                                            }`}
                                                        >
                                                            {permission.name}
                                                        </div>
                                                        <div
                                                            className={`text-xs ${
                                                                isDarkMode
                                                                    ? 'text-gray-400'
                                                                    : 'text-gray-500'
                                                            }`}
                                                        >
                                                            {
                                                                permission
                                                                    .routes
                                                                    .length
                                                            }{' '}
                                                            routes
                                                        </div>
                                                    </div>
                                                </label>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowEditRoleModal(false)
                                        }
                                        className={`px-4 py-2 rounded-lg border ${
                                            isDarkMode
                                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {loading
                                            ? 'Updating...'
                                            : 'Update Role'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Role Modal */}
            {showAssignRoleModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div
                        className={`max-w-md w-full rounded-lg ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                        }`}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3
                                    className={`text-lg font-medium ${
                                        isDarkMode
                                            ? 'text-gray-200'
                                            : 'text-gray-900'
                                    }`}
                                >
                                    {selectedUser.role
                                        ? 'Change Role'
                                        : 'Assign Role'}
                                </h3>
                                <button
                                    onClick={() =>
                                        setShowAssignRoleModal(false)
                                    }
                                    className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="mb-4">
                                <p
                                    className={`text-sm ${
                                        isDarkMode
                                            ? 'text-gray-300'
                                            : 'text-gray-600'
                                    }`}
                                >
                                    User:{' '}
                                    <span className="font-medium">
                                        {selectedUser.name}
                                    </span>
                                </p>
                                <p
                                    className={`text-sm ${
                                        isDarkMode
                                            ? 'text-gray-300'
                                            : 'text-gray-600'
                                    }`}
                                >
                                    Email:{' '}
                                    <span className="font-medium">
                                        {selectedUser.email}
                                    </span>
                                </p>
                                {selectedUser.role && (
                                    <p
                                        className={`text-sm ${
                                            isDarkMode
                                                ? 'text-gray-300'
                                                : 'text-gray-600'
                                        }`}
                                    >
                                        Current Role:{' '}
                                        <span className="font-medium">
                                            {selectedUser.role.display_name}
                                        </span>
                                    </p>
                                )}
                            </div>

                            <div className="space-y-3">
                                <label
                                    className={`block text-sm font-medium ${
                                        isDarkMode
                                            ? 'text-gray-200'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    Select Role:
                                </label>
                                {roles
                                    .filter(role => role.status === 'active')
                                    .map(role => (
                                        <button
                                            key={role._id}
                                            onClick={() =>
                                                handleAssignRole(
                                                    selectedUser._id,
                                                    role._id
                                                )
                                            }
                                            className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                                selectedUser.role?._id ===
                                                role._id
                                                    ? isDarkMode
                                                        ? 'border-blue-500 bg-blue-900/20'
                                                        : 'border-blue-500 bg-blue-50'
                                                    : isDarkMode
                                                      ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                                                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div
                                                className={`font-medium ${
                                                    isDarkMode
                                                        ? 'text-gray-200'
                                                        : 'text-gray-900'
                                                }`}
                                            >
                                                {role.display_name}
                                            </div>
                                            <div
                                                className={`text-sm ${
                                                    isDarkMode
                                                        ? 'text-gray-400'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                {role.description ||
                                                    'No description'}
                                            </div>
                                            <div
                                                className={`text-xs mt-1 ${
                                                    isDarkMode
                                                        ? 'text-gray-500'
                                                        : 'text-gray-400'
                                                }`}
                                            >
                                                {role.permissions.length}{' '}
                                                permissions
                                            </div>
                                        </button>
                                    ))}
                            </div>

                            <div className="flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() =>
                                        setShowAssignRoleModal(false)
                                    }
                                    className={`px-4 py-2 rounded-lg border ${
                                        isDarkMode
                                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoleManagement;
