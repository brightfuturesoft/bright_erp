import React from 'react';

interface Transaction {
    date: string;
    category: string;
    amount: string;
}

interface TransactionsTableProps {
    currencySymbol: string;
}

const transactions: Transaction[] = [
    { date: '2023-06-01', category: 'Groceries', amount: '200' },
    { date: '2023-06-02', category: 'Utilities', amount: '150' },
    { date: '2023-06-03', category: 'Rent', amount: '1200' },
    { date: '2023-06-04', category: 'Entertainment', amount: '100' },
    { date: '2023-06-05', category: 'Transport', amount: '50' },
    { date: '2023-06-06', category: 'Health', amount: '300' },
];

const LatestExpensesTable: React.FC<TransactionsTableProps> = ({ currencySymbol }) => {
    return (
        <div className="mt-8">
            <div className="overflow-x-auto border max-h-[400px] custom-scroll dark:border-gray-900 dark:shadow-none shadow-xl shadow-[#dddada47] border-gray-300 rounded">
                <div className='bg-blue-700 p-2'>
                    Latest Expenses
                </div>
                <div className="min-w-full dark:bg-light-dark shadow-md ">

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-xs">
                            <thead>
                                <tr className="dark:bg-gray-700 bg-gray-100 dark:text-gray-200 text-dark">
                                    <th className="px-4 py-2 text-left  font-medium ">Date</th>
                                    <th className="px-4 py-2 text-left  font-medium ">Category</th>
                                    <th className="px-4 py-2 text-left  font-medium ">Amount</th>
                                </tr>
                            </thead>
                            <tbody className='dark:bg-transparent bg-[white] dark:text-gray-500 text-gray-700'>
                                {transactions.map((transaction, index) => (
                                    <tr key={index} className="border-b dark:border-gray-700 border-gray-200">
                                        <td className="px-4 py-2">{transaction.date}</td>
                                        <td className="px-4 py-2">{transaction.category}</td>
                                        <td className="px-4 py-2">{currencySymbol}{transaction.amount}</td>
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

export default LatestExpensesTable;
