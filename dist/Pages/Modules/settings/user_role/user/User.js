import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { useEffect, useState, useContext } from 'react';
import { Erp_context } from '@/provider/ErpContext';
const API_BASE = `${getBaseUrl}/settings/user-role/users-with-roles`;
const UserPage = () => {
    const { user, workspace, user_loading } = useContext(Erp_context);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
        } catch (e) {
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
    const onCreate = async e => {
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
        } catch (e) {
            setError(e?.message || 'Failed to create');
        }
    };
    return _jsxs('div', {
        className: 'p-4 space-y-6',
        children: [
            _jsxs('div', {
                className: 'flex items-center justify-between',
                children: [
                    _jsx('h2', {
                        className: 'text-xl font-semibold',
                        children: 'Users',
                    }),
                    _jsx('button', {
                        onClick: () => setShowCreate(true),
                        className: 'bg-blue-600 text-white px-4 py-2 rounded',
                        children: 'Add User',
                    }),
                ],
            }),
            error &&
                _jsx('div', { className: 'text-red-600', children: error }),
            _jsx('div', {
                children: loading
                    ? 'Loading...'
                    : _jsxs('table', {
                          className:
                              'min-w-full divide-y divide-gray-200 border rounded',
                          children: [
                              _jsx('thead', {
                                  className: 'bg-gray-50',
                                  children: _jsxs('tr', {
                                      children: [
                                          _jsx('th', {
                                              className:
                                                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                              children: 'Name',
                                          }),
                                          _jsx('th', {
                                              className:
                                                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                              children: 'Email',
                                          }),
                                          _jsx('th', {
                                              className:
                                                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                              children: 'Phone',
                                          }),
                                          _jsx('th', {
                                              className:
                                                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                              children: 'Role',
                                          }),
                                          _jsx('th', {
                                              className:
                                                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                              children: 'Permissions',
                                          }),
                                      ],
                                  }),
                              }),
                              _jsx('tbody', {
                                  className:
                                      'bg-white divide-y divide-gray-200',
                                  children: users.map(u =>
                                      _jsxs(
                                          'tr',
                                          {
                                              className: 'hover:bg-gray-100',
                                              children: [
                                                  _jsx('td', {
                                                      className:
                                                          'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900',
                                                      children: u.name,
                                                  }),
                                                  _jsx('td', {
                                                      className:
                                                          'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
                                                      children: u.email,
                                                  }),
                                                  _jsx('td', {
                                                      className:
                                                          'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
                                                      children: u.phone || '-',
                                                  }),
                                                  _jsx('td', {
                                                      className:
                                                          'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
                                                      children:
                                                          u.role
                                                              ?.display_name ||
                                                          'No role assigned',
                                                  }),
                                                  _jsx('td', {
                                                      className:
                                                          'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
                                                      children: u.role
                                                          ?.permissions?.length
                                                          ? u.role.permissions.join(
                                                                ', '
                                                            )
                                                          : '-',
                                                  }),
                                              ],
                                          },
                                          u._id
                                      )
                                  ),
                              }),
                          ],
                      }),
            }),
            showCreate &&
                _jsx('div', {
                    className:
                        'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50',
                    children: _jsxs('div', {
                        className: 'bg-white rounded shadow max-w-md w-full',
                        children: [
                            _jsxs('div', {
                                className:
                                    'p-4 border-b flex items-center justify-between',
                                children: [
                                    _jsx('h3', {
                                        className: 'font-medium',
                                        children: 'Add User',
                                    }),
                                    _jsx('button', {
                                        onClick: () => setShowCreate(false),
                                        className: 'text-gray-500',
                                        children: '\u2715',
                                    }),
                                ],
                            }),
                            _jsxs('form', {
                                onSubmit: onCreate,
                                className: 'p-4 grid gap-3',
                                children: [
                                    _jsx('input', {
                                        value: name,
                                        onChange: e => setName(e.target.value),
                                        placeholder: 'Name',
                                        className: 'border p-2 rounded',
                                        required: true,
                                    }),
                                    _jsx('input', {
                                        value: email,
                                        onChange: e => setEmail(e.target.value),
                                        placeholder: 'Email',
                                        type: 'email',
                                        className: 'border p-2 rounded',
                                        required: true,
                                    }),
                                    _jsx('input', {
                                        value: phone,
                                        onChange: e => setPhone(e.target.value),
                                        placeholder: 'Phone',
                                        className: 'border p-2 rounded',
                                    }),
                                    _jsx('input', {
                                        value: password,
                                        onChange: e =>
                                            setPassword(e.target.value),
                                        placeholder: 'Password',
                                        type: 'password',
                                        className: 'border p-2 rounded',
                                        required: true,
                                    }),
                                    _jsxs('div', {
                                        className:
                                            'flex justify-end gap-2 pt-2',
                                        children: [
                                            _jsx('button', {
                                                type: 'button',
                                                onClick: () =>
                                                    setShowCreate(false),
                                                className:
                                                    'px-4 py-2 rounded border',
                                                children: 'Cancel',
                                            }),
                                            _jsx('button', {
                                                type: 'submit',
                                                className:
                                                    'bg-blue-600 text-white px-4 py-2 rounded',
                                                children: 'Create',
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
        ],
    });
};
export default UserPage;
