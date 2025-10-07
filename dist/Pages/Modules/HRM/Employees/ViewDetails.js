import { jsxs as _jsxs, jsx as _jsx } from 'react/jsx-runtime';
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
const InfoItem = ({ label, value }) =>
    _jsxs('div', {
        className: 'space-y-1',
        children: [
            _jsxs('p', {
                className: 'text-sm font-medium text-muted-foreground',
                children: [label, ':'],
            }),
            _jsx('p', {
                className: 'text-card-foreground',
                children: value || 'N/A',
            }),
        ],
    });
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
    } = useQuery({
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
    const formatDate = dateString => {
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
                return _jsx(Card, {
                    className: 'bg-card border-border',
                    children: _jsxs(Row, {
                        gutter: [24, 16],
                        children: [
                            _jsx(Col, {
                                span: 8,
                                children: _jsx(InfoItem, {
                                    label: 'Job Title',
                                    value: employeeData.jobTitle,
                                }),
                            }),
                            _jsx(Col, {
                                span: 8,
                                children: _jsx(InfoItem, {
                                    label: 'Joining Date',
                                    value: formatDate(employeeData.joiningDate),
                                }),
                            }),
                            _jsx(Col, {
                                span: 8,
                                children: _jsx(InfoItem, {
                                    label: 'Department',
                                    value: employeeData.department,
                                }),
                            }),
                            _jsx(Col, {
                                span: 8,
                                children: _jsx(InfoItem, {
                                    label: 'Confirmation Date',
                                    value: formatDate(
                                        employeeData.confirmationDate
                                    ),
                                }),
                            }),
                            _jsx(Col, {
                                span: 8,
                                children: _jsx(InfoItem, {
                                    label: 'Office Location',
                                    value: employeeData.officeLocation,
                                }),
                            }),
                            _jsx(Col, {
                                span: 8,
                                children: _jsx(InfoItem, {
                                    label: 'Position',
                                    value: employeeData.position,
                                }),
                            }),
                            _jsx(Col, {
                                span: 8,
                                children: _jsx(InfoItem, {
                                    label: 'Employment Type',
                                    value: employeeData.employmentType,
                                }),
                            }),
                            _jsx(Col, {
                                span: 8,
                                children: _jsx(InfoItem, {
                                    label: 'Payslip Generation Date',
                                    value: formatDate(
                                        employeeData.payslipGenerationDate
                                    ),
                                }),
                            }),
                            _jsx(Col, {
                                span: 8,
                                children: _jsx(InfoItem, {
                                    label: 'In Time',
                                    value: employeeData.inTime,
                                }),
                            }),
                            _jsx(Col, {
                                span: 8,
                                children: _jsx(InfoItem, {
                                    label: 'Out Time',
                                    value: employeeData.outTime,
                                }),
                            }),
                            _jsx(Col, {
                                span: 8,
                                children: _jsx(InfoItem, {
                                    label: 'Flexible Time',
                                    value: employeeData.flexibleTime,
                                }),
                            }),
                        ],
                    }),
                });
            case 'personal':
                return _jsxs('div', {
                    className: 'space-y-4',
                    children: [
                        _jsx(Collapse, {
                            defaultActiveKey: ['personal'],
                            expandIconPosition: 'end',
                            className: 'bg-card border-border',
                            children: _jsx(
                                Panel,
                                {
                                    header: _jsx('span', {
                                        className:
                                            'text-card-foreground font-medium',
                                        children: 'Personal Information',
                                    }),
                                    children: _jsxs(Row, {
                                        gutter: [24, 16],
                                        children: [
                                            _jsx(Col, {
                                                span: 12,
                                                children: _jsx(InfoItem, {
                                                    label: 'Date Of Birth',
                                                    value: formatDate(
                                                        employeeData.dateOfBirth
                                                    ),
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 12,
                                                children: _jsx(InfoItem, {
                                                    label: 'Gender',
                                                    value: employeeData.gender,
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 12,
                                                children: _jsx(InfoItem, {
                                                    label: 'Blood Group',
                                                    value: employeeData.bloodGroup,
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 12,
                                                children: _jsx(InfoItem, {
                                                    label: 'Marital Status',
                                                    value: employeeData.maritalStatus,
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 12,
                                                children: _jsx(InfoItem, {
                                                    label: 'Religion',
                                                    value: employeeData.religion,
                                                }),
                                            }),
                                            _jsx(Col, {
                                                span: 12,
                                                children: _jsx(InfoItem, {
                                                    label: 'Nationality',
                                                    value: employeeData.nationality,
                                                }),
                                            }),
                                        ],
                                    }),
                                },
                                'personal'
                            ),
                        }),
                        _jsx(Collapse, {
                            expandIconPosition: 'end',
                            className: 'bg-card border-border',
                            children: _jsxs(
                                Panel,
                                {
                                    header: _jsx('span', {
                                        className:
                                            'text-card-foreground font-medium',
                                        children: 'Family Information',
                                    }),
                                    children: [
                                        _jsx('h4', {
                                            className: 'font-semibold mb-2',
                                            children: "Father's Information",
                                        }),
                                        _jsx(Row, {
                                            gutter: [24, 16],
                                            className: 'mb-4',
                                            children: _jsx(Col, {
                                                span: 12,
                                                children: _jsx(InfoItem, {
                                                    label: 'Full Name',
                                                    value: `${employeeData.fatherFirstName || ''} ${employeeData.fatherLastName || ''}`,
                                                }),
                                            }),
                                        }),
                                        _jsx('h4', {
                                            className: 'font-semibold mb-2',
                                            children: "Mother's Information",
                                        }),
                                        _jsx(Row, {
                                            gutter: [24, 16],
                                            children: _jsx(Col, {
                                                span: 12,
                                                children: _jsx(InfoItem, {
                                                    label: 'Full Name',
                                                    value: `${employeeData.motherFirstName || ''} ${employeeData.motherLastName || ''}`,
                                                }),
                                            }),
                                        }),
                                    ],
                                },
                                'family'
                            ),
                        }),
                        _jsx(Collapse, {
                            expandIconPosition: 'end',
                            className: 'bg-card border-border',
                            children: _jsx(
                                Panel,
                                {
                                    header: _jsx('span', {
                                        className:
                                            'text-card-foreground font-medium',
                                        children: 'Dependent Information',
                                    }),
                                    children:
                                        employeeData.dependents &&
                                        employeeData.dependents.length > 0
                                            ? employeeData.dependents.map(
                                                  (dep, index) =>
                                                      _jsxs(
                                                          'div',
                                                          {
                                                              className:
                                                                  'mb-4 border-b pb-4 last:border-b-0 last:pb-0',
                                                              children: [
                                                                  _jsxs('h4', {
                                                                      className:
                                                                          'font-semibold mb-2',
                                                                      children:
                                                                          [
                                                                              'Dependent ',
                                                                              index +
                                                                                  1,
                                                                          ],
                                                                  }),
                                                                  _jsxs(Row, {
                                                                      gutter: [
                                                                          24,
                                                                          16,
                                                                      ],
                                                                      children:
                                                                          [
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 12,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Full Name',
                                                                                                  value: `${dep.firstName} ${dep.lastName}`,
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 12,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Relationship',
                                                                                                  value: dep.relationship,
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 12,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Phone Number',
                                                                                                  value: dep.phoneNumber,
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 12,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Date of Birth',
                                                                                                  value: formatDate(
                                                                                                      dep.dateOfBirth
                                                                                                  ),
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                          ],
                                                                  }),
                                                              ],
                                                          },
                                                          dep.id || index
                                                      )
                                              )
                                            : _jsx('div', {
                                                  className: 'text-center py-8',
                                                  children: _jsx('p', {
                                                      className:
                                                          'text-muted-foreground',
                                                      children:
                                                          'No Information Available!',
                                                  }),
                                              }),
                                },
                                'dependent'
                            ),
                        }),
                    ],
                });
            case 'experience-education':
                return _jsxs('div', {
                    className: 'space-y-4',
                    children: [
                        _jsx(Collapse, {
                            defaultActiveKey: ['experience'],
                            expandIconPosition: 'end',
                            className: 'bg-card border-border',
                            children: _jsx(
                                Panel,
                                {
                                    header: _jsx('span', {
                                        className:
                                            'text-card-foreground font-medium',
                                        children: 'Work Experience',
                                    }),
                                    children:
                                        employeeData.experience &&
                                        employeeData.experience.length > 0
                                            ? employeeData.experience.map(
                                                  (exp, index) =>
                                                      _jsx(
                                                          'div',
                                                          {
                                                              className:
                                                                  'mb-4 border-b pb-4 last:border-b-0 last:pb-0',
                                                              children: _jsxs(
                                                                  Row,
                                                                  {
                                                                      gutter: [
                                                                          24,
                                                                          16,
                                                                      ],
                                                                      children:
                                                                          [
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 24,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Company Name',
                                                                                                  value: _jsx(
                                                                                                      'span',
                                                                                                      {
                                                                                                          className:
                                                                                                              'font-semibold',
                                                                                                          children:
                                                                                                              exp.companyName,
                                                                                                      }
                                                                                                  ),
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 12,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Designation',
                                                                                                  value: exp.designation,
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 12,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Location',
                                                                                                  value: exp.location,
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 12,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Joining Date',
                                                                                                  value: formatDate(
                                                                                                      exp.joiningDate
                                                                                                  ),
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 12,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Resign Date',
                                                                                                  value: formatDate(
                                                                                                      exp.resignDate
                                                                                                  ),
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                          ],
                                                                  }
                                                              ),
                                                          },
                                                          exp.id || index
                                                      )
                                              )
                                            : _jsx('div', {
                                                  className: 'text-center py-8',
                                                  children: _jsx('p', {
                                                      className:
                                                          'text-muted-foreground',
                                                      children:
                                                          'No Information Available!',
                                                  }),
                                              }),
                                },
                                'experience'
                            ),
                        }),
                        _jsx(Collapse, {
                            expandIconPosition: 'end',
                            className: 'bg-card border-border',
                            children: _jsx(
                                Panel,
                                {
                                    header: _jsx('span', {
                                        className:
                                            'text-card-foreground font-medium',
                                        children: 'Education',
                                    }),
                                    children:
                                        employeeData.education &&
                                        employeeData.education.length > 0
                                            ? employeeData.education.map(
                                                  (edu, index) =>
                                                      _jsx(
                                                          'div',
                                                          {
                                                              className:
                                                                  'mb-4 border-b pb-4 last:border-b-0 last:pb-0',
                                                              children: _jsxs(
                                                                  Row,
                                                                  {
                                                                      gutter: [
                                                                          24,
                                                                          16,
                                                                      ],
                                                                      children:
                                                                          [
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 24,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Qualification',
                                                                                                  value: _jsx(
                                                                                                      'span',
                                                                                                      {
                                                                                                          className:
                                                                                                              'font-semibold',
                                                                                                          children:
                                                                                                              edu.qualification,
                                                                                                      }
                                                                                                  ),
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 12,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Major',
                                                                                                  value: edu.major,
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 12,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Institution',
                                                                                                  value: edu.institution,
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 12,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Board',
                                                                                                  value: edu.board,
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 12,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Passing Year',
                                                                                                  value: edu.passingYear,
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                              _jsx(
                                                                                  Col,
                                                                                  {
                                                                                      span: 12,
                                                                                      children:
                                                                                          _jsx(
                                                                                              InfoItem,
                                                                                              {
                                                                                                  label: 'Grade/CGPA',
                                                                                                  value: edu.gradeCGPA,
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                          ],
                                                                  }
                                                              ),
                                                          },
                                                          edu.id || index
                                                      )
                                              )
                                            : _jsx('div', {
                                                  className: 'text-center py-8',
                                                  children: _jsx('p', {
                                                      className:
                                                          'text-muted-foreground',
                                                      children:
                                                          'No Information Available!',
                                                  }),
                                              }),
                                },
                                'education'
                            ),
                        }),
                    ],
                });
            case 'reference':
                return _jsx('div', {
                    className: 'space-y-4',
                    children: _jsx(Collapse, {
                        defaultActiveKey: ['reference'],
                        expandIconPosition: 'end',
                        className: 'bg-card border-border',
                        children: _jsx(
                            Panel,
                            {
                                header: _jsx('span', {
                                    className:
                                        'text-card-foreground font-medium',
                                    children: 'Reference',
                                }),
                                children:
                                    employeeData.references &&
                                    employeeData.references.length > 0
                                        ? employeeData.references.map(
                                              (ref, index) =>
                                                  _jsxs(
                                                      'div',
                                                      {
                                                          className:
                                                              'mb-4 border-b pb-4 last:border-b-0 last:pb-0',
                                                          children: [
                                                              _jsxs('h4', {
                                                                  className:
                                                                      'font-semibold mb-2',
                                                                  children: [
                                                                      'Reference ',
                                                                      index + 1,
                                                                  ],
                                                              }),
                                                              _jsxs(Row, {
                                                                  gutter: [
                                                                      24, 16,
                                                                  ],
                                                                  children: [
                                                                      _jsx(
                                                                          Col,
                                                                          {
                                                                              span: 12,
                                                                              children:
                                                                                  _jsx(
                                                                                      InfoItem,
                                                                                      {
                                                                                          label: 'Name',
                                                                                          value: ref.reference,
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          Col,
                                                                          {
                                                                              span: 12,
                                                                              children:
                                                                                  _jsx(
                                                                                      InfoItem,
                                                                                      {
                                                                                          label: 'Relationship',
                                                                                          value: ref.relationship,
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          Col,
                                                                          {
                                                                              span: 12,
                                                                              children:
                                                                                  _jsx(
                                                                                      InfoItem,
                                                                                      {
                                                                                          label: 'Designation',
                                                                                          value: ref.designation,
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          Col,
                                                                          {
                                                                              span: 12,
                                                                              children:
                                                                                  _jsx(
                                                                                      InfoItem,
                                                                                      {
                                                                                          label: 'Phone Number',
                                                                                          value: ref.phoneNumber,
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                  ],
                                                              }),
                                                          ],
                                                      },
                                                      ref.id || index
                                                  )
                                          )
                                        : _jsx('div', {
                                              className: 'text-center py-8',
                                              children: _jsx('p', {
                                                  className:
                                                      'text-muted-foreground',
                                                  children:
                                                      'No Information Available!',
                                              }),
                                          }),
                            },
                            'reference'
                        ),
                    }),
                });
            default:
                return null;
        }
    };
    if (isLoading) {
        return _jsx('div', {
            style: { padding: '2rem', textAlign: 'center' },
            children: 'Loading Employee Details...',
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
    if (!employeeData) {
        return _jsx(Alert, {
            message: 'Not Found',
            description: 'Could not find the requested employee.',
            type: 'warning',
            showIcon: true,
            style: { margin: '2rem' },
        });
    }
    return _jsx(ConfigProvider, {
        theme: {
            algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
            token: { colorPrimary: '#0ea5e9' },
        },
        children: _jsx('div', {
            className: darkMode ? 'dark' : '',
            children: _jsx(Layout, {
                children: _jsxs(Content, {
                    className: 'p-6 bg-background',
                    children: [
                        _jsxs('div', {
                            className: 'flex items-center justify-between mb-6',
                            children: [
                                _jsx('h1', {
                                    className:
                                        'text-2xl font-bold text-foreground',
                                    children: 'Employee Details',
                                }),
                                _jsx(Button, {
                                    onClick: () =>
                                        navigate(
                                            `/dashboard/hr-module/employees/edit-employees/${employeeData._id}`
                                        ),
                                    children: 'Edit Employee',
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'grid grid-cols-12 gap-6',
                            children: [
                                _jsx('div', {
                                    className: 'col-span-3',
                                    children: _jsxs(Card, {
                                        className: 'bg-card border-border',
                                        children: [
                                            _jsxs('div', {
                                                className: 'text-center mb-6',
                                                children: [
                                                    _jsx(Avatar, {
                                                        size: 120,
                                                        src: employeeData.avatar,
                                                        icon: _jsx(
                                                            UserOutlined,
                                                            {}
                                                        ),
                                                        className: 'mb-4',
                                                    }),
                                                    _jsx('h2', {
                                                        className:
                                                            'text-xl font-bold text-card-foreground mb-1',
                                                        children: `${employeeData.firstName} ${employeeData.lastName}`,
                                                    }),
                                                    _jsxs('div', {
                                                        className:
                                                            'flex items-center justify-center gap-2 mb-2',
                                                        children: [
                                                            _jsx(UserOutlined, {
                                                                className:
                                                                    'text-primary',
                                                            }),
                                                            _jsx('span', {
                                                                className:
                                                                    'text-muted-foreground',
                                                                children:
                                                                    employeeData.position,
                                                            }),
                                                        ],
                                                    }),
                                                    _jsxs('div', {
                                                        className:
                                                            'flex items-center justify-center gap-2 mb-4',
                                                        children: [
                                                            _jsx(
                                                                PhoneOutlined,
                                                                {
                                                                    className:
                                                                        'text-primary',
                                                                }
                                                            ),
                                                            _jsx('span', {
                                                                className:
                                                                    'text-muted-foreground',
                                                                children:
                                                                    employeeData.phoneNumber,
                                                            }),
                                                        ],
                                                    }),
                                                    _jsx(Tag, {
                                                        color:
                                                            employeeData.status ===
                                                            'Active'
                                                                ? 'green'
                                                                : 'red',
                                                        children:
                                                            employeeData.status,
                                                    }),
                                                ],
                                            }),
                                            _jsx('div', {
                                                className: 'space-y-1',
                                                children: sidebarSections.map(
                                                    section =>
                                                        _jsx(
                                                            'div',
                                                            {
                                                                className: `p-3 rounded cursor-pointer transition-colors ${activeSection === section.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`,
                                                                onClick: () =>
                                                                    setActiveSection(
                                                                        section.key
                                                                    ),
                                                                children:
                                                                    section.label,
                                                            },
                                                            section.key
                                                        )
                                                ),
                                            }),
                                        ],
                                    }),
                                }),
                                _jsx('div', {
                                    className: 'col-span-9',
                                    children: renderContent(),
                                }),
                            ],
                        }),
                    ],
                }),
            }),
        }),
    });
}
