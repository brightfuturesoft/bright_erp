import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import DashboardTitle from '../../../../CommonComponents/DashboardTitle';
import { Button, DatePicker, Select, Space } from 'antd';
import { Filter } from 'lucide-react';
import DashboardContentHeader from '@/wraper/DashboardContentHeader';
const FilterAction = () => {
    const [filterBox, setFilterBox] = useState(false);
    const onChange = (date, dateString) => {};
    const status = false;
    return _jsxs('div', {
        className: 'py-2 ',
        children: [
            _jsxs(DashboardContentHeader, {
                children: [
                    _jsx(DashboardTitle, { title: 'Customer Details' }),
                    _jsx('div', {
                        className: 'flex md:hidden gap-1',
                        children: _jsxs(Button, {
                            className:
                                '!bg-transparent group dark:text-light text-dark',
                            onClick: () => setFilterBox(!filterBox),
                            icon: _jsx(Filter, {
                                className:
                                    'text-dark dark:text-light group-hover:!text-blue-500',
                                size: 18,
                            }),
                            children: [' ', 'Filter'],
                        }),
                    }),
                ],
            }),
            filterBox &&
                _jsxs('div', {
                    className: 'dark:text-light text-dark',
                    children: [
                        _jsx(Select, {
                            className: 'w-full mt-3',
                            showSearch: true,
                            placeholder: 'Select country',
                            filterOption: (input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase()),
                            options: [
                                { value: '1', label: 'Jack' },
                                { value: '2', label: 'Lucy' },
                                { value: '3', label: 'Tom' },
                            ],
                        }),
                        _jsx('div', {
                            className:
                                'w-full flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2',
                            children: _jsxs(Space, {
                                direction: 'vertical',
                                className:
                                    'w-full md:w-auto flex mt-2 flex-row items-center',
                                children: [
                                    _jsxs('div', {
                                        className: 'space-y-1',
                                        children: [
                                            _jsx('p', {
                                                className:
                                                    'text-xs font-semibold',
                                                children: 'Start date :',
                                            }),
                                            _jsx(DatePicker, {
                                                format: 'YYYY-MM-DD',
                                                onChange: onChange,
                                                className: 'w-full ',
                                            }),
                                        ],
                                    }),
                                    _jsxs('div', {
                                        className: 'space-y-1',
                                        children: [
                                            _jsx('p', {
                                                className:
                                                    'text-xs font-semibold',
                                                children: 'End date :',
                                            }),
                                            _jsx(DatePicker, {
                                                format: 'YYYY-MM-DD',
                                                onChange: onChange,
                                                className: 'w-full',
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        }),
                    ],
                }),
        ],
    });
};
export default FilterAction;
