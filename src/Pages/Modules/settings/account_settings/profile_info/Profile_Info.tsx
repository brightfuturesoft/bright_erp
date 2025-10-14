import React, { Component } from 'react';
import { Erp_context } from '../../../../../provider/ErpContext';

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
        // Clean up theme observer
        if (this.themeObserver) {
            this.themeObserver.disconnect();
        }
        window.removeEventListener('storage', this.initializeThemeDetection);
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

    encryptCookie = (data: string): string => {
        // Simple base64 encoding as a replacement for CryptoJS
        return btoa(data);
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
                if (value && !/^\+?[\d\s\-$$$$]{10,}$/.test(value))
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
        // Always validate name and email as they are required
        errors.name = this.validateField('name', name);
        errors.email = this.validateField('email', email);
        // Only validate phone if it has a value
        if (phone) {
            errors.phone = this.validateField('phone', phone);
        }
        // Only validate avatar if a new file was selected
        if (avatarFile) {
            errors.avatar = this.validateAvatarFile(avatarFile);
        }

        // Remove empty error messages
        Object.keys(errors).forEach(key => {
            if (!errors[key]) delete errors[key];
        });

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

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock successful response
            const mockResponse = {
                ok: true,
                message: 'Profile updated successfully',
                data: {
                    user: {
                        ...ctx.user,
                        name: name.trim(),
                        email: email.trim(),
                        phone: phone.trim(),
                        avatar: avatarFile
                            ? URL.createObjectURL(avatarFile)
                            : ctx.user?.avatar,
                    },
                },
            };

            if (mockResponse.ok) {
                this.setState({
                    message:
                        mockResponse.message || 'Profile updated successfully',
                    messageType: 'success',
                    avatarFile: null,
                });

                if (this.state.avatarUrl && avatarFile)
                    URL.revokeObjectURL(this.state.avatarUrl);

                // Update context with fresh user data
                if (
                    mockResponse.data &&
                    mockResponse.data.user &&
                    ctx &&
                    ctx.setUser
                ) {
                    ctx.setUser(mockResponse.data.user);
                }

                // Update cookies with fresh user data
                if (mockResponse.data && mockResponse.data.user) {
                    const updatedUser = mockResponse.data.user;

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
                    className={`flex justify-center items-center h-40 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}
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
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random`;

        return (
            <div
                className={`min-h-screen p-3 sm:p-4 md:p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-6 md:mb-8">
                        <h1
                            className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                        >
                            Profile Information
                        </h1>
                        <p
                            className={`mt-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                            Manage your personal information and account
                            settings
                        </p>
                    </div>

                    {/* Status Message */}
                    {message && (
                        <div
                            className={`mb-4 md:mb-6 p-3 md:p-4 rounded-lg border-l-4 ${
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
                                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0"
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
                                <span className="text-sm sm:text-base">
                                    {message}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
                        {/* Profile Card */}
                        <div
                            className={`xl:col-span-1 order-1 xl:order-1 ${
                                isDarkMode
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-white border-gray-200'
                            } rounded-xl border shadow-sm`}
                        >
                            <div className="p-4 sm:p-6">
                                <div className="text-center">
                                    <div className="relative inline-block">
                                        <img
                                            src={
                                                profileImage ||
                                                '/placeholder.svg'
                                            }
                                            alt="User Avatar"
                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                            onError={e =>
                                                (e.currentTarget.src =
                                                    'https://via.placeholder.com/150?text=No+Image')
                                            }
                                        />
                                        {this.state.avatarFile && (
                                            <button
                                                onClick={this.clearAvatar}
                                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-lg"
                                                title="Remove selected image"
                                            >
                                                ×
                                            </button>
                                        )}
                                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white"></div>
                                    </div>
                                    <h3
                                        className={`mt-3 sm:mt-4 text-lg sm:text-xl font-semibold ${
                                            isDarkMode
                                                ? 'text-white'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        {user.name}
                                    </h3>
                                    <p
                                        className={`text-xs sm:text-sm break-all ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                                    >
                                        {user.email}
                                    </p>
                                    <div
                                        className={`mt-3 sm:mt-4 inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
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
                                <div className="mt-4 sm:mt-6">
                                    <label
                                        className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                    >
                                        Profile Picture
                                    </label>
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            className={`flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                                                errors.avatar
                                                    ? 'border-red-500'
                                                    : isDarkMode
                                                      ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50'
                                                      : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center justify-center pt-3 pb-3 sm:pt-5 sm:pb-6">
                                                <svg
                                                    className={`w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 ${
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
                                                    className={`mb-1 sm:mb-2 text-xs sm:text-sm ${
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
                                                    className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
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
                            className={`xl:col-span-2 order-2 xl:order-2 ${
                                isDarkMode
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-white border-gray-200'
                            } rounded-xl border shadow-sm`}
                        >
                            <div className="p-4 sm:p-6">
                                <h2
                                    className={`text-lg font-semibold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                                >
                                    Personal Information
                                </h2>

                                <div className="space-y-4 sm:space-y-6">
                                    {/* Name Field */}
                                    <div>
                                        <label
                                            className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
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
                                                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                                                    className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}
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
                                                    className="w-4 h-4 mr-1 flex-shrink-0"
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
                                            className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
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
                                                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                                                    className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}
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
                                                    className="w-4 h-4 mr-1 flex-shrink-0"
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
                                            className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
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
                                                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                                                    className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}
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
                                                    className="w-4 h-4 mr-1 flex-shrink-0"
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
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0">
                                    <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">
                                        <svg
                                            className="w-4 h-4 mr-2 flex-shrink-0"
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
                                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 order-1 sm:order-2">
                                        <button
                                            type="button"
                                            className={`w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
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
                                            className={`w-full sm:w-auto px-4 sm:px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center ${
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
