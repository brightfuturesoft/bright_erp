import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardHeader from '../../CommonComponents/DashboardHeader';
import DashboardTitle from '../../CommonComponents/DashboardTitle';
import { DatePicker, Input, Button, message, Select } from 'antd';
import { CookingPot } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import moment, { Moment } from 'moment';
import TextArea from 'antd/es/input/TextArea';

interface RowData {
    description: string;
    account: string;
    debit: number;
    credit: number;
    status: 'added' | 'not-added';
}

const EditJournal: React.FC = () => {
    const { user } = useContext(Erp_context);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [rows, setRows] = useState<RowData[]>([]);
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalDifference, setTotalDifference] = useState(0);
    const [date, setDate] = useState<Moment | null>(null);
    const [description, setDescription] = useState('');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [loading, setLoading] = useState(true);

    const isValidId = (id?: string) => !!id && /^[0-9a-fA-F]{24}$/.test(id);

    useEffect(() => {
        if (!isValidId(id)) {
            message.error('Invalid Journal ID');
            setLoading(false);
            return;
        }

        if (!user?._id) return;

        const fetchJournal = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}transaction/journal/get/${id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user._id,
                            workspace_id: user.workspace_id,
                        },
                    }
                );

                const data = await res.json();
                if (res.ok) {
                    setRows(data.data.field || []);
                    setDate(data.data.date ? moment(data.data.date) : null);
                    setDescription(data.data.description || '');
                    setReferenceNumber(data.data.reference_number || '');
                    setTotalDebit(data.data.totalDebit || 0);
                    setTotalCredit(data.data.totalCredit || 0);
                    setTotalDifference(data.data.totalDifference || 0);
                } else {
                    message.error(data.message || 'Failed to fetch journal');
                }
            } catch (error) {
                console.error(error);
                message.error('Error fetching journal');
            } finally {
                setLoading(false);
            }
        };

        fetchJournal();
    }, [id, user]);

    useEffect(() => {
        const debitSum = rows.reduce((acc, row) => acc + row.debit, 0);
        const creditSum = rows.reduce((acc, row) => acc + row.credit, 0);
        setTotalDebit(debitSum);
        setTotalCredit(creditSum);
        setTotalDifference(debitSum - creditSum);
    }, [rows]);

    const handleDateChange = (value: Moment | null) => setDate(value);

    const handleInputChange = <K extends keyof RowData>(
        index: number,
        key: K,
        value: RowData[K]
    ) => {
        const newRows = [...rows];
        newRows[index][key] = value;
        setRows(newRows);
    };

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

    const handleDeleteField = (index: number) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!date) return message.error('Please select a date!');
        if (!isValidId(id)) return message.error('Invalid Journal ID');
        if (!user?._id) return message.error('User not loaded');

        const data = {
            id,
            reference_number: referenceNumber,
            date: date.format('YYYY-MM-DD'),
            description,
            field: rows,
            totalDebit,
            totalCredit,
            totalDifference,
        };

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}transaction/journal/update-journal`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                    body: JSON.stringify(data),
                }
            );
            const result = await res.json();
            if (res.ok) {
                message.success('Journal updated successfully!', 3);
                navigate('/dashboard/accounting/chart_of_account/journals');
            } else {
                message.error(result.message || 'Failed to update journal');
            }
        } catch (error) {
            console.error(error);
            message.error('Something went wrong while updating the journal');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <DashboardHeader>
                <DashboardTitle title="Edit Journal" />
            </DashboardHeader>

            <form onSubmit={handleSubmit}>
                <div className="gap-2 grid md:grid-cols-3 mt-3 w-full">
                    <div className="space-y-1">
                        <label className="ml-1 text-xs">Date</label>
                        <DatePicker
                            onChange={handleDateChange}
                            className="w-full h-[40px]"
                            value={date}
                            format="YYYY-MM-DD"
                        />
                    </div>
                    <br />
                    <div className="space-y-1 md:col-span-2">
                        <label className="ml-1 text-xs">Description</label>
                        <TextArea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Entry Description"
                            className="dark:border-gray-700 !shadow-none w-full dark:text-gray-300"
                        />
                    </div>
                </div>

                <br />

                <div className="m-auto w-[93vw] md:w-full">
                    <div className="border-gray-200 dark:border-gray-700 border md:w-full overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th>Account</th>
                                    <th>Debit</th>
                                    <th>Credit</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Input
                                                value={row.account || undefined}
                                                disabled
                                            ></Input>
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                value={row.debit}
                                                onChange={e => {
                                                    const val =
                                                        parseFloat(
                                                            e.target.value
                                                        ) || 0;
                                                    handleInputChange(
                                                        index,
                                                        'debit',
                                                        val
                                                    );
                                                    if (val > 0)
                                                        handleInputChange(
                                                            index,
                                                            'credit',
                                                            0
                                                        );
                                                }}
                                                disabled={row.credit > 0}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                value={row.credit}
                                                onChange={e => {
                                                    const val =
                                                        parseFloat(
                                                            e.target.value
                                                        ) || 0;
                                                    handleInputChange(
                                                        index,
                                                        'credit',
                                                        val
                                                    );
                                                    if (val > 0)
                                                        handleInputChange(
                                                            index,
                                                            'debit',
                                                            0
                                                        );
                                                }}
                                                disabled={row.debit > 0}
                                            />
                                        </td>
                                        <td>
                                            <Button
                                                danger
                                                icon={<CookingPot size={16} />}
                                                onClick={() =>
                                                    handleDeleteField(index)
                                                }
                                                className="ml-4"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <br />

                <div className="flex md:flex-row flex-col justify-between items-start">
                    <Button
                        type="primary"
                        onClick={handleAddField}
                    >
                        + Add Field
                    </Button>

                    <div>
                        <div className="space-y-1 bg-light-dark mt-4 px-3 py-2 rounded text-sm">
                            <div>Total Debit: {totalDebit.toFixed(2)}</div>
                            <div>Total Credit: {totalCredit.toFixed(2)}</div>
                            <div>Difference: {totalDifference.toFixed(2)}</div>
                        </div>

                        <div className="flex items-center gap-2 mt-12">
                            <Button
                                htmlType="submit"
                                type="primary"
                                className="bg-blue-600 !shadow-none rounded w-full text-light"
                            >
                                Update
                            </Button>
                            <Button
                                type="default"
                                className="bg-red-600 hover:!bg-red-700 rounded w-full text-light"
                                onClick={() => navigate(-1)}
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

export default EditJournal;
