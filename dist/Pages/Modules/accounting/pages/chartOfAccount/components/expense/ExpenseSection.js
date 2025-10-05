import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Gold_of_sold_table from './Gold_of_sold_table';
const ExpenseSection = () => {
    return _jsxs('div', {
        className: 'w-[92vw] md:w-full',
        children: [
            _jsx(Gold_of_sold_table, { entity: 'expense' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'discount' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'operating-expense' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'payment-processing' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'payroll-expense' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'uncategorized-expense' }),
            _jsx('br', {}),
        ],
    });
};
export default ExpenseSection;
