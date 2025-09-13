import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Layout,
    Input,
    Select,
    DatePicker,
    Button,
    Card,
    InputNumber,
    message,
    Switch,
} from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';

const { Content } = Layout;
const { TextArea } = Input;

const entities = [
    'expense',
    'discount',
    'operating-expense',
    'payment-processing',
    'payroll-expense',
    'uncategorized-expense',
    'income-discount',
];

interface ExpenseCategory {
    id: string;
    category: string;
    entity: string;
    amount: number;
}

interface TableItem {
    _id: string;
    ac_name: string;
    entity: string;
}

const EditExpense: React.FC = () => {
    const { user } = useContext(Erp_context);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(false);
    const [expenseCategories, setExpenseCategories] = useState<
        ExpenseCategory[]
    >([]);
    const [date, setDate] = useState<Dayjs | null>(null);
    const [expenseFrom, setExpenseFrom] = useState('');
    const [description, setDescription] = useState('');
    const [saveType, setSaveType] = useState<'Approved' | 'Draft'>('Approved');
    const [loading, setLoading] = useState(true);

    const totalAmount = expenseCategories.reduce(
        (sum, cat) => sum + (cat.amount || 0),
        0
    );

    // Fetch all accounts
    const { data: accounts = [] } = useQuery({
        queryKey: ['all-accounts', user?.workspace_id],
        queryFn: async () => {
            if (!user?._id || !user?.workspace_id) return [];
            let allAccounts: TableItem[] = [];
            for (const entity of entities) {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}coa/${entity}/get-${entity}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user._id,
                            workspace_id: user.workspace_id,
                        },
                    }
                );
                if (!res.ok) continue;
                const data = await res.json();
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

    const isValidId = (id?: string) => !!id && /^[0-9a-fA-F]{24}$/.test(id);

    // Fetch expense by ID
    useEffect(() => {
        if (!user?._id || !isValidId(id)) {
            message.error('Invalid Expense ID or User not loaded');
            setLoading(false);
            return;
        }

        const fetchExpense = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}transaction/expense/get-expense/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user._id,
                            workspace_id: user.workspace_id,
                        },
                    }
                );
                const result = await res.json();
                if (res.ok && !result.error) {
                    const exp = result.data;
                    setDate(dayjs(exp.date));
                    setExpenseFrom(exp.expenseFrom);
                    setDescription(exp.description);
                    setExpenseCategories(
                        exp.expenseCategories.map((c: any, index: number) => ({
                            id: String(index + 1),
                            category: c.category,
                            entity: c.entity,
                            amount: c.amount,
                        }))
                    );
                } else {
                    message.error(result.message || 'Failed to fetch expense');
                }
            } catch (err) {
                console.error(err);
                message.error('Error fetching expense');
            } finally {
                setLoading(false);
            }
        };

        fetchExpense();
    }, [id, user]);

    const addExpenseCategory = () => {
        setExpenseCategories([
            ...expenseCategories,
            { id: Date.now().toString(), category: '', entity: '', amount: 0 },
        ]);
    };

    const removeExpenseCategory = (id: string) => {
        if (expenseCategories.length > 1) {
            setExpenseCategories(expenseCategories.filter(c => c.id !== id));
        }
    };

    const updateExpenseCategory = (
        id: string,
        field: keyof ExpenseCategory,
        value: any
    ) => {
        setExpenseCategories(
            expenseCategories.map(c =>
                c.id === id ? { ...c, [field]: value } : c
            )
        );
    };

    const handleSubmit = async () => {
        if (!user?._id || !date)
            return message.error('User or date not loaded');

        // Validation
        if (!expenseFrom) return message.error('Please select Expense From');
        if (!expenseCategories.every(c => c.category && c.amount >= 0))
            return message.error('Please fill all categories and amounts');

        const payload = {
            id,
            date: date.format('YYYY-MM-DD'),
            expenseFrom,
            description,
            expenseCategories,
            totalAmount,
            status: saveType,
        };

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}transaction/expense/update-expense`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const result = await res.json();
            if (res.ok && !result.error) {
                message.success('Expense updated successfully!', 3);
                navigate('/dashboard/accounting/chart_of_account/expenses');
            } else {
                message.error(result.message || 'Failed to update expense');
            }
        } catch (err) {
            console.error(err);
            message.error('Something went wrong while updating expense');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className={darkMode ? 'dark' : ''}>
            <Layout>
                <Content className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Edit Expense</h2>
                    <Switch
                        checked={darkMode}
                        onChange={setDarkMode}
                    />{' '}
                    Dark Mode
                    <div className="mt-4">
                        <DatePicker
                            value={date}
                            onChange={setDate}
                            className="mb-4 w-full"
                        />
                        <Select
                            value={expenseFrom}
                            onChange={setExpenseFrom}
                            className="mb-4 w-full"
                            placeholder="Select Expense From"
                        >
                            {accounts
                                .filter(a => !entities.includes(a.entity))
                                .map(acc => (
                                    <Select.Option
                                        key={acc._id}
                                        value={acc.ac_name}
                                    >
                                        {acc.ac_name}
                                    </Select.Option>
                                ))}
                        </Select>
                        <TextArea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={4}
                            className="mb-4 w-full"
                            placeholder="Description"
                        />

                        <Card className="mb-4">
                            {expenseCategories.map(cat => (
                                <div
                                    key={cat.id}
                                    className="flex gap-2 mb-2 items-center"
                                >
                                    <Select
                                        placeholder="Select Expense Category"
                                        value={cat.category || undefined}
                                        onChange={(v, option) => {
                                            updateExpenseCategory(
                                                cat.id,
                                                'category',
                                                v
                                            );
                                            updateExpenseCategory(
                                                cat.id,
                                                'entity',
                                                (option as any)?.[
                                                    'data-entity'
                                                ] || ''
                                            );
                                        }}
                                        className="flex-1"
                                        optionLabelProp="label"
                                    >
                                        {Array.from(
                                            accounts.reduce((map, acc) => {
                                                if (!map.has(acc.entity))
                                                    map.set(acc.entity, []);
                                                map.get(acc.entity)!.push(acc);
                                                return map;
                                            }, new Map<string, TableItem[]>())
                                        ).map(([entity, entityAccounts]) => (
                                            <Select.OptGroup
                                                key={entity}
                                                label={entity}
                                            >
                                                {entityAccounts.map(acc => (
                                                    <Select.Option
                                                        key={acc._id}
                                                        value={acc.ac_name}
                                                        label={acc.ac_name}
                                                        data-entity={acc.entity}
                                                    >
                                                        {acc.ac_name}
                                                    </Select.Option>
                                                ))}
                                            </Select.OptGroup>
                                        ))}
                                    </Select>

                                    <InputNumber
                                        value={
                                            cat.amount === 0
                                                ? undefined
                                                : cat.amount
                                        }
                                        min={0}
                                        onChange={v =>
                                            updateExpenseCategory(
                                                cat.id,
                                                'amount',
                                                v || 0
                                            )
                                        }
                                    />

                                    {expenseCategories.length > 1 && (
                                        <Button
                                            type="text"
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() =>
                                                removeExpenseCategory(cat.id)
                                            }
                                        />
                                    )}
                                </div>
                            ))}
                            <Button
                                type="dashed"
                                onClick={addExpenseCategory}
                                icon={<PlusOutlined />}
                                className="w-full mt-2"
                            >
                                Add Row
                            </Button>
                        </Card>

                        <Card className="mb-4 flex justify-between">
                            <span>Total Amount</span>
                            <span>{totalAmount.toFixed(2)}</span>
                        </Card>

                        <div className="flex gap-2 justify-end">
                            <Button
                                type="default"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="default"
                                onClick={() => {
                                    setSaveType('Draft');
                                    handleSubmit();
                                }}
                            >
                                Save as Draft
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setSaveType('Approved');
                                    handleSubmit();
                                }}
                            >
                                Save as Approved
                            </Button>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    );
};

export default EditExpense;
