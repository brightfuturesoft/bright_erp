import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Flex, Progress } from 'antd';
const SalesReportCart = ({
    name,
    amount,
    percent,
    size,
    strokeWidth,
    strokeColor,
    trailColor,
}) => {
    return _jsx('div', {
        children: _jsxs('div', {
            className:
                'flex justify-between dark:border-gray-700 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full text-dark dark:text-gray-400',
            children: [
                _jsxs('div', {
                    children: [
                        _jsx('h1', {
                            className:
                                'font-[200] text-2xl dark:text-gray-300 uppercase',
                            children: name,
                        }),
                        _jsx('h1', {
                            className: 'text-gray-500 text-md',
                            children: 'This Month',
                        }),
                        _jsxs('p', {
                            className: 'mt-5 font-bold text-green-500',
                            children: [
                                'BDT ',
                                _jsx('span', {
                                    className: 'text-red-500',
                                    children: amount,
                                }),
                            ],
                        }),
                    ],
                }),
                _jsx(Flex, {
                    align: 'center',
                    wrap: true,
                    gap: 0,
                    children: _jsx(Progress, {
                        type: 'circle',
                        percent: percent,
                        size: 'small',
                        strokeWidth: strokeWidth,
                        strokeColor: strokeColor,
                        trailColor: trailColor,
                    }),
                }),
            ],
        }),
    });
};
export default SalesReportCart;
