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
    TimePicker,
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
import { useNavigate } from 'react-router-dom';
import { Erp_context } from '@/provider/ErpContext';
const { Content } = Layout;
const { TextArea } = Input;
// --- Geonames API Functions ---
const GEONAMES_USERNAME = 'brightfuturesoft';
const fetchCountries = async () => {
    try {
        const response = await fetch(
            `http://api.geonames.org/countryInfoJSON?username=${GEONAMES_USERNAME}`
        );
        const data = await response.json();
        return data?.geonames
            ?.map(country => ({
                value: country.geonameId,
                label: country.countryName,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
    } catch (error) {
        console.error('Failed to fetch countries:', error);
        message.error('Could not load country list from Geonames.');
        return [];
    }
};
const fetchChildren = async geonameId => {
    if (!geonameId) return [];
    try {
        const response = await fetch(
            `http://api.geonames.org/childrenJSON?geonameId=${geonameId}&username=${GEONAMES_USERNAME}`
        );
        const data = await response.json();
        if (data.totalResultsCount === 0) return []; // Geonames returns this for no children
        return data?.geonames?.map(item => ({
            value: item.geonameId,
            label: item.name,
        }));
    } catch (error) {
        console.error(`Failed to fetch children for ${geonameId}:`, error);
        message.error('Could not load location data.');
        return [];
    }
};
export default function CreateEmployee() {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('ADDRESS');
    const [sameAsPresent, setSameAsPresent] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);
    // --- Location States ---
    const [countries, setCountries] = useState([]);
    // Present Address States
    const [presentStates, setPresentStates] = useState([]);
    const [presentCities, setPresentCities] = useState([]);
    const [presentAreas, setPresentAreas] = useState([]);
    const [presentStatesLoading, setPresentStatesLoading] = useState(false);
    const [presentCitiesLoading, setPresentCitiesLoading] = useState(false);
    const [presentAreasLoading, setPresentAreasLoading] = useState(false);
    // Permanent Address States
    const [permanentStates, setPermanentStates] = useState([]);
    const [permanentCities, setPermanentCities] = useState([]);
    const [permanentAreas, setPermanentAreas] = useState([]);
    const [permanentStatesLoading, setPermanentStatesLoading] = useState(false);
    const [permanentCitiesLoading, setPermanentCitiesLoading] = useState(false);
    const [permanentAreasLoading, setPermanentAreasLoading] = useState(false);
    const { user } = useContext(Erp_context);
    const navigate = useNavigate();
    const [dependents, setDependents] = useState([
        {
            id: '1',
            fullName: '',
            relationship: '',
            dateOfBirth: '',
            email: '',
            phoneNumber: '',
        },
    ]);
    const [education, setEducation] = useState([
        {
            id: '1',
            qualification: '',
            major: '',
            institution: '',
            board: '',
            passingYear: '',
            gradeCGPA: '',
        },
    ]);
    const [experience, setExperience] = useState([
        {
            id: '1',
            companyName: '',
            designation: '',
            location: '',
            joiningDate: '',
            resignDate: '',
            responsibility: '',
        },
    ]);
    const [references, setReferences] = useState([
        {
            id: '1',
            reference: '',
            department: '',
            designation: '',
            address: '',
            relationship: '',
            phoneNumber: '',
            email: '',
        },
    ]);
    const { defaultAlgorithm, darkAlgorithm } = theme;
    // Fetch countries on component mount
    useEffect(() => {
        fetchCountries().then(setCountries);
    }, []);
    // Effect to handle "Same as Present Address" checkbox
    useEffect(() => {
        if (sameAsPresent) {
            const presentValues = form.getFieldsValue([
                'presentAddress',
                'presentCountry',
                'presentState',
                'presentCity',
                'presentArea',
                'presentZipCode',
            ]);
            form.setFieldsValue({
                permanentAddress: presentValues.presentAddress,
                permanentCountry: presentValues.presentCountry,
                permanentState: presentValues.presentState,
                permanentCity: presentValues.presentCity,
                permanentArea: presentValues.presentArea,
                permanentZipCode: presentValues.presentZipCode,
            });
            setPermanentStates(presentStates);
            setPermanentCities(presentCities);
            setPermanentAreas(presentAreas);
        } else {
            form.setFieldsValue({
                permanentAddress: undefined,
                permanentCountry: undefined,
                permanentState: undefined,
                permanentCity: undefined,
                permanentArea: undefined,
                permanentZipCode: undefined,
            });
            setPermanentStates([]);
            setPermanentCities([]);
            setPermanentAreas([]);
        }
    }, [sameAsPresent, form, presentStates, presentCities, presentAreas]);
    // --- Location Change Handlers ---
    const handleCountryChange = async (option, type) => {
        const setStates =
            type === 'present' ? setPresentStates : setPermanentStates;
        const setCities =
            type === 'present' ? setPresentCities : setPermanentCities;
        const setAreas =
            type === 'present' ? setPresentAreas : setPermanentAreas;
        const setLoading =
            type === 'present'
                ? setPresentStatesLoading
                : setPermanentStatesLoading;
        form.setFieldsValue({
            [`${type}State`]: undefined,
            [`${type}City`]: undefined,
            [`${type}Area`]: undefined,
        });
        setStates([]);
        setCities([]);
        setAreas([]);
        if (option?.value) {
            setLoading(true);
            const divisions = await fetchChildren(option.value);
            setStates(divisions);
            setLoading(false);
        }
    };
    const handleStateChange = async (option, type) => {
        const setCities =
            type === 'present' ? setPresentCities : setPermanentCities;
        const setAreas =
            type === 'present' ? setPresentAreas : setPermanentAreas;
        const setLoading =
            type === 'present'
                ? setPresentCitiesLoading
                : setPermanentCitiesLoading;
        form.setFieldsValue({
            [`${type}City`]: undefined,
            [`${type}Area`]: undefined,
        });
        setCities([]);
        setAreas([]);
        if (option?.value) {
            setLoading(true);
            const cities = await fetchChildren(option.value);
            setCities(cities);
            setLoading(false);
        }
    };
    const handleCityChange = async (option, type) => {
        const setAreas =
            type === 'present' ? setPresentAreas : setPermanentAreas;
        const setLoading =
            type === 'present'
                ? setPresentAreasLoading
                : setPermanentAreasLoading;
        form.setFieldsValue({ [`${type}Area`]: undefined });
        setAreas([]);
        if (option?.value) {
            setLoading(true);
            const areas = await fetchChildren(option.value);
            setAreas(areas);
            setLoading(false);
        }
    };
    const addDependent = () => {
        const newId = (Date.now() + Math.random()).toString();
        setDependents([
            ...dependents,
            {
                id: newId,
                fullName: '',
                relationship: '',
                dateOfBirth: '',
                email: '',
                phoneNumber: '',
            },
        ]);
    };
    const removeDependent = id => {
        if (dependents.length > 1) {
            setDependents(dependents.filter(dep => dep.id !== id));
        }
    };
    const addEducation = () => {
        const newId = (Date.now() + Math.random()).toString();
        setEducation([
            ...education,
            {
                id: newId,
                qualification: '',
                major: '',
                institution: '',
                board: '',
                passingYear: '',
                gradeCGPA: '',
            },
        ]);
    };
    const removeEducation = id => {
        if (education.length > 1) {
            setEducation(education.filter(edu => edu.id !== id));
        }
    };
    const addExperience = () => {
        const newId = (Date.now() + Math.random()).toString();
        setExperience([
            ...experience,
            {
                id: newId,
                companyName: '',
                designation: '',
                location: '',
                joiningDate: '',
                resignDate: '',
                responsibility: '',
            },
        ]);
    };
    const removeExperience = id => {
        if (experience.length > 1) {
            setExperience(experience.filter(exp => exp.id !== id));
        }
    };
    const addReference = () => {
        const newId = (Date.now() + Math.random()).toString();
        setReferences([
            ...references,
            {
                id: newId,
                reference: '',
                department: '',
                designation: '',
                address: '',
                relationship: '',
                phoneNumber: '',
                email: '',
            },
        ]);
    };
    const removeReference = id => {
        if (references.length > 1) {
            setReferences(references.filter(ref => ref.id !== id));
        }
    };
    const handleFileUpload = info => {
        setUploadedFile(info.file);
    };
    const removeFile = () => {
        setUploadedFile(null);
    };
    const handleCheckboxChange = e => {
        setSameAsPresent(e.target.checked);
    };
    const handleFormSubmit = async values => {
        setLoading(true);
        setSubmissionError(null);
        if (!user?._id || !user?.workspace_id) {
            message.error(
                'Authentication credentials not found. Please log in again.'
            );
            setLoading(false);
            return;
        }
        const formatDate = date => (date ? date.toISOString() : null);
        // Extract labels from location objects for submission
        const payload = {
            ...values,
            presentCountry: values.presentCountry?.label,
            presentState: values.presentState?.label,
            presentCity: values.presentCity?.label,
            presentArea: values.presentArea?.label,
            permanentCountry: values.permanentCountry?.label,
            permanentState: values.permanentState?.label,
            permanentCity: values.permanentCity?.label,
            permanentArea: values.permanentArea?.label,
            dateOfBirth: formatDate(values.dateOfBirth),
            joiningDate: formatDate(values.joiningDate),
            payslipDate: formatDate(values.payslipDate),
            confirmationDate: formatDate(values.confirmationDate),
            dependents: dependents.map(dep => ({
                fullName: values[`dependentFullName_${dep.id}`],
                relationship: values[`dependentRelationship_${dep.id}`],
                dateOfBirth: formatDate(
                    values[`dependentDateOfBirth_${dep.id}`]
                ),
                email: values[`dependentEmail_${dep.id}`],
                phoneNumber: values[`dependentPhoneNumber_${dep.id}`],
            })),
            education: education.map(edu => ({
                qualification: values[`qualification_${edu.id}`],
                major: values[`major_${edu.id}`],
                institution: values[`institution_${edu.id}`],
                board: values[`board_${edu.id}`],
                passingYear: values[`passingYear_${edu.id}`],
                gradeCGPA: values[`gradeCGPA_${edu.id}`],
            })),
            experience: experience.map(exp => ({
                companyName: values[`companyName_${exp.id}`],
                designation: values[`designation_${exp.id}`],
                location: values[`location_${exp.id}`],
                joiningDate: formatDate(values[`joiningDate_${exp.id}`]),
                resignDate: formatDate(values[`resignDate_${exp.id}`]),
                responsibility: values[`responsibility_${exp.id}`],
            })),
            references: references.map(ref => ({
                reference: values[`reference_${ref.id}`],
                department: values[`refDepartment_${ref.id}`],
                designation: values[`refDesignation_${ref.id}`],
                address: values[`refAddress_${ref.id}`],
                relationship: values[`refRelationship_${ref.id}`],
                phoneNumber: values[`refPhoneNumber_${ref.id}`],
                email: values[`refEmail_${ref.id}`],
            })),
        };
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}hrm/employees/create-employee`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        workspace_id: user.workspace_id,
                        authorization: user._id,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Failed to create employee.');
            }
            message.success('Employee created successfully!');
            form.resetFields();
            navigate('/dashboard/hr-module/employees');
        } catch (error) {
            console.error('Submission Error:', error);
            setSubmissionError(
                error.message || 'An unexpected error occurred.'
            );
            message.error(error.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };
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
                        className: 'dark:bg-dark-gray dark:border-light-dark',
                        children: [
                            _jsx(Row, {
                                gutter: 16,
                                children: _jsx(Col, {
                                    span: 24,
                                    children: _jsx(Form.Item, {
                                        label: 'Address',
                                        name: 'presentAddress',
                                        children: _jsx(TextArea, {
                                            rows: 3,
                                            placeholder: 'Enter Address',
                                            className:
                                                'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                            name: 'presentCountry',
                                            children: _jsx(Select, {
                                                showSearch: true,
                                                allowClear: true,
                                                labelInValue: true,
                                                placeholder: 'Select Country',
                                                options: countries,
                                                onChange: opt =>
                                                    handleCountryChange(
                                                        opt,
                                                        'present'
                                                    ),
                                                filterOption: (input, option) =>
                                                    (option?.label ?? '')
                                                        .toLowerCase()
                                                        .includes(
                                                            input.toLowerCase()
                                                        ),
                                                className: 'dark:bg-light-dark',
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'State',
                                            name: 'presentState',
                                            children: _jsx(Select, {
                                                showSearch: true,
                                                allowClear: true,
                                                labelInValue: true,
                                                placeholder: 'Select State',
                                                options: presentStates,
                                                loading: presentStatesLoading,
                                                disabled:
                                                    !form.getFieldValue(
                                                        'presentCountry'
                                                    ),
                                                onChange: opt =>
                                                    handleStateChange(
                                                        opt,
                                                        'present'
                                                    ),
                                                filterOption: (input, option) =>
                                                    (option?.label ?? '')
                                                        .toLowerCase()
                                                        .includes(
                                                            input.toLowerCase()
                                                        ),
                                                className: 'dark:bg-light-dark',
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'City',
                                            name: 'presentCity',
                                            children: _jsx(Select, {
                                                showSearch: true,
                                                allowClear: true,
                                                labelInValue: true,
                                                placeholder: 'Select City',
                                                options: presentCities,
                                                loading: presentCitiesLoading,
                                                disabled:
                                                    !form.getFieldValue(
                                                        'presentState'
                                                    ),
                                                onChange: opt =>
                                                    handleCityChange(
                                                        opt,
                                                        'present'
                                                    ),
                                                filterOption: (input, option) =>
                                                    (option?.label ?? '')
                                                        .toLowerCase()
                                                        .includes(
                                                            input.toLowerCase()
                                                        ),
                                                className: 'dark:bg-light-dark',
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'Area',
                                            name: 'presentArea',
                                            children: _jsx(Select, {
                                                showSearch: true,
                                                allowClear: true,
                                                labelInValue: true,
                                                placeholder: 'Select Area',
                                                options: presentAreas,
                                                loading: presentAreasLoading,
                                                disabled:
                                                    !form.getFieldValue(
                                                        'presentCity'
                                                    ),
                                                filterOption: (input, option) =>
                                                    (option?.label ?? '')
                                                        .toLowerCase()
                                                        .includes(
                                                            input.toLowerCase()
                                                        ),
                                                className: 'dark:bg-light-dark',
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
                                            className:
                                                'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                        className: 'dark:bg-dark-gray dark:border-light-dark',
                        children: [
                            _jsx('div', {
                                className: 'mb-4',
                                children: _jsx(Checkbox, {
                                    checked: sameAsPresent,
                                    onChange: handleCheckboxChange,
                                    className: 'dark:text-white',
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
                                            className:
                                                'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                showSearch: true,
                                                allowClear: true,
                                                labelInValue: true,
                                                placeholder: 'Select Country',
                                                options: countries,
                                                disabled: sameAsPresent,
                                                onChange: opt =>
                                                    handleCountryChange(
                                                        opt,
                                                        'permanent'
                                                    ),
                                                filterOption: (input, option) =>
                                                    (option?.label ?? '')
                                                        .toLowerCase()
                                                        .includes(
                                                            input.toLowerCase()
                                                        ),
                                                className: 'dark:bg-light-dark',
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'State',
                                            name: 'permanentState',
                                            children: _jsx(Select, {
                                                showSearch: true,
                                                allowClear: true,
                                                labelInValue: true,
                                                placeholder: 'Select State',
                                                options: permanentStates,
                                                loading: permanentStatesLoading,
                                                disabled:
                                                    sameAsPresent ||
                                                    !form.getFieldValue(
                                                        'permanentCountry'
                                                    ),
                                                onChange: opt =>
                                                    handleStateChange(
                                                        opt,
                                                        'permanent'
                                                    ),
                                                filterOption: (input, option) =>
                                                    (option?.label ?? '')
                                                        .toLowerCase()
                                                        .includes(
                                                            input.toLowerCase()
                                                        ),
                                                className: 'dark:bg-light-dark',
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'City',
                                            name: 'permanentCity',
                                            children: _jsx(Select, {
                                                showSearch: true,
                                                allowClear: true,
                                                labelInValue: true,
                                                placeholder: 'Select City',
                                                options: permanentCities,
                                                loading: permanentCitiesLoading,
                                                disabled:
                                                    sameAsPresent ||
                                                    !form.getFieldValue(
                                                        'permanentState'
                                                    ),
                                                onChange: opt =>
                                                    handleCityChange(
                                                        opt,
                                                        'permanent'
                                                    ),
                                                filterOption: (input, option) =>
                                                    (option?.label ?? '')
                                                        .toLowerCase()
                                                        .includes(
                                                            input.toLowerCase()
                                                        ),
                                                className: 'dark:bg-light-dark',
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 6,
                                        children: _jsx(Form.Item, {
                                            label: 'Area',
                                            name: 'permanentArea',
                                            children: _jsx(Select, {
                                                showSearch: true,
                                                allowClear: true,
                                                labelInValue: true,
                                                placeholder: 'Select Area',
                                                options: permanentAreas,
                                                loading: permanentAreasLoading,
                                                disabled:
                                                    sameAsPresent ||
                                                    !form.getFieldValue(
                                                        'permanentCity'
                                                    ),
                                                filterOption: (input, option) =>
                                                    (option?.label ?? '')
                                                        .toLowerCase()
                                                        .includes(
                                                            input.toLowerCase()
                                                        ),
                                                className: 'dark:bg-light-dark',
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
                                            className:
                                                'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                    children: _jsxs(Select, {
                                        placeholder: 'Select Blood Group',
                                        className: 'dark:bg-light-dark',
                                        children: [
                                            _jsx(Select.Option, {
                                                value: 'A+',
                                                children: 'A+',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'A-',
                                                children: 'A-',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'B+',
                                                children: 'B+',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'B-',
                                                children: 'B-',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'O+',
                                                children: 'O+',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'O-',
                                                children: 'O-',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'AB+',
                                                children: 'AB+',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'AB-',
                                                children: 'AB-',
                                            }),
                                        ],
                                    }),
                                }),
                            }),
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: 'Marital Status',
                                    name: 'maritalStatus',
                                    children: _jsxs(Select, {
                                        placeholder: 'Select Marital Status',
                                        className: 'dark:bg-light-dark',
                                        children: [
                                            _jsx(Select.Option, {
                                                value: 'single',
                                                children: 'Single',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'married',
                                                children: 'Married',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'divorced',
                                                children: 'Divorced',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'widowed',
                                                children: 'Widowed',
                                            }),
                                        ],
                                    }),
                                }),
                            }),
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: 'Religion',
                                    name: 'religion',
                                    children: _jsxs(Select, {
                                        placeholder: 'Select Religion',
                                        className: 'dark:bg-light-dark',
                                        children: [
                                            _jsx(Select.Option, {
                                                value: 'islam',
                                                children: 'Islam',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'hinduism',
                                                children: 'Hinduism',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'christianity',
                                                children: 'Christianity',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'buddhism',
                                                children: 'Buddhism',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'other',
                                                children: 'Other',
                                            }),
                                        ],
                                    }),
                                }),
                            }),
                            _jsx(Col, {
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: 'Nationality',
                                    name: 'nationality',
                                    children: _jsxs(Select, {
                                        placeholder: 'Select Nationality',
                                        className: 'dark:bg-light-dark',
                                        children: [
                                            _jsx(Select.Option, {
                                                value: 'bangladeshi',
                                                children: 'Bangladeshi',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'indian',
                                                children: 'Indian',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'american',
                                                children: 'American',
                                            }),
                                            _jsx(Select.Option, {
                                                value: 'other',
                                                children: 'Other',
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
                                span: 6,
                                children: _jsx(Form.Item, {
                                    label: 'Passport No',
                                    name: 'passportNo',
                                    children: _jsx(Input, {
                                        placeholder: 'Enter Passport No',
                                        className:
                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                        className:
                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                    }),
                                }),
                            }),
                        ],
                    }),
                    _jsxs(Divider, {
                        orientation: 'left',
                        className: 'dark:border-light-dark',
                        children: [
                            _jsx(ContactsOutlined, { className: 'mr-2' }),
                            _jsx('span', {
                                className: 'dark:text-white',
                                children: 'Family Information',
                            }),
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
                                        className:
                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                        className:
                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                        className:
                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                        className:
                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                        className:
                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                        className:
                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                extra:
                                    dependents.length > 1 &&
                                    _jsx(Button, {
                                        type: 'text',
                                        danger: true,
                                        icon: _jsx(DeleteOutlined, {}),
                                        onClick: () =>
                                            removeDependent(dependent.id),
                                    }),
                                className:
                                    'dark:bg-dark-gray dark:border-light-dark',
                                children: [
                                    _jsxs(Row, {
                                        gutter: 16,
                                        children: [
                                            _jsx(Col, {
                                                span: 6,
                                                children: _jsx(Form.Item, {
                                                    label: 'Full Name',
                                                    name: `dependentFullName_${dependent.id}`,
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Full Name',
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                extra:
                                    education.length > 1 &&
                                    _jsx(Button, {
                                        type: 'text',
                                        danger: true,
                                        icon: _jsx(DeleteOutlined, {}),
                                        onClick: () => removeEducation(edu.id),
                                    }),
                                className:
                                    'dark:bg-dark-gray dark:border-light-dark',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                extra:
                                    experience.length > 1 &&
                                    _jsx(Button, {
                                        type: 'text',
                                        danger: true,
                                        icon: _jsx(DeleteOutlined, {}),
                                        onClick: () => removeExperience(exp.id),
                                    }),
                                className:
                                    'dark:bg-dark-gray dark:border-light-dark',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                extra:
                                    references.length > 1 &&
                                    _jsx(Button, {
                                        type: 'text',
                                        danger: true,
                                        icon: _jsx(DeleteOutlined, {}),
                                        onClick: () => removeReference(ref.id),
                                    }),
                                className:
                                    'dark:bg-dark-gray dark:border-light-dark',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                    className:
                                                        'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                        className: 'mb-6',
                        children: _jsx('h1', {
                            className:
                                'text-2xl font-bold text-black dark:text-white',
                            children: 'Create Employee Profile',
                        }),
                    }),
                    _jsxs(Form, {
                        form: form,
                        layout: 'vertical',
                        className:
                            'bg-white dark:bg-dark-gray p-6 rounded-lg border border-gray-200 dark:border-light-dark shadow-sm',
                        onFinish: handleFormSubmit,
                        onChange: () => setSubmissionError(null),
                        children: [
                            _jsxs(Card, {
                                size: 'small',
                                title: _jsxs(_Fragment, {
                                    children: [
                                        _jsx(InfoCircleOutlined, {
                                            className: 'mr-2 text-primary',
                                        }),
                                        _jsx('span', {
                                            className: 'dark:text-white',
                                            children: 'General Information',
                                        }),
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
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Name is required',
                                                        },
                                                    ],
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Full Name',
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Nick Name',
                                                    name: 'nickName',
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Nick Name',
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
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
                                                    label: 'Phone Number',
                                                    name: 'phoneNumber',
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Phone number is required',
                                                        },
                                                    ],
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Phone Number',
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Email',
                                                    name: 'email',
                                                    rules: [
                                                        {
                                                            type: 'email',
                                                            message:
                                                                'Please enter a valid email',
                                                        },
                                                    ],
                                                    children: _jsx(Input, {
                                                        placeholder: 'Email',
                                                        className:
                                                            'dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Gender',
                                                    name: 'gender',
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Gender is required',
                                                        },
                                                    ],
                                                    children: _jsxs(Select, {
                                                        placeholder:
                                                            'Select Gender',
                                                        className:
                                                            'dark:bg-light-dark',
                                                        children: [
                                                            _jsx(
                                                                Select.Option,
                                                                {
                                                                    value: 'male',
                                                                    children:
                                                                        'Male',
                                                                }
                                                            ),
                                                            _jsx(
                                                                Select.Option,
                                                                {
                                                                    value: 'female',
                                                                    children:
                                                                        'Female',
                                                                }
                                                            ),
                                                            _jsx(
                                                                Select.Option,
                                                                {
                                                                    value: 'other',
                                                                    children:
                                                                        'Other',
                                                                }
                                                            ),
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
                                                    label: 'Date Of Birth',
                                                    name: 'dateOfBirth',
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Date of birth is required',
                                                        },
                                                    ],
                                                    children: _jsx(DatePicker, {
                                                        className:
                                                            'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                        placeholder:
                                                            'DD/MM/YYYY',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 16,
                                                children: _jsx(Form.Item, {
                                                    label: 'Photo Upload',
                                                    children: _jsx('div', {
                                                        className:
                                                            'border-2 border-dashed border-gray-300 dark:border-light-dark rounded-lg p-4 bg-gray-50 dark:bg-light-dark h-[80px] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-dark-gray transition-colors',
                                                        children: !uploadedFile
                                                            ? _jsxs('div', {
                                                                  className:
                                                                      'flex items-center gap-4',
                                                                  children: [
                                                                      _jsx(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'text-gray-500 dark:text-white text-sm',
                                                                              children:
                                                                                  'Drag and drop file here or',
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
                                                                                          size: 'small',
                                                                                          children:
                                                                                              'Upload Photo',
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'text-xs text-gray-400 dark:text-gray-300',
                                                                              children:
                                                                                  'Max 5MB (JPG, PNG, ICO)',
                                                                          }
                                                                      ),
                                                                  ],
                                                              })
                                                            : _jsxs('div', {
                                                                  className:
                                                                      'flex items-center gap-4',
                                                                  children: [
                                                                      _jsx(
                                                                          'div',
                                                                          {
                                                                              className:
                                                                                  'text-sm font-medium text-black dark:text-white',
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
                                                                              size: 'small',
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
                                ],
                            }),
                            _jsxs(Card, {
                                size: 'small',
                                title: _jsxs(_Fragment, {
                                    children: [
                                        _jsx(ContactsOutlined, {
                                            className: 'mr-2 text-primary',
                                        }),
                                        _jsx('span', {
                                            className: 'dark:text-white',
                                            children: 'Work Information',
                                        }),
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
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Joining date is required',
                                                        },
                                                    ],
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
                                                    label: 'Pay Slip Generation Date',
                                                    name: 'payslipDate',
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Payslip date is required',
                                                        },
                                                    ],
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
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Department is required',
                                                        },
                                                    ],
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Department',
                                                        className:
                                                            'dark:bg-light-dark',
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Position',
                                                    name: 'position',
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Position is required',
                                                        },
                                                    ],
                                                    children: _jsx(Input, {
                                                        placeholder:
                                                            'Enter Position',
                                                        className:
                                                            'dark:bg-light-dark',
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
                                                        className:
                                                            'dark:bg-light-dark',
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
                                                    children: _jsxs(Select, {
                                                        placeholder:
                                                            'Select Office Location',
                                                        className:
                                                            'dark:bg-light-dark',
                                                        children: [
                                                            _jsx(
                                                                Select.Option,
                                                                {
                                                                    value: 'dhaka',
                                                                    children:
                                                                        'Dhaka Office',
                                                                }
                                                            ),
                                                            _jsx(
                                                                Select.Option,
                                                                {
                                                                    value: 'chittagong',
                                                                    children:
                                                                        'Chittagong Office',
                                                                }
                                                            ),
                                                        ],
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
                                                        className:
                                                            'dark:bg-light-dark',
                                                        children: [
                                                            _jsx(
                                                                Select.Option,
                                                                {
                                                                    value: 'full-time',
                                                                    children:
                                                                        'Full Time',
                                                                }
                                                            ),
                                                            _jsx(
                                                                Select.Option,
                                                                {
                                                                    value: 'part-time',
                                                                    children:
                                                                        'Part Time',
                                                                }
                                                            ),
                                                            _jsx(
                                                                Select.Option,
                                                                {
                                                                    value: 'remote',
                                                                    children:
                                                                        'Remote',
                                                                }
                                                            ),
                                                            _jsx(
                                                                Select.Option,
                                                                {
                                                                    value: 'contract',
                                                                    children:
                                                                        'Contract',
                                                                }
                                                            ),
                                                            _jsx(
                                                                Select.Option,
                                                                {
                                                                    value: 'internship',
                                                                    children:
                                                                        'Internship',
                                                                }
                                                            ),
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
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'In time is required',
                                                        },
                                                    ],
                                                    children: _jsx(TimePicker, {
                                                        className:
                                                            'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                        placeholder:
                                                            'Select In time',
                                                        format: 'HH:mm',
                                                        use12Hours: false,
                                                    }),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 8,
                                                children: _jsx(Form.Item, {
                                                    label: 'Out Time',
                                                    name: 'outTime',
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Out time is required',
                                                        },
                                                    ],
                                                    children: _jsx(TimePicker, {
                                                        className:
                                                            'w-full dark:bg-light-dark dark:border-dark-gray dark:text-white',
                                                        placeholder:
                                                            'Select Out time',
                                                        format: 'HH:mm',
                                                        use12Hours: false,
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
                                                    className:
                                                        'dark:text-white',
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
                                className:
                                    'bg-white dark:bg-dark-gray rounded-lg border border-gray-200 dark:border-light-dark shadow-sm',
                            }),
                            submissionError &&
                                _jsx(Alert, {
                                    message: submissionError,
                                    type: 'error',
                                    showIcon: true,
                                    className: 'mt-4',
                                }),
                            _jsxs('div', {
                                className: 'flex justify-end gap-4 mt-6',
                                children: [
                                    _jsx(Button, {
                                        size: 'large',
                                        onClick: () => form.resetFields(),
                                        className:
                                            'hover:border-primary hover:text-primary transition-colors dark:border-light-dark dark:text-black dark:hover:border-primary',
                                        children: 'Cancel',
                                    }),
                                    _jsx(Button, {
                                        type: 'primary',
                                        size: 'large',
                                        htmlType: 'submit',
                                        loading: loading,
                                        className: 'shadow-sm',
                                        children: 'Save',
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
