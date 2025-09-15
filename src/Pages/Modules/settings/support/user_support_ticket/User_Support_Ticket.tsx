import React, { useState } from 'react';

const dummyTicketsInitial = [
    {
        id: 2,
        userName: 'Md Foysal Mahmud',
        subject: 'adfasdf',
        status: 'Open',
        createdAt: 'Sep 11, 2025, 5:40:08 PM',
        department: '',
    },
    {
        id: 6,
        userName: 'fc',
        subject: 'ok chek',
        status: 'Open',
        createdAt: 'Dec 8, 2024, 8:40:52 PM',
        department: '',
    },
    {
        id: 5,
        userName: 'Mahadi Hasan',
        subject: 'Try to add',
        status: 'Open',
        createdAt: 'Dec 2, 2024, 6:49:01 AM',
        department: '',
    },
];

const departments = [
    'Technical Support',
    'Billing',
    'Account Management',
    'General Inquiry',
    'Bug Report',
    'Feature Request',
];

const User_Support_Ticket: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dummyTickets, setDummyTickets] = useState(dummyTicketsInitial);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState<number | null>(
        null
    );
    const [selectedDepartment, setSelectedDepartment] = useState('');

    // Filter tickets by search term
    const filteredTickets = dummyTickets.filter(
        ticket =>
            ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Dynamic counts
    const openCount = dummyTickets.filter(t => t.status === 'Open').length;
    const newCount = dummyTickets.filter(t => t.status === 'New').length;
    const closedCount = dummyTickets.filter(t => t.status === 'Closed').length;
    const allCount = dummyTickets.filter(
        t => t.status === 'Open' || t.status === 'New' || t.status === 'Closed'
    ).length;

    const openAssignModal = (ticketId: number) => {
        setSelectedTicketId(ticketId);
        setSelectedDepartment('');
        setShowAssignModal(true);
    };

    const closeAssignModal = () => {
        setShowAssignModal(false);
        setSelectedTicketId(null);
        setSelectedDepartment('');
    };

    const handleAssignSubmit = () => {
        if (selectedTicketId === null || selectedDepartment === '') {
            alert('Please select a department');
            return;
        }
        setDummyTickets(prev =>
            prev.map(ticket =>
                ticket.id === selectedTicketId
                    ? { ...ticket, department: selectedDepartment }
                    : ticket
            )
        );
        closeAssignModal();
    };

    const handleDelete = (ticketId: number) => {
        setDummyTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
    };

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateTicket, setUpdateTicket] = useState<any>(null);

    const openUpdateModal = (ticket: any) => {
        setUpdateTicket(ticket);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setUpdateTicket(null);
    };

    const handleUpdateChange = (field: string, value: string) => {
        setUpdateTicket((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleUpdateSubmit = () => {
        if (!updateTicket) return;
        setDummyTickets(prev =>
            prev.map(ticket =>
                ticket.id === updateTicket.id ? updateTicket : ticket
            )
        );
        closeUpdateModal();
    };

    return (
        <div className="p-6  min-h-screen">
            <h1 className="text-2xl font-semibold mb-6 text-black">
                User Ticket
            </h1>

            <style>
                {`
          /* Override text colors to black for all text inside this component */
          * {
            color: black !important;
          }
          /* Ensure buttons and inputs keep their styles but text is black */
          button, input, select, textarea {
            color: black !important;
          }
        `}
            </style>

            {/* Search Bar */}
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search for..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-gray-200 border border-gray-300 rounded-r px-3 py-2 hover:bg-gray-300">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                        />
                    </svg>
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded shadow p-4 text-center">
                    <div className="text-3xl font-bold">{openCount}</div>
                    <div>Open Ticket</div>
                </div>
                <div className="bg-white rounded shadow p-4 text-center">
                    <div className="text-3xl font-bold">{newCount}</div>
                    <div>New Ticket</div>
                </div>
                <div className="bg-white rounded shadow p-4 text-center">
                    <div className="text-3xl font-bold">{closedCount}</div>
                    <div>Closed Ticket</div>
                </div>
                <div className="bg-white rounded shadow p-4 text-center">
                    <div className="text-3xl font-bold">{allCount}</div>
                    <div>All Tickets</div>
                </div>
            </div>

            {/* Tickets Table */}
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                                User Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                                Subject
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                                Department
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredTickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    #{ticket.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 cursor-pointer">
                                    {ticket.userName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {ticket.subject}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {ticket.department || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            ticket.status === 'Open'
                                                ? 'bg-green-100 text-green-800'
                                                : ticket.status === 'Closed'
                                                  ? 'bg-red-100 text-red-800'
                                                  : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                                        {ticket.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {ticket.createdAt}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                    <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
                                        View
                                    </button>
                                    <button
                                        onClick={() =>
                                            openAssignModal(ticket.id)
                                        }
                                        className="px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition"
                                    >
                                        Assign
                                    </button>
                                    <button
                                        onClick={() => handleDelete(ticket.id)}
                                        className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => openUpdateModal(ticket)}
                                        className="px-3 py-1 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-white transition"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-2 bg-gray-100 py-4 rounded">
                <button className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-300">
                    {'<'}
                </button>
                <button className="px-3 py-1 border border-blue-600 bg-blue-600 text-white rounded">
                    1
                </button>
                <button className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-300">
                    {'>'}
                </button>
            </div>

            {/* Assign Modal */}
            {showAssignModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="max-w-md w-full rounded-lg p-6 bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-black">
                                Assign Department
                            </h3>
                            <button
                                onClick={closeAssignModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-black">
                                Department
                            </label>
                            <select
                                value={selectedDepartment}
                                onChange={e =>
                                    setSelectedDepartment(e.target.value)
                                }
                                className="w-full px-3 py-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Department</option>
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
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={closeAssignModal}
                                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAssignSubmit}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {showUpdateModal && updateTicket && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="max-w-md w-full rounded-lg p-6 bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-black">
                                Update Ticket
                            </h3>
                            <button
                                onClick={closeUpdateModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 font-medium text-black">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    value={updateTicket.userName}
                                    onChange={e =>
                                        handleUpdateChange(
                                            'userName',
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-black">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={updateTicket.subject}
                                    onChange={e =>
                                        handleUpdateChange(
                                            'subject',
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium text-black">
                                    Department
                                </label>
                                <select
                                    value={updateTicket.department}
                                    onChange={e =>
                                        handleUpdateChange(
                                            'department',
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Department</option>
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
                                <label className="block mb-2 font-medium text-black">
                                    Status
                                </label>
                                <select
                                    value={updateTicket.status}
                                    onChange={e =>
                                        handleUpdateChange(
                                            'status',
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                    <option value="New">New</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={closeUpdateModal}
                                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default User_Support_Ticket;
