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
    const [holdAction, setHoldAction] = useState<'attendance' | 'leave' | null>(
        null
    );
    const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

    // --- Dynamic Office Hours ---
    const [officeHours, setOfficeHours] = useState({
        start: dayjs().hour(14).minute(0),
        end: dayjs().hour(22).minute(0),
    });

    // --- Fetch Office Hours ---
    const { data: officeHoursData } = useQuery({
        queryKey: ['officeHours'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}hrm/attendance/office-hours`,
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

    React.useEffect(() => {
        if (officeHoursData?.officeHours) {
            setOfficeHours({
                start: dayjs(officeHoursData.officeHours.start, 'HH:mm'),
                end: dayjs(officeHoursData.officeHours.end, 'HH:mm'),
            });
        }
    }, [officeHoursData]);

    // ✅ Use backend-provided flags instead of frontend calculation
    const isAttendanceWindow =
        officeHoursData?.timeWindows?.attendance?.isActive ?? false;
    const isLeaveWindow =
        officeHoursData?.timeWindows?.leave?.isActive ?? false;

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
                    body: JSON.stringify({}),
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
        onError: (err: any) => {
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
                    body: JSON.stringify({}),
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
        onError: (err: any) => {
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
        mutationFn: async (newHours: {
            startTime: string;
            endTime: string;
        }) => {
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
        onError: (err: any) => {
            message.error(err.message || 'Failed to update office hours');
        },
    });

    const handleUpdateOfficeHours = (values: any) => {
        const startTime = values.startTime.format('HH:mm');
        const endTime = values.endTime.format('HH:mm');
        updateOfficeHoursMutation.mutate({ startTime, endTime });
    };

    // --- Press & Hold Logic ---
    const startHold = (action: 'attendance' | 'leave') => {
        setHoldAction(action);
        setHolding(true);
        setHoldProgress(0);

        holdTimerRef.current = setInterval(() => {
            setHoldProgress(prev => {
                if (prev >= 100) {
                    clearInterval(holdTimerRef.current!);
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
        if (holdProgress < 100) setHoldProgress(0);
        setHolding(false);
        setHoldAction(null);
    };

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Title
                        level={2}
                        className="!mb-0 dark:text-white"
                    >
                        Attendance Tracking
                    </Title>
                    <Button
                        type="default"
                        onClick={() => setOfficeHoursModal(true)}
                    >
                        Office Hours
                    </Button>
                </div>

                <Alert
                    message={`RULE: Office Time is ${officeHours.start.format(
                        'h:mm A'
                    )} to ${officeHours.end.format('h:mm A')}`}
                    type="info"
                    icon={<ClockCircleOutlined />}
                    className="mb-8 text-center"
                    style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        padding: '16px 24px',
                    }}
                />

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Attendance Progress */}
                            <Card>
                                <Space
                                    direction="vertical"
                                    size="large"
                                    className="w-full"
                                >
                                    <div className="flex items-center gap-3">
                                        <CheckCircleOutlined className="text-2xl text-green-600" />
                                        <Title
                                            level={4}
                                            className="!mb-0"
                                        >
                                            Attendance Progress
                                        </Title>
                                    </div>
                                    <Progress
                                        percent={
                                            holdAction === 'attendance'
                                                ? holdProgress
                                                : 0
                                        }
                                        status={
                                            isAttendanceWindow
                                                ? 'active'
                                                : 'exception'
                                        }
                                        strokeColor="#059669"
                                        strokeWidth={12}
                                        showInfo={true}
                                        format={percent => (
                                            <span className="dark:text-black text-black font-bold">
                                                {percent}%
                                            </span>
                                        )}
                                    />

                                    <Button
                                        type="primary"
                                        size="large"
                                        disabled={!isAttendanceWindow}
                                        onMouseDown={() =>
                                            startHold('attendance')
                                        }
                                        onMouseUp={stopHold}
                                        onMouseLeave={stopHold}
                                        onTouchStart={() =>
                                            startHold('attendance')
                                        }
                                        onTouchEnd={stopHold}
                                        className="w-full"
                                    >
                                        {isAttendanceWindow
                                            ? holding &&
                                              holdAction === 'attendance'
                                                ? 'Hold...'
                                                : 'Hold to Mark Attendance'
                                            : 'Disabled'}
                                    </Button>

                                    {/* ✅ Show note if Attendance button is disabled */}
                                    {!isAttendanceWindow && (
                                        <Text
                                            type="secondary"
                                            className="text-red-500 text-sm text-center dark:text-black"
                                        >
                                            Attendance time is finished
                                        </Text>
                                    )}
                                </Space>
                            </Card>

                            {/* Leave Progress */}
                            <Card>
                                <Space
                                    direction="vertical"
                                    size="large"
                                    className="w-full"
                                >
                                    <div className="flex items-center gap-3">
                                        <ExclamationCircleOutlined className="text-2xl text-yellow-600" />
                                        <Title
                                            level={4}
                                            className="!mb-0"
                                        >
                                            Leave Progress
                                        </Title>
                                    </div>
                                    <Progress
                                        percent={
                                            holdAction === 'leave'
                                                ? holdProgress
                                                : 0
                                        }
                                        status={
                                            isLeaveWindow
                                                ? 'active'
                                                : 'exception'
                                        }
                                        strokeColor="#d97706"
                                        strokeWidth={12}
                                        showInfo={true}
                                        format={percent => (
                                            <span className="dark:text-black text-black font-bold">
                                                {percent}%
                                            </span>
                                        )}
                                    />

                                    <Button
                                        type="primary"
                                        size="large"
                                        disabled={!isLeaveWindow}
                                        onMouseDown={() => startHold('leave')}
                                        onMouseUp={stopHold}
                                        onMouseLeave={stopHold}
                                        onTouchStart={() => startHold('leave')}
                                        onTouchEnd={stopHold}
                                        className="w-full dark:text-white"
                                        style={{
                                            backgroundColor: '#d97706',
                                            borderColor: '#d97706',
                                        }}
                                    >
                                        {isLeaveWindow
                                            ? holding && holdAction === 'leave'
                                                ? 'Hold...'
                                                : 'Hold to Mark Leave'
                                            : 'Disabled'}
                                    </Button>

                                    {/* ✅ Show note if Leave button is disabled */}
                                    {!isLeaveWindow && (
                                        <Text
                                            type="secondary"
                                            className="text-yellow-600 text-sm text-center dark:text-black"
                                        >
                                            Work hour is running. Before work
                                            hour completed leave button won't
                                            get active
                                        </Text>
                                    )}
                                </Space>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="text-center">
                                <Space
                                    direction="vertical"
                                    size="small"
                                >
                                    <ClockCircleOutlined className="text-3xl text-primary" />
                                    <Title
                                        level={4}
                                        className="!mb-0"
                                    >
                                        Today's Status
                                    </Title>
                                    <Text>
                                        {attendanceSummary?.todaysStatus ||
                                            'Not Marked Yet'}
                                    </Text>
                                </Space>
                            </Card>

                            <Card className="text-center">
                                <Space
                                    direction="vertical"
                                    size="small"
                                >
                                    <CalendarOutlined className="text-3xl text-secondary" />
                                    <Title
                                        level={4}
                                        className="!mb-0"
                                    >
                                        This Month
                                    </Title>
                                    <Text>
                                        {attendanceSummary?.daysPresent}/
                                        {attendanceSummary?.totalDays} Days
                                    </Text>
                                    <Text className="text-sm">
                                        {attendanceSummary?.attendancePercentage ||
                                            0}
                                        % Attendance
                                    </Text>
                                </Space>
                            </Card>
                        </div>
                    </>
                )}

                {/* Office Hours Configuration Modal */}
                <Modal
                    title="Configure Office Hours"
                    open={officeHoursModal}
                    onCancel={() => setOfficeHoursModal(false)}
                    footer={null}
                    width={500}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleUpdateOfficeHours}
                        initialValues={{
                            startTime: officeHours.start,
                            endTime: officeHours.end,
                        }}
                    >
                        <Form.Item
                            label="Office Start Time"
                            name="startTime"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select start time',
                                },
                            ]}
                        >
                            <TimePicker
                                format="h:mm A"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Office End Time"
                            name="endTime"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select end time',
                                },
                            ]}
                        >
                            <TimePicker
                                format="h:mm A"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>

                        <div className="flex justify-end gap-2">
                            <Button onClick={() => setOfficeHoursModal(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={updateOfficeHoursMutation.isPending}
                            >
                                Update Office Hours
                            </Button>
                        </div>
                    </Form>

                    <div className="mt-4 p-3 bg-gray-50 rounded">
                        <Text className="text-sm">
                            <strong>Note:</strong> Attendance will be counted
                            after 10 minutes of office hours started. Employees
                            are requested to come to office on time.
                        </Text>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Attendance;
