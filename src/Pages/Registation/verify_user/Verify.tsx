'use client';

import { useContext, useState } from 'react';
import { Button, Form, Input, Card, Typography, message, Space } from 'antd';
import {
    MailOutlined,
    CheckCircleOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import { Erp_context } from '@/provider/ErpContext';

const { Title, Text } = Typography;

interface VerificationForm {
    email: string;
}

export default function VerifyUserPage() {
    const [form] = Form.useForm();
    const { user } = useContext(Erp_context);

    console.log(user, 'user');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [sentEmail, setSentEmail] = useState('');

    const handleSendVerification = async (values: VerificationForm) => {
        setLoading(true);

        try {
            const response = await fetch(
                'https://server.orybiz.com/api/send-verification',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: user?.email }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setEmailSent(true);
                setSentEmail(user?.email);
                message.success('Verification email sent successfully!');
                form.resetFields();
            } else {
                message.error(
                    data.message || 'Failed to send verification email'
                );
            }
        } catch (error) {
            console.error('Error sending verification email:', error);
            message.error(
                'An error occurred while sending the verification email'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResendEmail = () => {
        setEmailSent(false);
        setSentEmail('');
        form.setFieldsValue({ email: sentEmail });
    };

    if (emailSent) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-lg">
                    <div className="text-center space-y-4">
                        <CheckCircleOutlined className="text-5xl text-green-500" />
                        <Title
                            level={3}
                            className="text-gray-800"
                        >
                            Email Sent!
                        </Title>
                        <Text className="text-gray-600 block">
                            We've sent a verification link to:
                        </Text>
                        <Text
                            strong
                            className="text-blue-600 block text-lg"
                        >
                            {sentEmail}
                        </Text>
                        <Text className="text-gray-500 block text-sm">
                            Please check your inbox and click the verification
                            link to activate your account.
                        </Text>
                        <Space
                            direction="vertical"
                            className="w-full mt-6"
                        >
                            <Button
                                type="primary"
                                onClick={handleResendEmail}
                                className="w-full"
                            >
                                Send to Different Email
                            </Button>
                            <Button
                                type="link"
                                onClick={() => (window.location.href = '/')}
                                className="text-gray-500"
                            >
                                Back to Home
                            </Button>
                        </Space>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-lg">
                <div className="text-center mb-6">
                    <MailOutlined className="text-4xl text-blue-500 mb-4" />
                    <Title
                        level={2}
                        className="text-gray-800 mb-2"
                    >
                        Verify Your Account
                    </Title>
                    <Text className="text-gray-600">
                        Enter your email address to receive a verification link
                    </Text>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSendVerification}
                    className="space-y-4"
                >
                    <Form.Item
                        name="email"
                        label="Email Address"
                    >
                        {/* <Input
                                          prefix={<MailOutlined className="text-gray-400" />}
                                          placeholder="Enter your email address"
                                          size="large"
                                          defaultValue={user?.email}
                                          className="rounded-lg"
                                    /> */}
                        <p className="text-gray-600 border border-gray-300 p-2 rounded">
                            {user?.email}
                        </p>
                    </Form.Item>

                    <Form.Item className="mb-0">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            icon={
                                loading ? <LoadingOutlined /> : <MailOutlined />
                            }
                            size="large"
                            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
                        >
                            {loading ? 'Sending...' : 'Send Verification Email'}
                        </Button>
                    </Form.Item>
                </Form>

                <div className="text-center mt-6">
                    <Text className="text-gray-500 text-sm">
                        Already verified?{' '}
                        <a
                            href="/sign-in"
                            className="text-blue-600 hover:text-blue-700"
                        >
                            Sign in here
                        </a>
                    </Text>
                </div>
            </Card>
        </div>
    );
}
