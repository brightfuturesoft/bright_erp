import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../../CommonComponents/DashboardHeader';
import DashboardTitle from '../../../CommonComponents/DashboardTitle';
import { DatePicker, Input, MenuProps, Button, message } from 'antd';
import { DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
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
        "reference_number": "1245434",
        "date": "2024-05-31",
        "description": "dfasdfasfasf",
        "field": [
            {
                "description": "sadfasdsasfas",
                "account": "2nd menu item",
                "debit": 4322,
                "credit": 2340,
                "status": "not-added"
            },
            {
                "description": "DASFFAS",
                "account": "",
                "debit": 34,
                "credit": 23,
                "status": "not-added"
            }
        ],
        "totalDebit": 4356,
        "totalCredit": 2363,
        "totalDifference": 1993
    }
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
        setRows([...rows, { description: '', account: '', debit: 0, credit: 0, status: 'not-added' }]);
    };

    const handleInputChange = (index: number, key: keyof RowData, value: any) => {
        const newRows = [...rows];
        newRows[index][key] = value;
        setRows(newRows);
        console.log(key + ':', value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const description = form.description.value;

        const data = {
            date: date ?? formData?.date,
            description,
            field: rows,
            totalDebit,
            totalCredit,
            totalDifference
        }
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
                <div className='relative'>
                    <div className="grid md:grid-cols-3 w-full gap-2 mt-3">
                        <div className="space-y-1">
                            <label htmlFor="date" className=' ml-1 text-xs'>Date</label>
                            <DatePicker defaultValue={moment(formData.date)} onChange={onChange} className='h-[40px] w-full' />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <label htmlFor="description" className=' ml-1 text-xs'>Description</label>
                            <Input defaultValue={formData?.description} name='description' placeholder='Entry Description' className='dark:border-gray-700 !shadow-none dark:text-gray-300 w-full' />
                        </div>
                    </div>
                    <br />
                    <div className="md:w-full w-[93vw] m-auto">
                        <div className="overflow-x-auto md:w-full   border dark:border-gray-700 border-gray-200">
                            <table className="min-w-full">
                                <thead className='dark:text-gray-200'>
                                    <tr>
                                        <th className="px-2 md:px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="px-2 md:px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                            Account
                                        </th>
                                        <th className="px-2 md:px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                            Debit
                                        </th>
                                        <th className="px-2 md:px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                            Credit
                                        </th>
                                        <th className="px-2 md:px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='dark:text-gray-500'>
                                    {rows.map((row, index) => (
                                        <tr key={index}>
                                            <td className="px-2 md:px-6 py-4 whitespace-no-wrap cursor-pointer hover:text-blue-300 duration-100 text-blue-500 border-b dark:border-gray-700 border-gray-200">
                                                <div className="text-sm leading-5 flex items-center gap-2">

                                                    <Input
                                                        name='t_description'
                                                        placeholder='Entry Description'
                                                        className='dark:border-gray-700 !shadow-none w-[200px] md:w-[200px] dark:text-gray-300'
                                                        value={row.description}
                                                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-2 md:px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200">
                                                <div className="text-sm leading-5">
                                                    <select
                                                        className='dark:border-gray-700 !shadow-none dark:text-gray-300 border w-[200px] md:w-[200px] px-2 py-2 rounded dark:bg-dark'
                                                        name="ac_name"
                                                        value={row.account}
                                                        onChange={(e) => handleInputChange(index, 'account', e.target.value)}
                                                    >
                                                        {items.map(itm => <option key={itm.key} value={itm.label}>{itm.label}</option>)}
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="px-2 md:px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200 w-[100px] md:w-[300px] text-justify text-nowrap">
                                                <div className="text-sm leading-5">
                                                    <Input
                                                        type='number'
                                                        name='debit'
                                                        placeholder='0.00'
                                                        className='dark:border-gray-700 !shadow-none dark:text-gray-300 w-[100px]'
                                                        value={row.debit}
                                                        onChange={(e) => handleInputChange(index, 'debit', parseFloat(e.target.value))}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-2 md:px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200 w-[100px] md:w-[300px] text-justify text-nowrap">
                                                <div className="text-sm leading-5">
                                                    <Input
                                                        type='number'
                                                        name='credit'
                                                        placeholder='0.00'
                                                        className='dark:border-gray-700 !shadow-none dark:text-gray-300 w-[100px]'
                                                        value={row.credit}
                                                        onChange={(e) => handleInputChange(index, 'credit', parseFloat(e.target.value))}
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-2 md:px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200 w-[100px] md:w-[300px] text-justify text-nowrap">

                                                <Button onClick={() => handleDeleteField(index)} type="danger" className='bg-[red]' icon={<DeleteOutlined />} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <br />
                <div className="flex md:flex-row flex-col items-start justify-between">
                    <Button type='primary' className='rounded' onClick={handleAddField}>+ Add Field</Button>
                    <div className="div">
                        <div className="mt-4 bg-light-dark px-3 py-2 rounded space-y-1 text-sm">
                            <div>Total Debit: {totalDebit.toFixed(2)}</div>
                            <div>Total Credit: {totalCredit.toFixed(2)}</div>
                            <div>Difference: {totalDifference.toFixed(2)}</div>
                        </div>

                        <div className="flex items-center gap-2 mt-12">
                            <Button htmlType='submit' type='submit' className='w-full !shadow-none bg-blue-600 text-light rounded'>Save</Button>
                            <Button type='primary' className='w-full bg-red-600 hover:!bg-red-700 text-light rounded'>Cancel</Button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default EditJournals;
