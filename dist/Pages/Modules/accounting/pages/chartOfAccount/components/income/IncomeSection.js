import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Gold_of_sold_table from '../expense/Gold_of_sold_table';
const IncomeSection = () => {
    return _jsxs('div', {
        className: 'w-[92vw] md:w-full',
        children: [
            _jsx(Gold_of_sold_table, { entity: 'income-discount' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'foreign' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'income' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'other-income' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, {
                entity: 'income-uncategorized-expense',
            }),
        ],
    });
};
export default IncomeSection;
