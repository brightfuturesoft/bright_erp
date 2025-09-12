import React, { useState, useEffect, useContext } from 'react';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { Erp_context } from '@/provider/ErpContext';

interface User {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    status: string;
}

interface SupportTicket {
    _id: string;
    department: string;
    subject: string;
    description: string;
    assigned_users: User[];
    status: 'open' | 'in_progress' | 'closed';
    created_by: string;
    created_at: string;
    updated_at: string;
}

const departments = [
    'Technical Support',
    'Billing',
    'Account Management',
    'General Inquiry',
    'Bug Report',
    'Feature Request',
];

const KnowledgeBaseSupportTicket: React.FC = () => {
    const context = useContext(Erp_context);
    const currentUser = context?.user;
    const workspace: any = context?.workspace;

    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem('theme') === 'dark'
    );

    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    // Modal states
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateTicket, setUpdateTicket] = useState<SupportTicket | null>(
        null
    );

    // Form states
    const [formData, setFormData] = useState({
        department: '',
        subject: '',
        description: '',
        assigned_users: [] as string[],
    });

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

    // Fetch data when workspace is loaded
    useEffect(() => {
        if (workspace?._id) {
            fetchUsers();
            fetchTickets();
        }
    }, [workspace?._id]);

    const fetchUsers = async () => {
        try {
            if (!workspace?._id) return;

            const response = await fetch(
                `${getBaseUrl}/settings/user-role/users-with-roles?workspace_id=${workspace._id}`,
                {
                    headers: {
                        Authorization: currentUser?._id || '',
                    },
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

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${getBaseUrl}/settings/support/tickets?workspace_id=${workspace?._id || ''}`,
                {
                    headers: {
                        Authorization: currentUser?._id || '',
                    },
                    credentials: 'include',
                }
            );
            const data = await response.json();

            if (!data.error) {
                setTickets(data.data.tickets);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to fetch tickets');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.department.trim()) {
            setError('Department is required');
            return;
        }

        if (!formData.subject.trim()) {
            setError('Subject is required');
            return;
        }

        if (!formData.description.trim()) {
            setError('Description is required');
            return;
        }

        if (formData.assigned_users.length === 0) {
            setError('At least one user must be assigned');
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
                `${getBaseUrl}/settings/support/tickets`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: currentUser?._id || '',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        ...formData,
                        created_by: currentUser._id,
                        workspace_id: workspace._id,
                    }),
                }
            );

            const data = await response.json();

            if (!data.error) {
                setSuccess('Support ticket created successfully');
                setShowCreateModal(false);
                setFormData({
                    department: '',
                    subject: '',
                    description: '',
                    assigned_users: [],
                });
                fetchTickets();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to create support ticket');
        } finally {
            setLoading(false);
        }
    };

    const handleUserToggle = (userId: string) => {
        setFormData(prev => ({
            ...prev,
            assigned_users: prev.assigned_users.includes(userId)
                ? prev.assigned_users.filter(id => id !== userId)
                : [...prev.assigned_users, userId],
        }));
    };

    const openUpdateModal = (ticket: SupportTicket) => {
        setUpdateTicket(ticket);
        setFormData({
            department: ticket.department,
            subject: ticket.subject,
            description: ticket.description,
            assigned_users: ticket.assigned_users.map(u => u._id),
        });
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setUpdateTicket(null);
    };

    const handleUpdateTicket = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!updateTicket) return;

        if (!formData.department.trim()) {
            setError('Department is required');
            return;
        }

        if (!formData.subject.trim()) {
            setError('Subject is required');
            return;
        }

        if (!formData.description.trim()) {
            setError('Description is required');
            return;
        }

        if (formData.assigned_users.length === 0) {
            setError('At least one user must be assigned');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(
                `${getBaseUrl}/settings/support/tickets/${updateTicket._id}?workspace_id=${workspace._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: currentUser?._id || '',
                    },
                    credentials: 'include',
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!data.error) {
                setSuccess('Support ticket updated successfully');
                setShowUpdateModal(false);
                setUpdateTicket(null);
                fetchTickets();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to update support ticket');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (ticketId: string) => {
        if (!confirm('Are you sure you want to delete this ticket?')) return;

        try {
            setLoading(true);
            const response = await fetch(
                `${getBaseUrl}/settings/support/tickets/${ticketId}?workspace_id=${workspace?._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: currentUser?._id || '',
                    },
                    credentials: 'include',
                }
            );

            const data = await response.json();

            if (!data.error) {
                setSuccess('Support ticket deleted successfully');
                fetchTickets();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to delete support ticket');
        } finally {
            setLoading(false);
        }
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
                        Knowledge Base Support Tickets
                    </h1>
                    <p
                        className={`mt-2 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                    >
                        Create and manage support tickets for your team
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

                {/* Action Buttons */}
                <div className="mb-6">
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                        <span>📋</span>
                        <span>Open Ticket</span>
                    </button>
                </div>

                {/* Tickets Table */}
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
                                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
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
                                        Department
                                    </th>
                                    <th
                                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                            isDarkMode
                                                ? 'text-gray-300'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        Subject
                                    </th>
                                    <th
                                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                            isDarkMode
                                                ? 'text-gray-300'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        Assigned Users
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
                                        Created At
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
                                {tickets.map(ticket => (
                                    <tr
                                        key={ticket._id}
                                        className={
                                            isDarkMode
                                                ? 'hover:bg-gray-700'
                                                : 'hover:bg-gray-50'
                                        }
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div
                                                className={`text-sm font-medium ${
                                                    isDarkMode
                                                        ? 'text-gray-200'
                                                        : 'text-gray-900'
                                                }`}
                                            >
                                                {ticket.department}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div
                                                className={`text-sm font-medium ${
                                                    isDarkMode
                                                        ? 'text-gray-200'
                                                        : 'text-gray-900'
                                                }`}
                                            >
                                                {ticket.subject}
                                            </div>
                                            <div
                                                className={`text-sm ${
                                                    isDarkMode
                                                        ? 'text-gray-400'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                {ticket.description.length > 50
                                                    ? `${ticket.description.substring(0, 50)}...`
                                                    : ticket.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {ticket.assigned_users
                                                    .slice(0, 2)
                                                    .map(user => (
                                                        <span
                                                            key={user._id}
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                isDarkMode
                                                                    ? 'bg-blue-900 text-blue-300'
                                                                    : 'bg-blue-100 text-blue-800'
                                                            }`}
                                                        >
                                                            {user.name}
                                                        </span>
                                                    ))}
                                                {ticket.assigned_users.length >
                                                    2 && (
                                                    <span
                                                        className={`text-xs ${
                                                            isDarkMode
                                                                ? 'text-gray-400'
                                                                : 'text-gray-500'
                                                        }`}
                                                    >
                                                        +
                                                        {ticket.assigned_users
                                                            .length - 2}{' '}
                                                        more
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    ticket.status === 'open'
                                                        ? isDarkMode
                                                            ? 'bg-green-900 text-green-300'
                                                            : 'bg-green-100 text-green-800'
                                                        : ticket.status ===
                                                            'in_progress'
                                                          ? isDarkMode
                                                              ? 'bg-yellow-900 text-yellow-300'
                                                              : 'bg-yellow-100 text-yellow-800'
                                                          : isDarkMode
                                                            ? 'bg-gray-900 text-gray-300'
                                                            : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {ticket.status.replace(
                                                    '_',
                                                    ' '
                                                )}
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
                                                {new Date(
                                                    ticket.created_at
                                                ).toLocaleDateString()}
                                            </div>
                                            <div
                                                className={`text-sm ${
                                                    isDarkMode
                                                        ? 'text-gray-400'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                {new Date(
                                                    ticket.created_at
                                                ).toLocaleTimeString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                            <button
                                                onClick={() =>
                                                    openUpdateModal(ticket)
                                                }
                                                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(ticket._id)
                                                }
                                                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {tickets.length === 0 && !loading && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className={`px-6 py-8 text-center ${
                                                isDarkMode
                                                    ? 'text-gray-400'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            No support tickets found. Create
                                            your first ticket using the "Open
                                            Ticket" button.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create Ticket Modal */}
            {showCreateModal && (
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
                                    Create Support Ticket
                                </h3>
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}
                                >
                                    ✕
                                </button>
                            </div>

                            <form
                                onSubmit={handleCreateTicket}
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
                                        Department *
                                    </label>
                                    <select
                                        value={formData.department}
                                        onChange={e =>
                                            setFormData(prev => ({
                                                ...prev,
                                                department: e.target.value,
                                            }))
                                        }
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        required
                                    >
                                        <option value="">
                                            Select Department
                                        </option>
                                        {departments.map(dept => (
                                            <option
                                                key={dept}
                                                value={dept}
                                            >
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        className={`block text-sm font-medium mb-2 ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={e =>
                                            setFormData(prev => ({
                                                ...prev,
                                                subject: e.target.value,
                                            }))
                                        }
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter ticket subject"
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
                                        Assign Users *
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                                        {users.map(user => (
                                            <label
                                                key={user._id}
                                                className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                                                    formData.assigned_users.includes(
                                                        user._id
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
                                                    checked={formData.assigned_users.includes(
                                                        user._id
                                                    )}
                                                    onChange={() =>
                                                        handleUserToggle(
                                                            user._id
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
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className={`block text-sm font-medium mb-2 ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        Description *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e =>
                                            setFormData(prev => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        rows={4}
                                        placeholder="Describe the issue in detail"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCreateModal(false)
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
                                            : 'Create Ticket'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Ticket Modal */}
            {showUpdateModal && (
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
                                    Update Support Ticket
                                </h3>
                                <button
                                    onClick={closeUpdateModal}
                                    className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}
                                >
                                    ✕
                                </button>
                            </div>

                            <form
                                onSubmit={handleUpdateTicket}
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
                                        Department *
                                    </label>
                                    <select
                                        value={formData.department}
                                        onChange={e =>
                                            setFormData(prev => ({
                                                ...prev,
                                                department: e.target.value,
                                            }))
                                        }
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        required
                                    >
                                        <option value="">
                                            Select Department
                                        </option>
                                        {departments.map(dept => (
                                            <option
                                                key={dept}
                                                value={dept}
                                            >
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        className={`block text-sm font-medium mb-2 ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={e =>
                                            setFormData(prev => ({
                                                ...prev,
                                                subject: e.target.value,
                                            }))
                                        }
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter ticket subject"
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
                                        Assign Users *
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                                        {users.map(user => (
                                            <label
                                                key={user._id}
                                                className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                                                    formData.assigned_users.includes(
                                                        user._id
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
                                                    checked={formData.assigned_users.includes(
                                                        user._id
                                                    )}
                                                    onChange={() =>
                                                        handleUserToggle(
                                                            user._id
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
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className={`block text-sm font-medium mb-2 ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        Description *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e =>
                                            setFormData(prev => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                        className={`w-full px-3 py-2 rounded-lg border ${
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        rows={4}
                                        placeholder="Describe the issue in detail"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeUpdateModal}
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
                                            : 'Update Ticket'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KnowledgeBaseSupportTicket;
