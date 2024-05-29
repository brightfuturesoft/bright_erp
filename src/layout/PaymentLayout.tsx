import React, { useState } from 'react';
import HomeNav from '../Pages/BrightERP/Home/HomeComponents/HomeNav';
import { Radio, RadioChangeEvent, Form, Button, Input, Row, Col } from 'antd';
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
        <div className='bg-light dark:bg-dark h-screen overflow-y-auto'>
            <HomeNav />
            <div className="pt-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mt-20">
                <Row gutter={[16, 16]} justify="center">
                    <Col span={24} md={8}>
                        <div className="payment-radio-group">
                            <Radio.Group onChange={onChange} value={paymentMethod}>
                                <Radio.Button value="Visa" className={paymentMethod === 'Visa' ? 'active' : ''}>
                                    <CreditCardOutlined /> Visa
                                </Radio.Button>
                                <Radio.Button value="Mastercard" className={paymentMethod === 'Mastercard' ? 'active' : ''}>
                                    <CreditCardOutlined /> Mastercard
                                </Radio.Button>
                                <Radio.Button value="Bank Transfer" className={paymentMethod === 'Bank Transfer' ? 'active' : ''}>
                                    <BankOutlined /> Bank Transfer
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="px-4 dark:bg-light-dark mx-auto max-w-2xl sm:px-6 lg:px-8 mt-6">
                <form >
                    <div className=""></div>
                </form>
            </div>
        </div>
    );
};

export default PaymentLayout;
