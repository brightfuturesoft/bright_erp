import React, { Component } from 'react';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { Erp_context } from '../../../../../provider/ErpContext';

type Props = {};
type State = {
    twoFAEnabled: boolean;
    pending2FA: boolean;
    token: string;
    message: string;
    loading: boolean;
    isDarkMode: boolean;
};

export default class Security extends Component<Props, State> {
    static contextType = Erp_context;
    declare context: React.ContextType<typeof Erp_context>;

    state: State = {
        twoFAEnabled: false,
        pending2FA: false,
        token: '',
        message: '',
        loading: false,
        isDarkMode: localStorage.getItem('theme') === 'dark',
    };

    private themeObserver?: MutationObserver;

    componentDidMount() {
        const { user, user_loading } = this.context || {};
        if (!user_loading && user) {
            this.check2FAStatus();
        }
        this.initializeThemeDetection();
    }

    componentWillUnmount() {
        if (this.themeObserver) {
            this.themeObserver.disconnect();
        }
        window.removeEventListener('storage', this.handleThemeChange);
    }

    initializeThemeDetection = () => {
        // Listen for theme changes
        window.addEventListener('storage', this.handleThemeChange);

        this.themeObserver = new MutationObserver(() => {
            this.setState({
                isDarkMode: document.documentElement.classList.contains('dark'),
            });
        });

        this.themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
    };

    handleThemeChange = () => {
        this.setState({ isDarkMode: localStorage.getItem('theme') === 'dark' });
    };

    getUserId = () => {
        const user = this.context?.user;
        return user?.id || user?._id || null;
    };

    check2FAStatus = async () => {
        const userId = this.getUserId();
        if (!userId) {
            this.setState({ message: 'User not found. Please login first.' });
            return;
        }

        try {
            const response = await fetch(
                `${getBaseUrl}/settings/account/2fa/status?user_id=${userId}`,
                {
                    method: 'GET',
                    credentials: 'include',
                }
            );
            const data = await response.json();

            if (response.ok) {
                this.setState({
                    twoFAEnabled: data?.data?.twoFAEnabled || false,
                    pending2FA: false,
                    message: '',
                });
            } else {
                this.setState({
                    message: data.message || 'Failed to fetch 2FA status',
                });
            }
        } catch (err) {
            console.error(err);
            this.setState({ message: 'Error fetching 2FA status' });
        }
    };

    toggle2FA = async () => {
        const { twoFAEnabled } = this.state;
        if (twoFAEnabled) {
            await this.disable2FA();
        } else {
            await this.enable2FA();
        }
    };

