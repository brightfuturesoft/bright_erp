import {
    jsx as _jsx,
    jsxs as _jsxs,
    Fragment as _Fragment,
} from 'react/jsx-runtime';
import { useState, useEffect, useContext } from 'react';
import {
    Layout,
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    Upload,
    ConfigProvider,
    theme,
    Tabs,
    Row,
    Col,
    Checkbox,
    Card,
    Divider,
    message,
    Alert,
} from 'antd';
import {
    UploadOutlined,
    PlusOutlined,
    DeleteOutlined,
    InfoCircleOutlined,
    ContactsOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
import dayjs from 'dayjs';
const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;
export default function EditEmployeePage() {
    const employeeId = useParams();
    const navigate = useNavigate();
    const { user } = useContext(Erp_context);
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    // --- UI States ---
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('ADDRESS');
    const [sameAsPresent, setSameAsPresent] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [dependents, setDependents] = useState([]);
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [references, setReferences] = useState([]);
    const { defaultAlgorithm, darkAlgorithm } = theme;
    // 1. FETCH THE EMPLOYEE'S DATA
    const {
        data: employeeData,
        isLoading: isFetching,
        error,
    } = useQuery({
        queryKey: ['employee', employeeId],
        queryFn: async () => {
            if (!employeeId || !user) return null;
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}hrm/employees/get/${employeeId?.id}`,
                {
                    headers: {
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                }
            );
            if (!res.ok)
                throw new Error(
                    'Failed to fetch employee details for editing.'
                );
            const result = await res.json();
            return result.data;
        },
        enabled: !!employeeId && !!user,
    });
    useEffect(() => {
        if (employeeData) {
            const formattedData = {
                ...employeeData,
                dateOfBirth: employeeData.dateOfBirth
                    ? dayjs(employeeData.dateOfBirth)
                    : null,
                joiningDate: employeeData.joiningDate
                    ? dayjs(employeeData.joiningDate)
                    : null,
                payslipDate: employeeData.payslipDate
                    ? dayjs(employeeData.payslipDate)
                    : null,
                confirmationDate: employeeData.confirmationDate
                    ? dayjs(employeeData.confirmationDate)
                    : null,
            };
            setDependents(employeeData.dependents || []);
            setEducation(employeeData.education || []);
            setExperience(employeeData.experience || []);
            setReferences(employeeData.references || []);
            const dynamicFieldValues = {};
            (employeeData.dependents || []).forEach(dep => {
                dynamicFieldValues[`dependentFullName_${dep.id}`] =
                    dep.fullName;
                dynamicFieldValues[`dependentRelationship_${dep.id}`] =
                    dep.relationship;
                dynamicFieldValues[`dependentDateOfBirth_${dep.id}`] =
                    dep.dateOfBirth ? dayjs(dep.dateOfBirth) : null;
                dynamicFieldValues[`dependentEmail_${dep.id}`] = dep.email;
                dynamicFieldValues[`dependentPhoneNumber_${dep.id}`] =
                    dep.phoneNumber;
            });
            (employeeData.education || []).forEach(edu => {
                dynamicFieldValues[`qualification_${edu.id}`] =
                    edu.qualification;
                dynamicFieldValues[`major_${edu.id}`] = edu.major;
                dynamicFieldValues[`institution_${edu.id}`] = edu.institution;
                dynamicFieldValues[`board_${edu.id}`] = edu.board;
                dynamicFieldValues[`passingYear_${edu.id}`] = edu.passingYear;
                dynamicFieldValues[`gradeCGPA_${edu.id}`] = edu.gradeCGPA;
            });
            (employeeData.experience || []).forEach(exp => {
                dynamicFieldValues[`companyName_${exp.id}`] = exp.companyName;
                dynamicFieldValues[`designation_${exp.id}`] = exp.designation;
                dynamicFieldValues[`location_${exp.id}`] = exp.location;
                dynamicFieldValues[`joiningDate_${exp.id}`] = exp.joiningDate
                    ? dayjs(exp.joiningDate)
                    : null;
                dynamicFieldValues[`resignDate_${exp.id}`] = exp.resignDate
                    ? dayjs(exp.resignDate)
                    : null;
                dynamicFieldValues[`responsibility_${exp.id}`] =
                    exp.responsibility;
            });
            (employeeData.references || []).forEach(ref => {
                dynamicFieldValues[`reference_${ref.id}`] = ref.reference;
                dynamicFieldValues[`refDepartment_${ref.id}`] = ref.department;
                dynamicFieldValues[`refDesignation_${ref.id}`] =
                    ref.designation;
                dynamicFieldValues[`refAddress_${ref.id}`] = ref.address;
                dynamicFieldValues[`refRelationship_${ref.id}`] =
                    ref.relationship;
                dynamicFieldValues[`refPhoneNumber_${ref.id}`] =
                    ref.phoneNumber;
                dynamicFieldValues[`refEmail_${ref.id}`] = ref.email;
            });
            form.setFieldsValue({ ...formattedData, ...dynamicFieldValues });
        }
    }, [employeeData, form]);
    // 3. SETUP UPDATE LOGIC
    const { mutate: updateEmployee, isPending: isUpdating } = useMutation({
        mutationFn: async payload => {
            if (!user) throw new Error('User not found');
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}hrm/employees/update-employee`,
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
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(
                    errorData.message || 'Failed to update employee'
                );
            }
            return res.json();
        },
        onSuccess: () => {
            message.success('Employee updated successfully!');
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            navigate('/dashboard/hr-module/employees');
        },
        onError: err => {
            message.error(err.message);
        },
    });
    // 4. HANDLE FORM SUBMISSION
    const handleFormUpdate = values => {
        const formatDate = date => (date ? dayjs(date).toISOString() : null);
        const payload = {
            id: employeeId,
            ...values,
            dateOfBirth: formatDate(values.dateOfBirth),
            joiningDate: formatDate(values.joiningDate),
            payslipDate: formatDate(values.payslipDate),
            confirmationDate: formatDate(values.confirmationDate),
            dependents: dependents.map(dep => ({
                id: dep.id,
                fullName: values[`dependentFullName_${dep.id}`],
                relationship: values[`dependentRelationship_${dep.id}`],
                dateOfBirth: formatDate(
                    values[`dependentDateOfBirth_${dep.id}`]
                ),
                email: values[`dependentEmail_${dep.id}`],
                phoneNumber: values[`dependentPhoneNumber_${dep.id}`],
            })),
            education: education.map(edu => ({
                id: edu.id,
                qualification: values[`qualification_${edu.id}`],
                major: values[`major_${edu.id}`],
                institution: values[`institution_${edu.id}`],
                board: values[`board_${edu.id}`],
                passingYear: values[`passingYear_${edu.id}`],
                gradeCGPA: values[`gradeCGPA_${edu.id}`],
            })),
            experience: experience.map(exp => ({
                id: exp.id,
                companyName: values[`companyName_${exp.id}`],
                designation: values[`designation_${exp.id}`],
                location: values[`location_${exp.id}`],
                joiningDate: formatDate(values[`joiningDate_${exp.id}`]),
                resignDate: formatDate(values[`resignDate_${exp.id}`]),
                responsibility: values[`responsibility_${exp.id}`],
            })),
            references: references.map(ref => ({
                id: ref.id,
                reference: values[`reference_${ref.id}`],
                department: values[`refDepartment_${ref.id}`],
                designation: values[`refDesignation_${ref.id}`],
                address: values[`refAddress_${ref.id}`],
                relationship: values[`refRelationship_${ref.id}`],
                phoneNumber: values[`refPhoneNumber_${ref.id}`],
                email: values[`refEmail_${ref.id}`],
            })),
        };
        updateEmployee(payload);
    };
    // --- Dynamic row handlers ---
    const addDependent = () =>
        setDependents([
            ...dependents,
            {
                id: `new_${Date.now()}`,
                fullName: '',
                relationship: '',
                dateOfBirth: '',
                email: '',
                phoneNumber: '',
            },
        ]);
    const removeDependent = id =>
        setDependents(dependents.filter(d => d.id !== id));
    const addEducation = () =>
        setEducation([
            ...education,
            {
                id: `new_${Date.now()}`,
                qualification: '',
                major: '',
                institution: '',
                board: '',
                passingYear: '',
                gradeCGPA: '',
            },
        ]);
    const removeEducation = id =>
        setEducation(education.filter(e => e.id !== id));
    const addExperience = () =>
        setExperience([
            ...experience,
            {
                id: `new_${Date.now()}`,
                companyName: '',
                designation: '',
                location: '',
                joiningDate: '',
                resignDate: '',
                responsibility: '',
            },
        ]);
    const removeExperience = id =>
        setExperience(experience.filter(e => e.id !== id));
    const addReference = () =>
        setReferences([
            ...references,
            {
                id: `new_${Date.now()}`,
                reference: '',
                department: '',
                designation: '',
                address: '',
                relationship: '',
                phoneNumber: '',
                email: '',
            },
        ]);
    const removeReference = id =>
        setReferences(references.filter(r => r.id !== id));
    const handleFileUpload = info => {
        setUploadedFile(info.file);
    };
    const removeFile = () => {
        setUploadedFile(null);
    };
    if (isFetching) {
        return _jsx('div', {
            style: { padding: '2rem', textAlign: 'center' },
            children: 'Loading Employee Data...',
        });
    }
    if (error) {
        return _jsx(Alert, {
            message: 'Error',
            description: error.message,
            type: 'error',
            showIcon: true,
            style: { margin: '2rem' },
        });
    }
    const tabItems = [
        {
            key: 'ADDRESS',
            label: 'ADDRESS',
            children: _jsxs('div', {
                className: 'space-y-6',
                children: [
                    _jsxs(Card, {
                        size: 'small',
                        title: _jsxs(_Fragment, {
                            children: [
                                _jsx(InfoCircleOutlined, { className: 'mr-2' }),
                                'Present Address',
                            ],
                        }),
                        className:
                            'mb-6 shadow-sm dark:bg-dark-gray dark:border-light-dark',
                        children: [
                            _jsxs(Row, {
                                gutter: 16,
                                children: [
                                    ' ',
                                    _jsx(Col, {
                                        span: 24,
                                        children: _jsx(Form.Item, {
                                            label: 'Address',
                                            name: 'presentAddress',
                                            children: _jsx(TextArea, {
                                                rows: 3,
                                                placeholder: 'Enter Address',
                                            }),
                                        }),
                                    }),
                                    ' ',
                                ],
                            }),
                            _jsxs(Row, {
                                gutter: 16,
                                children: [
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'Country',
                                            name: 'presentCountry',
                                            children: _jsx(Select, {
                                                placeholder: 'Select Country',
                                                children: _jsx(Option, {
                                                    value: 'bangladesh',
                                                    children: 'Bangladesh',
                                                }),
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'State/Division',
                                            name: 'presentState',
                                            children: _jsx(Select, {
                                                placeholder: 'Select State',
                                                children: _jsx(Option, {
                                                    value: 'dhaka',
                                                    children: 'Dhaka',
                                                }),
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'District',
                                            name: 'presentDistrict',
                                            children: _jsx(Select, {
                                                placeholder: 'Select District',
                                                children: _jsx(Option, {
                                                    value: 'dhaka',
                                                    children: 'Dhaka',
                                                }),
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'Thana',
                                            name: 'presentThana',
                                            children: _jsx(Select, {
                                                placeholder: 'Select Thana',
                                                children: _jsx(Option, {
                                                    value: 'dhanmondi',
                                                    children: 'Dhanmondi',
                                                }),
                                            }),
                                        }),
                                    }),
                                ],
                            }),
                            _jsx(Row, {
                                gutter: 16,
                                children: _jsx(Col, {
                                    span: 6,
                                    children: _jsx(Form.Item, {
                                        label: 'Zip Code',
                                        name: 'presentZipCode',
                                        children: _jsx(Input, {
                                            placeholder: 'Enter Zip Code',
                                        }),
                                    }),
                                }),
                            }),
                        ],
                    }),
                    _jsxs(Card, {
                        size: 'small',
                        title: _jsxs(_Fragment, {
                            children: [
                                _jsx(InfoCircleOutlined, { className: 'mr-2' }),
                                'Permanent Address',
                            ],
                        }),
                        className:
                            'mb-6 shadow-sm dark:bg-dark-gray dark:border-light-dark',
                        children: [
                            _jsx('div', {
                                className: 'mb-4',
                                children: _jsx(Checkbox, {
                                    checked: sameAsPresent,
                                    onChange: e =>
                                        setSameAsPresent(e.target.checked),
                                    children: 'Same as present address',
                                }),
                            }),
                            _jsx(Row, {
                                gutter: 16,
                                children: _jsx(Col, {
                                    span: 24,
                                    children: _jsx(Form.Item, {
                                        label: 'Address',
                                        name: 'permanentAddress',
                                        children: _jsx(TextArea, {
                                            rows: 3,
                                            placeholder: 'Enter Address',
                                            disabled: sameAsPresent,
                                        }),
                                    }),
                                }),
                            }),
                            _jsxs(Row, {
                                gutter: 16,
                                children: [
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'Country',
                                            name: 'permanentCountry',
                                            children: _jsx(Select, {
                                                placeholder: 'Select Country',
                                                disabled: sameAsPresent,
                                                children: _jsx(Option, {
                                                    value: 'bangladesh',
                                                    children: 'Bangladesh',
                                                }),
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'State/Division',
                                            name: 'permanentState',
                                            children: _jsx(Select, {
                                                placeholder: 'Select State',
                                                disabled: sameAsPresent,
                                                children: _jsx(Option, {
                                                    value: 'dhaka',
                                                    children: 'Dhaka',
                                                }),
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'District',
                                            name: 'permanentDistrict',
                                            children: _jsx(Select, {
                                                placeholder: 'Select District',
                                                disabled: sameAsPresent,
                                                children: _jsx(Option, {
                                                    value: 'dhaka',
                                                    children: 'Dhaka',
                                                }),
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'Thana',
                                            name: 'permanentThana',
                                            children: _jsx(Select, {
                                                placeholder: 'Select Thana',
                                                disabled: sameAsPresent,
                                                children: _jsx(Option, {
                                                    value: 'dhanmondi',
                                                    children: 'Dhanmondi',
                                                }),
                                            }),
                                        }),
                                    }),
                                ],
                            }),
                            _jsx(Row, {
                                gutter: 16,
                                children: _jsx(Col, {
                                    span: 6,
                                    children: _jsx(Form.Item, {
                                        label: 'Zip Code',
                                        name: 'permanentZipCode',
                                        children: _jsx(Input, {
                                            placeholder: 'Enter Zip Code',
                                            disabled: sameAsPresent,
                                        }),
                                    }),
                                }),
                            }),
                        ],
                    }),
                ],
            }),
        },
        {
            key: 'PERSONAL INFO',
            label: 'PERSONAL INFO',
            children: _jsxs('div', {
                className: 'space-y-6',
                children: [
                    _jsxs(Row, {
                        gutter: 16,
                        children: [
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: 'Blood Group',
                                    name: 'bloodGroup',
                                    children: _jsx(Select, {
                                        placeholder: 'Select Blood Group',
                                        children: _jsx(Option, {
                                            value: 'A+',
                                            children: 'A+',
                                        }),
                                    }),
                                }),
                            }),
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: 'Marital Status',
                                    name: 'maritalStatus',
                                    children: _jsx(Select, {
                                        placeholder: 'Select Marital Status',
                                        children: _jsx(Option, {
                                            value: 'single',
                                            children: 'Single',
                                        }),
                                    }),
                                }),
                            }),
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: 'Religion',
                                    name: 'religion',
                                    children: _jsx(Select, {
                                        placeholder: 'Select Religion',
                                        children: _jsx(Option, {
                                            value: 'islam',
                                            children: 'Islam',
                                        }),
                                    }),
                                }),
                            }),
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: 'Nationality',
                                    name: 'nationality',
                                    children: _jsx(Select, {
                                        placeholder: 'Select Nationality',
                                        children: _jsx(Option, {
                                            value: 'bangladeshi',
                                            children: 'Bangladeshi',
                                        }),
                                    }),
                                }),
                            }),
                        ],
                    }),
                    _jsxs(Row, {
                        gutter: 16,
                        children: [
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: 'Passport No',
                                    name: 'passportNo',
                                    children: _jsx(Input, {
                                        placeholder: 'Enter Passport No',
                                    }),
                                }),
                            }),
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: 'National ID',
                                    name: 'nationalId',
                                    children: _jsx(Input, {
                                        placeholder: 'Enter National ID',
                                    }),
                                }),
                            }),
                        ],
                    }),
                    _jsxs(Divider, {
                        orientation: 'left',
                        children: [
                            _jsx(ContactsOutlined, { className: 'mr-2' }),
                            'Family Information',
                        ],
                    }),
                    _jsxs(Row, {
                        gutter: 16,
                        children: [
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: "Father's Full Name",
                                    name: 'fatherFullName',
                                    children: _jsx(Input, {
                                        placeholder: 'Enter Full Name',
                                    }),
                                }),
                            }),
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: "Father's Phone Number",
                                    name: 'fatherPhoneNumber',
                                    children: _jsx(Input, {
                                        placeholder: 'Phone Number',
                                    }),
                                }),
                            }),
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: "Father's National ID",
                                    name: 'fatherNationalId',
                                    children: _jsx(Input, {
                                        placeholder: 'Enter National ID',
                                    }),
                                }),
                            }),
                        ],
                    }),
                    _jsxs(Row, {
                        gutter: 16,
                        children: [
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: "Mother's Full Name",
                                    name: 'motherFullName',
                                    children: _jsx(Input, {
                                        placeholder: 'Enter Full Name',
                                    }),
                                }),
                            }),
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: "Mother's Phone Number",
                                    name: 'motherPhoneNumber',
                                    children: _jsx(Input, {
                                        placeholder: 'Phone Number',
                                    }),
                                }),
                            }),
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: "Mother's National ID",
                                    name: 'motherNationalId',
                                    children: _jsx(Input, {
                                        placeholder: 'Enter National ID',
                                    }),
                                }),
                            }),
                        ],
                    }),
                ],
            }),
        },
        {
            key: "DEPENDENT'S INFO",
            label: "DEPENDENT'S INFO",
            children: _jsxs('div', {
                className: 'space-y-4',
                children: [
                    dependents.map((dependent, index) =>
                        _jsxs(
                            Card,
                            {
                                size: 'small',
                                title: `Dependent ${index + 1}`,
                                className:
                                    'mb-6 shadow-sm dark:bg-dark-gray dark:border-light-dark',
                                extra: _jsx(Button, {
                                    type: 'text',
                                    danger: true,
                                    icon: _jsx(DeleteOutlined, {}),
                                    onClick: () =>
                                        removeDependent(dependent.id),
                                }),
                                children: [
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 6,
                                                children: _jsx(Form.Item, {
                                                    label: 'Full Name',
                                                    name: `dependentFul
                                            _${dependent.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Full Name',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 6,
                                                children: _jsx(Form.Item, {
                                                    label: 'Relationship',
                                                    name: `dependentRelationship_${dependent.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Relationship',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 6,
                                                children: _jsx(Form.Item, {
                                                    label: 'Date Of Birth',
                                                    name: `dependentDateOfBirth_${dependent.id}`,
                                                    children: _jsx(DatePicker, {
                                                        className:
                                                            'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                        placeholder:
                                                            'DD/MM/YYYY',
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 12,
                                                children: _jsx(Form.Item, {
                                                    label: 'Email',
                                                    name: `dependentEmail_${dependent.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder: 'Email',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 12,
                                                children: _jsx(Form.Item, {
                                                    label: 'Phone Number',
                                                    name: `dependentPhoneNumber_${dependent.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Phone Number',
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            },
                            dependent.id
                        )
                    ),
                    _jsx(Button, {
                        type: 'dashed',
                        onClick: addDependent,
                        icon: _jsx(PlusOutlined, {}),
                        className:
                            'w-full dark:bg-secondary dark:border-light-dark dark:text-white dark:hover:border-primary',
                        children: 'Add another',
                    }),
                ],
            }),
        },
        {
            key: 'EDUCATION',
            label: 'EDUCATION',
            children: _jsxs('div', {
                className: 'space-y-4',
                children: [
                    education.map((edu, index) =>
                        _jsxs(
                            Card,
                            {
                                size: 'small',
                                title: `Education ${index + 1}`,
                                className:
                                    'mb-6 shadow-sm dark:bg-dark-gray dark:border-light-dark',
                                extra: _jsx(Button, {
                                    type: 'text',
                                    danger: true,
                                    icon: _jsx(DeleteOutlined, {}),
                                    onClick: () => removeEducation(edu.id),
                                }),
                                children: [
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 6,
                                                children: _jsx(Form.Item, {
                                                    label: 'Qualification',
                                                    name: `qualification_${edu.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Qualification',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 6,
                                                children: _jsx(Form.Item, {
                                                    label: 'Major',
                                                    name: `major_${edu.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Major',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 6,
                                                children: _jsx(Form.Item, {
                                                    label: 'Institution',
                                                    name: `institution_${edu.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Institution',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 6,
                                                children: _jsx(Form.Item, {
                                                    label: 'Board',
                                                    name: `board_${edu.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Board',
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 12,
                                                children: _jsx(Form.Item, {
                                                    label: 'Passing Year',
                                                    name: `passingYear_${edu.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Passing Year',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 12,
                                                children: _jsx(Form.Item, {
                                                    label: 'Grade/CGPA',
                                                    name: `gradeCGPA_${edu.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Grade/CGPA',
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            },
                            edu.id
                        )
                    ),
                    _jsx(Button, {
                        type: 'dashed',
                        onClick: addEducation,
                        icon: _jsx(PlusOutlined, {}),
                        className:
                            'w-full dark:bg-secondary dark:border-light-dark dark:text-white dark:hover:border-primary',
                        children: 'Add another',
                    }),
                ],
            }),
        },
        {
            key: 'EXPERIENCE',
            label: 'EXPERIENCE',
            children: _jsxs('div', {
                className: 'space-y-4',
                children: [
                    experience.map((exp, index) =>
                        _jsxs(
                            Card,
                            {
                                size: 'small',
                                title: `Experience ${index + 1}`,
                                className:
                                    'mb-6 shadow-sm dark:bg-dark-gray dark:border-light-dark',
                                extra: _jsx(Button, {
                                    type: 'text',
                                    danger: true,
                                    icon: _jsx(DeleteOutlined, {}),
                                    onClick: () => removeExperience(exp.id),
                                }),
                                children: [
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 6,
                                                children: _jsx(Form.Item, {
                                                    label: 'Company Name',
                                                    name: `companyName_${exp.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Company Name',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 6,
                                                children: _jsx(Form.Item, {
                                                    label: 'Designation',
                                                    name: `designation_${exp.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Designation',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 6,
                                                children: _jsx(Form.Item, {
                                                    label: 'Location',
                                                    name: `location_${exp.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Location',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 6,
                                                children: _jsx(Form.Item, {
                                                    label: 'Joining Date',
                                                    name: `joiningDate_${exp.id}`,
                                                    children: _jsx(DatePicker, {
                                                        className:
                                                            'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                        placeholder:
                                                            'DD/MM/YYYY',
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 6,
                                                children: _jsx(Form.Item, {
                                                    label: 'Resign Date',
                                                    name: `resignDate_${exp.id}`,
                                                    children: _jsx(DatePicker, {
                                                        className:
                                                            'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                        placeholder:
                                                            'DD/MM/YYYY',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 18,
                                                children: _jsx(Form.Item, {
                                                    label: 'Responsibility',
                                                    name: `responsibility_${exp.id}`,
                                                    children: _jsx(TextArea, {
                                                        rows: 2,
                                                        placeholder:
                                                            'Enter Responsibility',
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            },
                            exp.id
                        )
                    ),
                    _jsx(Button, {
                        type: 'dashed',
                        onClick: addExperience,
                        icon: _jsx(PlusOutlined, {}),
                        className:
                            'w-full dark:bg-secondary dark:border-light-dark dark:text-white dark:hover:border-primary',
                        children: 'Add another',
                    }),
                ],
            }),
        },
        {
            key: 'REFERENCE',
            label: 'REFERENCE',
            children: _jsxs('div', {
                className: 'space-y-4',
                children: [
                    references.map((ref, index) =>
                        _jsxs(
                            Card,
                            {
                                size: 'small',
                                title: `Reference ${index + 1}`,
                                className:
                                    'mb-6 shadow-sm dark:bg-dark-gray dark:border-light-dark',
                                extra: _jsx(Button, {
                                    type: 'text',
                                    danger: true,
                                    icon: _jsx(DeleteOutlined, {}),
                                    onClick: () => removeReference(ref.id),
                                }),
                                children: [
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 4,
                                                children: _jsx(Form.Item, {
                                                    label: 'Reference',
                                                    name: `reference_${ref.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Reference Name',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 4,
                                                children: _jsx(Form.Item, {
                                                    label: 'Department',
                                                    name: `refDepartment_${ref.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Department Name',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 4,
                                                children: _jsx(Form.Item, {
                                                    label: 'Designation',
                                                    name: `refDesignation_${ref.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Designation',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 4,
                                                children: _jsx(Form.Item, {
                                                    label: 'Address',
                                                    name: `refAddress_${ref.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Address',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 4,
                                                children: _jsx(Form.Item, {
                                                    label: 'Relationship',
                                                    name: `refRelationship_${ref.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Relationship',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 4,
                                                children: _jsx(Form.Item, {
                                                    label: 'Phone Number',
                                                    name: `refPhoneNumber_${ref.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Phone Number',
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                    _jsx(Row, {
                                        gutter: 16,
                                        children: _jsx(Col, {
                                            span: 12,
                                            children: _jsx(Form.Item, {
                                                label: 'Email',
                                                name: `refEmail_${ref.id}`,
                                                children: _jsx(Input, {
                                                    placeholder: 'Enter Email',
                                                }),
                                            }),
                                        }),
                                    }),
                                ],
                            },
                            ref.id
                        )
                    ),
                    _jsx(Button, {
                        type: 'dashed',
                        onClick: addReference,
                        icon: _jsx(PlusOutlined, {}),
                        className:
                            'w-full dark:bg-secondary dark:border-light-dark dark:text-white dark:hover:border-primary',
                        children: 'Add another',
                    }),
                ],
            }),
        },
    ];
    return _jsx(ConfigProvider, {
        theme: {
            algorithm: defaultAlgorithm,
            token: {
                colorPrimary: '#0A65B4',
            },
        },
        children: _jsx(Layout, {
            className: 'min-h-screen bg-white dark:bg-dark',
            children: _jsxs(Content, {
                className: 'p-6 bg-white dark:bg-dark',
                children: [
                    _jsx('div', {
                        className: 'flex items-center justify-between mb-6',
                        children: _jsx('h1', {
                            className:
                                'text-2xl font-bold text-black dark:text-white',
                            children: 'Edit Employee',
                        }),
                    }),
                    _jsxs(Form, {
                        form: form,
                        layout: 'vertical',
                        className:
                            'bg-white dark:bg-dark-gray p-6 rounded-lg border border-gray-200 dark:border-light-dark shadow-sm',
                        onFinish: handleFormUpdate,
                        children: [
                            _jsxs(Card, {
                                size: 'small',
                                title: _jsxs(_Fragment, {
                                    children: [
                                        _jsx(InfoCircleOutlined, {
                                            className: 'mr-2',
                                        }),
                                        'General Information',
                                    ],
                                }),
                                className:
                                    'mb-6 shadow-sm dark:bg-dark-gray dark:border-light-dark',
                                children: [
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Full Name',
                                                    name: 'fullName',
                                                    rules: [{ required: true }],
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Full Name',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx('div', {
                                                    className: 'text-center',
                                                    children: _jsx('div', {
                                                        className:
                                                            'border-2 border-dashed border-border rounded-lg p-4 bg-muted/50',
                                                        children: !uploadedFile
                                                            ? _jsxs('div', {
                                                                  children: [
                                                                      _jsx(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'text-muted-foreground mb-2',
                                                                              children:
                                                                                  'Drag and drop file here',
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'text-muted-foreground mb-2',
                                                                              children:
                                                                                  'or',
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          Upload,
                                                                          {
                                                                              name: 'photo',
                                                                              showUploadList: false,
                                                                              beforeUpload:
                                                                                  () =>
                                                                                      false,
                                                                              onChange:
                                                                                  handleFileUpload,
                                                                              children:
                                                                                  _jsx(
                                                                                      Button,
                                                                                      {
                                                                                          type: 'primary',
                                                                                          icon: _jsx(
                                                                                              UploadOutlined,
                                                                                              {}
                                                                                          ),
                                                                                          children:
                                                                                              'Upload Photo',
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                      _jsxs(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'text-xs text-muted-foreground mt-2',
                                                                              children:
                                                                                  [
                                                                                      'Maximum file size 5MB',
                                                                                      _jsx(
                                                                                          'br',
                                                                                          {}
                                                                                      ),
                                                                                      'Supported Formats: JPG, JPEG, PNG & ICO',
                                                                                  ],
                                                                          }
                                                                      ),
                                                                  ],
                                                              })
                                                            : _jsxs('div', {
                                                                  className:
                                                                      'text-center',
                                                                  children: [
                                                                      _jsx(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'text-sm font-medium mb-2',
                                                                              children:
                                                                                  uploadedFile.name,
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
                                                                                  removeFile,
                                                                              children:
                                                                                  'Remove',
                                                                          }
                                                                      ),
                                                                  ],
                                                              }),
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Nick Name',
                                                    name: 'nickName',
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Nick Name',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Phone Number',
                                                    name: 'phoneNumber',
                                                    rules: [{ required: true }],
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Phone Number',
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Email',
                                                    name: 'email',
                                                    children: _jsx(Input, {
                                                        placeholder: 'Email',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Gender',
                                                    name: 'gender',
                                                    rules: [{ required: true }],
                                                    children: _jsxs(Select, {
                                                        placeholder:
                                                            'Select Gender',
                                                        children: [
                                                            _jsx(Option, {
                                                                value: 'male',
                                                                children:
                                                                    'Male',
                                                            }),
                                                            _jsx(Option, {
                                                                value: 'female',
                                                                children:
                                                                    'Female',
                                                            }),
                                                            _jsx(Option, {
                                                                value: 'other',
                                                                children:
                                                                    'Other',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                    _jsx(Row, {
                                        gutter: 16,
                                        children: _jsx(Col, {
                                            span: 8,
                                            children: _jsx(Form.Item, {
                                                label: 'Date Of Birth',
                                                name: 'dateOfBirth',
                                                rules: [{ required: true }],
                                                children: _jsx(DatePicker, {
                                                    className:
                                                        'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                    placeholder: 'DD/MM/YYYY',
                                                }),
                                            }),
                                        }),
                                    }),
                                ],
                            }),
                            _jsxs(Card, {
                                size: 'small',
                                title: _jsxs(_Fragment, {
                                    children: [
                                        _jsx(ContactsOutlined, {
                                            className: 'mr-2',
                                        }),
                                        'Work Information',
                                    ],
                                }),
                                className:
                                    'mb-6 shadow-sm dark:bg-dark-gray dark:border-light-dark',
                                children: [
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Joining Date',
                                                    name: 'joiningDate',
                                                    rules: [{ required: true }],
                                                    children: _jsx(DatePicker, {
                                                        className:
                                                            'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                        placeholder:
                                                            'DD/MM/YYYY',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Payslip Generation Date',
                                                    name: 'payslipDate',
                                                    rules: [{ required: true }],
                                                    children: _jsx(DatePicker, {
                                                        className:
                                                            'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                        placeholder:
                                                            'DD/MM/YYYY',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Confirmation Date',
                                                    name: 'confirmationDate',
                                                    children: _jsx(DatePicker, {
                                                        className:
                                                            'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                        placeholder:
                                                            'DD/MM/YYYY',
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Department',
                                                    name: 'department',
                                                    rules: [{ required: true }],
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Department',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Position',
                                                    name: 'position',
                                                    rules: [{ required: true }],
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Position',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Job Title',
                                                    name: 'jobTitle',
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Job Title',
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Office Location',
                                                    name: 'officeLocation',
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Office Location',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Employment Type',
                                                    name: 'employmentType',
                                                    children: _jsxs(Select, {
                                                        placeholder:
                                                            'Select Employment Type',
                                                        children: [
                                                            _jsx(Option, {
                                                                value: 'full-time',
                                                                children:
                                                                    'Full Time',
                                                            }),
                                                            _jsx(Option, {
                                                                value: 'part-time',
                                                                children:
                                                                    'Part Time',
                                                            }),
                                                            _jsx(Option, {
                                                                value: 'contract',
                                                                children:
                                                                    'Contract',
                                                            }),
                                                            _jsx(Option, {
                                                                value: 'internship',
                                                                children:
                                                                    'Internship',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'In Time',
                                                    name: 'inTime',
                                                    rules: [{ required: true }],
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Select In time',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Out Time',
                                                    name: 'outTime',
                                                    rules: [{ required: true }],
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Select Out time',
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                    _jsx(Row, {
                                        gutter: 16,
                                        children: _jsx(Col, {
                                            span: 24,
                                            children: _jsx(Form.Item, {
                                                name: 'allowFlexibleTime',
                                                valuePropName: 'checked',
                                                children: _jsx(Checkbox, {
                                                    children:
                                                        'Allow Flexible Time',
                                                }),
                                            }),
                                        }),
                                    }),
                                ],
                            }),
                            _jsx(Tabs, {
                                activeKey: activeTab,
                                onChange: setActiveTab,
                                items: tabItems,
                                className: 'bg-card',
                            }),
                            _jsxs('div', {
                                className: 'flex justify-end gap-4 mt-6',
                                children: [
                                    _jsx(Button, {
                                        size: 'large',
                                        onClick: () => navigate(-1),
                                        children: 'Cancel',
                                    }),
                                    _jsx(Button, {
                                        type: 'primary',
                                        size: 'large',
                                        className: 'bg-primary',
                                        htmlType: 'submit',
                                        loading: isUpdating,
                                        children: 'Save Changes',
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
