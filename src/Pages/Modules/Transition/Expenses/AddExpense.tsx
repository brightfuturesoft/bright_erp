import { useState, useContext } from 'react';
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
} from 'antd';
import {
    UploadOutlined,
    DeleteOutlined,
    FileOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Erp_context } from '@/provider/ErpContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const { Content } = Layout;
const { TextArea } = Input;
const { Dragger } = Upload;

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

const entities = [
    'expense',
    'discount',
    'operating-expense',
    'payment-processing',
    'payroll-expense',
    'uncategorized-expense',
    'income-discount',
];

interface UploadedFile {
    uid: string;
    name: string;
    size: number;
    type: string;
}

export default function AddExpensePage() {
    const [darkMode] = useState(false);
    const [form] = Form.useForm();
    const [expenseCategories, setExpenseCategories] = useState<
        ExpenseCategory[]
    >([{ id: '1', category: '', entity: '', amount: 0 }]);
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

    const { user } = useContext(Erp_context);
    const navigate = useNavigate();
    const [saveType, setSaveType] = useState<'Approved' | 'Draft'>('Approved');

    // Fetch accounts grouped by entity
    const { data: accounts = [] } = useQuery({
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

    const uploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        showUploadList: false,
        beforeUpload: (file: any) => {
            setUploadedFile({
                uid: file.uid,
                name: file.name,
                size: file.size,
                type: file.type,
            });
            return false;
        },
        onDrop(e: any) {
            const file = e.dataTransfer.files[0];
            if (file) {
                setUploadedFile({
                    uid: Date.now().toString(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                });
            }
        },
    };

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

    const totalAmount = expenseCategories.reduce(
        (sum, cat) => sum + (cat.amount || 0),
        0
    );

    const onFinish = async (values: any, status: 'Approved' | 'Draft') => {
        try {
            if (!user?._id || !user?.workspace_id) {
                message.error('User or workspace not found');
                return;
            }

            const payload = {
                date: values.date.format('YYYY-MM-DD'),
                time: dayjs().format('HH:mm:ss'),
                expenseFrom: values.expenseFrom,
                description: values.description,
                expenseCategories,
                totalAmount,
                status,
            };

            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}transaction/expense/create-expense`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user._id}`,
                        workspace_id: `${user.workspace_id}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) throw new Error('Failed to create expense');

            message.success(`Expense saved as ${status}!`, 3);
            form.resetFields();
            setExpenseCategories([
                { id: '1', category: '', entity: '', amount: 0 },
            ]);
            setUploadedFile(null);
            navigate('/dashboard/accounting/chart_of_account/expenses');
        } catch (error) {
            console.error(error);
            message.error('Something went wrong while creating the expense');
        }
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <Layout className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <Content className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        Add Expense
                    </h1>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={values => onFinish(values, saveType)}
                        initialValues={{ date: dayjs() }}
                    >
                        <Row gutter={24}>
                            <Col
                                xs={24}
                                lg={16}
                            >
                                {/* General Info */}
                                <Card className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
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
                                                    className="dark:bg-light-dark dark:border-dark-gray dark:text-white"
                                                    format="DD MMM YYYY"
                                                    defaultValue={dayjs()}
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
                                                    <Select.Option value="petty-cash">
                                                        Petty Cash
                                                    </Select.Option>
                                                    <Select.Option value="corporate-card">
                                                        Corporate Card
                                                    </Select.Option>
                                                    <Select.Option value="cash">
                                                        Cash
                                                    </Select.Option>
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
                                                message:
                                                    'Please enter description',
                                            },
                                        ]}
                                    >
                                        <TextArea
                                            rows={4}
                                            placeholder="Description"
                                            className="w-full"
                                        />
                                    </Form.Item>
                                </Card>

                                {/* Expense Categories */}
                                <Card className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            EXPENSE CATEGORY
                                        </h3>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            AMOUNT
                                        </h3>
                                    </div>

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
                                                        cat.category ||
                                                        undefined
                                                    }
                                                    onChange={(
                                                        value,
                                                        option
                                                    ) => {
                                                        updateExpenseCategory(
                                                            cat.id,
                                                            'category',
                                                            value
                                                        );
                                                        updateExpenseCategory(
                                                            cat.id,
                                                            'entity',
                                                            option?.[
                                                                'data-entity'
                                                            ] || ''
                                                        );
                                                    }}
                                                    optionLabelProp="label"
                                                    showSearch
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label as string
                                                        )
                                                            ?.toLowerCase()
                                                            .includes(
                                                                input.toLowerCase()
                                                            )
                                                    }
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
                                                                            {
                                                                                acc.ac_name
                                                                            }
                                                                        </Select.Option>
                                                                    )
                                                                )}
                                                            </Select.OptGroup>
                                                        )
                                                    )}
                                                </Select>
                                            </Col>

                                            <Col
                                                xs={20}
                                                md={6}
                                            >
                                                <Input
                                                    className="dark:bg-light-dark dark:border-dark-gray dark:text-white"
                                                    min={0}
                                                    value={
                                                        cat.amount === 0
                                                            ? undefined
                                                            : cat.amount
                                                    }
                                                    placeholder="0.00"
                                                    onFocus={() => {
                                                        if (cat.amount === 0)
                                                            updateExpenseCategory(
                                                                cat.id,
                                                                'amount',
                                                                null
                                                            );
                                                    }}
                                                    onChange={value =>
                                                        updateExpenseCategory(
                                                            cat.id,
                                                            'amount',
                                                            value || 0
                                                        )
                                                    }
                                                />
                                            </Col>

                                            <Col
                                                xs={4}
                                                md={2}
                                            >
                                                {expenseCategories.length >
                                                    1 && (
                                                    <Button
                                                        type="text"
                                                        danger
                                                        icon={
                                                            <DeleteOutlined />
                                                        }
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

                            {/* Right Column */}
                            <Col
                                xs={24}
                                lg={8}
                            >
                                {/* File Upload */}
                                <Card className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                        Upload a file
                                    </h3>
                                    {!uploadedFile ? (
                                        <Dragger
                                            {...uploadProps}
                                            className="bg-gray-50 dark:bg-gray-700 border-dashed border-2 border-gray-300 dark:border-gray-600"
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <UploadOutlined className="text-4xl text-gray-500 dark:text-gray-300" />
                                            </p>
                                            <p className="ant-upload-text text-gray-900 dark:text-gray-100">
                                                Drag and drop file here
                                            </p>
                                            <p className="ant-upload-hint text-gray-500 dark:text-gray-400">
                                                or
                                            </p>
                                            <Button
                                                type="primary"
                                                className="bg-primary mt-2"
                                            >
                                                Choose File
                                            </Button>
                                        </Dragger>
                                    ) : (
                                        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <FileOutlined className="text-2xl text-blue-600 dark:text-blue-400" />
                                                    <p className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px]">
                                                        {uploadedFile.name}
                                                    </p>
                                                </div>
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() =>
                                                        setUploadedFile(null)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Card>

                                {/* Total */}
                                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                        TOTAL
                                    </h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-900 dark:text-gray-100 font-medium">
                                            Total Amount
                                        </span>
                                        <span className="text-green-600 font-semibold">
                                            {totalAmount.toFixed(2)}
                                        </span>
                                    </div>
                                </Card>
                            </Col>
                        </Row>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-6">
                            <Button
                                size="large"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="large"
                                className="bg-primary text-white"
                                onClick={() => {
                                    setSaveType('Draft');
                                    form.submit();
                                }}
                            >
                                Save As Draft
                            </Button>
                            <Button
                                size="large"
                                className="bg-primary text-white"
                                onClick={() => {
                                    setSaveType('Approved');
                                    form.submit();
                                }}
                            >
                                Save As Approved
                            </Button>
                        </div>
                    </Form>
                </Content>
            </Layout>
        </div>
    );
}
