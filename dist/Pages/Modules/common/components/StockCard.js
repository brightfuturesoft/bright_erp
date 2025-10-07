import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import getRandomColor from '../utils/getRandomColor';
const StockCard = ({ title, amount, icon }) => {
    const color = getRandomColor();
    return _jsxs('div', {
        className: `my-2 flex divide-x-2 justify-between max-w-sm border-gray-700 p-3 border rounded-md`,
        style: {
            backgroundColor: color.bgColor,
            borderColor: color.borderColor,
        },
        children: [
            _jsx('div', {
                className: 'mr-6 p-4 rounded-full',
                style: { backgroundColor: color.iconBgColor },
                children: icon,
            }),
            _jsx('div', {
                className: 'flex flex-1 justify-center items-center',
                children: _jsxs('div', {
                    className: 'mx-5',
                    children: [
                        _jsx('h1', {
                            style: { color: color.textColor },
                            className: 'font-semibold',
                            children: title,
                        }),
                        _jsxs('p', {
                            className: 'text-gray-900 flex items-center',
                            children: [
                                _jsx('span', {
                                    className: 'kalpurush-font text-lg',
                                    children: '\u09F3 ',
                                }),
                                amount,
                            ],
                        }),
                    ],
                }),
            }),
        ],
    });
};
export default StockCard;
