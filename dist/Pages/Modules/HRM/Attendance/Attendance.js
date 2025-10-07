import {
    jsx as _jsx,
    jsxs as _jsxs,
    Fragment as _Fragment,
} from 'react/jsx-runtime';
import React, { useState, useContext, useRef } from 'react';
import {
    Button,
    Card,
    Typography,
    Space,
    Progress,
    message,
    Alert,
    Modal,
    TimePicker,
    Form,
} from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
import {
    ClockCircleOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
const { Title, Text } = Typography;
const Attendance = () => {
    const { user } = useContext(Erp_context);
    const queryClient = useQueryClient();
    const [attendanceLoading, setAttendanceLoading] = useState(false);
    const [leaveLoading, setLeaveLoading] = useState(false);
    const [officeHoursModal, setOfficeHoursModal] = useState(false);
    const [form] = Form.useForm();
    // Press & Hold state
    const [holdProgress, setHoldProgress] = useState(0);
    const [holding, setHolding] = useState(false);
    const [holdAction, setHoldAction] = useState(null);
    const holdTimerRef = useRef(null);
    // --- Dynamic Office Hours
    const [officeHours, setOfficeHours] = useState({
        start: dayjs().hour(14).minute(0).second(0), // 2:00 PM
        end: dayjs().hour(22).minute(0).second(0), // 10:00 PM
    });
    const now = dayjs();
    const isAttendanceWindow =
        now.isAfter(officeHours.start) &&
        now.isBefore(officeHours.start.add(10, 'minute'));
    const isLeaveWindow =
        now.isAfter(officeHours.end.subtract(10, 'minute')) &&
        now.isBefore(officeHours.end);
    // --- Fetch Office Hours ---
    const { data: officeHoursData } = useQuery({
        queryKey: ['officeHours'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}hrm/attendance//office-hours`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch office hours');
            const data = await res.json();
            return data.data;
        },
        enabled: !!user?._id,
    });
    // Update office hours when data is fetched
    React.useEffect(() => {
        if (officeHoursData?.officeHours) {
            setOfficeHours({
                start: dayjs(officeHoursData.officeHours.start, 'HH:mm'),
                end: dayjs(officeHoursData.officeHours.end, 'HH:mm'),
            });
        }
    }, [officeHoursData]);
    // --- Fetch Attendance Summary ---
    const { data: attendanceSummary, isLoading } = useQuery({
        queryKey: ['attendanceSummary'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}hrm/attendance/summary`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch attendance summary');
            const data = await res.json();
            return data.data;
        },
        enabled: !!user?._id,
    });
    // --- Mark Attendance ---
    const markAttendanceMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}hrm/attendance/check-in`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify({
                        officeStartHour: officeHours.start.hour(),
                        officeStartMinute: officeHours.start.minute(),
                    }),
                }
            );
            const result = await res.json();
            if (!res.ok || result.error) throw new Error(result.message);
            return result;
        },
        onSuccess: () => {
            message.success('Attendance marked successfully!');
            queryClient.invalidateQueries({ queryKey: ['attendanceSummary'] });
        },
        onError: err => {
            message.error(err.message || 'Failed to mark attendance');
        },
        onSettled: () => setAttendanceLoading(false),
    });
    // --- Mark Leave ---
    const markLeaveMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}hrm/attendance/leave`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify({
                        officeEndHour: officeHours.end.hour(),
                        officeEndMinute: officeHours.end.minute(),
                    }),
                }
            );
            const result = await res.json();
            if (!res.ok || result.error) throw new Error(result.message);
            return result;
        },
        onSuccess: () => {
            message.success('Leave marked successfully!');
            queryClient.invalidateQueries({ queryKey: ['attendanceSummary'] });
        },
        onError: err => {
            message.error(err.message || 'Failed to mark leave');
        },
        onSettled: () => setLeaveLoading(false),
    });
    const handleMarkAttendance = () => {
        setAttendanceLoading(true);
        markAttendanceMutation.mutate();
    };
    const handleMarkLeave = () => {
        setLeaveLoading(true);
        markLeaveMutation.mutate();
    };
    // --- Update Office Hours ---
    const updateOfficeHoursMutation = useMutation({
        mutationFn: async newHours => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}hrm/attendance/office-hours`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify(newHours),
                }
            );
            const result = await res.json();
            if (!res.ok || result.error) throw new Error(result.message);
            return result;
        },
        onSuccess: data => {
            message.success('Office hours updated successfully!');
            setOfficeHours({
                start: dayjs(data.data.officeHours.start, 'HH:mm'),
                end: dayjs(data.data.officeHours.end, 'HH:mm'),
            });
            setOfficeHoursModal(false);
            queryClient.invalidateQueries({ queryKey: ['officeHours'] });
        },
        onError: err => {
            message.error(err.message || 'Failed to update office hours');
        },
    });
    const handleUpdateOfficeHours = values => {
        const startTime = values.startTime.format('HH:mm');
        const endTime = values.endTime.format('HH:mm');
        updateOfficeHoursMutation.mutate({ startTime, endTime });
    };
    // --- Press & Hold Logic ---
    const startHold = action => {
        setHoldAction(action);
        setHolding(true);
        setHoldProgress(0);
        holdTimerRef.current = setInterval(() => {
            setHoldProgress(prev => {
                if (prev >= 100) {
                    clearInterval(holdTimerRef.current);
                    setHolding(false);
                    if (action === 'attendance') handleMarkAttendance();
                    else handleMarkLeave();
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };
    const stopHold = () => {
        if (holdTimerRef.current) clearInterval(holdTimerRef.current);
        if (holdProgress < 100) {
            setHoldProgress(0);
        }
        setHolding(false);
        setHoldAction(null);
    };
    return _jsx('div', {
        className: 'p-6',
        children: _jsxs('div', {
            className: 'max-w-4xl mx-auto',
            children: [
                _jsxs('div', {
                    className: 'flex items-center justify-between mb-8',
                    children: [
                        _jsx(Title, {
                            level: 2,
                            className: '!mb-0',
                            children: 'Attendance Tracking',
                        }),
                        _jsx(Button, {
                            type: 'default',
                            icon: _jsx(SettingOutlined, {}),
                            onClick: () => setOfficeHoursModal(true),
                            children: 'Office Hours',
                        }),
                    ],
                }),
                _jsx(Alert, {
                    message: `RULE: Office Time is ${officeHours.start.format('h:mm A')} to ${officeHours.end.format('h:mm A')}`,
                    type: 'info',
                    icon: _jsx(ClockCircleOutlined, {}),
                    className: 'mb-8 text-center',
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold',
                        padding: '16px 24px',
                    },
                }),
                isLoading
                    ? _jsx('p', { children: 'Loading...' })
                    : _jsxs(_Fragment, {
                          children: [
                              _jsxs('div', {
                                  className:
                                      'grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8',
                                  children: [
                                      _jsx(Card, {
                                          children: _jsxs(Space, {
                                              direction: 'vertical',
                                              size: 'large',
                                              className: 'w-full',
                                              children: [
                                                  _jsxs('div', {
                                                      className:
                                                          'flex items-center gap-3',
                                                      children: [
                                                          _jsx(
                                                              CheckCircleOutlined,
                                                              {
                                                                  className:
                                                                      'text-2xl text-green-600',
                                                              }
                                                          ),
                                                          _jsx(Title, {
                                                              level: 4,
                                                              className:
                                                                  '!mb-0',
                                                              children:
                                                                  'Attendance Progress',
                                                          }),
                                                      ],
                                                  }),
                                                  _jsx(Progress, {
                                                      percent:
                                                          holdAction ===
                                                          'attendance'
                                                              ? holdProgress
                                                              : 0,
                                                      status: isAttendanceWindow
                                                          ? 'active'
                                                          : 'exception',
                                                      strokeColor: '#059669',
                                                      strokeWidth: 12,
                                                  }),
                                                  _jsx(Button, {
                                                      type: 'primary',
                                                      size: 'large',
                                                      disabled:
                                                          !isAttendanceWindow,
                                                      onMouseDown: () =>
                                                          startHold(
                                                              'attendance'
                                                          ),
                                                      onMouseUp: stopHold,
                                                      onMouseLeave: stopHold,
                                                      onTouchStart: () =>
                                                          startHold(
                                                              'attendance'
                                                          ),
                                                      onTouchEnd: stopHold,
                                                      className: 'w-full',
                                                      children:
                                                          isAttendanceWindow
                                                              ? holding &&
                                                                holdAction ===
                                                                    'attendance'
                                                                  ? 'Hold...'
                                                                  : 'Hold to Mark Attendance'
                                                              : 'Disabled',
                                                  }),
                                              ],
                                          }),
                                      }),
                                      _jsx(Card, {
                                          children: _jsxs(Space, {
                                              direction: 'vertical',
                                              size: 'large',
                                              className: 'w-full',
                                              children: [
                                                  _jsxs('div', {
                                                      className:
                                                          'flex items-center gap-3',
                                                      children: [
                                                          _jsx(
                                                              ExclamationCircleOutlined,
                                                              {
                                                                  className:
                                                                      'text-2xl text-yellow-600',
                                                              }
                                                          ),
                                                          _jsx(Title, {
                                                              level: 4,
                                                              className:
                                                                  '!mb-0',
                                                              children:
                                                                  'Leave Progress',
                                                          }),
                                                      ],
                                                  }),
                                                  _jsx(Progress, {
                                                      percent:
                                                          holdAction === 'leave'
                                                              ? holdProgress
                                                              : 0,
                                                      status: isLeaveWindow
                                                          ? 'active'
                                                          : 'exception',
                                                      strokeColor: '#d97706',
                                                      strokeWidth: 12,
                                                  }),
                                                  _jsx(Button, {
                                                      type: 'primary',
                                                      size: 'large',
                                                      disabled: !isLeaveWindow,
                                                      onMouseDown: () =>
                                                          startHold('leave'),
                                                      onMouseUp: stopHold,
                                                      onMouseLeave: stopHold,
                                                      onTouchStart: () =>
                                                          startHold('leave'),
                                                      onTouchEnd: stopHold,
                                                      className: 'w-full',
                                                      style: {
                                                          backgroundColor:
                                                              '#d97706',
                                                          borderColor:
                                                              '#d97706',
                                                      },
                                                      children: isLeaveWindow
                                                          ? holding &&
                                                            holdAction ===
                                                                'leave'
                                                              ? 'Hold...'
                                                              : 'Hold to Mark Leave'
                                                          : 'Disabled',
                                                  }),
                                              ],
                                          }),
                                      }),
                                  ],
                              }),
                              _jsxs('div', {
                                  className:
                                      'grid grid-cols-1 md:grid-cols-2 gap-6',
                                  children: [
                                      _jsx(Card, {
                                          className: 'text-center',
                                          children: _jsxs(Space, {
                                              direction: 'vertical',
                                              size: 'small',
                                              children: [
                                                  _jsx(ClockCircleOutlined, {
                                                      className:
                                                          'text-3xl text-primary',
                                                  }),
                                                  _jsx(Title, {
                                                      level: 4,
                                                      className: '!mb-0',
                                                      children:
                                                          "Today's Status",
                                                  }),
                                                  _jsx(Text, {
                                                      children:
                                                          attendanceSummary?.todaysStatus ||
                                                          'Not Marked Yet',
                                                  }),
                                              ],
                                          }),
                                      }),
                                      _jsx(Card, {
                                          className: 'text-center',
                                          children: _jsxs(Space, {
                                              direction: 'vertical',
                                              size: 'small',
                                              children: [
                                                  _jsx(CalendarOutlined, {
                                                      className:
                                                          'text-3xl text-secondary',
                                                  }),
                                                  _jsx(Title, {
                                                      level: 4,
                                                      className: '!mb-0',
                                                      children: 'This Month',
                                                  }),
                                                  _jsxs(Text, {
                                                      children: [
                                                          attendanceSummary?.daysPresent,
                                                          '/',
                                                          attendanceSummary?.totalDays,
                                                          ' Days',
                                                      ],
                                                  }),
                                                  _jsxs(Text, {
                                                      className: 'text-sm',
                                                      children: [
                                                          attendanceSummary?.attendancePercentage ||
                                                              0,
                                                          '% Attendance',
                                                      ],
                                                  }),
                                              ],
                                          }),
                                      }),
                                  ],
                              }),
                          ],
                      }),
                _jsxs(Modal, {
                    title: 'Configure Office Hours',
                    open: officeHoursModal,
                    onCancel: () => setOfficeHoursModal(false),
                    footer: null,
                    width: 500,
                    children: [
                        _jsxs(Form, {
                            form: form,
                            layout: 'vertical',
                            onFinish: handleUpdateOfficeHours,
                            initialValues: {
                                startTime: officeHours.start,
                                endTime: officeHours.end,
                            },
                            children: [
                                _jsx(Form.Item, {
                                    label: 'Office Start Time',
                                    name: 'startTime',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select start time',
                                        },
                                    ],
                                    children: _jsx(TimePicker, {
                                        format: 'h:mm A',
                                        style: { width: '100%' },
                                        placeholder: 'Select start time',
                                    }),
                                }),
                                _jsx(Form.Item, {
                                    label: 'Office End Time',
                                    name: 'endTime',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select end time',
                                        },
                                    ],
                                    children: _jsx(TimePicker, {
                                        format: 'h:mm A',
                                        style: { width: '100%' },
                                        placeholder: 'Select end time',
                                    }),
                                }),
                                _jsxs('div', {
                                    className: 'flex justify-end gap-2',
                                    children: [
                                        _jsx(Button, {
                                            onClick: () =>
                                                setOfficeHoursModal(false),
                                            children: 'Cancel',
                                        }),
                                        _jsx(Button, {
                                            type: 'primary',
                                            htmlType: 'submit',
                                            loading:
                                                updateOfficeHoursMutation.isPending,
                                            children: 'Update Office Hours',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        _jsx('div', {
                            className: 'mt-4 p-3 bg-gray-50 rounded',
                            children: _jsxs(Text, {
                                className: 'text-sm',
                                children: [
                                    _jsx('strong', { children: 'Note:' }),
                                    ' Attendance can be marked from office start time until 10 minutes after start time. Leave can be marked 10 minutes before office end time until end time.',
                                ],
                            }),
                        }),
                    ],
                }),
            ],
        }),
    });
};
export default Attendance;
