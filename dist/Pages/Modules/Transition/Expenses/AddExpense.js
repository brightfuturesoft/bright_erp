import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
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
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
// Extend dayjs with plugins
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
const { Content } = Layout;
const { TextArea } = Input;
const { Dragger } = Upload;
const entities = [
    'expense',
    'discount',
    'operating-expense',
    'payment-processing',
    'payroll-expense',
    'uncategorized-expense',
    'income-discount',
];
export default function AddExpensePage() {
    const [darkMode] = useState(false);
    const [form] = Form.useForm();
    const [expenseCategories, setExpenseCategories] = useState([
        { id: '1', category: '', entity: '', amount: 0 },
    ]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const { user } = useContext(Erp_context);
    const navigate = useNavigate();
    const [saveType, setSaveType] = useState('Approved');
    // Fetch accounts grouped by entity
    const { data: accounts = [] } = useQuery({
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
        console.log(`Updating category ${id}, field ${field}, value:`, value);
        setExpenseCategories(prev =>
            prev.map(c => (c.id === id ? { ...c, [field]: value } : c))
        );
    };
    const totalAmount = expenseCategories.reduce(
        (sum, cat) => sum + (cat.amount || 0),
        0
    );
    const onFinish = async (values, status) => {
        try {
            if (!user?._id || !user?.workspace_id) {
                message.error('User or workspace not found');
                return;
            }
            // Debug: Log the current state of expenseCategories
            console.log(
                'Current expenseCategories before validation:',
                expenseCategories
            );
            // Validate that all categories have been selected
            const invalidCategories = expenseCategories.filter(
                cat => !cat.category || cat.category.trim() === ''
            );
            if (invalidCategories.length > 0) {
                console.log('Invalid categories found:', invalidCategories);
                message.error('Please select a category for all expense items');
                return;
            }
            // Validate that all amounts are greater than 0
            const zeroAmountCategories = expenseCategories.filter(
                cat => !cat.amount || cat.amount <= 0
            );
            if (zeroAmountCategories.length > 0) {
                console.log(
                    'Categories with zero or invalid amounts:',
                    zeroAmountCategories
                );
                message.error(
                    'Please enter valid amounts for all expense items'
                );
                return;
            }
            // Remove the id field from expenseCategories before sending to backend
            const cleanedExpenseCategories = expenseCategories.map(
                ({ id, ...cat }) => cat
            );
            const payload = {
                date: values.date.format('YYYY-MM-DD'),
                time: dayjs().format('HH:mm:ss'),
                expenseFrom: values.expenseFrom,
                description: values.description,
                expenseCategories: cleanedExpenseCategories,
                totalAmount,
                status,
            };
            console.log('Sending payload:', payload);
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
    return _jsx('div', {
        className: darkMode ? 'dark' : '',
        children: _jsx(Layout, {
            className:
                'min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors',
            children: _jsxs(Content, {
                className: 'p-6',
                children: [
                    _jsx('h1', {
                        className:
                            'text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6',
                        children: 'Add Expense',
                    }),
                    _jsxs(Form, {
                        form: form,
                        layout: 'vertical',
                        onFinish: values => onFinish(values, saveType),
                        initialValues: { date: dayjs() },
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
                                                                children: _jsx(
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
                                                                                    defaultValue:
                                                                                        dayjs(),
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                            }),
                                                            _jsx(Col, {
                                                                xs: 24,
                                                                md: 8,
                                                                children: _jsx(
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
                                                                    'w-full',
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
                                                    expenseCategories.map(cat =>
                                                        _jsxs(
                                                            Row,
                                                            {
                                                                gutter: 16,
                                                                className:
                                                                    'mb-4',
                                                                children: [
                                                                    _jsx(Col, {
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
                                                                                            console.log(
                                                                                                'Selected value:',
                                                                                                value
                                                                                            );
                                                                                            console.log(
                                                                                                'Selected option:',
                                                                                                option
                                                                                            );
                                                                                            console.log(
                                                                                                'Option props:',
                                                                                                option?.props
                                                                                            );
                                                                                            // Update category with the selected value
                                                                                            updateExpenseCategory(
                                                                                                cat.id,
                                                                                                'category',
                                                                                                value
                                                                                            );
                                                                                            // Get entity from option props
                                                                                            const selectedEntity =
                                                                                                option
                                                                                                    ?.props?.[
                                                                                                    'data-entity'
                                                                                                ] ||
                                                                                                option?.[
                                                                                                    'data-entity'
                                                                                                ] ||
                                                                                                '';
                                                                                            console.log(
                                                                                                'Selected entity:',
                                                                                                selectedEntity
                                                                                            );
                                                                                            updateExpenseCategory(
                                                                                                cat.id,
                                                                                                'entity',
                                                                                                selectedEntity
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
                                                                    }),
                                                                    _jsx(Col, {
                                                                        xs: 20,
                                                                        md: 6,
                                                                        children:
                                                                            _jsx(
                                                                                Input,
                                                                                {
                                                                                    className:
                                                                                        'dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                                                    type: 'number',
                                                                                    min: 0,
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
                                                                                        e => {
                                                                                            const value =
                                                                                                parseFloat(
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                );
                                                                                            updateExpenseCategory(
                                                                                                cat.id,
                                                                                                'amount',
                                                                                                isNaN(
                                                                                                    value
                                                                                                )
                                                                                                    ? 0
                                                                                                    : value
                                                                                            );
                                                                                        },
                                                                                }
                                                                            ),
                                                                    }),
                                                                    _jsx(Col, {
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
                                                                    }),
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
                                                                  _jsx('p', {
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
                                                                  }),
                                                                  _jsx('p', {
                                                                      className:
                                                                          'ant-upload-text text-gray-900 dark:text-gray-100',
                                                                      children:
                                                                          'Drag and drop file here',
                                                                  }),
                                                                  _jsx('p', {
                                                                      className:
                                                                          'ant-upload-hint text-gray-500 dark:text-gray-400',
                                                                      children:
                                                                          'or',
                                                                  }),
                                                                  _jsx(Button, {
                                                                      type: 'primary',
                                                                      className:
                                                                          'bg-primary mt-2',
                                                                      children:
                                                                          'Choose File',
                                                                  }),
                                                              ],
                                                          })
                                                        : _jsx('div', {
                                                              className:
                                                                  'border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-100 dark:bg-gray-800',
                                                              children: _jsxs(
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
                                        onClick: async () => {
                                            try {
                                                const values =
                                                    await form.validateFields();
                                                setSaveType('Draft');
                                                await onFinish(values, 'Draft');
                                            } catch (error) {
                                                console.error(
                                                    'Form validation failed:',
                                                    error
                                                );
                                            }
                                        },
                                        children: 'Save As Draft',
                                    }),
                                    _jsx(Button, {
                                        size: 'large',
                                        className: 'bg-primary text-white',
                                        onClick: async () => {
                                            try {
                                                const values =
                                                    await form.validateFields();
                                                setSaveType('Approved');
                                                await onFinish(
                                                    values,
                                                    'Approved'
                                                );
                                            } catch (error) {
                                                console.error(
                                                    'Form validation failed:',
                                                    error
                                                );
                                            }
                                        },
                                        children: 'Save As Approved',
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        }),
    });
}
