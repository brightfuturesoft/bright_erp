import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useContext } from 'react';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { Erp_context } from '@/provider/ErpContext';
const RoleManagement = () => {
    const context = useContext(Erp_context);
    const currentUser = context?.user;
    const workspace = context?.workspace;
    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem('theme') === 'dark'
    );
    const [activeTab, setActiveTab] = useState('roles');
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // Modal states
    const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
    const [showEditRoleModal, setShowEditRoleModal] = useState(false);
    const [showAssignRoleModal, setShowAssignRoleModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    // Form states
    const [roleForm, setRoleForm] = useState({
        name: '',
        description: '',
        permissions: [],
    });
    // Search and filter states
    const [roleSearch, setRoleSearch] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
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
    const handleCreateRole = async e => {
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
    const handleUpdateRole = async e => {
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
    const handleDeleteRole = async roleId => {
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
    const handleToggleRoleStatus = async roleId => {
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
    const handleAssignRole = async (userId, roleId) => {
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
    const handleRemoveRole = async userId => {
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
    const openEditModal = role => {
        setSelectedRole(role);
        setRoleForm({
            name: role.display_name,
            description: role.description,
            permissions: role.permissions,
        });
        setShowEditRoleModal(true);
    };
    const openAssignModal = user => {
        setSelectedUser(user);
        setShowAssignRoleModal(true);
    };
    const handlePermissionToggle = permissionKey => {
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
    return _jsxs('div', {
        className: `min-h-screen p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`,
        children: [
            _jsxs('div', {
                className: 'max-w-7xl mx-auto',
                children: [
                    _jsxs('div', {
                        className: 'mb-8',
                        children: [
                            _jsx('h1', {
                                className: `text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`,
                                children: 'Role & Permission Management',
                            }),
                            _jsx('p', {
                                className: `mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`,
                                children:
                                    'Manage user roles and permissions for your application',
                            }),
                        ],
                    }),
                    error &&
                        _jsx('div', {
                            className:
                                'mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-500 dark:text-red-300',
                            children: _jsxs('div', {
                                className: 'flex items-center',
                                children: [
                                    _jsx('svg', {
                                        className: 'w-5 h-5 mr-2',
                                        fill: 'currentColor',
                                        viewBox: '0 0 20 20',
                                        children: _jsx('path', {
                                            fillRule: 'evenodd',
                                            d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z',
                                            clipRule: 'evenodd',
                                        }),
                                    }),
                                    error,
                                ],
                            }),
                        }),
                    success &&
                        _jsx('div', {
                            className:
                                'mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-500 dark:text-green-300',
                            children: _jsxs('div', {
                                className: 'flex items-center',
                                children: [
                                    _jsx('svg', {
                                        className: 'w-5 h-5 mr-2',
                                        fill: 'currentColor',
                                        viewBox: '0 0 20 20',
                                        children: _jsx('path', {
                                            fillRule: 'evenodd',
                                            d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
                                            clipRule: 'evenodd',
                                        }),
                                    }),
                                    success,
                                ],
                            }),
                        }),
                    _jsx('div', {
                        className: 'mb-6',
                        children: _jsx('div', {
                            className: `border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`,
                            children: _jsx('nav', {
                                className: '-mb-px flex space-x-8',
                                children: [
                                    {
                                        key: 'roles',
                                        label: 'Roles',
                                        icon: '👥',
                                    },
                                    {
                                        key: 'users',
                                        label: 'Users',
                                        icon: '👤',
                                    },
                                    {
                                        key: 'permissions',
                                        label: 'Permissions',
                                        icon: '🔐',
                                    },
                                ].map(tab =>
                                    _jsxs(
                                        'button',
                                        {
                                            onClick: () =>
                                                setActiveTab(tab.key),
                                            className: `py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                                                activeTab === tab.key
                                                    ? isDarkMode
                                                        ? 'border-blue-500 text-blue-400'
                                                        : 'border-blue-500 text-blue-600'
                                                    : isDarkMode
                                                      ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                                                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`,
                                            children: [
                                                _jsx('span', {
                                                    children: tab.icon,
                                                }),
                                                _jsx('span', {
                                                    children: tab.label,
                                                }),
                                            ],
                                        },
                                        tab.key
                                    )
                                ),
                            }),
                        }),
                    }),
                    activeTab === 'roles' &&
                        _jsxs('div', {
                            children: [
                                _jsxs('div', {
                                    className:
                                        'flex justify-between items-center mb-6',
                                    children: [
                                        _jsxs('div', {
                                            className:
                                                'flex items-center space-x-4',
                                            children: [
                                                _jsx('input', {
                                                    type: 'text',
                                                    placeholder:
                                                        'Search roles...',
                                                    value: roleSearch,
                                                    onChange: e =>
                                                        setRoleSearch(
                                                            e.target.value
                                                        ),
                                                    className: `px-4 py-2 rounded-lg border ${
                                                        isDarkMode
                                                            ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400'
                                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`,
                                                }),
                                                _jsxs('select', {
                                                    value: statusFilter,
                                                    onChange: e =>
                                                        setStatusFilter(
                                                            e.target.value
                                                        ),
                                                    className: `px-4 py-2 rounded-lg border ${
                                                        isDarkMode
                                                            ? 'bg-gray-800 border-gray-600 text-gray-200'
                                                            : 'bg-white border-gray-300 text-gray-900'
                                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`,
                                                    children: [
                                                        _jsx('option', {
                                                            value: 'all',
                                                            children:
                                                                'All Status',
                                                        }),
                                                        _jsx('option', {
                                                            value: 'active',
                                                            children: 'Active',
                                                        }),
                                                        _jsx('option', {
                                                            value: 'inactive',
                                                            children:
                                                                'Inactive',
                                                        }),
                                                    ],
                                                }),
                                                _jsx('button', {
                                                    onClick: fetchRoles,
                                                    className: `px-4 py-2 rounded-lg border ${
                                                        isDarkMode
                                                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`,
                                                    children:
                                                        '\uD83D\uDD04 Refresh',
                                                }),
                                            ],
                                        }),
                                        _jsxs('button', {
                                            onClick: () =>
                                                setShowCreateRoleModal(true),
                                            className:
                                                'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2',
                                            children: [
                                                _jsx('span', {
                                                    children: '\u2795',
                                                }),
                                                _jsx('span', {
                                                    children: 'Create Role',
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                _jsx('div', {
                                    className: `rounded-lg border ${
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-700'
                                            : 'bg-white border-gray-200'
                                    } overflow-hidden`,
                                    children: _jsx('div', {
                                        className: 'overflow-x-auto',
                                        children: _jsxs('table', {
                                            className:
                                                'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
                                            children: [
                                                _jsx('thead', {
                                                    className: isDarkMode
                                                        ? 'bg-gray-700'
                                                        : 'bg-gray-50',
                                                    children: _jsxs('tr', {
                                                        children: [
                                                            _jsx('th', {
                                                                className: `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                                    isDarkMode
                                                                        ? 'text-gray-300'
                                                                        : 'text-gray-500'
                                                                }`,
                                                                children:
                                                                    'Role',
                                                            }),
                                                            _jsx('th', {
                                                                className: `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                                    isDarkMode
                                                                        ? 'text-gray-300'
                                                                        : 'text-gray-500'
                                                                }`,
                                                                children:
                                                                    'Permissions',
                                                            }),
                                                            _jsx('th', {
                                                                className: `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                                    isDarkMode
                                                                        ? 'text-gray-300'
                                                                        : 'text-gray-500'
                                                                }`,
                                                                children:
                                                                    'Status',
                                                            }),
                                                            _jsx('th', {
                                                                className: `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                                    isDarkMode
                                                                        ? 'text-gray-300'
                                                                        : 'text-gray-500'
                                                                }`,
                                                                children:
                                                                    'Created By',
                                                            }),
                                                            _jsx('th', {
                                                                className: `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                                    isDarkMode
                                                                        ? 'text-gray-300'
                                                                        : 'text-gray-500'
                                                                }`,
                                                                children:
                                                                    'Actions',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                                _jsx('tbody', {
                                                    className: `divide-y ${
                                                        isDarkMode
                                                            ? 'divide-gray-700'
                                                            : 'divide-gray-200'
                                                    }`,
                                                    children: roles.map(role =>
                                                        _jsxs(
                                                            'tr',
                                                            {
                                                                className:
                                                                    isDarkMode
                                                                        ? 'hover:bg-gray-700'
                                                                        : 'hover:bg-gray-50',
                                                                children: [
                                                                    _jsx('td', {
                                                                        className:
                                                                            'px-6 py-4 whitespace-nowrap',
                                                                        children:
                                                                            _jsxs(
                                                                                'div',
                                                                                {
                                                                                    children:
                                                                                        [
                                                                                            _jsx(
                                                                                                'div',
                                                                                                {
                                                                                                    className: `text-sm font-medium ${
                                                                                                        isDarkMode
                                                                                                            ? 'text-gray-200'
                                                                                                            : 'text-gray-900'
                                                                                                    }`,
                                                                                                    children:
                                                                                                        role.display_name,
                                                                                                }
                                                                                            ),
                                                                                            _jsx(
                                                                                                'div',
                                                                                                {
                                                                                                    className: `text-sm ${
                                                                                                        isDarkMode
                                                                                                            ? 'text-gray-400'
                                                                                                            : 'text-gray-500'
                                                                                                    }`,
                                                                                                    children:
                                                                                                        role.description ||
                                                                                                        'No description',
                                                                                                }
                                                                                            ),
                                                                                        ],
                                                                                }
                                                                            ),
                                                                    }),
                                                                    _jsx('td', {
                                                                        className:
                                                                            'px-6 py-4',
                                                                        children:
                                                                            _jsxs(
                                                                                'div',
                                                                                {
                                                                                    className:
                                                                                        'flex flex-wrap gap-1',
                                                                                    children:
                                                                                        [
                                                                                            role.permissions
                                                                                                .slice(
                                                                                                    0,
                                                                                                    3
                                                                                                )
                                                                                                .map(
                                                                                                    permission =>
                                                                                                        _jsx(
                                                                                                            'span',
                                                                                                            {
                                                                                                                className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                                                                    isDarkMode
                                                                                                                        ? 'bg-blue-900 text-blue-300'
                                                                                                                        : 'bg-blue-100 text-blue-800'
                                                                                                                }`,
                                                                                                                children:
                                                                                                                    permissions[
                                                                                                                        permission
                                                                                                                    ]
                                                                                                                        ?.name ||
                                                                                                                    permission,
                                                                                                            },
                                                                                                            permission
                                                                                                        )
                                                                                                ),
                                                                                            role
                                                                                                .permissions
                                                                                                .length >
                                                                                                3 &&
                                                                                                _jsxs(
                                                                                                    'span',
                                                                                                    {
                                                                                                        className: `text-xs ${
                                                                                                            isDarkMode
                                                                                                                ? 'text-gray-400'
                                                                                                                : 'text-gray-500'
                                                                                                        }`,
                                                                                                        children:
                                                                                                            [
                                                                                                                '+',
                                                                                                                role
                                                                                                                    .permissions
                                                                                                                    .length -
                                                                                                                    3,
                                                                                                                ' ',
                                                                                                                'more',
                                                                                                            ],
                                                                                                    }
                                                                                                ),
                                                                                        ],
                                                                                }
                                                                            ),
                                                                    }),
                                                                    _jsx('td', {
                                                                        className:
                                                                            'px-6 py-4 whitespace-nowrap',
                                                                        children:
                                                                            _jsx(
                                                                                'span',
                                                                                {
                                                                                    className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                                        role.status ===
                                                                                        'active'
                                                                                            ? isDarkMode
                                                                                                ? 'bg-green-900 text-green-300'
                                                                                                : 'bg-green-100 text-green-800'
                                                                                            : isDarkMode
                                                                                              ? 'bg-red-900 text-red-300'
                                                                                              : 'bg-red-100 text-red-800'
                                                                                    }`,
                                                                                    children:
                                                                                        role.status,
                                                                                }
                                                                            ),
                                                                    }),
                                                                    _jsxs(
                                                                        'td',
                                                                        {
                                                                            className:
                                                                                'px-6 py-4 whitespace-nowrap',
                                                                            children:
                                                                                [
                                                                                    _jsx(
                                                                                        'div',
                                                                                        {
                                                                                            className: `text-sm ${
                                                                                                isDarkMode
                                                                                                    ? 'text-gray-300'
                                                                                                    : 'text-gray-900'
                                                                                            }`,
                                                                                            children:
                                                                                                role
                                                                                                    .creator
                                                                                                    .name,
                                                                                        }
                                                                                    ),
                                                                                    _jsx(
                                                                                        'div',
                                                                                        {
                                                                                            className: `text-sm ${
                                                                                                isDarkMode
                                                                                                    ? 'text-gray-400'
                                                                                                    : 'text-gray-500'
                                                                                            }`,
                                                                                            children:
                                                                                                new Date(
                                                                                                    role.created_at
                                                                                                ).toLocaleDateString(),
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    ),
                                                                    _jsx('td', {
                                                                        className:
                                                                            'px-6 py-4 whitespace-nowrap text-sm font-medium',
                                                                        children:
                                                                            _jsxs(
                                                                                'div',
                                                                                {
                                                                                    className:
                                                                                        'flex items-center space-x-2',
                                                                                    children:
                                                                                        [
                                                                                            _jsx(
                                                                                                'button',
                                                                                                {
                                                                                                    onClick:
                                                                                                        () =>
                                                                                                            openEditModal(
                                                                                                                role
                                                                                                            ),
                                                                                                    className: `text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300`,
                                                                                                    children:
                                                                                                        '\u270F\uFE0F',
                                                                                                }
                                                                                            ),
                                                                                            _jsx(
                                                                                                'button',
                                                                                                {
                                                                                                    onClick:
                                                                                                        () =>
                                                                                                            handleToggleRoleStatus(
                                                                                                                role._id
                                                                                                            ),
                                                                                                    className: `${
                                                                                                        role.status ===
                                                                                                        'active'
                                                                                                            ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
                                                                                                            : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                                                                                                    }`,
                                                                                                    children:
                                                                                                        role.status ===
                                                                                                        'active'
                                                                                                            ? '❌'
                                                                                                            : '✅',
                                                                                                }
                                                                                            ),
                                                                                            _jsx(
                                                                                                'button',
                                                                                                {
                                                                                                    onClick:
                                                                                                        () =>
                                                                                                            handleDeleteRole(
                                                                                                                role._id
                                                                                                            ),
                                                                                                    className:
                                                                                                        'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300',
                                                                                                    children:
                                                                                                        '\uD83D\uDDD1\uFE0F',
                                                                                                }
                                                                                            ),
                                                                                        ],
                                                                                }
                                                                            ),
                                                                    }),
                                                                ],
                                                            },
                                                            role._id
                                                        )
                                                    ),
                                                }),
                                            ],
                                        }),
                                    }),
                                }),
                            ],
                        }),
                    activeTab === 'users' &&
                        _jsxs('div', {
                            children: [
                                _jsx('div', {
                                    className:
                                        'flex justify-between items-center mb-6',
                                    children: _jsxs('div', {
                                        className:
                                            'flex items-center space-x-4',
                                        children: [
                                            _jsx('input', {
                                                type: 'text',
                                                placeholder: 'Search users...',
                                                value: userSearch,
                                                onChange: e =>
                                                    setUserSearch(
                                                        e.target.value
                                                    ),
                                                className: `px-4 py-2 rounded-lg border ${
                                                    isDarkMode
                                                        ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400'
                                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500`,
                                            }),
                                            _jsx('button', {
                                                onClick: fetchUsers,
                                                className: `px-4 py-2 rounded-lg border ${
                                                    isDarkMode
                                                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`,
                                                children:
                                                    '\uD83D\uDD04 Refresh',
                                            }),
                                        ],
                                    }),
                                }),
                                _jsx('div', {
                                    className: `rounded-lg border ${
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-700'
                                            : 'bg-white border-gray-200'
                                    } overflow-hidden`,
                                    children: _jsx('div', {
                                        className: 'overflow-x-auto',
                                        children: _jsxs('table', {
                                            className:
                                                'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
                                            children: [
                                                _jsx('thead', {
                                                    className: isDarkMode
                                                        ? 'bg-gray-700'
                                                        : 'bg-gray-50',
                                                    children: _jsxs('tr', {
                                                        children: [
                                                            _jsx('th', {
                                                                className: `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                                    isDarkMode
                                                                        ? 'text-gray-300'
                                                                        : 'text-gray-500'
                                                                }`,
                                                                children:
                                                                    'User',
                                                            }),
                                                            _jsx('th', {
                                                                className: `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                                    isDarkMode
                                                                        ? 'text-gray-300'
                                                                        : 'text-gray-500'
                                                                }`,
                                                                children:
                                                                    'Role',
                                                            }),
                                                            _jsx('th', {
                                                                className: `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                                    isDarkMode
                                                                        ? 'text-gray-300'
                                                                        : 'text-gray-500'
                                                                }`,
                                                                children:
                                                                    'Assigned Date',
                                                            }),
                                                            _jsx('th', {
                                                                className: `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                                                    isDarkMode
                                                                        ? 'text-gray-300'
                                                                        : 'text-gray-500'
                                                                }`,
                                                                children:
                                                                    'Actions',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                                _jsx('tbody', {
                                                    className: `divide-y ${
                                                        isDarkMode
                                                            ? 'divide-gray-700'
                                                            : 'divide-gray-200'
                                                    }`,
                                                    children: users.map(user =>
                                                        _jsxs(
                                                            'tr',
                                                            {
                                                                className:
                                                                    isDarkMode
                                                                        ? 'hover:bg-gray-700'
                                                                        : 'hover:bg-gray-50',
                                                                children: [
                                                                    _jsx('td', {
                                                                        className:
                                                                            'px-6 py-4 whitespace-nowrap',
                                                                        children:
                                                                            _jsxs(
                                                                                'div',
                                                                                {
                                                                                    children:
                                                                                        [
                                                                                            _jsx(
                                                                                                'div',
                                                                                                {
                                                                                                    className: `text-sm font-medium ${
                                                                                                        isDarkMode
                                                                                                            ? 'text-gray-200'
                                                                                                            : 'text-gray-900'
                                                                                                    }`,
                                                                                                    children:
                                                                                                        user.name,
                                                                                                }
                                                                                            ),
                                                                                            _jsx(
                                                                                                'div',
                                                                                                {
                                                                                                    className: `text-sm ${
                                                                                                        isDarkMode
                                                                                                            ? 'text-gray-400'
                                                                                                            : 'text-gray-500'
                                                                                                    }`,
                                                                                                    children:
                                                                                                        user.email,
                                                                                                }
                                                                                            ),
                                                                                        ],
                                                                                }
                                                                            ),
                                                                    }),
                                                                    _jsx('td', {
                                                                        className:
                                                                            'px-6 py-4 whitespace-nowrap',
                                                                        children:
                                                                            user.role
                                                                                ? _jsx(
                                                                                      'span',
                                                                                      {
                                                                                          className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                                              user
                                                                                                  .role
                                                                                                  .status ===
                                                                                              'active'
                                                                                                  ? isDarkMode
                                                                                                      ? 'bg-green-900 text-green-300'
                                                                                                      : 'bg-green-100 text-green-800'
                                                                                                  : isDarkMode
                                                                                                    ? 'bg-red-900 text-red-300'
                                                                                                    : 'bg-red-100 text-red-800'
                                                                                          }`,
                                                                                          children:
                                                                                              user
                                                                                                  .role
                                                                                                  .display_name,
                                                                                      }
                                                                                  )
                                                                                : _jsx(
                                                                                      'span',
                                                                                      {
                                                                                          className: `text-sm ${
                                                                                              isDarkMode
                                                                                                  ? 'text-gray-400'
                                                                                                  : 'text-gray-500'
                                                                                          }`,
                                                                                          children:
                                                                                              'No role assigned',
                                                                                      }
                                                                                  ),
                                                                    }),
                                                                    _jsx('td', {
                                                                        className:
                                                                            'px-6 py-4 whitespace-nowrap',
                                                                        children:
                                                                            _jsx(
                                                                                'div',
                                                                                {
                                                                                    className: `text-sm ${
                                                                                        isDarkMode
                                                                                            ? 'text-gray-300'
                                                                                            : 'text-gray-900'
                                                                                    }`,
                                                                                    children:
                                                                                        user.role_assigned_at
                                                                                            ? new Date(
                                                                                                  user.role_assigned_at
                                                                                              ).toLocaleDateString()
                                                                                            : '-',
                                                                                }
                                                                            ),
                                                                    }),
                                                                    _jsx('td', {
                                                                        className:
                                                                            'px-6 py-4 whitespace-nowrap text-sm font-medium',
                                                                        children:
                                                                            _jsxs(
                                                                                'div',
                                                                                {
                                                                                    className:
                                                                                        'flex items-center space-x-2',
                                                                                    children:
                                                                                        [
                                                                                            _jsx(
                                                                                                'button',
                                                                                                {
                                                                                                    onClick:
                                                                                                        () =>
                                                                                                            openAssignModal(
                                                                                                                user
                                                                                                            ),
                                                                                                    className:
                                                                                                        'text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300',
                                                                                                    children:
                                                                                                        user.role
                                                                                                            ? '🔄'
                                                                                                            : '➕',
                                                                                                }
                                                                                            ),
                                                                                            user.role &&
                                                                                                _jsx(
                                                                                                    'button',
                                                                                                    {
                                                                                                        onClick:
                                                                                                            () =>
                                                                                                                handleRemoveRole(
                                                                                                                    user._id
                                                                                                                ),
                                                                                                        className:
                                                                                                            'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300',
                                                                                                        children:
                                                                                                            '\uD83D\uDDD1\uFE0F',
                                                                                                    }
                                                                                                ),
                                                                                        ],
                                                                                }
                                                                            ),
                                                                    }),
                                                                ],
                                                            },
                                                            user._id
                                                        )
                                                    ),
                                                }),
                                            ],
                                        }),
                                    }),
                                }),
                            ],
                        }),
                    activeTab === 'permissions' &&
                        _jsx('div', {
                            children: _jsxs('div', {
                                className: `rounded-lg border ${
                                    isDarkMode
                                        ? 'bg-gray-800 border-gray-700'
                                        : 'bg-white border-gray-200'
                                } p-6`,
                                children: [
                                    _jsx('h3', {
                                        className: `text-lg font-medium mb-4 ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-900'
                                        }`,
                                        children: 'Available Permissions',
                                    }),
                                    _jsx('div', {
                                        className:
                                            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
                                        children: Object.entries(
                                            permissions
                                        ).map(([key, permission]) =>
                                            _jsxs(
                                                'div',
                                                {
                                                    className: `p-4 rounded-lg border ${
                                                        isDarkMode
                                                            ? 'border-gray-600 bg-gray-700'
                                                            : 'border-gray-200 bg-gray-50'
                                                    }`,
                                                    children: [
                                                        _jsx('h4', {
                                                            className: `font-medium mb-2 ${
                                                                isDarkMode
                                                                    ? 'text-gray-200'
                                                                    : 'text-gray-900'
                                                            }`,
                                                            children:
                                                                permission.name,
                                                        }),
                                                        _jsxs('div', {
                                                            className:
                                                                'space-y-1',
                                                            children: [
                                                                permission.routes
                                                                    .slice(0, 5)
                                                                    .map(
                                                                        route =>
                                                                            _jsxs(
                                                                                'div',
                                                                                {
                                                                                    className: `text-xs px-2 py-1 rounded ${
                                                                                        isDarkMode
                                                                                            ? 'bg-gray-600 text-gray-300'
                                                                                            : 'bg-gray-200 text-gray-600'
                                                                                    }`,
                                                                                    children:
                                                                                        [
                                                                                            '/',
                                                                                            route,
                                                                                        ],
                                                                                },
                                                                                route
                                                                            )
                                                                    ),
                                                                permission
                                                                    .routes
                                                                    .length >
                                                                    5 &&
                                                                    _jsxs(
                                                                        'div',
                                                                        {
                                                                            className: `text-xs ${
                                                                                isDarkMode
                                                                                    ? 'text-gray-400'
                                                                                    : 'text-gray-500'
                                                                            }`,
                                                                            children:
                                                                                [
                                                                                    '+',
                                                                                    permission
                                                                                        .routes
                                                                                        .length -
                                                                                        5,
                                                                                    ' ',
                                                                                    'more routes',
                                                                                ],
                                                                        }
                                                                    ),
                                                            ],
                                                        }),
                                                    ],
                                                },
                                                key
                                            )
                                        ),
                                    }),
                                ],
                            }),
                        }),
                ],
            }),
            showCreateRoleModal &&
                _jsx('div', {
                    className:
                        'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50',
                    children: _jsx('div', {
                        className: `max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`,
                        children: _jsxs('div', {
                            className: 'p-6',
                            children: [
                                _jsxs('div', {
                                    className:
                                        'flex justify-between items-center mb-4',
                                    children: [
                                        _jsx('h3', {
                                            className: `text-lg font-medium ${
                                                isDarkMode
                                                    ? 'text-gray-200'
                                                    : 'text-gray-900'
                                            }`,
                                            children: 'Create New Role',
                                        }),
                                        _jsx('button', {
                                            onClick: () =>
                                                setShowCreateRoleModal(false),
                                            className: `text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`,
                                            children: '\u2715',
                                        }),
                                    ],
                                }),
                                _jsxs('form', {
                                    onSubmit: handleCreateRole,
                                    className: 'space-y-4',
                                    children: [
                                        _jsxs('div', {
                                            children: [
                                                _jsx('label', {
                                                    className: `block text-sm font-medium mb-2 ${
                                                        isDarkMode
                                                            ? 'text-gray-200'
                                                            : 'text-gray-700'
                                                    }`,
                                                    children: 'Role Name *',
                                                }),
                                                _jsx('input', {
                                                    type: 'text',
                                                    value: roleForm.name,
                                                    onChange: e =>
                                                        setRoleForm(prev => ({
                                                            ...prev,
                                                            name: e.target
                                                                .value,
                                                        })),
                                                    className: `w-full px-3 py-2 rounded-lg border ${
                                                        isDarkMode
                                                            ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                            : 'bg-white border-gray-300 text-gray-900'
                                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`,
                                                    placeholder:
                                                        'Enter role name',
                                                    required: true,
                                                }),
                                            ],
                                        }),
                                        _jsxs('div', {
                                            children: [
                                                _jsx('label', {
                                                    className: `block text-sm font-medium mb-2 ${
                                                        isDarkMode
                                                            ? 'text-gray-200'
                                                            : 'text-gray-700'
                                                    }`,
                                                    children: 'Description',
                                                }),
                                                _jsx('textarea', {
                                                    value: roleForm.description,
                                                    onChange: e =>
                                                        setRoleForm(prev => ({
                                                            ...prev,
                                                            description:
                                                                e.target.value,
                                                        })),
                                                    className: `w-full px-3 py-2 rounded-lg border ${
                                                        isDarkMode
                                                            ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                            : 'bg-white border-gray-300 text-gray-900'
                                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`,
                                                    rows: 3,
                                                    placeholder:
                                                        'Enter role description',
                                                }),
                                            ],
                                        }),
                                        _jsxs('div', {
                                            children: [
                                                _jsx('label', {
                                                    className: `block text-sm font-medium mb-2 ${
                                                        isDarkMode
                                                            ? 'text-gray-200'
                                                            : 'text-gray-700'
                                                    }`,
                                                    children: 'Permissions *',
                                                }),
                                                _jsx('div', {
                                                    className:
                                                        'grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto',
                                                    children: Object.entries(
                                                        permissions
                                                    ).map(([key, permission]) =>
                                                        _jsxs(
                                                            'label',
                                                            {
                                                                className: `flex items-center p-3 rounded-lg border cursor-pointer ${
                                                                    roleForm.permissions.includes(
                                                                        key
                                                                    )
                                                                        ? isDarkMode
                                                                            ? 'border-blue-500 bg-blue-900/20'
                                                                            : 'border-blue-500 bg-blue-50'
                                                                        : isDarkMode
                                                                          ? 'border-gray-600 hover:border-gray-500'
                                                                          : 'border-gray-300 hover:border-gray-400'
                                                                }`,
                                                                children: [
                                                                    _jsx(
                                                                        'input',
                                                                        {
                                                                            type: 'checkbox',
                                                                            checked:
                                                                                roleForm.permissions.includes(
                                                                                    key
                                                                                ),
                                                                            onChange:
                                                                                () =>
                                                                                    handlePermissionToggle(
                                                                                        key
                                                                                    ),
                                                                            className:
                                                                                'mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
                                                                        }
                                                                    ),
                                                                    _jsxs(
                                                                        'div',
                                                                        {
                                                                            children:
                                                                                [
                                                                                    _jsx(
                                                                                        'div',
                                                                                        {
                                                                                            className: `font-medium ${
                                                                                                isDarkMode
                                                                                                    ? 'text-gray-200'
                                                                                                    : 'text-gray-900'
                                                                                            }`,
                                                                                            children:
                                                                                                permission.name,
                                                                                        }
                                                                                    ),
                                                                                    _jsxs(
                                                                                        'div',
                                                                                        {
                                                                                            className: `text-xs ${
                                                                                                isDarkMode
                                                                                                    ? 'text-gray-400'
                                                                                                    : 'text-gray-500'
                                                                                            }`,
                                                                                            children:
                                                                                                [
                                                                                                    permission
                                                                                                        .routes
                                                                                                        .length,
                                                                                                    ' ',
                                                                                                    'routes',
                                                                                                ],
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    ),
                                                                ],
                                                            },
                                                            key
                                                        )
                                                    ),
                                                }),
                                            ],
                                        }),
                                        _jsxs('div', {
                                            className:
                                                'flex justify-end space-x-3 pt-4',
                                            children: [
                                                _jsx('button', {
                                                    type: 'button',
                                                    onClick: () =>
                                                        setShowCreateRoleModal(
                                                            false
                                                        ),
                                                    className: `px-4 py-2 rounded-lg border ${
                                                        isDarkMode
                                                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`,
                                                    children: 'Cancel',
                                                }),
                                                _jsx('button', {
                                                    type: 'submit',
                                                    disabled: loading,
                                                    className:
                                                        'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50',
                                                    children: loading
                                                        ? 'Creating...'
                                                        : 'Create Role',
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                }),
            showEditRoleModal &&
                selectedRole &&
                _jsx('div', {
                    className:
                        'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50',
                    children: _jsx('div', {
                        className: `max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`,
                        children: _jsxs('div', {
                            className: 'p-6',
                            children: [
                                _jsxs('div', {
                                    className:
                                        'flex justify-between items-center mb-4',
                                    children: [
                                        _jsxs('h3', {
                                            className: `text-lg font-medium ${
                                                isDarkMode
                                                    ? 'text-gray-200'
                                                    : 'text-gray-900'
                                            }`,
                                            children: [
                                                'Edit Role: ',
                                                selectedRole.display_name,
                                            ],
                                        }),
                                        _jsx('button', {
                                            onClick: () =>
                                                setShowEditRoleModal(false),
                                            className: `text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`,
                                            children: '\u2715',
                                        }),
                                    ],
                                }),
                                _jsxs('form', {
                                    onSubmit: handleUpdateRole,
                                    className: 'space-y-4',
                                    children: [
                                        _jsxs('div', {
                                            children: [
                                                _jsx('label', {
                                                    className: `block text-sm font-medium mb-2 ${
                                                        isDarkMode
                                                            ? 'text-gray-200'
                                                            : 'text-gray-700'
                                                    }`,
                                                    children: 'Role Name *',
                                                }),
                                                _jsx('input', {
                                                    type: 'text',
                                                    value: roleForm.name,
                                                    onChange: e =>
                                                        setRoleForm(prev => ({
                                                            ...prev,
                                                            name: e.target
                                                                .value,
                                                        })),
                                                    className: `w-full px-3 py-2 rounded-lg border ${
                                                        isDarkMode
                                                            ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                            : 'bg-white border-gray-300 text-gray-900'
                                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`,
                                                    placeholder:
                                                        'Enter role name',
                                                    required: true,
                                                }),
                                            ],
                                        }),
                                        _jsxs('div', {
                                            children: [
                                                _jsx('label', {
                                                    className: `block text-sm font-medium mb-2 ${
                                                        isDarkMode
                                                            ? 'text-gray-200'
                                                            : 'text-gray-700'
                                                    }`,
                                                    children: 'Description',
                                                }),
                                                _jsx('textarea', {
                                                    value: roleForm.description,
                                                    onChange: e =>
                                                        setRoleForm(prev => ({
                                                            ...prev,
                                                            description:
                                                                e.target.value,
                                                        })),
                                                    className: `w-full px-3 py-2 rounded-lg border ${
                                                        isDarkMode
                                                            ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                            : 'bg-white border-gray-300 text-gray-900'
                                                    } focus:outline-none focus:ring-2 focus:ring-blue-500`,
                                                    rows: 3,
                                                    placeholder:
                                                        'Enter role description',
                                                }),
                                            ],
                                        }),
                                        _jsxs('div', {
                                            children: [
                                                _jsx('label', {
                                                    className: `block text-sm font-medium mb-2 ${
                                                        isDarkMode
                                                            ? 'text-gray-200'
                                                            : 'text-gray-700'
                                                    }`,
                                                    children: 'Permissions *',
                                                }),
                                                _jsx('div', {
                                                    className:
                                                        'grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto',
                                                    children: Object.entries(
                                                        permissions
                                                    ).map(([key, permission]) =>
                                                        _jsxs(
                                                            'label',
                                                            {
                                                                className: `flex items-center p-3 rounded-lg border cursor-pointer ${
                                                                    roleForm.permissions.includes(
                                                                        key
                                                                    )
                                                                        ? isDarkMode
                                                                            ? 'border-blue-500 bg-blue-900/20'
                                                                            : 'border-blue-500 bg-blue-50'
                                                                        : isDarkMode
                                                                          ? 'border-gray-600 hover:border-gray-500'
                                                                          : 'border-gray-300 hover:border-gray-400'
                                                                }`,
                                                                children: [
                                                                    _jsx(
                                                                        'input',
                                                                        {
                                                                            type: 'checkbox',
                                                                            checked:
                                                                                roleForm.permissions.includes(
                                                                                    key
                                                                                ),
                                                                            onChange:
                                                                                () =>
                                                                                    handlePermissionToggle(
                                                                                        key
                                                                                    ),
                                                                            className:
                                                                                'mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
                                                                        }
                                                                    ),
                                                                    _jsxs(
                                                                        'div',
                                                                        {
                                                                            children:
                                                                                [
                                                                                    _jsx(
                                                                                        'div',
                                                                                        {
                                                                                            className: `font-medium ${
                                                                                                isDarkMode
                                                                                                    ? 'text-gray-200'
                                                                                                    : 'text-gray-900'
                                                                                            }`,
                                                                                            children:
                                                                                                permission.name,
                                                                                        }
                                                                                    ),
                                                                                    _jsxs(
                                                                                        'div',
                                                                                        {
                                                                                            className: `text-xs ${
                                                                                                isDarkMode
                                                                                                    ? 'text-gray-400'
                                                                                                    : 'text-gray-500'
                                                                                            }`,
                                                                                            children:
                                                                                                [
                                                                                                    permission
                                                                                                        .routes
                                                                                                        .length,
                                                                                                    ' ',
                                                                                                    'routes',
                                                                                                ],
                                                                                        }
                                                                                    ),
                                                                                ],
                                                                        }
                                                                    ),
                                                                ],
                                                            },
                                                            key
                                                        )
                                                    ),
                                                }),
                                            ],
                                        }),
                                        _jsxs('div', {
                                            className:
                                                'flex justify-end space-x-3 pt-4',
                                            children: [
                                                _jsx('button', {
                                                    type: 'button',
                                                    onClick: () =>
                                                        setShowEditRoleModal(
                                                            false
                                                        ),
                                                    className: `px-4 py-2 rounded-lg border ${
                                                        isDarkMode
                                                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`,
                                                    children: 'Cancel',
                                                }),
                                                _jsx('button', {
                                                    type: 'submit',
                                                    disabled: loading,
                                                    className:
                                                        'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50',
                                                    children: loading
                                                        ? 'Updating...'
                                                        : 'Update Role',
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                }),
            showAssignRoleModal &&
                selectedUser &&
                _jsx('div', {
                    className:
                        'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50',
                    children: _jsx('div', {
                        className: `max-w-md w-full rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`,
                        children: _jsxs('div', {
                            className: 'p-6',
                            children: [
                                _jsxs('div', {
                                    className:
                                        'flex justify-between items-center mb-4',
                                    children: [
                                        _jsx('h3', {
                                            className: `text-lg font-medium ${
                                                isDarkMode
                                                    ? 'text-gray-200'
                                                    : 'text-gray-900'
                                            }`,
                                            children: selectedUser.role
                                                ? 'Change Role'
                                                : 'Assign Role',
                                        }),
                                        _jsx('button', {
                                            onClick: () =>
                                                setShowAssignRoleModal(false),
                                            className: `text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`,
                                            children: '\u2715',
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    className: 'mb-4',
                                    children: [
                                        _jsxs('p', {
                                            className: `text-sm ${
                                                isDarkMode
                                                    ? 'text-gray-300'
                                                    : 'text-gray-600'
                                            }`,
                                            children: [
                                                'User:',
                                                ' ',
                                                _jsx('span', {
                                                    className: 'font-medium',
                                                    children: selectedUser.name,
                                                }),
                                            ],
                                        }),
                                        _jsxs('p', {
                                            className: `text-sm ${
                                                isDarkMode
                                                    ? 'text-gray-300'
                                                    : 'text-gray-600'
                                            }`,
                                            children: [
                                                'Email:',
                                                ' ',
                                                _jsx('span', {
                                                    className: 'font-medium',
                                                    children:
                                                        selectedUser.email,
                                                }),
                                            ],
                                        }),
                                        selectedUser.role &&
                                            _jsxs('p', {
                                                className: `text-sm ${
                                                    isDarkMode
                                                        ? 'text-gray-300'
                                                        : 'text-gray-600'
                                                }`,
                                                children: [
                                                    'Current Role:',
                                                    ' ',
                                                    _jsx('span', {
                                                        className:
                                                            'font-medium',
                                                        children:
                                                            selectedUser.role
                                                                .display_name,
                                                    }),
                                                ],
                                            }),
                                    ],
                                }),
                                _jsxs('div', {
                                    className: 'space-y-3',
                                    children: [
                                        _jsx('label', {
                                            className: `block text-sm font-medium ${
                                                isDarkMode
                                                    ? 'text-gray-200'
                                                    : 'text-gray-700'
                                            }`,
                                            children: 'Select Role:',
                                        }),
                                        roles
                                            .filter(
                                                role => role.status === 'active'
                                            )
                                            .map(role =>
                                                _jsxs(
                                                    'button',
                                                    {
                                                        onClick: () =>
                                                            handleAssignRole(
                                                                selectedUser._id,
                                                                role._id
                                                            ),
                                                        className: `w-full text-left p-3 rounded-lg border transition-colors ${
                                                            selectedUser.role
                                                                ?._id ===
                                                            role._id
                                                                ? isDarkMode
                                                                    ? 'border-blue-500 bg-blue-900/20'
                                                                    : 'border-blue-500 bg-blue-50'
                                                                : isDarkMode
                                                                  ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                                                                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                                                        }`,
                                                        children: [
                                                            _jsx('div', {
                                                                className: `font-medium ${
                                                                    isDarkMode
                                                                        ? 'text-gray-200'
                                                                        : 'text-gray-900'
                                                                }`,
                                                                children:
                                                                    role.display_name,
                                                            }),
                                                            _jsx('div', {
                                                                className: `text-sm ${
                                                                    isDarkMode
                                                                        ? 'text-gray-400'
                                                                        : 'text-gray-500'
                                                                }`,
                                                                children:
                                                                    role.description ||
                                                                    'No description',
                                                            }),
                                                            _jsxs('div', {
                                                                className: `text-xs mt-1 ${
                                                                    isDarkMode
                                                                        ? 'text-gray-500'
                                                                        : 'text-gray-400'
                                                                }`,
                                                                children: [
                                                                    role
                                                                        .permissions
                                                                        .length,
                                                                    ' ',
                                                                    'permissions',
                                                                ],
                                                            }),
                                                        ],
                                                    },
                                                    role._id
                                                )
                                            ),
                                    ],
                                }),
                                _jsx('div', {
                                    className:
                                        'flex justify-end space-x-3 pt-4 mt-6 border-t border-gray-200 dark:border-gray-700',
                                    children: _jsx('button', {
                                        onClick: () =>
                                            setShowAssignRoleModal(false),
                                        className: `px-4 py-2 rounded-lg border ${
                                            isDarkMode
                                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`,
                                        children: 'Cancel',
                                    }),
                                }),
                            ],
                        }),
                    }),
                }),
        ],
    });
};
export default RoleManagement;
