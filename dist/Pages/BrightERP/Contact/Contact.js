import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { message } from 'antd';
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}home/contact/create-contact`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await res.json();
            if (res.ok) {
                message.success(
                    'Your message has been sent successfully! We will get back to you soon.! 🎉'
                );
                setFormData({
                    name: '',
                    contactNumber: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            } else {
                message.error(data.message || 'Failed to submit contact.');
            }
        } catch (error) {
            console.error(error);
            message.error('Server error!');
        } finally {
            setLoading(false);
        }
    };
    return _jsx('div', {
        className:
            'min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 lg:p-12 font-sans',
        children: _jsxs('div', {
            className:
                'container max-w-7xl lg:px-8 mx-auto items-start grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16',
            children: [
                _jsxs('div', {
                    className: 'flex flex-col justify-center text-left',
                    children: [
                        _jsxs('h1', {
                            className:
                                'text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-white',
                            children: [
                                'Come collaborate',
                                _jsx('br', {}),
                                'with ',
                                _jsx('span', {
                                    className: 'text-blue-600',
                                    children: 'Orybiz',
                                }),
                            ],
                        }),
                        _jsx('p', {
                            className:
                                'text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6 max-w-md',
                            children:
                                "Need support or have a question? Send us a message, and we'll be in touch. Reach out to us at:",
                        }),
                        _jsx('a', {
                            href: 'mailto:hello@brightfutresoft.io',
                            className:
                                'text-lg sm:text-xl lg:text-2xl text-black dark:text-blue-400 underline font-bold',
                            children: 'hello@brightfutresoft.io',
                        }),
                    ],
                }),
                _jsx('div', {
                    className: 'relative flex justify-center items-center',
                    children: _jsxs('div', {
                        className:
                            'bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg',
                        children: [
                            _jsx('h2', {
                                className:
                                    'text-3xl font-bold mb-6 text-gray-900 dark:text-white',
                                children: 'Say hello! \uD83D\uDC4B',
                            }),
                            _jsxs('form', {
                                className: 'space-y-4',
                                onSubmit: handleSubmit,
                                children: [
                                    _jsx('div', {
                                        children: _jsx('input', {
                                            type: 'text',
                                            name: 'name',
                                            placeholder: 'Enter name',
                                            value: formData.name,
                                            onChange: handleChange,
                                            className:
                                                'w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500 bg-white dark:bg-gray-700 dark:text-white',
                                            required: true,
                                        }),
                                    }),
                                    _jsx('div', {
                                        children: _jsx('input', {
                                            type: 'text',
                                            name: 'contactNumber',
                                            placeholder: 'Enter contact number',
                                            value: formData.contactNumber,
                                            onChange: handleChange,
                                            className:
                                                'w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500 bg-white dark:bg-gray-700 dark:text-white',
                                            required: true,
                                        }),
                                    }),
                                    _jsx('div', {
                                        children: _jsx('input', {
                                            type: 'email',
                                            name: 'email',
                                            placeholder: 'Enter email address',
                                            value: formData.email,
                                            onChange: handleChange,
                                            className:
                                                'w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500 bg-white dark:bg-gray-700 dark:text-white',
                                            required: true,
                                        }),
                                    }),
                                    _jsx('div', {
                                        children: _jsx('input', {
                                            type: 'text',
                                            name: 'subject',
                                            placeholder:
                                                'Enter message title/subject',
                                            value: formData.subject,
                                            onChange: handleChange,
                                            className:
                                                'w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500 bg-white dark:bg-gray-700 dark:text-white',
                                            required: true,
                                        }),
                                    }),
                                    _jsx('div', {
                                        children: _jsx('textarea', {
                                            name: 'message',
                                            placeholder: 'Write a message',
                                            rows: 5,
                                            value: formData.message,
                                            onChange: handleChange,
                                            className:
                                                'w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500 bg-white dark:bg-gray-700 dark:text-white resize-none',
                                            required: true,
                                        }),
                                    }),
                                    _jsx('div', {
                                        className: 'flex justify-end',
                                        children: _jsx('button', {
                                            type: 'submit',
                                            disabled: loading,
                                            className:
                                                'bg-blue-600 text-white py-2 px-9 hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50',
                                            children: loading
                                                ? 'Submitting...'
                                                : 'Submit',
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
            ],
        }),
    });
};
export default Contact;
