import { Modal } from 'antd';
import React from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const AddNewAccountModal: React.FC = ({ isModalOpen, handleOk, handleCancel }) => {

    const onGenderChange = (value: string) => {
        console.log(value);

    };

    return (
        <Modal title="Add a new account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <form className='space-y-4'>
                <div className='space-y-1'>
                    <label htmlFor="acName">Account Name</label>
                    <Input
                        name='ac_name'
                        className='w-full border focus:border-[1px] hover bg-transparent focus:border-blue-600 rounded p-2 h-[42px]' />
                </div>
                <div className='space-y-1'>
                    <label htmlFor="acName">Account Category</label>
                    <Form.Item name="gender" rules={[{ required: true }]}>
                        <Select
                            className="hover:!border-none"
                            onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="mobile_banking">Mobile Bank</Option>
                            <Option value="bank">Bank</Option>
                            <Option value="cash">Cash</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className='space-y-1'>
                    <label htmlFor="acName">Description</label>

                    <TextArea
                        name='description'
                        rows={6}
                        className='w-full border border-gray-700 hover:border-gray-700 focus:border-[1px] focus:!bg-transparent dark:text-light text-black hover:!bg-transparent bg-transparent focus:border-blue-600 rounded p-2 h-[42px]' />

                </div>
            </form>
        </Modal>
    );
};

export default AddNewAccountModal;