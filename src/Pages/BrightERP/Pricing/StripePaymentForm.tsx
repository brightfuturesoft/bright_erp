import React from 'react';
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

    return (
        <form
            className="bg-transparent"
            onSubmit={handleSubmit}
        >
            <div className="w-full mb-4">
                <div className="input-container">
                    <CardElement
                        options={{
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
                        }}
                    />
                </div>
            </div>
            <div className="w-full">
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!stripe}
                    className="w-full"
                >
                    Pay Now
                </Button>
            </div>
        </form>
    );
};

export default StripePaymentForm;
