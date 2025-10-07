import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const TableController = ({ searchValue, setSearchValue }) => {
    const onSearch = value => {
        console.log('search', value);
    };
    return _jsx('div', {
        className: 'flex justify-end my-4',
        children: _jsxs('form', {
            onSubmit: e => {
                e.preventDefault();
                onSearch(searchValue);
            },
            className: 'flex items-center',
            children: [
                _jsx('input', {
                    type: 'text',
                    className:
                        'w-[400px] h-[40px] text-black border border-gray-300 rounded-l-md pl-3 text-base outline-none bg-white',
                    placeholder: 'input search text',
                    value: searchValue,
                    onChange: e => setSearchValue(e.target.value),
                }),
                _jsx('button', {
                    type: 'submit',
                    className:
                        'h-[40px] px-4 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md text-gray-700 text-base cursor-pointer',
                    children: _jsxs('svg', {
                        width: '20',
                        height: '20',
                        viewBox: '0 0 20 20',
                        fill: 'none',
                        children: [
                            _jsx('circle', {
                                cx: '9',
                                cy: '9',
                                r: '7',
                                stroke: '#333',
                                strokeWidth: '2',
                            }),
                            _jsx('line', {
                                x1: '15',
                                y1: '15',
                                x2: '19',
                                y2: '19',
                                stroke: '#333',
                                strokeWidth: '2',
                                strokeLinecap: 'round',
                            }),
                        ],
                    }),
                }),
            ],
        }),
    });
};
export default TableController;
