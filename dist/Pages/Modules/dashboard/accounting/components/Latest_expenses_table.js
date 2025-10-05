import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const transactions = [
    { date: '2023-06-01', category: 'Groceries', amount: '200' },
    { date: '2023-06-02', category: 'Utilities', amount: '150' },
    { date: '2023-06-03', category: 'Rent', amount: '1200' },
    { date: '2023-06-04', category: 'Entertainment', amount: '100' },
    { date: '2023-06-05', category: 'Transport', amount: '50' },
    { date: '2023-06-06', category: 'Health', amount: '300' },
];
const Latest_expenses_table = () => {
    return _jsx('div', {
        className: 'mt-8',
        children: _jsxs('div', {
            className:
                'border-gray-300 dark:border-gray-900 shadow-[#dddada47] shadow-xl dark:shadow-none custom-scroll border rounded max-h-[400px] overflow-x-auto',
            children: [
                _jsx('div', {
                    className: 'bg-blue-700 p-2',
                    children: 'Latest Expenses',
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
                                                children: 'Date',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'px-4 py-2 font-medium text-left',
                                                children: 'Category',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'px-4 py-2 font-medium text-left',
                                                children: 'Amount',
                                            }),
                                        ],
                                    }),
                                }),
                                _jsx('tbody', {
                                    className:
                                        'bg-[white] dark:bg-transparent text-gray-700 dark:text-gray-500',
                                    children: transactions.map(
                                        (transaction, index) =>
                                            _jsxs(
                                                'tr',
                                                {
                                                    className:
                                                        'border-gray-200 dark:border-gray-700 border-b',
                                                    children: [
                                                        _jsx('td', {
                                                            className:
                                                                'px-4 py-2',
                                                            children:
                                                                transaction.date,
                                                        }),
                                                        _jsx('td', {
                                                            className:
                                                                'px-4 py-2',
                                                            children:
                                                                transaction.category,
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
                                                                transaction.amount,
                                                            ],
                                                        }),
                                                    ],
                                                },
                                                index
                                            )
                                    ),
                                }),
                            ],
                        }),
                    }),
                }),
            ],
        }),
    });
};
export default Latest_expenses_table;
