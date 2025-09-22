'use client';

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
import type { UploadFile } from 'antd/es/upload/interface';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useNavigate } from 'react-router-dom';
import { Erp_context } from '@/provider/ErpContext';

const { Content } = Layout;
const { TextArea } = Input;

// --- Interfaces ---
interface DependentInfo {
    id: string;
    firstName: string;
    lastName: string;
    relationship: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
}

interface EducationInfo {
    id: string;
    qualification: string;
    major: string;
    institution: string;
    board: string;
    passingYear: string;
    gradeCGPA: string;
}

interface ExperienceInfo {
    id: string;
    companyName: string;
    designation: string;
    location: string;
    joiningDate: string;
    resignDate: string;
    responsibility: string;
}

interface ReferenceInfo {
    id: string;
    reference: string;
    department: string;
    designation: string;
    address: string;
    relationship: string;
    phoneNumber: string;
    email: string;
}

// Interface for Geonames API options
interface GeonamesOption {
    value: number;
    label: string;
}

// --- Geonames API Functions ---
const GEONAMES_USERNAME = 'brightfuturesoft';

const fetchCountries = async (): Promise<GeonamesOption[]> => {
    try {
        const response = await fetch(
            `http://api.geonames.org/countryInfoJSON?username=${GEONAMES_USERNAME}`
        );
        const data = await response.json();
        return data?.geonames
            ?.map((country: any) => ({
                value: country.geonameId,
                label: country.countryName,
            }))
            .sort((a: GeonamesOption, b: GeonamesOption) =>
                a.label.localeCompare(b.label)
            );
    } catch (error) {
        console.error('Failed to fetch countries:', error);
        message.error('Could not load country list from Geonames.');
        return [];
    }
};

