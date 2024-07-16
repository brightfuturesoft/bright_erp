import React, { useCallback, useState } from 'react';
import { Button, Input, Form, Space, Switch } from 'antd';
import { useDropzone } from 'react-dropzone';
import DashboardHeader from '../../../CommonComponents/DashboardHeader';
import { Link } from 'react-router-dom';
import AddBasic_Information from './AddBasicInformation';
import Add_AddressInfo from './AddAddressInfo';

interface AddCustomerProps {
    initialValue?: string;
    onSave: (data: any) => void;
}

const AddCustomer: React.FC<AddCustomerProps> = ({ initialValue, onSave }) => {
    const [date, setDate] = useState(initialValue || '');
    const [form] = Form.useForm();
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [imgFile, setImgFile] = useState<string | null>(null);
    const [addressOn, setAddressOn] = useState(false);

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

    const handleDeleteImage = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
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
                console.log('Submitted data:', allData);
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
                    Add Customer
                </h1>
            </DashboardHeader>

            <Form
                form={form}
                layout="vertical"
            >
                <AddBasic_Information
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
                    <Space direction="horizontal">
                        <Switch
                            className="dark:bg-gray-700 bg-gray-200"
                            defaultChecked={false}
                        />
                    </Space>
                    <p>Add Address</p>
                </div>

                {addressOn && <Add_AddressInfo />}

                <br />
                <div className="flex items-center justify-end gap-2">
                    <Link to={`/dashboard/customer`}>
                        <Button
                            className="bg-danger hover:!text-danger !text-light mb-5"
                            danger
                        >
                            Cancel
                        </Button>
                    </Link>
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                        >
                            +Add
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default AddCustomer;
