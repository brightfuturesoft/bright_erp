import DashboardHeader from '@modules/CommonComponents/DashboardHeader';
import { Modal, Button, Input, Form } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';
import BasicInformation from './BasicInformation';
import { useDropzone } from 'react-dropzone';

import { UploadCloud } from 'lucide-react';

interface EditCustomerModalProps {
    title: string;
    open: boolean;
    onOk: () => void;
    confirmLoading: boolean;
    onCancel: () => void;
    defaultValue?: string;
}

const EditCustomer: React.FC<EditCustomerModalProps> = ({
    title,
    open,
    onOk,
    confirmLoading,
    onCancel,
    defaultValue,
}) => {
    const [name, setName] = useState(defaultValue || '');

    const [uploadedImage, setUploadedImage] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    const handleDeleteImage = e => {
        e.stopPropagation();
        setUploadedImage(null);
    };

    useEffect(() => {
        if (defaultValue) {
            setName(defaultValue);
        }
    }, [defaultValue]);

    const handleOk = () => {
        console.log('Submitted name:', name);
        onOk();
    };

    return (
        <div className="dark:text-light text-black">
            <DashboardHeader>
                <h1 className="text-lg font-semibold dark:text-gray-50">
                    Update Customer
                </h1>
            </DashboardHeader>

            <BasicInformation
                getRootProps={getRootProps}
                uploadedImage={uploadedImage}
                getInputProps={getInputProps}
                handleDeleteImage={handleDeleteImage}
            />
        </div>
    );
};

export default EditCustomer;
