import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
const users = [
    { _id: 0, ac_name: 'Ferdaos', amount: 60000, ac_type: 'bank' },
    { _id: 1, ac_name: 'Nahid', amount: 60000, ac_type: 'cash' },
    { _id: 2, ac_name: 'SSD', amount: 60000, ac_type: 'mobile_bank' },
];
const TransactionsTable = () => {
    const [filter, setFilter] = useState('all');
    const filteredUsers =
        filter === 'all'
            ? users
            : users.filter(user => user.ac_type === filter);
    return _jsxs('div', {
        className: 'mt-8',
        children: [
            _jsxs('div', {
                className: 'mb-4',
                children: [
                    _jsx('label', {
                        className: 'mr-2',
                        children: 'Filter by account type:',
                    }),
                    _jsxs('select', {
                        className:
                            'dark:border-gray-700 dark:bg-gray-800 p-2 border dark:text-gray-200',
                        value: filter,
                        onChange: e => setFilter(e.target.value),
                        children: [
                            _jsx('option', { value: 'all', children: 'All' }),
                            _jsx('option', { value: 'bank', children: 'Bank' }),
                            _jsx('option', { value: 'cash', children: 'Cash' }),
                            _jsx('option', {
                                value: 'mobile_bank',
                                children: 'Mobile Bank',
                            }),
                        ],
                    }),
                ],
            }),
            _jsxs('div', {
                className:
                    'border-gray-300 dark:border-gray-900 shadow-[#dddada47] shadow-xl dark:shadow-none custom-scroll border rounded max-h-[400px] overflow-x-auto',
                children: [
                    _jsx('div', {
                        className: 'bg-blue-700 p-2 dark:text-gray-200',
                        children: 'User Transactions',
                    }),
                    _jsx('div', {
                        className: 'dark:bg-light-dark shadow-md min-w-full',
                        children: _jsx('div', {
                            className: 'overflow-x-auto',
                            children: _jsxs('table', {
                                className: 'min-w-full text-xs',
                                children: [
                                    _jsx('thead', {
                                        children: _jsxs('tr', {
                                            className:
                                                'bg-gray-100 dark:bg-gray-700 text-dark dark:text-gray-200',
                                            children: [
                                                _jsx('th', {
                                                    className:
                                                        'px-4 py-2 font-medium text-left',
                                                    children: 'ID',
                                                }),
                                                _jsx('th', {
                                                    className:
                                                        'px-4 py-2 font-medium text-left',
                                                    children: 'Account Name',
                                                }),
                                                _jsx('th', {
                                                    className:
                                                        'px-4 py-2 font-medium text-left',
                                                    children: 'Amount',
                                                }),
                                                _jsx('th', {
                                                    className:
                                                        'px-4 py-2 font-medium text-left',
                                                    children: 'Account Type',
                                                }),
                                            ],
                                        }),
                                    }),
                                    _jsx('tbody', {
                                        className:
                                            'bg-[white] dark:bg-transparent text-gray-700 dark:text-gray-500',
                                        children: filteredUsers.map(user =>
                                            _jsxs(
                                                'tr',
                                                {
                                                    className:
                                                        'border-gray-200 dark:border-gray-700 border-b',
                                                    children: [
                                                        _jsx('td', {
                                                            className:
                                                                'px-4 py-2',
                                                            children: user._id,
                                                        }),
                                                        _jsx('td', {
                                                            className:
                                                                'px-4 py-2',
                                                            children:
                                                                user.ac_name,
                                                        }),
                                                        _jsxs('td', {
                                                            className:
                                                                'px-4 py-2 flex items-center',
                                                            children: [
                                                                _jsxs('span', {
                                                                    className:
                                                                        'kalpurush-font text-lg',
                                                                    children: [
                                                                        '\u09F3',
                                                                        ' ',
                                                                    ],
                                                                }),
                                                                user.amount,
                                                            ],
                                                        }),
                                                        _jsx('td', {
                                                            className:
                                                                'px-4 py-2',
                                                            children:
                                                                user.ac_type,
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
        ],
    });
};
export default TransactionsTable;
