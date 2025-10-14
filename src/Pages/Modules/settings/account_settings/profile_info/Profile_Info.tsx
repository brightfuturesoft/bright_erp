import React, { Component } from 'react';
import { Erp_context } from '../../../../../provider/ErpContext';
import { getBaseUrl } from '@/helpers/config/envConfig';
import CryptoJS from 'crypto-js';

type Props = {};
type State = {
    name: string;
    email: string;
    phone: string;
    avatarUrl: string;
    avatarFile: File | null;
    loading: boolean;
    message: string;
    messageType: 'success' | 'error' | '';
    errors: {
        name?: string;
        email?: string;
        phone?: string;
        avatar?: string;
    };
    isDarkMode: boolean;
};

export default class Profile_Info extends Component<Props, State> {
    static contextType = Erp_context;
    declare context: React.ContextType<typeof Erp_context>;
    private fileInputRef = React.createRef<HTMLInputElement>();

    state: State = {
        name: '',
        email: '',
        phone: '',
        avatarUrl: '',
        avatarFile: null,
        loading: false,
        message: '',
        messageType: '',
        errors: {},
        isDarkMode: localStorage.getItem('theme') === 'dark',
    };

    private themeObserver?: MutationObserver;

    componentDidMount() {
        this.syncWithContext();
        this.initializeThemeDetection();
    }

    initializeThemeDetection = () => {
        // Listen for theme changes
        const handleThemeChange = () => {
            this.setState({
                isDarkMode: localStorage.getItem('theme') === 'dark',
            });
        };

        window.addEventListener('storage', handleThemeChange);

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

    componentDidUpdate(prevProps: Props, prevState: State) {
        const prevUser = prevState.email;
        const currentUser = this.context?.user?.email;

        // Only re-sync when user data actually changes
        if (currentUser && currentUser !== prevUser) {
            this.syncWithContext();
        }
    }

    componentWillUnmount() {
        if (this.state.avatarUrl && this.state.avatarFile) {
            URL.revokeObjectURL(this.state.avatarUrl);
        }
    }

    // Sync local state with context user data
    syncWithContext = () => {
        const ctx = this.context;
        if (ctx?.user) {
            const { user } = ctx;

            this.setState(prev => {
                if (
                    prev.name === (user.name || '') &&
                    prev.email === (user.email || '') &&
                    prev.phone === (user.phone || '') &&
                    prev.avatarUrl ===
                        (user.avatar || user.profile_image_url || '')
                ) {
                    return null; // No change → prevent infinite loop
                }
                return {
                    name: user.name || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    avatarUrl: user.avatar || user.profile_image_url || '',
                };
            });
        }
    };

    // Encrypt cookie data (same as used in ErpContext)
    encryptCookie = (data: string): string => {
        const SECRET_KEY = 'Bright_ERP';
        return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    };

    validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2)
                    return 'Name must be at least 2 characters';
                return '';
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return 'Please enter a valid email address';
                return '';
            case 'phone':
                if (value && !/^\+?[\d\s\-\(\)]{10,}$/.test(value))
                    return 'Please enter a valid phone number';
                return '';
            default:
                return '';
        }
    };

    validateAvatarFile = (file: File): string => {
        const maxSize = 5 * 1024 * 1024;
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
        ];
        if (!allowedTypes.includes(file.type))
            return 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)';
        if (file.size > maxSize) return 'Image size must be less than 5MB';
        return '';
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (['name', 'email', 'phone'].includes(name)) {
            const error = this.validateField(name, value);
            this.setState(prev => ({
                ...prev,
                [name]: value,
                errors: { ...prev.errors, [name]: error },
            }));
        }
    };

    handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const error = this.validateAvatarFile(file);
            if (error) {
                this.setState(prev => ({
                    errors: { ...prev.errors, avatar: error },
                }));
                return;
            }
            this.setState(prev => ({
                avatarFile: file,
                avatarUrl: URL.createObjectURL(file),
                errors: { ...prev.errors, avatar: '' },
            }));
        }
    };

    clearAvatar = () => {
        if (this.state.avatarUrl && this.state.avatarFile)
            URL.revokeObjectURL(this.state.avatarUrl);
        this.setState(prev => ({
            avatarFile: null,
            avatarUrl:
                this.context?.user?.avatar ||
                this.context?.user?.profile_image_url ||
                '',
            errors: { ...prev.errors, avatar: '' },
        }));
        if (this.fileInputRef.current) this.fileInputRef.current.value = '';
    };

    updateProfile = async () => {
        const { name, email, phone, avatarFile } = this.state;
        const ctx = this.context;
        const userId = ctx?.user?.id || ctx?.user?._id;

        if (!userId) {
            this.setState({ message: 'User not found.', messageType: 'error' });
            return;
        }

        const errors: any = {};
        if (name !== ctx.user?.name)
            errors.name = this.validateField('name', name);
        if (email !== ctx.user?.email)
            errors.email = this.validateField('email', email);
        if (phone !== ctx.user?.phone)
            errors.phone = this.validateField('phone', phone);
        if (avatarFile) errors.avatar = this.validateAvatarFile(avatarFile);

        this.setState({ errors });
        if (Object.values(errors).some(e => e)) {
            this.setState({
                message: 'Please fix the errors above',
                messageType: 'error',
            });
            return;
        }

        try {
            this.setState({ loading: true, message: '', messageType: '' });

            const formData = new FormData();
            formData.append('user_id', userId);
            if (name !== ctx.user?.name) formData.append('name', name.trim());
            if (email !== ctx.user?.email)
                formData.append('email', email.trim());
            if (phone !== ctx.user?.phone)
                formData.append('phone', phone.trim());
            if (avatarFile) formData.append('image', avatarFile);

            const response = await fetch(
                `${getBaseUrl}/settings/account/update-profile`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    body: formData,
                }
            );
            const data = await response.json();

            if (response.ok) {
                this.setState({
                    message: data.message || 'Profile updated successfully',
                    messageType: 'success',
                    avatarFile: null,
                });

                if (this.state.avatarUrl && avatarFile)
                    URL.revokeObjectURL(this.state.avatarUrl);

                // Update context with fresh user data from backend
                if (data.data && data.data.user && ctx && ctx.setUser) {
                    ctx.setUser(data.data.user);
                }

                // Update cookies with fresh user data to persist across page refreshes
                if (data.data && data.data.user) {
                    const updatedUser = data.data.user;

                    // Update the erp_user cookie with fresh data
                    const encryptedUser = this.encryptCookie(
                        JSON.stringify(updatedUser)
                    );
                    document.cookie = `erp_user=${encryptedUser}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days

                    this.setState({
                        name: updatedUser.name || '',
                        email: updatedUser.email || '',
                        phone: updatedUser.phone || '',
                        avatarUrl:
                            updatedUser.avatar ||
                            updatedUser.profile_image_url ||
                            '',
                    });
                }
            } else {
                this.setState({
                    message: data.message || 'Failed to update profile',
                    messageType: 'error',
                });
            }
        } catch (err) {
            console.error('Profile update error:', err);
            this.setState({
                message: 'Error updating profile. Please try again.',
                messageType: 'error',
            });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const {
            name,
            email,
            phone,
            avatarUrl,
            loading,
            message,
            messageType,
            errors,
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
                    <div className="text-center">
                        <div className="text-xl font-semibold mb-2">
                            Context Error
                        </div>
                        <p>
                            No context found. Did you wrap your app with
                            ErpProvider?
                        </p>
                    </div>
                </div>
            );
        }

        const { user, user_loading } = ctx;

        if (user_loading) {
            return (
                <div className="flex items-center justify-center h-40">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
                        <p
                            className={
                                isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }
                        >
                            Loading profile...
                        </p>
                    </div>
                </div>
            );
        }

        if (!user) {
            return (
                <div className="flex items-center justify-center h-40">
                    <div className="text-center">
                        <div className="text-xl font-semibold mb-2 text-red-500">
                            No User Found
                        </div>
                        <p
                            className={
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }
                        >
                            Please log in to view your profile.
                        </p>
                    </div>
                </div>
            );
        }

        const profileImage =
            avatarUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name || 'User'
            )}&background=random`;

        return (
            <div
                className={`min-h-screen p-6 ${
                    isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                }`}
            >
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1
                            className={`text-3xl font-bold ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                        >
                            Profile Information
                        </h1>
                        <p
                            className={`mt-2 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                        >
                            Manage your personal information and account
                            settings
                        </p>
                    </div>

                    {/* Status Message */}
                    {message && (
                        <div
                            className={`mb-6 p-4 rounded-lg border-l-4 ${
                                messageType === 'success'
                                    ? isDarkMode
                                        ? 'bg-green-900/20 border-green-500 text-green-300'
                                        : 'bg-green-50 border-green-500 text-green-700'
                                    : isDarkMode
                                      ? 'bg-red-900/20 border-red-500 text-red-300'
                                      : 'bg-red-50 border-red-500 text-red-700'
                            }`}
                        >
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    {messageType === 'success' ? (
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
                                {message}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div
                            className={`lg:col-span-1 ${
                                isDarkMode
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-white border-gray-200'
                            } rounded-xl border shadow-sm`}
                        >
                            <div className="p-6">
                                <div className="text-center">
                                    <div className="relative inline-block">
                                        <img
                                            src={profileImage}
                                            alt="User Avatar"
                                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                            onError={e =>
                                                (e.currentTarget.src =
                                                    'https://via.placeholder.com/150?text=No+Image')
                                            }
                                        />
                                        {this.state.avatarFile && (
                                            <button
                                                onClick={this.clearAvatar}
                                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-lg"
                                                title="Remove selected image"
                                            >
                                                ×
                                            </button>
                                        )}
                                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                                    </div>
                                    <h3
                                        className={`mt-4 text-xl font-semibold ${
                                            isDarkMode
                                                ? 'text-white'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        {user.name}
                                    </h3>
                                    <p
                                        className={`text-sm ${
                                            isDarkMode
                                                ? 'text-gray-400'
                                                : 'text-gray-600'
                                        }`}
                                    >
                                        {user.email}
                                    </p>
                                    <div
                                        className={`mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                            isDarkMode
                                                ? 'bg-green-900/30 text-green-300'
                                                : 'bg-green-100 text-green-800'
                                        }`}
                                    >
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        Active
                                    </div>
                                </div>

                                {/* Avatar Upload */}
                                <div className="mt-6">
                                    <label
                                        className={`block text-sm font-medium mb-2 ${
                                            isDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        Profile Picture
                                    </label>
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                                                errors.avatar
                                                    ? 'border-red-500'
                                                    : isDarkMode
                                                      ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50'
                                                      : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    className={`w-8 h-8 mb-2 ${
                                                        isDarkMode
                                                            ? 'text-gray-400'
                                                            : 'text-gray-500'
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    />
                                                </svg>
                                                <p
                                                    className={`mb-2 text-sm ${
                                                        isDarkMode
                                                            ? 'text-gray-400'
                                                            : 'text-gray-500'
                                                    }`}
                                                >
                                                    <span className="font-semibold">
                                                        Click to upload
                                                    </span>
                                                </p>
                                                <p
                                                    className={`text-xs ${
                                                        isDarkMode
                                                            ? 'text-gray-500'
                                                            : 'text-gray-400'
                                                    }`}
                                                >
                                                    PNG, JPG or GIF (MAX. 5MB)
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={this.fileInputRef}
                                                onChange={
                                                    this.handleAvatarChange
                                                }
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    {errors.avatar && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.avatar}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div
                            className={`lg:col-span-2 ${
                                isDarkMode
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-white border-gray-200'
                            } rounded-xl border shadow-sm`}
                        >
                            <div className="p-6">
                                <h2
                                    className={`text-lg font-semibold mb-6 ${
                                        isDarkMode
                                            ? 'text-white'
                                            : 'text-gray-900'
                                    }`}
                                >
                                    Personal Information
                                </h2>

                                <div className="space-y-6">
                                    {/* Name Field */}
                                    <div>
                                        <label
                                            className={`block text-sm font-medium mb-2 ${
                                                isDarkMode
                                                    ? 'text-gray-200'
                                                    : 'text-gray-700'
                                            }`}
                                        >
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="name"
                                                value={name}
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
                                                    errors.name
                                                        ? 'border-red-500'
                                                        : isDarkMode
                                                          ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400'
                                                          : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                                                }`}
                                                placeholder="Enter your full name"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <svg
                                                    className={`w-5 h-5 ${
                                                        isDarkMode
                                                            ? 'text-gray-400'
                                                            : 'text-gray-400'
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-1"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label
                                            className={`block text-sm font-medium mb-2 ${
                                                isDarkMode
                                                    ? 'text-gray-200'
                                                    : 'text-gray-700'
                                            }`}
                                        >
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                    errors.email
                                                        ? 'border-red-500'
                                                        : isDarkMode
                                                          ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400'
                                                          : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                                                }`}
                                                placeholder="Enter your email address"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <svg
                                                    className={`w-5 h-5 ${
                                                        isDarkMode
                                                            ? 'text-gray-400'
                                                            : 'text-gray-400'
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
                                            </div>
                                        </div>
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-1"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div>
                                        <label
                                            className={`block text-sm font-medium mb-2 ${
                                                isDarkMode
                                                    ? 'text-gray-200'
                                                    : 'text-gray-700'
                                            }`}
                                        >
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="phone"
                                                value={phone}
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                    errors.phone
                                                        ? 'border-red-500'
                                                        : isDarkMode
                                                          ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400'
                                                          : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                                                }`}
                                                placeholder="Enter your phone number"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <svg
                                                    className={`w-5 h-5 ${
                                                        isDarkMode
                                                            ? 'text-gray-400'
                                                            : 'text-gray-400'
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-1"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
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
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Changes will be saved automatically
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            type="button"
                                            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                                                isDarkMode
                                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={this.updateProfile}
                                            disabled={loading}
                                            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${
                                                loading
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
                                            } text-white`}
                                        >
                                            {loading ? (
                                                <>
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
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
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
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    Update Profile
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
