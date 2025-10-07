import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Calendar } from 'lucide-react';
const AccountingDisplayCart = ({ itm }) => {
    return _jsxs('div', {
        className:
            'ring-1 dark:ring-gray-700 relative overflow-hidden ring-gray-300 dark:bg-light-dark rounded p-3',
        children: [
            _jsxs('div', {
                className: '',
                children: [
                    _jsx('h1', {
                        className: 'text-blue-500 text-xs',
                        children: itm?.title,
                    }),
                    _jsxs('p', {
                        className:
                            'dark:text-gray-300 md:text-sm text-2xl text-dark flex items-center',
                        children: [
                            _jsx('span', {
                                className: 'kalpurush-font text-lg',
                                children: '\u09F3 ',
                            }),
                            itm?.amount,
                        ],
                    }),
                    _jsxs('div', {
                        className: 'flex items-center gap-2 mt-3',
                        children: [
                            _jsxs('div', {
                                className:
                                    'flex items-center gap-1 dark:text-gray-500 text-xs text-dark',
                                children: [
                                    _jsx(Calendar, { size: 16, className: '' }),
                                    ' ',
                                    _jsx('span', {
                                        className: 'text-xs',
                                        children: itm?.date,
                                    }),
                                ],
                            }),
                            _jsxs('span', {
                                className:
                                    'dark:text-gray-300 md:text-md text-xs  text-dark flex items-center',
                                children: [
                                    _jsx('span', {
                                        className: 'kalpurush-font text-lg',
                                        children: '\u09F3 ',
                                    }),
                                    ' ',
                                    itm?.amount2,
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            _jsx('div', {
                className: `w-[150px] h-[150px] rounded-full flex absolute md:top-[-50px] top-[-30px] md:right-[-60px] right-[-40px] items-center justify-center ${itm.bg} ${itm.bgDark}`,
                children: _jsx('img', {
                    src: itm?.icon,
                    alt: '',
                    className: 'md:w-8 w-12 md:mr-12 md:mt-10 mt-4 mr-8',
                }),
            }),
        ],
    });
};
export default AccountingDisplayCart;
