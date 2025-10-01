import React, { useState, useEffect, useContext } from 'react';
import DashboardHeader from '../../CommonComponents/DashboardHeader';
import DashboardTitle from '../../CommonComponents/DashboardTitle';
import { DatePicker, Input, Button, message, Select } from 'antd';
import { CookingPot } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { Moment } from 'moment';
import { useQuery } from '@tanstack/react-query';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

interface RowData {
    description: string;
    account: string;
    entity: string;
    debit: number;
    credit: number;
    status: 'added' | 'not-added';
}

export interface TableItem {
    _id: string;
    ac_name: string;
    description: string;
    status?: boolean;
    date?: string;
    entity: string;
}

const entities = [
    'expense',
    'discount',
    'operating-expense',
    'payment-processing',
    'payroll-expense',
    'uncategorized-expense',
    'income-discount',
];

const AddJournals: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useContext(Erp_context);

    const [rows, setRows] = useState<RowData[]>([
        {
            description: '',
            account: '',
            entity: '',
            debit: 0,
            credit: 0,
            status: 'not-added',
        },
    ]);

    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalDifference, setTotalDifference] = useState(0);
    const [date, setDate] = useState<Moment | null>(null);

    const [accounts, setAccounts] = useState<TableItem[]>([]);

    // Fetch all accounts dynamically grouped by entity
    const { data: fetchedAccounts = [] } = useQuery({
        queryKey: ['all-accounts', user?.workspace_id],
        queryFn: async () => {
            if (!user?._id || !user?.workspace_id) return [];
            let allAccounts: TableItem[] = [];
            for (const entity of entities) {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}coa/${entity}/get-${entity}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user._id,
                            workspace_id: user.workspace_id,
                        },
                    }
                );
                if (!res.ok) continue;
                const data = await res.json();
                console.log(data);
                const entityAccounts = (data.data || []).map((item: any) => ({
                    ...item,
                    entity,
                }));
                allAccounts = [...allAccounts, ...entityAccounts];
            }
            return allAccounts;
        },
        enabled: !!user?.workspace_id,
    });

    useEffect(() => {
        setAccounts(fetchedAccounts);
    }, [fetchedAccounts]);

    // Calculate totals
    useEffect(() => {
        const debitSum = rows.reduce((acc, row) => acc + row.debit, 0);
        const creditSum = rows.reduce((acc, row) => acc + row.credit, 0);
        setTotalDebit(debitSum);
        setTotalCredit(creditSum);
        setTotalDifference(debitSum - creditSum);
    }, [rows]);

    const handleDateChange = (value: Moment | null) => setDate(value);

    const handleAddField = () =>
        setRows([
            ...rows,
            {
                description: '',
                account: '',
                entity: '',
                debit: 0,
                credit: 0,
                status: 'not-added',
            },
        ]);

    const handleInputChange = (
        index: number,
        key: keyof RowData,
        value: string | number
    ) => {
        const newRows = [...rows];
        if (key === 'debit' || key === 'credit') {
            newRows[index][key] = Number(value) as RowData[typeof key];
        } else if (key === 'status') {
            newRows[index][key] = value as 'added' | 'not-added';
        } else {
            newRows[index][key] = value as string;
        }
        setRows(newRows);
    };

    const handleDeleteField = (index: number) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const referenceNumber = Math.floor(Math.random() * 1000000).toString();

    // inside handleSubmit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!date) {
            message.error('Please select a date!');
            return;
        }

        const form = e.currentTarget;
        const description = (form.description as HTMLInputElement).value;

        const validRows = rows.filter(
            row => row.account && (row.debit > 0 || row.credit > 0)
        );

        if (validRows.length === 0) {
            message.error('Please add at least one valid row');
            return;
        }

        try {
            const data = {
                reference_number: referenceNumber,
                date: date.format('YYYY-MM-DD'),
                description,
                field: validRows,
                totalDebit: validRows.reduce((sum, row) => sum + row.debit, 0),
                totalCredit: validRows.reduce(
                    (sum, row) => sum + row.credit,
                    0
                ),
                totalDifference: validRows.reduce(
                    (sum, row) => sum + row.debit - row.credit,
                    0
                ),
            };

            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}transaction/journal/create-journal`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!res.ok) throw new Error('Failed to create journal');

            message.success('Journal created successfully!', 3);
            setRows([
                {
                    description: '',
                    account: '',
                    entity: '',
                    debit: 0,
                    credit: 0,
                    status: 'not-added',
                },
            ]);
            setDate(null);
            navigate('/dashboard/accounting/chart_of_account/journals');
        } catch (error) {
            console.error(error);
            message.error('Something went wrong while creating the journal');
        }
    };

    return (
        <div>
            <DashboardHeader>
                <DashboardTitle title="Add Journals" />
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
                                onChange={handleDateChange}
                                className="w-full dark:bg-light-dark dark:border-dark-gray dark:text-white"
                                value={date}
                                format="YYYY-MM-DD"
                            />
                        </div>
                        <br />
                        <div className="space-y-1 md:col-span-2">
                            <label
                                htmlFor="description"
                                className="ml-1 text-xs"
                            >
                                Description
                            </label>
                            <TextArea
                                name="description"
                                placeholder="Entry Description"
                                className="dark:border-gray-700 !shadow-none w-full dark:text-gray-300"
                            />
                        </div>
                    </div>

                    <br />

                    <div className="m-auto w-[93vw] md:w-full">
                        <div className="md:w-full overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="dark:text-gray-200">
                                    <tr>
                                        <th>Account</th>
                                        <th>Debit</th>
                                        <th>Credit</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="dark:text-gray-500">
                                    {rows.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <Select
                                                    showSearch
                                                    placeholder="Select Account"
                                                    value={
                                                        row.account || undefined
                                                    }
                                                    onChange={(
                                                        value,
                                                        option
                                                    ) => {
                                                        handleInputChange(
                                                            index,
                                                            'account',
                                                            value as string
                                                        );
                                                        handleInputChange(
                                                            index,
                                                            'entity',
                                                            (option?.[
                                                                'data-entity'
                                                            ] as string) || ''
                                                        );
                                                    }}
                                                    optionLabelProp="label"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) => {
                                                        if (
                                                            typeof option?.label !==
                                                            'string'
                                                        )
                                                            return false;
                                                        return option.label
                                                            .toLowerCase()
                                                            .includes(
                                                                input.toLowerCase()
                                                            );
                                                    }}
                                                    className="w-full font-semibold"
                                                >
                                                    {Array.from(
                                                        accounts.reduce(
                                                            (map, acc) => {
                                                                if (
                                                                    !map.has(
                                                                        acc.entity
                                                                    )
                                                                )
                                                                    map.set(
                                                                        acc.entity,
                                                                        []
                                                                    );
                                                                map.get(
                                                                    acc.entity
                                                                )!.push(acc);
                                                                return map;
                                                            },
                                                            new Map<
                                                                string,
                                                                TableItem[]
                                                            >()
                                                        )
                                                    ).map(
                                                        ([
                                                            entity,
                                                            entityAccounts,
                                                        ]) => (
                                                            <Select.OptGroup
                                                                key={entity}
                                                                label={entity}
                                                            >
                                                                {entityAccounts.map(
                                                                    acc => (
                                                                        <Select.Option
                                                                            key={
                                                                                acc._id
                                                                            }
                                                                            value={
                                                                                acc.ac_name
                                                                            }
                                                                            label={
                                                                                acc.ac_name
                                                                            }
                                                                            data-entity={
                                                                                acc.entity
                                                                            }
                                                                        >
                                                                            <div>
                                                                                {
                                                                                    acc.ac_name
                                                                                }
                                                                            </div>
                                                                        </Select.Option>
                                                                    )
                                                                )}
                                                            </Select.OptGroup>
                                                        )
                                                    )}
                                                </Select>
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
                                                    disabled={row.credit > 0} // only disable if credit already has value
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
                                                    disabled={row.debit > 0} // only disable if debit already has value
                                                />
                                            </td>

                                            <td className="px-2 py-1">
                                                <div className="flex justify-center">
                                                    <Button
                                                        danger
                                                        icon={
                                                            <DeleteOutlined />
                                                        }
                                                        onClick={() =>
                                                            handleDeleteField(
                                                                index
                                                            )
                                                        }
                                                        className="h-8 w-8 flex items-center justify-center p-0"
                                                    />
                                                </div>
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
                        onClick={handleAddField}
                    >
                        Add Field
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
                                Save
                            </Button>

                            <Button
                                type="default"
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

export default AddJournals;
