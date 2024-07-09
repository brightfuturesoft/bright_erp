import { Eye, EyeOff } from 'lucide-react';
import { BaseSyntheticEvent, useState } from 'react';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [warning, setWarning] = useState('');

    const onSubmitHandler = async (
        e: BaseSyntheticEvent<Event, EventTarget & HTMLFormElement>
    ) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // Basic validation example
        if (!fullName || fullName.trim().length === 0) {
            setWarning('Full name is required.');
            return;
        }

        if (!email || !isValidEmail(email)) {
            setWarning('Please enter a valid email address.');
            return;
        }

        if (!password || password.length < 6) {
            setWarning('Password must be at least 6 characters long.');
            return;
        }

        if (!password.match(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/)) {
            setWarning(
                'Password must contain at least one letter and one digit.'
            );
            return;
        }
        console.log('Form values:', { fullName, email, password });
        alert('Form submitted successfully!');
        // Proceed with further actions (e.g., API call, state update, etc.)
    };

    const isValidEmail = (email: string) => {
        // Basic email validation regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    return (
        <div className="">
            <section className="relative overflow-hidden bg-white dark:bg-light-dark">
                <div className="absolute inset-0">
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-600" />
                </div>
                <div className="absolute top-0 left-0 -translate-x-[60%] -translate-y-[75%] z-10">
                    <div className="border-[8px] border-white rounded-full w-80 h-80 opacity-20" />
                </div>
                <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
                    <div className="relative self-stretch px-4 py-16 overflow-hidden bg-blue-600 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24">
                        <div className="absolute bottom-0 right-0 translate-x-[25%] translate-y-[75%]">
                            <div className="border-[8px] border-white rounded-full w-96 h-96 opacity-20 lg:opacity-100" />
                        </div>
                        <div className="relative flex flex-col justify-between h-full max-w-lg mx-auto lg:mr-auto lg:max-w-md">
                            <div className="flex-1">
                                <h2 className="text-4xl font-semibold tracking-tighter text-white sm:text-5xl xl:text-6xl">
                                    Welcome to our community
                                </h2>
                                <p className="mt-4 text-base font-normal leading-7 text-blue-300 lg:text-lg lg:mt-6 lg:leading-8">
                                    Clarity gives you the blocks &amp;
                                    components you need to create a truly
                                    professional website.
                                </p>
                            </div>
                            <div className="mt-12 lg:mt-0">
                                <div className="flex items-center">
                                    <svg
                                        className="w-6 h-6 text-yellow-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        className="w-6 h-6 text-yellow-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        className="w-6 h-6 text-yellow-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        className="w-6 h-6 text-yellow-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        className="w-6 h-6 text-yellow-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <blockquote className="mt-8">
                                    <p className="text-xl font-normal text-white">
                                        "We love Landingfolio! Our designers
                                        were using it for their projects, so we
                                        already knew what kind of design they
                                        want."
                                    </p>
                                </blockquote>
                                <div className="flex items-center mt-6">
                                    <img
                                        className="object-cover rounded-full w-11 h-11 shrink-0"
                                        src="https://landingfoliocom.imgix.net/store/collection/saasui/images/sign-in/3/avatar-male.png"
                                        alt=""
                                    />
                                    <div className="ml-4">
                                        <p className="text-base font-semibold text-white">
                                            Devon Lane
                                        </p>
                                        <p className="text-sm font-normal text-gray-300">
                                            Co-Founder, Design.co
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-16 bg-white dark:bg-light-dark sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
                        <div className="max-w-lg mx-auto xl:max-w-xl">
                            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                                Create Your Account
                            </h2>
                            <p className="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:leading-8">
                                Join hundreds of businesses benefiting from our
                                ERP system. Sign up today and optimize your
                                workflow.
                            </p>
                            <form
                                // action="#"
                                // method="POST"
                                onChange={() => setWarning('')}
                                onSubmit={onSubmitHandler}
                                className="mt-12  sm:mt-16 lg:mt-20"
                            >
                                <div className="space-y-5">
                                    <div>
                                        <label
                                            htmlFor="fullName"
                                            className="text-base font-medium text-gray-900 dark:text-white"
                                        >
                                            {' '}
                                            Full name{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="TEXT"
                                                name="fullName"
                                                id="fullName"
                                                className="block w-full px-4 py-4 text-base text-gray-900 dark:text-white bg-white dark:bg-light-dark border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="text-base font-medium text-gray-900 dark:text-white"
                                        >
                                            {' '}
                                            Email address{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="block w-full px-4 py-4 text-base text-gray-900 dark:text-white bg-white dark:bg-light-dark border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
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
                                        <div className="mt-2 mb-4 relative">
                                            <input
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                id="password"
                                                name="password"
                                                className="block w-full px-4 py-4 text-base text-gray-900 dark:text-white bg-white dark:bg-light-dark border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-6 w-6" />
                                                ) : (
                                                    <Eye className="h-6 w-6" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {warning && (
                                    <div className="text-red-500 mb-4">
                                        {warning}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center px-12 py-4 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
