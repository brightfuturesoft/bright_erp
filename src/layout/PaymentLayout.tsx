import React, { useState } from 'react';
import HomeNav from '../Pages/BrightERP/Home/HomeComponents/HomeNav';
import { Radio, RadioChangeEvent, Form, Button, Input } from 'antd';
import { CreditCardOutlined, BankOutlined } from '@ant-design/icons';

const PaymentLayout: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState<string>('Visa'); // Default to Visa

    const onChange = (e: RadioChangeEvent) => {
        console.log('Radio checked:', e.target.value);
        setPaymentMethod(e.target.value);
    };

    const handleFormSubmit = (values: any) => {
        // Handle form submission
        console.log('Form values:', values);
        // You can perform further actions here like processing payment
    };

    return (
        <div>
            <HomeNav />
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mt-20">
                <div className="flex justify-center space-x-4">
                    <Radio.Group onChange={onChange} value={paymentMethod}>
                        <Radio.Button value="Visa" className={`flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg ${paymentMethod === 'Visa' ? 'active' : ''}`}>
                            <CreditCardOutlined /><span>Visa</span>
                        </Radio.Button>
                        <Radio.Button value="Mastercard" className={`flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg ${paymentMethod === 'Mastercard' ? 'active' : ''}`}>
                            <CreditCardOutlined /><span>Mastercard</span>
                        </Radio.Button>
                        <Radio.Button value="Bank Transfer" className={`flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg ${paymentMethod === 'Bank Transfer' ? 'active' : ''}`}>
                            <BankOutlined /><span>Bank Transfer</span>
                        </Radio.Button>
                    </Radio.Group>
                </div>
            </div>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mt-6">
                <Form layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item label="Card Number" name="cardNumber" rules={[{ required: true, message: 'Please enter your card number' }]}>
                        <Input className="w-full" placeholder="Enter your card number" />
                    </Form.Item>
                    <Form.Item label="Name on Card" name="cardName" rules={[{ required: true, message: 'Please enter the name on your card' }]}>
                        <Input className="w-full" placeholder="Enter the name on your card" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Pay Now
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default PaymentLayout;
