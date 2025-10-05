import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, notification } from 'antd';
const StripePaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async () => {
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (error) {
            notification.error({
                message: 'Payment Error',
                description: error.message,
            });
        } else {
            notification.success({
                message: 'Payment Successful',
                description: 'Your payment has been processed successfully.',
            });
        }
    };
    const theme = localStorage.getItem('theme');
    return _jsxs('form', {
        className: 'bg-transparent',
        onSubmit: handleSubmit,
        children: [
            _jsx('div', {
                className: 'w-full mb-4',
                children: _jsx('div', {
                    className: 'input-container',
                    children: _jsx(CardElement, {
                        options: {
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: `${theme === 'light' ? '#424770' : '#fff'}`,
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#ff0e1a',
                                },
                            },
                        },
                    }),
                }),
            }),
            _jsx('div', {
                className: 'w-full',
                children: _jsx(Button, {
                    type: 'primary',
                    htmlType: 'submit',
                    disabled: !stripe,
                    className: 'w-full',
                    children: 'Pay Now',
                }),
            }),
        ],
    });
};
export default StripePaymentForm;
