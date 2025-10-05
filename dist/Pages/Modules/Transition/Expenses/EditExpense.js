import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useContext } from 'react';
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
    message,
    Alert,
    ConfigProvider,
    theme,
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
// Use the same entities array as in AddExpense
const entities = [
    'expense',
    'discount',
    'operating-expense',
    'payment-processing',
    'payroll-expense',
    'uncategorized-expense',
    'income-discount',
];
export default function EditExpensePage() {
    const { id: expenseId } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user } = useContext(Erp_context);
    const [expenseCategories, setExpenseCategories] = useState([
        { id: '1', category: '', entity: '', amount: 0 },
    ]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [saveType, setSaveType] = useState('Approved');
    const [loading, setLoading] = useState(true);
    // Validation helper
    const isValidId = id => !!id && /^[0-9a-fA-F]{24}$/.test(id);
    // ✅ 1. Fetch ALL accounts using the SAME logic as AddExpense
    const { data: accounts = [], isLoading: accountsLoading } = useQuery({
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
    const {
        data: expenseData,
        isLoading: isFetching,
        error,
    } = useQuery({
        queryKey: ['expense', expenseId],
        queryFn: async () => {
            if (!isValidId(expenseId) || !user) {
                throw new Error('Invalid expense ID or user not loaded');
            }
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}transaction/expense/get-expense/${expenseId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                }
            );
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to fetch expense');
            }
            const result = await res.json();
            return result.data;
        },
        enabled: !!user && isValidId(expenseId),
    });
    // ✅ 3. Populate the form AND state once data is fetched
    useEffect(() => {
        if (expenseData) {
            // Populate static form fields
            form.setFieldsValue({
                date: expenseData.date ? dayjs(expenseData.date) : null,
                expenseFrom: expenseData.expenseFrom || '',
                description: expenseData.description || '',
            });
            // Populate the expense categories with existing data
            if (
                expenseData.expenseCategories &&
                expenseData.expenseCategories.length > 0
            ) {
                const formattedCategories = expenseData.expenseCategories.map(
                    (cat, index) => ({
                        id: `category-${index + 1}`,
                        category: cat.category || '',
                        entity: cat.entity || '',
                        amount: cat.amount || 0,
                    })
                );
                setExpenseCategories(formattedCategories);
            }
            setLoading(false);
        }
    }, [expenseData, form]);
    useEffect(() => {
        if (!isValidId(expenseId)) {
            message.error('Invalid Expense ID');
            setLoading(false);
            return;
        }
        if (error) {
            setLoading(false);
        }
    }, [expenseId, error]);
    // ✅ 4. Setup the mutation for UPDATING the expense
    const { mutate: updateExpense, isPending: isUpdating } = useMutation({
        mutationFn: async payload => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}transaction/expense/update-expense`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: user?._id || '',
                        workspace_id: user?.workspace_id || '',
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
        onError: err => {
            message.error(err.message);
        },
    });
    // ✅ 5. Handle the form submission
    const onFinish = async (values, status) => {
        if (!values.date) {
            return message.error('Please select a date!');
        }
        if (!isValidId(expenseId)) {
            return message.error('Invalid Expense ID');
        }
        if (!user?._id) {
            return message.error('User not loaded');
        }
        if (!expenseCategories.every(cat => cat.category)) {
            return message.error(
                'Please select a category for all expense items.'
            );
        }
        const payload = {
            id: expenseId,
            date: values.date.format('YYYY-MM-DD'),
            time: dayjs().format('HH:mm:ss'),
            expenseFrom: values.expenseFrom,
            description: values.description,
            expenseCategories: expenseCategories.map(({ id, ...cat }) => cat),
            totalAmount: expenseCategories.reduce(
                (sum, cat) => sum + (cat.amount || 0),
                0
            ),
            status,
        };
        updateExpense(payload);
    };
    // Helper functions for managing expense categories (copied from AddExpense)
    const addExpenseCategory = () => {
        setExpenseCategories([
            ...expenseCategories,
            { id: Date.now().toString(), category: '', entity: '', amount: 0 },
        ]);
    };
    const removeExpenseCategory = id => {
        if (expenseCategories.length > 1) {
            setExpenseCategories(expenseCategories.filter(c => c.id !== id));
        }
    };
    const updateExpenseCategory = (id, field, value) => {
        setExpenseCategories(
            expenseCategories.map(c =>
                c.id === id ? { ...c, [field]: value } : c
            )
        );
    };
    // Upload props (copied from AddExpense)
    const uploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        showUploadList: false,
        beforeUpload: file => {
            setUploadedFile({
                uid: file.uid,
                name: file.name,
                size: file.size,
                type: file.type,
            });
            return false;
        },
        onDrop(e) {
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
    // Calculate total amount
    const totalAmount = expenseCategories.reduce(
        (sum, cat) => sum + (cat.amount || 0),
        0
    );
    if (loading || isFetching)
        return _jsx('div', { children: 'Loading expense data...' });
    if (error) {
        return _jsx(Alert, {
            message: 'Error',
            description: error.message,
            type: 'error',
            showIcon: true,
        });
    }
    const { defaultAlgorithm } = theme;
    return _jsx('div', {
        children: _jsx(ConfigProvider, {
            theme: {
                algorithm: defaultAlgorithm,
                token: {
                    colorPrimary: '#0A65B4',
                },
            },
            children: _jsx(Layout, {
                className:
                    'min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors',
                children: _jsxs(Content, {
                    className: 'p-6',
                    children: [
                        _jsx('h1', {
                            className:
                                'text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6',
                            children: 'Edit Expense',
                        }),
                        _jsxs(Form, {
                            form: form,
                            layout: 'vertical',
                            onFinish: values => onFinish(values, saveType),
                            children: [
                                _jsxs(Row, {
                                    gutter: 24,
                                    children: [
                                        _jsxs(Col, {
                                            xs: 24,
                                            lg: 16,
                                            children: [
                                                _jsxs(Card, {
                                                    className:
                                                        'mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors',
                                                    children: [
                                                        _jsxs(Row, {
                                                            gutter: 16,
                                                            children: [
                                                                _jsx(Col, {
                                                                    xs: 24,
                                                                    md: 8,
                                                                    children:
                                                                        _jsx(
                                                                            Form.Item,
                                                                            {
                                                                                label: 'Date *',
                                                                                name: 'date',
                                                                                rules: [
                                                                                    {
                                                                                        required: true,
                                                                                        message:
                                                                                            'Please select date',
                                                                                    },
                                                                                ],
                                                                                children:
                                                                                    _jsx(
                                                                                        DatePicker,
                                                                                        {
                                                                                            className:
                                                                                                'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                                                            format: 'DD MMM YYYY',
                                                                                        }
                                                                                    ),
                                                                            }
                                                                        ),
                                                                }),
                                                                _jsx(Col, {
                                                                    xs: 24,
                                                                    md: 8,
                                                                    children:
                                                                        _jsx(
                                                                            Form.Item,
                                                                            {
                                                                                label: 'Expense From *',
                                                                                name: 'expenseFrom',
                                                                                rules: [
                                                                                    {
                                                                                        required: true,
                                                                                        message:
                                                                                            'Please select expense from',
                                                                                    },
                                                                                ],
                                                                                children:
                                                                                    _jsxs(
                                                                                        Select,
                                                                                        {
                                                                                            placeholder:
                                                                                                'Select Account',
                                                                                            className:
                                                                                                'w-full',
                                                                                            children:
                                                                                                [
                                                                                                    _jsx(
                                                                                                        Select.Option,
                                                                                                        {
                                                                                                            value: 'brac-bank',
                                                                                                            children:
                                                                                                                'Brac Bank',
                                                                                                        }
                                                                                                    ),
                                                                                                    _jsx(
                                                                                                        Select.Option,
                                                                                                        {
                                                                                                            value: 'petty-cash',
                                                                                                            children:
                                                                                                                'Petty Cash',
                                                                                                        }
                                                                                                    ),
                                                                                                    _jsx(
                                                                                                        Select.Option,
                                                                                                        {
                                                                                                            value: 'corporate-card',
                                                                                                            children:
                                                                                                                'Corporate Card',
                                                                                                        }
                                                                                                    ),
                                                                                                    _jsx(
                                                                                                        Select.Option,
                                                                                                        {
                                                                                                            value: 'cash',
                                                                                                            children:
                                                                                                                'Cash',
                                                                                                        }
                                                                                                    ),
                                                                                                ],
                                                                                        }
                                                                                    ),
                                                                            }
                                                                        ),
                                                                }),
                                                            ],
                                                        }),
                                                        _jsx(Form.Item, {
                                                            label: 'Description *',
                                                            name: 'description',
                                                            rules: [
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        'Please enter description',
                                                                },
                                                            ],
                                                            children: _jsx(
                                                                TextArea,
                                                                {
                                                                    rows: 4,
                                                                    placeholder:
                                                                        'Description',
                                                                    className:
                                                                        'w-full dark:text-white',
                                                                }
                                                            ),
                                                        }),
                                                    ],
                                                }),
                                                _jsxs(Card, {
                                                    className:
                                                        'mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors',
                                                    children: [
                                                        _jsxs('div', {
                                                            className:
                                                                'flex items-center justify-between mb-4',
                                                            children: [
                                                                _jsx('h3', {
                                                                    className:
                                                                        'text-lg font-semibold text-gray-900 dark:text-gray-100',
                                                                    children:
                                                                        'EXPENSE CATEGORY',
                                                                }),
                                                                _jsx('h3', {
                                                                    className:
                                                                        'text-lg font-semibold text-gray-900 dark:text-gray-100',
                                                                    children:
                                                                        'AMOUNT',
                                                                }),
                                                            ],
                                                        }),
                                                        expenseCategories.map(
                                                            cat =>
                                                                _jsxs(
                                                                    Row,
                                                                    {
                                                                        gutter: 16,
                                                                        className:
                                                                            'mb-4',
                                                                        children:
                                                                            [
                                                                                _jsx(
                                                                                    Col,
                                                                                    {
                                                                                        xs: 24,
                                                                                        md: 16,
                                                                                        children:
                                                                                            _jsx(
                                                                                                Select,
                                                                                                {
                                                                                                    placeholder:
                                                                                                        'Select Expense Category',
                                                                                                    className:
                                                                                                        'w-full',
                                                                                                    value:
                                                                                                        cat.category ||
                                                                                                        undefined,
                                                                                                    onChange:
                                                                                                        (
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
                                                                                                                ] ||
                                                                                                                    ''
                                                                                                            );
                                                                                                        },
                                                                                                    optionLabelProp:
                                                                                                        'label',
                                                                                                    showSearch: true,
                                                                                                    filterOption:
                                                                                                        (
                                                                                                            input,
                                                                                                            option
                                                                                                        ) =>
                                                                                                            option?.label
                                                                                                                ?.toLowerCase()
                                                                                                                .includes(
                                                                                                                    input.toLowerCase()
                                                                                                                ),
                                                                                                    loading:
                                                                                                        accountsLoading,
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
                                                                                                                                                acc.ac_name,
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
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    Col,
                                                                                    {
                                                                                        xs: 20,
                                                                                        md: 6,
                                                                                        children:
                                                                                            _jsx(
                                                                                                Input,
                                                                                                {
                                                                                                    className:
                                                                                                        'dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                                                                    value:
                                                                                                        cat.amount ===
                                                                                                        0
                                                                                                            ? undefined
                                                                                                            : cat.amount,
                                                                                                    placeholder:
                                                                                                        '0.00',
                                                                                                    onFocus:
                                                                                                        () => {
                                                                                                            if (
                                                                                                                cat.amount ===
                                                                                                                0
                                                                                                            )
                                                                                                                updateExpenseCategory(
                                                                                                                    cat.id,
                                                                                                                    'amount',
                                                                                                                    null
                                                                                                                );
                                                                                                        },
                                                                                                    onChange:
                                                                                                        e =>
                                                                                                            updateExpenseCategory(
                                                                                                                cat.id,
                                                                                                                'amount',
                                                                                                                parseFloat(
                                                                                                                    e
                                                                                                                        .target
                                                                                                                        .value
                                                                                                                ) ||
                                                                                                                    0
                                                                                                            ),
                                                                                                }
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    Col,
                                                                                    {
                                                                                        xs: 4,
                                                                                        md: 2,
                                                                                        children:
                                                                                            expenseCategories.length >
                                                                                                1 &&
                                                                                            _jsx(
                                                                                                Button,
                                                                                                {
                                                                                                    type: 'text',
                                                                                                    danger: true,
                                                                                                    icon: _jsx(
                                                                                                        DeleteOutlined,
                                                                                                        {}
                                                                                                    ),
                                                                                                    onClick:
                                                                                                        () =>
                                                                                                            removeExpenseCategory(
                                                                                                                cat.id
                                                                                                            ),
                                                                                                }
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    },
                                                                    cat.id
                                                                )
                                                        ),
                                                        _jsx(Button, {
                                                            type: 'dashed',
                                                            onClick:
                                                                addExpenseCategory,
                                                            className:
                                                                'w-full mt-2',
                                                            icon: _jsx(
                                                                PlusOutlined,
                                                                {}
                                                            ),
                                                            children: 'Add Row',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        _jsxs(Col, {
                                            xs: 24,
                                            lg: 8,
                                            children: [
                                                _jsxs(Card, {
                                                    className:
                                                        'mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors',
                                                    children: [
                                                        _jsx('h3', {
                                                            className:
                                                                'text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4',
                                                            children:
                                                                'Upload a file',
                                                        }),
                                                        !uploadedFile
                                                            ? _jsxs(Dragger, {
                                                                  ...uploadProps,
                                                                  className:
                                                                      'bg-gray-50 dark:bg-gray-700 border-dashed border-2 border-gray-300 dark:border-gray-600',
                                                                  children: [
                                                                      _jsx(
                                                                          'p',
                                                                          {
                                                                              className:
                                                                                  'ant-upload-drag-icon',
                                                                              children:
                                                                                  _jsx(
                                                                                      UploadOutlined,
                                                                                      {
                                                                                          className:
                                                                                              'text-4xl text-gray-500 dark:text-gray-300',
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          'p',
                                                                          {
                                                                              className:
                                                                                  'ant-upload-text text-gray-900 dark:text-gray-100',
                                                                              children:
                                                                                  'Drag and drop file here',
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          'p',
                                                                          {
                                                                              className:
                                                                                  'ant-upload-hint text-gray-500 dark:text-gray-400',
                                                                              children:
                                                                                  'or',
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          Button,
                                                                          {
                                                                              type: 'primary',
                                                                              className:
                                                                                  'bg-primary mt-2',
                                                                              children:
                                                                                  'Choose File',
                                                                          }
                                                                      ),
                                                                  ],
                                                              })
                                                            : _jsx('div', {
                                                                  className:
                                                                      'border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-100 dark:bg-gray-800',
                                                                  children:
                                                                      _jsxs(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'flex items-center justify-between',
                                                                              children:
                                                                                  [
                                                                                      _jsxs(
                                                                                          'div',
                                                                                          {
                                                                                              className:
                                                                                                  'flex items-center gap-3',
                                                                                              children:
                                                                                                  [
                                                                                                      _jsx(
                                                                                                          FileOutlined,
                                                                                                          {
                                                                                                              className:
                                                                                                                  'text-2xl text-blue-600 dark:text-blue-400',
                                                                                                          }
                                                                                                      ),
                                                                                                      _jsx(
                                                                                                          'p',
                                                                                                          {
                                                                                                              className:
                                                                                                                  'text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px]',
                                                                                                              children:
                                                                                                                  uploadedFile.name,
                                                                                                          }
                                                                                                      ),
                                                                                                  ],
                                                                                          }
                                                                                      ),
                                                                                      _jsx(
                                                                                          Button,
                                                                                          {
                                                                                              type: 'text',
                                                                                              danger: true,
                                                                                              icon: _jsx(
                                                                                                  DeleteOutlined,
                                                                                                  {}
                                                                                              ),
                                                                                              onClick:
                                                                                                  () =>
                                                                                                      setUploadedFile(
                                                                                                          null
                                                                                                      ),
                                                                                          }
                                                                                      ),
                                                                                  ],
                                                                          }
                                                                      ),
                                                              }),
                                                    ],
                                                }),
                                                _jsxs(Card, {
                                                    className:
                                                        'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors',
                                                    children: [
                                                        _jsx('h3', {
                                                            className:
                                                                'text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4',
                                                            children: 'TOTAL',
                                                        }),
                                                        _jsxs('div', {
                                                            className:
                                                                'flex justify-between items-center',
                                                            children: [
                                                                _jsx('span', {
                                                                    className:
                                                                        'text-gray-900 dark:text-gray-100 font-medium',
                                                                    children:
                                                                        'Total Amount',
                                                                }),
                                                                _jsx('span', {
                                                                    className:
                                                                        'text-green-600 font-semibold',
                                                                    children:
                                                                        totalAmount.toFixed(
                                                                            2
                                                                        ),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                _jsxs('div', {
                                    className: 'flex justify-end gap-3 mt-6',
                                    children: [
                                        _jsx(Button, {
                                            size: 'large',
                                            onClick: () => navigate(-1),
                                            children: 'Cancel',
                                        }),
                                        _jsx(Button, {
                                            size: 'large',
                                            className: 'bg-primary text-white',
                                            loading:
                                                isUpdating &&
                                                saveType === 'Draft',
                                            onClick: () => {
                                                setSaveType('Draft');
                                                form.submit();
                                            },
                                            children: 'Save As Draft',
                                        }),
                                        _jsx(Button, {
                                            size: 'large',
                                            className: 'bg-primary text-white',
                                            loading:
                                                isUpdating &&
                                                saveType === 'Approved',
                                            onClick: () => {
                                                setSaveType('Approved');
                                                form.submit();
                                            },
                                            children: 'Update Expense',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            }),
        }),
    });
}
