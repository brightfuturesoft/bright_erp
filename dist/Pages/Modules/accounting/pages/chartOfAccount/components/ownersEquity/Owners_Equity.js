import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Gold_of_sold_table from '../expense/Gold_of_sold_table';
const OwnersEquity = () => {
    return _jsxs('div', {
        className: 'w-[92vw] md:w-full',
        children: [
            _jsx(Gold_of_sold_table, {
                entity: 'Business-Owner-Contribution-and-Drawing',
            }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'Retained-Earnings' }),
        ],
    });
};
export default OwnersEquity;
