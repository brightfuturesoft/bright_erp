import { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import DashboardTitle from '../../../CommonComponents/DashboardTitle';

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

const initialData = Utils.months({ count: 7 }).map(month => ({
    name: month,
    Attendance: 0,
    Absence: 0,
    Weekend: 0,
}));

const EmployeeAttendance: React.FC = () => {
    const [selectedName, setSelectedName] = useState<string>(''); // State for selected name
    const [selectedPosition, setSelectedPosition] = useState<string>(''); // State for selected position
    const [filterQuery, setFilterQuery] = useState<string>('');
    const [chartData, setChartData] = useState(initialData);
    const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]); // State for filtered employees

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

    useEffect(() => {
        setChartData(generateChartData());
        setFilteredEmployees(generateFilteredEmployees());
    }, [selectedName, selectedPosition, filterQuery]);

    const generateChartData = () => {
        // Apply filter logic here
        const filteredEmployees = employee.filter(
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

            filteredEmployees.forEach(emp => {
                Attendance += emp.attendance[index];
                Absence += emp.absence[index];
                Weekend += emp.weekend[index];
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

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterQuery(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedName(event.target.value);
    };

    const handlePositionChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedPosition(event.target.value);
    };

    const calculateTotals = (empName: string) => {
        const filteredEmployeesForTotal = selectedName
            ? employee.filter(emp => emp.name === empName)
            : employee;

        return chartData.reduce(
            (totals, item) => {
                filteredEmployeesForTotal.forEach(emp => {
                    totals.Attendance +=
                        emp.attendance[chartData.indexOf(item)];
                    totals.Absence += emp.absence[chartData.indexOf(item)];
                    totals.Weekend += emp.weekend[chartData.indexOf(item)];
                });
                return totals;
            },
            { Attendance: 0, Absence: 0, Weekend: 0 }
        );
    };

    return (
        <div>
            <div className="md:flex justify-between items-center text-dark dark:text-gray-300">
                <DashboardTitle title={'Employee Attendance'} />

                <div className="flex items-center gap-4 mt-2 pb-8">
                    <div className="flex flex-col">
                        <label htmlFor="name">Name</label>
                        <select
                            className="bg-transparent custom-select p-1 border rounded w-full md:w-[280px]"
                            onChange={handleNameChange}
                        >
                            <option value="">All</option>
                            {employee.map((item, index) => (
                                <option
                                    value={item.name}
                                    key={index}
                                >
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="position">Position</label>
                        <select
                            className="bg-transparent custom-select p-1 border rounded w-full md:w-[280px]"
                            onChange={handlePositionChange}
                        >
                            <option value="">All</option>
                            {Array.from(
                                new Set(employee.map(emp => emp.position))
                            ).map((position, index) => (
                                <option
                                    value={position}
                                    key={index}
                                >
                                    {position}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="border-gray-200 dark:border-gray-700 dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none mb-12 p-2 md:p-4 border rounded-xl text-dark dark:text-white">
                <div>
                    {/* <input type="text" onChange={handleFilter} placeholder="Search" /> */}
                </div>
                <ResponsiveContainer
                    width="100%"
                    height={400}
                >
                    <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="Attendance"
                            stroke="#8884d8"
                        />
                        <Line
                            type="monotone"
                            dataKey="Absence"
                            stroke="#82ca9d"
                        />
                        <Line
                            type="monotone"
                            dataKey="Weekend"
                            stroke="#ffc658"
                        />
                    </LineChart>
                </ResponsiveContainer>
                {selectedName !== '' && (
                    <div className="text-dark dark:text-light">
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((emp, index) => (
                                <div key={index}>
                                    <p className="font-semibold">
                                        Name: {emp.name}
                                    </p>
                                    <p className="text-sm">
                                        Position: {emp.position}
                                    </p>
                                    <p className="text-sm">
                                        Department: {emp.department}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No employees found</p>
                        )}
                    </div>
                )}
                {selectedName === '' && (
                    <div className="summary">
                        <h3>Total Summary</h3>
                        <p>
                            Total Attendance: {calculateTotals('').Attendance}
                        </p>
                        <p>Total Absence: {calculateTotals('').Absence}</p>
                        <p>Total Weekend: {calculateTotals('').Weekend}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeAttendance;
