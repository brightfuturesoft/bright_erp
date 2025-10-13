import { Lock, KeyRound, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBaseUrl } from '@/helpers/config/envConfig';

export default function Change_Password() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [warningMessage, setWarningMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // New states to toggle password visibility
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setWarningMessage(null);
        setSuccessMessage(null);

        if (!email || !currentPassword || !newPassword || !confirmPassword) {
            setWarningMessage('All fields are required.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setWarningMessage(
                'New password and confirm password do not match.'
            );
            return;
        }
        if (newPassword.length < 6) {
            setWarningMessage('Password must be at least 6 characters long.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(
                `${getBaseUrl}/settings/account/change-password`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        email,
                        current_password: currentPassword,
                        new_password: newPassword,
                    }),
                }
            );

            const data = await response.json();
            if (response.ok && !data.error) {
                setSuccessMessage('Password updated successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                setWarningMessage(data.message || 'Failed to change password.');
            }
        } catch (err) {
            console.error(err);
            setWarningMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-home">
            <section>
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
                        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                            Change Password
                        </h1>
                        <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                            Keep your account secure by updating your password
                        </p>

                        <form
                            onSubmit={onSubmitHandler}
                            className="mt-8 space-y-6"
                        >
                            {/* Email */}
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full pl-3 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Current Password */}
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type={
                                        showCurrentPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    placeholder="Current Password"
                                    value={currentPassword}
                                    onChange={e =>
                                        setCurrentPassword(e.target.value)
                                    }
                                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                />
                                <span
                                    onClick={() =>
                                        setShowCurrentPassword(
                                            !showCurrentPassword
                                        )
                                    }
                                    className="absolute right-3 top-3.5 cursor-pointer text-gray-400"
                                >
                                    {showCurrentPassword ? <EyeOff /> : <Eye />}
                                </span>
                            </div>

                            {/* New Password */}
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={e =>
                                        setNewPassword(e.target.value)
                                    }
                                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                />
                                <span
                                    onClick={() =>
                                        setShowNewPassword(!showNewPassword)
                                    }
                                    className="absolute right-3 top-3.5 cursor-pointer text-gray-400"
                                >
                                    {showNewPassword ? <EyeOff /> : <Eye />}
                                </span>
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                <input
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    placeholder="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={e =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                />
                                <span
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-3 top-3.5 cursor-pointer text-gray-400"
                                >
                                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                                </span>
                            </div>

                            {/* Warning / Success Messages */}
                            {warningMessage && (
                                <p className="text-red-500 text-sm text-center">
                                    {warningMessage}
                                </p>
                            )}
                            {successMessage && (
                                <p className="text-green-500 text-sm text-center">
                                    {successMessage}
                                </p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50"
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
