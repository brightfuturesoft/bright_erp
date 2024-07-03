import { useState } from 'react';

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

const TransactionsTable: React.FC<{ currencySymbol: string }> = ({
    currencySymbol,
}) => {
    const [filter, setFilter] = useState<
        'all' | 'bank' | 'cash' | 'mobile_bank'
    >('all');

    const filteredUsers =
        filter === 'all'
            ? users
            : users.filter(user => user.ac_type === filter);

    return (
        <div className="mt-8">
            <div className="mb-4">
                <label className="mr-2">Filter by account type:</label>
                <select
                    className="dark:border-gray-700 dark:bg-gray-800 p-2 border dark:text-gray-200"
                    value={filter}
                    onChange={e =>
                        setFilter(
                            e.target.value as
                                | 'all'
                                | 'bank'
                                | 'cash'
                                | 'mobile_bank'
                        )
                    }
                >
                    <option value="all">All</option>
                    <option value="bank">Bank</option>
                    <option value="cash">Cash</option>
                    <option value="mobile_bank">Mobile Bank</option>
                </select>
            </div>
            <div className="border-gray-300 dark:border-gray-900 shadow-[#dddada47] shadow-xl dark:shadow-none custom-scroll border rounded max-h-[400px] overflow-x-auto">
                <div className="bg-blue-700 p-2 dark:text-gray-200">
                    User Transactions
                </div>
                <div className="dark:bg-light-dark shadow-md min-w-full">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-xs">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700 text-dark dark:text-gray-200">
                                    <th className="px-4 py-2 font-medium text-left">
                                        ID
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left">
                                        Account Name
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left">
                                        Amount
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left">
                                        Account Type
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-[white] dark:bg-transparent text-gray-700 dark:text-gray-500">
                                {filteredUsers.map(user => (
                                    <tr
                                        key={user._id}
                                        className="border-gray-200 dark:border-gray-700 border-b"
                                    >
                                        <td className="px-4 py-2">
                                            {user._id}
                                        </td>
                                        <td className="px-4 py-2">
                                            {user.ac_name}
                                        </td>
                                        <td className="px-4 py-2">
                                            {currencySymbol}
                                            {user.amount}
                                        </td>
                                        <td className="px-4 py-2">
                                            {user.ac_type}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsTable;
