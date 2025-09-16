import { useState, useContext } from 'react';
import {
    Layout,
    Button,
    Avatar,
    Tag,
    ConfigProvider,
    theme,
    Card,
    Row,
    Col,
    Collapse,
    Alert,
} from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Erp_context } from '@/provider/ErpContext';
import dayjs from 'dayjs';

const { Content } = Layout;
const { Panel } = Collapse;

// 1. CORRECTED Interface to match the flat data structure from your database
interface EmployeeData {
    _id: string;
    firstName: string;
    lastName: string;
    position: string;
    phoneNumber: string;
    status: 'Active' | 'Inactive' | 'On Leave' | 'Resigned';
    avatar?: string;
    // Job Info (now top-level)
    jobTitle: string;
    joiningDate: string;
    confirmationDate: string;
    department: string;
    officeLocation: string;
    employmentType: string;
    payslipGenerationDate: string;
    inTime: string;
    outTime: string;
    flexibleTime: string;
    // Personal Info (now top-level)
    dateOfBirth: string;
    gender: string;
    bloodGroup?: string;
    maritalStatus?: string;
    religion?: string;
    nationality?: string;
    passportNo?: string;
    nationalId?: string;
    fatherFirstName?: string;
    fatherLastName?: string;
    motherFirstName?: string;
    motherLastName?: string;
    // Dynamic Arrays
    dependents?: Array<{
        id: string;
        firstName: string;
        lastName: string;
        relationship: string;
        dateOfBirth: string;
        email: string;
        phoneNumber: string;
    }>;
    education?: Array<{
        id: string;
        qualification: string;
        major: string;
        institution: string;
        board: string;
        passingYear: string;
        gradeCGPA: string;
    }>;
    experience?: Array<{
        id: string;
        companyName: string;
        designation: string;
        location: string;
        joiningDate: string;
        resignDate: string;
        responsibility: string;
    }>;
    references?: Array<{
        id: string;
        reference: string;
        department: string;
        designation: string;
        address: string;
        relationship: string;
        phoneNumber: string;
        email: string;
    }>;
}

