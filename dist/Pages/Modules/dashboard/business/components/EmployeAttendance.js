'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart, // New import for Pie Chart
    Pie, // New import for Pie Chart
    Cell, // New import for Pie Chart
    BarChart, // New import for Bar Chart
    Bar, // New import for Bar Chart
} from 'recharts';
import { Card, Select, Row, Col, Typography } from 'antd';
import DashboardTitle from '@/Pages/Modules/CommonComponents/DashboardTitle';
const { Option } = Select;
const { Text } = Typography;
// Custom utility to generate month labels
const Utils = {
    months: ({ count }) => {
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
        ];
        return monthNames.slice(0, count);
    },
};
const employee = [
    {
        name: 'John Doe',
        position: 'Manager',
        department: 'Finance',
        attendance: [15, 18, 20, 19, 20, 21, 22],
        absence: [3, 2, 1, 2, 1, 0, 0],
        weekend: [4, 4, 4, 4, 4, 4, 4],
        date: '2022-01-01',
    },
    {
        name: 'Jane Smith',
        position: 'Sales Representative',
        department: 'Sales',
        attendance: [1, 15, 17, 16, 18, 19, 21],
        absence: [0.5, 4, 3, 4, 2, 1, 1],
        weekend: [4, 4, 4, 4, 4, 4, 4],
        date: '2022-01-01',
    },
    {
        name: 'Bob Johnson',
        position: 'Accountant',
        department: 'Finance',
        attendance: [6, 19, 21, 20, 22, 23, 25],
        absence: [0.2, 1, 0, 1, 0, 0, 0],
        weekend: [4, 4, 4, 4, 4, 4, 4],
        date: '2022-01-01',
    },
];
const EmployeeAttendance = () => {
    const [selectedName, setSelectedName] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [filterQuery, setFilterQuery] = useState(''); // Not currently used in UI, but kept for potential future use
    const [chartData, setChartData] = useState(
        Utils.months({ count: 7 }).map(month => ({
            name: month,
            Attendance: 0,
            Absence: 0,
            Weekend: 0,
        }))
    );
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    useEffect(() => {
        setChartData(generateChartData());
        setFilteredEmployees(generateFilteredEmployees());
    }, [selectedName, selectedPosition, filterQuery]); // [^2]
    const generateChartData = () => {
        const currentFilteredEmployees = employee.filter(
            emp =>
                (selectedName === '' || emp.name === selectedName) &&
                (selectedPosition === '' ||
                    emp.position === selectedPosition) &&
                (emp.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
                    emp.position
                        .toLowerCase()
                        .includes(filterQuery.toLowerCase()))
        );
        const data = Utils.months({ count: 7 }).map((month, index) => {
            let Attendance = 0;
            let Absence = 0;
            let Weekend = 0;
            currentFilteredEmployees.forEach(emp => {
                Attendance += emp.attendance[index] || 0;
                Absence += emp.absence[index] || 0;
                Weekend += emp.weekend[index] || 0;
            });
            return {
                name: month,
                Attendance,
                Absence,
                Weekend,
            };
        });
        return data;
    };
    const generateFilteredEmployees = () => {
        return employee.filter(
            emp =>
                (selectedName === '' || emp.name === selectedName) &&
                (selectedPosition === '' ||
                    emp.position === selectedPosition) &&
                (emp.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
                    emp.position
                        .toLowerCase()
                        .includes(filterQuery.toLowerCase()))
        );
    };
    const handleNameChange = value => {
        setSelectedName(value);
    };
    const handlePositionChange = value => {
        setSelectedPosition(value);
    };
    // Calculate totals for Pie and Bar charts
    const totalAttendance = chartData.reduce(
        (sum, item) => sum + item.Attendance,
        0
    );
    const totalAbsence = chartData.reduce((sum, item) => sum + item.Absence, 0);
    const totalWeekend = chartData.reduce((sum, item) => sum + item.Weekend, 0); // Not used in new charts, but kept for consistency
    const pieChartData = [
        { name: 'Present', value: totalAttendance, color: '#4285F4' },
        { name: 'Absent', value: totalAbsence, color: '#616161' },
    ];
    const barChartData = [
        { name: 'Present', count: totalAttendance, color: '#4285F4' },
        { name: 'Absent', count: totalAbsence, color: '#616161' },
    ];
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return _jsxs('div', {
                className:
                    'bg-white p-2 border border-gray-300 shadow-md text-sm',
                children: [
                    _jsx('p', { className: 'font-bold', children: `${label}` }),
                    _jsx('p', { children: `Count: ${payload[0].value}` }),
                ],
            });
        }
        return null;
    };
    return _jsxs('div', {
        className:
            'p-6 md:p-8 dark:bg-gray-800 dark:text-white bg-white text-gray-900',
        children: [
            _jsxs(Row, {
                justify: 'space-between',
                align: 'middle',
                className: 'mb-6 md:mb-8',
                children: [
                    _jsx(Col, {
                        children: _jsx(DashboardTitle, {
                            title: 'Employee Attendance',
                        }),
                    }),
                    _jsx(Col, {
                        children: _jsxs(Row, {
                            gutter: [16, 16],
                            className: 'mt-2 md:mt-0',
                            children: [
                                _jsx(Col, {
                                    children: _jsxs('div', {
                                        className: 'flex flex-col',
                                        children: [
                                            _jsx('label', {
                                                htmlFor: 'name-select',
                                                className:
                                                    'mb-1 text-sm font-medium',
                                                children: 'Name',
                                            }),
                                            _jsxs(Select, {
                                                id: 'name-select',
                                                value: selectedName,
                                                onChange: handleNameChange,
                                                className: 'w-[200px]',
                                                placeholder: 'All',
                                                children: [
                                                    _jsx(Option, {
                                                        value: '',
                                                        children: 'All',
                                                    }),
                                                    employee.map(
                                                        (item, index) =>
                                                            _jsx(
                                                                Option,
                                                                {
                                                                    value: item.name,
                                                                    children:
                                                                        item.name,
                                                                },
                                                                index
                                                            )
                                                    ),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                                _jsx(Col, {
                                    children: _jsxs('div', {
                                        className: 'flex flex-col',
                                        children: [
                                            _jsx('label', {
                                                htmlFor: 'position-select',
                                                className:
                                                    'mb-1 text-sm font-medium',
                                                children: 'Position',
                                            }),
                                            _jsxs(Select, {
                                                id: 'position-select',
                                                value: selectedPosition,
                                                onChange: handlePositionChange,
                                                className: 'w-[200px]',
                                                placeholder: 'All',
                                                children: [
                                                    _jsx(Option, {
                                                        value: '',
                                                        children: 'All',
                                                    }),
                                                    Array.from(
                                                        new Set(
                                                            employee.map(
                                                                emp =>
                                                                    emp.position
                                                            )
                                                        )
                                                    ).map((position, index) =>
                                                        _jsx(
                                                            Option,
                                                            {
                                                                value: position,
                                                                children:
                                                                    position,
                                                            },
                                                            index
                                                        )
                                                    ),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                            ],
                        }),
                    }),
                ],
            }),
            _jsxs(Row, {
                gutter: [24, 24],
                className: 'mb-6 md:mb-8',
                children: [
                    _jsx(Col, {
                        xs: 24,
                        md: 12,
                        children: _jsxs(Card, {
                            title: _jsx('span', {
                                className:
                                    'text-lg font-semibold text-gray-900 dark:text-gray-200',
                                children: 'Percentage of employee attendance',
                            }),
                            className:
                                'shadow-lg rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200',
                            headStyle: { borderBottom: '1px solid #f0f0f0' },
                            bodyStyle: {
                                padding: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            },
                            children: [
                                _jsx(ResponsiveContainer, {
                                    width: '100%',
                                    height: 250,
                                    children: _jsxs(PieChart, {
                                        children: [
                                            _jsx(Pie, {
                                                data: pieChartData,
                                                cx: '50%',
                                                cy: '50%',
                                                labelLine: false,
                                                outerRadius: 80,
                                                fill: '#8884d8',
                                                dataKey: 'value',
                                                label: ({ percent }) =>
                                                    `${(percent * 100).toFixed(0)}%`,
                                                children: pieChartData.map(
                                                    (entry, index) =>
                                                        _jsx(
                                                            Cell,
                                                            {
                                                                fill: entry.color,
                                                            },
                                                            `cell-${index}`
                                                        )
                                                ),
                                            }),
                                            _jsx(Tooltip, {}),
                                        ],
                                    }),
                                }),
                                _jsx('div', {
                                    className: 'flex justify-center gap-4 mt-4',
                                    children: pieChartData.map((entry, index) =>
                                        _jsxs(
                                            'div',
                                            {
                                                className:
                                                    'flex items-center gap-2',
                                                children: [
                                                    _jsx('div', {
                                                        style: {
                                                            backgroundColor:
                                                                entry.color,
                                                        },
                                                        className:
                                                            'w-3 h-3 rounded-full',
                                                    }),
                                                    _jsx(Text, {
                                                        children: entry.name,
                                                    }),
                                                ],
                                            },
                                            `legend-${index}`
                                        )
                                    ),
                                }),
                            ],
                        }),
                    }),
                    _jsx(Col, {
                        xs: 24,
                        md: 12,
                        children: _jsx(Card, {
                            title: _jsx('span', {
                                className:
                                    'text-lg font-semibold text-gray-900 dark:text-gray-200',
                                children: 'Employee Attendance',
                            }),
                            className:
                                'shadow-lg rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200',
                            headStyle: { borderBottom: '1px solid #f0f0f0' },
                            bodyStyle: { padding: '16px' },
                            children: _jsx(ResponsiveContainer, {
                                width: '100%',
                                height: 250,
                                children: _jsxs(BarChart, {
                                    data: barChartData,
                                    margin: {
                                        top: 5,
                                        right: 20,
                                        left: 10,
                                        bottom: 5,
                                    },
                                    children: [
                                        _jsx(CartesianGrid, {
                                            strokeDasharray: '3 3',
                                            vertical: false,
                                            stroke: '#e0e0e0',
                                        }),
                                        _jsx(XAxis, {
                                            dataKey: 'name',
                                            axisLine: false,
                                            tickLine: false,
                                        }),
                                        _jsx(YAxis, {
                                            domain: [0, 7.5],
                                            axisLine: false,
                                            tickLine: false,
                                        }),
                                        _jsx(Tooltip, {
                                            content: _jsx(CustomTooltip, {}),
                                        }),
                                        _jsx(Bar, {
                                            dataKey: 'count',
                                            barSize: 60,
                                            children: barChartData.map(
                                                (entry, index) =>
                                                    _jsx(
                                                        Cell,
                                                        { fill: entry.color },
                                                        `bar-${index}`
                                                    )
                                            ),
                                        }),
                                    ],
                                }),
                            }),
                        }),
                    }),
                ],
            }),
            _jsx(Card, {
                title: _jsx('span', {
                    className:
                        'text-lg font-semibold text-gray-900 dark:text-gray-200',
                    children: 'Details',
                }),
                className:
                    'shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
                children: _jsx('div', {
                    className:
                        'p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800',
                    children:
                        selectedName !== '' && filteredEmployees.length > 0
                            ? filteredEmployees.map((emp, index) =>
                                  _jsxs(
                                      'div',
                                      {
                                          className: 'mb-2 last:mb-0',
                                          children: [
                                              _jsxs(Text, {
                                                  strong: true,
                                                  className:
                                                      'text-lg block text-gray-900',
                                                  children: [
                                                      'Name: ',
                                                      emp.name,
                                                  ],
                                              }),
                                              _jsxs(Text, {
                                                  type: 'secondary',
                                                  className:
                                                      'text-sm block text-gray-600',
                                                  children: [
                                                      'Position: ',
                                                      emp.position,
                                                  ],
                                              }),
                                              _jsxs(Text, {
                                                  type: 'secondary',
                                                  className:
                                                      'text-sm block text-gray-600',
                                                  children: [
                                                      'Department: ',
                                                      emp.department,
                                                  ],
                                              }),
                                          ],
                                      },
                                      index
                                  )
                              )
                            : selectedName !== '' &&
                                filteredEmployees.length === 0
                              ? _jsx(Text, {
                                    type: 'secondary',
                                    className: 'text-gray-600',
                                    children:
                                        'No employees found for the selected filters.',
                                })
                              : _jsxs('div', {
                                    className: 'summary',
                                    children: [
                                        _jsx(Text, {
                                            strong: true,
                                            className:
                                                'text-xl mb-2 block text-gray-900 dark:text-gray-200',
                                            children: 'Total Summary',
                                        }),
                                        _jsxs(Text, {
                                            className:
                                                'block text-gray-700 dark:text-gray-400',
                                            children: [
                                                'Total Attendance:',
                                                ' ',
                                                _jsx(Text, {
                                                    strong: true,
                                                    className:
                                                        'text-gray-900 dark:text-gray-200',
                                                    children: totalAttendance,
                                                }),
                                            ],
                                        }),
                                        _jsxs(Text, {
                                            className:
                                                'block text-gray-700 dark:text-gray-400',
                                            children: [
                                                'Total Absence:',
                                                ' ',
                                                _jsx(Text, {
                                                    strong: true,
                                                    className:
                                                        'text-gray-900 dark:text-gray-200',
                                                    children: totalAbsence,
                                                }),
                                            ],
                                        }),
                                        _jsxs(Text, {
                                            className:
                                                'block text-gray-700 dark:text-gray-400',
                                            children: [
                                                'Total Weekend:',
                                                ' ',
                                                _jsx(Text, {
                                                    strong: true,
                                                    className:
                                                        'text-gray-900 dark:text-gray-200',
                                                    children: totalWeekend,
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                }),
            }),
        ],
    });
};
export default EmployeeAttendance;
