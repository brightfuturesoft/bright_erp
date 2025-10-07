import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Gold_of_sold_table from '../expense/Gold_of_sold_table';
const LiabilitiesSection = () => {
    return _jsxs('div', {
        className: 'w-[92vw] md:w-full',
        children: [
            _jsx(Gold_of_sold_table, { entity: 'credit-card' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, {
                entity: 'customer-prepayments-and-customer-credits',
            }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'due-for-payroll' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'Loan-and-Line-of-Credit' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'Other-Short-Term-Liability' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'sales-taxes' }),
            _jsx('br', {}),
        ],
    });
};
export default LiabilitiesSection;
