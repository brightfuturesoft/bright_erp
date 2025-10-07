import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
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
const User_Support_Ticket = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dummyTickets, setDummyTickets] = useState(dummyTicketsInitial);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
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
    const openAssignModal = ticketId => {
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
    const handleDelete = ticketId => {
        setDummyTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
    };
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateTicket, setUpdateTicket] = useState(null);
    const openUpdateModal = ticket => {
        setUpdateTicket(ticket);
        setShowUpdateModal(true);
    };
    const closeUpdateModal = () => {
        setShowUpdateModal(false);
        setUpdateTicket(null);
    };
    const handleUpdateChange = (field, value) => {
        setUpdateTicket(prev => ({
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
    return _jsxs('div', {
        className: 'p-6  min-h-screen',
        children: [
            _jsx('h1', {
                className: 'text-2xl font-semibold mb-6 text-black',
                children: 'User Ticket',
            }),
            _jsx('style', {
                children: `
          /* Override text colors to black for all text inside this component */
          * {
            color: black !important;
          }
          /* Ensure buttons and inputs keep their styles but text is black */
          button, input, select, textarea {
            color: black !important;
          }
        `,
            }),
            _jsxs('div', {
                className: 'flex justify-end mb-4',
                children: [
                    _jsx('input', {
                        type: 'text',
                        placeholder: 'Search for...',
                        value: searchTerm,
                        onChange: e => setSearchTerm(e.target.value),
                        className:
                            'border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    }),
                    _jsx('button', {
                        className:
                            'bg-gray-200 border border-gray-300 rounded-r px-3 py-2 hover:bg-gray-300',
                        children: _jsx('svg', {
                            xmlns: 'http://www.w3.org/2000/svg',
                            className: 'h-5 w-5 text-gray-600',
                            fill: 'none',
                            viewBox: '0 0 24 24',
                            stroke: 'currentColor',
                            children: _jsx('path', {
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeWidth: 2,
                                d: 'M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z',
                            }),
                        }),
                    }),
                ],
            }),
            _jsxs('div', {
                className: 'grid grid-cols-4 gap-4 mb-6',
                children: [
                    _jsxs('div', {
                        className: 'bg-white rounded shadow p-4 text-center',
                        children: [
                            _jsx('div', {
                                className: 'text-3xl font-bold',
                                children: openCount,
                            }),
                            _jsx('div', { children: 'Open Ticket' }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'bg-white rounded shadow p-4 text-center',
                        children: [
                            _jsx('div', {
                                className: 'text-3xl font-bold',
                                children: newCount,
                            }),
                            _jsx('div', { children: 'New Ticket' }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'bg-white rounded shadow p-4 text-center',
                        children: [
                            _jsx('div', {
                                className: 'text-3xl font-bold',
                                children: closedCount,
                            }),
                            _jsx('div', { children: 'Closed Ticket' }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'bg-white rounded shadow p-4 text-center',
                        children: [
                            _jsx('div', {
                                className: 'text-3xl font-bold',
                                children: allCount,
                            }),
                            _jsx('div', { children: 'All Tickets' }),
                        ],
                    }),
                ],
            }),
            _jsx('div', {
                className: 'overflow-x-auto bg-white rounded shadow',
                children: _jsxs('table', {
                    className: 'min-w-full divide-y divide-gray-200',
                    children: [
                        _jsx('thead', {
                            className: 'bg-gray-100',
                            children: _jsxs('tr', {
                                children: [
                                    _jsx('th', {
                                        className:
                                            'px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider',
                                        children: 'ID',
                                    }),
                                    _jsx('th', {
                                        className:
                                            'px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider',
                                        children: 'User Name',
                                    }),
                                    _jsx('th', {
                                        className:
                                            'px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider',
                                        children: 'Subject',
                                    }),
                                    _jsx('th', {
                                        className:
                                            'px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider',
                                        children: 'Department',
                                    }),
                                    _jsx('th', {
                                        className:
                                            'px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider',
                                        children: 'Status',
                                    }),
                                    _jsx('th', {
                                        className:
                                            'px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider',
                                        children: 'Created At',
                                    }),
                                    _jsx('th', {
                                        className:
                                            'px-6 py-3 text-left text-xs font-semibold text-blue-600 uppercase tracking-wider',
                                        children: 'Action',
                                    }),
                                ],
                            }),
                        }),
                        _jsx('tbody', {
                            className: 'divide-y divide-gray-200',
                            children: filteredTickets.map(ticket =>
                                _jsxs(
                                    'tr',
                                    {
                                        children: [
                                            _jsxs('td', {
                                                className:
                                                    'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900',
                                                children: ['#', ticket.id],
                                            }),
                                            _jsx('td', {
                                                className:
                                                    'px-6 py-4 whitespace-nowrap text-sm text-blue-700 cursor-pointer',
                                                children: ticket.userName,
                                            }),
                                            _jsx('td', {
                                                className:
                                                    'px-6 py-4 whitespace-nowrap text-sm text-gray-700',
                                                children: ticket.subject,
                                            }),
                                            _jsx('td', {
                                                className:
                                                    'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                                                children:
                                                    ticket.department || 'N/A',
                                            }),
                                            _jsx('td', {
                                                className:
                                                    'px-6 py-4 whitespace-nowrap',
                                                children: _jsx('span', {
                                                    className: `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        ticket.status === 'Open'
                                                            ? 'bg-green-100 text-green-800'
                                                            : ticket.status ===
                                                                'Closed'
                                                              ? 'bg-red-100 text-red-800'
                                                              : 'bg-yellow-100 text-yellow-800'
                                                    }`,
                                                    children: ticket.status,
                                                }),
                                            }),
                                            _jsx('td', {
                                                className:
                                                    'px-6 py-4 whitespace-nowrap text-sm text-gray-600',
                                                children: ticket.createdAt,
                                            }),
                                            _jsxs('td', {
                                                className:
                                                    'px-6 py-4 whitespace-nowrap space-x-2',
                                                children: [
                                                    _jsx('button', {
                                                        className:
                                                            'px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition',
                                                        children: 'View',
                                                    }),
                                                    _jsx('button', {
                                                        onClick: () =>
                                                            openAssignModal(
                                                                ticket.id
                                                            ),
                                                        className:
                                                            'px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition',
                                                        children: 'Assign',
                                                    }),
                                                    _jsx('button', {
                                                        onClick: () =>
                                                            handleDelete(
                                                                ticket.id
                                                            ),
                                                        className:
                                                            'px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition',
                                                        children: 'Delete',
                                                    }),
                                                    _jsx('button', {
                                                        onClick: () =>
                                                            openUpdateModal(
                                                                ticket
                                                            ),
                                                        className:
                                                            'px-3 py-1 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-white transition',
                                                        children: 'Update',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    },
                                    ticket.id
                                )
                            ),
                        }),
                    ],
                }),
            }),
            _jsxs('div', {
                className:
                    'flex justify-center items-center mt-6 space-x-2 bg-gray-100 py-4 rounded',
                children: [
                    _jsx('button', {
                        className:
                            'px-3 py-1 border border-gray-400 rounded hover:bg-gray-300',
                        children: '<',
                    }),
                    _jsx('button', {
                        className:
                            'px-3 py-1 border border-blue-600 bg-blue-600 text-white rounded',
                        children: '1',
                    }),
                    _jsx('button', {
                        className:
                            'px-3 py-1 border border-gray-400 rounded hover:bg-gray-300',
                        children: '>',
                    }),
                ],
            }),
            showAssignModal &&
                _jsx('div', {
                    className:
                        'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50',
                    children: _jsxs('div', {
                        className: 'max-w-md w-full rounded-lg p-6 bg-white',
                        children: [
                            _jsxs('div', {
                                className:
                                    'flex justify-between items-center mb-4',
                                children: [
                                    _jsx('h3', {
                                        className:
                                            'text-lg font-medium text-black',
                                        children: 'Assign Department',
                                    }),
                                    _jsx('button', {
                                        onClick: closeAssignModal,
                                        className:
                                            'text-gray-400 hover:text-gray-600',
                                        children: '\u2715',
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                children: [
                                    _jsx('label', {
                                        className:
                                            'block mb-2 font-medium text-black',
                                        children: 'Department',
                                    }),
                                    _jsxs('select', {
                                        value: selectedDepartment,
                                        onChange: e =>
                                            setSelectedDepartment(
                                                e.target.value
                                            ),
                                        className:
                                            'w-full px-3 py-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500',
                                        children: [
                                            _jsx('option', {
                                                value: '',
                                                children: 'Select Department',
                                            }),
                                            departments.map(dept =>
                                                _jsx(
                                                    'option',
                                                    {
                                                        value: dept,
                                                        children: dept,
                                                    },
                                                    dept
                                                )
                                            ),
                                        ],
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'mt-6 flex justify-end space-x-3',
                                children: [
                                    _jsx('button', {
                                        onClick: closeAssignModal,
                                        className:
                                            'px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50',
                                        children: 'Cancel',
                                    }),
                                    _jsx('button', {
                                        onClick: handleAssignSubmit,
                                        className:
                                            'px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700',
                                        children: 'Assign',
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
            showUpdateModal &&
                updateTicket &&
                _jsx('div', {
                    className:
                        'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50',
                    children: _jsxs('div', {
                        className: 'max-w-md w-full rounded-lg p-6 bg-white',
                        children: [
                            _jsxs('div', {
                                className:
                                    'flex justify-between items-center mb-4',
                                children: [
                                    _jsx('h3', {
                                        className:
                                            'text-lg font-medium text-black',
                                        children: 'Update Ticket',
                                    }),
                                    _jsx('button', {
                                        onClick: closeUpdateModal,
                                        className:
                                            'text-gray-400 hover:text-gray-600',
                                        children: '\u2715',
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'space-y-4',
                                children: [
                                    _jsxs('div', {
                                        children: [
                                            _jsx('label', {
                                                className:
                                                    'block mb-2 font-medium text-black',
                                                children: 'User Name',
                                            }),
                                            _jsx('input', {
                                                type: 'text',
                                                value: updateTicket.userName,
                                                onChange: e =>
                                                    handleUpdateChange(
                                                        'userName',
                                                        e.target.value
                                                    ),
                                                className:
                                                    'w-full px-3 py-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500',
                                            }),
                                        ],
                                    }),
                                    _jsxs('div', {
                                        children: [
                                            _jsx('label', {
                                                className:
                                                    'block mb-2 font-medium text-black',
                                                children: 'Subject',
                                            }),
                                            _jsx('input', {
                                                type: 'text',
                                                value: updateTicket.subject,
                                                onChange: e =>
                                                    handleUpdateChange(
                                                        'subject',
                                                        e.target.value
                                                    ),
                                                className:
                                                    'w-full px-3 py-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500',
                                            }),
                                        ],
                                    }),
                                    _jsxs('div', {
                                        children: [
                                            _jsx('label', {
                                                className:
                                                    'block mb-2 font-medium text-black',
                                                children: 'Department',
                                            }),
                                            _jsxs('select', {
                                                value: updateTicket.department,
                                                onChange: e =>
                                                    handleUpdateChange(
                                                        'department',
                                                        e.target.value
                                                    ),
                                                className:
                                                    'w-full px-3 py-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500',
                                                children: [
                                                    _jsx('option', {
                                                        value: '',
                                                        children:
                                                            'Select Department',
                                                    }),
                                                    departments.map(dept =>
                                                        _jsx(
                                                            'option',
                                                            {
                                                                value: dept,
                                                                children: dept,
                                                            },
                                                            dept
                                                        )
                                                    ),
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsxs('div', {
                                        children: [
                                            _jsx('label', {
                                                className:
                                                    'block mb-2 font-medium text-black',
                                                children: 'Status',
                                            }),
                                            _jsxs('select', {
                                                value: updateTicket.status,
                                                onChange: e =>
                                                    handleUpdateChange(
                                                        'status',
                                                        e.target.value
                                                    ),
                                                className:
                                                    'w-full px-3 py-2 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500',
                                                children: [
                                                    _jsx('option', {
                                                        value: 'Open',
                                                        children: 'Open',
                                                    }),
                                                    _jsx('option', {
                                                        value: 'Closed',
                                                        children: 'Closed',
                                                    }),
                                                    _jsx('option', {
                                                        value: 'New',
                                                        children: 'New',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'mt-6 flex justify-end space-x-3',
                                children: [
                                    _jsx('button', {
                                        onClick: closeUpdateModal,
                                        className:
                                            'px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50',
                                        children: 'Cancel',
                                    }),
                                    _jsx('button', {
                                        onClick: handleUpdateSubmit,
                                        className:
                                            'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700',
                                        children: 'Update',
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
        ],
    });
};
export default User_Support_Ticket;
