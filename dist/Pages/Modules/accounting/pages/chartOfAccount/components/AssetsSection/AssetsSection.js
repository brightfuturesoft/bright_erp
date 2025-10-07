import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Gold_of_sold_table from '../expense/Gold_of_sold_table';
const AssetsSection = () => {
    return _jsxs('div', {
        className: 'w-[92vw] md:w-full',
        children: [
            _jsx(Gold_of_sold_table, { entity: 'bank' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'cash' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'current-assets' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'depreciation' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'inventory' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'mobile-bank' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'money-transit' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'longterm-asset' }),
            _jsx('br', {}),
            _jsx(Gold_of_sold_table, { entity: 'shortterm-asset' }),
        ],
    });
};
export default AssetsSection;
