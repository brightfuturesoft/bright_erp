'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { Result, Spin, Card } from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getBaseUrl } from '@/helpers/config/envConfig';
export default function VerifyAccountPage() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [verificationResult, setVerificationResult] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = params.id;
    useEffect(() => {
        const verifyAccount = async () => {
            if (!token) {
                setError('Invalid verification token');
                setLoading(false);
                return;
            }
            try {
                console.log('Starting verification process for token:', token);
                const response = await fetch(
                    `${getBaseUrl}/auth/verify-account`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token }),
                    }
                );
                const data = await response.json();
                console.log('Verification response:', data);
                if (response.ok && data.error === false) {
                    setVerificationResult(data);
                } else {
                    setError(data.message || 'Verification failed');
                }
            } catch (err) {
                console.error('Verification error:', err);
                setError(
                    'An error occurred during verification. Please try again.'
                );
            } finally {
                setLoading(false);
            }
        };
        verifyAccount();
    }, [token]);
    const handleRedirect = () => {
        navigate('/sign-in');
    };
    if (loading) {
        return _jsx('div', {
            className:
                'min-h-screen bg-gray-50 flex items-center justify-center p-4',
            children: _jsx(Card, {
                className: 'w-full max-w-md text-center',
                children: _jsxs('div', {
                    className: 'py-8',
                    children: [
                        _jsx(Spin, {
                            indicator: _jsx(LoadingOutlined, {
                                style: { fontSize: 48 },
                                spin: true,
                            }),
                            className: 'text-blue-500',
                        }),
                        _jsx('h2', {
                            className:
                                'text-xl font-semibold mt-4 text-gray-800',
                            children: 'Verifying your account...',
                        }),
                        _jsx('p', {
                            className: 'text-gray-600 mt-2',
                            children:
                                'Please wait while we verify your account.',
                        }),
                    ],
                }),
            }),
        });
    }
    return _jsx('div', {
        className:
            'min-h-screen bg-gray-50 flex items-center justify-center p-4',
        children: _jsx(Card, {
            className: 'w-full max-w-md',
            children:
                verificationResult?.error === false
                    ? _jsx(Result, {
                          icon: _jsx(CheckCircleOutlined, {
                              className: 'text-green-500',
                          }),
                          title: 'Account Verified Successfully!',
                          subTitle: `Welcome! Your account has been verified. You can now access all features.`,
                          extra: [
                              _jsx(
                                  'button',
                                  {
                                      onClick: handleRedirect,
                                      className:
                                          'bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors',
                                      children: 'Go to Login',
                                  },
                                  'login'
                              ),
                          ],
                      })
                    : _jsx(Result, {
                          icon: _jsx(CloseCircleOutlined, {
                              className: 'text-red-500',
                          }),
                          title: 'Verification Failed',
                          subTitle:
                              error ||
                              'The verification link is invalid or has expired.',
                          extra: [
                              _jsx(
                                  'button',
                                  {
                                      onClick: () => navigate('/'),
                                      className:
                                          'bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors',
                                      children: 'Go to Home',
                                  },
                                  'home'
                              ),
                          ],
                      }),
        }),
    });
}
