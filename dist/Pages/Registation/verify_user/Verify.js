'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useState } from 'react';
import { Button, Form, Card, Typography, message, Space } from 'antd';
import {
    MailOutlined,
    CheckCircleOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import { Erp_context } from '@/provider/ErpContext';
const { Title, Text } = Typography;
export default function VerifyUserPage() {
    const [form] = Form.useForm();
    const { user } = useContext(Erp_context);
    console.log(user, 'user');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [sentEmail, setSentEmail] = useState('');
    const handleSendVerification = async values => {
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
        return _jsx('div', {
            className:
                'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4',
            children: _jsx(Card, {
                className: 'w-full max-w-md shadow-lg',
                children: _jsxs('div', {
                    className: 'text-center space-y-4',
                    children: [
                        _jsx(CheckCircleOutlined, {
                            className: 'text-5xl text-green-500',
                        }),
                        _jsx(Title, {
                            level: 3,
                            className: 'text-gray-800',
                            children: 'Email Sent!',
                        }),
                        _jsx(Text, {
                            className: 'text-gray-600 block',
                            children: "We've sent a verification link to:",
                        }),
                        _jsx(Text, {
                            strong: true,
                            className: 'text-blue-600 block text-lg',
                            children: sentEmail,
                        }),
                        _jsx(Text, {
                            className: 'text-gray-500 block text-sm',
                            children:
                                'Please check your inbox and click the verification link to activate your account.',
                        }),
                        _jsxs(Space, {
                            direction: 'vertical',
                            className: 'w-full mt-6',
                            children: [
                                _jsx(Button, {
                                    type: 'primary',
                                    onClick: handleResendEmail,
                                    className: 'w-full',
                                    children: 'Send to Different Email',
                                }),
                                _jsx(Button, {
                                    type: 'link',
                                    onClick: () => (window.location.href = '/'),
                                    className: 'text-gray-500',
                                    children: 'Back to Home',
                                }),
                            ],
                        }),
                    ],
                }),
            }),
        });
    }
    return _jsx('div', {
        className:
            'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4',
        children: _jsxs(Card, {
            className: 'w-full max-w-md shadow-lg',
            children: [
                _jsxs('div', {
                    className: 'text-center mb-6',
                    children: [
                        _jsx(MailOutlined, {
                            className: 'text-4xl text-blue-500 mb-4',
                        }),
                        _jsx(Title, {
                            level: 2,
                            className: 'text-gray-800 mb-2',
                            children: 'Verify Your Account',
                        }),
                        _jsx(Text, {
                            className: 'text-gray-600',
                            children:
                                'Enter your email address to receive a verification link',
                        }),
                    ],
                }),
                _jsxs(Form, {
                    form: form,
                    layout: 'vertical',
                    onFinish: handleSendVerification,
                    className: 'space-y-4',
                    children: [
                        _jsx(Form.Item, {
                            name: 'email',
                            label: 'Email Address',
                            children: _jsx('p', {
                                className:
                                    'text-gray-600 border border-gray-300 p-2 rounded',
                                children: user?.email,
                            }),
                        }),
                        _jsx(Form.Item, {
                            className: 'mb-0',
                            children: _jsx(Button, {
                                type: 'primary',
                                htmlType: 'submit',
                                loading: loading,
                                icon: loading
                                    ? _jsx(LoadingOutlined, {})
                                    : _jsx(MailOutlined, {}),
                                size: 'large',
                                className:
                                    'w-full rounded-lg bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700',
                                children: loading
                                    ? 'Sending...'
                                    : 'Send Verification Email',
                            }),
                        }),
                    ],
                }),
                _jsx('div', {
                    className: 'text-center mt-6',
                    children: _jsxs(Text, {
                        className: 'text-gray-500 text-sm',
                        children: [
                            'Already verified?',
                            ' ',
                            _jsx('a', {
                                href: '/login',
                                className: 'text-blue-600 hover:text-blue-700',
                                children: 'Sign in here',
                            }),
                        ],
                    }),
                }),
            ],
        }),
    });
}
