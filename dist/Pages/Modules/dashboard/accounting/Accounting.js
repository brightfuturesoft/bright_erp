import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Button, DatePicker, Modal } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import i1 from '../../../../assets/icons/png/1.png';
import i2 from '../../../../assets/icons/png/2.png';
import i3 from '../../../../assets/icons/png/3.png';
import i4 from '../../../../assets/icons/png/4.png';
import i5 from '../../../../assets/icons/png/5.png';
import i6 from '../../../../assets/icons/png/6.png';
import DashboardTitle from '../../CommonComponents/DashboardTitle';
import AccountingDisplayCart from './components/AccountingDisplayCart';
import { Filter } from 'lucide-react';
import Income_by_categoryChart from './components/Income_by_category_chart';
import LastIncome_table from './components/LastIncome_table';
import Latest_expenses_table from './components/Latest_expenses_table';
import TransactionsTable from './components/AllAmountTable';
const { RangePicker } = DatePicker;
const currencySymbols = {
    BD: '৳', // Bangladesh Taka
    AF: '؋', // Afghanistan Afghani
    PK: '₨', // Pakistan Rupee
    IN: '₹', // India Rupee
    SG: 'S$', // Singapore Dollar
    SA: '﷼', // Saudi Arabia Riyal
    AE: 'د.إ', // UAE Dirham (Dubai)
    MY: 'RM', // Malaysia Ringgit
    US: '$', // United States Dollar
    RU: '₽', // Russia Ruble
    JO: 'JD', // Jordanian Dinar
    YE: '﷼', // Yemen Rial
    SY: '£', // Syrian Pound
};
const Accounting = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currencySymbol, setCurrencySymbol] = useState('$'); // Default to USD
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const showModal = () => {
    //     setIsModalOpen(true);
    // };
    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    dayjs.extend(customParseFormat);
    const dateFormat = 'YYYY/MM/DD';
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch(
                    'http://www.geoplugin.net/json.gp'
                );
                const data = await response.json();
                const countryCode = data.geoplugin_countryCode;
                const symbol = currencySymbols[countryCode] || '$';
                setCurrencySymbol(symbol);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        };
        fetchLocation();
    }, []);
    const handleDateChange = (dates, dateStrings) => {
        if (dates) {
            setStartDate(dateStrings[0]);
            setEndDate(dateStrings[1]);
        } else {
            console.log('Date range is cleared');
        }
    };
    const module = [
        {
            path: '',
            title: 'Income',
            amount: 124534356,
            amount2: 103876,
            date: 'jun,2024',
            icon: i1,
            bg: 'bg-[#767c8c1e]',
            bgDark: 'dark:bg-[#083f7343]',
        },
        {
            path: '',
            title: 'Expense',
            amount: 324534356,
            amount2: 603876,
            date: 'jun,2024',
            icon: i2,
            bg: 'bg-[#ef07411f]',
            bgDark: 'dark:bg-[#ef07411f]',
        },
        {
            path: '',
            title: 'Profit',
            amount: -124534356,
            amount2: -103876,
            date: 'jun,2024',
            icon: i3,
            bg: 'bg-[#dd613725]',
            bgDark: 'dark:bg-[#db6a4418]',
        },
        {
            path: '',
            title: 'Customer Payments Expectations',
            amount: 124534356,
            amount2: 103876,
            date: 'jun,2024',
            icon: i4,
            bg: 'bg-[#7fc4d91f]',
            bgDark: 'dark:bg-[#44b8db17]',
        },
        {
            path: '',
            title: 'Supplier Payments Expectations',
            amount: 124534356,
            amount2: 103876,
            date: 'jun,2024',
            icon: i5,
            bg: 'bg-[##2196F3]',
            bgDark: 'dark:bg-[#2aa7ea16]',
        },
        {
            path: '',
            title: 'Upcoming',
            amount: 124534356,
            amount2: 103876,
            date: 'jun,2024',
            icon: i6,
            bg: 'bg-[#fd526320]',
            bgDark: 'dark:bg-[#fd526320]',
        },
    ];
    const chartData = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
        ],
        datasets: [
            {
                label: 'Income',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56, 55, 40],
            },
        ],
    };
    return _jsxs('section', {
        className: 'py-3',
        children: [
            _jsxs('header', {
                className: 'flex items-center justify-between ',
                children: [
                    _jsx(DashboardTitle, { title: 'Accounting Dashboard' }),
                    _jsx('div', {
                        className: 'md:block hidden',
                        children: _jsx(RangePicker, {
                            className:
                                'dark:bg-light-dark dark:text-light dark:border-gray-700',
                            defaultValue: [
                                dayjs('2015/01/01', dateFormat),
                                dayjs('2015/01/01', dateFormat),
                            ],
                            format: dateFormat,
                            onChange: handleDateChange,
                        }),
                    }),
                    _jsxs('div', {
                        className: 'md:hidden block',
                        children: [
                            _jsxs(Button, {
                                className: 'flex items-center gap-1',
                                type: 'primary',
                                onClick: () => setIsModalOpen(true),
                                children: [
                                    _jsx(Filter, { size: 16 }),
                                    ' Filter',
                                ],
                            }),
                            _jsx(Modal, {
                                title: 'Basic Modal',
                                open: isModalOpen,
                                footer: null,
                                onCancel: handleCancel,
                                children: _jsx(RangePicker, {
                                    className:
                                        'dark:bg-light-dark dark:text-light w-full dark:border-gray-700',
                                    defaultValue: [
                                        dayjs('2015/01/01', dateFormat),
                                        dayjs('2015/01/01', dateFormat),
                                    ],
                                    format: dateFormat,
                                    onChange: handleDateChange,
                                }),
                            }),
                        ],
                    }),
                ],
            }),
            _jsxs('main', {
                children: [
                    _jsx('div', {
                        className: 'grid md:grid-cols-4 grid-cols-1 gap-6 mt-6',
                        children: module.map((itm, i) =>
                            _jsx(AccountingDisplayCart, { itm: itm })
                        ),
                    }),
                    _jsxs('div', {
                        className: ' ',
                        children: [
                            _jsx(Income_by_categoryChart, {}),
                            _jsxs('div', {
                                className: 'grid md:grid-cols-2 gap-6',
                                children: [
                                    _jsx(LastIncome_table, {}),
                                    _jsx(Latest_expenses_table, {}),
                                    _jsx(TransactionsTable, {}),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
};
export default Accounting;
