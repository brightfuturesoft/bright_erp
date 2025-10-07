import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import ItemsHeader from './components/ItemsHeader';
import ItemsFilterTable from './components/ItemsFilter';
const Items = () => {
    return _jsxs('div', {
        children: [
            _jsx(ItemsHeader, {}),
            _jsx('hr', { className: 'my-4' }),
            _jsx(ItemsFilterTable, {}),
        ],
    });
};
export default Items;
