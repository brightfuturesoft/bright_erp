import { useState, useEffect } from 'react';
import DashboardHeader from '../../../CommonComponents/DashboardHeader';
import DashboardTitle from '../../../CommonComponents/DashboardTitle';
import { DatePicker, Input, MenuProps, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

interface RowData {
    description: string;
    account: string;
    debit: number;
    credit: number;
    status: 'added' | 'not-added';
}

const EditJournals: React.FC = () => {
    const formData = {
        reference_number: '1245434',
        date: '2024-05-31',
        description: 'dfasdfasfasf',
        field: [
            {
                description: 'sadfasdsasfas',
                account: '2nd menu item',
                debit: 4322,
                credit: 2340,
                status: 'not-added',
            },
            {
                description: 'DASFFAS',
                account: '',
                debit: 34,
                credit: 23,
                status: 'not-added',
            },
        ],
        totalDebit: 4356,
        totalCredit: 2363,
        totalDifference: 1993,
    };
    const [rows, setRows] = useState<RowData[]>(formData?.field);
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalDifference, setTotalDifference] = useState(0);
    const [date, setDate] = useState(null);

    useEffect(() => {
        const totalDebit = rows.reduce((acc, row) => acc + row.debit, 0);
        const totalCredit = rows.reduce((acc, row) => acc + row.credit, 0);
        const totalDifference = totalDebit - totalCredit;

        setTotalDebit(totalDebit);
        setTotalCredit(totalCredit);
        setTotalDifference(totalDifference);
    }, [rows]);

    const onChange = (date, dateString) => {
        setDate(dateString);
    };

    const items: MenuProps['items'] = [
        {
            label: '1st menu item',
            key: '0',
        },
        {
            label: '2nd menu item',
            key: '1',
        },
    ];

    const handleAddField = () => {
        setRows([
            ...rows,
            {
                description: '',
                account: '',
                debit: 0,
                credit: 0,
                status: 'not-added',
            },
        ]);
    };

    const handleInputChange = (
        index: number,
        key: keyof RowData,
        value: any
    ) => {
        const newRows = [...rows];
        newRows[index][key] = value;
        setRows(newRows);
        console.log(key + ':', value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const description = form.description.value;

        const data = {
            date: date ?? formData?.date,
            description,
            field: rows,
            totalDebit,
            totalCredit,
            totalDifference,
        };
        // Log the necessary data here
        console.log('Form Data:', data);

        message.success('Journal added', 3);
    };

    const handleDeleteField = (index: number) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };
    return (
        <div>
            <DashboardHeader>
                <DashboardTitle title={`Add Journals`} />
            </DashboardHeader>
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <div className="gap-2 grid md:grid-cols-3 mt-3 w-full">
                        <div className="space-y-1">
                            <label
                                htmlFor="date"
                                className="ml-1 text-xs"
                            >
                                Date
                            </label>
                            <DatePicker
                                defaultValue={moment(formData.date)}
                                onChange={onChange}
                                className="w-full h-[40px]"
                            />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <label
                                htmlFor="description"
                                className="ml-1 text-xs"
                            >
                                Description
                            </label>
                            <Input
                                defaultValue={formData?.description}
                                name="description"
                                placeholder="Entry Description"
                                className="dark:border-gray-700 !shadow-none w-full dark:text-gray-300"
                            />
                        </div>
                    </div>
                    <br />
                    <div className="m-auto w-[93vw] md:w-full">
                        <div className="border-gray-200 dark:border-gray-700 border md:w-full overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="dark:text-gray-200">
                                    <tr>
                                        <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-2 md:px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                                            Description
                                        </th>
                                        <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-2 md:px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                                            Account
                                        </th>
                                        <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-2 md:px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                                            Debit
                                        </th>
                                        <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-2 md:px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                                            Credit
                                        </th>
                                        <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-2 md:px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="dark:text-gray-500">
                                    {rows.map((row, index) => (
                                        <tr key={index}>
                                            <td className="border-gray-200 dark:border-gray-700 px-2 md:px-6 py-4 border-b text-blue-500 hover:text-blue-300 whitespace-no-wrap duration-100 cursor-pointer">
                                                <div className="flex items-center gap-2 text-sm leading-5">
                                                    <Input
                                                        name="t_description"
                                                        placeholder="Entry Description"
                                                        className="dark:border-gray-700 !shadow-none w-[200px] md:w-[200px] dark:text-gray-300"
                                                        value={row.description}
                                                        onChange={e =>
                                                            handleInputChange(
                                                                index,
                                                                'description',
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className="border-gray-200 dark:border-gray-700 px-2 md:px-6 py-4 border-b whitespace-no-wrap">
                                                <div className="text-sm leading-5">
                                                    <select
                                                        className="dark:border-gray-700 dark:bg-dark !shadow-none px-2 py-2 border rounded w-[200px] md:w-[200px] dark:text-gray-300"
                                                        name="ac_name"
                                                        value={row.account}
                                                        onChange={e =>
                                                            handleInputChange(
                                                                index,
                                                                'account',
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {items.map(itm => (
                                                            <option
                                                                key={itm.key}
                                                                value={
                                                                    itm.label
                                                                }
                                                            >
                                                                {itm.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="border-gray-200 dark:border-gray-700 px-2 md:px-6 py-4 border-b w-[100px] md:w-[300px] text-justify text-nowrap whitespace-no-wrap">
                                                <div className="text-sm leading-5">
                                                    <Input
                                                        type="number"
                                                        name="debit"
                                                        placeholder="0.00"
                                                        className="dark:border-gray-700 !shadow-none w-[100px] dark:text-gray-300"
                                                        value={row.debit}
                                                        onChange={e =>
                                                            handleInputChange(
                                                                index,
                                                                'debit',
                                                                parseFloat(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className="border-gray-200 dark:border-gray-700 px-2 md:px-6 py-4 border-b w-[100px] md:w-[300px] text-justify text-nowrap whitespace-no-wrap">
                                                <div className="text-sm leading-5">
                                                    <Input
                                                        type="number"
                                                        name="credit"
                                                        placeholder="0.00"
                                                        className="dark:border-gray-700 !shadow-none w-[100px] dark:text-gray-300"
                                                        value={row.credit}
                                                        onChange={e =>
                                                            handleInputChange(
                                                                index,
                                                                'credit',
                                                                parseFloat(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className="border-gray-200 dark:border-gray-700 px-2 md:px-6 py-4 border-b w-[100px] md:w-[300px] text-justify text-nowrap whitespace-no-wrap">
                                                <Button
                                                    onClick={() =>
                                                        handleDeleteField(index)
                                                    }
                                                    type="danger"
                                                    className="bg-[red]"
                                                    icon={<DeleteOutlined />}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <br />
                <div className="flex md:flex-row flex-col justify-between items-start">
                    <Button
                        type="primary"
                        className="rounded"
                        onClick={handleAddField}
                    >
                        + Add Field
                    </Button>
                    <div className="div">
                        <div className="space-y-1 bg-light-dark mt-4 px-3 py-2 rounded text-sm">
                            <div>Total Debit: {totalDebit.toFixed(2)}</div>
                            <div>Total Credit: {totalCredit.toFixed(2)}</div>
                            <div>Difference: {totalDifference.toFixed(2)}</div>
                        </div>

                        <div className="flex items-center gap-2 mt-12">
                            <Button
                                htmlType="submit"
                                type="submit"
                                className="bg-blue-600 !shadow-none rounded w-full text-light"
                            >
                                Save
                            </Button>
                            <Button
                                type="primary"
                                className="bg-red-600 hover:!bg-red-700 rounded w-full text-light"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditJournals;