const InfoItem = ({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) => (
    <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{label}:</p>
        <p className="text-card-foreground">{value || 'N/A'}</p>
    </div>
);

export default function EmployeeDetails() {
    // 2. CORRECTED useParams to get the ID directly
    const employeeId = useParams();
    const { user } = useContext(Erp_context);
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState('job');
    const { defaultAlgorithm, darkAlgorithm } = theme;

    const {
        data: employeeData,
        isLoading,
        error,
    } = useQuery<EmployeeData>({
        queryKey: ['employee', employeeId],
        queryFn: async () => {
            if (!employeeId || !user) return null;
            // 3. CORRECTED URL to use the direct employeeId string
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}hrm/employees/get/${employeeId?.id}`,
                {
                    headers: {
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch employee details.');
            const result = await res.json();
            return result.data;
        },
        enabled: !!employeeId && !!user,
    });

    const formatDate = (dateString: string | undefined) => {
        if (!dateString || !dayjs(dateString).isValid()) return 'N/A';
        return dayjs(dateString).format('D MMM YYYY');
    };

    const sidebarSections = [
        { key: 'job', label: 'Job' },
        { key: 'personal', label: 'Personal' },
        { key: 'experience-education', label: 'Experience & Education' },
        { key: 'reference', label: 'Reference' },
    ];

    // 4. CORRECTED render functions to use the flat data structure
    const renderContent = () => {
        if (!employeeData) return null; // Guard against rendering without data

        switch (activeSection) {
            case 'job':
                return (
                    <Card className="bg-card border-border">
                        <Row gutter={[24, 16]}>
                            <Col span={8}>
                                <InfoItem
                                    label="Job Title"
                                    value={employeeData.jobTitle}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoItem
                                    label="Joining Date"
                                    value={formatDate(employeeData.joiningDate)}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoItem
                                    label="Department"
                                    value={employeeData.department}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoItem
                                    label="Confirmation Date"
                                    value={formatDate(
                                        employeeData.confirmationDate
                                    )}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoItem
                                    label="Office Location"
                                    value={employeeData.officeLocation}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoItem
                                    label="Position"
                                    value={employeeData.position}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoItem
                                    label="Employment Type"
                                    value={employeeData.employmentType}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoItem
                                    label="Payslip Generation Date"
                                    value={formatDate(
                                        employeeData.payslipGenerationDate
                                    )}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoItem
                                    label="In Time"
                                    value={employeeData.inTime}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoItem
                                    label="Out Time"
                                    value={employeeData.outTime}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoItem
                                    label="Flexible Time"
                                    value={employeeData.flexibleTime}
                                />
                            </Col>
                        </Row>
                    </Card>
                );

            case 'personal':
                return (
                    <div className="space-y-4">
                        <Collapse
                            defaultActiveKey={['personal']}
                            expandIconPosition="end"
                            className="bg-card border-border"
                        >
                            <Panel
                                header={
                                    <span className="text-card-foreground font-medium">
                                        Personal Information
                                    </span>
                                }
                                key="personal"
                            >
                                <Row gutter={[24, 16]}>
                                    <Col span={12}>
                                        <InfoItem
                                            label="Date Of Birth"
                                            value={formatDate(
                                                employeeData.dateOfBirth
                                            )}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <InfoItem
                                            label="Gender"
                                            value={employeeData.gender}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <InfoItem
                                            label="Blood Group"
                                            value={employeeData.bloodGroup}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <InfoItem
                                            label="Marital Status"
                                            value={employeeData.maritalStatus}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <InfoItem
                                            label="Religion"
                                            value={employeeData.religion}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <InfoItem
                                            label="Nationality"
                                            value={employeeData.nationality}
                                        />
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                        <Collapse
                            expandIconPosition="end"
                            className="bg-card border-border"
                        >
                            <Panel
                                header={
                                    <span className="text-card-foreground font-medium">
                                        Family Information
                                    </span>
                                }
                                key="family"
                            >
                                <h4 className="font-semibold mb-2">
                                    Father's Information
                                </h4>
                                <Row
                                    gutter={[24, 16]}
                                    className="mb-4"
                                >
                                    <Col span={12}>
                                        <InfoItem
                                            label="Full Name"
                                            value={`${employeeData.fatherFirstName || ''} ${employeeData.fatherLastName || ''}`}
                                        />
                                    </Col>
                                </Row>
                                <h4 className="font-semibold mb-2">
                                    Mother's Information
                                </h4>
                                <Row gutter={[24, 16]}>
                                    <Col span={12}>
                                        <InfoItem
                                            label="Full Name"
                                            value={`${employeeData.motherFirstName || ''} ${employeeData.motherLastName || ''}`}
                                        />
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                        <Collapse
                            expandIconPosition="end"
                            className="bg-card border-border"
                        >
                            <Panel
                                header={
                                    <span className="text-card-foreground font-medium">
                                        Dependent Information
                                    </span>
                                }
                                key="dependent"
                            >
                                {employeeData.dependents &&
                                employeeData.dependents.length > 0 ? (
                                    employeeData.dependents.map(
                                        (dep, index) => (
                                            <div
                                                key={dep.id || index}
                                                className="mb-4 border-b pb-4 last:border-b-0 last:pb-0"
                                            >
                                                <h4 className="font-semibold mb-2">
                                                    Dependent {index + 1}
                                                </h4>
                                                <Row gutter={[24, 16]}>
                                                    <Col span={12}>
                                                        <InfoItem
                                                            label="Full Name"
                                                            value={`${dep.firstName} ${dep.lastName}`}
                                                        />
                                                    </Col>
                                                    <Col span={12}>
                                                        <InfoItem
                                                            label="Relationship"
                                                            value={
                                                                dep.relationship
                                                            }
                                                        />
                                                    </Col>
                                                    <Col span={12}>
                                                        <InfoItem
                                                            label="Phone Number"
                                                            value={
                                                                dep.phoneNumber
                                                            }
                                                        />
                                                    </Col>
                                                    <Col span={12}>
                                                        <InfoItem
                                                            label="Date of Birth"
                                                            value={formatDate(
                                                                dep.dateOfBirth
                                                            )}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground">
                                            No Information Available!
                                        </p>
                                    </div>
                                )}
                            </Panel>
                        </Collapse>
                    </div>
                );

            case 'experience-education':
                return (
                    <div className="space-y-4">
                        <Collapse
                            defaultActiveKey={['experience']}
                            expandIconPosition="end"
                            className="bg-card border-border"
                        >
                            <Panel
                                header={
                                    <span className="text-card-foreground font-medium">
                                        Work Experience
                                    </span>
                                }
                                key="experience"
                            >
                                {employeeData.experience &&
                                employeeData.experience.length > 0 ? (
                                    employeeData.experience.map(
                                        (exp, index) => (
                                            <div
                                                key={exp.id || index}
                                                className="mb-4 border-b pb-4 last:border-b-0 last:pb-0"
                                            >
                                                <Row gutter={[24, 16]}>
                                                    <Col span={24}>
                                                        <InfoItem
                                                            label="Company Name"
                                                            value={
                                                                <span className="font-semibold">
                                                                    {
                                                                        exp.companyName
                                                                    }
                                                                </span>
                                                            }
                                                        />
                                                    </Col>
                                                    <Col span={12}>
                                                        <InfoItem
                                                            label="Designation"
                                                            value={
                                                                exp.designation
                                                            }
                                                        />
                                                    </Col>
                                                    <Col span={12}>
                                                        <InfoItem
                                                            label="Location"
                                                            value={exp.location}
                                                        />
                                                    </Col>
                                                    <Col span={12}>
                                                        <InfoItem
                                                            label="Joining Date"
                                                            value={formatDate(
                                                                exp.joiningDate
                                                            )}
                                                        />
                                                    </Col>
                                                    <Col span={12}>
                                                        <InfoItem
                                                            label="Resign Date"
                                                            value={formatDate(
                                                                exp.resignDate
                                                            )}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground">
                                            No Information Available!
                                        </p>
                                    </div>
                                )}
                            </Panel>
                        </Collapse>
                        <Collapse
                            expandIconPosition="end"
                            className="bg-card border-border"
                        >
                            <Panel
                                header={
                                    <span className="text-card-foreground font-medium">
                                        Education
                                    </span>
                                }
                                key="education"
                            >
                                {employeeData.education &&
                                employeeData.education.length > 0 ? (
                                    employeeData.education.map((edu, index) => (
                                        <div
                                            key={edu.id || index}
                                            className="mb-4 border-b pb-4 last:border-b-0 last:pb-0"
                                        >
                                            <Row gutter={[24, 16]}>
                                                <Col span={24}>
                                                    <InfoItem
                                                        label="Qualification"
                                                        value={
                                                            <span className="font-semibold">
                                                                {
                                                                    edu.qualification
                                                                }
                                                            </span>
                                                        }
                                                    />
                                                </Col>
                                                <Col span={12}>
                                                    <InfoItem
                                                        label="Major"
                                                        value={edu.major}
                                                    />
                                                </Col>
                                                <Col span={12}>
                                                    <InfoItem
                                                        label="Institution"
                                                        value={edu.institution}
                                                    />
                                                </Col>
                                                <Col span={12}>
                                                    <InfoItem
                                                        label="Board"
                                                        value={edu.board}
                                                    />
                                                </Col>
                                                <Col span={12}>
                                                    <InfoItem
                                                        label="Passing Year"
                                                        value={edu.passingYear}
                                                    />
                                                </Col>
                                                <Col span={12}>
                                                    <InfoItem
                                                        label="Grade/CGPA"
                                                        value={edu.gradeCGPA}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground">
                                            No Information Available!
                                        </p>
                                    </div>
                                )}
                            </Panel>
                        </Collapse>
                    </div>
                );

            case 'reference':
                return (
                    <div className="space-y-4">
                        <Collapse
                            defaultActiveKey={['reference']}
                            expandIconPosition="end"
                            className="bg-card border-border"
                        >
                            <Panel
                                header={
                                    <span className="text-card-foreground font-medium">
                                        Reference
                                    </span>
                                }
                                key="reference"
                            >
                                {employeeData.references &&
                                employeeData.references.length > 0 ? (
                                    employeeData.references.map(
                                        (ref, index) => (
                                            <div
                                                key={ref.id || index}
                                                className="mb-4 border-b pb-4 last:border-b-0 last:pb-0"
                                            >
                                                <h4 className="font-semibold mb-2">
                                                    Reference {index + 1}
                                                </h4>
                                                <Row gutter={[24, 16]}>
                                                    <Col span={12}>
                                                        <InfoItem
                                                            label="Name"
                                                            value={
                                                                ref.reference
                                                            }
                                                        />
                                                    </Col>
                                                    <Col span={12}>
                                                        <InfoItem
                                                            label="Relationship"
                                                            value={
                                                                ref.relationship
                                                            }
                                                        />
                                                    </Col>
                                                    <Col span={12}>
                                                        <InfoItem
                                                            label="Designation"
                                                            value={
                                                                ref.designation
                                                            }
                                                        />
                                                    </Col>
                                                    <Col span={12}>
                                                        <InfoItem
                                                            label="Phone Number"
                                                            value={
                                                                ref.phoneNumber
                                                            }
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground">
                                            No Information Available!
                                        </p>
                                    </div>
                                )}
                            </Panel>
                        </Collapse>
                    </div>
                );

            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                Loading Employee Details...
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

    if (!employeeData) {
        return (
            <Alert
                message="Not Found"
                description="Could not find the requested employee."
                type="warning"
                showIcon
                style={{ margin: '2rem' }}
            />
        );
    }

    return (
        <ConfigProvider
            theme={{
                algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
                token: { colorPrimary: '#0ea5e9' },
            }}
        >
            <div className={darkMode ? 'dark' : ''}>
                <Layout>
                    <Content className="p-6 bg-background">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-foreground">
                                Employee Details
                            </h1>
                            <Button
                                onClick={() =>
                                    navigate(
                                        `/dashboard/hr-module/employees/edit-employees/${employeeData._id}`
                                    )
                                }
                            >
                                Edit Employee
                            </Button>
                        </div>

                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-3">
                                <Card className="bg-card border-border">
                                    <div className="text-center mb-6">
                                        <Avatar
                                            size={120}
                                            src={employeeData.avatar}
                                            icon={<UserOutlined />}
                                            className="mb-4"
                                        />
                                        <h2 className="text-xl font-bold text-card-foreground mb-1">{`${employeeData.firstName} ${employeeData.lastName}`}</h2>
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <UserOutlined className="text-primary" />
                                            <span className="text-muted-foreground">
                                                {employeeData.position}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <PhoneOutlined className="text-primary" />
                                            <span className="text-muted-foreground">
                                                {employeeData.phoneNumber}
                                            </span>
                                        </div>
                                        <Tag
                                            color={
                                                employeeData.status === 'Active'
                                                    ? 'green'
                                                    : 'red'
                                            }
                                        >
                                            {employeeData.status}
                                        </Tag>
                                    </div>

                                    <div className="space-y-1">
                                        {sidebarSections.map(section => (
                                            <div
                                                key={section.key}
                                                className={`p-3 rounded cursor-pointer transition-colors ${activeSection === section.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
                                                onClick={() =>
                                                    setActiveSection(
                                                        section.key
                                                    )
                                                }
                                            >
                                                {section.label}
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>

                            <div className="col-span-9">{renderContent()}</div>
                        </div>
                    </Content>
                </Layout>
            </div>
        </ConfigProvider>
    );
}
