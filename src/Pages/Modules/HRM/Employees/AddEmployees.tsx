import { useState, useEffect, useContext } from 'react'; // 1. Import useContext
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
import type { UploadFile } from 'antd/es/upload/interface';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useNavigate } from 'react-router-dom';
import { Erp_context } from '@/provider/ErpContext';

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

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

export default function CreateEmployee() {
    const [darkMode, setDarkMode] = useState(false);
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('ADDRESS');
    const [sameAsPresent, setSameAsPresent] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<UploadFile | null>(null);

    const [loading, setLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    // 4. Get user data from context and initialize navigate
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

    useEffect(() => {
        if (sameAsPresent) {
            const presentAddressValues = form.getFieldsValue([
                'presentAddress',
                'presentCountry',
                'presentState',
                'presentDistrict',
                'presentThana',
                'presentZipCode',
            ]);
            form.setFieldsValue({
                permanentAddress: presentAddressValues.presentAddress,
                permanentCountry: presentAddressValues.presentCountry,
                permanentState: presentAddressValues.presentState,
                permanentDistrict: presentAddressValues.presentDistrict,
                permanentThana: presentAddressValues.presentThana,
                permanentZipCode: presentAddressValues.presentZipCode,
            });
        } else {
            form.setFieldsValue({
                permanentAddress: undefined,
                permanentCountry: undefined,
                permanentState: undefined,
                permanentDistrict: undefined,
                permanentThana: undefined,
                permanentZipCode: undefined,
            });
        }
    }, [sameAsPresent, form]);

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

        // Check for user and workspace ID from context FIRST
        if (!user?._id || !user?.workspace_id) {
            message.error(
                'Authentication credentials not found. Please log in again.'
            );
            setLoading(false);
            return;
        }

        const formatDate = (date: any) => (date ? date.toISOString() : null);

        const payload = {
            ...values,
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
            // Redirect to the employee list page on success
            navigate('/dashboard/hr-module/employees'); // <-- Adjust this path if needed
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

    // The rest of your component remains exactly the same...
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
                                    <Select placeholder="Select Country">
                                        <Option value="bangladesh">
                                            Bangladesh
                                        </Option>
                                        <Option value="india">India</Option>
                                        <Option value="usa">USA</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="State/Division"
                                    name="presentState"
                                >
                                    <Select placeholder="Select State">
                                        <Option value="dhaka">Dhaka</Option>
                                        <Option value="chittagong">
                                            Chittagong
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="District"
                                    name="presentDistrict"
                                >
                                    <Select placeholder="Select District">
                                        <Option value="dhaka">Dhaka</Option>
                                        <Option value="chittagong">
                                            Chittagong
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Thana"
                                    name="presentThana"
                                >
                                    <Select placeholder="Select Thana">
                                        <Option value="dhanmondi">
                                            Dhanmondi
                                        </Option>
                                        <Option value="gulshan">Gulshan</Option>
                                    </Select>
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
                                        placeholder="Select Country"
                                        disabled={sameAsPresent}
                                    >
                                        <Option value="bangladesh">
                                            Bangladesh
                                        </Option>
                                        <Option value="india">India</Option>
                                        <Option value="usa">USA</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="State/Division"
                                    name="permanentState"
                                >
                                    <Select
                                        placeholder="Select State"
                                        disabled={sameAsPresent}
                                    >
                                        <Option value="dhaka">Dhaka</Option>
                                        <Option value="chittagong">
                                            Chittagong
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="District"
                                    name="permanentDistrict"
                                >
                                    <Select
                                        placeholder="Select District"
                                        disabled={sameAsPresent}
                                    >
                                        <Option value="dhaka">Dhaka</Option>
                                        <Option value="chittagong">
                                            Chittagong
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Thana"
                                    name="permanentThana"
                                >
                                    <Select
                                        placeholder="Select Thana"
                                        disabled={sameAsPresent}
                                    >
                                        <Option value="dhanmondi">
                                            Dhanmondi
                                        </Option>
                                        <Option value="gulshan">Gulshan</Option>
                                    </Select>
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
                                    <Option value="A+">A+</Option>
                                    <Option value="A-">A-</Option>
                                    <Option value="B+">B+</Option>
                                    <Option value="B-">B-</Option>
                                    <Option value="O+">O+</Option>
                                    <Option value="O-">O-</Option>
                                    <Option value="AB+">AB+</Option>
                                    <Option value="AB-">AB-</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Marital Status"
                                name="maritalStatus"
                            >
                                <Select placeholder="Select Marital Status">
                                    <Option value="single">Single</Option>
                                    <Option value="married">Married</Option>
                                    <Option value="divorced">Divorced</Option>
                                    <Option value="widowed">Widowed</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Religion"
                                name="religion"
                            >
                                <Select placeholder="Select Religion">
                                    <Option value="islam">Islam</Option>
                                    <Option value="hinduism">Hinduism</Option>
                                    <Option value="christianity">
                                        Christianity
                                    </Option>
                                    <Option value="buddhism">Buddhism</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Nationality"
                                name="nationality"
                            >
                                <Select placeholder="Select Nationality">
                                    <Option value="bangladeshi">
                                        Bangladeshi
                                    </Option>
                                    <Option value="indian">Indian</Option>
                                    <Option value="american">American</Option>
                                    <Option value="other">Other</Option>
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
                                        <div className="text-center">
                                            <div className="border-2 border-dashed border-border rounded-lg p-4 bg-muted/50">
                                                {!uploadedFile ? (
                                                    <div>
                                                        <div className="text-muted-foreground mb-2">
                                                            Drag and drop file
                                                            here
                                                        </div>
                                                        <div className="text-muted-foreground mb-2">
                                                            or
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
                                                            >
                                                                Upload Photo
                                                            </Button>
                                                        </Upload>
                                                        <div className="text-xs text-muted-foreground mt-2">
                                                            Maximum file size
                                                            5MB
                                                            <br />
                                                            Supported Formats:
                                                            JPG, JPEG, PNG & ICO
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center">
                                                        <div className="text-sm font-medium mb-2">
                                                            {uploadedFile.name}
                                                        </div>
                                                        <Button
                                                            type="text"
                                                            danger
                                                            icon={
                                                                <DeleteOutlined />
                                                            }
                                                            onClick={removeFile}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Nick Name"
                                            name="nickName"
                                        >
                                            <Input placeholder="Enter Nick Name" />
                                        </Form.Item>
                                    </Col>
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
                                </Row>
                                <Row gutter={16}>
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
                                                <Option value="male">
                                                    Male
                                                </Option>
                                                <Option value="female">
                                                    Female
                                                </Option>
                                                <Option value="other">
                                                    Other
                                                </Option>
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
                                                <Option value="development">
                                                    Development
                                                </Option>
                                                <Option value="quality">
                                                    Quality
                                                </Option>
                                                <Option value="sales">
                                                    Sales & Marketing
                                                </Option>
                                                <Option value="hr">
                                                    Human Resources
                                                </Option>
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
                                                <Option value="developer">
                                                    Developer
                                                </Option>
                                                <Option value="manager">
                                                    Manager
                                                </Option>
                                                <Option value="analyst">
                                                    Analyst
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Job Title"
                                            name="jobTitle"
                                        >
                                            <Select placeholder="Select Job Title">
                                                <Option value="senior-developer">
                                                    Senior Developer
                                                </Option>
                                                <Option value="junior-developer">
                                                    Junior Developer
                                                </Option>
                                                <Option value="team-lead">
                                                    Team Lead
                                                </Option>
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
                                                <Option value="dhaka">
                                                    Dhaka Office
                                                </Option>
                                                <Option value="chittagong">
                                                    Chittagong Office
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Employment Type"
                                            name="employmentType"
                                        >
                                            <Select placeholder="Select Employment Type">
                                                <Option value="full-time">
                                                    Full Time
                                                </Option>
                                                <Option value="part-time">
                                                    Part Time
                                                </Option>
                                                <Option value="contract">
                                                    Contract
                                                </Option>
                                                <Option value="internship">
                                                    Internship
                                                </Option>
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
                                            <Input placeholder="Select In time" />
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
                                            <Input placeholder="Select Out time" />
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
