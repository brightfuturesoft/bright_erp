import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardHeader from '../../CommonComponents/DashboardHeader';
import DashboardTitle from '../../CommonComponents/DashboardTitle';
import { DatePicker, Input, Button, message } from 'antd';
import { CookingPot } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import moment from 'moment';
import TextArea from 'antd/es/input/TextArea';
const EditJournal = () => {
    const { user } = useContext(Erp_context);
    const { id } = useParams();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalDifference, setTotalDifference] = useState(0);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState('');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const isValidId = id => !!id && /^[0-9a-fA-F]{24}$/.test(id);
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
    const handleDateChange = value => setDate(value);
    const handleInputChange = (index, key, value) => {
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
    const handleDeleteField = index => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };
    const handleSubmit = async e => {
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
    if (loading) return _jsx('p', { children: 'Loading...' });
    return _jsxs('div', {
        children: [
            _jsx(DashboardHeader, {
                children: _jsx(DashboardTitle, { title: 'Edit Journal' }),
            }),
            _jsxs('form', {
                onSubmit: handleSubmit,
                children: [
                    _jsxs('div', {
                        className: 'gap-2 grid md:grid-cols-3 mt-3 w-full',
                        children: [
                            _jsxs('div', {
                                className: 'space-y-1',
                                children: [
                                    _jsx('label', {
                                        className: 'ml-1 text-xs',
                                        children: 'Date',
                                    }),
                                    _jsx(DatePicker, {
                                        onChange: handleDateChange,
                                        className: 'w-full h-[40px]',
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
                                        className: 'ml-1 text-xs',
                                        children: 'Description',
                                    }),
                                    _jsx(TextArea, {
                                        value: description,
                                        onChange: e =>
                                            setDescription(e.target.value),
                                        placeholder: 'Entry Description',
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
                                            ],
                                        }),
                                    }),
                                    _jsx('tbody', {
                                        children: rows.map((row, index) =>
                                            _jsxs(
                                                'tr',
                                                {
                                                    children: [
                                                        _jsx('td', {
                                                            children: _jsx(
                                                                Input,
                                                                {
                                                                    value:
                                                                        row.account ||
                                                                        undefined,
                                                                    className:
                                                                        'dark:text-white',
                                                                    disabled: true,
                                                                }
                                                            ),
                                                        }),
                                                        _jsx('td', {
                                                            children: _jsx(
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
                                                            children: _jsx(
                                                                Input,
                                                                {
                                                                    type: 'number',
                                                                    value: row.credit,
                                                                    className:
                                                                        'dark:text-white',
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
                                                            children: _jsx(
                                                                Button,
                                                                {
                                                                    danger: true,
                                                                    icon: _jsx(
                                                                        CookingPot,
                                                                        {
                                                                            size: 16,
                                                                        }
                                                                    ),
                                                                    onClick:
                                                                        () =>
                                                                            handleDeleteField(
                                                                                index
                                                                            ),
                                                                    className:
                                                                        'ml-4',
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
                    _jsx('br', {}),
                    _jsxs('div', {
                        className:
                            'flex md:flex-row flex-col justify-between items-start',
                        children: [
                            _jsx(Button, {
                                type: 'primary',
                                onClick: handleAddField,
                                children: '+ Add Field',
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
                                                children: 'Update',
                                            }),
                                            _jsx(Button, {
                                                type: 'default',
                                                className:
                                                    'bg-red-600 hover:!bg-red-700 rounded w-full text-light',
                                                onClick: () => navigate(-1),
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
export default EditJournal;
