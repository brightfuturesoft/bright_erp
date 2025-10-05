import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import axios from 'axios';
import { AtSign, Eye, EyeOff, Fingerprint, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import Erp_Alert from '@/helpers/erp_alert/Erp_Alert';
import { getFromLocalStorage } from '@/helpers/local-storage';
import { getBaseUrl } from '@/helpers/config/envConfig';
// import { getCachedData } from '@/helpers/catchStorage';
export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [warning, setWarning] = useState('');
    const workSpaceJsonData = getFromLocalStorage('worspaceData');
    const address_info = getFromLocalStorage('address_info');
    const package_info = getFromLocalStorage('package_info');
    console.log(workSpaceJsonData, 'package_info');
    console.log(address_info, 'address_info');
    const workspace_update_data = {
        ...workSpaceJsonData,
        address_info: address_info,
        subscription_info: {
            subscription_id: package_info.select_package,
            subscription_date: new Date(),
        },
        category_info: { category: package_info.category },
        system_settings: { currency: package_info.currency },
    };
    console.log(workspace_update_data);
    // @ts-ignore
    let workSpaceData = workSpaceJsonData;
    const navigate = useNavigate();
    const [warningMessage, setWarningMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const onSubmitHandler = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const fullName = formData.get('fullName');
        // const phone_number = formData.get('phone_number');
        const email = formData.get('email');
        const password = formData.get('password');
        // const image = formData.get('image') as string;
        // Basic validation example
        if (!fullName || fullName.trim().length === 0) {
            setWarning('Full name is required.');
            return;
        }
        if (!email) {
            setWarning('Please enter a valid email address.');
            return;
        }
        if (!password || password.length < 6) {
            setWarning('Password must be at least 6 characters long.');
            return;
        }
        if (
            !password
            // .match(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/)
        ) {
            setWarning(
                'Password must contain at least one letter and one digit.'
            );
            return;
        }
        setLoading(true);
        const bodyData = {
            user: {
                name: fullName,
                email: email,
                password: password,
            },
            workSpace: { ...workspace_update_data },
        };
        const fullUrl = `${getBaseUrl}/auth/sign-up`;
        const response = await axios.post(fullUrl, bodyData);
        setLoading(false);
        if (!response.data.error) {
            Erp_Alert(
                'Account created successfully. Check your email for activation link',
                '',
                'success'
            );
            navigate('/');
        } else {
            Erp_Alert(response.data.message, '', 'error');
        }
        setLoading(false);
    };
    return _jsx('div', {
        className: 'container-home',
        children: _jsx('section', {
            children: _jsxs('div', {
                className:
                    'min-h-full lg:flex lg:flex-row-reverse lg:justify-between',
                children: [
                    _jsx('div', {
                        className:
                            'flex flex-col justify-center flex-1 px-4 py-12 bg-white dark:bg-gray-900  sm:px-6 lg:px-20 xl:px-24 rounded-r-xl',
                        children: _jsxs('div', {
                            className: 'flex-1 max-w-sm mx-auto lg:max-w-md ',
                            children: [
                                _jsx('h1', {
                                    className:
                                        'mt-10 text-3xl font-bold text-center text-gray-900 dark:text-white  sm:text-4xl xl:text-5xl font-pj lg:text-left',
                                    children: 'Create Your Account',
                                }),
                                _jsxs('form', {
                                    onChange: () => setWarning(''),
                                    onSubmit: onSubmitHandler,
                                    className: 'mt-10',
                                    children: [
                                        _jsxs('div', {
                                            className: 'space-y-4',
                                            children: [
                                                _jsxs('div', {
                                                    children: [
                                                        _jsx('label', {
                                                            htmlFor: '',
                                                            className:
                                                                'text-base font-medium text-gray-900 dark:text-white',
                                                            children:
                                                                'Full Name',
                                                        }),
                                                        _jsxs('div', {
                                                            className:
                                                                'mt-2.5 relative text-gray-400 focus-within:text-gray-600',
                                                            children: [
                                                                _jsx('div', {
                                                                    className:
                                                                        'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none',
                                                                    children:
                                                                        _jsx(
                                                                            User,
                                                                            {
                                                                                strokeWidth: 1,
                                                                                className:
                                                                                    'w-5 h-5 ',
                                                                            }
                                                                        ),
                                                                }),
                                                                _jsx('input', {
                                                                    type: 'text',
                                                                    name: 'fullName',
                                                                    id: 'fullName',
                                                                    placeholder:
                                                                        'Full Name',
                                                                    className:
                                                                        'block w-full py-4 pl-10 pr-4 text-black dark:text-white placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600',
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                _jsxs('div', {
                                                    children: [
                                                        _jsx('label', {
                                                            htmlFor: '',
                                                            className:
                                                                'text-base font-medium text-gray-900 dark:text-white',
                                                            children:
                                                                'Email address',
                                                        }),
                                                        _jsxs('div', {
                                                            className:
                                                                'mt-2.5 relative text-gray-400 focus-within:text-gray-600',
                                                            children: [
                                                                _jsx('div', {
                                                                    className:
                                                                        'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none',
                                                                    children:
                                                                        _jsx(
                                                                            AtSign,
                                                                            {
                                                                                strokeWidth: 1,
                                                                                className:
                                                                                    'w-5 h-5 ',
                                                                            }
                                                                        ),
                                                                }),
                                                                _jsx('input', {
                                                                    type: 'email',
                                                                    name: 'email',
                                                                    id: 'email',
                                                                    placeholder:
                                                                        'Email address',
                                                                    className:
                                                                        'block w-full py-4 pl-10 pr-4 text-black dark:text-white placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600',
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                _jsxs('div', {
                                                    children: [
                                                        _jsx('label', {
                                                            htmlFor: '',
                                                            className:
                                                                'text-base font-medium text-gray-900 dark:text-white',
                                                            children:
                                                                'User Password',
                                                        }),
                                                        _jsxs('div', {
                                                            className:
                                                                'mt-2.5 relative text-gray-400 focus-within:text-gray-600',
                                                            children: [
                                                                _jsx('div', {
                                                                    className:
                                                                        'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none',
                                                                    children:
                                                                        _jsx(
                                                                            Fingerprint,
                                                                            {
                                                                                strokeWidth: 1,
                                                                                className:
                                                                                    'w-5 h-5 ',
                                                                            }
                                                                        ),
                                                                }),
                                                                _jsx('input', {
                                                                    type: showPassword
                                                                        ? 'text'
                                                                        : 'password',
                                                                    name: 'password',
                                                                    id: 'password',
                                                                    placeholder:
                                                                        'User Password',
                                                                    className:
                                                                        'block w-full py-4 pl-10 pr-4 text-black dark:text-white placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600',
                                                                }),
                                                                _jsx('button', {
                                                                    type: 'button',
                                                                    className:
                                                                        'absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 focus-within:text-gray-600',
                                                                    onClick:
                                                                        () =>
                                                                            setShowPassword(
                                                                                !showPassword
                                                                            ),
                                                                    children:
                                                                        showPassword
                                                                            ? _jsx(
                                                                                  EyeOff,
                                                                                  {
                                                                                      strokeWidth: 1,
                                                                                      className:
                                                                                          'h-6 w-6',
                                                                                  }
                                                                              )
                                                                            : _jsx(
                                                                                  Eye,
                                                                                  {
                                                                                      strokeWidth: 1,
                                                                                      className:
                                                                                          'h-6 w-6',
                                                                                  }
                                                                              ),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        warningMessage &&
                                            _jsx('div', {
                                                className:
                                                    'text-red-600 mt-8 dark:text-red-400',
                                                children: warningMessage,
                                            }),
                                        _jsxs('div', {
                                            className: 'relative mt-8',
                                            children: [
                                                _jsx('div', {
                                                    className:
                                                        'absolute -inset-2',
                                                    children: _jsx('div', {
                                                        className:
                                                            'w-full h-full mx-auto opacity-30 blur-lg filter',
                                                        style: {
                                                            background:
                                                                'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                                                        },
                                                    }),
                                                }),
                                                _jsx('button', {
                                                    type: 'submit',
                                                    className:
                                                        'relative flex items-center justify-center w-full px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600',
                                                    children: loading
                                                        ? 'Loading...'
                                                        : 'Create',
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                    _jsxs('div', {
                        className:
                            'relative grid flex-1 w-full px-4 py-12 overflow-hidden bg-gray-900 lg:max-w-2xl lg:px-20 xl:px-24 sm:px-6 place-items-center rounded-l-xl',
                        children: [
                            _jsx('div', {
                                className: 'absolute inset-0',
                                children: _jsx('img', {
                                    className:
                                        'object-cover object-top w-full h-full scale-150 -rotate-90 opacity-10',
                                    src: 'https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/4/background-pattern.png',
                                    alt: '',
                                }),
                            }),
                            _jsxs('div', {
                                className: 'relative max-w-sm mx-auto',
                                children: [
                                    _jsx('div', {
                                        className:
                                            'inline-flex items-center justify-center w-20 h-20 bg-gray-800 dark:bg-white rounded-xl',
                                        children: _jsxs('svg', {
                                            className:
                                                'w-auto h-5 dark:text-dark text-light',
                                            viewBox: '0 0 33 23',
                                            fill: 'currentColor',
                                            xmlns: 'http://www.w3.org/2000/svg',
                                            children: [
                                                _jsx('path', {
                                                    d: 'M32.0011 4.7203L30.9745 0C23.5828 0.33861 18.459 3.41404 18.459 12.4583V22.8687H31.3725V9.78438H26.4818C26.4819 6.88236 28.3027 5.17551 32.0011 4.7203Z',
                                                }),
                                                _jsx('path', {
                                                    d: 'M13.5421 4.7203L12.5155 0C5.12386 0.33861 0 3.41413 0 12.4584V22.8687H12.914V9.78438H8.02029C8.02029 6.88236 9.84111 5.17551 13.5421 4.7203Z',
                                                }),
                                            ],
                                        }),
                                    }),
                                    _jsx('blockquote', {
                                        className: 'mt-14',
                                        children: _jsx('p', {
                                            className:
                                                'text-2xl font-medium leading-relaxed text-white dark:text-light lg:text-3xl font-pj',
                                            children:
                                                '\u201C Join hundreds of businesses benefiting from our ERP system. Sign up today and optimize your workflow. \u201D',
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        }),
    });
}
