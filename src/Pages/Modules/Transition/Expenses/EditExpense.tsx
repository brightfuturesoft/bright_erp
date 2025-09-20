import React, { useState, useEffect, useContext } from 'react';
import {
    Layout,
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    Upload,
    Row,
    Col,
    Card,
    InputNumber,
    message,
    Alert,
} from 'antd';
import {
    UploadOutlined,
    DeleteOutlined,
    FileOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Erp_context } from '@/provider/ErpContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const { Content } = Layout;
const { TextArea } = Input;
const { Dragger } = Upload;

// --- Interfaces (can be reused from AddExpensePage) ---
interface ExpenseCategory {
    id: string;
    category: string;
    entity: string;
    amount: number | null;
}
interface TableItem {
    _id: string;
    ac_name: string;
    entity: string;
}
interface UploadedFile {
    uid: string;
    name: string;
    size: number;
    type: string;
}
const entities = [
    /* ... your entities list ... */
];

export default function EditExpensePage() {
    const expenseId = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user } = useContext(Erp_context);

    const [expenseCategories, setExpenseCategories] = useState<
        ExpenseCategory[]
    >([]);
    console.log(expenseCategories);
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [saveType, setSaveType] = useState<'Approved' | 'Draft'>('Approved');

    // ✅ 1. Fetch ALL accounts (for the dropdown options)
    const { data: accounts = [] } = useQuery<TableItem[]>({
        queryKey: ['all-accounts', user?.workspace_id],
        queryFn: async () => {
            /* ... same as your AddExpensePage ... */ return [];
        },
        enabled: !!user?.workspace_id,
    });

    // ✅ 2. Fetch the SPECIFIC expense data to edit
    const {
        data: expenseData,
        isLoading: isFetching,
        error,
    } = useQuery({
        queryKey: ['expense', expenseId],
        queryFn: async () => {
            if (!expenseId || !user) return null;
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}transaction/expense/get-expense/${expenseId?.id}`,
                {
                    headers: {
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch expense');
            const result = await res.json();
            return result.data;
        },
        enabled: !!user && !!expenseId,
    });

    // ✅ 3. Populate the form AND state once data is fetched
    useEffect(() => {
        if (expenseData) {
            // Populate static form fields
            form.setFieldsValue({
                date: dayjs(expenseData.date),
                expenseFrom: expenseData.expenseFrom,
                description: expenseData.description,
            });
            // Populate the state that drives the dynamic rows
            setExpenseCategories(
                expenseData.expenseCategories || [
                    { id: '1', category: '', entity: '', amount: 0 },
                ]
            );
        }
    }, [expenseData, form]);

    // ✅ 4. Setup the mutation for UPDATING the expense
    const { mutate: updateExpense, isPending: isUpdating } = useMutation({
        mutationFn: async (payload: any) => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}transaction/expense/update-expense`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify(payload),
                }
            );
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(
                    errorData.message || 'Failed to update expense'
                );
            }
            return res.json();
        },
        onSuccess: () => {
            message.success('Expense updated successfully!');
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            navigate('/dashboard/accounting/chart_of_account/expenses');
        },
        onError: (err: Error) => {
            message.error(err.message);
        },
    });

    // ✅ 5. Handle the form submission
    const onFinish = async (values: any, status: 'Approved' | 'Draft') => {
        if (!expenseCategories.every(cat => cat.category)) {
            return message.error(
                'Please select a category for all expense items.'
            );
        }

        const payload = {
            id: expenseId, // Include the ID for the backend to find the document
            date: values.date.format('YYYY-MM-DD'),
            time: dayjs().format('HH:mm:ss'),
            expenseFrom: values.expenseFrom,
            description: values.description,
            expenseCategories: expenseCategories.map(({ id, ...cat }) => cat), // Send without the frontend-only ID
            totalAmount: expenseCategories.reduce(
                (sum, cat) => sum + (cat.amount || 0),
                0
            ),
            status,
        };
        updateExpense(payload);
    };

    // --- All your helper functions can be copied from AddExpensePage ---
    const addExpenseCategory = () => {
        /* ... copy from AddExpensePage ... */
    };
    const removeExpenseCategory = (id: string) => {
        /* ... copy from AddExpensePage ... */
    };
    const updateExpenseCategory = (
        id: string,
        field: keyof ExpenseCategory,
        value: any
    ) => {
        /* ... copy from AddExpensePage ... */
    };
    const uploadProps = {
        /* ... copy from AddExpensePage ... */
    };

    if (isFetching) return <div>Loading expense data...</div>;
    if (error)
        return (
            <Alert
                message="Error"
                description={(error as Error).message}
                type="error"
                showIcon
            />
        );

    return (
        <Layout>
            <Content className="p-6">
                <h1 className="text-2xl font-bold mb-6">Edit Expense</h1>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={values => onFinish(values, saveType)}
                >
                    {/* --- Your entire Form JSX from AddExpensePage goes here --- */}
                    {/* I have included it below for completeness */}
                    <Row gutter={24}>
                        <Col
                            xs={24}
                            lg={16}
                        >
                            <Card className="mb-6">
                                <Row gutter={16}>
                                    <Col
                                        xs={24}
                                        md={8}
                                    >
                                        <Form.Item
                                            label="Date *"
                                            name="date"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please select date',
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                                className="w-full"
                                                format="DD MMM YYYY"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        xs={24}
                                        md={8}
                                    >
                                        <Form.Item
                                            label="Expense From *"
                                            name="expenseFrom"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please select expense from',
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="Select Account"
                                                className="w-full"
                                            >
                                                <Select.Option value="brac-bank">
                                                    Brac Bank
                                                </Select.Option>
                                                {/* ... other options ... */}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    label="Description *"
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter description',
                                        },
                                    ]}
                                >
                                    <TextArea
                                        rows={4}
                                        placeholder="Description"
                                    />
                                </Form.Item>
                            </Card>

                            <Card className="mb-6">
                                {expenseCategories.map(cat => (
                                    <Row
                                        key={cat.id}
                                        gutter={16}
                                        className="mb-4"
                                    >
                                        <Col
                                            xs={24}
                                            md={16}
                                        >
                                            <Select
                                                placeholder="Select Expense Category"
                                                className="w-full"
                                                value={
                                                    cat.category || undefined
                                                }
                                                onChange={(value, option) => {
                                                    updateExpenseCategory(
                                                        cat.id,
                                                        'category',
                                                        value
                                                    );
                                                    updateExpenseCategory(
                                                        cat.id,
                                                        'entity',
                                                        (option as any)?.[
                                                            'data-entity'
                                                        ] || ''
                                                    );
                                                }}
                                                // ... other select props
                                            >
                                                {/* ... mapping over accounts to create options ... */}
                                            </Select>
                                        </Col>
                                        <Col
                                            xs={20}
                                            md={6}
                                        >
                                            <InputNumber
                                                className="w-full"
                                                value={cat.amount}
                                                onChange={value =>
                                                    updateExpenseCategory(
                                                        cat.id,
                                                        'amount',
                                                        value || 0
                                                    )
                                                }
                                                // ... other input number props
                                            />
                                        </Col>
                                        <Col
                                            xs={4}
                                            md={2}
                                        >
                                            {expenseCategories.length > 1 && (
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() =>
                                                        removeExpenseCategory(
                                                            cat.id
                                                        )
                                                    }
                                                />
                                            )}
                                        </Col>
                                    </Row>
                                ))}
                                <Button
                                    type="dashed"
                                    onClick={addExpenseCategory}
                                    className="w-full mt-2"
                                    icon={<PlusOutlined />}
                                >
                                    Add Row
                                </Button>
                            </Card>
                        </Col>

                        <Col
                            xs={24}
                            lg={8}
                        >
                            {/* File Upload and Total Cards */}
                        </Col>
                    </Row>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            size="large"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="large"
                            loading={isUpdating && saveType === 'Draft'}
                            onClick={() => {
                                setSaveType('Draft');
                                form.submit();
                            }}
                        >
                            Save As Draft
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            loading={isUpdating && saveType === 'Approved'}
                            onClick={() => {
                                setSaveType('Approved');
                                form.submit();
                            }}
                        >
                            Update Expense
                        </Button>
                    </div>
                </Form>
            </Content>
        </Layout>
    );
}
