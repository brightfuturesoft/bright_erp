// EditStatusModal.tsx
import React, { useState } from 'react';
import { Modal, Checkbox } from 'antd';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    status: 'active' | 'inactive';
}

interface EditStatusModalProps {
    visible: boolean;
    data: DataType | null; // Accepts the DataType object
    onOk: (status: 'active' | 'inactive') => void;
    onCancel: () => void;
}

const EditStatusModal: React.FC<EditStatusModalProps> = ({
    visible,
    data,
    onOk,
    onCancel,
}) => {
    const [includeData, setIncludeData] = useState<boolean>(false);
    const [dataInput, setDataInput] = useState<string>('');

    const handleOk = () => {
        if (includeData) {
            console.log('Data to update:', dataInput);
        }

        if (data?.status === 'active' && includeData) {
            onOk('inactive'); // Update status to inactive if checkbox is checked
        } else {
            onOk(data?.status || 'active'); // Otherwise, keep the current status
        }

        setIncludeData(false);
        setDataInput('');
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncludeData(e.target.checked);
    };

    return (
        <Modal
            title={`Update Status for ${data?.name}`}
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
        >
            {data?.status === 'active' ? (
                <Checkbox
                    checked={includeData}
                    onChange={onChange}
                    style={{ marginTop: '10px' }}
                >
                    Want to inactive this Customer Type?
                </Checkbox>
            ) : (
                <h2 className="">Want to active this Customer Type?</h2>
            )}
        </Modal>
    );
};

export default EditStatusModal;
