'use client';

import { useEffect, useState } from 'react';
import { Result, Spin, Card } from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getBaseUrl } from '@/helpers/config/envConfig';

interface VerificationResponse {
    error: false;
    message: string;
    request_id: number;
    status_code: number;
}

export default function VerifyAccountPage() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [verificationResult, setVerificationResult] =
        useState<VerificationResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

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

                const data: VerificationResponse = await response.json();
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
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md text-center">
                    <div className="py-8">
                        <Spin
                            indicator={
                                <LoadingOutlined
                                    style={{ fontSize: 48 }}
                                    spin
                                />
                            }
                            className="text-blue-500"
                        />
                        <h2 className="text-xl font-semibold mt-4 text-gray-800">
                            Verifying your account...
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Please wait while we verify your account.
                        </p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                {verificationResult?.error === false ? (
                    <Result
                        icon={
                            <CheckCircleOutlined className="text-green-500" />
                        }
                        title="Account Verified Successfully!"
                        subTitle={`Welcome! Your account has been verified. You can now access all features.`}
                        extra={[
                            <button
                                key="login"
                                onClick={handleRedirect}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                            >
                                Go to Login
                            </button>,
                        ]}
                    />
                ) : (
                    <Result
                        icon={<CloseCircleOutlined className="text-red-500" />}
                        title="Verification Failed"
                        subTitle={
                            error ||
                            'The verification link is invalid or has expired.'
                        }
                        extra={[
                            <button
                                key="home"
                                onClick={() => navigate('/')}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                            >
                                Go to Home
                            </button>,
                        ]}
                    />
                )}
            </Card>
        </div>
    );
}
