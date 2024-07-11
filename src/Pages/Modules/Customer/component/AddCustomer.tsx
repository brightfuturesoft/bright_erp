import { Modal, Button, Input, Form } from 'antd';
import React, { useState } from 'react';

interface AddCustomerModalProps {
    title: string;
    open: boolean;
    onOk: () => void;
    confirmLoading: boolean;
    onCancel: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
    title,
    open,
    onOk,
    confirmLoading,
    onCancel,
}) => {
    const [name, setName] = useState('');

    const handleOk = () => {
        console.log('Submitted name:', name);
        onOk();
    };

    return (
        <div>
            <Modal
                title={title}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={onCancel}
            >
                <Form layout="vertical">
                    <Form.Item label="Name">
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddCustomerModal;
