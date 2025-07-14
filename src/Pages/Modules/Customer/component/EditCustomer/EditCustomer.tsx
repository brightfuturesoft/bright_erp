import React, { useCallback, useState } from 'react';
import { Button, Input, Form, Space, Switch } from 'antd';
import { useDropzone } from 'react-dropzone';
import Address_Info from './Address_Info';
import Basic_Information from './Basic_Information';
import DashboardHeader from '@/Pages/Modules/CommonComponents/DashboardHeader';

interface EditCustomerProps {
    defaultValue?: string;
    onSave: (data: any) => void;
}

const EditCustomer: React.FC<EditCustomerProps> = ({
    defaultValue,
    onSave,
}) => {
    const [date, setDate] = useState(defaultValue || '');
    const [form] = Form.useForm();
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [imgFile, setImgFile] = useState<string | null>(null);
    const [addressOn, setAddressOn] = useState(true);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setImgFile(file);
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

    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                const allData = {
                    ...values,
                    imgFile,
                    till_date: date,
                };

                onSave(allData);
            })
            .catch(info => {
                console.log('Validation failed:', info);
            });
    };

    return (
        <div className="dark:text-light text-black">
            <DashboardHeader>
                <h1 className="text-lg font-semibold dark:text-gray-50">
                    Update Customer
                </h1>
            </DashboardHeader>

            <Form
                form={form}
                layout="vertical"
            >
                <Basic_Information
                    getRootProps={getRootProps}
                    uploadedImage={uploadedImage}
                    getInputProps={getInputProps}
                    handleDeleteImage={handleDeleteImage}
                    setDate={setDate}
                />
                <br />
                <div
                    onClick={() => setAddressOn(!addressOn)}
                    className="flex items-center gap-2 font-semibold dark:text-light"
                >
                    <Space direction="vertical">
                        <Switch
                            className="bg-gray-400"
                            defaultChecked
                        />
                    </Space>
                    <p>Add Address</p>
                </div>
                {addressOn && <Address_Info />}
                <br />
                <div className="flex items-center justify-end gap-2">
                    <Button
                        className="bg-danger !text-light mb-5"
                        danger
                    >
                        Cancel
                    </Button>
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default EditCustomer;
