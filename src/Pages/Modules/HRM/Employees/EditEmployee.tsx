'use client';

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
    const [uploadedFile, setUploadedFile] = useState<any>(null);
    const [dependents, setDependents] = useState<DependentInfo[]>([]);
    const [education, setEducation] = useState<EducationInfo[]>([]);
    const [experience, setExperience] = useState<ExperienceInfo[]>([]);
    const [references, setReferences] = useState<ReferenceInfo[]>([]);

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

            const dynamicFieldValues: { [key: string]: any } = {};

            (employeeData.dependents || []).forEach((dep: DependentInfo) => {
                dynamicFieldValues[`dependentFirstName_${dep.id}`] =
                    dep.firstName;
                dynamicFieldValues[`dependentLastName_${dep.id}`] =
                    dep.lastName;
                dynamicFieldValues[`dependentRelationship_${dep.id}`] =
                    dep.relationship;
                dynamicFieldValues[`dependentDateOfBirth_${dep.id}`] =
                    dep.dateOfBirth ? dayjs(dep.dateOfBirth) : null;
                dynamicFieldValues[`dependentEmail_${dep.id}`] = dep.email;
                dynamicFieldValues[`dependentPhoneNumber_${dep.id}`] =
                    dep.phoneNumber;
            });

            (employeeData.education || []).forEach((edu: EducationInfo) => {
                dynamicFieldValues[`qualification_${edu.id}`] =
                    edu.qualification;
                dynamicFieldValues[`major_${edu.id}`] = edu.major;
                dynamicFieldValues[`institution_${edu.id}`] = edu.institution;
                dynamicFieldValues[`board_${edu.id}`] = edu.board;
                dynamicFieldValues[`passingYear_${edu.id}`] = edu.passingYear;
                dynamicFieldValues[`gradeCGPA_${edu.id}`] = edu.gradeCGPA;
            });

            (employeeData.experience || []).forEach((exp: ExperienceInfo) => {
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

            (employeeData.references || []).forEach((ref: ReferenceInfo) => {
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
        mutationFn: async (payload: any) => {
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
        onError: (err: Error) => {
            message.error(err.message);
        },
    });

    // 4. HANDLE FORM SUBMISSION
    const handleFormUpdate = (values: any) => {
        const formatDate = (date: any) =>
            date ? dayjs(date).toISOString() : null;

        const payload = {
            id: employeeId,
            ...values,
            dateOfBirth: formatDate(values.dateOfBirth),
            joiningDate: formatDate(values.joiningDate),
            payslipDate: formatDate(values.payslipDate),
            confirmationDate: formatDate(values.confirmationDate),

            dependents: dependents.map(dep => ({
                id: dep.id,
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
                firstName: '',
                lastName: '',
                relationship: '',
                dateOfBirth: '',
                email: '',
                phoneNumber: '',
            },
        ]);
    const removeDependent = (id: string) =>
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
    const removeEducation = (id: string) =>
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
    const removeExperience = (id: string) =>
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
    const removeReference = (id: string) =>
        setReferences(references.filter(r => r.id !== id));

    const handleFileUpload = (info: any) => {
        setUploadedFile(info.file);
    };
    const removeFile = () => {
        setUploadedFile(null);
    };

    if (isFetching) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                Loading Employee Data...
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                message="Error"
                description={(error as Error).message}
                type="error"
                showIcon
                style={{ margin: '2rem' }}
            />
        );
    }

    const tabItems = [
        {
            key: 'ADDRESS',
            label: 'ADDRESS',
            children: (
                <div className="space-y-6">
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
                            {' '}
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
                            </Col>{' '}
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
                                onChange={e =>
                                    setSameAsPresent(e.target.checked)
                                }
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
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() =>
                                        removeDependent(dependent.id)
                                    }
                                />
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
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeEducation(edu.id)}
                                />
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
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeExperience(exp.id)}
                                />
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
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeReference(ref.id)}
                                />
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
                    colorPrimary: '#0ea5e9',
                    colorBgContainer: darkMode ? '#1e293b' : '#ffffff',
                    colorBgLayout: darkMode ? '#0f172a' : '#ffffff',
                },
            }}
        >
            <div className={darkMode ? 'dark' : ''}>
                <Layout>
                    <Content className="p-6 bg-background">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-foreground">
                                Edit Employee
                            </h1>
                        </div>
                        <Form
                            form={form}
                            layout="vertical"
                            className="bg-card p-6 rounded-lg border border-border"
                            onFinish={handleFormUpdate}
                        >
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
                                            rules={[{ required: true }]}
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
                                            rules={[{ required: true }]}
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
                                        >
                                            <Input placeholder="Email" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Gender"
                                            name="gender"
                                            rules={[{ required: true }]}
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
                                            rules={[{ required: true }]}
                                        >
                                            <DatePicker
                                                className="w-full"
                                                placeholder="DD/MM/YYYY"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
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
                                            rules={[{ required: true }]}
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
                                            rules={[{ required: true }]}
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
                                            rules={[{ required: true }]}
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
                                            rules={[{ required: true }]}
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
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder="Select In time" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Out Time"
                                            name="outTime"
                                            rules={[{ required: true }]}
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
                            <Tabs
                                activeKey={activeTab}
                                onChange={setActiveTab}
                                items={tabItems}
                                className="bg-card"
                            />
                            <div className="flex justify-end gap-4 mt-6">
                                <Button
                                    size="large"
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    className="bg-primary"
                                    htmlType="submit"
                                    loading={isUpdating}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </Form>
                    </Content>
                </Layout>
            </div>
        </ConfigProvider>
    );
}
