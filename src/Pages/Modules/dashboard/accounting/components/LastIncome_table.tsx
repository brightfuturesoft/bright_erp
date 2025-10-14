interface Transaction {
    date: string;
    category: string;
    amount: string;
}

const transactions: Transaction[] = [
    { date: '2023-06-01', category: 'Groceries', amount: '200' },
    { date: '2023-06-02', category: 'Utilities', amount: '150' },
    { date: '2023-06-03', category: 'Rent', amount: '1200' },
    { date: '2023-06-04', category: 'Entertainment', amount: '100' },
    { date: '2023-06-05', category: 'Transport', amount: '50' },
    { date: '2023-06-06', category: 'Health', amount: '300' },
];

const LastIncome_table = ({}) => {
    return (
        <div className="mt-8">
            <div className="border-gray-300 dark:border-gray-900 shadow-[#dddada47] shadow-xl dark:shadow-none custom-scroll border rounded max-h-[400px] overflow-x-auto">
                <div className="bg-blue-700 p-2">Latest Income</div>
                <div className="dark:bg-light-dark shadow-md min-w-full">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-xs">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700 text-dark dark:text-gray-200">
                                    <th className="px-4 py-2 font-medium text-left">
                                        Date
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left">
                                        Category
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-[white] dark:bg-transparent text-gray-700 dark:text-gray-500">
                                {transactions.map((transaction, index) => (
                                    <tr
                                        key={index}
                                        className="border-gray-200 dark:border-gray-700 border-b"
                                    >
                                        <td className="px-4 py-2">
                                            {transaction.date}
                                        </td>
                                        <td className="px-4 py-2">
                                            {transaction.category}
                                        </td>
                                        <td className="px-4 py-2 flex items-center">
                                            <span className="kalpurush-font text-lg">
                                                ৳{' '}
                                            </span>
                                            {transaction.amount}
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

export default LastIncome_table;
