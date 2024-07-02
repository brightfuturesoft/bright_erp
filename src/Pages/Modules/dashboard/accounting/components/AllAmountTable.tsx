import React, { useState } from 'react';

interface User {
    _id: number;
    ac_name: string;
    amount: number;
    ac_type: 'bank' | 'cash' | 'mobile_bank';
}

const users: User[] = [
    { _id: 0, ac_name: 'Ferdaos', amount: 60000, ac_type: 'bank' },
    { _id: 1, ac_name: 'Nahid', amount: 60000, ac_type: 'cash' },
    { _id: 2, ac_name: 'SSD', amount: 60000, ac_type: 'mobile_bank' },
];

const TransactionsTable: React.FC<{ currencySymbol: string }> = ({ currencySymbol }) => {
    const [filter, setFilter] = useState<'all' | 'bank' | 'cash' | 'mobile_bank'>('all');

    const filteredUsers = filter === 'all' ? users : users.filter(user => user.ac_type === filter);

    return (
        <div className="mt-8">
            <div className="mb-4">
                <label className="mr-2">Filter by account type:</label>
                <select
                    className="border p-2 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'all' | 'bank' | 'cash' | 'mobile_bank')}
                >
                    <option value="all">All</option>
                    <option value="bank">Bank</option>
                    <option value="cash">Cash</option>
                    <option value="mobile_bank">Mobile Bank</option>
                </select>
            </div>
            <div className="overflow-x-auto border max-h-[400px] custom-scroll dark:border-gray-900 dark:shadow-none shadow-xl shadow-[#dddada47] border-gray-300 rounded">
                <div className='bg-blue-700 p-2 dark:text-gray-200'>
                    User Transactions
                </div>
                <div className="min-w-full dark:bg-light-dark shadow-md">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-xs">
                            <thead>
                                <tr className="dark:bg-gray-700 bg-gray-100 dark:text-gray-200 text-dark">
                                    <th className="px-4 py-2 text-left font-medium">ID</th>
                                    <th className="px-4 py-2 text-left font-medium">Account Name</th>
                                    <th className="px-4 py-2 text-left font-medium">Amount</th>
                                    <th className="px-4 py-2 text-left font-medium">Account Type</th>
                                </tr>
                            </thead>
                            <tbody className='dark:bg-transparent bg-[white] dark:text-gray-500 text-gray-700'>
                                {filteredUsers.map(user => (
                                    <tr key={user._id} className="border-b dark:border-gray-700 border-gray-200">
                                        <td className="px-4 py-2">{user._id}</td>
                                        <td className="px-4 py-2">{user.ac_name}</td>
                                        <td className="px-4 py-2">{currencySymbol}{user.amount}</td>
                                        <td className="px-4 py-2">{user.ac_type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionsTable;
