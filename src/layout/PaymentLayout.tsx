import React, { useState } from 'react';
import HomeNav from '../Pages/BrightERP/Home/HomeComponents/HomeNav';
import { Radio, RadioChangeEvent, Form, Button, Input, Row, Col, Upload } from 'antd';
import { CreditCardOutlined, BankOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';

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
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <Form className='payment-form' layout="vertical" onFinish={handleFormSubmit}>
                        <Form.Item label="Card Number" name="cardNumber" rules={[{ required: true, message: 'Please enter your card number' }]}>
                            <Input
                                className="dark:bg-gray-900 ::placeholder-text-700 bg-gray-100 dark:text-white dark:placeholder-gray-400 text-gray-800"
                                size="large"
                                placeholder="Card Number"
                                prefix={<CreditCardOutlined />}
                            />
                        </Form.Item>
                        <Form.Item label="Name on Card" name="cardName" rules={[{ required: true, message: 'Please enter the name on your card' }]}>
                            <Input
                                className="dark:bg-gray-900 bg-gray-100 dark:text-white dark:placeholder-gray-400 text-gray-800"
                                size="large"
                                placeholder="Name on Card"
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>
                        <Form.Item label="Clearance Input" name="clearanceInput" rules={[{ required: true, message: 'Please upload your clearance document' }]}>
                            <Upload
                                beforeUpload={() => false}
                                className="dark:bg-gray-900 bg-gray-100 dark:text-white text-gray-800 dark:placeholder-gray-400"
                            >
                                <Button icon={<UploadOutlined />}>Upload Clearance Document</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                Pay Now..
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default PaymentLayout;
