import { Eye, EyeOff } from 'lucide-react';
import { BaseSyntheticEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignSlide from './SignInSlide';
import axios from 'axios';
import { login_user } from '@/helpers/local-storage';
import { Erp_context } from '@/provider/ErpContext';

const SignIn: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [warningMessage, setWarningMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_BASE_URL || '';
    const { setUser, set_workspace } = useContext(Erp_context);

    const onSubmitHandler = async (
        e: BaseSyntheticEvent<Event, EventTarget & HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email') as string | null;
        const password = formData.get('password') as string | null;

        // Validation logic
        if (!email || !password) {
            setWarningMessage('Email and password are required.');
            return;
        } else if (password.length < 6) {
            setWarningMessage('Password must be at least 6 characters long.');
            return;
        } else if (!email.includes('@') || !email.includes('.')) {
            setWarningMessage('Please enter a valid email address.');
            return;
        }

        const bodyData = {
            email,
            password,
        };
        setLoading(true);

        const fullUrl = `${baseURL}${'auth/sign-in'}`;
        // Make the Axios call
        try {
            const result = await axios.post(fullUrl, bodyData, {
                withCredentials: true,
            });
            const data = result.data.data;
            const { user, workspace } = data;
            if (
                user.is_active === false ||
                user.is_active === null ||
                user.is_active === undefined
            ) {
                login_user(data);
                setUser(user);
                set_workspace(workspace);
                navigate('/verify-user');
                setLoading(false);
                return;
            }
            if (user.role === 'supper_admin') {
                login_user(data);
                setUser(user);
                navigate('/admin/dashboard');
                setLoading(false);
                return;
            }
            if (user && workspace) {
                login_user(data);
                setUser(user);
                set_workspace(workspace);
                navigate('/dashboard');
            }
            if (!user || !workspace) {
                setWarningMessage('User or workspace not found.');
            }
            if (!workspace) {
                navigate('/workspace/sign-up');
            }
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setWarningMessage(
                error?.response?.data?.message || 'An error occurred.'
            );
        }
    };

    return (
        <div className="container-home">
            <section className="bg-white dark:bg-light-dark ">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative">
                        <SignSlide />

                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                        <div className="absolute bottom-8 left-8 z-10">
                            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                                <h3 className="text-4xl font-bold text-white">
                                    Welcome to BrightERP.
                                    <br className="hidden xl:block" />
                                    Sign in to manage your business with ease
                                    and efficiency.
                                </h3>
                                <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                                    <li className="flex items-center space-x-3">
                                        <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                            <svg
                                                className="w-3.5 h-3.5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-lg font-medium text-white">
                                            Integrated Business Management
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                            <svg
                                                className="w-3.5 h-3.5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-lg font-medium text-white">
                                            Real-Time Data Analytics
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                            <svg
                                                className="w-3.5 h-3.5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-lg font-medium text-white">
                                            Customizable Workflows
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                            <svg
                                                className="w-3.5 h-3.5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-lg font-medium text-white">
                                            Secure and Scalable
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center px-4 py-10 bg-white dark:bg-light-dark sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                            <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                                Sign in your account
                            </h2>
                            <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                                Don`t have an account?
                                <Link
                                    to="/workspace"
                                    title=""
                                    className="font-medium ml-2 text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700 dark:text-blue-400"
                                >
                                    Create your workspace
                                </Link>
                            </p>
                            <form
                                onSubmit={onSubmitHandler}
                                onChange={() => setWarningMessage('')}
                                action="#"
                                className="mt-8"
                            >
                                <div className="space-y-5">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="text-base font-medium text-gray-900 dark:text-white"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg
                                                    className="w-5 h-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Enter email to get started"
                                                className="block w-full py-4 pl-10 pr-4 text-black dark:text-white placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="text-base font-medium text-gray-900 dark:text-white"
                                        >
                                            Password
                                        </label>
                                        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg
                                                    className="w-5 h-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type={
                                                    passwordVisible
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                name="password"
                                                id="password"
                                                placeholder="Enter your password"
                                                className="block w-full py-4 pl-10 pr-4 text-black dark:text-white placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setPasswordVisible(
                                                            !passwordVisible
                                                        )
                                                    }
                                                    className="focus:outline-none"
                                                >
                                                    {passwordVisible ? (
                                                        <EyeOff className="w-5 h-5 opacity-50" />
                                                    ) : (
                                                        <Eye className="w-5 h-5 opacity-50" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {warningMessage && (
                                        <div className="text-red-500">
                                            {warningMessage}
                                        </div>
                                    )}
                                    <div>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"
                                        >
                                            {loading ? 'Loading' : 'Sign In'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="mt-5 text-sm text-gray-600 dark:text-white">
                                <p className="mb-1"> Forgot Password?</p>
                                <Link
                                    to="/forget-password"
                                    title=""
                                    className="text-blue-600 dark:text-blue-400 transition-all duration-200 hover:underline hover:text-blue-700 "
                                >
                                    Click here to reset your password
                                </Link>{' '}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignIn;