    enable2FA = async () => {
        const userId = this.getUserId();
        if (!userId) {
            this.setState({ message: 'User not found. Please login first.' });
            return;
        }

        try {
            this.setState({ loading: true, message: '' });
            const response = await fetch(
                `${getBaseUrl}/settings/account/2fa/enable`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ user_id: userId }),
                }
            );
            const data = await response.json();

            if (response.ok) {
                this.setState({
                    pending2FA: true, // wait for OTP verification
                    message: data.message || 'OTP sent to your email',
                    token: '',
                });
            } else {
                this.setState({
                    message: data.message || 'Failed to enable 2FA',
                });
            }
        } catch (err) {
            this.setState({ message: 'Error enabling 2FA' });
        } finally {
            this.setState({ loading: false });
        }
    };

    disable2FA = async () => {
        const userId = this.getUserId();
        if (!userId) {
            this.setState({ message: 'User not found. Please login first.' });
            return;
        }

        try {
            this.setState({ loading: true, message: '' });
            const response = await fetch(
                `${getBaseUrl}/settings/account/2fa/disable`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ user_id: userId }),
                }
            );
            const data = await response.json();

            if (response.ok) {
                this.setState({
                    twoFAEnabled: false,
                    pending2FA: false,
                    token: '',
                    message: data.message || '2FA disabled successfully',
                });
            } else {
                this.setState({
                    message: data.message || 'Failed to disable 2FA',
                });
            }
        } catch (err) {
            this.setState({ message: 'Error disabling 2FA' });
        } finally {
            this.setState({ loading: false });
        }
    };

    verify2FA = async () => {
        const userId = this.getUserId();
        const { token } = this.state;

        if (!userId) {
            this.setState({ message: 'User not found. Please login first.' });
            return;
        }

        try {
            this.setState({ loading: true, message: '' });
            const response = await fetch(
                `${getBaseUrl}/settings/account/2fa/verify`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ user_id: userId, token }),
                }
            );
            const data = await response.json();

            if (response.ok) {
                this.setState({
                    twoFAEnabled: true,
                    pending2FA: false,
                    message: data.message || '2FA verified successfully',
                    token: '',
                });
            } else {
                this.setState({ message: data.message || 'Invalid OTP' });
            }
        } catch (err) {
            this.setState({ message: 'Error verifying 2FA' });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const {
            twoFAEnabled,
            pending2FA,
            token,
            message,
            loading,
            isDarkMode,
        } = this.state;
        const ctx = this.context;

        if (!ctx) {
            return (
                <div
                    className={`flex justify-center items-center h-40 ${
                        isDarkMode ? 'text-red-400' : 'text-red-600'
                    }`}
                >
                    Error: No context found. Did you wrap with Erp_Provider?
                </div>
            );
        }

        if (ctx.user_loading) {
            return (
                <div className="flex items-center justify-center h-40">
                    <p
                        className={`animate-pulse ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}
                    >
                        Loading user info...
                    </p>
                </div>
            );
        }

        return (
            <div
                className={`min-h-screen flex items-center justify-center p-4 ${
                    isDarkMode
                        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                        : 'bg-gradient-to-br from-gray-100 via-white to-gray-50'
                }`}
            >
                <div
                    className={`rounded-2xl shadow-2xl p-8 max-w-md w-full transition-all duration-300 ${
                        isDarkMode
                            ? 'bg-gray-800 border border-gray-700 shadow-gray-900/50'
                            : 'bg-white shadow-gray-200/50'
                    }`}
                >
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div
                            className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                                isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                            }`}
                        >
                            <svg
                                className={`w-8 h-8 ${
                                    isDarkMode
                                        ? 'text-blue-400'
                                        : 'text-blue-600'
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h2
                            className={`text-2xl font-bold mb-2 ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                            }`}
                        >
                            Two-Factor Authentication
                        </h2>
                        <p
                            className={`text-sm leading-relaxed ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}
                        >
                            Enhance your account security by enabling two-factor
                            authentication (2FA).
                        </p>
                    </div>

                    {/* Status Message */}
                    {message && (
                        <div
                            className={`mb-6 p-4 rounded-lg border-l-4 ${
                                message.includes('successfully') ||
                                message.includes('sent')
                                    ? isDarkMode
                                        ? 'bg-green-900/30 border-green-500 text-green-300'
                                        : 'bg-green-50 border-green-500 text-green-700'
                                    : isDarkMode
                                      ? 'bg-red-900/30 border-red-500 text-red-300'
                                      : 'bg-red-50 border-red-500 text-red-700'
                            }`}
                        >
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    {message.includes('successfully') ||
                                    message.includes('sent') ? (
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    ) : (
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    )}
                                </svg>
                                <span className="text-sm font-medium">
                                    {message}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* 2FA Toggle Section */}
                    <div
                        className={`p-4 rounded-lg mb-6 ${
                            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div
                                    className={`w-3 h-3 rounded-full mr-3 ${
                                        twoFAEnabled
                                            ? 'bg-green-500'
                                            : pending2FA
                                              ? 'bg-yellow-500'
                                              : 'bg-gray-400'
                                    }`}
                                ></div>
                                <div>
                                    <span
                                        className={`font-medium ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        2FA Status
                                    </span>
                                    <p
                                        className={`text-xs ${
                                            isDarkMode
                                                ? 'text-gray-400'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        {twoFAEnabled
                                            ? 'Enabled'
                                            : pending2FA
                                              ? 'Pending Verification'
                                              : 'Disabled'}
                                    </p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={twoFAEnabled || pending2FA}
                                    onChange={this.toggle2FA}
                                    disabled={loading}
                                />
                                <div
                                    className={`w-11 h-6 rounded-full peer transition-all duration-300 ${
                                        isDarkMode
                                            ? 'bg-gray-600 peer-checked:bg-blue-600'
                                            : 'bg-gray-200 peer-checked:bg-blue-600'
                                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                ></div>
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform duration-300 shadow-sm"></div>
                            </label>
                        </div>
                    </div>

                    {/* OTP Verification Section */}
                    {pending2FA && !twoFAEnabled && (
                        <div
                            className={`p-4 rounded-lg mb-6 border-2 border-dashed ${
                                isDarkMode
                                    ? 'border-blue-500/30 bg-blue-900/10'
                                    : 'border-blue-300 bg-blue-50/50'
                            }`}
                        >
                            <div className="flex items-center mb-3">
                                <svg
                                    className={`w-5 h-5 mr-2 ${
                                        isDarkMode
                                            ? 'text-blue-400'
                                            : 'text-blue-600'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <span
                                    className={`text-sm font-medium ${
                                        isDarkMode
                                            ? 'text-blue-300'
                                            : 'text-blue-700'
                                    }`}
                                >
                                    Verification Required
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter OTP from email"
                                    value={token}
                                    onChange={e =>
                                        this.setState({ token: e.target.value })
                                    }
                                    className={`flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                        isDarkMode
                                            ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400'
                                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                                    }`}
                                />
                                <button
                                    onClick={this.verify2FA}
                                    disabled={loading || !token.trim()}
                                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                        loading || !token.trim()
                                            ? isDarkMode
                                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
                                    }`}
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Verifying...
                                        </div>
                                    ) : (
                                        'Verify'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Refresh Button */}
                    <button
                        onClick={this.check2FAStatus}
                        disabled={loading}
                        className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                            loading
                                ? isDarkMode
                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : isDarkMode
                                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                        } hover:shadow-md`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Refreshing...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                Refresh Status
                            </div>
                        )}
                    </button>

                    {/* Security Tips */}
                    <div
                        className={`mt-6 p-4 rounded-lg ${
                            isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'
                        }`}
                    >
                        <div className="flex items-start">
                            <svg
                                className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${
                                    isDarkMode
                                        ? 'text-yellow-400'
                                        : 'text-yellow-600'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div>
                                <h4
                                    className={`text-sm font-medium mb-1 ${
                                        isDarkMode
                                            ? 'text-yellow-300'
                                            : 'text-yellow-800'
                                    }`}
                                >
                                    Security Tip
                                </h4>
                                <p
                                    className={`text-xs leading-relaxed ${
                                        isDarkMode
                                            ? 'text-gray-300'
                                            : 'text-gray-600'
                                    }`}
                                >
                                    Keep your email secure as it's used for 2FA
                                    verification. Never share your OTP codes
                                    with anyone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
