'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import {
    LineChart, // Keeping LineChart import for now, though not used in the new design, as it was in original code.
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
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
    months: ({ count }: { count: number }) => {
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

const EmployeeAttendance: React.FC = () => {
    const [selectedName, setSelectedName] = useState<string>('');
    const [selectedPosition, setSelectedPosition] = useState<string>('');
    const [filterQuery, setFilterQuery] = useState<string>(''); // Not currently used in UI, but kept for potential future use
    const [chartData, setChartData] = useState<any[]>(
        Utils.months({ count: 7 }).map(month => ({
            name: month,
            Attendance: 0,
            Absence: 0,
            Weekend: 0,
        }))
    );
    const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);

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

    const handleNameChange = (value: string) => {
        setSelectedName(value);
    };

    const handlePositionChange = (value: string) => {
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

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-300 shadow-md text-sm">
                    <p className="font-bold">{`${label}`}</p>
                    <p>{`Count: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-6 md:p-8 dark:bg-gray-800 dark:text-white bg-white text-gray-900">
            <Row
                justify="space-between"
                align="middle"
                className="mb-6 md:mb-8"
            >
                <Col>
                    <DashboardTitle title="Employee Attendance" />
                </Col>
                <Col>
                    <Row
                        gutter={[16, 16]}
                        className="mt-2 md:mt-0"
                    >
                        <Col>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="name-select"
                                    className="mb-1 text-sm font-medium"
                                >
                                    Name
                                </label>
                                <Select
                                    id="name-select"
                                    value={selectedName}
                                    onChange={handleNameChange}
                                    className="w-[200px]"
                                    placeholder="All"
                                >
                                    <Option value="">All</Option>
                                    {employee.map((item, index) => (
                                        <Option
                                            value={item.name}
                                            key={index}
                                        >
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </Col>
                        <Col>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="position-select"
                                    className="mb-1 text-sm font-medium"
                                >
                                    Position
                                </label>
                                <Select
                                    id="position-select"
                                    value={selectedPosition}
                                    onChange={handlePositionChange}
                                    className="w-[200px]"
                                    placeholder="All"
                                >
                                    <Option value="">All</Option>
                                    {Array.from(
                                        new Set(
                                            employee.map(emp => emp.position)
                                        )
                                    ).map((position, index) => (
                                        <Option
                                            value={position}
                                            key={index}
                                        >
                                            {position}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row
                gutter={[24, 24]}
                className="mb-6 md:mb-8"
            >
                <Col
                    xs={24}
                    md={12}
                >
                    <Card
                        title={
                            <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                                Percentage of employee attendance
                            </span>
                        }
                        className="shadow-lg rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200"
                        headStyle={{ borderBottom: '1px solid #f0f0f0' }}
                        bodyStyle={{
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <ResponsiveContainer
                            width="100%"
                            height={250}
                        >
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ percent }) =>
                                        `${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 mt-4">
                            {pieChartData.map((entry, index) => (
                                <div
                                    key={`legend-${index}`}
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        style={{ backgroundColor: entry.color }}
                                        className="w-3 h-3 rounded-full"
                                    />
                                    <Text>{entry.name}</Text>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>

                <Col
                    xs={24}
                    md={12}
                >
                    <Card
                        title={
                            <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                                Employee Attendance
                            </span>
                        }
                        className="shadow-lg rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200"
                        headStyle={{ borderBottom: '1px solid #f0f0f0' }}
                        bodyStyle={{ padding: '16px' }}
                    >
                        <ResponsiveContainer
                            width="100%"
                            height={250}
                        >
                            <BarChart
                                data={barChartData}
                                margin={{
                                    top: 5,
                                    right: 20,
                                    left: 10,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#e0e0e0"
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    domain={[0, 7.5]}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="count"
                                    barSize={60}
                                >
                                    {barChartData.map((entry, index) => (
                                        <Cell
                                            key={`bar-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

            {/* Employee details / Total Summary section */}
            <Card
                title={
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                        Details
                    </span>
                }
                className="shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            >
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800">
                    {selectedName !== '' && filteredEmployees.length > 0 ? (
                        filteredEmployees.map((emp, index) => (
                            <div
                                key={index}
                                className="mb-2 last:mb-0"
                            >
                                <Text
                                    strong
                                    className="text-lg block text-gray-900"
                                >
                                    Name: {emp.name}
                                </Text>
                                <Text
                                    type="secondary"
                                    className="text-sm block text-gray-600"
                                >
                                    Position: {emp.position}
                                </Text>
                                <Text
                                    type="secondary"
                                    className="text-sm block text-gray-600"
                                >
                                    Department: {emp.department}
                                </Text>
                            </div>
                        ))
                    ) : selectedName !== '' &&
                      filteredEmployees.length === 0 ? (
                        <Text
                            type="secondary"
                            className="text-gray-600"
                        >
                            No employees found for the selected filters.
                        </Text>
                    ) : (
                        <div className="summary">
                            <Text
                                strong
                                className="text-xl mb-2 block text-gray-900 dark:text-gray-200"
                            >
                                Total Summary
                            </Text>
                            <Text className="block text-gray-700 dark:text-gray-400">
                                Total Attendance:{' '}
                                <Text
                                    strong
                                    className="text-gray-900 dark:text-gray-200"
                                >
                                    {totalAttendance}
                                </Text>
                            </Text>
                            <Text className="block text-gray-700 dark:text-gray-400">
                                Total Absence:{' '}
                                <Text
                                    strong
                                    className="text-gray-900 dark:text-gray-200"
                                >
                                    {totalAbsence}
                                </Text>
                            </Text>
                            <Text className="block text-gray-700 dark:text-gray-400">
                                Total Weekend:{' '}
                                <Text
                                    strong
                                    className="text-gray-900 dark:text-gray-200"
                                >
                                    {totalWeekend}
                                </Text>
                            </Text>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default EmployeeAttendance;
