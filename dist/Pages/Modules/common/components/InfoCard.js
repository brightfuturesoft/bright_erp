import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Package, Boxes, Briefcase, LineChart } from 'lucide-react';
import getRandomColor from '../utils/getRandomColor';
const InfoCard = ({ title, amount }) => {
    const color = getRandomColor();
    // Title অনুযায়ী icon select
    const getIcon = () => {
        switch (title.toLowerCase()) {
            case 'total variants':
                return _jsx(Package, {});
            case 'total stock':
                return _jsx(Boxes, {});
            case 'total orders':
                return _jsx(Briefcase, {});
            case 'sales':
            case 'revenue':
                return _jsx(LineChart, {});
            default:
                return _jsx(Briefcase, {});
        }
    };
    const showCurrency = () => {
        const currencyTitles = ['sales', 'revenue'];
        return currencyTitles.includes(title.toLowerCase());
    };
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
                children: getIcon(),
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
                            className: 'text-gray-900',
                            children: [
                                showCurrency() &&
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
export default InfoCard;