const fetchChildren = async (geonameId: number): Promise<GeonamesOption[]> => {
    if (!geonameId) return [];
    try {
        const response = await fetch(
            `http://api.geonames.org/childrenJSON?geonameId=${geonameId}&username=${GEONAMES_USERNAME}`
        );
        const data = await response.json();
        if (data.totalResultsCount === 0) return []; // Geonames returns this for no children
        return data?.geonames?.map((item: any) => ({
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
    const [darkMode, setDarkMode] = useState(false);
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('ADDRESS');
    const [sameAsPresent, setSameAsPresent] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<UploadFile | null>(null);
    const [loading, setLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    // --- Location States ---
    const [countries, setCountries] = useState<GeonamesOption[]>([]);
    // Present Address States
    const [presentStates, setPresentStates] = useState<GeonamesOption[]>([]);
    const [presentCities, setPresentCities] = useState<GeonamesOption[]>([]);
    const [presentAreas, setPresentAreas] = useState<GeonamesOption[]>([]);
    const [presentStatesLoading, setPresentStatesLoading] = useState(false);
    const [presentCitiesLoading, setPresentCitiesLoading] = useState(false);
    const [presentAreasLoading, setPresentAreasLoading] = useState(false);
    // Permanent Address States
    const [permanentStates, setPermanentStates] = useState<GeonamesOption[]>(
        []
    );
    const [permanentCities, setPermanentCities] = useState<GeonamesOption[]>(
        []
    );
    const [permanentAreas, setPermanentAreas] = useState<GeonamesOption[]>([]);
    const [permanentStatesLoading, setPermanentStatesLoading] = useState(false);
    const [permanentCitiesLoading, setPermanentCitiesLoading] = useState(false);
    const [permanentAreasLoading, setPermanentAreasLoading] = useState(false);

    const { user } = useContext(Erp_context);
    const navigate = useNavigate();

    const [dependents, setDependents] = useState<DependentInfo[]>([
        {
            id: '1',
            firstName: '',
            lastName: '',
            relationship: '',
            dateOfBirth: '',
            email: '',
            phoneNumber: '',
        },
    ]);

    const [education, setEducation] = useState<EducationInfo[]>([
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

    const [experience, setExperience] = useState<ExperienceInfo[]>([
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

    const [references, setReferences] = useState<ReferenceInfo[]>([
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
    const handleCountryChange = async (
        option: GeonamesOption | undefined,
        type: 'present' | 'permanent'
    ) => {
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

    const handleStateChange = async (
        option: GeonamesOption | undefined,
        type: 'present' | 'permanent'
    ) => {
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

    const handleCityChange = async (
        option: GeonamesOption | undefined,
        type: 'present' | 'permanent'
    ) => {
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
                firstName: '',
                lastName: '',
                relationship: '',
                dateOfBirth: '',
                email: '',
                phoneNumber: '',
            },
        ]);
    };

    const removeDependent = (id: string) => {
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

    const removeEducation = (id: string) => {
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

    const removeExperience = (id: string) => {
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

    const removeReference = (id: string) => {
        if (references.length > 1) {
            setReferences(references.filter(ref => ref.id !== id));
        }
    };

    const handleFileUpload = (info: any) => {
        setUploadedFile(info.file);
    };

    const removeFile = () => {
        setUploadedFile(null);
    };

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        setSameAsPresent(e.target.checked);
    };

    const handleFormSubmit = async (values: any) => {
        setLoading(true);
        setSubmissionError(null);

        if (!user?._id || !user?.workspace_id) {
            message.error(
                'Authentication credentials not found. Please log in again.'
            );
            setLoading(false);
            return;
        }

        const formatDate = (date: any) => (date ? date.toISOString() : null);

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
                firstName: values[`dependentFirstName_${dep.id}`],
                lastName: values[`dependentLastName_${dep.id}`],
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
        } catch (error: any) {
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
            children: (
                <div className="space-y-6">
                    {/* Present Address */}
                    <Card
                        size="small"
                        title={
                            <>
                                <InfoCircleOutlined className="mr-2" />
                                Present Address
                            </>
                        }
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    label="Address"
                                    name="presentAddress"
                                >
                                    <TextArea
                                        rows={3}
                                        placeholder="Enter Address"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    label="Country"
                                    name="presentCountry"
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        labelInValue
                                        placeholder="Select Country"
                                        options={countries}
                                        onChange={opt =>
                                            handleCountryChange(opt, 'present')
                                        }
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="State"
                                    name="presentState"
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        labelInValue
                                        placeholder="Select State"
                                        options={presentStates}
                                        loading={presentStatesLoading}
                                        disabled={
                                            !form.getFieldValue(
                                                'presentCountry'
                                            )
                                        }
                                        onChange={opt =>
                                            handleStateChange(opt, 'present')
                                        }
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="City"
                                    name="presentCity"
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        labelInValue
                                        placeholder="Select City"
                                        options={presentCities}
                                        loading={presentCitiesLoading}
                                        disabled={
                                            !form.getFieldValue('presentState')
                                        }
                                        onChange={opt =>
                                            handleCityChange(opt, 'present')
                                        }
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Area"
                                    name="presentArea"
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        labelInValue
                                        placeholder="Select Area"
                                        options={presentAreas}
                                        loading={presentAreasLoading}
                                        disabled={
                                            !form.getFieldValue('presentCity')
                                        }
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    label="Zip Code"
                                    name="presentZipCode"
                                >
                                    <Input placeholder="Enter Zip Code" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* Permanent Address */}
                    <Card
                        size="small"
                        title={
                            <>
                                <InfoCircleOutlined className="mr-2" />
                                Permanent Address
                            </>
                        }
                    >
                        <div className="mb-4">
                            <Checkbox
                                checked={sameAsPresent}
                                onChange={handleCheckboxChange}
                            >
                                Same as present address
                            </Checkbox>
                        </div>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    label="Address"
                                    name="permanentAddress"
                                >
                                    <TextArea
                                        rows={3}
                                        placeholder="Enter Address"
                                        disabled={sameAsPresent}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    label="Country"
                                    name="permanentCountry"
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        labelInValue
                                        placeholder="Select Country"
                                        options={countries}
                                        disabled={sameAsPresent}
                                        onChange={opt =>
                                            handleCountryChange(
                                                opt,
                                                'permanent'
                                            )
                                        }
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="State"
                                    name="permanentState"
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        labelInValue
                                        placeholder="Select State"
                                        options={permanentStates}
                                        loading={permanentStatesLoading}
                                        disabled={
                                            sameAsPresent ||
                                            !form.getFieldValue(
                                                'permanentCountry'
                                            )
                                        }
                                        onChange={opt =>
                                            handleStateChange(opt, 'permanent')
                                        }
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="City"
                                    name="permanentCity"
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        labelInValue
                                        placeholder="Select City"
                                        options={permanentCities}
                                        loading={permanentCitiesLoading}
                                        disabled={
                                            sameAsPresent ||
                                            !form.getFieldValue(
                                                'permanentState'
                                            )
                                        }
                                        onChange={opt =>
                                            handleCityChange(opt, 'permanent')
                                        }
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Area"
                                    name="permanentArea"
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        labelInValue
                                        placeholder="Select Area"
                                        options={permanentAreas}
                                        loading={permanentAreasLoading}
                                        disabled={
                                            sameAsPresent ||
                                            !form.getFieldValue('permanentCity')
                                        }
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    label="Zip Code"
                                    name="permanentZipCode"
                                >
                                    <Input
                                        placeholder="Enter Zip Code"
                                        disabled={sameAsPresent}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </div>
            ),
        },
        {
            key: 'PERSONAL INFO',
            label: 'PERSONAL INFO',
            children: (
                <div className="space-y-6">
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                label="Blood Group"
                                name="bloodGroup"
                            >
                                <Select placeholder="Select Blood Group">
                                    <Select.Option value="A+">A+</Select.Option>
                                    <Select.Option value="A-">A-</Select.Option>
                                    <Select.Option value="B+">B+</Select.Option>
                                    <Select.Option value="B-">B-</Select.Option>
                                    <Select.Option value="O+">O+</Select.Option>
                                    <Select.Option value="O-">O-</Select.Option>
                                    <Select.Option value="AB+">
                                        AB+
                                    </Select.Option>
                                    <Select.Option value="AB-">
                                        AB-
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Marital Status"
                                name="maritalStatus"
                            >
                                <Select placeholder="Select Marital Status">
                                    <Select.Option value="single">
                                        Single
                                    </Select.Option>
                                    <Select.Option value="married">
                                        Married
                                    </Select.Option>
                                    <Select.Option value="divorced">
                                        Divorced
                                    </Select.Option>
                                    <Select.Option value="widowed">
                                        Widowed
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Religion"
                                name="religion"
                            >
                                <Select placeholder="Select Religion">
                                    <Select.Option value="islam">
                                        Islam
                                    </Select.Option>
                                    <Select.Option value="hinduism">
                                        Hinduism
                                    </Select.Option>
                                    <Select.Option value="christianity">
                                        Christianity
                                    </Select.Option>
                                    <Select.Option value="buddhism">
                                        Buddhism
                                    </Select.Option>
                                    <Select.Option value="other">
                                        Other
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Nationality"
                                name="nationality"
                            >
                                <Select placeholder="Select Nationality">
                                    <Select.Option value="bangladeshi">
                                        Bangladeshi
                                    </Select.Option>
                                    <Select.Option value="indian">
                                        Indian
                                    </Select.Option>
                                    <Select.Option value="american">
                                        American
                                    </Select.Option>
                                    <Select.Option value="other">
                                        Other
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                label="Passport No"
                                name="passportNo"
                            >
                                <Input placeholder="Enter Passport No" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="National ID"
                                name="nationalId"
                            >
                                <Input placeholder="Enter National ID" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider orientation="left">
                        <ContactsOutlined className="mr-2" />
                        Family Information
                    </Divider>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                label="Father's First Name"
                                name="fatherFirstName"
                            >
                                <Input placeholder="Enter First Name" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Father's Last Name"
                                name="fatherLastName"
                            >
                                <Input placeholder="Enter Last Name" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Father's Phone Number"
                                name="fatherPhoneNumber"
                            >
                                <Input placeholder="Phone Number" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Father's National ID"
                                name="fatherNationalId"
                            >
                                <Input placeholder="Enter National ID" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                label="Mother's First Name"
                                name="motherFirstName"
                            >
                                <Input placeholder="Enter First Name" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Mother's Last Name"
                                name="motherLastName"
                            >
                                <Input placeholder="Enter Last Name" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Mother's Phone Number"
                                name="motherPhoneNumber"
                            >
                                <Input placeholder="Phone Number" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Mother's National ID"
                                name="motherNationalId"
                            >
                                <Input placeholder="Enter National ID" />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            ),
        },
        {
            key: "DEPENDENT'S INFO",
            label: "DEPENDENT'S INFO",
            children: (
                <div className="space-y-4">
                    {dependents.map((dependent, index) => (
                        <Card
                            key={dependent.id}
                            size="small"
                            title={`Dependent ${index + 1}`}
                            extra={
                                dependents.length > 1 && (
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() =>
                                            removeDependent(dependent.id)
                                        }
                                    />
                                )
                            }
                        >
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item
                                        label="First Name"
                                        name={`dependentFirstName_${dependent.id}`}
                                    >
                                        <Input placeholder="Enter First Name" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label="Last Name"
                                        name={`dependentLastName_${dependent.id}`}
                                    >
                                        <Input placeholder="Enter Last Name" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label="Relationship"
                                        name={`dependentRelationship_${dependent.id}`}
                                    >
                                        <Input placeholder="Relationship" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label="Date Of Birth"
                                        name={`dependentDateOfBirth_${dependent.id}`}
                                    >
                                        <DatePicker
                                            className="w-full"
                                            placeholder="DD/MM/YYYY"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Email"
                                        name={`dependentEmail_${dependent.id}`}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Phone Number"
                                        name={`dependentPhoneNumber_${dependent.id}`}
                                    >
                                        <Input placeholder="Phone Number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                    <Button
                        type="dashed"
                        onClick={addDependent}
                        icon={<PlusOutlined />}
                        className="w-full"
                    >
                        Add another
                    </Button>
                </div>
            ),
        },
        {
            key: 'EDUCATION',
            label: 'EDUCATION',
            children: (
                <div className="space-y-4">
                    {education.map((edu, index) => (
                        <Card
                            key={edu.id}
                            size="small"
                            title={`Education ${index + 1}`}
                            extra={
                                education.length > 1 && (
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => removeEducation(edu.id)}
                                    />
                                )
                            }
                        >
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item
                                        label="Qualification"
                                        name={`qualification_${edu.id}`}
                                    >
                                        <Input placeholder="Enter Qualification" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label="Major"
                                        name={`major_${edu.id}`}
                                    >
                                        <Input placeholder="Enter Major" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label="Institution"
                                        name={`institution_${edu.id}`}
                                    >
                                        <Input placeholder="Enter Institution" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label="Board"
                                        name={`board_${edu.id}`}
                                    >
                                        <Input placeholder="Enter Board" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Passing Year"
                                        name={`passingYear_${edu.id}`}
                                    >
                                        <Input placeholder="Enter Passing Year" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Grade/CGPA"
                                        name={`gradeCGPA_${edu.id}`}
                                    >
                                        <Input placeholder="Enter Grade/CGPA" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                    <Button
                        type="dashed"
                        onClick={addEducation}
                        icon={<PlusOutlined />}
                        className="w-full"
                    >
                        Add another
                    </Button>
                </div>
            ),
        },
        {
            key: 'EXPERIENCE',
            label: 'EXPERIENCE',
            children: (
                <div className="space-y-4">
                    {experience.map((exp, index) => (
                        <Card
                            key={exp.id}
                            size="small"
                            title={`Experience ${index + 1}`}
                            extra={
                                experience.length > 1 && (
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => removeExperience(exp.id)}
                                    />
                                )
                            }
                        >
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item
                                        label="Company Name"
                                        name={`companyName_${exp.id}`}
                                    >
                                        <Input placeholder="Enter Company Name" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label="Designation"
                                        name={`designation_${exp.id}`}
                                    >
                                        <Input placeholder="Enter Designation" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label="Location"
                                        name={`location_${exp.id}`}
                                    >
                                        <Input placeholder="Enter Location" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label="Joining Date"
                                        name={`joiningDate_${exp.id}`}
                                    >
                                        <DatePicker
                                            className="w-full"
                                            placeholder="DD/MM/YYYY"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item
                                        label="Resign Date"
                                        name={`resignDate_${exp.id}`}
                                    >
                                        <DatePicker
                                            className="w-full"
                                            placeholder="DD/MM/YYYY"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={18}>
                                    <Form.Item
                                        label="Responsibility"
                                        name={`responsibility_${exp.id}`}
                                    >
                                        <TextArea
                                            rows={2}
                                            placeholder="Enter Responsibility"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                    <Button
                        type="dashed"
                        onClick={addExperience}
                        icon={<PlusOutlined />}
                        className="w-full"
                    >
                        Add another
                    </Button>
                </div>
            ),
        },
        {
            key: 'REFERENCE',
            label: 'REFERENCE',
            children: (
                <div className="space-y-4">
                    {references.map((ref, index) => (
                        <Card
                            key={ref.id}
                            size="small"
                            title={`Reference ${index + 1}`}
                            extra={
                                references.length > 1 && (
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => removeReference(ref.id)}
                                    />
                                )
                            }
                        >
                            <Row gutter={16}>
                                <Col span={4}>
                                    <Form.Item
                                        label="Reference"
                                        name={`reference_${ref.id}`}
                                    >
                                        <Input placeholder="Enter Reference Name" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        label="Department"
                                        name={`refDepartment_${ref.id}`}
                                    >
                                        <Input placeholder="Enter Department Name" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        label="Designation"
                                        name={`refDesignation_${ref.id}`}
                                    >
                                        <Input placeholder="Enter Designation" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        label="Address"
                                        name={`refAddress_${ref.id}`}
                                    >
                                        <Input placeholder="Enter Address" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        label="Relationship"
                                        name={`refRelationship_${ref.id}`}
                                    >
                                        <Input placeholder="Enter Relationship" />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item
                                        label="Phone Number"
                                        name={`refPhoneNumber_${ref.id}`}
                                    >
                                        <Input placeholder="Enter Phone Number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Email"
                                        name={`refEmail_${ref.id}`}
                                    >
                                        <Input placeholder="Enter Email" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                    <Button
                        type="dashed"
                        onClick={addReference}
                        icon={<PlusOutlined />}
                        className="w-full"
                    >
                        Add another
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <ConfigProvider
            theme={{
                algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
                token: {
                    colorPrimary: darkMode ? '#0ea5e9' : '#164e63',
                    colorBgContainer: darkMode ? '#1e293b' : '#ffffff',
                    colorBgLayout: darkMode ? '#0f172a' : '#ffffff',
                },
            }}
        >
            <div className={darkMode ? 'dark' : ''}>
                <Layout className="min-h-screen bg-background">
                    <Content className="p-6 bg-background">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-foreground">
                                Create Employee Profile
                            </h1>
                        </div>

                        <Form
                            form={form}
                            layout="vertical"
                            className="bg-card p-6 rounded-lg border border-border"
                            onFinish={handleFormSubmit}
                            onChange={() => setSubmissionError(null)}
                        >
                            {/* General Information */}
                            <Card
                                size="small"
                                title={
                                    <>
                                        <InfoCircleOutlined className="mr-2" />
                                        General Information
                                    </>
                                }
                                className="mb-6"
                            >
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            label="First Name"
                                            name="firstName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'First name is required',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Enter First Name" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Last Name"
                                            name="lastName"
                                        >
                                            <Input placeholder="Enter Last Name" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Nick Name"
                                            name="nickName"
                                        >
                                            <Input placeholder="Enter Nick Name" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Phone Number"
                                            name="phoneNumber"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Phone number is required',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Phone Number" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message:
                                                        'Please enter a valid email',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Email" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Gender"
                                            name="gender"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Gender is required',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Select Gender">
                                                <Select.Option value="male">
                                                    Male
                                                </Select.Option>
                                                <Select.Option value="female">
                                                    Female
                                                </Select.Option>
                                                <Select.Option value="other">
                                                    Other
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Date Of Birth"
                                            name="dateOfBirth"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Date of birth is required',
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                                className="w-full"
                                                placeholder="DD/MM/YYYY"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={16}>
                                        <Form.Item label="Photo Upload">
                                            <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/50 h-[80px] flex items-center justify-center">
                                                {!uploadedFile ? (
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-muted-foreground text-sm">
                                                            Drag and drop file
                                                            here or
                                                        </div>
                                                        <Upload
                                                            name="photo"
                                                            showUploadList={
                                                                false
                                                            }
                                                            beforeUpload={() =>
                                                                false
                                                            }
                                                            onChange={
                                                                handleFileUpload
                                                            }
                                                        >
                                                            <Button
                                                                type="primary"
                                                                icon={
                                                                    <UploadOutlined />
                                                                }
                                                                size="small"
                                                            >
                                                                Upload Photo
                                                            </Button>
                                                        </Upload>
                                                        <div className="text-xs text-muted-foreground">
                                                            Max 5MB (JPG, PNG,
                                                            ICO)
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-sm font-medium">
                                                            {uploadedFile.name}
                                                        </div>
                                                        <Button
                                                            type="text"
                                                            danger
                                                            icon={
                                                                <DeleteOutlined />
                                                            }
                                                            onClick={removeFile}
                                                            size="small"
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>

                            {/* Work Information */}
                            <Card
                                size="small"
                                title={
                                    <>
                                        <ContactsOutlined className="mr-2" />
                                        Work Information
                                    </>
                                }
                                className="mb-6"
                            >
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Joining Date"
                                            name="joiningDate"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Joining date is required',
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                                className="w-full"
                                                placeholder="DD/MM/YYYY"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Payslip Generation Date"
                                            name="payslipDate"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Payslip date is required',
                                                },
                                            ]}
                                        >
                                            <DatePicker
                                                className="w-full"
                                                placeholder="DD/MM/YYYY"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Confirmation Date"
                                            name="confirmationDate"
                                        >
                                            <DatePicker
                                                className="w-full"
                                                placeholder="DD/MM/YYYY"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Department"
                                            name="department"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Department is required',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Select Department">
                                                <Select.Option value="development">
                                                    Development
                                                </Select.Option>
                                                <Select.Option value="quality">
                                                    Quality
                                                </Select.Option>
                                                <Select.Option value="sales">
                                                    Sales & Marketing
                                                </Select.Option>
                                                <Select.Option value="hr">
                                                    Human Resources
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Position"
                                            name="position"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Position is required',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Select Position">
                                                <Select.Option value="developer">
                                                    Developer
                                                </Select.Option>
                                                <Select.Option value="manager">
                                                    Manager
                                                </Select.Option>
                                                <Select.Option value="analyst">
                                                    Analyst
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Job Title"
                                            name="jobTitle"
                                        >
                                            <Select placeholder="Select Job Title">
                                                <Select.Option value="senior-developer">
                                                    Senior Developer
                                                </Select.Option>
                                                <Select.Option value="junior-developer">
                                                    Junior Developer
                                                </Select.Option>
                                                <Select.Option value="team-lead">
                                                    Team Lead
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Office Location"
                                            name="officeLocation"
                                        >
                                            <Select placeholder="Select Office Location">
                                                <Select.Option value="dhaka">
                                                    Dhaka Office
                                                </Select.Option>
                                                <Select.Option value="chittagong">
                                                    Chittagong Office
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Employment Type"
                                            name="employmentType"
                                        >
                                            <Select placeholder="Select Employment Type">
                                                <Select.Option value="full-time">
                                                    Full Time
                                                </Select.Option>
                                                <Select.Option value="part-time">
                                                    Part Time
                                                </Select.Option>
                                                <Select.Option value="contract">
                                                    Contract
                                                </Select.Option>
                                                <Select.Option value="internship">
                                                    Internship
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            label="In Time"
                                            name="inTime"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'In time is required',
                                                },
                                            ]}
                                        >
                                            <TimePicker
                                                className="w-full"
                                                placeholder="Select In time"
                                                format="HH:mm"
                                                use12Hours={false}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Out Time"
                                            name="outTime"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Out time is required',
                                                },
                                            ]}
                                        >
                                            <TimePicker
                                                className="w-full"
                                                placeholder="Select Out time"
                                                format="HH:mm"
                                                use12Hours={false}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            name="allowFlexibleTime"
                                            valuePropName="checked"
                                        >
                                            <Checkbox>
                                                Allow Flexible Time
                                            </Checkbox>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>

                            {/* Tabbed Sections */}
                            <Tabs
                                activeKey={activeTab}
                                onChange={setActiveTab}
                                items={tabItems}
                                className="bg-card"
                            />

                            {submissionError && (
                                <Alert
                                    message={submissionError}
                                    type="error"
                                    showIcon
                                    className="mt-4"
                                />
                            )}

                            <div className="flex justify-end gap-4 mt-6">
                                <Button
                                    size="large"
                                    onClick={() => form.resetFields()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    className="bg-primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </Content>
                </Layout>
            </div>
        </ConfigProvider>
    );
}
