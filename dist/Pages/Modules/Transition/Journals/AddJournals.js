import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useContext } from 'react';
import DashboardHeader from '../../CommonComponents/DashboardHeader';
import DashboardTitle from '../../CommonComponents/DashboardTitle';
import { DatePicker, Input, Button, message, Select } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
const entities = [
    'expense',
    'discount',
    'operating-expense',
    'payment-processing',
    'payroll-expense',
    'uncategorized-expense',
    'income-discount',
];
const AddJournals = () => {
    const navigate = useNavigate();
    const { user } = useContext(Erp_context);
    const [rows, setRows] = useState([
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
    const [date, setDate] = useState(null);
    const [accounts, setAccounts] = useState([]);
    // Fetch all accounts dynamically grouped by entity
    const { data: fetchedAccounts = [] } = useQuery({
        queryKey: ['all-accounts', user?.workspace_id],
        queryFn: async () => {
            if (!user?._id || !user?.workspace_id) return [];
            let allAccounts = [];
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
                const entityAccounts = (data.data || []).map(item => ({
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
    const handleDateChange = value => setDate(value);
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
    const handleInputChange = (index, key, value) => {
        const newRows = [...rows];
        if (key === 'debit' || key === 'credit') {
            newRows[index][key] = Number(value);
        } else if (key === 'status') {
            newRows[index][key] = value;
        } else {
            newRows[index][key] = value;
        }
        setRows(newRows);
    };
    const handleDeleteField = index => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };
    const referenceNumber = Math.floor(Math.random() * 1000000).toString();
    // inside handleSubmit
    const handleSubmit = async e => {
        e.preventDefault();
        if (!date) {
            message.error('Please select a date!');
            return;
        }
        const form = e.currentTarget;
        const description = form.description.value;
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
    return _jsxs('div', {
        children: [
            _jsx(DashboardHeader, {
                children: _jsx(DashboardTitle, { title: 'Add Journals' }),
            }),
            _jsxs('form', {
                onSubmit: handleSubmit,
                children: [
                    _jsxs('div', {
                        className: 'relative',
                        children: [
                            _jsxs('div', {
                                className:
                                    'gap-2 grid md:grid-cols-3 mt-3 w-full',
                                children: [
                                    _jsxs('div', {
                                        className: 'space-y-1',
                                        children: [
                                            _jsx('label', {
                                                htmlFor: 'date',
                                                className: 'ml-1 text-xs',
                                                children: 'Date',
                                            }),
                                            _jsx(DatePicker, {
                                                onChange: handleDateChange,
                                                className:
                                                    'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                value: date,
                                                format: 'YYYY-MM-DD',
                                            }),
                                        ],
                                    }),
                                    _jsx('br', {}),
                                    _jsxs('div', {
                                        className: 'space-y-1 md:col-span-2',
                                        children: [
                                            _jsx('label', {
                                                htmlFor: 'description',
                                                className: 'ml-1 text-xs',
                                                children: 'Description',
                                            }),
                                            _jsx(TextArea, {
                                                name: 'description',
                                                placeholder:
                                                    'Entry Description',
                                                className:
                                                    'dark:border-gray-700 !shadow-none w-full dark:text-gray-300',
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            _jsx('br', {}),
                            _jsx('div', {
                                className: 'm-auto w-[93vw] md:w-full',
                                children: _jsx('div', {
                                    className: 'md:w-full overflow-x-auto',
                                    children: _jsxs('table', {
                                        className: 'min-w-full',
                                        children: [
                                            _jsx('thead', {
                                                className: 'dark:text-gray-200',
                                                children: _jsxs('tr', {
                                                    children: [
                                                        _jsx('th', {
                                                            children: 'Account',
                                                        }),
                                                        _jsx('th', {
                                                            children: 'Debit',
                                                        }),
                                                        _jsx('th', {
                                                            children: 'Credit',
                                                        }),
                                                        _jsx('th', {
                                                            children: 'Action',
                                                        }),
                                                    ],
                                                }),
                                            }),
                                            _jsx('tbody', {
                                                className: 'dark:text-gray-500',
                                                children: rows.map(
                                                    (row, index) =>
                                                        _jsxs(
                                                            'tr',
                                                            {
                                                                children: [
                                                                    _jsx('td', {
                                                                        children:
                                                                            _jsx(
                                                                                Select,
                                                                                {
                                                                                    showSearch: true,
                                                                                    placeholder:
                                                                                        'Select Account',
                                                                                    value:
                                                                                        row.account ||
                                                                                        undefined,
                                                                                    onChange:
                                                                                        (
                                                                                            value,
                                                                                            option
                                                                                        ) => {
                                                                                            handleInputChange(
                                                                                                index,
                                                                                                'account',
                                                                                                value
                                                                                            );
                                                                                            handleInputChange(
                                                                                                index,
                                                                                                'entity',
                                                                                                option?.[
                                                                                                    'data-entity'
                                                                                                ] ||
                                                                                                    ''
                                                                                            );
                                                                                        },
                                                                                    optionLabelProp:
                                                                                        'label',
                                                                                    filterOption:
                                                                                        (
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
                                                                                        },
                                                                                    className:
                                                                                        'w-full font-semibold',
                                                                                    children:
                                                                                        Array.from(
                                                                                            accounts.reduce(
                                                                                                (
                                                                                                    map,
                                                                                                    acc
                                                                                                ) => {
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
                                                                                                    ).push(
                                                                                                        acc
                                                                                                    );
                                                                                                    return map;
                                                                                                },
                                                                                                new Map()
                                                                                            )
                                                                                        ).map(
                                                                                            ([
                                                                                                entity,
                                                                                                entityAccounts,
                                                                                            ]) =>
                                                                                                _jsx(
                                                                                                    Select.OptGroup,
                                                                                                    {
                                                                                                        label: entity,
                                                                                                        children:
                                                                                                            entityAccounts.map(
                                                                                                                acc =>
                                                                                                                    _jsx(
                                                                                                                        Select.Option,
                                                                                                                        {
                                                                                                                            value: acc.ac_name,
                                                                                                                            label: acc.ac_name,
                                                                                                                            'data-entity':
                                                                                                                                acc.entity,
                                                                                                                            children:
                                                                                                                                _jsx(
                                                                                                                                    'div',
                                                                                                                                    {
                                                                                                                                        children:
                                                                                                                                            acc.ac_name,
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                        },
                                                                                                                        acc._id
                                                                                                                    )
                                                                                                            ),
                                                                                                    },
                                                                                                    entity
                                                                                                )
                                                                                        ),
                                                                                }
                                                                            ),
                                                                    }),
                                                                    _jsx('td', {
                                                                        children:
                                                                            _jsx(
                                                                                Input,
                                                                                {
                                                                                    type: 'number',
                                                                                    value: row.debit,
                                                                                    onChange:
                                                                                        e => {
                                                                                            const val =
                                                                                                parseFloat(
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                ) ||
                                                                                                0;
                                                                                            handleInputChange(
                                                                                                index,
                                                                                                'debit',
                                                                                                val
                                                                                            );
                                                                                            if (
                                                                                                val >
                                                                                                0
                                                                                            )
                                                                                                handleInputChange(
                                                                                                    index,
                                                                                                    'credit',
                                                                                                    0
                                                                                                );
                                                                                        },
                                                                                    disabled:
                                                                                        row.credit >
                                                                                        0,
                                                                                }
                                                                            ),
                                                                    }),
                                                                    _jsx('td', {
                                                                        children:
                                                                            _jsx(
                                                                                Input,
                                                                                {
                                                                                    type: 'number',
                                                                                    value: row.credit,
                                                                                    onChange:
                                                                                        e => {
                                                                                            const val =
                                                                                                parseFloat(
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                ) ||
                                                                                                0;
                                                                                            handleInputChange(
                                                                                                index,
                                                                                                'credit',
                                                                                                val
                                                                                            );
                                                                                            if (
                                                                                                val >
                                                                                                0
                                                                                            )
                                                                                                handleInputChange(
                                                                                                    index,
                                                                                                    'debit',
                                                                                                    0
                                                                                                );
                                                                                        },
                                                                                    disabled:
                                                                                        row.debit >
                                                                                        0,
                                                                                }
                                                                            ),
                                                                    }),
                                                                    _jsx('td', {
                                                                        className:
                                                                            'px-2 py-1',
                                                                        children:
                                                                            _jsx(
                                                                                'div',
                                                                                {
                                                                                    className:
                                                                                        'flex justify-center',
                                                                                    children:
                                                                                        _jsx(
                                                                                            Button,
                                                                                            {
                                                                                                danger: true,
                                                                                                icon: _jsx(
                                                                                                    DeleteOutlined,
                                                                                                    {}
                                                                                                ),
                                                                                                onClick:
                                                                                                    () =>
                                                                                                        handleDeleteField(
                                                                                                            index
                                                                                                        ),
                                                                                                className:
                                                                                                    'h-8 w-8 flex items-center justify-center p-0',
                                                                                            }
                                                                                        ),
                                                                                }
                                                                            ),
                                                                    }),
                                                                ],
                                                            },
                                                            index
                                                        )
                                                ),
                                            }),
                                        ],
                                    }),
                                }),
                            }),
                        ],
                    }),
                    _jsx('br', {}),
                    _jsxs('div', {
                        className:
                            'flex md:flex-row flex-col justify-between items-start',
                        children: [
                            _jsx(Button, {
                                type: 'primary',
                                onClick: handleAddField,
                                children: 'Add Field',
                            }),
                            _jsxs('div', {
                                children: [
                                    _jsxs('div', {
                                        className:
                                            'space-y-1 bg-light-dark mt-4 px-3 py-2 rounded text-sm',
                                        children: [
                                            _jsxs('div', {
                                                children: [
                                                    'Total Debit: ',
                                                    totalDebit.toFixed(2),
                                                ],
                                            }),
                                            _jsxs('div', {
                                                children: [
                                                    'Total Credit: ',
                                                    totalCredit.toFixed(2),
                                                ],
                                            }),
                                            _jsxs('div', {
                                                children: [
                                                    'Difference: ',
                                                    totalDifference.toFixed(2),
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsxs('div', {
                                        className:
                                            'flex items-center gap-2 mt-12',
                                        children: [
                                            _jsx(Button, {
                                                htmlType: 'submit',
                                                type: 'primary',
                                                className:
                                                    'bg-blue-600 !shadow-none rounded w-full text-light',
                                                children: 'Save',
                                            }),
                                            _jsx(Button, {
                                                type: 'default',
                                                className:
                                                    'bg-red-600 hover:!bg-red-700 rounded w-full text-light',
                                                children: 'Cancel',
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
};
export default AddJournals;
